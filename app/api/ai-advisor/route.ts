import { type NextRequest, NextResponse } from "next/server"
import { getUserData } from "@/lib/user-data"

// Initialize OpenAI client on server side only
let openai: any = null
if (process.env.OPENAI_API_KEY) {
  try {
    const { OpenAI } = require("openai")
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  } catch (error) {
    console.error("Failed to initialize OpenAI:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("🔄 AI Advisor API called")

    // Parse request body safely
    let body
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

    // Validate request structure
    if (!body || typeof body !== "object") {
      console.error("❌ Invalid request body structure")
      return NextResponse.json(
        {
          reply: "I'm sorry, there was an issue with your request format. Please try again.",
          source: "error",
        },
        { status: 400 },
      )
    }

    const { messages } = body

    // Validate messages array
    if (!Array.isArray(messages) || messages.length === 0) {
      console.error("❌ Invalid messages array:", messages)
      return NextResponse.json(
        {
          reply: "I'm sorry, I didn't receive any messages to process. Please ask me a financial question.",
          source: "error",
        },
        { status: 400 },
      )
    }

    // Validate message structure
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || typeof lastMessage.content !== "string" || !lastMessage.content.trim()) {
      console.error("❌ Invalid message content:", lastMessage)
      return NextResponse.json(
        {
          reply: "I'm sorry, your message appears to be empty. Please ask me a specific financial question.",
          source: "error",
        },
        { status: 400 },
      )
    }

    // Get user data for context
    const userData = getUserData()
    console.log("📊 User data loaded for AI context")

    // Build context for AI
    const userContext = `
User Profile:
- Name: ${userData.profile.firstName} ${userData.profile.lastName}
- Age: ${userData.profile.age}
- Risk Tolerance: ${userData.profile.riskTolerance}
- Investment Experience: ${userData.profile.investmentExperience}
- Time Horizon: ${userData.profile.timeHorizon}

Financial Situation:
- Monthly Income: $${userData.budgetData.income?.toLocaleString() || "0"}
- Monthly Expenses: $${Object.values(userData.budgetData.expenses || {})
      .reduce((sum: number, exp: number) => sum + exp, 0)
      .toLocaleString()}
- Savings: $${userData.budgetData.savings?.toLocaleString() || "0"}
- Active Goals: ${userData.goals?.length || 0}

Learning Progress:
- Completed Lessons: ${userData.progress?.completedLessons || 0}
- Current Streak: ${userData.progress?.currentStreak || 0} days
`

    const systemPrompt = `You are a knowledgeable and friendly financial advisor AI assistant. You provide personalized financial advice based on the user's specific situation, goals, and experience level.

${userContext}

Guidelines:
- Provide specific, actionable advice tailored to the user's situation
- Use clear, jargon-free language appropriate for their experience level
- Reference their specific financial data when relevant
- Suggest concrete next steps they can take
- Be encouraging and supportive
- If asked about investments, consider their risk tolerance and time horizon
- Always prioritize emergency funds and debt management before investment advice
- Keep responses concise but comprehensive (2-4 paragraphs max)

Remember: You are providing educational information, not professional financial advice. Users should consult with qualified financial professionals for major financial decisions.`

    // Try OpenAI first if available
    if (openai) {
      try {
        console.log("🤖 Attempting OpenAI API call...")

        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          max_tokens: 500,
          temperature: 0.7,
        })

        const reply = completion.choices[0]?.message?.content?.trim()

        if (reply) {
          console.log("✅ OpenAI response received")
          return NextResponse.json({
            reply,
            source: "openai",
          })
        } else {
          console.log("⚠️ Empty OpenAI response, falling back")
        }
      } catch (openaiError: any) {
        console.error("❌ OpenAI API Error:", openaiError.message)
        // Continue to fallback
      }
    } else {
      console.log("⚠️ OpenAI not available, using fallback")
    }

    // Intelligent fallback system
    const userMessage = lastMessage.content.toLowerCase()
    let fallbackReply = ""

    // Budget-related questions
    if (userMessage.includes("budget") || userMessage.includes("expense") || userMessage.includes("spending")) {
      const totalExpenses = Object.values(userData.budgetData.expenses || {}).reduce(
        (sum: number, exp: number) => sum + exp,
        0,
      )
      const income = userData.budgetData.income || 0
      const leftover = income - totalExpenses

      fallbackReply = `Based on your current budget of $${income.toLocaleString()} monthly income and $${totalExpenses.toLocaleString()} in expenses, you have $${leftover.toLocaleString()} leftover each month.

I recommend following the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment. ${leftover > 0 ? `Your surplus of $${leftover.toLocaleString()} is great for building your emergency fund or investing.` : "Consider reviewing your expenses to find areas where you can cut back."}

Start by tracking every expense for a month, then categorize them to see where your money is really going. Focus on reducing discretionary spending first, then look at ways to optimize fixed costs like insurance or subscriptions.`
    }
    // Investment questions
    else if (userMessage.includes("invest") || userMessage.includes("stock") || userMessage.includes("portfolio")) {
      const age = userData.profile.age || 25
      const stockAllocation = Math.max(100 - age, 60)
      const bondAllocation = 100 - stockAllocation

      fallbackReply = `For someone your age (${age}), a common rule of thumb is ${stockAllocation}% stocks and ${bondAllocation}% bonds, though this depends on your risk tolerance (${userData.profile.riskTolerance}).

${userData.budgetData.savings < 10000 ? "Before investing, make sure you have an emergency fund of 3-6 months of expenses. " : ""}Start with low-cost index funds like total stock market or S&P 500 funds. Consider maxing out tax-advantaged accounts first: 401(k) up to company match, then Roth IRA, then back to 401(k).

For beginners, I recommend starting with a target-date fund or a simple three-fund portfolio (total stock market, international stocks, bonds). Invest consistently regardless of market conditions - dollar-cost averaging helps reduce timing risk.`
    }
    // Debt questions
    else if (userMessage.includes("debt") || userMessage.includes("loan") || userMessage.includes("credit card")) {
      fallbackReply = `For debt management, you have two main strategies: the debt avalanche (pay minimums on all debts, then extra on highest interest rate) or debt snowball (pay minimums on all debts, then extra on smallest balance).

The avalanche method saves more money mathematically, while the snowball method provides psychological wins. Choose based on what motivates you more.

Consider debt consolidation if you have multiple high-interest debts - a personal loan or balance transfer card with 0% intro APR might help. Always pay more than the minimum when possible, and avoid taking on new debt while paying off existing balances.`
    }
    // Savings questions
    else if (
      userMessage.includes("save") ||
      userMessage.includes("emergency fund") ||
      userMessage.includes("savings")
    ) {
      const monthlyExpenses = Object.values(userData.budgetData.expenses || {}).reduce(
        (sum: number, exp: number) => sum + exp,
        0,
      )
      const currentSavings = userData.budgetData.savings || 0
      const emergencyMonths = monthlyExpenses > 0 ? (currentSavings / monthlyExpenses).toFixed(1) : "0"

      fallbackReply = `You currently have $${currentSavings.toLocaleString()} saved, which covers about ${emergencyMonths} months of expenses. Aim for 3-6 months of expenses in your emergency fund.

Start by automating your savings - set up automatic transfers to a high-yield savings account right after payday. Even $50-100 per month adds up quickly. Look for accounts offering 4-5% APY to maximize growth.

Build your emergency fund first, then save for specific goals. Use separate savings accounts for different goals (vacation, car, house down payment) to avoid spending money earmarked for other purposes.`
    }
    // Goal-related questions
    else if (userMessage.includes("goal") || userMessage.includes("plan") || userMessage.includes("future")) {
      const activeGoals = userData.goals?.length || 0

      fallbackReply = `You currently have ${activeGoals} active financial goals. Effective goal setting follows the SMART framework: Specific, Measurable, Achievable, Relevant, and Time-bound.

Prioritize your goals: emergency fund first, then high-interest debt payoff, then retirement savings, then other goals like house down payment or vacation. Break large goals into smaller milestones to stay motivated.

For each goal, calculate how much you need to save monthly to reach it by your target date. Automate these savings and review progress monthly. Consider using separate savings accounts for each goal to avoid mixing funds.`
    }
    // General financial health
    else if (
      userMessage.includes("financial health") ||
      userMessage.includes("how am i doing") ||
      userMessage.includes("advice")
    ) {
      const income = userData.budgetData.income || 0
      const expenses = Object.values(userData.budgetData.expenses || {}).reduce(
        (sum: number, exp: number) => sum + exp,
        0,
      )
      const savings = userData.budgetData.savings || 0
      const savingsRate = income > 0 ? (((income - expenses) / income) * 100).toFixed(1) : "0"

      fallbackReply = `Based on your financial profile, here's a quick health check:

💰 Savings Rate: ${savingsRate}% (aim for 20%+)
🏦 Emergency Fund: $${savings.toLocaleString()} (aim for 3-6 months of expenses)
📚 Learning Progress: ${userData.progress?.completedLessons || 0} lessons completed

Key next steps: ${savings < expenses * 3 ? "Build your emergency fund, " : ""}${Number.parseFloat(savingsRate) < 20 ? "increase your savings rate, " : ""}and continue your financial education. You're making progress by learning - knowledge is the foundation of good financial decisions!`
    }
    // Default response
    else {
      fallbackReply = `I'm here to help with your financial questions! I can provide guidance on budgeting, saving, investing, debt management, and financial planning.

Based on your profile, some areas we could explore:
• Budget optimization and expense tracking
• Building your emergency fund and savings strategy  
• Investment basics and portfolio allocation
• Debt payoff strategies
• Setting and achieving financial goals

What specific financial topic would you like to discuss? Feel free to ask about your current situation or any financial concept you'd like to understand better.`
    }

    console.log("✅ Fallback response generated")
    return NextResponse.json({
      reply: fallbackReply,
      source: "fallback",
    })
  } catch (error: any) {
    console.error("❌ Unexpected error in AI advisor:", error)
    return NextResponse.json(
      {
        reply:
          "I apologize, but I'm experiencing technical difficulties right now. Please try asking your question again in a moment. In the meantime, feel free to explore the learning modules or check out the budgeting tools!",
        source: "error",
      },
      { status: 500 },
    )
  }
}
