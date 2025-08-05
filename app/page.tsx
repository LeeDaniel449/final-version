"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Target,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  Award,
  Flame,
  Users,
  ArrowRight,
  PiggyBank,
  BarChart3,
} from "lucide-react"
import { userDataManager } from "@/lib/user-data"
import Link from "next/link"

interface DashboardStats {
  completedLessons: number
  activeGoals: number
  totalSaved: number
  completedGoals: number
  currentStreak: number
  totalPoints: number
}

export default function HomePage() {
  const [stats, setStats] = useState<DashboardStats>({
    completedLessons: 0,
    activeGoals: 0,
    totalSaved: 0,
    completedGoals: 0,
    currentStreak: 0,
    totalPoints: 0,
  })
  const [goals, setGoals] = useState<any[]>([])
  const [learningProgress, setLearningProgress] = useState(0)
  const [hasStartedBudgeting, setHasStartedBudgeting] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    // Load user data
    const loadDashboardData = () => {
      try {
        const userProgress = userDataManager.getUserProgress()
        const userGoals = userDataManager.getGoals()
        const budgetData = userDataManager.getBudgetData()
        const signedIn = userDataManager.isUserSignedIn()
        const budgetingStarted = userDataManager.hasStartedBudgeting()

        setStats({
          completedLessons: userProgress.completedLessons || 0,
          activeGoals: userGoals.filter((g) => g.status === "active").length,
          totalSaved: budgetData.savings || 0,
          completedGoals: userGoals.filter((g) => g.status === "completed").length,
          currentStreak: userProgress.currentStreak || 0,
          totalPoints: userProgress.totalXP || 0,
        })

        setGoals(userGoals.slice(0, 3)) // Show top 3 goals
        setLearningProgress(userDataManager.calculateOverallLearningProgress())
        setHasStartedBudgeting(budgetingStarted)
        setIsSignedIn(signedIn)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      }
    }

    loadDashboardData()

    // Listen for data updates
    const handleDataUpdate = () => loadDashboardData()
    window.addEventListener("userDataUpdated", handleDataUpdate)
    window.addEventListener("progressUpdated", handleDataUpdate)

    return () => {
      window.removeEventListener("userDataUpdated", handleDataUpdate)
      window.removeEventListener("progressUpdated", handleDataUpdate)
    }
  }, [])

  const quickActions = [
    {
      title: "Start Learning",
      description: "Continue your financial education",
      icon: BookOpen,
      href: "/learning",
      color: "bg-blue-500",
    },
    {
      title: "Track Budget",
      description: "Monitor your spending",
      icon: PiggyBank,
      href: "/budget",
      color: "bg-green-500",
    },
    {
      title: "Set Goals",
      description: "Plan your financial future",
      icon: Target,
      href: "/goals",
      color: "bg-purple-500",
    },
    {
      title: "AI Advisor",
      description: "Get personalized advice",
      icon: Users,
      href: "/ai-advisor",
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground">
            {isSignedIn ? "Here's your financial progress overview" : "Track your journey to financial literacy"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Flame className="h-3 w-3" />
            {stats.currentStreak} day streak
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Award className="h-3 w-3" />
            {stats.totalPoints} points
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedLessons}</div>
            <p className="text-xs text-muted-foreground">{learningProgress}% of total curriculum</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeGoals}</div>
            <p className="text-xs text-muted-foreground">{stats.completedGoals} completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSaved.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {hasStartedBudgeting ? "Budget tracking active" : "Start budgeting"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <p className="text-xs text-muted-foreground">days in a row</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Learning Progress */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Learning Progress
            </CardTitle>
            <CardDescription>Continue your financial education journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{learningProgress}%</span>
              </div>
              <Progress value={learningProgress} className="h-2" />
            </div>

            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  <div>
                    <p className="font-medium text-sm">Budgeting Basics</p>
                    <p className="text-xs text-muted-foreground">Foundation concepts</p>
                  </div>
                </div>
                <Badge variant="secondary">Completed</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                  <div>
                    <p className="font-medium text-sm">Investment Fundamentals</p>
                    <p className="text-xs text-muted-foreground">Building wealth</p>
                  </div>
                </div>
                <Badge variant="outline">In Progress</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg opacity-60">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-gray-300 rounded-full" />
                  <div>
                    <p className="font-medium text-sm">Advanced Strategies</p>
                    <p className="text-xs text-muted-foreground">Expert techniques</p>
                  </div>
                </div>
                <Badge variant="outline">Locked</Badge>
              </div>
            </div>

            <Button asChild className="w-full">
              <Link href="/learning">
                Continue Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Goals Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Financial Goals
            </CardTitle>
            <CardDescription>Track your progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.length > 0 ? (
              <>
                {goals.map((goal) => {
                  const progress = (goal.currentAmount / goal.targetAmount) * 100
                  const daysLeft = Math.ceil(
                    (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                  )

                  return (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{goal.title}</p>
                          <p className="text-xs text-muted-foreground">
                            ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                          </p>
                        </div>
                        <Badge variant={daysLeft > 30 ? "secondary" : "destructive"} className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {daysLeft > 0 ? `${daysLeft}d` : "Overdue"}
                        </Badge>
                      </div>
                      <Progress value={Math.min(progress, 100)} className="h-2" />
                      <p className="text-xs text-muted-foreground">{progress.toFixed(1)}% complete</p>
                    </div>
                  )
                })}
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/goals">
                    View All Goals
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </>
            ) : (
              <div className="text-center py-6">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  No goals set yet. Start planning your financial future!
                </p>
                <Button asChild>
                  <Link href="/goals">Set Your First Goal</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump into the most important financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                asChild
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
              >
                <Link href={action.href}>
                  <div className={`p-2 rounded-md ${action.color} text-white`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Completed "Emergency Fund Basics"</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Target className="h-4 w-4 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Updated goal: Emergency Fund</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <BarChart3 className="h-4 w-4 text-purple-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Added budget category: Entertainment</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
