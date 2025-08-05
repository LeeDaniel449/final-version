import { type NextRequest, NextResponse } from "next/server"

interface Message {
  role: "system" | "user" | "assistant"
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

export async function POST(req: NextRequest) {
  try {
    console.log("AI Advisor API called")

    const { messages, userData } = await req.json()
    console.log("Request data:", { messagesCount: messages?.length, hasUserData: !!userData })

    // Check if OpenAI is available
    const hasOpenAI = process.env.OPENAI_API_KEY

    if (hasOpenAI) {
      // Try OpenAI integration
      try {
        const OpenAI = (await import("openai")).default
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        })

        // Build context from user data
        const userContext = buildUserContext(userData)
        const systemPrompt = createSystemPrompt(userContext)

        // Convert messages to OpenAI format
        const openaiMessages = [
          { role: "system" as const, content: systemPrompt },
          ...messages.slice(1).map((msg: Message) => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          })),
        ]

        console.log("Calling OpenAI API...")
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: openaiMessages,
          temperature: 0.7,
          max_tokens: 1000,
        })

        const assistantMessage = response.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response."
        console.log("OpenAI response received")

        return NextResponse.json({ reply: assistantMessage })
      } catch (openaiError) {
        console.error("OpenAI API Error:", openaiError)
        // Fall back to simple responses if OpenAI fails
      }
    }

    // Fallback to simple responses
    console.log("Using fallback responses")
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ""
    const reply = generateFallbackResponse(lastMessage, userData)

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("AI Advisor API Error:", error)
    return NextResponse.json(
      {
        reply: "Sorry, I'm having trouble right now. Please try again in a moment.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
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

  return context
}

function createSystemPrompt(userContext: string): string {
  return `You are an expert AI financial advisor powered by GPT-4. You provide personalized, practical financial advice based on the user's actual financial data.

${userContext}

INSTRUCTIONS:
1. Always use the user's actual financial data when providing advice
2. Be specific with numbers and calculations based on their real situation
3. Prioritize advice based on their financial health (emergency fund first, then debt, then investing)
4. Consider their age, risk tolerance, and goals when making recommendations
5. Provide actionable, step-by-step advice
6. Use a friendly, encouraging tone while being professional
7. If they don't have certain data, suggest they add it to get better advice
8. Keep responses concise but comprehensive (under 500 words)
9. Use emojis and formatting to make responses engaging and easy to read

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

Always provide specific, actionable advice based on their actual financial situation.`
}

function generateFallbackResponse(message: string, userData?: UserData): string {
  // Simple keyword-based responses for when OpenAI is not available
  if (message.includes("budget") || message.includes("spending")) {
    return generateBudgetAdvice(userData)
  } else if (message.includes("save") || message.includes("saving")) {
    return generateSavingAdvice(userData)
  } else if (message.includes("invest") || message.includes("investment")) {
    return generateInvestmentAdvice(userData)
  } else if (message.includes("debt")) {
    return generateDebtAdvice(userData)
  } else if (message.includes("goal") || message.includes("goals")) {
    return generateGoalAdvice(userData)
  } else {
    return `👋 Hi! I'm your AI financial advisor. I can help with:

• 📊 Budget analysis and optimization
• 💰 Saving strategies and emergency funds
• 📈 Investment recommendations
• 💳 Debt management
• 🎯 Financial goal planning

${userData?.budgetData?.income ? "I can see your financial data and provide personalized advice!" : "To get personalized advice, please set up your budget and goals in the app."}

What would you like to know about?`
  }
}

function generateBudgetAdvice(userData?: UserData): string {
  if (!userData?.budgetData?.income) {
    return "📊 **Budget Analysis**\n\nTo give you personalized budget advice, I'd need to see your income and expenses. You can set these up in the Budget section.\n\nIn general, I recommend the 50/30/20 rule:\n• 50% for needs (rent, utilities, groceries)\n• 30% for wants (entertainment, dining out)\n• 20% for savings and debt repayment"
  }

  const income = userData.budgetData.income
  const expenses = userData.budgetData.expenses || {}
  const totalExpenses = Object.values(expenses).reduce((sum: number, exp: any) => sum + (exp || 0), 0)
  const monthlyLeftover = income - totalExpenses
  const savingsRate = income > 0 ? ((monthlyLeftover / income) * 100).toFixed(1) : "0"

  let advice = `📊 **Budget Analysis**\n\n`
  advice += `• Monthly Income: $${income.toLocaleString()}\n`
  advice += `• Total Expenses: $${totalExpenses.toLocaleString()}\n`
  advice += `• Monthly Leftover: $${monthlyLeftover.toLocaleString()}\n`
  advice += `• Savings Rate: ${savingsRate}%\n\n`

  if (Number.parseFloat(savingsRate) >= 20) {
    advice += `🎉 Excellent! You're saving ${savingsRate}% of your income, which exceeds the recommended 20%.`
  } else if (Number.parseFloat(savingsRate) >= 10) {
    advice += `👍 Good job! You're saving ${savingsRate}%. Try to increase this to 20% if possible.`
  } else {
    advice += `💡 Your savings rate is ${savingsRate}%. I recommend aiming for at least 20%. Look for areas to reduce expenses.`
  }

  return advice
}

function generateSavingAdvice(userData?: UserData): string {
  const budgetData = userData?.budgetData

  if (!budgetData?.income) {
    return "💰 **Saving Tips**\n\n• Start with an emergency fund (3-6 months of expenses)\n• Automate your savings\n• Use high-yield savings accounts\n• Set specific savings goals\n\nTo get personalized advice, add your budget information!"
  }

  const income = budgetData.income
  const expenses = budgetData.expenses || {}
  const savings = budgetData.savings || 0
  const totalExpenses = Object.values(expenses).reduce((sum: number, exp: any) => sum + (exp || 0), 0)
  const emergencyFundTarget = totalExpenses * 6
  const emergencyFundMonths = totalExpenses > 0 ? (savings / totalExpenses).toFixed(1) : "0"

  let advice = `💰 **Savings Analysis**\n\n`
  advice += `• Current Savings: $${savings.toLocaleString()}\n`
  advice += `• Emergency Fund Target: $${emergencyFundTarget.toLocaleString()} (6 months)\n`
  advice += `• Current Coverage: ${emergencyFundMonths} months\n\n`

  if (savings >= emergencyFundTarget) {
    advice += `🎉 Great! Your emergency fund is fully funded. Consider investing additional savings for long-term growth.`
  } else {
    const needed = emergencyFundTarget - savings
    advice += `🎯 Focus on building your emergency fund. You need $${needed.toLocaleString()} more to reach 6 months of expenses.`
  }

  return advice
}

function generateInvestmentAdvice(userData?: UserData): string {
  const profile = userData?.profile
  const budgetData = userData?.budgetData

  let advice = `📈 **Investment Guidance**\n\n`

  if (!budgetData?.savings || budgetData.savings < 1000) {
    advice += `Before investing, make sure you have:\n• An emergency fund (3-6 months expenses)\n• High-interest debt paid off\n• Stable income\n\nStart with building your emergency fund first!`
    return advice
  }

  if (profile?.age) {
    const stockAllocation = Math.max(100 - profile.age, 20)
    const bondAllocation = 100 - stockAllocation

    advice += `Based on your age (${profile.age}), consider:\n`
    advice += `• ${stockAllocation}% stocks (VTI, VOO)\n`
    advice += `• ${bondAllocation}% bonds (BND)\n\n`
  }

  advice += `💡 **Investment Priorities:**\n`
  advice += `1. 401(k) match (free money!)\n`
  advice += `2. Roth IRA ($6,500/year limit)\n`
  advice += `3. Additional 401(k) contributions\n`
  advice += `4. Taxable investment accounts\n\n`

  advice += `Consider low-cost index funds and dollar-cost averaging.`

  return advice
}

function generateDebtAdvice(userData?: UserData): string {
  return `💳 **Debt Management Strategy**\n\n• List all debts with balances and interest rates\n• Pay minimums on all debts\n• Focus extra payments on highest interest debt first\n• Consider debt consolidation if it lowers rates\n• Avoid taking on new debt while paying off existing debt\n\nFor personalized debt advice, add your specific debt information!`
}

function generateGoalAdvice(userData?: UserData): string {
  const goals = userData?.goals

  if (!goals || goals.length === 0) {
    return `🎯 **Goal Setting Tips**\n\n• Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)\n• Prioritize your goals\n• Automate savings for each goal\n• Review progress monthly\n\nAdd your financial goals in the Goals section to get personalized advice!`
  }

  let advice = `🎯 **Your Goals Analysis**\n\n`

  goals.forEach((goal: any, index: number) => {
    const progress = ((goal.current / goal.target) * 100).toFixed(1)
    const remaining = goal.target - goal.current

    advice += `${index + 1}. **${goal.title}**\n`
    advice += `   Progress: ${progress}% ($${goal.current.toLocaleString()}/$${goal.target.toLocaleString()})\n`
    advice += `   Remaining: $${remaining.toLocaleString()}\n\n`
  })

  advice += `Keep up the great work! Consider automating contributions to reach your goals faster.`

  return advice
}
