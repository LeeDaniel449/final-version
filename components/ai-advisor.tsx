"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Send, User, Bot, Lightbulb } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  source?: string
}

const quickStarters = [
  "How should I allocate my investment portfolio?",
  "What's the best way to pay off my debt?",
  "How much should I save for an emergency fund?",
  "Should I invest in index funds or individual stocks?",
  "How can I improve my credit score?",
  "What's a good budgeting strategy for beginners?",
]

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: messageContent }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
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

      const data = await response.json()

      if (data.reply) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.reply,
          source: data.source || "openai",
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        throw new Error("No reply received")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        source: "error",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleQuickStart = (question: string) => {
    sendMessage(question)
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 p-6 border-b bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="p-2 bg-green-100 rounded-lg">
          <Sparkles className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Financial Advisor</h1>
          <p className="text-sm text-gray-600">Powered by OpenAI GPT-4</p>
        </div>
      </div>

      {/* Quick Starters */}
      {messages.length === 0 && (
        <div className="p-6 border-b bg-gray-50">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold text-gray-900">Quick Starters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {quickStarters.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start text-left h-auto p-3 hover:bg-green-50 hover:border-green-200 bg-transparent"
                onClick={() => handleQuickStart(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Bot className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 mb-2">
                      Hello! I'm your AI financial advisor, powered by OpenAI GPT-4. I'm here to help you with:
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>• Personalized investment advice</li>
                      <li>• Budget planning and optimization</li>
                      <li>• Debt management strategies</li>
                      <li>• Savings and emergency fund planning</li>
                      <li>• Financial goal setting</li>
                    </ul>
                    <p className="text-sm text-gray-600 mt-3">
                      Ask me anything about your finances, and I'll provide personalized advice based on your profile!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "assistant" && (
                <div className="p-2 bg-green-100 rounded-full">
                  <Bot className="h-5 w-5 text-green-600" />
                </div>
              )}

              <Card
                className={`max-w-[80%] ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : message.source === "error"
                      ? "bg-red-50 border-red-200"
                      : "bg-white border-green-200"
                }`}
              >
                <CardContent className="p-4">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                  {message.role === "assistant" && message.source && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                      <Badge
                        variant={message.source === "openai" ? "default" : "secondary"}
                        className={message.source === "openai" ? "bg-green-100 text-green-800" : ""}
                      >
                        {message.source === "openai"
                          ? "🤖 OpenAI GPT-4"
                          : message.source === "error"
                            ? "⚠️ Error"
                            : "💡 Fallback"}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {message.role === "user" && (
                <div className="p-2 bg-blue-100 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="p-2 bg-green-100 rounded-full">
                <Bot className="h-5 w-5 text-green-600" />
              </div>
              <Card className="bg-white border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-500 border-t-transparent"></div>
                    OpenAI is thinking...
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-6 border-t bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about your finances..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="bg-green-600 hover:bg-green-700">
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Powered by OpenAI GPT-4 • This is educational information, not professional financial advice
        </p>
      </div>
    </div>
  )
}
