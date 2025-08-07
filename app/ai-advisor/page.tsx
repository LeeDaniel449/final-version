"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bot, Send, Loader2, TrendingUp, PiggyBank, Target, CreditCard } from "lucide-react"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: "You are a helpful financial advisor." },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setMessages([...newMessages, { role: "assistant", content: data.reply }])
    } catch (error) {
      console.error("AI Advisor Error:", error)
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ])
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
                  {messages.slice(1).map((msg, i) => (
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
                          <p className="text-sm text-muted-foreground">Thinking...</p>
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
