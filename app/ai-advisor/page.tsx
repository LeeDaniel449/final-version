"use client"

import { MessageCircle, Brain, Zap, CheckCircle, TrendingUp, Shield, Target, DollarSign } from "lucide-react"
import AIAdvisor from "@/components/ai-advisor"

const AIAdvisorPage = () => {
  const features = [
    {
      icon: <MessageCircle className="w-5 h-5 text-blue-600" />,
      title: "Natural Conversation",
      description: "Chat like you're talking to a friend, not a textbook",
    },
    {
      icon: <Brain className="w-5 h-5 text-purple-600" />,
      title: "Smart & Simple",
      description: "Complex financial concepts explained in plain English",
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-600" />,
      title: "Instant Answers",
      description: "Get personalized advice in seconds, not hours",
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: "Actionable Steps",
      description: "Clear next steps you can actually follow",
    },
  ]

  const helpTopics = [
    {
      icon: <DollarSign className="w-4 h-4" />,
      title: "Getting Started",
      examples: ["I have $500 to invest", "Where should I put my money?", "What's a good first investment?"],
    },
    {
      icon: <Target className="w-4 h-4" />,
      title: "Goal Setting",
      examples: ["I want to buy a house", "Planning for retirement", "Saving for vacation"],
    },
    {
      icon: <Shield className="w-4 h-4" />,
      title: "Risk & Safety",
      examples: ["How much emergency fund?", "Is this investment safe?", "What if I lose money?"],
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      title: "Growing Wealth",
      examples: ["Best index funds?", "Should I invest more?", "How to diversify?"],
    },
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Financial Advisor</h1>
          <p className="text-gray-600">Get personalized financial advice powered by AI</p>
        </div>

        <AIAdvisor />
      </div>
    </div>
  )
}

export default AIAdvisorPage
