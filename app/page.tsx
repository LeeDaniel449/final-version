"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { userDataManager } from "@/lib/user-data"
import { learningModules } from "@/lib/learning-data"
import AIAdvisor from "@/components/ai-advisor"
import Link from "next/link"
import {
  BookOpen,
  Target,
  TrendingUp,
  DollarSign,
  Award,
  Calendar,
  CheckCircle,
  ArrowRight,
  PiggyBank,
  BarChart3,
  Lightbulb,
  Users,
} from "lucide-react"

export default function HomePage() {
  const [userProfile, setUserProfile] = useState(userDataManager.getUserProfile())
  const [userProgress, setUserProgress] = useState(userDataManager.getUserProgress())
  const [goals, setGoals] = useState(userDataManager.getGoals())
  const [budgetData, setBudgetData] = useState(userDataManager.getBudgetData())
  const [hasStartedBudgeting, setHasStartedBudgeting] = useState(false)

  useEffect(() => {
    // Load user data on component mount
    setUserProfile(userDataManager.getUserProfile())
    setUserProgress(userDataManager.getUserProgress())
    setGoals(userDataManager.getGoals())
    setBudgetData(userDataManager.getBudgetData())
    setHasStartedBudgeting(userDataManager.hasStartedBudgeting())
  }, [])

  // Calculate stats
  const totalModules = learningModules.length
  const completedModules = userProgress.completedLessons
  const progressPercentage = (completedModules / totalModules) * 100

  const activeGoals = goals.filter((goal) => !goal.completed)
  const completedGoals = goals.filter((goal) => goal.completed)

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)

  const monthlyExpenses = Object.values(budgetData.expenses).reduce((sum, expense) => sum + expense, 0)
  const monthlyLeftover = budgetData.income - monthlyExpenses
  const savingsRate = budgetData.income > 0 ? ((monthlyLeftover / budgetData.income) * 100).toFixed(1) : "0"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {userProfile.firstName}! 👋</h1>
          <p className="text-lg text-gray-600">Continue your journey to financial literacy and independence</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lessons Completed</p>
                  <p className="text-2xl font-bold text-blue-600">{completedModules}</p>
                  <p className="text-xs text-gray-500">of {totalModules} modules</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Goals</p>
                  <p className="text-2xl font-bold text-green-600">{activeGoals.length}</p>
                  <p className="text-xs text-gray-500">in progress</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Saved</p>
                  <p className="text-2xl font-bold text-purple-600">${totalSaved.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">across all goals</p>
                </div>
                <PiggyBank className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Goals</p>
                  <p className="text-2xl font-bold text-orange-600">{completedGoals.length}</p>
                  <p className="text-xs text-gray-500">achievements</p>
                </div>
                <Award className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Progress */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-600">{progressPercentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{completedModules} completed</span>
                    <span>{totalModules - completedModules} remaining</span>
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">Current Streak: {userProgress.currentStreak} days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{userProgress.totalPoints} points</span>
                    </div>
                  </div>
                  <Link href="/learning">
                    <Button className="w-full mt-4">
                      Continue Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Active Goals */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Active Goals
                  </CardTitle>
                  <Link href="/goals">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {activeGoals.length > 0 ? (
                  <div className="space-y-4">
                    {activeGoals.slice(0, 3).map((goal) => {
                      const progress = (goal.currentAmount / goal.targetAmount) * 100
                      const daysLeft = Math.ceil(
                        (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                      )
                      return (
                        <div key={goal.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{goal.title}</h3>
                            <Badge
                              variant={
                                goal.priority === "high"
                                  ? "destructive"
                                  : goal.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {goal.priority}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>
                                ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                              </span>
                              <span>{progress.toFixed(0)}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                            <div className="flex items-center justify-between text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {daysLeft > 0 ? `${daysLeft} days left` : "Overdue"}
                              </span>
                              <span>{goal.category}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No active goals yet</p>
                    <Link href="/goals">
                      <Button>Set Your First Goal</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Budget Overview */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Budget Overview
                  </CardTitle>
                  <Link href="/budget">
                    <Button variant="outline" size="sm">
                      {hasStartedBudgeting ? "View Budget" : "Start Budgeting"}
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {hasStartedBudgeting ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Monthly Income</p>
                        <p className="text-xl font-bold text-green-600">${budgetData.income.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <p className="text-sm text-gray-600">Monthly Expenses</p>
                        <p className="text-xl font-bold text-red-600">${monthlyExpenses.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Monthly Leftover</p>
                      <p className={`text-xl font-bold ${monthlyLeftover >= 0 ? "text-blue-600" : "text-red-600"}`}>
                        ${monthlyLeftover.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Savings Rate: {savingsRate}%</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Start tracking your budget to get insights</p>
                    <Link href="/budget">
                      <Button>Create Budget</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Advisor */}
            <AIAdvisor />

            {/* Quick Actions */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/simulator" className="block">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Investment Simulator
                    </Button>
                  </Link>
                  <Link href="/goals" className="block">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Target className="mr-2 h-4 w-4" />
                      Set New Goal
                    </Button>
                  </Link>
                  <Link href="/budget" className="block">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Update Budget
                    </Button>
                  </Link>
                  <Link href="/learning" className="block">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userProgress.badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-yellow-600" />
                      <span className="text-sm font-medium">{badge}</span>
                    </div>
                  ))}
                  {userProgress.badges.length === 0 && (
                    <p className="text-gray-600 text-sm text-center py-4">Complete lessons to earn badges!</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Community */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-sm text-gray-600 mb-4">Connect with other learners and share your progress</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Join Community
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
