"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NotificationBell } from "@/components/notification-bell"
import { userDataManager, type UserProfile, type UserProgress, type Goal } from "@/lib/user-data"
import { learningModules } from "@/lib/learning-data"
import { BookOpen, Target, DollarSign, CheckCircle, TrendingUp, Calendar, Award, Zap, Plus, LogIn } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { isSignedIn, user, isLoaded } = useUser()

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [goals, setGoals] = useState<Goal[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [budgetAmount, setBudgetAmount] = useState("")
  const [realOverallProgress, setRealOverallProgress] = useState(0)
  const [realCompletedModules, setRealCompletedModules] = useState<string[]>([])
  const [completedLessonsDetails, setCompletedLessonsDetails] = useState<
    Array<{ moduleId: string; moduleTitle: string; completedLessons: number[]; totalLessons: number }>
  >([])
  const [totalCompletedLessonsCount, setTotalCompletedLessonsCount] = useState(0)

  useEffect(() => {
    if (isLoaded && user) {
      userDataManager.setClerkUserId(user.id)
      console.log("[v0] Clerk user loaded on dashboard:", user.id)
    } else if (isLoaded && !user) {
      userDataManager.setClerkUserId(null)
      console.log("[v0] No Clerk user on dashboard")
    }
  }, [user, isLoaded])

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn || !user) {
      console.log("[v0] User not signed in - showing zero data")
      setUserProfile(null)
      setUserProgress(null)
      setGoals([])
      setRealOverallProgress(0)
      setRealCompletedModules([])
      setCompletedLessonsDetails([])
      setTotalCompletedLessonsCount(0)
      return
    }

    const profile = userDataManager.getUserProfile()
    const progress = userDataManager.getUserProgress()
    const userGoals = userDataManager.getGoals()

    setUserProfile(profile)
    setUserProgress(progress)
    setGoals(userGoals)

    calculateRealLearningProgress(progress)
  }, [isLoaded, user, isSignedIn])

  const calculateRealLearningProgress = (progress: UserProgress) => {
    console.log("[v0] Calculating learning progress from module data (matching learning hub)...")

    let totalCompletedLessons = 0
    let totalLessons = 0
    let completedModulesCount = 0
    const completedModulesList: string[] = []
    const lessonsDetails: Array<{
      moduleId: string
      moduleTitle: string
      completedLessons: number[]
      totalLessons: number
    }> = []

    learningModules.forEach((module) => {
      const moduleProgress = userDataManager.getModuleLessonProgress(module.id)
      const completedLessons = moduleProgress.completedLessons.length

      totalCompletedLessons += completedLessons
      totalLessons += module.lessons

      // Track modules with any completed lessons
      if (completedLessons > 0) {
        lessonsDetails.push({
          moduleId: module.id,
          moduleTitle: module.title,
          completedLessons: moduleProgress.completedLessons,
          totalLessons: module.lessons,
        })
      }

      // A module is completed if all its lessons are completed
      if (completedLessons >= module.lessons) {
        completedModulesCount++
        completedModulesList.push(module.id)
      }
    })

    // Calculate overall progress percentage
    const overallProgress = totalLessons > 0 ? Math.round((totalCompletedLessons / totalLessons) * 100) : 0

    console.log("[v0] Dashboard progress calculation (matching learning hub):", {
      totalLessons,
      totalCompletedLessons,
      overallProgress,
      completedModulesCount,
      completedModules: completedModulesList,
      lessonsDetails,
    })

    setRealOverallProgress(overallProgress)
    setRealCompletedModules(completedModulesList)
    setCompletedLessonsDetails(lessonsDetails)
    setTotalCompletedLessonsCount(totalCompletedLessons)
  }

  const handleAddBudget = () => {
    if (selectedCategory && budgetAmount) {
      userDataManager.updateBudgetCategory(selectedCategory, {
        budgetAmount: Number.parseFloat(budgetAmount),
      })
      setIsDialogOpen(false)
      setSelectedCategory("")
      setBudgetAmount("")
      window.location.reload()
    }
  }

  const hasStartedBudgeting = userDataManager.hasStartedBudgeting()

  const completedModulesCount = isSignedIn ? realCompletedModules.length : 0
  const completedLessons = isSignedIn ? totalCompletedLessonsCount : 0
  const totalXP = isSignedIn ? (userProgress?.totalPoints ?? 0) : 0
  const currentStreak = isSignedIn ? (userProgress?.currentStreak ?? 0) : 0
  const achievementsCount = isSignedIn ? (userProgress?.achievements?.length ?? 0) : 0
  const totalModules = learningModules.length

  const activeGoals = isSignedIn ? goals.filter((g) => g.currentAmount < g.targetAmount) : []
  const completedGoals = isSignedIn ? goals.filter((g) => g.currentAmount >= g.targetAmount) : []
  const totalSaved = isSignedIn ? goals.reduce((sum, g) => sum + g.currentAmount, 0) : 0
  const learningProgress = isSignedIn ? realOverallProgress : 0

  const getPersonalizedNotifications = () => {
    const notifications: Array<{
      title: string
      description: string
      badge: string
      badgeColor: string
      bgGradient: string
      borderColor: string
      link?: string
    }> = []

    if (!isSignedIn) {
      return [
        {
          title: "Start Your Financial Journey",
          description: "Sign in to track your progress and set goals",
          badge: "Get Started",
          badgeColor: "bg-blue-100 text-blue-700",
          bgGradient: "from-blue-50 to-purple-50",
          borderColor: "border-blue-200",
          link: "/sign-in",
        },
      ]
    }

    // Learning streak notifications
    if (currentStreak === 0) {
      notifications.push({
        title: "Start Your Learning Streak",
        description: "Complete a lesson today to begin your streak!",
        badge: "Learning",
        badgeColor: "bg-blue-100 text-blue-700",
        bgGradient: "from-blue-50 to-purple-50",
        borderColor: "border-blue-200",
        link: "/learning",
      })
    } else if (currentStreak === 1) {
      notifications.push({
        title: "Keep Your Streak Alive! 🔥",
        description: "You're on a 1 day streak. Come back tomorrow to keep it going!",
        badge: "Streak",
        badgeColor: "bg-orange-100 text-orange-700",
        bgGradient: "from-orange-50 to-red-50",
        borderColor: "border-orange-200",
        link: "/learning",
      })
    } else if (currentStreak >= 7) {
      notifications.push({
        title: `Amazing ${currentStreak} Day Streak! 🎉`,
        description: "You're crushing it! Keep up the great work",
        badge: "On Fire",
        badgeColor: "bg-red-100 text-red-700",
        bgGradient: "from-red-50 to-orange-50",
        borderColor: "border-red-200",
        link: "/learning",
      })
    } else if (currentStreak > 1) {
      notifications.push({
        title: `${currentStreak} Day Streak! 🔥`,
        description: "Great consistency! Don't break your streak",
        badge: "Streak",
        badgeColor: "bg-orange-100 text-orange-700",
        bgGradient: "from-orange-50 to-yellow-50",
        borderColor: "border-orange-200",
        link: "/learning",
      })
    }

    // Goal-based notifications
    const urgentGoals = activeGoals.filter((goal) => {
      const daysUntilDue = Math.ceil(
        (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
      )
      return daysUntilDue > 0 && daysUntilDue <= 7
    })

    const almostCompleteGoals = activeGoals.filter((goal) => {
      const progress = (goal.currentAmount / goal.targetAmount) * 100
      return progress >= 80 && progress < 100
    })

    if (urgentGoals.length > 0) {
      const goal = urgentGoals[0]
      const daysUntilDue = Math.ceil(
        (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
      )
      notifications.push({
        title: `Goal Deadline Approaching! ⏰`,
        description: `"${goal.title}" is due in ${daysUntilDue} day${daysUntilDue > 1 ? "s" : ""}`,
        badge: "Urgent",
        badgeColor: "bg-red-100 text-red-700",
        bgGradient: "from-red-50 to-pink-50",
        borderColor: "border-red-200",
        link: "/goals",
      })
    } else if (almostCompleteGoals.length > 0) {
      const goal = almostCompleteGoals[0]
      const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100)
      notifications.push({
        title: "You're Almost There! 🎯",
        description: `"${goal.title}" is ${progress}% complete. Keep going!`,
        badge: "Progress",
        badgeColor: "bg-green-100 text-green-700",
        bgGradient: "from-green-50 to-emerald-50",
        borderColor: "border-green-200",
        link: "/goals",
      })
    } else if (completedGoals.length > 0) {
      const recentGoal = completedGoals[completedGoals.length - 1]
      notifications.push({
        title: "Goal Completed! 🎉",
        description: `Congratulations on completing "${recentGoal.title}"!`,
        badge: "Achievement",
        badgeColor: "bg-purple-100 text-purple-700",
        bgGradient: "from-purple-50 to-pink-50",
        borderColor: "border-purple-200",
        link: "/goals",
      })
    } else if (activeGoals.length === 0 && completedGoals.length === 0) {
      notifications.push({
        title: "Set Your First Goal",
        description: "Start your financial journey by setting a savings goal",
        badge: "Get Started",
        badgeColor: "bg-purple-100 text-purple-700",
        bgGradient: "from-purple-50 to-blue-50",
        borderColor: "border-purple-200",
        link: "/goals",
      })
    }

    // Budget notifications
    if (!hasStartedBudgeting) {
      notifications.push({
        title: "Start Tracking Your Expenses",
        description: "Create your first budget category to manage your money",
        badge: "Budget",
        badgeColor: "bg-green-100 text-green-700",
        bgGradient: "from-green-50 to-blue-50",
        borderColor: "border-green-200",
        link: "/budget",
      })
    }

    // Learning milestone notifications
    if (completedLessons === 10) {
      notifications.push({
        title: "10 Lessons Milestone! 🏆",
        description: "You've completed 10 lessons. Keep learning!",
        badge: "Milestone",
        badgeColor: "bg-yellow-100 text-yellow-700",
        bgGradient: "from-yellow-50 to-orange-50",
        borderColor: "border-yellow-200",
        link: "/learning",
      })
    } else if (completedLessons === 25) {
      notifications.push({
        title: "25 Lessons Milestone! 🌟",
        description: "Amazing progress! You're becoming a financial expert",
        badge: "Milestone",
        badgeColor: "bg-yellow-100 text-yellow-700",
        bgGradient: "from-yellow-50 to-orange-50",
        borderColor: "border-yellow-200",
        link: "/learning",
      })
    } else if (completedModulesCount > 0 && completedModulesCount === 1) {
      const completedModule = learningModules.find((m) => realCompletedModules.includes(m.id))
      if (completedModule) {
        notifications.push({
          title: "First Module Complete! 🎓",
          description: `You completed "${completedModule.title}". Great work!`,
          badge: "Achievement",
          badgeColor: "bg-blue-100 text-blue-700",
          bgGradient: "from-blue-50 to-indigo-50",
          borderColor: "border-blue-200",
          link: "/learning",
        })
      }
    }

    // If no notifications, show default recommendations
    if (notifications.length === 0) {
      return [
        {
          title: "Continue Your Learning",
          description: "Explore more financial literacy modules",
          badge: "Recommended",
          badgeColor: "bg-blue-100 text-blue-700",
          bgGradient: "from-blue-50 to-purple-50",
          borderColor: "border-blue-200",
          link: "/learning",
        },
        {
          title: "Review Your Budget",
          description: "Check your spending and adjust your budget",
          badge: "Budget",
          badgeColor: "bg-green-100 text-green-700",
          bgGradient: "from-green-50 to-blue-50",
          borderColor: "border-green-200",
          link: "/budget",
        },
        {
          title: "Track Your Goals",
          description: "Update your progress on your financial goals",
          badge: "Goals",
          badgeColor: "bg-purple-100 text-purple-700",
          bgGradient: "from-purple-50 to-pink-50",
          borderColor: "border-purple-200",
          link: "/goals",
        },
      ]
    }

    // Limit to top 3 most relevant notifications
    return notifications.slice(0, 3)
  }

  const personalizedNotifications = getPersonalizedNotifications()

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-brand-blue">
              Welcome back{user?.firstName ? `, ${user.firstName}` : ""}!
            </h1>
            <p className="text-gray-600 mt-2">Here's your financial overview</p>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <Link href={isSignedIn ? "/settings" : "/sign-in"}>
              <Button
                className={`${
                  isSignedIn
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90"
                } text-white shadow-lg`}
                disabled={isSignedIn}
              >
                {isSignedIn ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Signed In
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-brand-blue/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lessons Completed</p>
                  <p className="text-3xl font-bold text-brand-blue">{completedLessons}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-brand-blue to-brand-purple rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-purple/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Goals</p>
                  <p className="text-3xl font-bold text-brand-purple">{activeGoals.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-brand-purple to-brand-blue rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Saved</p>
                  <p className="text-3xl font-bold text-green-600">${totalSaved.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Goals Completed</p>
                  <p className="text-3xl font-bold text-blue-600">{completedGoals.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personalized Notifications */}
        <Card className="border-brand-blue/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-brand-blue">{isSignedIn ? "Personalized for You" : "Get Started"}</CardTitle>
            <CardDescription>
              {isSignedIn
                ? "Your personalized updates and recommendations"
                : "Sign in to get personalized recommendations"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {personalizedNotifications.map((notification, index) => (
              <Link key={index} href={notification.link || "#"}>
                <Card
                  className={`bg-gradient-to-r ${notification.bgGradient} ${notification.borderColor} hover:shadow-md transition-shadow cursor-pointer`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                        <p className="text-sm text-gray-600">{notification.description}</p>
                      </div>
                      <Badge variant="secondary" className={notification.badgeColor}>
                        {notification.badge}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Your Goals */}
        <Card className="border-brand-purple/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-brand-purple">Your Goals</CardTitle>
            <CardDescription>Track your financial objectives</CardDescription>
          </CardHeader>
          <CardContent>
            {goals.length === 0 ? (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No goals set yet</p>
                {!hasStartedBudgeting && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Budget
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Your First Budget</DialogTitle>
                        <DialogDescription>
                          Start your financial journey by setting up your first budget category.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Housing">Housing</SelectItem>
                              <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                              <SelectItem value="Transportation">Transportation</SelectItem>
                              <SelectItem value="Entertainment">Entertainment</SelectItem>
                              <SelectItem value="Utilities">Utilities</SelectItem>
                              <SelectItem value="Healthcare">Healthcare</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="amount">Monthly Budget Amount</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={budgetAmount}
                            onChange={(e) => setBudgetAmount(e.target.value)}
                          />
                        </div>
                        <Button
                          onClick={handleAddBudget}
                          className="w-full bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90"
                          disabled={!selectedCategory || !budgetAmount}
                        >
                          Add Budget
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <Link href="/goals">
                  <Button variant="outline" className="ml-2 bg-transparent">
                    <Target className="w-4 h-4 mr-2" />
                    Set Your First Goal
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {goals.slice(0, 3).map((goal) => {
                  const progress = (goal.currentAmount / goal.targetAmount) * 100
                  const isCompleted = goal.currentAmount >= goal.targetAmount
                  const daysUntilDue = Math.ceil(
                    (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                  )

                  return (
                    <div key={goal.id} className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-purple-800">{goal.title}</h3>
                        <div className="flex items-center gap-2">
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
                          {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
                        </div>
                      </div>
                      <p className="text-sm text-purple-600 mb-3">{goal.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>${goal.currentAmount.toLocaleString()}</span>
                          <span>${goal.targetAmount.toLocaleString()}</span>
                        </div>
                        <Progress value={Math.min(progress, 100)} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{Math.round(progress)}% complete</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{daysUntilDue > 0 ? `${daysUntilDue} days left` : "Overdue"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {goals.length > 3 && (
                  <Link href="/goals">
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Goals ({goals.length})
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Progress Summary */}
        <Card className="border-brand-blue/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-brand-blue">Learning Progress Summary</CardTitle>
            <CardDescription>Your financial education journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">
                  {completedModulesCount} of {totalModules} modules
                </span>
              </div>
              <Progress value={learningProgress} className="h-3" />
              <p className="text-xs text-gray-500 mt-1">{learningProgress}% complete</p>
            </div>

            {completedLessonsDetails.length > 0 ? (
              <div>
                <h4 className="font-medium mb-3 text-blue-800">Completed Lessons ({totalCompletedLessonsCount})</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {completedLessonsDetails.map((detail) => (
                    <div key={detail.moduleId} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm text-blue-900">{detail.moduleTitle}</span>
                        <Badge variant="secondary" className="text-xs">
                          {detail.completedLessons.length}/{detail.totalLessons}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {detail.completedLessons.map((lessonIndex) => (
                          <Badge key={lessonIndex} variant="outline" className="text-xs bg-white">
                            Lesson {lessonIndex + 1}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No lessons completed yet</p>
                <p className="text-xs text-gray-500 mt-1">Start learning to track your progress!</p>
              </div>
            )}

            {completedModulesCount > 0 && (
              <div>
                <h4 className="font-medium mb-3 text-green-800">Completed Modules</h4>
                <div className="space-y-2">
                  {learningModules
                    .filter((module) => realCompletedModules.includes(module.id))
                    .slice(0, 3)
                    .map((module) => (
                      <div key={module.id} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>{module.title}</span>
                      </div>
                    ))}
                  {completedModulesCount > 3 && (
                    <p className="text-sm text-gray-600">+{completedModulesCount - 3} more modules</p>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-lg font-bold text-yellow-600">{totalXP}</span>
                </div>
                <p className="text-xs text-gray-600">XP Earned</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-lg font-bold text-green-600">{currentStreak}</span>
                </div>
                <p className="text-xs text-gray-600">Day Streak</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Award className="w-4 h-4 text-purple-500" />
                  <span className="text-lg font-bold text-purple-600">{achievementsCount}</span>
                </div>
                <p className="text-xs text-gray-600">Achievements</p>
              </div>
            </div>

            <Link href="/learning?cache-bust=123">
              <Button className="w-full bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white">
                <BookOpen className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
