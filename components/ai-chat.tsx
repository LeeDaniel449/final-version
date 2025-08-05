"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Lightbulb, TrendingUp, DollarSign, Target, Shield, Zap } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const AIChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your AI financial advisor. I'll help you make smart money decisions with simple, easy-to-understand advice. What would you like to know about?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickStarters = [
    {
      icon: <DollarSign className="w-4 h-4" />,
      text: "I have $1,000 to invest",
      message: "I have $1,000 to invest and I'm not sure where to start. What should I do?",
    },
    {
      icon: <Target className="w-4 h-4" />,
      text: "Help me set financial goals",
      message: "I want to set some financial goals but don't know what's realistic. Can you help?",
    },
    {
      icon: <Shield className="w-4 h-4" />,
      text: "Do I need an emergency fund?",
      message: "Everyone talks about emergency funds. Do I really need one and how much?",
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      text: "Explain investing basics",
      message: "I'm completely new to investing. Can you explain the basics in simple terms?",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setShowSuggestions(false)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          id: data.id,
          role: "assistant",
          content: data.content,
        },
      ])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Sorry, I'm having trouble responding right now. Could you try asking again?",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickStart = (message: string) => {
    setInput(message)
    setShowSuggestions(false)
    // Trigger form submission
    setTimeout(() => {
      const form = document.querySelector("form")
      if (form) {
        form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
      }
    }, 100)
  }

  return (
    <div className="max-w-4xl mx-auto h-[600px] flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-brand-blue" />
            AI Financial Advisor
            <Badge variant="outline" className="ml-auto">
              <Zap className="w-3 h-3 mr-1" />
              Smart & Simple
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            {messages.length === 1 && showSuggestions && (
              <div className="space-y-4 mb-6">
                <div className="text-center py-4">
                  <Bot className="w-12 h-12 text-brand-blue mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Hi! I'm your AI financial advisor</h3>
                  <p className="text-gray-600 mb-6">
                    I'll help you make smart money decisions with simple, easy-to-understand advice.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quickStarters.map((starter, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 text-left justify-start"
                      onClick={() => handleQuickStart(starter.message)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-brand-blue">{starter.icon}</div>
                        <span className="text-sm">{starter.text}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                <div className="text-center text-sm text-gray-500 mt-6">
                  Or ask me anything about money, investing, budgeting, or financial planning!
                </div>
              </div>
            )}

            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-brand-blue" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-brand-blue text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isLoading && (
              <div className="flex gap-3 justify-start mt-4">
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-brand-blue" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about money and investing..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-brand-blue hover:bg-brand-blue/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>

            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <Lightbulb className="w-3 h-3" />
              <span>Try asking: "Should I invest in index funds?" or "How much should I save?"</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AIChatComponent
