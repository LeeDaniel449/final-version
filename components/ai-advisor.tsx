"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Send, Bot, User, Sparkles, Brain, AlertCircle } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  source?: "openai" | "smart_ai" | "error"
}

const quickStarters = [
  "How's my budget looking?",
  "Should I invest my savings?",
  "Help me plan for retirement",
  "How can I pay off debt faster?",
  "What are good financial goals?",
  "Am I saving enough money?",
]

export function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your AI financial advisor. I can help you with budgeting, investing, debt management, and achieving your financial goals. What would you like to discuss today?",
      sender: "ai",
      timestamp: new Date(),
      source: "smart_ai",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [useOpenAI, setUseOpenAI] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          useOpenAI,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "ai",
        timestamp: new Date(),
        source: data.source,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I apologize, but I'm having trouble connecting right now. Please check your internet connection and try again.",
        sender: "ai",
        timestamp: new Date(),
        source: "error",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputMessage)
  }

  const handleQuickStart = (question: string) => {
    sendMessage(question)
  }

  const getSourceBadge = (source?: string) => {
    switch (source) {
      case "openai":
        return (
          <Badge variant="default" className="ml-2 bg-green-100 text-green-800 border-green-200">
            🤖 OpenAI
          </Badge>
        )
      case "smart_ai":
        return (
          <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
            🧠 Smart AI
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive" className="ml-2">
            ❌ Error
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto">
      {/* Header with AI Mode Toggle */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Financial Advisor
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="ai-mode" className="text-sm font-medium">
                {useOpenAI ? "OpenAI Mode" : "Smart AI Mode"}
              </Label>
              <Switch id="ai-mode" checked={useOpenAI} onCheckedChange={setUseOpenAI} />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Starters */}
      <Card className="mb-4">
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground mb-2 w-full">Quick starters:</span>
            {quickStarters.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickStart(question)}
                disabled={isLoading}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === "ai" && (
                    <div className="flex-shrink-0 mt-1">
                      {message.source === "error" ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : message.source === "openai" ? (
                        <Sparkles className="h-4 w-4 text-green-600" />
                      ) : (
                        <Brain className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  )}
                  {message.sender === "user" && <User className="h-4 w-4 flex-shrink-0 mt-1" />}
                  <div className="flex-1">
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</div>
                      {message.sender === "ai" && getSourceBadge(message.source)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <div className="animate-spin">
                    {useOpenAI ? <Sparkles className="h-4 w-4" /> : <Brain className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">{useOpenAI ? "OpenAI is thinking..." : "Smart AI is analyzing..."}</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me about your finances..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
