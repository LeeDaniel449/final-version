"use client"

import { MessageCircle, Brain, Zap, CheckCircle, TrendingUp, Shield, Target, DollarSign } from "lucide-react"
import AIChatComponent from "@/components/ai-chat"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Brain className="w-8 h-8 text-brand-blue" />
            <h1 className="text-3xl font-bold text-gray-900">AI Financial Advisor</h1>
            <Badge className="bg-green-100 text-green-800">
              <Zap className="w-3 h-3 mr-1" />
              Simple & Smart
            </Badge>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized financial advice in plain English. No jargon, no confusion - just clear answers to help you
            make better money decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <AIChatComponent />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why This AI is Different</CardTitle>
                <CardDescription>Designed to actually help, not confuse</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5">{feature.icon}</div>
                    <div>
                      <h4 className="font-medium text-sm">{feature.title}</h4>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Help Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Questions</CardTitle>
                <CardDescription>Not sure what to ask? Try these topics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {helpTopics.map((topic, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="text-brand-blue">{topic.icon}</div>
                      <h4 className="font-medium text-sm">{topic.title}</h4>
                    </div>
                    <div className="ml-6 space-y-1">
                      {topic.examples.map((example, exIndex) => (
                        <div key={exIndex} className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1">
                          "{example}"
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Be specific about your situation (age, income, goals)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Ask follow-up questions if something isn't clear</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Mention your risk tolerance and timeline</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Don't hesitate to ask "why" or "how"</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAdvisorPage
