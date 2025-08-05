import { type NextRequest, NextResponse } from "next/server"
import { getUserData } from "@/lib/user-data"

export async function POST(request: NextRequest) {
  try {
    console.log("🤖 AI Advisor API called")

    // Parse the request body
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    console.log("📝 User message:", message)

    // Get user data for context
    const userData = getUserData()
    console.log("👤 User data loaded:", {
      isSignedIn: userData.isSignedIn,
      hasProfile: !!userData.profile.firstName,
      hasGoals: userData.goals.length > 0,
    })

    // Check if OpenAI API key is available
    const openaiApiKey = process.env.OPENAI_API_KEY
    if (!openaiApiKey) {
      console.error("❌ OpenAI API key not found")
      return NextResponse.json({
        success: false,
        message: "I'm sorry, but the AI service is currently unavailable. Please try again later.",
        source: "error",
      })
    }

    // Create user context for personalized responses
    const userContext = `
User Profile:
- Name: ${userData.profile.firstName} ${userData.profile.lastName}
- Age: ${userData.profile.age || "Not specified"}
- Risk Tolerance: ${userData.profile.riskTolerance || "Not specified"}
- Investment Experience: ${userData.profile.investmentExperience || "Not specified"}
- Time Horizon: ${userData.profile.timeHorizon || "Not specified"}

Budget Information:
- Monthly Income: $${userData.budgetData.income || 0}
- Monthly Expenses: $${Object.values(userData.budgetData.expenses).reduce((sum, exp) => sum + exp, 0)}
- Savings: $${userData.budgetData.savings || 0}

Financial Goals:
${
  userData.goals.length > 0
    ? userData.goals
        .map((goal) => `- ${goal.title}: $${goal.currentAmount}/$${goal.targetAmount} (${goal.status})`)
        .join("\n")
    : "- No goals set yet"
}

Learning Progress:
- Completed Lessons: ${userData.progress.completedLessons || 0}
- Current Streak: ${userData.progress.currentStreak || 0} days
- Total XP: ${userData.progress.totalXP || 0}
`

    console.log("🎯 Sending request to OpenAI...")

    // Make direct API call to OpenAI
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a helpful financial advisor AI assistant. You provide personalized financial advice based on the user's profile, budget, goals, and progress. Always be encouraging, practical, and educational. Use the user's specific information to give tailored advice.

${userContext}

Guidelines:
- Be conversational and friendly
- Provide specific, actionable advice
- Reference the user's actual financial situation when relevant
- Encourage good financial habits
- Explain financial concepts in simple terms
- Always prioritize the user's financial wellbeing`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}))
      console.error("❌ OpenAI API Error:", {
        status: openaiResponse.status,
        statusText: openaiResponse.statusText,
        error: errorData,
      })

      let errorMessage = "I'm experiencing some technical difficulties. Please try again in a moment."

      if (openaiResponse.status === 401) {
        errorMessage = "There's an authentication issue with the AI service. Please contact support."
      } else if (openaiResponse.status === 429) {
        errorMessage = "The AI service is currently busy. Please try again in a few minutes."
      } else if (openaiResponse.status === 500) {
        errorMessage = "The AI service is temporarily unavailable. Please try again later."
      }

      return NextResponse.json({
        success: false,
        message: errorMessage,
        source: "error",
      })
    }

    const openaiData = await openaiResponse.json()
    console.log("✅ OpenAI response received")

    const aiMessage =
      openaiData.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again."

    return NextResponse.json({
      success: true,
      message: aiMessage,
      source: "openai",
      model: "gpt-4",
    })
  } catch (error) {
    console.error("❌ API Error:", error)

    return NextResponse.json({
      success: false,
      message: "I'm sorry, but I'm experiencing technical difficulties. Please try again later.",
      source: "error",
    })
  }
}
