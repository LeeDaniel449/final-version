"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  TrendingUp,
  Target,
  BookOpen,
  DollarSign,
  Award,
  Calendar,
  Users,
  Zap,
  Brain,
  PieChart,
  BarChart3,
  Wallet,
  Clock,
  Star,
  ArrowRight,
  Shield,
  Rocket,
  Heart,
  CreditCard,
} from "lucide-react"
import { userDataManager } from "@/lib/user-data"
import { AIAdvisor } from "@/components/ai-advisor"

export default function HomePage() {
  const [userProfile, setUserProfile] = useState(userDataManager.getUserProfile())
  const [userProgress, setUserProgress] = useState(userDataManager.getUserProgress())
  const [userGoals, setUserGoals] = useState(userDataManager.getGoals())
  const [budgetData, setBudgetData] = useState(userDataManager.getBudgetData())
  const [isSignedIn, setIsSignedIn] = useState(userDataManager.isUserSignedIn())

  useEffect(() => {
    // Refresh data when component mounts
    setUserProfile(userDataManager.getUserProfile())
    setUserProgress(userDataManager.getUserProgress())
    setUserGoals(userDataManager.getGoals())
    setBudgetData(userDataManager.getBudgetData())
    setIsSignedIn(userDataManager.isUserSignedIn())
  }, [])

  // Calculate some derived stats
  const totalSaved = budgetData.savings || 0
  const completionRate =
    userProgress.totalLessons > 0 ? (userProgress.completedLessons / userProgress.totalLessons) * 100 : 0
  const activeGoals = userGoals.filter((goal) => goal.status === "active")
  const completedGoals = userGoals.filter((goal) => goal.status === "completed")

  // Sample recent activities for demo
  const recentActivities = [
    {
      id: 1,
      type: "lesson",
      title: 'Completed "Introduction to Budgeting"',
      time: "2 hours ago",
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      id: 2,
      type: "goal",
      title: "Updated Emergency Fund goal",
      time: "1 day ago",
      icon: Target,
      color: "text-green-500",
    },
    {
      id: 3,
      type: "budget",
      title: "Added $500 to savings",
      time: "2 days ago",
      icon: DollarSign,
      color: "text-purple-500",
    },
    {
      id: 4,
      type: "achievement",
      title: 'Earned "Budgeting Basics" badge',
      time: "3 days ago",
      icon: Award,
      color: "text-yellow-500",
    },
  ]

  // Sample learning modules with colorful progress
  const learningModules = [
    {
      id: 1,
      title: "Budgeting Fundamentals",
      progress: 85,
      lessons: 8,
      color: "from-blue-500 to-cyan-500",
      icon: Wallet,
    },
    {
      id: 2,
      title: "Investment Basics",
      progress: 60,
      lessons: 12,
      color: "from-green-500 to-emerald-500",
      icon: TrendingUp,
    },
    { id: 3, title: "Debt Management", progress: 40, lessons: 6, color: "from-red-500 to-pink-500", icon: CreditCard },
    {
      id: 4,
      title: "Retirement Planning",
      progress: 20,
      lessons: 10,
      color: "from-purple-500 to-indigo-500",
      icon: Shield,
    },
  ]

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Welcome to WealthWise
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your AI-powered financial companion for smarter money management, investing, and achieving your
                financial dreams.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-8 py-3"
              >
                <Link href="/signup">
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-3 bg-transparent"
              >
                <Link href="/signin">
                  <Users className="w-5 h-5 mr-2" />
                  Sign In
                </Link>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-blue-900">AI Financial Advisor</CardTitle>
                <CardDescription className="text-blue-700">
                  Get personalized financial advice powered by advanced AI technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-green-900">Smart Budgeting</CardTitle>
                <CardDescription className="text-green-700">
                  Track expenses, set budgets, and optimize your spending with intelligent insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-purple-900">Goal Achievement</CardTitle>
                <CardDescription className="text-purple-700">
                  Set financial goals and track your progress with motivating milestones
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-orange-900">Financial Education</CardTitle>
                <CardDescription className="text-orange-700">
                  Learn through interactive lessons, quizzes, and real-world simulations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-pink-900">Investment Simulator</CardTitle>
                <CardDescription className="text-pink-700">
                  Practice investing with virtual money before risking real capital
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-teal-900">Rewards & Achievements</CardTitle>
                <CardDescription className="text-teal-700">
                  Earn points, unlock badges, and redeem rewards for your financial progress
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="border-2 border-gradient-to-r from-blue-200 to-purple-200 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
            <CardContent className="text-center py-12">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Ready to Transform Your Financial Future?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                  Join thousands of users who have already improved their financial health with WealthWise. Start your
                  journey today and see the difference AI-powered financial guidance can make.
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-12 py-4 text-lg"
              >
                <Link href="/signup">
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started Free
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {userProfile?.firstName || "Financial Explorer"}! 👋
              </h1>
              <p className="text-gray-600 text-lg mt-2">
                Here's your financial journey overview and personalized insights.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2">
                <Zap className="w-4 h-4 mr-1" />
                Level {userProgress.level}
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2">
                <Star className="w-4 h-4 mr-1" />
                {userProgress.xp} XP
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Lessons Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userProgress.completedLessons}</div>
              <p className="text-xs text-blue-200">of {userProgress.totalLessons} total lessons</p>
              <Progress value={completionRate} className="mt-2 bg-blue-400" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Active Goals</CardTitle>
              <Target className="h-4 w-4 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeGoals.length}</div>
              <p className="text-xs text-green-200">{completedGoals.length} completed this year</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Total Saved</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalSaved.toLocaleString()}</div>
              <p className="text-xs text-purple-200">Great progress this month!</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Current Streak</CardTitle>
              <Calendar className="h-4 w-4 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userProgress.currentStreak}</div>
              <p className="text-xs text-orange-200">days in a row! Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-gray-200">
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
              {/* Recent Activity */}
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-blue-700">Your latest financial actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-200"
                      >
                        <div className={`p-2 rounded-lg bg-gray-100`}>
                          <activity.icon className={`w-4 h-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <Zap className="w-5 h-5 text-green-600" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription className="text-green-700">Jump into your financial tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 h-auto py-4 flex-col"
                    >
                      <Link href="/budget">
                        <BarChart3 className="w-6 h-6 mb-2" />
                        <span className="text-sm">Budget Tracker</span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 h-auto py-4 flex-col"
                    >
                      <Link href="/goals">
                        <Target className="w-6 h-6 mb-2" />
                        <span className="text-sm">Set Goals</span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0 h-auto py-4 flex-col"
                    >
                      <Link href="/simulator">
                        <TrendingUp className="w-6 h-6 mb-2" />
                        <span className="text-sm">Invest Simulator</span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-0 h-auto py-4 flex-col"
                    >
                      <Link href="/learning">
                        <BookOpen className="w-6 h-6 mb-2" />
                        <span className="text-sm">Learn More</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  Learning Progress
                </CardTitle>
                <CardDescription className="text-green-700">Continue your financial education journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {learningModules.map((module) => (
                    <Card
                      key={module.id}
                      className="border-2 border-gray-200 bg-white hover:shadow-lg transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center`}
                          >
                            <module.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{module.title}</h3>
                            <p className="text-sm text-gray-600">{module.lessons} lessons</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-gray-900">{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                        <Button
                          asChild
                          className="w-full mt-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white border-0"
                        >
                          <Link href={`/learning/${module.id}`}>
                            Continue Learning
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Target className="w-5 h-5 text-purple-600" />
                  Financial Goals
                </CardTitle>
                <CardDescription className="text-purple-700">
                  Track your progress towards financial milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeGoals.length === 0 ? (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-purple-900 mb-2">No Active Goals</h3>
                    <p className="text-purple-700 mb-4">
                      Set your first financial goal to start tracking your progress!
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                    >
                      <Link href="/goals">
                        <Target className="w-4 h-4 mr-2" />
                        Create Your First Goal
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeGoals.slice(0, 3).map((goal) => {
                      const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0
                      return (
                        <Card key={goal.id} className="border border-purple-200 bg-white">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900">{goal.title}</h4>
                              <Badge
                                className={`${
                                  goal.priority === "high"
                                    ? "bg-red-100 text-red-800"
                                    : goal.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }`}
                              >
                                {goal.priority} priority
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                                </span>
                                <span className="font-medium text-gray-900">{progress.toFixed(1)}%</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                              <p className="text-xs text-gray-600">
                                Target date: {new Date(goal.deadline).toLocaleDateString()}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-2 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                    >
                      <Link href="/goals">
                        View All Goals
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                )}
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
