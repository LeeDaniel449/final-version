"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Bot,
  User,
  Lightbulb,
  TrendingUp,
  DollarSign,
  Target,
  Shield,
  Zap,
  PiggyBank,
  CreditCard,
} from "lucide-react"
import { userDataManager } from "@/lib/user-data"

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
        "Hi! I'm your AI financial advisor. I can analyze your personal budget, review your goals, and give you tailored advice on budgeting, saving, debt management, and investing. What would you like to know about?",
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

  // Get user data for context
  const userData = {
    profile: userDataManager.getUserProfile(),
    budgetData: userDataManager.getBudgetData(),
    goals: userDataManager.getGoals(),
    progress: userDataManager.getUserProgress(),
    budgetCategories: userDataManager.getBudgetCategories(),
    budgetEntries: userDataManager.getBudgetEntries(),
  }

  const hasUserData = !!(userData.budgetData.income || userData.goals.length || userData.profile.age)

  const quickStarters = [
    {
      icon: <DollarSign className="w-4 h-4" />,
      text: hasUserData ? "Analyze my budget" : "Help me create a budget",
      message: hasUserData
        ? "Can you analyze my current budget and spending patterns? What improvements can I make?"
        : "I want to create a budget but don't know where to start. Can you help me?",
    },
    {
      icon: <PiggyBank className="w-4 h-4" />,
      text: hasUserData ? "Review my savings strategy" : "How much should I save?",
      message: hasUserData
        ? "Based on my income and expenses, am I saving enough? What's my savings rate?"
        : "How much of my income should I be saving each month?",
    },
    {
      icon: <CreditCard className="w-4 h-4" />,
      text: "Help with debt strategy",
      message: "I have some debt. What's the best strategy to pay it off while still saving?",
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      text: hasUserData ? "Should I start investing?" : "Investment basics",
      message: hasUserData
        ? "Based on my financial situation, should I start investing? What's the best approach?"
        : "I'm new to investing. Can you explain the basics and how to get started?",
    },
    {
      icon: <Target className="w-4 h-4" />,
      text: hasUserData ? "Review my goals" : "Help me set financial goals",
      message: hasUserData
        ? "Can you help me review my financial goals and create a plan to achieve them?"
        : "I want to set some financial goals but don't know what's realistic. Can you help?",
    },
    {
      icon: <Shield className="w-4 h-4" />,
      text: hasUserData ? "Check my emergency fund" : "Do I need an emergency fund?",
      message: hasUserData
        ? "Do I have enough in my emergency fund? How does it compare to my expenses?"
        : "Everyone talks about emergency funds. Do I really need one and how much?",
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
          userData: userData,
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
              {hasUserData ? "Personalized" : "Smart & Simple"}
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
                    {hasUserData
                      ? "I can analyze your personal budget, review your goals, and give you tailored financial advice."
                      : "I can help with budgeting, saving, debt management, and investing. Add your financial data for personalized advice!"}
                  </p>

                  {hasUserData && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-green-800">
                        ✅ I can see your financial data and provide personalized recommendations!
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quickStarters.map((starter, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 text-left justify-start bg-transparent hover:bg-gray-50"
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
                  {hasUserData
                    ? "Ask me anything about your finances - I have access to your budget and goals!"
                    : "Or ask me anything about budgeting, saving, debt management, or investing!"}
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
                placeholder={
                  hasUserData
                    ? "Ask about your budget, goals, or get personalized advice..."
                    : "Ask about budgeting, saving, debt, investing, or personal finance..."
                }
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
              <span>
                {hasUserData
                  ? 'Try: "How\'s my budget looking?" or "Should I invest my savings?"'
                  : 'Try: "Should I pay off debt or invest?" or "How much should I save?"'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AIChatComponent
