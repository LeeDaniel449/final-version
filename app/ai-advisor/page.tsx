"use client"
import AIAdvisor from "@/components/ai-advisor"

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Financial Advisor</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized financial advice powered by AI. Ask questions about budgeting, investing, debt management,
            and goal planning to receive tailored recommendations based on your financial profile.
          </p>
        </div>

        <AIAdvisor />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">Budget Analysis</h3>
            <p className="text-sm text-gray-600">
              Get detailed insights into your spending patterns and recommendations for optimization.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">Investment Guidance</h3>
            <p className="text-sm text-gray-600">
              Receive personalized investment advice based on your age, risk tolerance, and goals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">Goal Planning</h3>
            <p className="text-sm text-gray-600">
              Create actionable plans to achieve your financial goals with specific timelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
