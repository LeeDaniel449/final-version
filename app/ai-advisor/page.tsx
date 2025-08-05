"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Sparkles } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      console.log("Sending message to AI advisor API...")

      const response = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      })

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API Error Response:", errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("AI Response received:", data)

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = { role: "assistant", content: data.reply }
      setMessages([...newMessages, assistantMessage])
    } catch (error) {
      console.error("AI Advisor Error:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again or ask a different question.",
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
    "Analyze my budget",
    "How should I invest?",
    "Review my financial goals",
    "Emergency fund advice",
  ]

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="h-6 w-6 text-blue-600" />
          <h1 className="text-3xl font-bold">AI Financial Advisor</h1>
          <Badge variant="secondary" className="ml-2">
            <Sparkles className="h-3 w-3 mr-1" />
            GPT-4 Powered
          </Badge>
        </div>
        <p className="text-gray-600">
          Get personalized financial advice based on your budget, goals, and profile data.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Chat with Your AI Advisor</CardTitle>
          <CardDescription>
            Ask questions about budgeting, saving, investing, debt management, and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 w-full border rounded-lg p-4 mb-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Start a conversation with your AI financial advisor!</p>
                <p className="text-sm mt-2">I can help with budgeting, investing, saving, and debt management.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className="flex-shrink-0">
                        {message.role === "user" ? (
                          <User className="h-6 w-6 text-blue-600" />
                        ) : (
                          <Bot className="h-6 w-6 text-green-600" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex gap-2">
                      <Bot className="h-6 w-6 text-green-600" />
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-gray-600 italic">Thinking...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {messages.length === 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Quick starters:</p>
              <div className="flex flex-wrap gap-2">
                {quickStarters.map((starter, index) => (
                  <Button key={index} variant="outline" size="sm" onClick={() => setInput(starter)} disabled={loading}>
                    {starter}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about budgeting, saving, investing..."
              disabled={loading}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={loading || !input.trim()}>
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What I Can Help With</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">📊 Budget Analysis</h4>
              <p className="text-sm text-gray-600">Review your income, expenses, and savings rate</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">💰 Investment Advice</h4>
              <p className="text-sm text-gray-600">Asset allocation based on your risk tolerance</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 Goal Planning</h4>
              <p className="text-sm text-gray-600">Track progress and optimize your financial goals</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">💳 Debt Strategy</h4>
              <p className="text-sm text-gray-600">Prioritize and manage your debt effectively</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          💡 This AI advisor uses your personal financial data to provide personalized advice. Always consult with a
          qualified financial professional for major decisions.
        </p>
      </div>
    </div>
  )
}
