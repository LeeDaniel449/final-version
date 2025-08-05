import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

interface RequestBody {
  messages: Message[]
  userData?: any
  useOpenAI?: boolean
}

// Initialize OpenAI client only on server side
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null

if (openai) {
  console.log("✅ OpenAI client initialized successfully")
} else {
  console.log("⚠️ No OpenAI API key found, using fallback system only")
}

// Generate intelligent response based on user question and context
function generateIntelligentResponse(userQuestion: string, userData: any): string {
  const question = userQuestion.toLowerCase()
  const { profile, budgetData, goals, progress } = userData

  // Calculate some basic metrics for personalized responses
  const totalExpenses = Object.values(budgetData.expenses || {}).reduce((sum: number, exp: number) => sum + exp, 0)
  const income = budgetData.income || 0
  const savings = budgetData.savings || 0
  const monthlyLeftover = income - totalExpenses
  const savingsRate = income > 0 ? ((monthlyLeftover / income) * 100).toFixed(1) : "0"
  const emergencyMonths = totalExpenses > 0 ? (savings / totalExpenses).toFixed(1) : "0"
  const activeGoals = goals?.length || 0
  const completedLessons = progress?.completedLessons || 0

  // Budget-related questions
  if (question.includes("budget") || question.includes("expense") || question.includes("spending")) {
    return `📊 **Your Budget Analysis**

Based on your current financial situation:
• **Monthly Income**: $${income.toLocaleString()}
• **Monthly Expenses**: $${totalExpenses.toLocaleString()}
• **Monthly Leftover**: $${monthlyLeftover.toLocaleString()}
• **Savings Rate**: ${savingsRate}%

**Personalized Recommendations:**
${
  monthlyLeftover > 0
    ? `Great job! You have a positive cash flow of $${monthlyLeftover.toLocaleString()}. Consider automating this surplus into savings or investments.`
    : monthlyLeftover === 0
      ? "You're breaking even. Look for areas to reduce expenses or increase income to build savings."
      : "⚠️ You're spending more than you earn. Priority #1 is reducing expenses or increasing income."
}

**Next Steps:**
1. ${Number.parseFloat(savingsRate) < 20 ? "Aim to save 20% of your income" : "Maintain your excellent savings rate"}
2. Track expenses for 30 days to identify spending patterns
3. ${savings < totalExpenses * 3 ? "Build emergency fund to 3-6 months of expenses" : "Consider investing your surplus"}

**Budget Optimization Tips:**
• Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings
• Automate savings transfers on payday
• Review and cancel unused subscriptions
• Cook at home more to reduce food costs

Would you like specific advice on any expense category?`
  }

  // Investment-related questions
  if (
    question.includes("invest") ||
    question.includes("stock") ||
    question.includes("portfolio") ||
    question.includes("retirement")
  ) {
    const age = Number.parseInt(profile.age) || 25
    const stockAllocation = Math.max(100 - age, 60)
    const bondAllocation = 100 - stockAllocation
    const riskTolerance = profile.riskTolerance || "moderate"

    return `💰 **Investment Guidance for ${profile.firstName || "You"}**

**Your Investment Profile:**
• Age: ${age} years
• Risk Tolerance: ${riskTolerance}
• Investment Experience: ${profile.investmentExperience || "beginner"}
• Time Horizon: ${profile.timeHorizon || "long-term"}

**Recommended Asset Allocation:**
• **Stocks**: ${stockAllocation}% (growth potential)
• **Bonds**: ${bondAllocation}% (stability)

**Before You Invest:**
${
  savings < totalExpenses * 3
    ? "⚠️ **Build Emergency Fund First**: You need 3-6 months of expenses ($" +
      (totalExpenses * 3).toLocaleString() +
      ") before investing."
    : "✅ **Emergency Fund**: Good foundation with $" + savings.toLocaleString() + " saved."
}

**Investment Priority Order:**
1. **401(k) Match** - Free money from employer
2. **Roth IRA** - $6,500/year tax-free growth
3. **Traditional IRA** - Tax deduction now
4. **Taxable Accounts** - After maxing retirement accounts

**Beginner-Friendly Options:**
• **Target-Date Funds** - Automatic diversification and rebalancing
• **Total Stock Market Index** (VTI) - Broad market exposure
• **S&P 500 Index** (VOO) - Large company stocks
• **Total Bond Market** (BND) - Bond diversification

**Dollar-Cost Averaging**: Invest the same amount regularly regardless of market conditions.

Current surplus of $${monthlyLeftover.toLocaleString()}/month could grow to significant wealth over time!`
  }

  // Debt-related questions
  if (
    question.includes("debt") ||
    question.includes("loan") ||
    question.includes("credit card") ||
    question.includes("payoff")
  ) {
    return `💳 **Debt Management Strategy**

**Two Proven Methods:**

**1. Debt Avalanche (Mathematically Optimal)**
• Pay minimums on all debts
• Put extra money toward highest interest rate debt
• Saves most money in interest over time

**2. Debt Snowball (Psychologically Motivating)**
• Pay minimums on all debts  
• Put extra money toward smallest balance
• Builds momentum with quick wins

**Debt Priority Order:**
1. **Credit Cards** (18-25% APR) - Pay off immediately
2. **Personal Loans** (6-15% APR) - Pay before investing
3. **Student Loans** (3-7% APR) - Balance with investing
4. **Mortgage** (3-5% APR) - Often okay to carry

**Your Situation:**
With $${monthlyLeftover.toLocaleString()} monthly surplus, you could accelerate debt payoff significantly.

**Debt Consolidation Options:**
• **Balance Transfer Cards** - 0% intro APR (12-21 months)
• **Personal Loans** - Fixed rate, predictable payments
• **Home Equity** - Lower rates but secured by home

**Action Steps:**
1. List all debts with balances and interest rates
2. Choose avalanche or snowball method
3. Stop using credit cards while paying off debt
4. Use windfalls (tax refunds, bonuses) for debt
5. Consider side income to accelerate payoff

**Debt-Free Timeline**: With focused effort, you could be debt-free much sooner than minimum payments!`
  }

  // Savings and emergency fund questions
  if (question.includes("save") || question.includes("emergency fund") || question.includes("savings")) {
    return `💰 **Savings Strategy & Emergency Fund**

**Your Current Savings Status:**
• **Current Savings**: $${savings.toLocaleString()}
• **Monthly Expenses**: $${totalExpenses.toLocaleString()}
• **Emergency Fund Coverage**: ${emergencyMonths} months
• **Monthly Surplus**: $${monthlyLeftover.toLocaleString()}

**Emergency Fund Goals:**
${
  Number.parseFloat(emergencyMonths) >= 6
    ? "✅ **Excellent!** You have a solid 6+ month emergency fund."
    : Number.parseFloat(emergencyMonths) >= 3
      ? "✅ **Good Start!** You have 3+ months covered. Aim for 6 months total."
      : "⚠️ **Priority!** Build to $" +
        (totalExpenses * 3).toLocaleString() +
        " (3 months) first, then $" +
        (totalExpenses * 6).toLocaleString() +
        " (6 months)."
}

**High-Yield Savings Options (4-5% APY):**
• **Marcus by Goldman Sachs** - 4.5% APY
• **Ally Bank** - 4.25% APY  
• **Capital One 360** - 4.3% APY
• **Discover Bank** - 4.5% APY

**Savings Automation Strategy:**
• **Direct Deposit Split** - Automatic to savings
• **Day-After-Payday Transfer** - $${Math.min(monthlyLeftover, 500).toLocaleString()}/month
• **Round-Up Apps** - Acorns, Qapital for spare change
• **Separate Goal Accounts** - Different savings for different goals

**Savings Timeline:**
${
  monthlyLeftover > 0
    ? `At $${monthlyLeftover.toLocaleString()}/month, you could build a full emergency fund in ${Math.ceil((totalExpenses * 6 - savings) / monthlyLeftover)} months!`
    : "Focus on increasing income or reducing expenses to create savings capacity."
}

**Quick Savings Boost:**
• Save tax refunds and bonuses (100% to savings)
• Sell unused items around the house
• Take on temporary side work
• Reduce one major expense category by 20%`
  }

  // Goal-related questions
  if (
    question.includes("goal") ||
    question.includes("plan") ||
    question.includes("target") ||
    question.includes("achieve")
  ) {
    return `🎯 **Financial Goal Planning**

**Your Current Goals:**
• **Active Goals**: ${activeGoals}
• **Learning Progress**: ${completedLessons} lessons completed
• **Current Streak**: ${progress?.currentStreak || 0} days

**SMART Goals Framework:**
• **Specific** - Clear, defined target amount
• **Measurable** - Track progress with numbers
• **Achievable** - Realistic given your $${monthlyLeftover.toLocaleString()}/month surplus
• **Relevant** - Matches your life priorities
• **Time-bound** - Set clear deadlines

**Goal Categories & Timelines:**

**Short-term (1-2 years):**
• Emergency fund: $${(totalExpenses * 6).toLocaleString()}
• Vacation fund: $3,000-$5,000
• Car maintenance/replacement fund
• Home improvements

**Medium-term (2-5 years):**
• House down payment: $50,000-$100,000
• Wedding expenses: $20,000-$30,000
• Career development/education
• Major purchases (car, appliances)

**Long-term (5+ years):**
• Retirement savings: $1M+ by age 65
• Children's education fund
• Financial independence
• Legacy/estate planning

**Goal Funding Strategy:**
With your $${monthlyLeftover.toLocaleString()}/month surplus:
• **Emergency Fund**: ${Math.ceil((totalExpenses * 6 - savings) / Math.max(monthlyLeftover, 1))} months to complete
• **House Down Payment**: ~${Math.ceil(50000 / Math.max(monthlyLeftover, 1))} months for $50k
• **Retirement**: $500/month could grow to $1M+ over 30 years

**Action Steps:**
1. **Prioritize**: Emergency fund → High-interest debt → Retirement → Other goals
2. **Separate Accounts**: One account per goal to avoid mixing funds
3. **Automate**: Set up automatic transfers for each goal
4. **Track Progress**: Review monthly and celebrate milestones
5. **Adjust**: Modify goals as life circumstances change

What specific goal would you like help planning?`
  }

  // Financial health and general advice
  if (
    question.includes("financial health") ||
    question.includes("how am i doing") ||
    question.includes("advice") ||
    question.includes("help")
  ) {
    return `🏥 **Your Financial Health Checkup**

**Overall Assessment:**
• **Name**: ${profile.firstName} ${profile.lastName}
• **Age**: ${profile.age}
• **Learning Progress**: ${completedLessons} lessons completed
• **Active Goals**: ${activeGoals}

**Key Financial Metrics:**
• **Monthly Income**: $${income.toLocaleString()}
• **Monthly Expenses**: $${totalExpenses.toLocaleString()}
• **Monthly Surplus**: $${monthlyLeftover.toLocaleString()}
• **Savings Rate**: ${savingsRate}%
• **Emergency Fund**: ${emergencyMonths} months of expenses
• **Current Savings**: $${savings.toLocaleString()}

**Health Score Breakdown:**

${Number.parseFloat(emergencyMonths) >= 6 ? "✅" : Number.parseFloat(emergencyMonths) >= 3 ? "⚠️" : "❌"} **Emergency Fund**: ${emergencyMonths} months (Target: 6 months)

${Number.parseFloat(savingsRate) >= 20 ? "✅" : Number.parseFloat(savingsRate) >= 10 ? "⚠️" : "❌"} **Savings Rate**: ${savingsRate}% (Target: 20%+)

${monthlyLeftover > 0 ? "✅" : monthlyLeftover === 0 ? "⚠️" : "❌"} **Budget Balance**: ${monthlyLeftover > 0 ? "Positive" : monthlyLeftover === 0 ? "Breaking even" : "Deficit"}

${completedLessons >= 10 ? "✅" : completedLessons >= 5 ? "⚠️" : "❌"} **Financial Education**: ${completedLessons} lessons completed

**Priority Action Items:**
${Number.parseFloat(emergencyMonths) < 3 ? "1. 🚨 Build emergency fund to $" + (totalExpenses * 3).toLocaleString() + "\n" : ""}${Number.parseFloat(savingsRate) < 20 ? "2. 📈 Increase savings rate to 20%\n" : ""}${monthlyLeftover <= 0 ? "3. ⚖️ Balance budget - reduce expenses or increase income\n" : ""}${completedLessons < 10 ? "4. 📚 Continue financial education - complete more lessons\n" : ""}

**Strengths:**
${monthlyLeftover > 0 ? "• Positive cash flow of $" + monthlyLeftover.toLocaleString() + "/month\n" : ""}${Number.parseFloat(savingsRate) >= 10 ? "• Good savings discipline\n" : ""}${Number.parseFloat(emergencyMonths) >= 3 ? "• Solid emergency fund foundation\n" : ""}${completedLessons >= 5 ? "• Committed to financial learning\n" : ""}

**Next Steps:**
1. **This Month**: ${Number.parseFloat(emergencyMonths) < 3 ? "Focus on emergency fund" : Number.parseFloat(savingsRate) < 20 ? "Increase savings rate" : "Consider investing surplus"}
2. **This Quarter**: Complete 5 more learning modules
3. **This Year**: ${activeGoals > 0 ? "Achieve your current financial goals" : "Set 2-3 specific financial goals"}

You're making great progress by actively learning about personal finance! Knowledge is the foundation of all good financial decisions.

What area would you like to focus on improving first?`
  }

  // Default comprehensive response
  return `👋 **Welcome to Your AI Financial Advisor!**

Hi ${profile.firstName || "there"}! I'm here to provide personalized financial guidance based on your specific situation.

**Your Financial Snapshot:**
• **Monthly Income**: $${income.toLocaleString()}
• **Monthly Expenses**: $${totalExpenses.toLocaleString()}
• **Savings**: $${savings.toLocaleString()}
• **Active Goals**: ${activeGoals}
• **Learning Progress**: ${completedLessons} lessons completed

**I can help you with:**

**📊 Budget & Spending Analysis**
• Optimizing your current budget
• Finding areas to reduce costs
• Implementing the 50/30/20 rule
• Expense tracking strategies

**💰 Saving & Investing Guidance**
• Building emergency funds
• Investment strategies for your age (${profile.age})
• Retirement planning (401k, IRA)
• Risk-appropriate portfolio allocation

**💳 Debt Management**
• Credit card payoff strategies
• Student loan optimization
• Debt consolidation options
• Avalanche vs. Snowball methods

**🎯 Goal Achievement**
• Setting SMART financial goals
• Creating actionable savings plans
• Timeline and milestone tracking
• Priority-based goal ranking

**Popular Questions to Get Started:**
• "How should I prioritize my financial goals?"
• "What's the best way to invest my $${monthlyLeftover.toLocaleString()} monthly surplus?"
• "Should I pay off debt or invest first?"
• "How can I improve my savings rate from ${savingsRate}%?"
• "Is my emergency fund of $${savings.toLocaleString()} adequate?"

**What would you like help with today?** I'll provide specific, actionable advice based on your actual financial situation.`
}

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 AI Advisor API called")

    // Parse request body with validation
    let body: RequestBody
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError)
      return NextResponse.json(
        {
          reply: "I'm sorry, I couldn't understand your request. Please try asking your financial question again.",
          source: "error",
        },
        { status: 400 },
      )
    }

    const { messages, userData, useOpenAI = true } = body

    // Validate messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        {
          reply: "I'm sorry, I didn't receive any messages to process. Please ask me a financial question.",
          source: "error",
        },
        { status: 400 },
      )
    }

    const lastMessage = messages[messages.length - 1]
    if (!lastMessage?.content?.trim()) {
      return NextResponse.json(
        {
          reply: "I'm sorry, your message appears to be empty. Please ask me a specific financial question.",
          source: "error",
        },
        { status: 400 },
      )
    }

    // Use provided userData or create default structure
    const userDataForContext = userData || {
      profile: {
        firstName: "User",
        lastName: "",
        age: "25",
        riskTolerance: "moderate",
        investmentExperience: "beginner",
        timeHorizon: "long-term",
      },
      budgetData: { income: 0, expenses: {}, savings: 0 },
      goals: [],
      progress: { completedLessons: 0, currentStreak: 0 },
    }

    console.log("📊 User data loaded for AI context")

    // Build user context for AI
    const userContext = `
User Profile:
- Name: ${userDataForContext.profile.firstName} ${userDataForContext.profile.lastName}
- Age: ${userDataForContext.profile.age}
- Risk Tolerance: ${userDataForContext.profile.riskTolerance}
- Investment Experience: ${userDataForContext.profile.investmentExperience}
- Time Horizon: ${userDataForContext.profile.timeHorizon}

Financial Situation:
- Monthly Income: $${userDataForContext.budgetData.income?.toLocaleString() || "0"}
- Monthly Expenses: $${Object.values(userDataForContext.budgetData.expenses || {})
      .reduce((sum: number, exp: number) => sum + exp, 0)
      .toLocaleString()}
- Savings: $${userDataForContext.budgetData.savings?.toLocaleString() || "0"}
- Active Goals: ${userDataForContext.goals?.length || 0}

Learning Progress:
- Completed Lessons: ${userDataForContext.progress?.completedLessons || 0}
- Current Streak: ${userDataForContext.progress?.currentStreak || 0} days
`

    // Try OpenAI if available and requested
    if (openai && useOpenAI) {
      try {
        console.log("🤖 Using OpenAI for response...")

        const systemPrompt = `You are a knowledgeable and friendly financial advisor AI assistant. You provide personalized financial advice based on the user's specific situation, goals, and experience level.

${userContext}

Guidelines:
- Provide specific, actionable advice tailored to the user's situation
- Use clear, jargon-free language appropriate for their experience level
- Reference their specific financial data when relevant (income, expenses, savings, goals)
- Suggest concrete next steps they can take
- Be encouraging and supportive while being realistic
- If asked about investments, consider their risk tolerance and time horizon
- Always prioritize emergency funds and debt management before investment advice
- Keep responses comprehensive but concise (3-4 paragraphs max)
- Use emojis sparingly for better readability
- Include specific dollar amounts and percentages when relevant

Remember: You are providing educational information, not professional financial advice. Users should consult with qualified financial professionals for major financial decisions.`

        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          max_tokens: 800,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        })

        const reply = completion.choices[0]?.message?.content?.trim()

        if (reply) {
          console.log("✅ OpenAI response generated successfully")
          return NextResponse.json({
            reply,
            source: "openai",
            timestamp: new Date().toISOString(),
          })
        } else {
          console.log("⚠️ Empty OpenAI response, falling back to intelligent system")
        }
      } catch (openaiError: any) {
        console.error("❌ OpenAI API Error:", openaiError.message)
        console.log("🔄 Falling back to intelligent response system...")
      }
    } else {
      console.log("⚠️ Using intelligent fallback system (OpenAI disabled or unavailable)")
    }

    // Use intelligent fallback system
    const fallbackReply = generateIntelligentResponse(lastMessage.content, userDataForContext)

    console.log("✅ Intelligent fallback response generated")
    return NextResponse.json({
      reply: fallbackReply,
      source: "intelligent_fallback",
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("❌ Unexpected error in AI advisor:", error)
    return NextResponse.json(
      {
        reply: `I apologize, but I'm experiencing technical difficulties right now. Here are some quick financial tips while I get back online:

📊 **Essential Financial Steps:**
• **Emergency Fund**: Save 3-6 months of expenses
• **Debt Management**: Pay off high-interest debt (>6% APR) first  
• **Savings Rate**: Aim for 10-20% of income
• **Investing**: Low-cost index funds for long-term growth
• **Budgeting**: Track expenses and use 50/30/20 rule

Please try asking your question again in a moment, or explore the learning modules and budgeting tools!`,
        source: "error_fallback",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
