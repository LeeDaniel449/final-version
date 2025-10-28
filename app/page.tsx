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
import {
  BookOpen,
  Target,
  DollarSign,
  CheckCircle,
  Calendar,
  Plus,
  LogIn,
  HelpCircle,
  X,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SubscriptionGuard } from "@/components/subscription-guard"

export default function HomePage() {
  const { isSignedIn, user, isLoaded } = useUser()
  const router = useRouter()

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

  const [showTutorial, setShowTutorial] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(0)

  const tutorialSteps = [
    {
      title: "Welcome to WealthWise! 👋",
      description:
        "Let's take a quick tour of your financial dashboard. This tutorial will show you all the key features to help you manage your money effectively.",
      highlight: null,
      action: null,
    },
    {
      title: "Your Stats Overview 📊",
      description:
        "These cards show your key metrics: lessons completed, active goals, total saved, and goals completed. Track your progress at a glance!",
      highlight: "stats-overview",
      action: null,
    },
    {
      title: "Personalized Notifications 🔔",
      description:
        "Get personalized updates based on your activity. We'll remind you about streaks, goal deadlines, and celebrate your achievements!",
      highlight: "notifications",
      action: null,
    },
    {
      title: "Your Financial Goals 🎯",
      description:
        "Set and track your savings goals here. Monitor your progress, see deadlines, and celebrate when you reach your targets!",
      highlight: "goals-section",
      action: null,
    },
    {
      title: "Learning Progress 📚",
      description:
        "Track your financial education journey. Complete lessons, earn XP, build streaks, and unlock achievements as you learn!",
      highlight: "learning-section",
      action: null,
    },
    {
      title: "Budget Tracker 💰",
      description:
        "Ready to manage your expenses? Click here to visit the Budget Tracker where you can create categories, track spending, and get AI-powered insights!",
      highlight: null,
      action: () => router.push("/budget"),
    },
    {
      title: "Goals & Planning 🎯",
      description:
        "Set financial goals and create action plans. Track your progress and stay motivated to achieve your dreams!",
      highlight: null,
      action: () => router.push("/goals"),
    },
    {
      title: "Learning Hub 🎓",
      description:
        "Explore our comprehensive financial literacy courses. Learn about budgeting, investing, saving, and more!",
      highlight: null,
      action: () => router.push("/learning"),
    },
    {
      title: "You're All Set! 🎉",
      description:
        "You now know your way around WealthWise! Start by completing a lesson, setting a goal, or tracking your first expense. Your financial journey begins now!",
      highlight: null,
      action: null,
    },
  ]

  const startTutorial = () => {
    setShowTutorial(true)
    setTutorialStep(0)
    localStorage.setItem("wealthwise_tutorial_completed", "false")
  }

  const nextTutorialStep = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      const currentStep = tutorialSteps[tutorialStep]
      if (currentStep.action) {
        currentStep.action()
        setShowTutorial(false)
        localStorage.setItem("wealthwise_tutorial_completed", "true")
      } else {
        setTutorialStep(tutorialStep + 1)
      }
    } else {
      setShowTutorial(false)
      localStorage.setItem("wealthwise_tutorial_completed", "true")
    }
  }

  const skipTutorial = () => {
    setShowTutorial(false)
    localStorage.setItem("wealthwise_tutorial_completed", "true")
  }

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
    <SubscriptionGuard>
      <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-brand-blue">
                Welcome back{user?.firstName ? `, ${user.firstName}` : ""}!
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Here's your financial overview</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
              <Button
                onClick={startTutorial}
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white bg-transparent w-full sm:w-auto"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                <span className="sm:inline">Start Tutorial</span>
              </Button>
              <div className="flex items-center gap-2 justify-between sm:justify-start">
                <NotificationBell />
                <Link href={isSignedIn ? "/settings" : "/sign-in"} className="flex-1 sm:flex-initial">
                  <Button
                    className={`w-full sm:w-auto ${
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
          </div>

          {/* Stats Overview */}
          <div id="stats-overview" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="border-brand-blue/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Lessons Completed</p>
                    <p className="text-2xl sm:text-3xl font-bold text-brand-blue">{completedLessons}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-brand-blue to-brand-purple rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-brand-purple/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Active Goals</p>
                    <p className="text-2xl sm:text-3xl font-bold text-brand-purple">{activeGoals.length}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-brand-purple to-brand-blue rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total Saved</p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-600">${totalSaved.toLocaleString()}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Goals Completed</p>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">{completedGoals.length}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personalized Notifications */}
          <Card id="notifications" className="border-brand-blue/20 shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-brand-blue text-lg sm:text-xl">
                {isSignedIn ? "Personalized for You" : "Get Started"}
              </CardTitle>
              <CardDescription className="text-sm">
                {isSignedIn
                  ? "Your personalized updates and recommendations"
                  : "Sign in to get personalized recommendations"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              {personalizedNotifications.map((notification, index) => (
                <Link key={index} href={notification.link || "#"}>
                  <Card
                    className={`bg-gradient-to-r ${notification.bgGradient} ${notification.borderColor} hover:shadow-md transition-shadow cursor-pointer`}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start sm:items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                            {notification.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{notification.description}</p>
                        </div>
                        <Badge variant="secondary" className={`${notification.badgeColor} text-xs whitespace-nowrap`}>
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
          <Card id="goals-section" className="border-brand-purple/20 shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-brand-purple text-lg sm:text-xl">Your Goals</CardTitle>
              <CardDescription className="text-sm">Track your financial objectives</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              {goals.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <Target className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">No goals set yet</p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    {!hasStartedBudgeting && (
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90 text-white w-full sm:w-auto">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Your First Budget
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-lg sm:text-xl">Add Your First Budget</DialogTitle>
                            <DialogDescription className="text-sm">
                              Start your financial journey by setting up your first budget category.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="category" className="text-sm">
                                Category
                              </Label>
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
                              <Label htmlFor="amount" className="text-sm">
                                Monthly Budget Amount
                              </Label>
                              <Input
                                id="amount"
                                type="number"
                                placeholder="Enter amount"
                                value={budgetAmount}
                                onChange={(e) => setBudgetAmount(e.target.value)}
                                className="text-base"
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
                    <Link href="/goals" className="w-full sm:w-auto">
                      <Button variant="outline" className="bg-transparent w-full">
                        <Target className="w-4 h-4 mr-2" />
                        Set Your First Goal
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {goals.slice(0, 3).map((goal) => {
                    const progress = (goal.currentAmount / goal.targetAmount) * 100
                    const isCompleted = goal.currentAmount >= goal.targetAmount
                    const daysUntilDue = Math.ceil(
                      (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                    )

                    return (
                      <div
                        key={goal.id}
                        className="p-3 sm:p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50"
                      >
                        <div className="flex items-start sm:items-center justify-between mb-2 gap-2">
                          <h3 className="font-semibold text-purple-800 text-sm sm:text-base flex-1 min-w-0 truncate">
                            {goal.title}
                          </h3>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge
                              variant={
                                goal.priority === "high"
                                  ? "destructive"
                                  : goal.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {goal.priority}
                            </Badge>
                            {isCompleted && <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-purple-600 mb-2 sm:mb-3 line-clamp-2">
                          {goal.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs sm:text-sm">
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
                      <Button variant="outline" className="w-full bg-transparent text-sm sm:text-base">
                        View All Goals ({goals.length})
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Learning Progress Summary */}
          <Card id="learning-section" className="border-brand-blue/20 shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-brand-blue text-lg sm:text-xl">Learning Progress Summary</CardTitle>
              <CardDescription className="text-sm">Your financial education journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm font-medium">Overall Progress</span>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {completedModulesCount} of {totalModules} modules
                  </span>
                </div>
                <Progress value={learningProgress} className="h-2 sm:h-3" />
                <p className="text-xs text-gray-500 mt-1">{learningProgress}% complete</p>
              </div>

              {completedLessonsDetails.length > 0 ? (
                <div>
                  <h4 className="font-medium mb-2 sm:mb-3 text-blue-800 text-sm sm:text-base">
                    Completed Lessons ({totalCompletedLessonsCount})
                  </h4>
                  <div className="space-y-2 sm:space-y-3 max-h-64 overflow-y-auto">
                    {completedLessonsDetails.map((detail) => (
                      <div key={detail.moduleId} className="p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-xs sm:text-sm text-blue-900 truncate flex-1 mr-2">
                            {detail.moduleTitle}
                          </span>
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
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
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm text-gray-600">No lessons completed yet</p>
                  <p className="text-xs text-gray-500 mt-1">Start learning to track your progress!</p>
                </div>
              )}

              {completedModulesCount > 0 && (
                <div>
                  <h4 className="font-medium mb-2 sm:mb-3 text-green-800 text-sm sm:text-base">Completed Modules</h4>
                  <div className="space-y-2">
                    {learningModules
                      .filter((module) => realCompletedModules.includes(module.id))
                      .slice(0, 3)
                      .map((module) => (
                        <div key={module.id} className="flex items-center gap-2 text-xs sm:text-sm">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                          <span className="truncate">{module.title}</span>
                        </div>
                      ))}
                    {completedModulesCount > 3 && (
                      <p className="text-xs sm:text-sm text-gray-600">+{completedModulesCount - 3} more modules</p>
                    )}
                  </div>
                </div>
              )}

              <Link href="/learning">
                <Button className="w-full bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white text-sm sm:text-base">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Continue Learning
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {showTutorial && (
          <>
            {/* Overlay with highlight */}
            <div className="fixed inset-0 bg-black/50 z-40" onClick={skipTutorial} />

            {/* Tutorial Dialog */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[95vw] sm:max-w-md px-4 sm:px-0">
              <Card className="shadow-2xl border-2 border-brand-blue">
                <CardHeader className="bg-gradient-to-r from-brand-blue to-brand-purple text-white p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg sm:text-xl">
                      Step {tutorialStep + 1} of {tutorialSteps.length}
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={skipTutorial} className="text-white hover:bg-white/20">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                      {tutorialSteps[tutorialStep].title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {tutorialSteps[tutorialStep].description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 sm:pt-4">
                    <div className="flex gap-1">
                      {tutorialSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-2 rounded-full ${index === tutorialStep ? "bg-brand-blue" : "bg-gray-300"}`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {tutorialStep > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => setTutorialStep(tutorialStep - 1)}
                          size="sm"
                          className="text-xs sm:text-sm"
                        >
                          Back
                        </Button>
                      )}
                      <Button
                        onClick={nextTutorialStep}
                        className="bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white text-xs sm:text-sm"
                        size="sm"
                      >
                        {tutorialStep === tutorialSteps.length - 1 ? (
                          "Finish"
                        ) : tutorialSteps[tutorialStep].action ? (
                          <>
                            Visit
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                          </>
                        ) : (
                          <>
                            Next
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Highlight specific sections */}
            {tutorialSteps[tutorialStep].highlight && (
              <style jsx global>{`
                #${tutorialSteps[tutorialStep].highlight} {
                  position: relative;
                  z-index: 45;
                  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 9999px rgba(0, 0, 0, 0.5);
                  border-radius: 0.5rem;
                }
              `}</style>
            )}
          </>
        )}
      </div>
    </SubscriptionGuard>
  )
}
