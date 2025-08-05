import { type NextRequest, NextResponse } from "next/server"

// Only import OpenAI on the server side
let OpenAI: any = null
let openai: any = null

// Initialize OpenAI only on server
if (typeof window === "undefined") {
  try {
    OpenAI = require("openai").default
    if (process.env.OPENAI_API_KEY) {
      openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
    }
  } catch (error) {
    console.log("OpenAI not available:", error)
  }
}

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

function getUserData() {
  // Mock user data for now - in a real app this would come from a database or session
  return {
    isSignedIn: true,
    profile: {
      age: 30,
      riskTolerance: "moderate",
      investmentExperience: "beginner",
    },
    budgetData: {
      income: 5000,
      expenses: {
        housing: 1500,
        food: 600,
        transportation: 400,
        entertainment: 300,
        healthcare: 200,
        other: 300,
      },
      currentSavings: 10000,
    },
    goals: [
      {
        name: "Emergency Fund",
        targetAmount: 18000,
        currentAmount: 10000,
        deadline: "2024-12-31",
        priority: "high",
      },
      {
        name: "House Down Payment",
        targetAmount: 50000,
        currentAmount: 5000,
        deadline: "2026-06-01",
        priority: "medium",
      },
    ],
  }
}

function buildUserContext() {
  try {
    const userData = getUserData()

    if (!userData.isSignedIn) {
      return "User is not signed in. Provide general financial advice and encourage them to sign up for personalized recommendations."
    }

    const budget = userData.budgetData
    const goals = userData.goals
    const profile = userData.profile

    let context = `User Profile:
- Age: ${profile.age || "Not specified"}
- Risk Tolerance: ${profile.riskTolerance || "Not specified"}
- Investment Experience: ${profile.investmentExperience || "Not specified"}

`

    if (budget && budget.income > 0) {
      const totalExpenses = Object.values(budget.expenses).reduce((sum: number, val: number) => sum + val, 0)
      const leftover = budget.income - totalExpenses
      const savingsRate = budget.income > 0 ? ((leftover / budget.income) * 100).toFixed(1) : "0"

      context += `Budget Analysis:
- Monthly Income: $${budget.income.toLocaleString()}
- Total Expenses: $${totalExpenses.toLocaleString()}
- Monthly Leftover: $${leftover.toLocaleString()}
- Savings Rate: ${savingsRate}%
- Current Savings: $${budget.currentSavings?.toLocaleString() || "0"}

Expense Breakdown:
- Housing: $${budget.expenses.housing || 0}
- Food: $${budget.expenses.food || 0}
- Transportation: $${budget.expenses.transportation || 0}
- Entertainment: $${budget.expenses.entertainment || 0}
- Healthcare: $${budget.expenses.healthcare || 0}
- Other: $${budget.expenses.other || 0}

`
    }

    if (goals && goals.length > 0) {
      context += `Financial Goals:\n`
      goals.forEach((goal: any, index: number) => {
        const progress = goal.targetAmount > 0 ? ((goal.currentAmount / goal.targetAmount) * 100).toFixed(1) : "0"
        context += `${index + 1}. ${goal.name}
   - Target: $${goal.targetAmount.toLocaleString()}
   - Current: $${goal.currentAmount.toLocaleString()}
   - Progress: ${progress}%
   - Deadline: ${goal.deadline}
   - Priority: ${goal.priority}

`
      })
    }

    return context
  } catch (error) {
    console.error("Error building user context:", error)
    return "Unable to load user data. Providing general financial advice."
  }
}

function getSmartFallbackResponse(userMessage: string, userContext: string): string {
  const message = userMessage.toLowerCase()

  // Budget-related questions
  if (message.includes("budget") || message.includes("expense") || message.includes("spending")) {
    if (userContext.includes("Monthly Income")) {
      const incomeMatch = userContext.match(/Monthly Income: \$([0-9,]+)/)
      const expensesMatch = userContext.match(/Total Expenses: \$([0-9,]+)/)
      const savingsRateMatch = userContext.match(/Savings Rate: ([0-9.]+)%/)

      if (incomeMatch && expensesMatch && savingsRateMatch) {
        const savingsRate = Number.parseFloat(savingsRateMatch[1])
        let advice = `📊 Budget Analysis:\n\n`
        advice += `Your current savings rate is ${savingsRate}%. `

        if (savingsRate >= 20) {
          advice += `Excellent! You're saving above the recommended 20%.\n\n`
        } else if (savingsRate >= 10) {
          advice += `Good start! Try to increase to 20% if possible.\n\n`
        } else {
          advice += `Consider reducing expenses to reach a 20% savings rate.\n\n`
        }

        advice += `💡 Tips to optimize your budget:\n`
        advice += `• Review your largest expense categories\n`
        advice += `• Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings\n`
        advice += `• Track spending for a month to identify areas to cut\n`
        advice += `• Automate savings to pay yourself first`

        return advice
      }
    }

    return `💰 Budget Management Tips:\n\n• Follow the 50/30/20 rule: 50% for needs, 30% for wants, 20% for savings\n• Track all expenses for at least a month\n• Identify your largest expense categories\n• Look for subscriptions you can cancel\n• Cook at home more often\n• Use budgeting apps to stay on track\n\nSign up to get personalized budget analysis based on your actual income and expenses!`
  }

  // Investment questions
  if (message.includes("invest") || message.includes("stock") || message.includes("portfolio")) {
    let advice = `📈 Investment Guidance:\n\n`

    if (userContext.includes("Risk Tolerance")) {
      const riskMatch = userContext.match(/Risk Tolerance: ([^\n]+)/)
      const ageMatch = userContext.match(/Age: ([0-9]+)/)

      if (riskMatch && ageMatch) {
        const risk = riskMatch[1].toLowerCase()
        const age = Number.parseInt(ageMatch[1])

        advice += `Based on your ${risk} risk tolerance and age ${age}:\n\n`

        if (risk.includes("conservative")) {
          advice += `• Consider 60% stocks (VTI), 40% bonds (BND)\n`
        } else if (risk.includes("moderate")) {
          advice += `• Consider 70% stocks (VTI), 30% bonds (BND)\n`
        } else {
          advice += `• Consider 80% stocks (VTI), 20% bonds (BND)\n`
        }
      }
    } else {
      advice += `General investment principles:\n`
    }

    advice += `\n🎯 Key Investment Tips:\n`
    advice += `• Start with low-cost index funds (VTI, VTIAX)\n`
    advice += `• Diversify across asset classes\n`
    advice += `• Invest regularly (dollar-cost averaging)\n`
    advice += `• Keep emergency fund separate from investments\n`
    advice += `• Don't try to time the market\n`
    advice += `• Rebalance annually`

    return advice
  }

  // Savings questions
  if (message.includes("save") || message.includes("emergency fund")) {
    let advice = `💰 Savings Strategy:\n\n`

    if (userContext.includes("Total Expenses")) {
      const expensesMatch = userContext.match(/Total Expenses: \$([0-9,]+)/)
      if (expensesMatch) {
        const monthlyExpenses = Number.parseInt(expensesMatch[1].replace(/,/g, ""))
        const emergencyFund = monthlyExpenses * 6

        advice += `Based on your monthly expenses of $${monthlyExpenses.toLocaleString()}:\n`
        advice += `• Emergency fund target: $${emergencyFund.toLocaleString()} (6 months)\n`
        advice += `• Start with $1,000 if you're just beginning\n\n`
      }
    }

    advice += `🏦 Savings Tips:\n`
    advice += `• Pay yourself first - automate savings\n`
    advice += `• Use high-yield savings accounts (4-5% APY)\n`
    advice += `• Keep emergency fund in separate account\n`
    advice += `• Save for specific goals in different accounts\n`
    advice += `• Consider CDs for longer-term savings`

    return advice
  }

  // Goal-related questions
  if (message.includes("goal") || message.includes("plan")) {
    if (userContext.includes("Financial Goals")) {
      return `🎯 Your Financial Goals Analysis:\n\nI can see your goals in your profile. Here's how to optimize them:\n\n• Prioritize high-interest debt payoff first\n• Build emergency fund before investing\n• Use separate savings accounts for each goal\n• Set up automatic transfers\n• Review and adjust monthly\n\nWould you like specific advice on any particular goal?`
    }

    return `🎯 Goal Setting Tips:\n\n• Make goals SMART (Specific, Measurable, Achievable, Relevant, Time-bound)\n• Prioritize: Emergency fund → High-interest debt → Retirement → Other goals\n• Break large goals into smaller milestones\n• Automate savings for each goal\n• Review progress monthly\n• Celebrate milestones!\n\nSign up to track your specific financial goals!`
  }

  // Debt questions
  if (message.includes("debt") || message.includes("credit card") || message.includes("loan")) {
    return `💳 Debt Management Strategy:\n\n🔥 High-Priority Debt (Pay off first):\n• Credit cards (usually 18-25% APR)\n• Personal loans\n• Payday loans\n\n📊 Debt Payoff Methods:\n• Avalanche: Pay minimums on all, extra on highest interest\n• Snowball: Pay minimums on all, extra on smallest balance\n\n💡 Additional Tips:\n• Stop using credit cards while paying off debt\n• Consider balance transfer to 0% APR card\n• Negotiate with creditors for lower rates\n• Use debt consolidation if it lowers your rate\n• Build small emergency fund ($1,000) while paying debt`
  }

  // Default response
  return `👋 Hi! I'm your AI financial advisor. I can help you with:\n\n📊 Budget analysis and optimization\n💰 Savings strategies and emergency funds\n📈 Investment advice and portfolio allocation\n🎯 Financial goal planning and tracking\n💳 Debt management strategies\n\nWhat specific area would you like help with? The more details you provide, the better I can assist you!\n\nFor personalized advice based on your actual financial data, consider signing up for an account.`
}

export async function POST(request: NextRequest) {
  try {
    console.log("AI Advisor API called")

    const body = await request.json()
    console.log("Request body:", body)

    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages format:", messages)
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    const userMessage = messages[messages.length - 1]?.content
    if (!userMessage) {
      console.error("No user message found")
      return NextResponse.json({ error: "No user message found" }, { status: 400 })
    }

    console.log("User message:", userMessage)

    // Build user context
    const userContext = buildUserContext()
    console.log("User context built successfully")

    // Try OpenAI first if available
    if (openai && process.env.OPENAI_API_KEY) {
      try {
        console.log("Attempting OpenAI API call...")

        const systemPrompt = `You are a professional financial advisor with expertise in budgeting, saving, investing, and debt management. 

User Context:
${userContext}

Provide helpful, actionable financial advice based on the user's specific situation. Be encouraging but realistic. Always prioritize:
1. Emergency fund (3-6 months expenses)
2. High-interest debt payoff
3. Retirement savings (401k match, then IRA)
4. Other investments and goals

Keep responses concise but comprehensive. Use bullet points and emojis for readability.`

        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.slice(-5), // Keep last 5 messages for context
          ],
          max_tokens: 1000,
          temperature: 0.7,
        })

        const reply =
          completion.choices[0]?.message?.content ||
          "I apologize, but I could not generate a response. Please try again."

        console.log("OpenAI response received successfully")
        return NextResponse.json({ reply })
      } catch (openaiError) {
        console.error("OpenAI API Error:", openaiError)
        // Fall through to fallback response
      }
    } else {
      console.log("OpenAI not available, using fallback")
    }

    // Fallback to smart keyword-based responses
    console.log("Using fallback response system")
    const reply = getSmartFallbackResponse(userMessage, userContext)
    console.log("Fallback response generated")

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        reply: "Sorry, I'm having trouble right now. Please try again in a moment.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
