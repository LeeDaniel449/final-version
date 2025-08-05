"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Send, Bot, User, Lightbulb, TrendingUp, PiggyBank, Target, AlertCircle, Sparkles } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
  source?: "openai" | "error"
}

const quickStarters = [
  {
    icon: PiggyBank,
    title: "Budget Review",
    question: "Can you review my current budget and suggest improvements?",
    color: "bg-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Investment Advice",
    question: "What investment strategy would you recommend for someone my age?",
    color: "bg-green-500",
  },
  {
    icon: Target,
    title: "Goal Planning",
    question: "Help me create a plan to reach my financial goals faster.",
    color: "bg-purple-500",
  },
  {
    icon: Lightbulb,
    title: "Financial Health",
    question: "How is my overall financial health and what should I focus on?",
    color: "bg-orange-500",
  },
]

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI financial advisor powered by OpenAI GPT-4. I can help you with budgeting, investing, debt management, and achieving your financial goals. What would you like to discuss today?",
      timestamp: new Date(),
      source: "openai",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (messageContent?: string) => {
    const content = messageContent || input.trim()
    if (!content || isLoading) return

    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      console.log("🔄 Sending message to AI advisor...")

      const response = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ API Error Response:", errorText)
        throw new Error(`API Error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log("✅ AI response received:", data)

      if (!data.reply) {
        throw new Error("No reply received from AI advisor")
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
        source: data.source || "openai",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error: any) {
      console.error("❌ Error sending message:", error)
      setError(error.message || "Failed to get response from AI advisor")

      // Add error message to chat
      const errorMessage: Message = {
        role: "assistant",
        content:
          "I apologize, but I'm having trouble responding right now. Please make sure the OpenAI API is properly configured and try again.",
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
    sendMessage()
  }

  const getSourceIcon = (source?: string) => {
    switch (source) {
      case "openai":
        return <Sparkles className="w-3 h-3 text-green-500" />
      case "error":
        return <AlertCircle className="w-3 h-3 text-red-500" />
      default:
        return <Bot className="w-3 h-3 text-blue-500" />
    }
  }

  const getSourceLabel = (source?: string) => {
    switch (source) {
      case "openai":
        return "OpenAI GPT-4"
      case "error":
        return "Error"
      default:
        return "AI Assistant"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-8 h-8 text-green-500" />
            <h1 className="text-4xl font-bold text-gray-900">AI Financial Advisor</h1>
          </div>
          <p className="text-gray-600">Powered by OpenAI GPT-4 for personalized financial guidance</p>
        </div>

        {/* Quick Starters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Quick Starters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickStarters.map((starter, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 text-left justify-start bg-transparent"
                  onClick={() => sendMessage(starter.question)}
                  disabled={isLoading}
                >
                  <div
                    className={`w-8 h-8 rounded-full ${starter.color} flex items-center justify-center mr-3 flex-shrink-0`}
                  >
                    <starter.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">{starter.title}</div>
                    <div className="text-sm text-gray-500 mt-1">{starter.question}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-500" />
              Chat with OpenAI GPT-4
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/50">
                        <div className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</div>
                        {message.role === "assistant" && (
                          <div className="flex items-center gap-1">
                            {getSourceIcon(message.source)}
                            <span className="text-xs opacity-70">{getSourceLabel(message.source)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <span className="text-sm text-gray-600 ml-2">OpenAI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <Separator />

            {/* Input */}
            <div className="p-4">
              {error && (
                <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about budgeting, investing, debt management, or any financial topic..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <div className="mt-2 text-xs text-gray-500 text-center">
                Powered by OpenAI GPT-4 • This AI provides educational information, not professional financial advice.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <h3 className="font-semibold mb-1">OpenAI GPT-4</h3>
              <p className="text-sm text-gray-600">
                Advanced AI model providing sophisticated financial analysis and advice
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <h3 className="font-semibold mb-1">Personalized Insights</h3>
              <p className="text-sm text-gray-600">
                Get advice tailored to your specific financial situation and goals
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <h3 className="font-semibold mb-1">Goal-Oriented</h3>
              <p className="text-sm text-gray-600">Create actionable plans to achieve your financial objectives</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
