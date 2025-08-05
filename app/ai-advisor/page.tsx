"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Brain, Sparkles, MessageCircle, Zap, TrendingUp, Target, DollarSign, BookOpen } from "lucide-react"
import { AIAdvisor } from "@/components/ai-advisor"

export default function AIAdvisorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Financial Advisor
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized financial guidance powered by advanced AI. Ask questions about budgeting, investing, debt
            management, and achieving your financial goals.
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg text-blue-900">Smart Analysis</CardTitle>
              <CardDescription className="text-blue-700">
                AI analyzes your financial data to provide personalized insights
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg text-green-900">24/7 Availability</CardTitle>
              <CardDescription className="text-green-700">
                Get financial advice anytime, anywhere with instant responses
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg text-purple-900">Dual AI Modes</CardTitle>
              <CardDescription className="text-purple-700">
                Choose between OpenAI GPT-4 or our Smart AI system
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg text-orange-900">Quick Starters</CardTitle>
              <CardDescription className="text-orange-700">
                Pre-built questions to get you started with common topics
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Popular Topics */}
        <Card className="border-2 border-gray-200 bg-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Popular Financial Topics
            </CardTitle>
            <CardDescription>
              Common areas where our AI advisor can help you make better financial decisions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Budgeting & Saving</h4>
                </div>
                <p className="text-sm text-blue-700">
                  Create budgets, track expenses, and optimize your savings strategy
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-900">Investment Planning</h4>
                </div>
                <p className="text-sm text-green-700">Learn about stocks, bonds, ETFs, and portfolio diversification</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-purple-900">Goal Setting</h4>
                </div>
                <p className="text-sm text-purple-700">
                  Set and achieve financial milestones like emergency funds and retirement
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-5 h-5 text-red-600 font-bold">💳</span>
                  <h4 className="font-semibold text-red-900">Debt Management</h4>
                </div>
                <p className="text-sm text-red-700">
                  Strategies for paying off credit cards, loans, and becoming debt-free
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-5 h-5 text-yellow-600 font-bold">🏠</span>
                  <h4 className="font-semibold text-yellow-900">Home Buying</h4>
                </div>
                <p className="text-sm text-yellow-700">Down payments, mortgages, and preparing for homeownership</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-5 h-5 text-teal-600 font-bold">🎓</span>
                  <h4 className="font-semibold text-teal-900">Retirement Planning</h4>
                </div>
                <p className="text-sm text-teal-700">401(k), IRA, and long-term retirement savings strategies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Advisor Component */}
        <AIAdvisor />

        {/* Disclaimer */}
        <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
                <span className="text-yellow-600 font-bold">⚠️</span>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">Important Disclaimer</h4>
                <p className="text-sm text-yellow-800 leading-relaxed">
                  The AI Financial Advisor provides educational information and general guidance only. This is not
                  personalized financial advice, and you should consult with qualified financial professionals before
                  making significant financial decisions. Always do your own research and consider your unique financial
                  situation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
