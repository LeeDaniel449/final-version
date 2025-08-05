"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIAdvisor } from "@/components/ai-advisor"
import { userDataManager } from "@/lib/user-data"
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Target,
  TrendingUp,
  DollarSign,
  PiggyBank,
  Sparkles,
  Star,
  Award,
  Zap,
  Brain,
  Users,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react"

export default function HomePage() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userProfile, setUserProfile] = useState(userDataManager.getUserProfile())
  const [userProgress, setUserProgress] = useState(userDataManager.getUserProgress())
  const [budgetData, setBudgetData] = useState(userDataManager.getBudgetData())
  const [goals, setGoals] = useState(userDataManager.getGoals())

  useEffect(() => {
    const checkSignInStatus = () => {
      const signedIn = userDataManager.isUserSignedIn()
      setIsSignedIn(signedIn)

      if (signedIn) {
        setUserProfile(userDataManager.getUserProfile())
        setUserProgress(userDataManager.getUserProgress())
        setBudgetData(userDataManager.getBudgetData())
        setGoals(userDataManager.getGoals())
      }
    }

    checkSignInStatus()

    // Listen for sign-in events
    const handleUserSignedIn = () => checkSignInStatus()
    const handleUserDataUpdated = () => checkSignInStatus()

    window.addEventListener("userSignedIn", handleUserSignedIn)
    window.addEventListener("userDataUpdated", handleUserDataUpdated)

    return () => {
      window.removeEventListener("userSignedIn", handleUserSignedIn)
      window.removeEventListener("userDataUpdated", handleUserDataUpdated)
    }
  }, [])

  // Calculate financial metrics
  const totalExpenses = Object.values(budgetData.expenses).reduce((sum, expense) => sum + expense, 0)
  const monthlyLeftover = budgetData.income - totalExpenses
  const savingsRate = budgetData.income > 0 ? (monthlyLeftover / budgetData.income) * 100 : 0
  const emergencyMonths = totalExpenses > 0 ? budgetData.savings / totalExpenses : 0

  // Calculate goal progress
  const totalGoalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalGoalCurrent = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const overallGoalProgress = totalGoalTarget > 0 ? (totalGoalCurrent / totalGoalTarget) * 100 : 0

  // Learning progress
  const learningProgress = userProgress.completedLessons > 0 ? (userProgress.completedLessons / 25) * 100 : 0

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-24">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI-Powered Financial Education
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Master Your
                  <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Financial Future
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                  Learn, budget, invest, and grow your wealth with personalized AI guidance and interactive tools
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-8 py-4 text-lg"
                  onClick={() => (window.location.href = "/signup")}
                >
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
                  onClick={() => (window.location.href = "/signin")}
                >
                  Sign In
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">10,000+</div>
                  <div className="text-blue-100">Students Learning</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">25+</div>
                  <div className="text-blue-100">Interactive Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">AI-Powered</div>
                  <div className="text-blue-100">Personal Advisor</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-bold text-gray-900">Everything You Need to Succeed</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive financial education with AI-powered tools and personalized guidance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Learning Hub */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-blue-900">Interactive Learning</CardTitle>
                  <CardDescription className="text-blue-700">
                    Master financial concepts through engaging lessons, quizzes, and real-world scenarios
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Budget Tracker */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200 bg-gradient-to-br from-green-50 to-green-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-green-900">Smart Budgeting</CardTitle>
                  <CardDescription className="text-green-700">
                    Track expenses, set budgets, and optimize your spending with intelligent insights
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Goal Planning */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-purple-900">Goal Achievement</CardTitle>
                  <CardDescription className="text-purple-700">
                    Set financial goals and get personalized strategies to achieve them faster
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* AI Advisor */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-orange-900">AI Financial Advisor</CardTitle>
                  <CardDescription className="text-orange-700">
                    Get instant, personalized financial advice powered by advanced AI technology
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Investment Guidance */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-indigo-900">Investment Education</CardTitle>
                  <CardDescription className="text-indigo-700">
                    Learn about stocks, bonds, ETFs, and build a diversified investment portfolio
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Community */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-pink-900">Community Support</CardTitle>
                  <CardDescription className="text-pink-700">
                    Connect with other learners, share experiences, and grow together
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl font-bold">Ready to Transform Your Financial Life?</h2>
              <p className="text-xl text-gray-300">
                Join thousands of students who are already building wealth and financial security
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 text-lg"
                onClick={() => (window.location.href = "/signup")}
              >
                Start Your Journey Today
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Signed-in user dashboard
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userProfile.firstName || "there"}! 👋</h1>
            <p className="text-blue-100 text-lg">Continue your financial journey and achieve your goals</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-300">
                <Award className="h-6 w-6" />
                <span className="font-semibold">Level {Math.floor(userProgress.totalXP / 1000) + 1}</span>
              </div>
              <div className="text-sm text-blue-100 mt-1">{userProgress.totalXP} XP earned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Monthly Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${budgetData.income.toLocaleString()}</div>
            <div className="text-xs text-blue-200 mt-1">${monthlyLeftover.toLocaleString()} remaining</div>
            <Progress value={Math.max(0, (monthlyLeftover / budgetData.income) * 100)} className="mt-2 bg-blue-400" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-100">Total Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${budgetData.savings.toLocaleString()}</div>
            <div className="text-xs text-green-200 mt-1">{emergencyMonths.toFixed(1)} months emergency fund</div>
            <Progress value={Math.min(100, (emergencyMonths / 6) * 100)} className="mt-2 bg-green-400" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Goal Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallGoalProgress.toFixed(0)}%</div>
            <div className="text-xs text-purple-200 mt-1">{goals.length} active goals</div>
            <Progress value={overallGoalProgress} className="mt-2 bg-purple-400" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{learningProgress.toFixed(0)}%</div>
            <div className="text-xs text-orange-200 mt-1">{userProgress.completedLessons} lessons completed</div>
            <Progress value={learningProgress} className="mt-2 bg-orange-400" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="learning"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
          >
            Learning
          </TabsTrigger>
          <TabsTrigger
            value="budget"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
          >
            Budget
          </TabsTrigger>
          <TabsTrigger
            value="ai-advisor"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
          >
            AI Advisor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">Completed Budget Basics</div>
                    <div className="text-sm text-gray-600">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Updated monthly budget</div>
                    <div className="text-sm text-gray-600">1 day ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Target className="h-5 w-5 text-purple-500" />
                  <div>
                    <div className="font-medium">Set new savings goal</div>
                    <div className="text-sm text-gray-600">3 days ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-between bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  onClick={() => (window.location.href = "/learning")}
                >
                  Continue Learning
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between hover:bg-green-50 border-green-200 bg-transparent"
                  onClick={() => (window.location.href = "/budget")}
                >
                  Update Budget
                  <Calculator className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between hover:bg-purple-50 border-purple-200 bg-transparent"
                  onClick={() => (window.location.href = "/goals")}
                >
                  Review Goals
                  <Target className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="learning">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Continue Your Learning Journey
              </CardTitle>
              <CardDescription>
                Master financial concepts with interactive lessons and real-world examples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ready to Learn More?</h3>
                <p className="text-gray-600 mb-4">
                  Explore our comprehensive learning modules designed to boost your financial knowledge
                </p>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  onClick={() => (window.location.href = "/learning")}
                >
                  Go to Learning Hub
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-green-500" />
                Budget Overview
              </CardTitle>
              <CardDescription>Track your income, expenses, and savings progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <PiggyBank className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Manage Your Budget</h3>
                <p className="text-gray-600 mb-4">Take control of your finances with our smart budgeting tools</p>
                <Button
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  onClick={() => (window.location.href = "/budget")}
                >
                  Open Budget Tracker
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-advisor">
          <AIAdvisor />
        </TabsContent>
      </Tabs>
    </div>
  )
}
