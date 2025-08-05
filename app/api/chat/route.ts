import { type NextRequest, NextResponse } from "next/server"

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

export async function POST(req: NextRequest) {
  try {
    const { messages, userData } = await req.json()
    const conversationHistory = messages.slice(1) // Remove welcome message
    const lastMessage = messages[messages.length - 1]?.content || ""

    // Analyze conversation context with user data
    const context = analyzeConversation(conversationHistory, userData)
    const response = generateContextualResponse(lastMessage, context, conversationHistory, userData)

    return new NextResponse(
      JSON.stringify({
        id: Date.now().toString(),
        role: "assistant",
        content: response,
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

function analyzeConversation(messages: Message[], userData?: UserData) {
  const allText = messages.map((m) => m.content.toLowerCase()).join(" ")

  // Calculate user's financial metrics
  const totalExpenses = userData?.budgetData?.expenses
    ? Object.values(userData.budgetData.expenses).reduce((sum: number, exp: any) => sum + (exp || 0), 0)
    : 0

  const monthlyLeftover = (userData?.budgetData?.income || 0) - totalExpenses
  const savingsRate =
    userData?.budgetData?.income > 0 ? ((userData?.budgetData?.savings || 0) / userData.budgetData.income) * 100 : 0

  const emergencyFundMonths = totalExpenses > 0 ? (userData?.budgetData?.savings || 0) / totalExpenses : 0

  return {
    hasEmergencyFund: allText.includes("emergency fund") || allText.includes("savings account"),
    investmentAmount: extractAmount(allText),
    timeline: extractTimeline(allText),
    riskTolerance: extractRiskTolerance(allText),
    goals: extractGoals(allText),
    experience: extractExperience(allText),
    concerns: extractConcerns(allText),
    previousTopics: extractTopics(messages),

    // User's actual financial data
    userIncome: userData?.budgetData?.income || 0,
    userExpenses: userData?.budgetData?.expenses || {},
    userSavings: userData?.budgetData?.savings || 0,
    userGoals: userData?.goals || [],
    userAge: userData?.profile?.age || null,
    userExperience: userData?.profile?.experience || null,
    userRiskTolerance: userData?.profile?.riskTolerance || null,

    // Calculated metrics
    totalExpenses,
    monthlyLeftover,
    savingsRate,
    emergencyFundMonths,
    hasPositiveCashFlow: monthlyLeftover > 0,
    needsEmergencyFund: emergencyFundMonths < 3,

    // Budget categories analysis
    budgetCategories: userData?.budgetCategories || [],
    budgetEntries: userData?.budgetEntries || [],
    topExpenseCategories: getTopExpenseCategories(userData?.budgetCategories || []),
  }
}

function getTopExpenseCategories(categories: any[]): string[] {
  return categories
    .filter((cat) => cat.type === "expense" && cat.spentAmount > 0)
    .sort((a, b) => b.spentAmount - a.spentAmount)
    .slice(0, 3)
    .map((cat) => cat.name)
}

function extractAmount(text: string): number | null {
  const matches = text.match(/\$?(\d{1,3}(?:,\d{3})*|\d+)(?:\s*(?:dollars?|k|thousand))?/g)
  if (matches) {
    const amounts = matches
      .map((match) => {
        const num = match.replace(/[$,]/g, "").replace(/k|thousand/i, "000")
        return Number.parseInt(num)
      })
      .filter((n) => n > 0)
    return amounts.length > 0 ? Math.max(...amounts) : null
  }
  return null
}

function extractTimeline(text: string): string | null {
  if (text.includes("retirement") || text.includes("30 year") || text.includes("long term")) return "long-term"
  if (text.includes("house") || text.includes("2-5 year") || text.includes("few years")) return "medium-term"
  if (text.includes("emergency") || text.includes("soon") || text.includes("next year")) return "short-term"
  return null
}

function extractRiskTolerance(text: string): string | null {
  if (text.includes("scared") || text.includes("safe") || text.includes("conservative")) return "low"
  if (text.includes("aggressive") || text.includes("growth") || text.includes("risk")) return "high"
  return "moderate"
}

function extractGoals(text: string): string[] {
  const goals = []
  if (text.includes("house") || text.includes("home")) goals.push("house")
  if (text.includes("retirement")) goals.push("retirement")
  if (text.includes("emergency")) goals.push("emergency-fund")
  if (text.includes("vacation") || text.includes("travel")) goals.push("vacation")
  if (text.includes("education") || text.includes("college")) goals.push("education")
  if (text.includes("debt") || text.includes("pay off")) goals.push("debt-payoff")
  return goals
}

function extractExperience(text: string): string {
  if (text.includes("new") || text.includes("beginner") || text.includes("never")) return "beginner"
  if (text.includes("some experience") || text.includes("little bit")) return "intermediate"
  if (text.includes("experienced") || text.includes("know about")) return "advanced"
  return "beginner"
}

function extractConcerns(text: string): string[] {
  const concerns = []
  if (text.includes("lose money") || text.includes("losing")) concerns.push("loss")
  if (text.includes("market crash") || text.includes("recession")) concerns.push("market-crash")
  if (text.includes("inflation")) concerns.push("inflation")
  if (text.includes("fees") || text.includes("cost")) concerns.push("fees")
  if (text.includes("debt") || text.includes("credit card")) concerns.push("debt")
  return concerns
}

function extractTopics(messages: Message[]): string[] {
  const topics = new Set<string>()
  const allText = messages.map((m) => m.content.toLowerCase()).join(" ")

  if (allText.includes("index fund") || allText.includes("etf")) topics.add("index-funds")
  if (allText.includes("401k") || allText.includes("retirement")) topics.add("retirement")
  if (allText.includes("emergency fund")) topics.add("emergency-fund")
  if (allText.includes("budget")) topics.add("budgeting")
  if (allText.includes("house") || allText.includes("mortgage")) topics.add("home-buying")
  if (allText.includes("debt") || allText.includes("credit card")) topics.add("debt-management")
  if (allText.includes("save") || allText.includes("saving")) topics.add("saving")

  return Array.from(topics)
}

function generateContextualResponse(
  userInput: string,
  context: any,
  conversationHistory: Message[],
  userData?: UserData,
): string {
  const input = userInput.toLowerCase()
  const lastAssistantMessage = conversationHistory.filter((m) => m.role === "assistant").pop()?.content || ""

  // Prioritize personalized responses using user data
  if (userData && hasUserData(userData)) {
    // Check for specific personal finance questions
    if (input.includes("my budget") || input.includes("analyze") || input.includes("review")) {
      return generateBudgetAnalysis(context, userData)
    }

    if (input.includes("my goal") || input.includes("goals")) {
      return generateGoalAnalysis(context, userData)
    }

    if (input.includes("should i") || input.includes("what should") || input.includes("recommend")) {
      return generatePersonalizedRecommendation(input, context, userData)
    }

    if (input.includes("how much") && (input.includes("save") || input.includes("invest"))) {
      return generateSavingsAdvice(context, userData)
    }
  }

  // Handle follow-up responses based on previous AI questions
  if (
    lastAssistantMessage.includes("emergency fund") &&
    (input.includes("yes") || input.includes("no") || input.includes("month"))
  ) {
    if (input.includes("yes") || input.match(/\d+.*month/)) {
      return (
        "Perfect! Having that safety net means you can invest with confidence. " +
        `${context.investmentAmount ? `With your $${context.investmentAmount.toLocaleString()}, ` : ""}I'd suggest starting with a broad market index fund like VTI or VOO. ` +
        "Have you thought about opening a brokerage account, or do you already have one?"
      )
    } else {
      return (
        "No worries - let's build that first! I'd suggest saving 3-6 months of expenses in a high-yield savings account before investing. " +
        "What are your monthly expenses roughly? This will help us figure out your emergency fund target."
      )
    }
  }

  // Topic-specific responses
  if (input.includes("budget") || input.includes("spending") || input.includes("track money")) {
    return generateBudgetingAdvice(input, context, userData)
  }

  if (input.includes("debt") || input.includes("credit card") || input.includes("pay off")) {
    return generateDebtAdvice(input, context, userData)
  }

  if (input.includes("save") || input.includes("saving") || input.includes("how much")) {
    return generateSavingAdvice(input, context, userData)
  }

  if (input.includes("invest") || input.includes("stock") || input.includes("fund")) {
    return generateInvestmentAdvice(input, context, userData)
  }

  // Fallback to general responses
  return generateSimpleResponse(userInput, context, userData)
}

function hasUserData(userData: UserData): boolean {
  return !!(userData?.budgetData?.income || userData?.goals?.length || userData?.profile?.age)
}

function generateBudgetAnalysis(context: any, userData: UserData): string {
  const { userIncome, totalExpenses, monthlyLeftover, savingsRate, emergencyFundMonths, topExpenseCategories } = context

  if (!userIncome) {
    return "I'd love to analyze your budget, but I don't see any income data yet. Head over to the Budget section to add your financial information, then I can give you personalized advice!"
  }

  let analysis = `📊 **Budget Analysis:**\n\n`
  analysis += `• Monthly Income: $${userIncome.toLocaleString()}\n`
  analysis += `• Total Expenses: $${totalExpenses.toLocaleString()}\n`
  analysis += `• Monthly Leftover: $${monthlyLeftover.toLocaleString()}\n`
  analysis += `• Savings Rate: ${savingsRate.toFixed(1)}%\n\n`

  // Provide specific feedback
  if (savingsRate >= 20) {
    analysis += `🎉 Excellent savings rate! You're saving ${savingsRate.toFixed(1)}% of your income, which is above the recommended 20%.`
  } else if (savingsRate >= 10) {
    analysis += `👍 Good savings rate at ${savingsRate.toFixed(1)}%. Try to gradually increase to 20% if possible.`
  } else {
    analysis += `⚠️ Your savings rate of ${savingsRate.toFixed(1)}% could be improved. Aim for at least 20% of your income.`
  }

  if (topExpenseCategories.length > 0) {
    analysis += `\n\n💰 **Top Expense Categories:** ${topExpenseCategories.join(", ")}`
    analysis += `\n\nConsider reviewing these categories for potential savings opportunities.`
  }

  // Emergency fund assessment
  if (emergencyFundMonths >= 6) {
    analysis += `\n\n🛡️ Great emergency fund! You have ${emergencyFundMonths.toFixed(1)} months of expenses saved.`
  } else if (emergencyFundMonths >= 3) {
    analysis += `\n\n🛡️ Good emergency fund coverage at ${emergencyFundMonths.toFixed(1)} months. Consider building to 6 months.`
  } else {
    analysis += `\n\n⚠️ Emergency fund needs attention. You have ${emergencyFundMonths.toFixed(1)} months of expenses saved. Aim for 3-6 months.`
  }

  return analysis
}

function generateGoalAnalysis(context: any, userData: UserData): string {
  const goals = userData?.goals || []

  if (goals.length === 0) {
    return "I don't see any financial goals set up yet. Head to the Goals section to add some targets, then I can help you create a plan to achieve them!"
  }

  let analysis = `🎯 **Goal Analysis:**\n\n`

  goals.forEach((goal: any, index: number) => {
    const progress = (goal.current / goal.target) * 100
    const remaining = goal.target - goal.current
    const monthsToDeadline = goal.deadline
      ? Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))
      : null

    analysis += `${index + 1}. **${goal.title}**\n`
    analysis += `   Progress: $${goal.current.toLocaleString()}/$${goal.target.toLocaleString()} (${progress.toFixed(1)}%)\n`
    analysis += `   Remaining: $${remaining.toLocaleString()}\n`

    if (monthsToDeadline && monthsToDeadline > 0) {
      const monthlyNeeded = remaining / monthsToDeadline
      analysis += `   Monthly needed: $${monthlyNeeded.toLocaleString()} for ${monthsToDeadline} months\n`

      if (context.monthlyLeftover >= monthlyNeeded) {
        analysis += `   ✅ Achievable with your current cash flow!\n`
      } else {
        analysis += `   ⚠️ May need to adjust timeline or increase income/reduce expenses\n`
      }
    }
    analysis += `\n`
  })

  // Provide strategic advice
  const highPriorityGoals = goals.filter((g: any) => g.priority === "high")
  if (highPriorityGoals.length > 0) {
    analysis += `🔥 **Focus on high-priority goals first:** ${highPriorityGoals.map((g: any) => g.title).join(", ")}`
  }

  return analysis
}

function generatePersonalizedRecommendation(input: string, context: any, userData: UserData): string {
  const { userIncome, monthlyLeftover, emergencyFundMonths, savingsRate } = context

  if (!userIncome) {
    return "I'd love to give you personalized recommendations! Please add your budget information first so I can analyze your situation."
  }

  let recommendations = `💡 **Personalized Recommendations:**\n\n`

  // Priority 1: Emergency Fund
  if (emergencyFundMonths < 3) {
    recommendations += `1. **Build Emergency Fund (Priority #1)**\n`
    recommendations += `   You need $${(context.totalExpenses * 3 - (userData?.budgetData?.savings || 0)).toLocaleString()} more for a 3-month emergency fund.\n`
    recommendations += `   Save $${Math.ceil((context.totalExpenses * 3 - (userData?.budgetData?.savings || 0)) / 6).toLocaleString()}/month for 6 months.\n\n`
  }

  // Priority 2: Debt (if mentioned in conversation or high expenses)
  if (input.includes("debt") || context.totalExpenses > userIncome * 0.8) {
    recommendations += `2. **Address High-Interest Debt**\n`
    recommendations += `   Pay minimums on all debts, then attack highest interest rate debt first.\n`
    recommendations += `   Consider debt consolidation if you have multiple high-interest debts.\n\n`
  }

  // Priority 3: Increase Savings Rate
  if (savingsRate < 20 && monthlyLeftover > 0) {
    const additionalSavings = userIncome * 0.2 - (userData?.budgetData?.savings || 0)
    if (additionalSavings > 0) {
      recommendations += `3. **Increase Savings Rate**\n`
      recommendations += `   Try to save an additional $${additionalSavings.toLocaleString()}/month to reach 20% savings rate.\n`
      recommendations += `   Automate transfers to make it easier.\n\n`
    }
  }

  // Priority 4: Investment Strategy
  if (emergencyFundMonths >= 3 && monthlyLeftover > 0) {
    const age = userData?.profile?.age ? Number.parseInt(userData.profile.age) : 30
    const stockAllocation = Math.min(90, 100 - age)

    recommendations += `4. **Start Investing**\n`
    recommendations += `   With your emergency fund in place, consider investing $${Math.floor(monthlyLeftover * 0.8).toLocaleString()}/month.\n`
    recommendations += `   Suggested allocation: ${stockAllocation}% stocks (VTI), ${100 - stockAllocation}% bonds (BND)\n`
    recommendations += `   Start with a target-date fund if you prefer simplicity.\n\n`
  }

  // Goal-specific advice
  const goals = userData?.goals || []
  if (goals.length > 0) {
    const urgentGoals = goals.filter((g: any) => {
      const deadline = new Date(g.deadline)
      const monthsLeft = (deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30)
      return monthsLeft <= 24 && monthsLeft > 0
    })

    if (urgentGoals.length > 0) {
      recommendations += `5. **Urgent Goals (< 2 years)**\n`
      urgentGoals.forEach((goal: any) => {
        recommendations += `   ${goal.title}: Keep in high-yield savings, don't invest short-term money.\n`
      })
    }
  }

  return recommendations
}

function generateSavingsAdvice(context: any, userData: UserData): string {
  const { userIncome, monthlyLeftover, emergencyFundMonths } = context

  if (!userIncome) {
    return "I'd love to give you savings advice! Please add your income and expense information first."
  }

  const recommendedSavings = userIncome * 0.2
  const currentSavings = userData?.budgetData?.savings || 0

  let advice = `💰 **Savings Strategy:**\n\n`
  advice += `With your $${userIncome.toLocaleString()} monthly income, aim to save at least 20% ($${recommendedSavings.toLocaleString()}/month).\n\n`

  if (emergencyFundMonths < 3) {
    advice += `🚨 **Priority: Emergency Fund**\n`
    advice += `Build 3-6 months of expenses ($${(context.totalExpenses * 3).toLocaleString()}) in a high-yield savings account first.\n`
    advice += `You currently have $${currentSavings.toLocaleString()} saved.\n\n`
  } else {
    advice += `✅ **Good Emergency Fund**\n`
    advice += `You have ${emergencyFundMonths.toFixed(1)} months of expenses saved. Now you can focus on other goals!\n\n`
  }

  if (monthlyLeftover > 0) {
    advice += `💡 **Monthly Action Plan:**\n`
    advice += `• Available to save: $${monthlyLeftover.toLocaleString()}/month\n`

    if (emergencyFundMonths < 6) {
      const emergencyNeed = Math.max(0, context.totalExpenses * 6 - currentSavings)
      const monthsToFullEmergency = Math.ceil(emergencyNeed / monthlyLeftover)
      advice += `• Emergency fund: $${Math.min(monthlyLeftover, emergencyNeed).toLocaleString()}/month for ${monthsToFullEmergency} months\n`
    }

    const leftForGoals =
      emergencyFundMonths >= 3
        ? monthlyLeftover
        : Math.max(0, monthlyLeftover - (context.totalExpenses * 3 - currentSavings) / 6)
    if (leftForGoals > 0) {
      advice += `• Available for goals/investing: $${leftForGoals.toLocaleString()}/month\n`
    }
  } else {
    advice += `⚠️ **Budget Optimization Needed**\n`
    advice += `Your expenses equal your income. Look for ways to reduce spending or increase income to free up money for savings.`
  }

  return advice
}

function generateBudgetingAdvice(input: string, context: any, userData?: UserData): string {
  if (userData?.budgetData?.income) {
    const income = userData.budgetData.income
    const expenses = userData.budgetData.expenses || {}
    const totalExpenses = Object.values(expenses).reduce((sum: number, exp: any) => sum + (exp || 0), 0)

    return `Based on your $${income.toLocaleString()} monthly income, here's my budgeting advice: Follow the 50/30/20 rule - 50% for needs ($${(income * 0.5).toLocaleString()}), 30% for wants ($${(income * 0.3).toLocaleString()}), and 20% for savings/debt ($${(income * 0.2).toLocaleString()}). Your current expenses are $${totalExpenses.toLocaleString()}. ${totalExpenses > income * 0.8 ? "Consider reducing discretionary spending to free up more for savings." : "You're doing well with your spending! Consider increasing your savings rate."}`
  }

  if (input.includes("track") || input.includes("app")) {
    return "For budgeting, I recommend the envelope method or zero-based budgeting. Track every expense for a month to see where your money goes. Popular apps include Mint, YNAB, or even a simple spreadsheet. The key is consistency - review your budget weekly and adjust as needed."
  }

  return "Budgeting is crucial for financial success! Start with the 50/30/20 rule: 50% for needs (rent, groceries, utilities), 30% for wants (entertainment, dining out), and 20% for savings and debt repayment. Track your spending for a month to see where your money actually goes, then adjust accordingly."
}

function generateDebtAdvice(input: string, context: any, userData?: UserData): string {
  if (input.includes("credit card") || input.includes("high interest")) {
    return "Credit card debt should be your top priority! With interest rates often 20%+, it's like getting a guaranteed 20% return by paying it off. Use either the avalanche method (pay minimums on all cards, extra on highest interest rate) or snowball method (smallest balance first for motivation). Stop using credit cards until they're paid off."
  }

  if (input.includes("student loan")) {
    return "Student loan strategy depends on interest rates. If above 6%, prioritize paying extra. If below 4%, you might invest instead since market returns historically beat that. Consider income-driven repayment plans if struggling, and look into Public Service Loan Forgiveness if you work for qualifying employers."
  }

  if (input.includes("mortgage") || input.includes("house")) {
    return "Mortgages are 'good debt' since they're secured by an appreciating asset and tax-deductible. With rates below 5%, it often makes sense to pay the minimum and invest extra money instead. However, if you're close to retirement or want peace of mind, paying extra toward principal is fine too."
  }

  return "Debt payoff strategy: 1) List all debts with balances and interest rates, 2) Pay minimums on everything, 3) Put extra money toward either highest interest rate (avalanche) or smallest balance (snowball), 4) Once one is paid off, roll that payment to the next debt. High-interest debt (>7%) should be prioritized over investing."
}

function generateSavingAdvice(input: string, context: any, userData?: UserData): string {
  if (userData?.budgetData?.income) {
    const income = userData.budgetData.income
    const recommendedSavings = income * 0.2
    const currentSavings = userData.budgetData.savings || 0

    return `With your $${income.toLocaleString()} monthly income, aim to save at least 20% ($${recommendedSavings.toLocaleString()}/month). You currently have $${currentSavings.toLocaleString()} saved. ${currentSavings < income * 3 ? "Focus on building your emergency fund first - aim for 3-6 months of expenses." : "Great emergency fund! Now you can focus on investing for long-term goals."}`
  }

  if (input.includes("emergency fund")) {
    return "Emergency funds should cover 3-6 months of expenses in a high-yield savings account. This isn't for investing - it's insurance against job loss, medical bills, or major repairs. Keep it separate from your checking account but easily accessible. Aim for 1% APY or higher."
  }

  if (input.includes("high yield") || input.includes("savings account")) {
    return "High-yield savings accounts currently offer 4-5% APY (much better than traditional banks' 0.01%). Good options include Marcus by Goldman Sachs, Ally Bank, or Capital One 360. These are FDIC insured and perfect for emergency funds or short-term savings goals."
  }

  return "Saving is the foundation of wealth building! Start with the 'pay yourself first' principle - save before you spend. Automate transfers to savings right after payday. Build your emergency fund first (3-6 months expenses), then save for specific goals like a house down payment or vacation."
}

function generateInvestmentAdvice(input: string, context: any, userData?: UserData): string {
  const userAge = userData?.profile?.age ? Number.parseInt(userData.profile.age) : null
  const riskTolerance = userData?.profile?.riskTolerance || context.riskTolerance

  if (input.includes("beginner") || input.includes("start")) {
    const allocation =
      userAge && userAge < 30
        ? "90% stocks, 10% bonds"
        : userAge && userAge < 50
          ? "80% stocks, 20% bonds"
          : "70% stocks, 30% bonds"

    return `As a beginner, start simple with broad market index funds. ${userAge ? `At ${userAge}, I'd suggest ${allocation}.` : "A good starting allocation is 80% stocks, 20% bonds."} VTI (total stock market) and BND (total bond market) are excellent choices. Start with whatever you can afford - even $100/month makes a difference over time.`
  }

  if (input.includes("index fund") || input.includes("etf")) {
    return `Index funds are perfect for most investors! They're diversified, low-cost, and historically outperform 90% of actively managed funds. Popular choices: VTI (total US market), VTIAX (international), BND (bonds). ${riskTolerance === "low" ? "Given your conservative approach, consider 60% stocks/40% bonds." : riskTolerance === "high" ? "With your risk tolerance, 90% stocks/10% bonds could work well." : "A balanced 80% stocks/20% bonds is a solid foundation."}`
  }

  if (input.includes("401k") || input.includes("retirement")) {
    return "401k investing is crucial! Always contribute enough to get your full company match - it's free money. Choose low-cost index funds if available. If your 401k options are expensive (>1% expense ratios), contribute just enough for the match, then use an IRA for additional retirement savings."
  }

  if (input.includes("roth") || input.includes("ira")) {
    const iraAdvice =
      userAge && userAge < 30
        ? "At your age, Roth IRA is probably better since you're likely in a lower tax bracket now."
        : userAge && userAge > 50
          ? "Traditional IRA might be better if you're in a high tax bracket now."
          : "Consider your current vs. expected retirement tax bracket to choose between Roth and Traditional."

    return `IRAs are great for retirement savings! You can contribute $6,500/year ($7,500 if 50+). ${iraAdvice} Invest in broad market index funds within the IRA for long-term growth.`
  }

  return "Investing grows wealth over time through compound interest. Start with broad market index funds - they're diversified, low-cost, and historically return 7-10% annually. The key is time in the market, not timing the market. Invest consistently, ignore short-term volatility, and let compound growth work its magic."
}

function generateSimpleResponse(userInput: string, context: any, userData?: UserData): string {
  const input = userInput.toLowerCase()

  if (input.includes("invest") && input.includes("1000")) {
    return "That's a great start! $1,000 is perfect for beginning your investment journey. I'd suggest putting most of it in a broad market index fund like VTI. Do you have an emergency fund saved up already?"
  }

  if (input.includes("emergency fund")) {
    return "Smart question! I usually recommend 3-6 months of expenses in a high-yield savings account. This gives you peace of mind and prevents you from having to sell investments during emergencies. How much are your monthly expenses roughly?"
  }

  if (input.includes("house") || input.includes("home")) {
    return "Buying a house is an exciting goal! The key is timing your savings right. When are you hoping to buy - within 2 years, or do you have a bit more time? This will help determine the best savings strategy."
  }

  if (input.includes("scared") || input.includes("lose money") || input.includes("risk")) {
    return "That's totally normal - everyone feels that way when starting out! The key is understanding that short-term ups and downs are normal, but historically the market grows over time. What specifically worries you most about investing?"
  }

  if (input.includes("index fund") || input.includes("etf")) {
    return "Index funds are perfect for beginners! They're like buying tiny pieces of hundreds of companies at once, which spreads out your risk. VTI and VOO are two popular ones. What's your timeline for this investment?"
  }

  if (input.includes("goal") || input.includes("planning")) {
    return "Great that you're thinking about goals! Having clear targets makes everything easier. What's your biggest financial priority right now - building an emergency fund, investing for growth, or saving for something specific?"
  }

  if (input.includes("retirement") || input.includes("401k")) {
    return "Retirement planning is so important, and starting early gives you a huge advantage! Are you contributing to a 401k at work, or are you looking at opening an IRA? Even small amounts now can grow significantly over time."
  }

  if (input.includes("budget") || input.includes("save")) {
    return "Budgeting is the foundation of good finances! The simple approach is: pay yourself first (save/invest), cover necessities, then enjoy the rest guilt-free. What's your biggest expense challenge right now?"
  }

  // Handle simple yes/no responses
  if (input.includes("yes") || input.includes("yeah") || input.includes("sure")) {
    return "Great! Let me know what specific aspect you'd like to dive deeper into, and I'll walk you through it step by step."
  }

  if (input.includes("no") || input.includes("not really")) {
    return "No worries at all! Everyone starts somewhere. What would be most helpful for you to learn about first - the basics of investing, budgeting, or setting financial goals?"
  }

  // Default response
  return "I'd love to help you with that! To give you the best advice, could you tell me a bit more about your situation? For example, are you just getting started with investing, or do you have specific goals in mind?"
}
