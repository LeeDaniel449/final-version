import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { getUserData } from "@/lib/user-data"

// Initialize OpenAI client
let openai: OpenAI | null = null

try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    console.log("✅ OpenAI client initialized successfully")
  } else {
    console.log("⚠️ OpenAI API key not found, using fallback system")
  }
} catch (error) {
  console.error("❌ Failed to initialize OpenAI:", error)
  openai = null
}

// Intelligent fallback system with personalized responses
function generateIntelligentResponse(question: string, userData: any): string {
  const { profile, budgetData, goals, progress } = userData
  const lowerQuestion = question.toLowerCase()

  // Budget-related questions
  if (lowerQuestion.includes("budget") || lowerQuestion.includes("expense") || lowerQuestion.includes("spending")) {
    const totalExpenses = Object.values(budgetData.expenses).reduce((sum: number, expense: number) => sum + expense, 0)
    const monthlyLeftover = budgetData.income - totalExpenses
    const savingsRate = budgetData.income > 0 ? ((monthlyLeftover / budgetData.income) * 100).toFixed(1) : "0"

    return `Based on your current financial situation:

**Your Budget Overview:**
• Monthly Income: $${budgetData.income.toLocaleString()}
• Total Expenses: $${totalExpenses.toLocaleString()}
• Monthly Leftover: $${monthlyLeftover.toLocaleString()}
• Savings Rate: ${savingsRate}%

**Top Expense Categories:**
${Object.entries(budgetData.expenses)
  .sort(([, a], [, b]) => (b as number) - (a as number))
  .slice(0, 3)
  .map(
    ([category, amount]) =>
      `• ${category.charAt(0).toUpperCase() + category.slice(1)}: $${(amount as number).toLocaleString()}`,
  )
  .join("\n")}

**Recommendations:**
${
  monthlyLeftover > 0
    ? `✅ Great job! You have a positive cash flow. Consider increasing your emergency fund or investing the surplus.`
    : `⚠️ Your expenses exceed your income. Focus on reducing discretionary spending in entertainment and dining out.`
}

${
  Number.parseFloat(savingsRate) < 20
    ? `💡 Try to increase your savings rate to 20% by reducing your largest expense categories.`
    : `🎉 Excellent savings rate! You're on track for financial success.`
}`
  }

  // Investment-related questions
  if (lowerQuestion.includes("invest") || lowerQuestion.includes("portfolio") || lowerQuestion.includes("stock")) {
    const age = Number.parseInt(profile.age) || 30
    const stockAllocation = Math.max(20, 100 - age)
    const bondAllocation = 100 - stockAllocation

    return `Based on your profile (Age: ${age}, Risk Tolerance: ${profile.riskTolerance}, Experience: ${profile.investmentExperience}):

**Recommended Asset Allocation:**
• Stocks/Equity: ${stockAllocation}%
• Bonds/Fixed Income: ${bondAllocation}%
• Emergency Fund: 6 months of expenses ($${(Object.values(budgetData.expenses).reduce((sum: number, expense: number) => sum + expense, 0) * 6).toLocaleString()})

**Investment Strategy:**
${
  profile.investmentExperience === "beginner"
    ? `🌱 **Beginner Approach:**
  • Start with low-cost index funds (S&P 500, Total Market)
  • Consider target-date funds for simplicity
  • Automate investments with dollar-cost averaging
  • Focus on learning before picking individual stocks`
    : `📈 **Intermediate/Advanced Approach:**
  • Diversify across asset classes and geographies
  • Consider sector-specific ETFs
  • Rebalance quarterly
  • Tax-loss harvesting in taxable accounts`
}

**Next Steps:**
1. Build emergency fund to $${(Object.values(budgetData.expenses).reduce((sum: number, expense: number) => sum + expense, 0) * 6).toLocaleString()}
2. Max out employer 401(k) match
3. Open Roth IRA if eligible
4. Invest surplus in diversified portfolio`
  }

  // Goal-related questions
  if (lowerQuestion.includes("goal") || lowerQuestion.includes("save") || lowerQuestion.includes("target")) {
    const activeGoals = goals.filter((g: any) => g.status === "active")

    return `**Your Financial Goals Analysis:**

${
  activeGoals.length > 0
    ? activeGoals
        .map((goal: any) => {
          const progress = ((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)
          const remaining = goal.targetAmount - goal.currentAmount
          const monthsLeft = Math.ceil(
            (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30),
          )
          const monthlyNeeded = monthsLeft > 0 ? (remaining / monthsLeft).toFixed(0) : 0

          return `**${goal.title}**
  • Progress: ${progress}% ($${goal.currentAmount.toLocaleString()} / $${goal.targetAmount.toLocaleString()})
  • Remaining: $${remaining.toLocaleString()}
  • Target Date: ${new Date(goal.targetDate).toLocaleDateString()}
  • Monthly Savings Needed: $${monthlyNeeded}`
        })
        .join("\n\n")
    : "You haven't set any financial goals yet."
}

**SMART Goal Framework:**
• **Specific:** Define exactly what you want to achieve
• **Measurable:** Set a clear dollar amount
• **Achievable:** Based on your current income ($${budgetData.income.toLocaleString()}/month)
• **Relevant:** Align with your life priorities
• **Time-bound:** Set realistic deadlines

**Recommendations:**
${
  activeGoals.length === 0
    ? `🎯 Start by setting 2-3 specific financial goals (emergency fund, vacation, down payment)`
    : `📊 You're tracking ${activeGoals.length} goals. Consider automating savings to stay on track.`
}`
  }

  // Debt-related questions
  if (lowerQuestion.includes("debt") || lowerQuestion.includes("loan") || lowerQuestion.includes("credit")) {
    return `**Debt Management Strategy:**

**Two Main Approaches:**

**1. Debt Avalanche (Mathematically Optimal):**
• Pay minimums on all debts
• Put extra money toward highest interest rate debt
• Saves most money in interest over time

**2. Debt Snowball (Psychologically Motivating):**
• Pay minimums on all debts  
• Put extra money toward smallest balance
• Builds momentum through quick wins

**Based on your budget:**
• Monthly Income: $${budgetData.income.toLocaleString()}
• Available for debt payment: $${Math.max(0, budgetData.income - Object.values(budgetData.expenses).reduce((sum: number, expense: number) => sum + expense, 0)).toLocaleString()}

**Action Steps:**
1. List all debts with balances and interest rates
2. Choose avalanche or snowball method
3. Automate minimum payments
4. Apply any extra income to target debt
5. Avoid taking on new debt

**Emergency Fund Priority:**
Build $1,000 emergency fund first, then attack debt aggressively.`
  }

  // General financial health
  if (
    lowerQuestion.includes("financial health") ||
    lowerQuestion.includes("how am i doing") ||
    lowerQuestion.includes("advice")
  ) {
    const totalExpenses = Object.values(budgetData.expenses).reduce((sum: number, expense: number) => sum + expense, 0)
    const monthlyLeftover = budgetData.income - totalExpenses
    const savingsRate = budgetData.income > 0 ? (monthlyLeftover / budgetData.income) * 100 : 0
    const emergencyMonths = totalExpenses > 0 ? budgetData.savings / totalExpenses : 0

    const healthScore =
      (emergencyMonths >= 6 ? 25 : emergencyMonths >= 3 ? 15 : 5) +
      (savingsRate >= 20 ? 25 : savingsRate >= 10 ? 15 : 5) +
      (monthlyLeftover > 0 ? 25 : 0) +
      (goals.length > 0 ? 25 : 0)

    return `**Your Financial Health Checkup:**

**Overall Score: ${healthScore}/100** ${healthScore >= 80 ? "🌟 Excellent!" : healthScore >= 60 ? "👍 Good" : healthScore >= 40 ? "⚠️ Needs Work" : "🚨 Critical"}

**Key Metrics:**
• Emergency Fund: ${emergencyMonths.toFixed(1)} months of expenses ${emergencyMonths >= 6 ? "✅" : emergencyMonths >= 3 ? "⚠️" : "❌"}
• Savings Rate: ${savingsRate.toFixed(1)}% ${savingsRate >= 20 ? "✅" : savingsRate >= 10 ? "⚠️" : "❌"}
• Monthly Cash Flow: $${monthlyLeftover.toLocaleString()} ${monthlyLeftover > 0 ? "✅" : "❌"}
• Active Goals: ${goals.length} ${goals.length > 0 ? "✅" : "❌"}

**Priority Action Items:**
${emergencyMonths < 6 ? "1. Build emergency fund to 6 months of expenses\n" : ""}
${savingsRate < 20 ? "2. Increase savings rate by reducing discretionary spending\n" : ""}
${monthlyLeftover <= 0 ? "3. Create a budget surplus by cutting expenses\n" : ""}
${goals.length === 0 ? "4. Set 2-3 specific financial goals with deadlines\n" : ""}

**You're doing well in:** ${
      [
        emergencyMonths >= 6 && "Emergency preparedness",
        savingsRate >= 20 && "Savings discipline",
        monthlyLeftover > 0 && "Budget management",
        goals.length > 0 && "Goal setting",
      ]
        .filter(Boolean)
        .join(", ") || "Keep working on the basics!"
    }`
  }

  // Default response for other questions
  return `I understand you're asking about "${question}". Here's some personalized advice based on your financial profile:

**Your Current Situation:**
• Monthly Income: $${budgetData.income.toLocaleString()}
• Monthly Expenses: $${Object.values(budgetData.expenses)
    .reduce((sum: number, expense: number) => sum + expense, 0)
    .toLocaleString()}
• Savings: $${budgetData.savings.toLocaleString()}
• Active Goals: ${goals.length}
• Learning Progress: ${progress.completedLessons} lessons completed

**General Financial Principles:**
1. **Emergency Fund First:** Build 3-6 months of expenses in savings
2. **Pay Yourself First:** Automate savings before spending
3. **Invest for the Long Term:** Time in market beats timing the market
4. **Diversify:** Don't put all eggs in one basket
5. **Keep Learning:** Financial education pays the best dividends

**Next Steps:**
• Review your budget monthly
• Automate savings and investments
• Set specific, measurable financial goals
• Continue learning through our modules

Would you like me to elaborate on any specific aspect of your financial situation?`
}

export async function POST(request: NextRequest) {
  try {
    const { message, useOpenAI = true } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Get user data for personalized responses
    const userData = getUserData()

    // Try OpenAI first if enabled and available
    if (useOpenAI && openai) {
      try {
        console.log("🤖 Using OpenAI for response")

        const systemPrompt = `You are a knowledgeable financial advisor helping users with their personal finance questions. 

User's Financial Profile:
- Name: ${userData.profile.firstName} ${userData.profile.lastName}
- Age: ${userData.profile.age}
- Risk Tolerance: ${userData.profile.riskTolerance}
- Investment Experience: ${userData.profile.investmentExperience}
- Monthly Income: $${userData.budgetData.income}
- Monthly Expenses: $${Object.values(userData.budgetData.expenses).reduce((sum: number, expense: number) => sum + expense, 0)}
- Savings: $${userData.budgetData.savings}
- Active Goals: ${userData.goals.length}

Provide personalized, actionable financial advice. Be encouraging but realistic. Use specific numbers from their profile when relevant.`

        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        })

        const response =
          completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response at this time."

        return NextResponse.json({
          response,
          source: "openai",
        })
      } catch (openaiError) {
        console.error("❌ OpenAI API error:", openaiError)
        // Fall through to intelligent fallback
      }
    }

    // Use intelligent fallback system
    console.log("🧠 Using intelligent fallback system")
    const response = generateIntelligentResponse(message, userData)

    return NextResponse.json({
      response,
      source: "smart_ai",
    })
  } catch (error) {
    console.error("❌ API route error:", error)

    return NextResponse.json(
      {
        response:
          "I apologize, but I'm experiencing technical difficulties. Please try again later, or contact support if the problem persists.",
        source: "error",
      },
      { status: 500 },
    )
  }
}
