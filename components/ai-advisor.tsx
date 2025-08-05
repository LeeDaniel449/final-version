"use client"

import { useState } from "react"
import { userDataManager } from "@/lib/user-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Bot, User, Settings, Zap, Brain } from "lucide-react"

interface Message {
  role: "system" | "user" | "assistant"
  content: string
}

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: "You are a helpful financial advisor." },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [useOpenAI, setUseOpenAI] = useState(true)
  const [lastResponseSource, setLastResponseSource] = useState<string>("")

  // Quick starter questions
  const quickStarters = [
    "How should I prioritize my financial goals?",
    "What's the best way to invest my surplus money?",
    "Should I pay off debt or invest first?",
    "How can I improve my savings rate?",
    "Is my emergency fund adequate?",
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
          messages: newMessages,
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
      setMessages([...newMessages, { role: "assistant", content: data.reply }])
    } catch (e) {
      console.error("AI Advisor Error:", e)
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. This might be due to a temporary service issue. Please try again in a moment, or explore the learning modules and budgeting tools while I get back online!",
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
          <Badge variant="default" className="text-xs">
            <Bot className="w-3 h-3 mr-1" />
            OpenAI
          </Badge>
        )
      case "intelligent_fallback":
        return (
          <Badge variant="secondary" className="text-xs">
            <Brain className="w-3 h-3 mr-1" />
            Smart AI
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive" className="text-xs">
            Error
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            AI Financial Advisor
          </CardTitle>
          <div className="flex items-center gap-2">
            {getSourceBadge()}
            <Button variant="outline" size="sm" onClick={() => setUseOpenAI(!useOpenAI)} className="text-xs">
              <Settings className="w-3 h-3 mr-1" />
              {useOpenAI ? "OpenAI" : "Smart AI"}
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Get personalized financial advice based on your profile and goals
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Starters */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Quick Questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickStarters.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-8 bg-transparent"
                onClick={() => sendMessage(question)}
                disabled={loading}
              >
                <Zap className="w-3 h-3 mr-1" />
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-80 overflow-y-auto space-y-3 p-3 bg-muted/30 rounded-lg">
          {messages.slice(1).map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === "user" ? "bg-blue-600 text-white" : "bg-white border shadow-sm"
                }`}
              >
                <div className="flex items-start gap-2">
                  {msg.role === "assistant" && <Bot className="w-4 h-4 mt-0.5 text-blue-600" />}
                  {msg.role === "user" && <User className="w-4 h-4 mt-0.5" />}
                  <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border shadow-sm p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-blue-600" />
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Ask about budgeting, investing, debt management..."
            disabled={loading}
          />
          <Button onClick={() => sendMessage()} disabled={loading || !input.trim()} size="sm">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}
          </Button>
        </div>

        {/* Mode Indicator */}
        <div className="text-xs text-muted-foreground text-center">
          Currently using: {useOpenAI ? "OpenAI GPT-4 with intelligent fallback" : "Smart AI system only"}
        </div>
      </CardContent>
    </Card>
  )
}
