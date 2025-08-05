import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { getUserData } from "@/lib/user-data"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

interface RequestBody {
  messages: Message[]
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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
function generateFallbackResponse(userQuestion: string, userContext: string): string {
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
    console.log("AI Advisor API called")

    const body: RequestBody = await request.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages format")
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    // Get the latest user message
    const userMessage = messages[messages.length - 1]
    if (!userMessage || userMessage.role !== "user") {
      console.error("No user message found")
      return NextResponse.json({ error: "No user message found" }, { status: 400 })
    }

    console.log("Processing user message:", userMessage.content)

    // Build user context for personalized advice
    const userContext = buildUserContext()
    console.log("User context built successfully")

    let reply: string

    // Try to use OpenAI if API key is available
    if (process.env.OPENAI_API_KEY) {
      try {
        console.log("Using OpenAI GPT-4 for response generation...")

        const systemPrompt = `You are a professional AI financial advisor with expertise in personal finance, budgeting, investing, and debt management. You provide personalized, actionable advice based on the user's actual financial data.

IMPORTANT: Use the following user context to provide personalized advice:

${userContext}

FINANCIAL ADVICE GUIDELINES:
1. **Always use the user's actual financial data** when providing advice
2. **Be specific with numbers and calculations** based on their real situation
3. **Prioritize advice based on financial health**: Emergency fund → High-interest debt → Retirement savings → Other goals
4. **Consider their age, risk tolerance, and goals** when making recommendations
5. **Provide actionable, step-by-step advice** they can implement immediately
6. **Use a friendly, encouraging tone** while being professional and realistic
7. **If they lack certain data**, suggest they add it to get better personalized advice

INVESTMENT RECOMMENDATIONS:
• Age-based stock allocation: roughly (100 - age)% in stocks, rest in bonds
• Low-cost index funds: VTI (total market), VOO (S&P 500), BND (bonds)
• Dollar-cost averaging for consistent investing
• Tax-advantaged accounts first (401k with match, then IRA)
• Emergency fund must be complete before investing

BUDGETING ADVICE:
• 50/30/20 rule: 50% needs, 30% wants, 20% savings/debt repayment
• Track spending to identify optimization opportunities
• Automate savings and investments
• Review and adjust monthly based on actual spending patterns

FORMAT YOUR RESPONSE:
• Use clear headings and bullet points
• Include specific dollar amounts from their data
• Provide concrete next steps
• Use emojis sparingly for readability
• Keep responses comprehensive but concise (under 800 words)

If the user is not signed in, encourage them to create an account for personalized advice while still providing valuable general guidance.`

        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.slice(-3), // Include last 3 messages for context
          ],
          max_tokens: 1200,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        })

        reply =
          completion.choices[0]?.message?.content ||
          "I apologize, but I couldn't generate a response. Please try again."

        console.log("OpenAI response generated successfully")
        console.log("Response length:", reply.length)
      } catch (openaiError) {
        console.error("OpenAI API Error:", openaiError)
        console.log("Falling back to intelligent response system...")
        reply = generateFallbackResponse(userMessage.content, userContext)
      }
    } else {
      console.log("No OpenAI API key found, using fallback response system")
      reply = generateFallbackResponse(userMessage.content, userContext)
    }

    return NextResponse.json({
      reply,
      timestamp: new Date().toISOString(),
      source: process.env.OPENAI_API_KEY ? "openai" : "fallback",
    })
  } catch (error) {
    console.error("AI Advisor API Error:", error)

    // Provide a helpful error response
    const errorReply = `I apologize, but I'm experiencing technical difficulties right now. Here are some general financial tips while I get back online:

📊 **Quick Financial Health Check:**
• Emergency fund: 3-6 months of expenses in savings
• Debt: Pay off high-interest debt (>6% APR) before investing
• Savings rate: Aim for 10-20% of income
• Investing: Low-cost index funds for long-term growth

Please try asking your question again in a moment, or feel free to explore the other features of the app!`

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
