import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

interface RequestBody {
  messages: Message[]
}

// Initialize OpenAI client only on server side
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null

// Generate intelligent response based on user question
function generateIntelligentResponse(userQuestion: string): string {
  const question = userQuestion.toLowerCase()

  // Budget-related questions
  if (question.includes("budget") || question.includes("analyze") || question.includes("spending")) {
    return `📊 **Budget Analysis & Tips:**

**Creating a Strong Budget:**
• **Track everything** - Record all income and expenses for a month
• **Use the 50/30/20 rule** - 50% needs, 30% wants, 20% savings/debt
• **Prioritize essentials** - Housing, food, utilities, transportation
• **Find areas to cut** - Subscriptions, dining out, entertainment

**Budget Optimization:**
• **Automate savings** - Pay yourself first
• **Review monthly** - Adjust categories as needed
• **Use budgeting apps** - Mint, YNAB, or built-in tools
• **Set realistic goals** - Start small and build habits

**Emergency Fund Priority:**
Build 3-6 months of expenses before investing. This prevents debt during emergencies.

💡 **Pro Tip:** Sign up and add your income/expenses to get personalized budget analysis based on your actual numbers!

What specific aspect of budgeting would you like help with?`
  }

  // Investment-related questions
  if (
    question.includes("invest") ||
    question.includes("portfolio") ||
    question.includes("stocks") ||
    question.includes("retirement")
  ) {
    return `💰 **Investment Guidance:**

**Before You Invest:**
1. **Emergency Fund** - 3-6 months expenses in savings
2. **High-Interest Debt** - Pay off credit cards (>6% interest)
3. **Employer Match** - Get full 401(k) match (free money!)

**Investment Basics:**
• **Start Simple** - Low-cost index funds (VTI, VOO)
• **Diversify** - Don't put all eggs in one basket
• **Time in Market** - Beats timing the market
• **Dollar-Cost Average** - Invest consistently over time

**Age-Based Allocation:**
• **20s-30s:** 80-90% stocks, 10-20% bonds
• **40s:** 70-80% stocks, 20-30% bonds
• **50s+:** 60-70% stocks, 30-40% bonds

**Account Priority:**
1. 401(k) with match
2. Roth IRA ($6,500/year limit)
3. Traditional IRA or more 401(k)
4. Taxable investment accounts

**Recommended Funds:**
• **VTI** - Total Stock Market
• **VTIAX** - International Stocks
• **BND** - Total Bond Market

Would you like specific advice on portfolio allocation or account types?`
  }

  // Debt-related questions
  if (
    question.includes("debt") ||
    question.includes("loan") ||
    question.includes("credit card") ||
    question.includes("payoff")
  ) {
    return `💳 **Debt Management Strategy:**

**Debt Payoff Methods:**

**1. Avalanche Method (Mathematically Optimal):**
• Pay minimums on all debts
• Put extra money toward highest interest rate
• Saves most money long-term

**2. Snowball Method (Psychologically Motivating):**
• Pay minimums on all debts
• Put extra money toward smallest balance
• Builds momentum with quick wins

**Debt Priority Order:**
1. **Credit Cards** (18-25% APR) - Pay off immediately
2. **Personal Loans** (6-15% APR) - Pay before investing
3. **Student Loans** (3-7% APR) - Balance with investing
4. **Mortgage** (3-5% APR) - Often okay to carry

**Debt Consolidation Options:**
• **Balance Transfer Cards** - 0% intro APR (12-21 months)
• **Personal Loans** - Fixed rate, predictable payments
• **Home Equity** - Lower rates but secured by home

**Quick Debt Reduction Tips:**
• Stop using credit cards while paying off debt
• Use windfalls (tax refunds, bonuses) for debt
• Consider side income to accelerate payoff
• Negotiate with creditors for lower rates

What type of debt are you looking to tackle first?`
  }

  // Savings-related questions
  if (question.includes("save") || question.includes("emergency fund") || question.includes("savings")) {
    return `💰 **Savings Strategy:**

**Emergency Fund Priorities:**
• **Starter Fund:** $1,000 minimum (while paying debt)
• **Full Fund:** 3-6 months of expenses
• **Location:** High-yield savings account (4-5% APY)

**Savings Rate Goals:**
• **Minimum:** 10% of gross income
• **Good:** 15% of gross income
• **Excellent:** 20%+ of gross income

**High-Yield Savings Options:**
• **Marcus by Goldman Sachs** - 4.5% APY
• **Ally Bank** - 4.25% APY
• **Capital One 360** - 4.3% APY
• **Discover Bank** - 4.5% APY

**Savings Automation:**
• **Direct Deposit Split** - Automatic to savings
• **Automatic Transfers** - Day after payday
• **Round-Up Apps** - Acorns, Qapital
• **Separate Accounts** - Different goals, different accounts

**Savings Goals Timeline:**
• **Short-term (1-2 years):** High-yield savings
• **Medium-term (2-5 years):** CDs or conservative investments
• **Long-term (5+ years):** Investment accounts

**Quick Savings Boost:**
• Save tax refunds and bonuses
• Sell unused items
• Reduce one major expense category
• Take on temporary side work

How much are you looking to save, and what's your timeline?`
  }

  // Goal-related questions
  if (question.includes("goal") || question.includes("plan") || question.includes("target")) {
    return `🎯 **Financial Goal Planning:**

**SMART Goals Framework:**
• **Specific** - Clear, defined target
• **Measurable** - Dollar amount and timeline
• **Achievable** - Realistic given your income
• **Relevant** - Matches your priorities
• **Time-bound** - Set deadline

**Goal Categories:**

**Short-term (1-2 years):**
• Emergency fund
• Vacation fund
• Car down payment
• Home repairs/improvements

**Medium-term (2-5 years):**
• House down payment
• Wedding expenses
• Career development/education
• Major purchases

**Long-term (5+ years):**
• Retirement savings
• Children's education
• Financial independence
• Legacy planning

**Goal Prioritization:**
1. **Emergency Fund** - Foundation for everything else
2. **High-Interest Debt** - Guaranteed "return" on payment
3. **Retirement** - Time and compound interest matter
4. **Other Goals** - Based on personal priorities

**Funding Strategy:**
• **Separate accounts** for each goal
• **Automatic transfers** on payday
• **Track progress** monthly
• **Celebrate milestones** to stay motivated

**Goal Calculation Example:**
• Goal: $20,000 house down payment in 3 years
• Monthly needed: $20,000 ÷ 36 months = $556/month
• With 4% savings account: ~$520/month needed

What financial goal are you working toward?`
  }

  // General financial health questions
  if (question.includes("financial health") || question.includes("where to start") || question.includes("beginner")) {
    return `🏥 **Financial Health Checkup:**

**Foundation Steps (Do These First):**
1. **Track Spending** - Know where money goes
2. **Create Budget** - 50/30/20 rule to start
3. **Build Emergency Fund** - $1,000 minimum
4. **Pay Off High-Interest Debt** - Credit cards first

**Intermediate Steps:**
5. **Full Emergency Fund** - 3-6 months expenses
6. **Employer 401(k) Match** - Free money!
7. **Roth IRA** - Tax-free growth
8. **Increase Income** - Skills, side hustles, career growth

**Advanced Steps:**
9. **Taxable Investments** - After maxing retirement accounts
10. **Real Estate** - Primary residence, then investment
11. **Estate Planning** - Wills, trusts, beneficiaries
12. **Tax Optimization** - Strategies to minimize taxes

**Financial Health Indicators:**
✅ **Emergency fund** covers 3-6 months expenses
✅ **Debt-to-income ratio** under 36%
✅ **Savings rate** 15%+ of gross income
✅ **Credit score** 740+
✅ **Net worth** growing each year

**Quick Assessment Questions:**
• Can you cover a $1,000 emergency without debt?
• Are you saving at least 10% of your income?
• Do you know your monthly expenses?
• Are you investing for retirement?

Where would you like to focus first?`
  }

  // Default comprehensive response
  return `👋 **Welcome to Your AI Financial Advisor!**

I'm here to help you with all aspects of personal finance. Here's what I can assist you with:

**📊 Budget & Spending:**
• Creating and optimizing budgets
• Tracking expenses effectively
• Finding areas to reduce costs
• 50/30/20 rule implementation

**💰 Saving & Investing:**
• Building emergency funds
• Investment strategies and allocation
• Retirement planning (401k, IRA)
• High-yield savings recommendations

**💳 Debt Management:**
• Credit card payoff strategies
• Student loan optimization
• Debt consolidation options
• Avalanche vs. Snowball methods

**🎯 Goal Planning:**
• Setting SMART financial goals
• Creating actionable savings plans
• Timeline and milestone tracking
• Priority-based goal ranking

**🏥 Financial Health:**
• Complete financial checkups
• Step-by-step improvement plans
• Key performance indicators
• Beginner-friendly guidance

**💡 Getting Started:**
For personalized advice based on your actual financial situation, consider signing up and adding your budget information. This allows me to provide specific recommendations with real numbers!

**What would you like help with today?** You can ask about any financial topic, and I'll provide detailed, actionable advice tailored to your situation.

Some popular questions:
• "How should I prioritize my financial goals?"
• "What's the best way to pay off my credit card debt?"
• "How much should I be saving for retirement?"
• "Should I invest or pay off debt first?"`
}

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 AI Advisor API called")

    // Parse request body with error handling
    let body: RequestBody
    try {
      body = await request.json()
      console.log("📥 Request body parsed successfully")
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError)
      return NextResponse.json(
        {
          error: "Invalid JSON in request body",
          reply: "I'm having trouble understanding your request. Please try again.",
        },
        { status: 400 },
      )
    }

    const { messages } = body

    // Validate messages array
    if (!messages) {
      console.error("❌ No messages field in request")
      return NextResponse.json(
        {
          error: "Missing messages field",
          reply: "I didn't receive your message properly. Please try asking your question again.",
        },
        { status: 400 },
      )
    }

    if (!Array.isArray(messages)) {
      console.error("❌ Messages is not an array:", typeof messages)
      return NextResponse.json(
        {
          error: "Messages must be an array",
          reply: "There was a formatting issue with your message. Please try again.",
        },
        { status: 400 },
      )
    }

    if (messages.length === 0) {
      console.error("❌ Empty messages array")
      return NextResponse.json(
        {
          error: "Empty messages array",
          reply: "I didn't receive any messages. Please ask me a financial question!",
        },
        { status: 400 },
      )
    }

    // Get the latest user message
    const userMessage = messages[messages.length - 1]
    if (!userMessage) {
      console.error("❌ No user message found")
      return NextResponse.json(
        {
          error: "No user message found",
          reply: "I couldn't find your message. Please try asking your question again.",
        },
        { status: 400 },
      )
    }

    if (userMessage.role !== "user") {
      console.error("❌ Last message is not from user:", userMessage.role)
      return NextResponse.json(
        {
          error: "Invalid message role",
          reply: "I can only respond to user messages. Please ask me a financial question!",
        },
        { status: 400 },
      )
    }

    if (!userMessage.content || typeof userMessage.content !== "string") {
      console.error("❌ Invalid message content:", userMessage.content)
      return NextResponse.json(
        {
          error: "Invalid message content",
          reply: "Your message seems to be empty. Please ask me a financial question!",
        },
        { status: 400 },
      )
    }

    const userQuestion = userMessage.content.trim()
    if (userQuestion.length === 0) {
      console.error("❌ Empty message content after trim")
      return NextResponse.json(
        {
          error: "Empty message content",
          reply: "Your message appears to be empty. Please ask me a financial question!",
        },
        { status: 400 },
      )
    }

    console.log("✅ Processing user message:", userQuestion.substring(0, 100) + "...")

    let reply: string
    let source = "fallback"

    // Try OpenAI if available and properly configured
    if (openai) {
      try {
        console.log("🤖 Attempting OpenAI API call...")

        const systemPrompt = `You are a professional AI financial advisor with expertise in personal finance, budgeting, investing, and debt management. You provide helpful, actionable advice to users.

Guidelines:
- Provide specific, actionable financial advice
- Use clear headings and bullet points for readability
- Include concrete examples and numbers when helpful
- Prioritize emergency funds, debt payoff, then investing
- Recommend low-cost index funds for investing
- Be encouraging but realistic about financial goals
- Keep responses comprehensive but under 800 words
- Use emojis sparingly for better readability

Always provide valuable advice even for general questions. If users want personalized advice, encourage them to sign up and add their financial information.`

        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userQuestion },
          ],
          max_tokens: 1200,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        })

        reply =
          completion.choices[0]?.message?.content ||
          "I apologize, but I couldn't generate a response. Please try again."
        source = "openai"
        console.log("✅ OpenAI response generated successfully")
      } catch (openaiError) {
        console.error("❌ OpenAI API Error:", openaiError)
        console.log("🔄 Falling back to intelligent response system...")
        reply = generateIntelligentResponse(userQuestion)
        source = "fallback"
      }
    } else {
      console.log("⚠️ No OpenAI client available, using intelligent fallback")
      reply = generateIntelligentResponse(userQuestion)
      source = "fallback"
    }

    // Ensure we have a valid reply
    if (!reply || reply.trim().length === 0) {
      reply = `I apologize, but I'm having trouble generating a response right now. Here are some general financial tips:

📊 **Quick Financial Health Tips:**
• Build an emergency fund (3-6 months expenses)
• Pay off high-interest debt first
• Save 10-20% of your income
• Invest in low-cost index funds for long-term growth

Please try asking your question again, or explore the other features of the app!`
    }

    console.log("✅ Sending successful response")
    return NextResponse.json({
      reply,
      timestamp: new Date().toISOString(),
      source,
    })
  } catch (error) {
    console.error("💥 Unexpected API Error:", error)

    // Provide a helpful error response
    const errorReply = `I apologize, but I'm experiencing technical difficulties right now. Here are some general financial tips while I get back online:

📊 **Essential Financial Steps:**
• **Emergency Fund:** Save 3-6 months of expenses
• **Debt Management:** Pay off high-interest debt (>6% APR) first
• **Savings Rate:** Aim for 10-20% of income
• **Investing:** Low-cost index funds for long-term growth
• **Budgeting:** Track expenses and use 50/30/20 rule

**Popular Financial Questions:**
• "How much should I save for emergencies?"
• "Should I pay off debt or invest first?"
• "What's the best way to start investing?"
• "How do I create a budget that works?"

Please try asking your question again in a moment, or explore the other features of the app like Budget tracking and Goal setting!`

    return NextResponse.json(
      {
        reply: errorReply,
        error: "Service temporarily unavailable",
        timestamp: new Date().toISOString(),
        source: "error_fallback",
      },
      { status: 200 }, // Return 200 so the UI can display the helpful message
    )
  }
}
