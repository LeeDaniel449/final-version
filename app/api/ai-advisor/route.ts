import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Intelligent fallback system with comprehensive financial knowledge
function getIntelligentFallbackResponse(message: string, userData?: any): string {
  const lowerMessage = message.toLowerCase()

  // Budget-related questions
  if (lowerMessage.includes("budget") || lowerMessage.includes("spending")) {
    if (userData?.budgetData) {
      const { income, expenses, savings } = userData.budgetData
      const totalExpenses = Object.values(expenses || {}).reduce((sum: number, exp: any) => sum + (exp || 0), 0)
      const savingsRate = income > 0 ? (((savings || 0) / income) * 100).toFixed(1) : "0"

      return `Based on your current budget data:
      
💰 **Income**: $${income?.toLocaleString() || 0}
📊 **Expenses**: $${totalExpenses.toLocaleString()}
💵 **Savings**: $${savings?.toLocaleString() || 0} (${savingsRate}% savings rate)

**Recommendations:**
${
  income > 0 && totalExpenses > income
    ? "🚨 You're spending more than you earn. Consider reducing expenses in your highest spending categories."
    : savings && savings < income * 0.2
      ? "📈 Try to increase your savings rate to 20% of income for better financial health."
      : "✅ Your budget looks balanced! Keep tracking your expenses to maintain this momentum."
}

**Next Steps:**
• Review your spending categories monthly
• Set up automatic savings transfers
• Consider the 50/30/20 rule (needs/wants/savings)`
    }

    return `Here's a comprehensive budgeting guide:

🎯 **The 50/30/20 Rule:**
• 50% for needs (housing, utilities, groceries)
• 30% for wants (entertainment, dining out)
• 20% for savings and debt repayment

📝 **Budgeting Steps:**
1. Track all income sources
2. List fixed expenses (rent, insurance)
3. Identify variable expenses (food, entertainment)
4. Set realistic spending limits
5. Review and adjust monthly

💡 **Pro Tips:**
• Use the envelope method for cash spending
• Automate savings to "pay yourself first"
• Review subscriptions quarterly
• Build an emergency fund (3-6 months expenses)`
  }

  // Investment questions
  if (lowerMessage.includes("invest") || lowerMessage.includes("stock") || lowerMessage.includes("portfolio")) {
    const riskLevel = userData?.profile?.riskTolerance || "moderate"

    return `Investment guidance based on your ${riskLevel} risk tolerance:

📈 **Investment Basics:**
• Start with emergency fund (3-6 months expenses)
• Pay off high-interest debt first (>6% APR)
• Consider your time horizon and goals

🎯 **Asset Allocation Suggestions:**
${
  riskLevel === "conservative"
    ? "• 70% bonds/fixed income, 30% stocks\n• Focus on dividend-paying stocks\n• Consider CDs and high-yield savings"
    : riskLevel === "aggressive"
      ? "• 80-90% stocks, 10-20% bonds\n• Include growth stocks and ETFs\n• Consider international diversification"
      : "• 60% stocks, 40% bonds\n• Mix of index funds and ETFs\n• Balanced approach to growth and stability"
}

💼 **Getting Started:**
1. Open a brokerage account
2. Start with low-cost index funds
3. Invest consistently (dollar-cost averaging)
4. Rebalance annually
5. Stay informed but avoid emotional decisions

⚠️ **Important:** This is educational information, not personalized financial advice. Consider consulting a financial advisor for your specific situation.`
  }

  // Debt management
  if (lowerMessage.includes("debt") || lowerMessage.includes("loan") || lowerMessage.includes("credit card")) {
    return `Debt Management Strategies:

🎯 **Two Main Approaches:**

**Debt Snowball Method:**
• Pay minimums on all debts
• Focus extra payments on smallest balance
• Builds momentum and motivation
• Good for psychological wins

**Debt Avalanche Method:**
• Pay minimums on all debts  
• Focus extra payments on highest interest rate
• Saves more money mathematically
• Best for long-term financial optimization

📊 **Debt Prioritization:**
1. Credit cards (typically 15-25% APR)
2. Personal loans (6-15% APR)
3. Auto loans (3-7% APR)
4. Student loans (3-6% APR)
5. Mortgages (3-5% APR)

💡 **Additional Strategies:**
• Consider debt consolidation for multiple high-interest debts
• Negotiate with creditors for lower rates
• Use balance transfer cards strategically (watch for fees)
• Increase income through side hustles
• Avoid taking on new debt while paying off existing debt

🚨 **Red Flags:**
• Only making minimum payments
• Using credit for basic necessities
• Debt-to-income ratio above 40%`
  }

  // Savings and emergency fund
  if (lowerMessage.includes("save") || lowerMessage.includes("emergency") || lowerMessage.includes("fund")) {
    return `Building Your Financial Safety Net:

🛡️ **Emergency Fund Essentials:**
• Goal: 3-6 months of living expenses
• Keep in high-yield savings account
• Separate from other savings goals
• Only use for true emergencies

📈 **Savings Strategies:**
1. **Pay Yourself First**: Automate transfers to savings
2. **The 1% Rule**: Increase savings rate by 1% annually
3. **Round-Up Apps**: Save spare change automatically
4. **52-Week Challenge**: Save increasing amounts weekly
5. **Windfall Rule**: Save 50% of unexpected money

🎯 **Savings Goals by Priority:**
1. $1,000 starter emergency fund
2. Pay off high-interest debt
3. Full emergency fund (3-6 months)
4. Retirement contributions (employer match)
5. Other goals (house, vacation, etc.)

💰 **Where to Keep Savings:**
• **Emergency Fund**: High-yield savings (2-5% APY)
• **Short-term goals** (<2 years): CDs or money market
• **Long-term goals** (>5 years): Investment accounts

🔄 **Automate Everything:**
• Direct deposit splits
• Automatic transfers
• Round-up programs
• Employer retirement contributions`
  }

  // Retirement planning
  if (lowerMessage.includes("retire") || lowerMessage.includes("401k") || lowerMessage.includes("ira")) {
    const age = userData?.profile?.age || 30
    const yearsToRetirement = 65 - age

    return `Retirement Planning Guide:

⏰ **Your Timeline:** ~${yearsToRetirement} years to traditional retirement age

🎯 **Retirement Savings Vehicles:**

**401(k) - Employer Plans:**
• Contribute enough to get full employer match
• 2024 limit: $23,000 ($30,500 if 50+)
• Often includes company matching
• Tax-deferred growth

**IRA Options:**
• **Traditional IRA**: Tax deduction now, taxed in retirement
• **Roth IRA**: After-tax contributions, tax-free growth
• 2024 limit: $7,000 ($8,000 if 50+)

📊 **Contribution Strategy:**
1. Contribute to 401(k) up to employer match
2. Max out Roth IRA if eligible
3. Return to 401(k) to increase contributions
4. Consider backdoor Roth if income too high

💰 **Rule of Thumb:**
• Save 10-15% of income for retirement
• Start early - compound interest is powerful
• At age ${age}, aim for ${Math.floor(age / 10)}x annual salary saved

🔄 **Investment Allocation:**
• **Target Date Funds**: Automatic rebalancing
• **Age in Bonds Rule**: ${age}% bonds, ${100 - age}% stocks
• **Diversification**: Don't put all eggs in one basket

⚡ **Action Steps:**
1. Sign up for employer 401(k)
2. Increase contributions by 1% annually
3. Open IRA if needed
4. Review and rebalance annually`
  }

  // Financial goals
  if (lowerMessage.includes("goal") || lowerMessage.includes("plan") || lowerMessage.includes("future")) {
    const goals = userData?.goals || []

    return `Financial Goal Setting & Planning:

${
  goals.length > 0
    ? `🎯 **Your Current Goals:**
${goals.map((goal: any) => `• ${goal.title}: $${goal.currentAmount?.toLocaleString() || 0} / $${goal.targetAmount?.toLocaleString() || 0} (${goal.status})`).join("\n")}

`
    : ""
}🏆 **SMART Financial Goals Framework:**
• **Specific**: Clear, well-defined objective
• **Measurable**: Trackable with numbers
• **Achievable**: Realistic given your situation  
• **Relevant**: Aligned with your values
• **Time-bound**: Has a deadline

📋 **Common Financial Goals:**
1. **Emergency Fund**: 3-6 months expenses
2. **Debt Freedom**: Pay off all consumer debt
3. **Home Down Payment**: 10-20% of home price
4. **Retirement**: 10-15x annual salary by retirement
5. **Education**: College fund for children
6. **Travel**: Specific trip or experience fund

💡 **Goal Achievement Strategies:**
• Break large goals into smaller milestones
• Automate savings for each goal
• Use separate accounts for different goals
• Review progress monthly
• Celebrate milestones reached

🔄 **The Goal Hierarchy:**
1. **Foundation**: Emergency fund + debt payoff
2. **Security**: Insurance + retirement basics
3. **Growth**: Increased retirement + investments
4. **Dreams**: House, travel, luxury goals

📈 **Tracking Progress:**
• Use apps or spreadsheets
• Visual progress bars
• Regular check-ins
• Adjust as life changes`
  }

  // General financial advice
  if (lowerMessage.includes("help") || lowerMessage.includes("advice") || lowerMessage.includes("start")) {
    return `Welcome to Your Financial Journey! 🚀

🎯 **Financial Health Checklist:**
□ Track income and expenses
□ Create a monthly budget
□ Build $1,000 emergency fund
□ Pay off high-interest debt
□ Contribute to employer 401(k) match
□ Build full emergency fund (3-6 months)
□ Increase retirement contributions
□ Consider additional investments

📚 **Key Financial Principles:**
1. **Pay Yourself First**: Save before spending
2. **Live Below Your Means**: Spend less than you earn
3. **Invest Early & Often**: Time is your best friend
4. **Diversify**: Don't put all eggs in one basket
5. **Stay Educated**: Keep learning about money

🛠️ **Essential Tools:**
• Budgeting app (Mint, YNAB, or spreadsheet)
• High-yield savings account
• Investment account (Fidelity, Vanguard, Schwab)
• Credit monitoring service
• Financial goal tracker

📖 **Recommended Learning:**
• Books: "The Total Money Makeover", "The Bogleheads' Guide to Investing"
• Podcasts: "The Dave Ramsey Show", "The Investors Podcast"
• Websites: Bogleheads.org, Investopedia
• YouTube: Ben Felix, Two Cents

🎯 **Next Steps:**
1. Complete your financial profile
2. Set up your first budget
3. Start tracking expenses
4. Set one specific financial goal
5. Automate your first savings transfer

Remember: Personal finance is personal! What works for others might need adjustment for your situation. Start with the basics and build from there. 💪`
  }

  // Default response for unrecognized questions
  return `I'd be happy to help with your financial question! 

🎯 **I can assist you with:**
• **Budgeting**: Creating and managing your budget
• **Investing**: Portfolio allocation and investment strategies  
• **Debt Management**: Payoff strategies and debt consolidation
• **Savings**: Emergency funds and savings goals
• **Retirement Planning**: 401(k), IRA, and retirement strategies
• **Financial Goals**: Setting and achieving financial milestones

💡 **Popular Questions:**
• "How should I budget my income?"
• "Should I invest or pay off debt first?"
• "How much should I save for retirement?"
• "What's the best way to build an emergency fund?"
• "How do I start investing with little money?"

Feel free to ask about any of these topics, and I'll provide personalized advice based on your financial situation! What specific area would you like to explore?`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, userData, useOpenAI = true } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    let response = ""
    let source = "intelligent_fallback"

    // Try OpenAI first if enabled and API key is available
    if (useOpenAI && process.env.OPENAI_API_KEY) {
      try {
        const systemPrompt = `You are a knowledgeable and friendly financial advisor. Provide helpful, accurate financial advice while being encouraging and supportive. 

${
  userData
    ? `User Context:
- Profile: ${JSON.stringify(userData.profile || {})}
- Budget: ${JSON.stringify(userData.budgetData || {})}
- Goals: ${JSON.stringify(userData.goals || [])}
- Progress: ${JSON.stringify(userData.progress || {})}

Use this information to provide personalized advice.`
    : ""
}

Keep responses conversational, practical, and actionable. Use emojis sparingly but effectively. Always remind users that this is educational information and they should consult professionals for specific financial decisions.`

        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        })

        response =
          completion.choices[0]?.message?.content ||
          "I apologize, but I couldn't generate a response. Please try again."
        source = "openai"
      } catch (openaiError) {
        console.error("OpenAI API error:", openaiError)
        // Fall back to intelligent system
        response = getIntelligentFallbackResponse(message, userData)
        source = "intelligent_fallback"
      }
    } else {
      // Use intelligent fallback system
      response = getIntelligentFallbackResponse(message, userData)
      source = "intelligent_fallback"
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
        response:
          "I'm experiencing some technical difficulties right now. Here are some general financial tips while I get back online:\n\n• Track your spending daily\n• Build an emergency fund\n• Pay off high-interest debt\n• Invest in low-cost index funds\n• Automate your savings\n\nPlease try again in a moment!",
        source: "error",
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    ) // Return 200 to avoid frontend errors
  }
}
