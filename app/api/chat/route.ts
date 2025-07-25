import { type NextRequest, NextResponse } from "next/server"

interface Message {
  role: "user" | "assistant"
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const conversationHistory = messages.slice(1) // Remove welcome message
    const lastMessage = messages[messages.length - 1]?.content || ""

    // Analyze conversation context
    const context = analyzeConversation(conversationHistory)
    const response = generateContextualResponse(lastMessage, context, conversationHistory)

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

function analyzeConversation(messages: Message[]) {
  const allText = messages.map((m) => m.content.toLowerCase()).join(" ")

  return {
    hasEmergencyFund: allText.includes("emergency fund") || allText.includes("savings account"),
    investmentAmount: extractAmount(allText),
    timeline: extractTimeline(allText),
    riskTolerance: extractRiskTolerance(allText),
    goals: extractGoals(allText),
    experience: extractExperience(allText),
    concerns: extractConcerns(allText),
    previousTopics: extractTopics(messages),
  }
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

  return Array.from(topics)
}

function generateContextualResponse(userInput: string, context: any, conversationHistory: Message[]): string {
  const input = userInput.toLowerCase()
  const lastAssistantMessage = conversationHistory.filter((m) => m.role === "assistant").pop()?.content || ""

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

  if (lastAssistantMessage.includes("timeline") || lastAssistantMessage.includes("when")) {
    if (input.includes("year") || input.includes("month")) {
      const timeframe =
        input.includes("1") || input.includes("one")
          ? "short"
          : input.includes("2") || input.includes("3") || input.includes("few")
            ? "medium"
            : "long"

      if (timeframe === "short") {
        return (
          "With that short timeline, I'd keep the money in a high-yield savings account instead of investing. " +
          "The stock market can be volatile short-term, and you don't want to risk needing the money when it's down. " +
          "Are you looking at this for an emergency fund or a specific purchase?"
        )
      } else if (timeframe === "medium") {
        return (
          "That's a tricky timeline! For 2-5 years, you might consider a mix - maybe 60% in conservative investments and 40% in savings. " +
          "What's this money for? If it's something you absolutely need (like a house down payment), we'd lean more conservative."
        )
      } else {
        return (
          "Great! With 5+ years, you can take advantage of long-term market growth. Index funds like VTI are perfect for this timeline. " +
          "The market might go up and down, but historically it grows over long periods. What's your comfort level with seeing your account fluctuate?"
        )
      }
    }
  }

  if (lastAssistantMessage.includes("comfort level") || lastAssistantMessage.includes("fluctuate")) {
    if (input.includes("comfortable") || input.includes("fine") || input.includes("okay")) {
      return (
        "Awesome! That mindset will serve you well. I'd suggest starting with 80-90% in a broad market fund like VTI. " +
        "You can always adjust as you learn more. Want me to walk you through how to actually buy it?"
      )
    } else if (input.includes("nervous") || input.includes("scared") || input.includes("worried")) {
      return (
        "Totally understandable! Maybe start with 60% stocks (VTI) and 40% bonds (BND) for a smoother ride. " +
        "You can always get more aggressive as you get comfortable. Does that sound more manageable?"
      )
    }
  }

  if (lastAssistantMessage.includes("brokerage account")) {
    if (input.includes("yes") || input.includes("have") || input.includes("fidelity") || input.includes("vanguard")) {
      return (
        "Perfect! Then you're all set to start investing. Just search for VTI or VOO in your account and place a buy order. " +
        "You can start with whatever amount feels comfortable. Would you like me to explain the difference between VTI and VOO?"
      )
    } else {
      return (
        "No problem! I'd recommend Fidelity, Vanguard, or Schwab - they're all great and have no account minimums. " +
        "The signup process takes about 10 minutes online. Should I walk you through what to expect?"
      )
    }
  }

  // Continue building on established context
  if (context.investmentAmount && context.timeline === "long-term" && input.includes("how")) {
    return (
      `With your $${context.investmentAmount.toLocaleString()} and long timeline, here's what I'd do: Put 80% in VTI (broad market) and 20% in VXUS (international). ` +
      "This gives you global diversification. You can buy both in any brokerage account. Want me to explain why this mix works well?"
    )
  }

  // Handle new topics while referencing previous conversation
  if (input.includes("401k") && context.previousTopics.includes("index-funds")) {
    return (
      "Great question! Since we talked about index funds, your 401k probably has similar options. " +
      "Look for funds with 'index' or 'S&P 500' in the name, and check the expense ratios - lower is better. " +
      "Are you getting any company matching on your 401k contributions?"
    )
  }

  // Default responses with context awareness
  if (input.includes("invest") && context.investmentAmount) {
    return (
      `Building on our conversation about your $${context.investmentAmount.toLocaleString()}, ` +
      "the key is starting simple and staying consistent. Index funds are still your best bet for long-term growth. " +
      "What specific part of investing feels most confusing right now?"
    )
  }

  // Fallback to original logic if no context matches
  return generateSimpleResponse(userInput, context)
}

function generateSimpleResponse(userInput: string, context: any): string {
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
