import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { message, userData } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Build context from user data
    let userContext = "User Profile:\n"

    if (userData?.profile) {
      const profile = userData.profile
      userContext += `- Name: ${profile.firstName} ${profile.lastName}\n`
      userContext += `- Age: ${profile.age}\n`
      userContext += `- Risk Tolerance: ${profile.riskTolerance}\n`
      userContext += `- Investment Experience: ${profile.investmentExperience}\n`
      userContext += `- Time Horizon: ${profile.timeHorizon}\n`
    }

    if (userData?.budgetData) {
      const budget = userData.budgetData
      userContext += `\nFinancial Situation:\n`
      userContext += `- Monthly Income: $${budget.income?.toLocaleString() || 0}\n`
      userContext += `- Current Savings: $${budget.savings?.toLocaleString() || 0}\n`

      if (budget.expenses && Object.keys(budget.expenses).length > 0) {
        userContext += `- Monthly Expenses:\n`
        Object.entries(budget.expenses).forEach(([category, amount]) => {
          if (amount > 0) {
            userContext += `  • ${category}: $${amount.toLocaleString()}\n`
          }
        })
      }
    }

    if (userData?.goals && userData.goals.length > 0) {
      userContext += `\nFinancial Goals:\n`
      userData.goals.forEach((goal: any) => {
        userContext += `- ${goal.title}: $${goal.currentAmount?.toLocaleString() || 0} / $${goal.targetAmount?.toLocaleString() || 0}\n`
      })
    }

    // System prompt for the AI financial advisor
    const systemPrompt = `You are a professional financial advisor with expertise in personal finance, budgeting, investing, and financial planning. You provide personalized, actionable advice based on the user's specific financial situation.

Key principles:
- Always consider the user's risk tolerance, age, and financial goals
- Provide specific, actionable recommendations
- Explain complex financial concepts in simple terms
- Consider tax implications when relevant
- Emphasize the importance of emergency funds and debt management
- Be encouraging but realistic about financial goals
- Always recommend consulting with a qualified financial professional for major decisions

Current user context:
${userContext}

Respond in a helpful, professional tone with specific advice tailored to their situation.`

    let response: string
    let source = "openai"

    try {
      // Try OpenAI first
      const result = await generateText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        prompt: message,
        maxTokens: 1000,
      })

      response = result.text
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError)
      source = "fallback"

      // Intelligent fallback based on user data and message content
      response = generateIntelligentFallback(message, userData)
    }

    return NextResponse.json({
      response,
      source,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("AI Advisor API error:", error)
    return NextResponse.json(
      {
        error: "Failed to get financial advice",
        response:
          "I'm having trouble connecting right now, but I'd be happy to help with your financial questions. Could you try asking again?",
        source: "error",
      },
      { status: 500 },
    )
  }
}

function generateIntelligentFallback(message: string, userData: any): string {
  const lowerMessage = message.toLowerCase()

  // Budget-related questions
  if (lowerMessage.includes("budget") || lowerMessage.includes("spending")) {
    if (userData?.budgetData?.income > 0) {
      const income = userData.budgetData.income
      const totalExpenses = Object.values(userData.budgetData.expenses || {}).reduce(
        (sum: number, exp: any) => sum + (exp || 0),
        0,
      )
      const leftover = income - totalExpenses

      return `Based on your monthly income of $${income.toLocaleString()}, here's my budgeting advice:

${
  leftover > 0
    ? `Great news! You have $${leftover.toLocaleString()} left over each month. Consider allocating this to:
  • 50% to savings/emergency fund
  • 30% to debt repayment or investments
  • 20% to discretionary spending`
    : `Your expenses exceed your income by $${Math.abs(leftover).toLocaleString()}. Priority steps:
  1. Review and cut non-essential expenses
  2. Look for ways to increase income
  3. Focus on the largest expense categories first`
}

The 50/30/20 rule is a good starting point: 50% needs, 30% wants, 20% savings and debt repayment.`
    }

    return `Here are some fundamental budgeting principles:

1. **Track everything** - Know where every dollar goes
2. **50/30/20 rule** - 50% needs, 30% wants, 20% savings/debt
3. **Emergency fund first** - Build 3-6 months of expenses
4. **Automate savings** - Pay yourself first
5. **Review monthly** - Adjust as needed

Start by listing all income and expenses to see your current situation.`
  }

  // Investment questions
  if (lowerMessage.includes("invest") || lowerMessage.includes("stock") || lowerMessage.includes("retirement")) {
    const age = userData?.profile?.age || 30
    const riskTolerance = userData?.profile?.riskTolerance || "moderate"
    const savings = userData?.budgetData?.savings || 0

    return `Investment advice based on your profile:

**Age ${age} with ${riskTolerance} risk tolerance:**

${
  savings < 10000
    ? `Priority: Build your emergency fund first (3-6 months expenses) before investing.`
    : `Good foundation! Here's a suggested approach:`
}

1. **Emergency Fund** - 3-6 months expenses in high-yield savings
2. **401(k) Match** - Always get the full employer match (free money!)
3. **Index Funds** - Low-cost, diversified options like:
   • Total Stock Market Index (${age < 40 ? "70-80%" : "60-70%"})
   • Bond Index (${age < 40 ? "20-30%" : "30-40%"})

**Rule of thumb:** Stock allocation = 100 - your age (so ${100 - age}% stocks)

Start with broad market index funds and increase contributions over time.`
  }

  // Debt questions
  if (lowerMessage.includes("debt") || lowerMessage.includes("loan") || lowerMessage.includes("credit card")) {
    return `Debt management strategies:

**High-Interest Debt (Credit Cards, etc.):**
1. **Avalanche Method** - Pay minimums on all, extra on highest interest rate
2. **Snowball Method** - Pay minimums on all, extra on smallest balance
3. **Balance Transfer** - Consider 0% APR cards for credit card debt

**Student Loans:**
• Federal loans: Explore income-driven repayment plans
• Consider refinancing private loans if you have good credit

**General Priority:**
1. Emergency fund ($1,000 minimum)
2. High-interest debt (>7% interest rate)
3. Build full emergency fund
4. Invest for retirement

The key is consistency - even small extra payments make a big difference over time!`
  }

  // Emergency fund questions
  if (lowerMessage.includes("emergency") || lowerMessage.includes("savings")) {
    const income = userData?.budgetData?.income || 0
    const savings = userData?.budgetData?.savings || 0

    if (income > 0) {
      const monthlyTarget = income * 0.75 // Assume 75% of income for expenses
      const targetFund = monthlyTarget * 6

      return `Emergency Fund Guidance:

**Your Target:** $${targetFund.toLocaleString()} (6 months of expenses)
**Current Savings:** $${savings.toLocaleString()}
**Still Needed:** $${Math.max(0, targetFund - savings).toLocaleString()}

**Building Strategy:**
1. Start with $1,000 minimum emergency fund
2. Save 10-20% of income monthly until you reach 3-6 months
3. Keep in high-yield savings account (separate from checking)
4. Only use for true emergencies (job loss, medical, major repairs)

**Quick wins:**
• Automate transfers on payday
• Save tax refunds and bonuses
• Sell unused items
• Take on temporary side work`
    }

    return `Emergency Fund Essentials:

**Target Amount:** 3-6 months of living expenses
**Where to Keep It:** High-yield savings account (separate from daily banking)
**When to Use:** Job loss, medical emergencies, major home/car repairs

**Building Steps:**
1. Start with $1,000 minimum
2. Save 10-20% of income monthly
3. Automate the process
4. Don't invest emergency funds - keep them liquid and safe

This fund provides peace of mind and prevents you from going into debt during tough times.`
  }

  // Default response
  return `I'd be happy to help with your financial question! Here are some key areas I can assist with:

**Budgeting & Spending:**
• Creating and managing budgets
• Tracking expenses
• Finding areas to cut costs

**Saving & Investing:**
• Building emergency funds
• Investment strategies
• Retirement planning

**Debt Management:**
• Paying off credit cards
• Student loan strategies
• Debt consolidation options

**Financial Goals:**
• Setting realistic targets
• Creating action plans
• Tracking progress

Could you be more specific about what aspect of your finances you'd like help with? I can provide more targeted advice based on your situation.`
}
