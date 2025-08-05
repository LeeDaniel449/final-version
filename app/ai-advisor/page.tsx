"use client"
import { AIAdvisor } from "@/components/ai-advisor"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
  source?: "openai" | "fallback" | "error"
}

const quickStarters = [
  {
    icon: "PiggyBank",
    title: "Budget Review",
    question: "Can you review my current budget and suggest improvements?",
    color: "bg-blue-500",
  },
  {
    icon: "TrendingUp",
    title: "Investment Advice",
    question: "What investment strategy would you recommend for someone my age?",
    color: "bg-green-500",
  },
  {
    icon: "Target",
    title: "Goal Planning",
    question: "Help me create a plan to reach my financial goals faster.",
    color: "bg-purple-500",
  },
  {
    icon: "Lightbulb",
    title: "Financial Health",
    question: "How is my overall financial health and what should I focus on?",
    color: "bg-orange-500",
  },
]

export default function AIAdvisorPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Financial Advisor</h1>
        <p className="text-muted-foreground">Get personalized financial advice powered by AI and your financial data</p>
      </div>
      <AIAdvisor />
    </div>
  )
}
