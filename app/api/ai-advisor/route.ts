import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { getUserData } from "@/lib/user-data"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    console.log("🔄 AI Advisor API called")

    // Parse request body safely
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError)
      return NextResponse.json(
        {
          reply: "I'm sorry, I couldn't understand your request. Please try asking your financial question again.",
          source: "error",
        },
        { status: 400 },
      )
    }

    // Validate request structure
    if (!body || typeof body !== "object") {
      console.error("❌ Invalid request body structure")
      return NextResponse.json(
        {
          reply: "I'm sorry, there was an issue with your request format. Please try again.",
          source: "error",
        },
        { status: 400 },
      )
    }

    const { messages } = body

    // Validate messages array
    if (!Array.isArray(messages) || messages.length === 0) {
      console.error("❌ Invalid messages array:", messages)
      return NextResponse.json(
        {
          reply: "I'm sorry, I didn't receive any messages to process. Please ask me a financial question.",
          source: "error",
        },
        { status: 400 },
      )
    }

    // Validate message structure
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || typeof lastMessage.content !== "string" || !lastMessage.content.trim()) {
      console.error("❌ Invalid message content:", lastMessage)
      return NextResponse.json(
        {
          reply: "I'm sorry, your message appears to be empty. Please ask me a specific financial question.",
          source: "error",
        },
        { status: 400 },
      )
    }

    // Get user data for context
    const userData = getUserData()
    console.log("📊 User data loaded for AI context")

    // Build context for AI
    const userContext = `
User Profile:
- Name: ${userData.profile.firstName} ${userData.profile.lastName}
- Age: ${userData.profile.age}
- Risk Tolerance: ${userData.profile.riskTolerance}
- Investment Experience: ${userData.profile.investmentExperience}
- Time Horizon: ${userData.profile.timeHorizon}

Financial Situation:
- Monthly Income: $${userData.budgetData.income?.toLocaleString() || "0"}
- Monthly Expenses: $${Object.values(userData.budgetData.expenses || {})
      .reduce((sum: number, exp: number) => sum + exp, 0)
      .toLocaleString()}
- Savings: $${userData.budgetData.savings?.toLocaleString() || "0"}
- Active Goals: ${userData.goals?.length || 0}

Learning Progress:
- Completed Lessons: ${userData.progress?.completedLessons || 0}
- Current Streak: ${userData.progress?.currentStreak || 0} days
`

    const systemPrompt = `You are a knowledgeable and friendly financial advisor AI assistant. You provide personalized financial advice based on the user's specific situation, goals, and experience level.

${userContext}

Guidelines:
- Provide specific, actionable advice tailored to the user's situation
- Use clear, jargon-free language appropriate for their experience level
- Reference their specific financial data when relevant
- Suggest concrete next steps they can take
- Be encouraging and supportive
- If asked about investments, consider their risk tolerance and time horizon
- Always prioritize emergency funds and debt management before investment advice
- Keep responses concise but comprehensive (2-4 paragraphs max)

Remember: You are providing educational information, not professional financial advice. Users should consult with qualified financial professionals for major financial decisions.`

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ OpenAI API key not found")
      return NextResponse.json(
        {
          reply: "I'm sorry, but the AI advisor is not properly configured. Please contact support or try again later.",
          source: "error",
        },
        { status: 500 },
      )
    }

    try {
      console.log("🤖 Making OpenAI API call...")

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        max_tokens: 500,
        temperature: 0.7,
      })

      const reply = completion.choices[0]?.message?.content?.trim()

      if (!reply) {
        console.error("❌ Empty response from OpenAI")
        return NextResponse.json(
          {
            reply: "I'm sorry, I couldn't generate a response. Please try rephrasing your question.",
            source: "error",
          },
          { status: 500 },
        )
      }

      console.log("✅ OpenAI response received successfully")
      return NextResponse.json({
        reply,
        source: "openai",
      })
    } catch (openaiError: any) {
      console.error("❌ OpenAI API Error:", openaiError.message)

      // Return a more specific error message based on the error type
      let errorMessage = "I'm experiencing technical difficulties. Please try again in a moment."

      if (openaiError.code === "insufficient_quota") {
        errorMessage = "The AI service is temporarily unavailable due to quota limits. Please try again later."
      } else if (openaiError.code === "rate_limit_exceeded") {
        errorMessage = "Too many requests. Please wait a moment and try again."
      } else if (openaiError.code === "invalid_api_key") {
        errorMessage = "AI service configuration error. Please contact support."
      }

      return NextResponse.json(
        {
          reply: errorMessage,
          source: "error",
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("❌ Unexpected error in AI advisor:", error)
    return NextResponse.json(
      {
        reply:
          "I apologize, but I'm experiencing technical difficulties right now. Please try asking your question again in a moment.",
        source: "error",
      },
      { status: 500 },
    )
  }
}
