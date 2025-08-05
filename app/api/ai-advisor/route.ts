import { type NextRequest, NextResponse } from "next/server"
import { getUserData } from "@/lib/user-data"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

interface RequestBody {
  messages: Message[]
}

// Build comprehensive user context for personalized advice
function buildUserContext() {
  try {
    const userData = getUserData()

    if (!userData.isSignedIn) {
      return "User is not signed in. Provide general financial advice and encourage them to create an account for personalized recommendations."
    }

    const { profile, budgetData, goals } = userData

    // Calculate key financial metrics
    const totalExpenses = Object.values(budgetData.expenses).reduce(
      (sum: number, expense: any) => sum + (expense || 0),
      0,
    )
    const monthlyLeftover = budgetData.income - totalExpenses
    const savingsRate = budgetData.income > 0 ? ((monthlyLeftover / budgetData.income) * 100).toFixed(1) : "0"
    const emergencyFundMonths = totalExpenses > 0 ? (budgetData.savings / totalExpenses).toFixed(1) : "0"

    // Analyze expense categories
    const expenseEntries = Object.entries(budgetData.expenses).filter(([_, amount]) => (amount as number) > 0)
    const topExpenses = expenseEntries
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 3)
      .map(([category, amount]) => `${category}: $${amount}`)
      .join(", ")

    // Analyze goals
    const activeGoals = goals.filter((g: any) => g.status === "active" || !g.status)
    const goalsSummary = activeGoals
      .map((g: any) => {
        const progress = g.target > 0 ? ((g.current / g.target) * 100).toFixed(1) : "0"
        return `${g.title}: $${g.current}/$${g.target} (${progress}%)`
      })
      .join("; ")

    return `
USER FINANCIAL PROFILE:
• Name: ${profile.firstName} ${profile.lastName}
• Age: ${profile.age}
• Risk Tolerance: ${profile.riskTolerance}
• Investment Experience: ${profile.investmentExperience}
• Time Horizon: ${profile.timeHorizon}

BUDGET ANALYSIS:
• Monthly Income: $${budgetData.income}
• Total Monthly Expenses: $${totalExpenses}
• Monthly Leftover: $${monthlyLeftover}
• Savings Rate: ${savingsRate}%
• Current Savings: $${budgetData.savings}
• Emergency Fund Coverage: ${emergencyFundMonths} months
• Top Expense Categories: ${topExpenses || "None recorded"}

FINANCIAL GOALS:
${goalsSummary || "No active goals set"}

FINANCIAL HEALTH INDICATORS:
• Emergency Fund Status: ${Number.parseFloat(emergencyFundMonths) >= 3 ? "✅ Good" : "⚠️ Needs attention"}
• Savings Rate: ${Number.parseFloat(savingsRate) >= 20 ? "✅ Excellent" : Number.parseFloat(savingsRate) >= 10 ? "✅ Good" : "⚠️ Could improve"}
• Investment Readiness: ${Number.parseFloat(emergencyFundMonths) >= 3 && monthlyLeftover > 0 ? "✅ Ready" : "⚠️ Build emergency fund first"}
    `.trim()
  } catch (error) {
    console.error("Error building user context:", error)
    return "Unable to load user data. Providing general financial advice."
  }
}

// Generate intelligent response based on user question and context
function generateResponse(userQuestion: string, userContext: string): string {
  const question = userQuestion.toLowerCase()

  // Budget-related questions
  if (question.includes("budget") || question.includes("analyze") || question.includes("spending")) {
    if (userContext.includes("not signed in")) {
      return `I'd love to analyze your budget! To provide personalized advice, please sign up and add your income and expenses to your budget tracker. 

Generally, a good budget follows the 50/30/20 rule:
• 50% for needs (housing, food, utilities)
• 30% for wants (entertainment, dining out)
• 20% for savings and debt repayment

Once you add your financial data, I can give you specific recommendations based on your actual numbers!`
    }

    const incomeMatch = userContext.match(/Monthly Income: \$(\d+)/)
    const expensesMatch = userContext.match(/Total Monthly Expenses: \$(\d+)/)
    const savingsRateMatch = userContext.match(/Savings Rate: ([\d.]+)%/)

    if (incomeMatch && expensesMatch && savingsRateMatch) {
      const income = Number.parseInt(incomeMatch[1])
      const expenses = Number.parseInt(expensesMatch[1])
      const savingsRate = Number.parseFloat(savingsRateMatch[1])
      const leftover = income - expenses

      return `📊 **Budget Analysis:**

**Income & Expenses:**
• Monthly Income: $${income.toLocaleString()}
• Total Expenses: $${expenses.toLocaleString()}
• Monthly Leftover: $${leftover.toLocaleString()}
• Savings Rate: ${savingsRate}%

**Assessment:**
${
  savingsRate >= 20
    ? "🎉 Excellent savings rate! You're saving " +
      savingsRate +
      "% of your income, which is above the recommended 20%."
    : savingsRate >= 10
      ? "✅ Good savings rate of " + savingsRate + "%. Consider increasing to 20% if possible."
      : "⚠️ Your savings rate of " + savingsRate + "% could be improved. Aim for at least 10-20%."
}

**Recommendations:**
${
  leftover > 0
    ? `• You have $${leftover.toLocaleString()} monthly surplus - great job!
• Consider automating savings to reach a 20% savings rate
• Review your top expense categories for optimization opportunities`
    : `• Your expenses equal or exceed your income
• Look for areas to reduce spending, especially in discretionary categories
• Consider ways to increase your income`
}

Would you like me to suggest specific areas where you could optimize your spending?`
    }
  }

  // Investment-related questions
  if (question.includes("invest") || question.includes("portfolio") || question.includes("stocks")) {
    if (userContext.includes("not signed in")) {
      return `For investment advice, I'd need to know your financial situation, risk tolerance, and goals. Please sign up to get personalized recommendations!

Generally, here's a basic investment approach:
• Build emergency fund first (3-6 months expenses)
• Pay off high-interest debt
• Start with low-cost index funds
• Diversify across asset classes
• Invest consistently over time`
    }

    const emergencyFundMatch = userContext.match(/Emergency Fund Coverage: ([\d.]+) months/)
    const riskToleranceMatch = userContext.match(/Risk Tolerance: (\w+)/)
    const ageMatch = userContext.match(/Age: (\d+)/)

    if (emergencyFundMatch && riskToleranceMatch) {
      const emergencyMonths = Number.parseFloat(emergencyFundMatch[1])
      const riskTolerance = riskToleranceMatch[1]
      const age = ageMatch ? Number.parseInt(ageMatch[1]) : 30

      if (emergencyMonths < 3) {
        return `⚠️ **Investment Readiness Check:**

Before investing, you should build your emergency fund. You currently have ${emergencyMonths} months of expenses saved, but I recommend 3-6 months.

**Priority Order:**
1. **Build Emergency Fund** - Save $${Math.round((3 - emergencyMonths) * 1000)} more
2. **Pay Off High-Interest Debt** - Focus on credit cards (>6% interest)
3. **Start Investing** - Once emergency fund is complete

Once you're ready to invest, I'll recommend a portfolio based on your ${riskTolerance} risk tolerance!`
      }

      // Investment allocation based on risk tolerance and age
      let stockAllocation = 100 - age // Age in bonds rule
      if (riskTolerance === "conservative") stockAllocation = Math.min(stockAllocation, 60)
      if (riskTolerance === "aggressive") stockAllocation = Math.min(stockAllocation + 10, 90)

      const bondAllocation = 100 - stockAllocation

      return `💰 **Investment Recommendations:**

**Your Profile:**
• Age: ${age}
• Risk Tolerance: ${riskTolerance}
• Emergency Fund: ✅ ${emergencyMonths} months (Good!)

**Suggested Portfolio Allocation:**
• **${stockAllocation}% Stocks** (VTI - Total Stock Market)
• **${bondAllocation}% Bonds** (BND - Total Bond Market)

**Investment Strategy:**
• Start with low-cost index funds
• Invest consistently (dollar-cost averaging)
• Rebalance annually
• Don't try to time the market
• Consider tax-advantaged accounts (401k, IRA)

**Next Steps:**
1. Open investment account (Vanguard, Fidelity, Schwab)
2. Set up automatic monthly investments
3. Start with target-date funds if you prefer simplicity

Would you like specific fund recommendations or help with account setup?`
    }
  }

  // Goal-related questions
  if (question.includes("goal") || question.includes("save for") || question.includes("target")) {
    if (userContext.includes("No active goals set")) {
      return `🎯 **Goal Setting Advice:**

I notice you haven't set any financial goals yet. Goals are crucial for financial success! Here are some common goals to consider:

**Short-term (1-2 years):**
• Emergency fund (3-6 months expenses)
• Vacation fund
• Car down payment

**Medium-term (2-5 years):**
• House down payment
• Wedding expenses
• Career development/education

**Long-term (5+ years):**
• Retirement savings
• Children's education
• Financial independence

**SMART Goal Framework:**
• **Specific** - Clear target amount
• **Measurable** - Track progress
• **Achievable** - Realistic timeline
• **Relevant** - Matches your priorities
• **Time-bound** - Set deadline

Would you like help setting up specific financial goals in your account?`
    }

    // Parse goals from context
    const goalsSection = userContext.match(/FINANCIAL GOALS:\n(.*?)(?=\n\n|$)/s)
    if (goalsSection && goalsSection[1].trim()) {
      return `🎯 **Goal Review:**

**Your Current Goals:**
${goalsSection[1]}

**Goal Analysis:**
Based on your goals and budget, here are my recommendations:

• **Prioritize by timeline** - Focus on short-term goals first
• **Automate savings** - Set up automatic transfers for each goal
• **Track progress** - Review monthly and celebrate milestones
• **Adjust as needed** - Life changes, so should your goals

**Funding Strategy:**
With your current monthly surplus, consider allocating funds across goals based on priority and timeline. Emergency fund should typically come first, followed by high-interest debt payoff.

Would you like help creating a specific savings plan for any of these goals?`
    }
  }

  // Debt-related questions
  if (question.includes("debt") || question.includes("credit card") || question.includes("loan")) {
    return `💳 **Debt Management Strategy:**

**Debt Payoff Methods:**

**1. Avalanche Method (Mathematically Optimal):**
• Pay minimums on all debts
• Put extra money toward highest interest rate debt
• Saves most money in interest

**2. Snowball Method (Psychologically Motivating):**
• Pay minimums on all debts
• Put extra money toward smallest balance
• Builds momentum with quick wins

**General Debt Priorities:**
1. **Credit Cards** (typically 18-25% APR) - Pay off ASAP
2. **Personal Loans** (6-15% APR) - Pay off before investing
3. **Student Loans** (3-7% APR) - Balance with investing
4. **Mortgage** (3-5% APR) - Often okay to carry while investing

**Debt Consolidation Options:**
• Balance transfer cards (0% intro APR)
• Personal loans (lower fixed rate)
• Home equity loans (tax deductible)

To give you specific advice, I'd need to know your debt amounts and interest rates. Would you like to add this information to your profile?`
  }

  // Savings-related questions
  if (question.includes("save") || question.includes("emergency fund") || question.includes("how much")) {
    const savingsMatch = userContext.match(/Current Savings: \$(\d+)/)
    const incomeMatch = userContext.match(/Monthly Income: \$(\d+)/)

    if (savingsMatch && incomeMatch) {
      const savings = Number.parseInt(savingsMatch[1])
      const income = Number.parseInt(incomeMatch[1])
      const recommendedEmergencyFund = income * 6 // 6 months of income as proxy

      return `💰 **Savings Strategy:**

**Your Current Situation:**
• Current Savings: $${savings.toLocaleString()}
• Monthly Income: $${income.toLocaleString()}

**Savings Priorities:**
1. **Emergency Fund**: $${recommendedEmergencyFund.toLocaleString()} (6 months income)
   ${savings >= recommendedEmergencyFund ? "✅ Complete!" : `⚠️ Need $${(recommendedEmergencyFund - savings).toLocaleString()} more`}

2. **High-Yield Savings Account**: Earn 4-5% APY
   • Marcus by Goldman Sachs
   • Ally Bank
   • Capital One 360

3. **Retirement Savings**: 10-15% of income
   • 401(k) with employer match (free money!)
   • Roth IRA for tax-free growth

**Savings Rate Recommendations:**
• **20% total savings rate** is ideal
• **Emergency fund first** - keep in savings account
• **Retirement second** - invest for growth
• **Other goals third** - based on timeline

Would you like help creating an automatic savings plan?`
    }

    return `💰 **General Savings Advice:**

**Emergency Fund Priority:**
• Save 3-6 months of expenses first
• Keep in high-yield savings account (4-5% APY)
• Don't invest emergency fund money

**Savings Rate Goals:**
• **Minimum**: 10% of income
• **Good**: 15% of income  
• **Excellent**: 20%+ of income

**Savings Vehicles:**
• **High-yield savings** - Emergency fund, short-term goals
• **CDs** - Known expenses 1-5 years out
• **Investment accounts** - Long-term goals (5+ years)

**Automation Tips:**
• Set up automatic transfers on payday
• Use separate accounts for different goals
• Pay yourself first before other expenses

To give you specific recommendations, please add your income and expenses to your budget tracker!`
  }

  // Default response for general questions
  return `I'm here to help with your financial questions! I can provide personalized advice on:

📊 **Budget Analysis** - Review your spending and savings rate
💰 **Investment Strategy** - Portfolio recommendations based on your risk tolerance  
🎯 **Goal Planning** - Help you reach your financial objectives
💳 **Debt Management** - Strategies to pay off debt efficiently
💰 **Savings Plans** - Emergency funds and savings strategies

${
  userContext.includes("not signed in")
    ? "For personalized advice based on your actual financial situation, please sign up and add your budget information!"
    : "I can see your financial profile and provide specific recommendations based on your actual data."
}

What specific area would you like help with today?`
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    // Get the latest user message
    const userMessage = messages[messages.length - 1]
    if (!userMessage || userMessage.role !== "user") {
      return NextResponse.json({ error: "No user message found" }, { status: 400 })
    }

    console.log("Processing AI advisor request:", userMessage.content)

    // Build user context for personalized advice
    const userContext = buildUserContext()
    console.log("User context built:", userContext.substring(0, 200) + "...")

    let reply: string

    // Try to use OpenAI if available
    try {
      if (typeof window === "undefined" && process.env.OPENAI_API_KEY) {
        const OpenAI = require("openai")
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        })

        const systemPrompt = `You are a professional financial advisor with expertise in budgeting, saving, investing, and debt management. 

IMPORTANT: Use the following user context to provide personalized advice:

${userContext}

Guidelines:
- Provide specific, actionable advice based on the user's actual financial data
- Use exact dollar amounts and percentages from their data when available
- Prioritize emergency fund, then debt payoff, then investing
- Recommend low-cost index funds for investing
- Be encouraging but realistic about their financial situation
- Format responses with clear sections and bullet points
- Include specific next steps they can take

If the user is not signed in, encourage them to create an account for personalized advice while still providing general guidance.`

        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage.content },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        })

        reply =
          completion.choices[0]?.message?.content ||
          "I apologize, but I couldn't generate a response. Please try again."
        console.log("OpenAI response generated successfully")
      } else {
        throw new Error("OpenAI not available")
      }
    } catch (openaiError) {
      console.log("OpenAI not available, using fallback:", openaiError)
      // Use intelligent fallback response
      reply = generateResponse(userMessage.content, userContext)
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("AI Advisor API Error:", error)
    return NextResponse.json(
      { error: "Failed to process request", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
