import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface UserData {
  profile?: any
  budgetData?: any
  goals?: any
  progress?: any
  budgetCategories?: any
  budgetEntries?: any
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { messages, userData } = await req.json()

    // Build context from user data
    const userContext = buildUserContext(userData)

    // Create system prompt with user context
    const systemPrompt = createSystemPrompt(userContext)

    // Convert messages to OpenAI format
    const openaiMessages = [
      { role: "system" as const, content: systemPrompt },
      ...messages.map((msg: Message) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    ]

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: openaiMessages,
      temperature: 0.7,
      max_tokens: 1000,
    })

    const assistantMessage = response.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response."

    return new NextResponse(
      JSON.stringify({
        id: Date.now().toString(),
        role: "assistant",
        content: assistantMessage,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    console.error("Chat API Error:", error)
    return new NextResponse("Error processing chat", { status: 500 })
  }
}

function buildUserContext(userData?: UserData): string {
  if (!userData) return "No user data available."

  let context = "USER FINANCIAL DATA:\n\n"

  // Budget Information
  if (userData.budgetData?.income) {
    const income = userData.budgetData.income
    const expenses = userData.budgetData.expenses || {}
    const savings = userData.budgetData.savings || 0
    const totalExpenses = Object.values(expenses).reduce((sum: number, exp: any) => sum + (exp || 0), 0)
    const monthlyLeftover = income - totalExpenses
    const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : "0"
    const emergencyFundMonths = totalExpenses > 0 ? (savings / totalExpenses).toFixed(1) : "0"

    context += `BUDGET:\n`
    context += `- Monthly Income: $${income.toLocaleString()}\n`
    context += `- Total Monthly Expenses: $${totalExpenses.toLocaleString()}\n`
    context += `- Current Savings: $${savings.toLocaleString()}\n`
    context += `- Monthly Leftover: $${monthlyLeftover.toLocaleString()}\n`
    context += `- Savings Rate: ${savingsRate}%\n`
    context += `- Emergency Fund Coverage: ${emergencyFundMonths} months\n\n`

    if (Object.keys(expenses).length > 0) {
      context += `EXPENSE BREAKDOWN:\n`
      Object.entries(expenses).forEach(([category, amount]) => {
        context += `- ${category}: $${(amount as number).toLocaleString()}\n`
      })
      context += `\n`
    }
  }

  // Goals Information
  if (userData.goals && userData.goals.length > 0) {
    context += `FINANCIAL GOALS:\n`
    userData.goals.forEach((goal: any, index: number) => {
      const progress = ((goal.current / goal.target) * 100).toFixed(1)
      const remaining = goal.target - goal.current
      context += `${index + 1}. ${goal.title}\n`
      context += `   - Target: $${goal.target.toLocaleString()}\n`
      context += `   - Current: $${goal.current.toLocaleString()}\n`
      context += `   - Progress: ${progress}%\n`
      context += `   - Remaining: $${remaining.toLocaleString()}\n`
      if (goal.deadline) {
        context += `   - Deadline: ${goal.deadline}\n`
      }
      if (goal.priority) {
        context += `   - Priority: ${goal.priority}\n`
      }
      context += `\n`
    })
  }

  // Profile Information
  if (userData.profile) {
    context += `USER PROFILE:\n`
    if (userData.profile.age) {
      context += `- Age: ${userData.profile.age}\n`
    }
    if (userData.profile.experience) {
      context += `- Investment Experience: ${userData.profile.experience}\n`
    }
    if (userData.profile.riskTolerance) {
      context += `- Risk Tolerance: ${userData.profile.riskTolerance}\n`
    }
    if (userData.profile.timeHorizon) {
      context += `- Investment Time Horizon: ${userData.profile.timeHorizon}\n`
    }
    context += `\n`
  }

  // Budget Categories
  if (userData.budgetCategories && userData.budgetCategories.length > 0) {
    const expenseCategories = userData.budgetCategories.filter(
      (cat: any) => cat.type === "expense" && cat.spentAmount > 0,
    )
    if (expenseCategories.length > 0) {
      context += `DETAILED SPENDING BY CATEGORY:\n`
      expenseCategories
        .sort((a: any, b: any) => b.spentAmount - a.spentAmount)
        .forEach((cat: any) => {
          const percentOfBudget = cat.budgetAmount > 0 ? ((cat.spentAmount / cat.budgetAmount) * 100).toFixed(1) : "N/A"
          context += `- ${cat.name}: $${cat.spentAmount.toLocaleString()} spent / $${cat.budgetAmount.toLocaleString()} budgeted (${percentOfBudget}%)\n`
        })
      context += `\n`
    }
  }

  return context
}

function createSystemPrompt(userContext: string): string {
  return `You are an expert AI financial advisor. You provide personalized, practical financial advice based on the user's actual financial data.

${userContext}

INSTRUCTIONS:
1. Always use the user's actual financial data when providing advice
2. Be specific with numbers and calculations based on their real situation
3. Prioritize advice based on their financial health (emergency fund first, then debt, then investing)
4. Consider their age, risk tolerance, and goals when making recommendations
5. Provide actionable, step-by-step advice
6. Use a friendly, encouraging tone while being professional
7. If they don't have certain data, suggest they add it to get better advice

FINANCIAL ADVICE PRIORITIES:
1. Emergency Fund (3-6 months of expenses)
2. High-interest debt payoff (>7% interest)
3. Employer 401k match (free money)
4. Additional debt payoff vs investing (depends on interest rates)
5. Long-term investing in diversified index funds
6. Specific goal saving (house, vacation, etc.)

INVESTMENT RECOMMENDATIONS:
- Age-based stock allocation: roughly (100 - age)% in stocks
- Low-cost index funds: VTI (total market), VOO (S&P 500), BND (bonds)
- Dollar-cost averaging for consistent investing
- Tax-advantaged accounts first (401k, IRA)

BUDGETING ADVICE:
- 50/30/20 rule: 50% needs, 30% wants, 20% savings/debt
- Track spending to identify areas for improvement
- Automate savings and investments
- Review and adjust monthly

Always provide specific, actionable advice based on their actual financial situation. If you need more information to give better advice, ask for it.`
}
