"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { userDataManager } from "@/lib/user-data"
import { learningModules } from "@/lib/learning-data"
import Link from "next/link"
import {
  BookOpen,
  Target,
  DollarSign,
  TrendingUp,
  Award,
  ArrowRight,
  PlusCircle,
  BarChart3,
  Lightbulb,
  CheckCircle2,
  Clock,
  Flame,
} from "lucide-react"

export default function HomePage() {
  const [userProgress, setUserProgress] = useState(userDataManager.getUserProgress())
  const [goals, setGoals] = useState(userDataManager.getGoals())
  const [budgetData, setBudgetData] = useState(userDataManager.getBudgetData())
  const [profile, setProfile] = useState(userDataManager.getUserProfile())
  const [hasStartedBudgeting, setHasStartedBudgeting] = useState(false)

  useEffect(() => {
    // Load initial data
    const loadData = () => {
      setUserProgress(userDataManager.getUserProgress())
      setGoals(userDataManager.getGoals())
      setBudgetData(userDataManager.getBudgetData())
      setProfile(userDataManager.getUserProfile())
      setHasStartedBudgeting(userDataManager.hasStartedBudgeting())
    }

    loadData()

    // Listen for data updates
    const handleDataUpdate = () => {
      loadData()
    }

    if (typeof window !== "undefined") {
      window.addEventListener("userDataUpdated", handleDataUpdate)
      window.addEventListener("progressUpdated", handleDataUpdate)
      window.addEventListener("userSignedIn", handleDataUpdate)

      return () => {
        window.removeEventListener("userDataUpdated", handleDataUpdate)
        window.removeEventListener("progressUpdated", handleDataUpdate)
        window.removeEventListener("userSignedIn", handleDataUpdate)
      }
    }
  }, [])

  // Calculate stats
  const completedModulesCount = userDataManager.getCompletedModulesCount()
  const overallProgress = userDataManager.calculateOverallLearningProgress()
  const activeGoals = goals.filter((goal) => goal.status === "active")
  const completedGoals = goals.filter((goal) => goal.status === "completed")
  const totalSaved = budgetData.savings || 0
  const totalExpenses = Object.values(budgetData.expenses || {}).reduce((sum, exp) => sum + exp, 0)
  const monthlyIncome = budgetData.income || 0
  const monthlyLeftover = monthlyIncome - totalExpenses

  // Get next learning module
  const nextModule = learningModules.find((module) => {
    const moduleProgress = userProgress.modules?.[module.id]
    return !moduleProgress?.completed
  })

  // Get recent achievements
  const recentAchievements = userProgress.achievements?.slice(-3) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back{profile.firstName ? `, ${profile.firstName}` : ""}! 👋
          </h1>
          <p className="text-gray-600">
            {userProgress.currentStreak > 0
              ? `You're on a ${userProgress.currentStreak}-day learning streak! Keep it up! 🔥`
              : "Ready to continue your financial journey?"}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Lessons Completed</p>
                  <p className="text-3xl font-bold">{userProgress.completedLessons || 0}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active Goals</p>
                  <p className="text-3xl font-bold">{activeGoals.length}</p>
                </div>
                <Target className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Saved</p>
                  <p className="text-3xl font-bold">${totalSaved.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Goals Completed</p>
                  <p className="text-3xl font-bold">{completedGoals.length}</p>
                </div>
                <Award className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{completedModulesCount}</div>
                    <div className="text-sm text-muted-foreground">Modules Completed</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                      <Flame className="w-5 h-5" />
                      {userProgress.currentStreak || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                </div>

                {nextModule && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Continue Learning</h4>
                        <p className="text-sm text-gray-600">{nextModule.title}</p>
                      </div>
                      <Link href={`/learning/${nextModule.id}`}>
                        <Button size="sm">
                          Continue <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Financial Goals */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    Financial Goals
                  </CardTitle>
                  <Link href="/goals">
                    <Button variant="outline" size="sm">
                      <PlusCircle className="w-4 h-4 mr-1" />
                      Add Goal
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
                        (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                      )

                      return (
                        <div key={goal.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{goal.title}</h4>
                            <Badge variant={daysLeft > 30 ? "default" : "destructive"}>
                              <Clock className="w-3 h-3 mr-1" />
                              {daysLeft > 0 ? `${daysLeft} days` : "Overdue"}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>${goal.currentAmount.toLocaleString()}</span>
                              <span>${goal.targetAmount.toLocaleString()}</span>
                            </div>
                            <Progress value={Math.min(progress, 100)} className="h-2" />
                            <div className="text-xs text-muted-foreground">{progress.toFixed(1)}% complete</div>
                          </div>
                        </div>
                      )
                    })}
                    {activeGoals.length > 3 && (
                      <Link href="/goals">
                        <Button variant="ghost" className="w-full">
                          View All Goals ({activeGoals.length})
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">No Goals Set</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Set financial goals to track your progress and stay motivated.
                    </p>
                    <Link href="/goals">
                      <Button>
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Create Your First Goal
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/learning" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                </Link>
                <Link href="/budget" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    {hasStartedBudgeting ? "Update Budget" : "Start Budgeting"}
                  </Button>
                </Link>
                <Link href="/simulator" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Investment Simulator
                  </Button>
                </Link>
                <Link href="/ai-advisor" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    AI Financial Advisor
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Financial Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Income</span>
                    <span className="font-medium">${monthlyIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Expenses</span>
                    <span className="font-medium">${totalExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Monthly Leftover</span>
                    <span className={`font-bold ${monthlyLeftover >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${monthlyLeftover.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Savings</span>
                    <span className="font-medium">${totalSaved.toLocaleString()}</span>
                  </div>
                </div>

                {!hasStartedBudgeting && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 mb-2">
                      Start tracking your budget to get personalized insights!
                    </p>
                    <Link href="/budget">
                      <Button size="sm" className="w-full">
                        Set Up Budget
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            {recentAchievements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                        <CheckCircle2 className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
