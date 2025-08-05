"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Target,
  TrendingUp,
  DollarSign,
  Award,
  ChevronRight,
  Users,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  BarChart3,
  Calculator,
  Brain,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import AIAdvisor from "@/components/ai-advisor"

// Mock data for demonstration
const userStats = {
  completedLessons: 12,
  totalLessons: 25,
  currentStreak: 5,
  pointsEarned: 2400,
  level: 3,
  savingsGoal: 25000,
  currentSavings: 15000,
  monthlyBudget: 4500,
  monthlySpent: 3200,
}

const recentLessons = [
  { id: 1, title: "Understanding Compound Interest", progress: 100, category: "Investing" },
  { id: 2, title: "Creating Your First Budget", progress: 100, category: "Budgeting" },
  { id: 3, title: "Emergency Fund Basics", progress: 75, category: "Saving" },
  { id: 4, title: "Introduction to Stock Market", progress: 30, category: "Investing" },
]

const financialGoals = [
  { id: 1, title: "Emergency Fund", current: 15000, target: 25000, deadline: "Dec 2024" },
  { id: 2, title: "Vacation Fund", current: 1200, target: 5000, deadline: "Aug 2024" },
  { id: 3, title: "New Car", current: 8000, target: 20000, deadline: "Jun 2025" },
]

const quickActions = [
  { title: "Track Expenses", icon: Calculator, href: "/budget", color: "bg-blue-500" },
  { title: "Set New Goal", icon: Target, href: "/goals", color: "bg-green-500" },
  { title: "Learn Investing", icon: TrendingUp, href: "/learning", color: "bg-purple-500" },
  { title: "View Portfolio", icon: BarChart3, href: "/portfolio", color: "bg-orange-500" },
]

export default function HomePage() {
  const [isSignedIn, setIsSignedIn] = useState(true) // Toggle this to see different views

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="flex items-center justify-center mb-8">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <DollarSign className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                Master Your Money,
                <br />
                Secure Your Future
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Learn financial literacy through interactive lessons, track your progress, and get personalized advice
                from our AI-powered financial advisor. Start your journey to financial freedom today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg"
                  asChild
                >
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg bg-transparent"
                  asChild
                >
                  <Link href="/signin">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
              <p className="text-xl text-gray-600">Comprehensive tools and resources for your financial journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Interactive Learning */}
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-blue-900">Interactive Learning</CardTitle>
                  <CardDescription className="text-blue-700">
                    Master financial concepts through engaging, bite-sized lessons designed for all skill levels.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      25+ comprehensive modules
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Progress tracking & certificates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Real-world examples & case studies
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* AI Financial Advisor */}
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-green-900">AI Financial Advisor</CardTitle>
                  <CardDescription className="text-green-700">
                    Get personalized financial advice 24/7 from our advanced AI powered by OpenAI GPT-4.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      Powered by OpenAI GPT-4
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Personalized recommendations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Available 24/7 for instant help
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Budget Tracking */}
              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-purple-900">Smart Budget Tracking</CardTitle>
                  <CardDescription className="text-purple-700">
                    Track expenses, set budgets, and visualize your spending patterns with intelligent insights.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-purple-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Automatic expense categorization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Visual spending analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Budget alerts & recommendations
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Goal Setting */}
              <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-orange-900">Goal Achievement</CardTitle>
                  <CardDescription className="text-orange-700">
                    Set financial goals, track progress, and get actionable steps to achieve your dreams.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-orange-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      SMART goal framework
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Progress visualization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Milestone celebrations
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Investment Simulator */}
              <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-red-900">Investment Simulator</CardTitle>
                  <CardDescription className="text-red-700">
                    Practice investing with virtual money and learn market dynamics risk-free.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Real market data simulation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Portfolio performance tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Risk-free learning environment
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Community */}
              <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-teal-900">Community Support</CardTitle>
                  <CardDescription className="text-teal-700">
                    Connect with like-minded individuals on their financial journey and share experiences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-teal-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Discussion forums
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Success story sharing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Peer support groups
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Financial Future?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who have already started their journey to financial freedom.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="/signup">
                Start Learning Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Signed-in user dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-gray-600 text-lg">Here's your financial progress overview</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {userStats.completedLessons}/{userStats.totalLessons}
              </div>
              <Progress
                value={(userStats.completedLessons / userStats.totalLessons) * 100}
                className="h-2 bg-blue-400"
              />
              <p className="text-xs opacity-75 mt-2">Lessons completed</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Savings Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">${userStats.currentSavings.toLocaleString()}</div>
              <Progress value={(userStats.currentSavings / userStats.savingsGoal) * 100} className="h-2 bg-green-400" />
              <p className="text-xs opacity-75 mt-2">of ${userStats.savingsGoal.toLocaleString()} goal</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{userStats.currentStreak} days</div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < userStats.currentStreak ? "text-yellow-300 fill-current" : "text-purple-300"}`}
                  />
                ))}
              </div>
              <p className="text-xs opacity-75 mt-2">Keep it up!</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Monthly Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">${userStats.monthlySpent.toLocaleString()}</div>
              <Progress
                value={(userStats.monthlySpent / userStats.monthlyBudget) * 100}
                className="h-2 bg-orange-400"
              />
              <p className="text-xs opacity-75 mt-2">of ${userStats.monthlyBudget.toLocaleString()} budget</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-gray-200 p-1 rounded-xl">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="learning"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              Learning
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              Goals
            </TabsTrigger>
            <TabsTrigger
              value="ai-advisor"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              AI Advisor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card className="border-2 border-gray-200 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-20 flex-col gap-2 border-2 hover:shadow-md transition-all duration-200 bg-transparent"
                        asChild
                      >
                        <Link href={action.href}>
                          <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                            <action.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium">{action.title}</span>
                        </Link>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-2 border-gray-200 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Completed "Compound Interest" lesson</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <DollarSign className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Added $500 to Emergency Fund</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <Target className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">Set new vacation savings goal</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Continue Learning */}
              <Card className="border-2 border-gray-200 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Continue Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentLessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{lesson.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {lesson.category}
                          </Badge>
                        </div>
                        <Progress value={lesson.progress} className="h-2 mb-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{lesson.progress}% complete</span>
                          <Button size="sm" variant="ghost" className="text-xs">
                            Continue <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Stats */}
              <Card className="border-2 border-gray-200 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Your Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">Level {userStats.level}</div>
                      <div className="text-sm text-yellow-700 mb-4">{userStats.pointsEarned} points earned</div>
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-gray-500 mt-2">750 points to next level</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Recent Badges</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">First Steps</Badge>
                        <Badge className="bg-green-100 text-green-800 border-green-200">Budget Master</Badge>
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">Goal Setter</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card className="border-2 border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  Financial Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financialGoals.map((goal) => (
                    <div key={goal.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{goal.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          Due {goal.deadline}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>${goal.current.toLocaleString()}</span>
                          <span>${goal.target.toLocaleString()}</span>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} className="h-3" />
                        <div className="text-xs text-gray-500 text-center">
                          {Math.round((goal.current / goal.target) * 100)}% complete
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    <Target className="w-4 h-4 mr-2" />
                    Add New Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-advisor" className="space-y-6">
            <AIAdvisor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
