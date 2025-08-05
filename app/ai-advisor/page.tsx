"use client"

import { AIAdvisor } from "@/components/ai-advisor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Brain, Target, TrendingUp, Shield, Zap } from "lucide-react"

export default function AIAdvisorPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-green-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            AI Financial Advisor
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get personalized financial advice powered by OpenAI GPT-4. Ask questions about budgeting, investing, saving,
          and achieving your financial goals.
        </p>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Powered by OpenAI GPT-4
        </Badge>
      </div>

      {/* AI Advisor Component */}
      <AIAdvisor />

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <Card className="border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Brain className="h-5 w-5" />
              Smart Analysis
            </CardTitle>
            <CardDescription>
              Advanced AI analyzes your financial situation and provides personalized recommendations
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Target className="h-5 w-5" />
              Goal Planning
            </CardTitle>
            <CardDescription>
              Get help setting and achieving your financial goals with actionable strategies
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-purple-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <TrendingUp className="h-5 w-5" />
              Investment Guidance
            </CardTitle>
            <CardDescription>
              Learn about investment options and strategies tailored to your risk tolerance
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-orange-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Shield className="h-5 w-5" />
              Risk Assessment
            </CardTitle>
            <CardDescription>Understand and manage financial risks with expert AI guidance</CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-700">
              <Zap className="h-5 w-5" />
              Instant Answers
            </CardTitle>
            <CardDescription>Get immediate responses to your financial questions 24/7</CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-pink-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-700">
              <Sparkles className="h-5 w-5" />
              Personalized Advice
            </CardTitle>
            <CardDescription>Receive advice based on your specific financial profile and goals</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Popular Topics */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Popular Topics</CardTitle>
          <CardDescription className="text-green-700">
            Common questions our AI advisor can help you with
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-800">Budgeting & Saving</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Creating a monthly budget</li>
                <li>• Emergency fund planning</li>
                <li>• Reducing expenses</li>
                <li>• Saving strategies</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-800">Investing & Growth</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Investment basics</li>
                <li>• Portfolio diversification</li>
                <li>• Retirement planning</li>
                <li>• Risk management</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-800">Debt Management</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Debt payoff strategies</li>
                <li>• Credit score improvement</li>
                <li>• Loan consolidation</li>
                <li>• Interest rate optimization</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-800">Financial Goals</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Home buying preparation</li>
                <li>• Education funding</li>
                <li>• Vacation planning</li>
                <li>• Major purchase planning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
