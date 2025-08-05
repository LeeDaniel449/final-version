"use client"

import { useState } from "react"
import { userDataManager } from "@/lib/user-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Bot, User, Settings, Zap, Brain, Sparkles, MessageCircle } from "lucide-react"

interface Message {
  role: "system" | "user" | "assistant"
  content: string
}

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "You are a helpful financial advisor.",
    },
    {
      role: "assistant",
      content:
        "Hello! I'm your AI financial advisor. I can help you with budgeting, investing, debt management, and achieving your financial goals. What would you like to discuss today? 💰",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [useOpenAI, setUseOpenAI] = useState(true)
  const [lastResponseSource, setLastResponseSource] = useState<string>("")

  // Quick starter questions with colorful styling
  const quickStarters = [
    { text: "How should I prioritize my financial goals?", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
    {
      text: "What's the best way to invest my surplus money?",
      color: "bg-green-100 text-green-800 hover:bg-green-200",
    },
    { text: "Should I pay off debt or invest first?", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
    { text: "How can I improve my savings rate?", color: "bg-orange-100 text-orange-800 hover:bg-orange-200" },
    { text: "Is my emergency fund adequate?", color: "bg-red-100 text-red-800 hover:bg-red-200" },
  ]

  const sendMessage = async (messageText?: string) => {
    const messageToSend = messageText || input.trim()
    if (!messageToSend) return

    const newMessages = [...messages, { role: "user" as const, content: messageToSend }]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      // Get user data for context
      const userData = {
        profile: userDataManager.getUserProfile(),
        budgetData: userDataManager.getBudgetData(),
        goals: userDataManager.getGoals(),
        progress: userDataManager.getUserProgress(),
        budgetCategories: userDataManager.getBudgetCategories(),
        budgetEntries: userDataManager.getBudgetEntries(),
      }

      console.log("Sending request to AI advisor API...")

      const res = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageToSend,
          userData: userData,
          useOpenAI: useOpenAI,
        }),
      })

      console.log("Response status:", res.status)

      if (!res.ok) {
        const errorText = await res.text()
        console.error("API Error Response:", errorText)
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log("AI Response:", data)

      setLastResponseSource(data.source || "unknown")
      setMessages([...newMessages, { role: "assistant", content: data.response }])
    } catch (e) {
      console.error("AI Advisor Error:", e)
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. This might be due to a temporary service issue. Please try again in a moment, or explore the learning modules and budgeting tools while I get back online! 🔧",
        },
      ])
      setLastResponseSource("error")
    } finally {
      setLoading(false)
    }
  }

  const getSourceBadge = () => {
    switch (lastResponseSource) {
      case "openai":
        return (
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            OpenAI GPT-4
          </Badge>
        )
      case "intelligent_fallback":
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
            <Brain className="w-3 h-3 mr-1" />
            Smart AI
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-pink-500">
            ⚠️ Error
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Card with Gradient */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Financial Advisor
              </span>
            </CardTitle>
            <div className="flex items-center gap-3">
              {getSourceBadge()}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUseOpenAI(!useOpenAI)}
                className={`transition-all duration-200 ${
                  useOpenAI
                    ? "bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 text-green-700 hover:from-green-200 hover:to-emerald-200"
                    : "bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300 text-blue-700 hover:from-blue-200 hover:to-purple-200"
                }`}
              >
                <Settings className="w-3 h-3 mr-1" />
                {useOpenAI ? "OpenAI Mode" : "Smart AI Mode"}
              </Button>
            </div>
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-blue-500" />
            Get personalized financial advice based on your profile and goals
          </p>
        </CardHeader>
      </Card>

      {/* Quick Starters with Colorful Buttons */}
      <Card className="border-2 border-gray-200 bg-white">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              Quick Questions to Get Started:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickStarters.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`text-xs h-9 transition-all duration-200 border-2 ${question.color}`}
                  onClick={() => sendMessage(question.text)}
                  disabled={loading}
                >
                  <Zap className="w-3 h-3 mr-1" />
                  {question.text}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages with Enhanced Styling */}
      <Card className="border-2 border-gray-200">
        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto space-y-4 p-6 bg-gradient-to-b from-gray-50 to-white">
            {messages.slice(1).map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-4 rounded-2xl shadow-sm transition-all duration-200 ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-12"
                      : "bg-white border-2 border-gray-200 mr-12"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {msg.role === "assistant" && (
                      <div className="p-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {msg.role === "user" && (
                      <div className="p-1.5 bg-white/20 rounded-lg flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="text-sm whitespace-pre-wrap leading-relaxed flex-1">{msg.content}</div>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-gray-200 p-4 rounded-2xl shadow-sm mr-12 max-w-[85%]">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      <span className="text-sm text-gray-600">
                        {useOpenAI ? "OpenAI is thinking..." : "Smart AI is analyzing..."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Input Area with Enhanced Styling */}
      <Card className="border-2 border-gray-200 bg-white">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <input
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask about budgeting, investing, debt management, or any financial topic..."
              disabled={loading}
            />
            <Button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-6 transition-all duration-200"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span className="mr-2">Send</span>
                  <Zap className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          {/* Mode Indicator with Color */}
          <div className="text-xs text-center mt-3 p-2 rounded-lg bg-gray-100">
            <span className="text-gray-600">Currently using: </span>
            <span className={`font-semibold ${useOpenAI ? "text-green-600" : "text-blue-600"}`}>
              {useOpenAI ? "🤖 OpenAI GPT-4 with intelligent fallback" : "🧠 Smart AI system only"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
