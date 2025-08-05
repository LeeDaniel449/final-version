"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bot, Send, Loader2, TrendingUp, PiggyBank, Target, CreditCard, AlertCircle, CheckCircle } from "lucide-react"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
  timestamp?: string
  source?: string
}

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async () => {
    const trimmedInput = input.trim()
    if (!trimmedInput) return

    const userMessage: Message = {
      role: "user",
      content: trimmedInput,
      timestamp: new Date().toISOString(),
    }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setLoading(true)
    setError(null)

    try {
      console.log("🚀 Sending message to AI advisor API...")
      console.log("📤 Request payload:", { messages: newMessages })

      const response = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      })

      console.log("📡 Response status:", response.status)
      console.log("📡 Response headers:", Object.fromEntries(response.headers.entries()))

      // Always try to get the response text first
      const responseText = await response.text()
      console.log("📥 Raw response:", responseText.substring(0, 500) + "...")

      let data: any
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("❌ Failed to parse response JSON:", parseError)
        throw new Error(`Server returned invalid JSON. Status: ${response.status}`)
      }

      console.log("✅ Parsed response data:", data)

      // Handle both success and error responses
      if (data.reply) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.reply,
          timestamp: data.timestamp || new Date().toISOString(),
          source: data.source || "unknown",
        }
        setMessages([...newMessages, assistantMessage])

        // Clear any previous errors on successful response
        setError(null)
      } else if (data.error) {
        // API returned an error but with a helpful message
        const errorMessage: Message = {
          role: "assistant",
          content: data.reply || `I encountered an error: ${data.error}. Please try asking your question again.`,
          timestamp: new Date().toISOString(),
          source: "error",
        }
        setMessages([...newMessages, errorMessage])
        setError(data.error)
      } else {
        throw new Error("Invalid response format from server")
      }
    } catch (error) {
      console.error("💥 AI Advisor Error:", error)

      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      setError(errorMessage)

      const fallbackMessage: Message = {
        role: "assistant",
        content: `I apologize, but I encountered an error: ${errorMessage}

Here are some general financial tips while I get back online:

📊 **Financial Fundamentals:**
• **Emergency Fund:** Save 3-6 months of expenses in a high-yield savings account
• **Debt Strategy:** Pay off high-interest debt (credit cards) before investing
• **Savings Rate:** Aim to save 10-20% of your income
• **Investment Basics:** Start with low-cost index funds (VTI, VOO)

**Popular Questions I Can Help With:**
• "How should I prioritize my financial goals?"
• "What's the best debt payoff strategy?"
• "How much should I save for retirement?"
• "Should I invest or pay off debt first?"

Please try asking your question again, or explore the Budget and Goals features of the app!`,
        timestamp: new Date().toISOString(),
        source: "error_fallback",
      }
      setMessages([...newMessages, fallbackMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickStarters = [
    { icon: TrendingUp, text: "Analyze my budget", color: "bg-blue-500" },
    { icon: PiggyBank, text: "How much should I save?", color: "bg-green-500" },
    { icon: Target, text: "Review my financial goals", color: "bg-purple-500" },
    { icon: CreditCard, text: "Best debt payoff strategy", color: "bg-red-500" },
  ]

  const handleQuickStart = (text: string) => {
    setInput(text)
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Financial Advisor</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                GPT-4 Powered
              </Badge>
              <Badge variant="outline" className="text-xs">
                Personalized Advice
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground">
          Get expert financial advice on budgeting, saving, investing, and debt management. Ask me anything about
          personal finance!
        </p>
      </div>

      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium text-red-900">Connection Issue</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearError}
                  className="mt-2 border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Chat with Your AI Advisor</CardTitle>
              <CardDescription>Ask questions about your finances and get expert recommendations</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Welcome to your AI Financial Advisor!</p>
                      <p className="text-sm mt-2">
                        I'm here to help with budgeting, saving, investing, debt management, and more.
                      </p>
                      <p className="text-xs mt-2 opacity-75">
                        Try one of the quick starters below or ask me any financial question.
                      </p>
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] rounded-lg px-4 py-3 ${
                          msg.role === "user" ? "bg-primary text-primary-foreground ml-4" : "bg-muted mr-4"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {msg.role === "assistant" && (
                            <div className="flex-shrink-0 mt-0.5">
                              {msg.source === "openai" && <CheckCircle className="h-4 w-4 text-green-600" />}
                              {msg.source === "fallback" && <Bot className="h-4 w-4 text-blue-600" />}
                              {msg.source === "error" && <AlertCircle className="h-4 w-4 text-orange-600" />}
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                            {msg.timestamp && (
                              <p className="text-xs opacity-60 mt-2">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                                {msg.source && ` • ${msg.source}`}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg px-4 py-3 mr-4">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <p className="text-sm text-muted-foreground">Analyzing your financial question...</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <Separator />

              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about budgeting, saving, investing, debt management..."
                  className="flex-1"
                  disabled={loading}
                />
                <Button onClick={sendMessage} disabled={loading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Starters</CardTitle>
              <CardDescription>Try these popular financial questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickStarters.map((starter, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3 bg-transparent hover:bg-muted/50"
                  onClick={() => handleQuickStart(starter.text)}
                  disabled={loading}
                >
                  <div className={`p-1.5 rounded ${starter.color}`}>
                    <starter.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm">{starter.text}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What I Can Help With</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-1 flex items-center gap-2">📊 Budget Analysis</h4>
                <p className="text-muted-foreground">
                  Review spending patterns, optimize categories, and improve savings rate
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1 flex items-center gap-2">💰 Investment Guidance</h4>
                <p className="text-muted-foreground">Portfolio allocation, fund selection, and retirement planning</p>
              </div>
              <div>
                <h4 className="font-medium mb-1 flex items-center gap-2">🎯 Goal Planning</h4>
                <p className="text-muted-foreground">Create actionable plans to reach your financial objectives</p>
              </div>
              <div>
                <h4 className="font-medium mb-1 flex items-center gap-2">💳 Debt Management</h4>
                <p className="text-muted-foreground">
                  Payoff strategies, consolidation options, and debt prioritization
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground">
                <strong>Disclaimer:</strong> This AI provides educational information and should not be considered as
                professional financial advice. Always consult with a qualified financial advisor for major financial
                decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
