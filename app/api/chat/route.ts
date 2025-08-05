import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { message, userData } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Build user context
    let userContext = ""
    if (userData?.profile) {
      userContext += `User: ${userData.profile.firstName} ${userData.profile.lastName}\n`
      userContext += `Experience: ${userData.profile.investmentExperience}\n`
      userContext += `Risk Tolerance: ${userData.profile.riskTolerance}\n`
    }

    if (userData?.budgetData) {
      userContext += `Income: $${userData.budgetData.income || 0}\n`
      userContext += `Savings: $${userData.budgetData.savings || 0}\n`
    }

    const systemPrompt = `You are a helpful financial literacy assistant. Provide clear, educational responses about personal finance topics. Keep responses concise but informative.

User context:
${userContext}

Focus on education and practical advice.`

    let response: string

    try {
      // Try OpenAI first
      const result = await generateText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        prompt: message,
        maxTokens: 500,
      })

      response = result.text
    } catch (openaiError) {
      console.error("OpenAI error:", openaiError)

      // Fallback response
      response = `I'm having trouble connecting to my AI service right now. However, I can still help! 

For financial questions, I recommend:
• Checking reputable sources like Investopedia or the SEC's investor.gov
• Speaking with a qualified financial advisor
• Using budgeting apps to track your spending

What specific financial topic would you like to learn about? I can provide some general guidance even without my full AI capabilities.`
    }

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        error: "Failed to process message",
        response: "I'm experiencing technical difficulties. Please try again in a moment.",
      },
      { status: 500 },
    )
  }
}
