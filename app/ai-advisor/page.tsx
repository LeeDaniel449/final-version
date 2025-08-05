"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bot, Send, Loader2, TrendingUp, PiggyBank, Target, CreditCard, AlertCircle } from "lucide-react"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setLoading(true)
    setError(null)

    try {
      console.log("Sending message to AI advisor API...")
      console.log("Messages being sent:", newMessages)

      const response = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      })

      console.log("Response status:", response.status)
      console.log("Response headers:", response.headers)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API Error Response:", errorText)

        let errorMessage = `HTTP error! status: ${response.status}`
        try {
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.error || errorMessage
        } catch {
          // If we can't parse the error, use the status text
          errorMessage = `Server error: ${response.status} ${response.statusText}`
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log("AI Response received:", data)

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "I apologize, but I couldn't generate a response. Please try again.",
      }
      setMessages([...newMessages, assistantMessage])
    } catch (error) {
      console.error("AI Advisor Error:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")

      const errorMessage: Message = {
        role: "assistant",
        content: `I apologize, but I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}. 

Here are some general financial tips while I get back online:

📊 **Budget Basics:**
• Track all income and expenses
• Follow the 50/30/20 rule (needs/wants/savings)
• Build an emergency fund (3-6 months expenses)

💰 **Investment Fundamentals:**
• Start with low-cost index funds
• Diversify your portfolio
• Invest consistently over time
• Don't try to time the market

Please try asking your question again, or explore the other features of the app!`,
      }
      setMessages([...newMessages, errorMessage])
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
    { icon: Target, text: "Review my goals", color: "bg-purple-500" },
    { icon: CreditCard, text: "Debt payoff strategy", color: "bg-red-500" },
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
          Get personalized financial advice based on your budget, goals, and profile. Ask about budgeting, saving,
          investing, or debt management.
        </p>
      </div>

      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-red-900">Connection Error</h3>
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
              <CardDescription>Ask questions about your finances and get personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Welcome to your AI Financial Advisor!</p>
                      <p className="text-sm mt-2">
                        Ask me anything about budgeting, saving, investing, or debt management.
                      </p>
                      <p className="text-xs mt-2">Try one of the quick starters below or type your own question.</p>
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          msg.role === "user" ? "bg-primary text-primary-foreground ml-4" : "bg-muted mr-4"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg px-4 py-2 mr-4">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <p className="text-sm text-muted-foreground">Analyzing your financial situation...</p>
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
                  placeholder="Ask about budgeting, saving, investing..."
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
              <CardDescription>Try these common financial questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickStarters.map((starter, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3 bg-transparent"
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
            <CardContent className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium mb-1">📊 Budget Analysis</h4>
                <p className="text-muted-foreground">Review your income, expenses, and savings rate</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">💰 Investment Advice</h4>
                <p className="text-muted-foreground">Asset allocation based on your risk tolerance</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">🎯 Goal Planning</h4>
                <p className="text-muted-foreground">Strategies to reach your financial goals</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">💳 Debt Management</h4>
                <p className="text-muted-foreground">Payoff strategies and debt consolidation</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground">
                <strong>Disclaimer:</strong> This AI provides educational information only and should not be considered
                as professional financial advice. Always consult with a qualified financial advisor for personalized
                guidance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
