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
    const { messages, userData } = await req.json()

    // Build context from user data
    const userContext = buildUserContext(userData)

    // For now, we'll use a simple response system
    // After export, replace this with OpenAI API call
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ""

    let reply = ""

    // Simple keyword-based responses with user context
    if (lastMessage.includes("budget") || lastMessage.includes("spending")) {
      reply = generateBudgetAdvice(userData)
    } else if (lastMessage.includes("save") || lastMessage.includes("saving")) {
      reply = generateSavingAdvice(userData)
    } else if (lastMessage.includes("invest") || lastMessage.includes("investment")) {
      reply = generateInvestmentAdvice(userData)
    } else if (lastMessage.includes("debt")) {
      reply = generateDebtAdvice(userData)
    } else if (lastMessage.includes("goal") || lastMessage.includes("goals")) {
      reply = generateGoalAdvice(userData)
    } else {
      reply = `I'm here to help with your financial questions! Based on your profile, I can provide personalized advice about:

• Budgeting and expense management
• Saving strategies
• Investment recommendations
• Debt management
• Goal planning

${userContext ? "I can see your financial data and will provide personalized advice based on your situation." : "To get personalized advice, please set up your budget and goals in the app."}

What would you like to know about?`
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("AI Advisor API Error:", error)
    return NextResponse.json(
      { reply: "Sorry, I'm having trouble right now. Please try again in a moment." },
      { status: 500 },
    )
  }
}

function buildUserContext(userData?: UserData): string {
  if (!userData) return ""

  let context = ""

  // Budget Information
  if (userData.budgetData?.income) {
    const income = userData.budgetData.income
    const expenses = userData.budgetData.expenses || {}
    const savings = userData.budgetData.savings || 0
    const totalExpenses = Object.values(expenses).reduce((sum: number, exp: any) => sum + (exp || 0), 0)
    const monthlyLeftover = income - totalExpenses
    const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : "0"

    context += `Your monthly income is $${income.toLocaleString()} with $${totalExpenses.toLocaleString()} in expenses, leaving $${monthlyLeftover.toLocaleString()} leftover. Your current savings rate is ${savingsRate}%.`
  }

  return context
}

function generateBudgetAdvice(userData?: UserData): string {
  if (!userData?.budgetData?.income) {
    return "To give you personalized budget advice, I'd need to see your income and expenses. You can set these up in the Budget section of the app. In general, I recommend the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment."
  }

  const income = userData.budgetData.income
  const expenses = userData.budgetData.expenses || {}
  const totalExpenses = Object.values(expenses).reduce((sum: number, exp: any) => sum + (exp || 0), 0)
  const monthlyLeftover = income - totalExpenses
  const savingsRate = income > 0 ? ((monthlyLeftover / income) * 100).toFixed(1) : "0"

  let advice = `📊 **Budget Analysis:**\n\n`
  advice += `• Monthly Income: $${income.toLocaleString()}\n`
  advice += `• Total Expenses: $${totalExpenses.toLocaleString()}\n`
  advice += `• Monthly Leftover: $${monthlyLeftover.toLocaleString()}\n`
  advice += `• Savings Rate: ${savingsRate}%\n\n`

  if (Number.parseFloat(savingsRate) >= 20) {
    advice += `🎉 Excellent! You're saving ${savingsRate}% of your income, which exceeds the recommended 20%.`
  } else if (Number.parseFloat(savingsRate) >= 10) {
    advice += `👍 Good job! You're saving ${savingsRate}%. Try to increase this to 20% if possible.`
  } else {
    advice += `💡 Your savings rate is ${savingsRate}%. I recommend aiming for at least 20%. Look for areas to reduce expenses or increase income.`
  }

  if (Object.keys(expenses).length > 0) {
    const topExpense = Object.entries(expenses).reduce((max, [cat, amt]) =>
      (amt as number) > (max[1] as number) ? [cat, amt] : max,
    )
    advice += `\n\nYour largest expense category is ${topExpense[0]} at $${(topExpense[1] as number).toLocaleString()}.`
  }

  return advice
}

function generateSavingAdvice(userData?: UserData): string {
  const budgetData = userData?.budgetData

  if (!budgetData?.income) {
    return "💰 **Saving Tips:**\n\n• Start with an emergency fund (3-6 months of expenses)\n• Automate your savings\n• Use high-yield savings accounts\n• Set specific savings goals\n\nTo get personalized advice, add your budget information in the app!"
  }

  const income = budgetData.income
  const expenses = budgetData.expenses || {}
  const savings = budgetData.savings || 0
  const totalExpenses = Object.values(expenses).reduce((sum: number, exp: any) => sum + (exp || 0), 0)
  const emergencyFundTarget = totalExpenses * 6
  const emergencyFundMonths = totalExpenses > 0 ? (savings / totalExpenses).toFixed(1) : "0"

  let advice = `💰 **Savings Analysis:**\n\n`
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

  let advice = `📈 **Investment Guidance:**\n\n`

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

  advice += `Consider low-cost index funds and dollar-cost averaging for consistent investing.`

  return advice
}

function generateDebtAdvice(userData?: UserData): string {
  return `💳 **Debt Management Strategy:**\n\n• List all debts with balances and interest rates\n• Pay minimums on all debts\n• Focus extra payments on highest interest debt first\n• Consider debt consolidation if it lowers rates\n• Avoid taking on new debt while paying off existing debt\n\nFor personalized debt advice, add your specific debt information to your profile!`
}

function generateGoalAdvice(userData?: UserData): string {
  const goals = userData?.goals

  if (!goals || goals.length === 0) {
    return `🎯 **Goal Setting Tips:**\n\n• Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)\n• Prioritize your goals\n• Automate savings for each goal\n• Review progress monthly\n\nAdd your financial goals in the Goals section to get personalized advice!`
  }

  let advice = `🎯 **Your Goals Analysis:**\n\n`

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
