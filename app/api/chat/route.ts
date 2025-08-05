import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

interface RequestBody {
  messages: Message[]
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    console.log("Chat API called")

    const body: RequestBody = await request.json()
    console.log("Request body received:", JSON.stringify(body, null, 2))

    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages format:", messages)
      return NextResponse.json({ error: "Invalid messages format. Expected array of messages." }, { status: 400 })
    }

    if (messages.length === 0) {
      console.error("No messages provided")
      return NextResponse.json({ error: "No messages provided" }, { status: 400 })
    }

    // Get the latest user message
    const userMessage = messages[messages.length - 1]
    if (!userMessage || userMessage.role !== "user") {
      console.error("No user message found or invalid message role:", userMessage)
      return NextResponse.json({ error: "No valid user message found" }, { status: 400 })
    }

    console.log("Processing user message:", userMessage.content)

    let reply: string

    // Try to use OpenAI if API key is available
    if (process.env.OPENAI_API_KEY) {
      try {
        console.log("Using OpenAI GPT-4 for response generation...")

        const systemPrompt = `You are a helpful AI assistant for a financial literacy application. You can help users with general questions about the app, navigation, features, and basic financial concepts.

Keep responses concise and helpful. If users ask complex financial questions, direct them to the AI Financial Advisor feature for personalized advice.

Available app features:
- Budget tracking and management
- Goal setting and tracking
- Learning modules for financial education
- AI Financial Advisor for personalized advice
- Portfolio simulation and analysis

Be friendly, professional, and encouraging about financial literacy and learning.`

        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.slice(-5), // Include last 5 messages for context
          ],
          max_tokens: 800,
          temperature: 0.7,
        })

        reply =
          completion.choices[0]?.message?.content ||
          "I apologize, but I couldn't generate a response. Please try again."

        console.log("OpenAI response generated successfully")
      } catch (openaiError) {
        console.error("OpenAI API Error:", openaiError)
        console.log("Falling back to simple response...")
        reply = generateSimpleResponse(userMessage.content)
      }
    } else {
      console.log("No OpenAI API key found, using simple response")
      reply = generateSimpleResponse(userMessage.content)
    }

    return NextResponse.json({
      reply,
      timestamp: new Date().toISOString(),
      source: process.env.OPENAI_API_KEY ? "openai" : "fallback",
    })
  } catch (error) {
    console.error("Chat API Error:", error)

    return NextResponse.json(
      {
        reply: "I'm having trouble processing your request right now. Please try again in a moment.",
        error: "Service temporarily unavailable",
        timestamp: new Date().toISOString(),
        source: "error_fallback",
      },
      { status: 200 }, // Return 200 so the UI can display the message
    )
  }
}

function generateSimpleResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()

  if (message.includes("help") || message.includes("how")) {
    return `I'm here to help! This financial literacy app has several features:

🏠 **Dashboard** - Overview of your financial health
📊 **Budget** - Track income and expenses
🎯 **Goals** - Set and monitor financial objectives
📚 **Learning** - Educational modules on finance
🤖 **AI Advisor** - Get personalized financial advice
📈 **Portfolio** - Investment simulation and analysis

What would you like to know more about?`
  }

  if (message.includes("budget")) {
    return `The Budget feature helps you track your income and expenses. You can:

• Add income sources
• Categorize expenses
• Set spending limits
• View spending trends
• Get insights on your financial habits

Visit the Budget page to get started!`
  }

  if (message.includes("goal")) {
    return `The Goals feature helps you plan for the future. You can:

• Set financial targets (emergency fund, vacation, etc.)
• Track progress toward your goals
• Get recommendations on how much to save
• Set deadlines and priorities

Check out the Goals page to start planning!`
  }

  if (message.includes("learn") || message.includes("education")) {
    return `Our Learning modules cover essential financial topics:

📚 **Available Topics:**
• Budgeting basics
• Saving strategies
• Investment fundamentals
• Debt management
• Retirement planning

Each module includes interactive lessons and quizzes. Start learning today!`
  }

  if (message.includes("advisor") || message.includes("advice")) {
    return `The AI Financial Advisor provides personalized advice based on your financial situation. It can help with:

💡 **Personalized Guidance:**
• Budget analysis and optimization
• Investment recommendations
• Debt payoff strategies
• Goal planning assistance

Visit the AI Advisor page for detailed financial guidance!`
  }

  return `Hello! I'm here to help you navigate this financial literacy app. 

You can ask me about:
• How to use different features
• General financial concepts
• App navigation and tips

For personalized financial advice, I recommend using the AI Financial Advisor feature.

What would you like to know?`
}
