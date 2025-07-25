"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Target,
  Zap,
  Lock,
  CheckCircle,
  PlayCircle,
  UserPlus,
  LogIn,
  Brain,
  Lightbulb,
  Award,
  Star,
} from "lucide-react"
import { learningModules } from "@/lib/learning-data"
import { userDataManager } from "@/lib/user-data"

// Fallback icon in case a module icon is missing or invalid
const DefaultLearningIcon = BookOpen

export default function LearningDashboard() {
  const [userProgress, setUserProgress] = useState({
    completedLessons: 0,
    daysActive: 0,
    lastActiveDate: "",
    modules: {} as Record<string, any>,
    hasStartedBudgeting: false,
    totalMoneyTracked: 0,
  })
  const [isUserSignedUp, setIsUserSignedUp] = useState(false)
  const [hasStartedBudgeting, setHasStartedBudgeting] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const refreshData = () => {
    console.log("🔄 Refreshing learning dashboard data")
    const signedUp = userDataManager.isUserSignedUp()
    const budgetingStarted = userDataManager.hasStartedBudgeting()
    setIsUserSignedUp(signedUp)
    setHasStartedBudgeting(budgetingStarted)

    // Always load progress data regardless of signup/budget status
    const progress = userDataManager.getUserProgress()
    console.log("📊 User progress data loaded:", progress)
    setUserProgress({ ...progress })

    // Force immediate re-render with updated data
    setRefreshTrigger(Date.now())
  }

  useEffect(() => {
    // Initial data load
    refreshData()

    // Listen for progress updates
    const handleProgressUpdate = (event) => {
      console.log("🔔 Progress update event received", event.detail)
      refreshData()
    }

    // Listen for lesson completion events
    const handleLessonCompleted = (event) => {
      console.log("🎓 Lesson completed event received", event.detail)
      setTimeout(refreshData, 100) // Small delay to ensure data is saved
    }

    // Listen for custom progress events
    window.addEventListener("progressUpdated", handleProgressUpdate)
    window.addEventListener("lessonCompleted", handleLessonCompleted)

    // Refresh data every 1 second for real-time updates
    const interval = setInterval(refreshData, 1000)

    // Add event listeners for various events that might indicate data changes
    const handleStorageChange = (e) => {
      if (e.key?.includes("wealthwise")) {
        console.log("💾 Storage changed, refreshing data")
        setTimeout(refreshData, 50)
      }
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("👁️ Page became visible, refreshing data")
        refreshData()
      }
    }

    const handleFocus = () => {
      console.log("🎯 Window focused, refreshing data")
      refreshData()
    }

    window.addEventListener("storage", handleStorageChange)
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("focus", handleFocus)

    return () => {
      clearInterval(interval)
      window.removeEventListener("progressUpdated", handleProgressUpdate)
      window.removeEventListener("lessonCompleted", handleLessonCompleted)
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("focus", handleFocus)
    }
  }, [])

  const calculateOverallProgress = () => {
    const progress = userDataManager.calculateOverallLearningProgress()
    console.log("📊 Overall progress calculated:", progress)
    return progress
  }

  const getModuleProgress = (moduleId: string) => {
    try {
      const progress = userDataManager.getUserProgress()
      const moduleProgress = progress.modules?.[moduleId]

      if (!moduleProgress) {
        return 0
      }

      const module = learningModules.find((m) => m.id === moduleId)
      if (!module) {
        return 0
      }

      const totalLessons = module.lessons
      const completedLessons = moduleProgress.completedLessons?.length || 0
      const progressPercent = Math.round((completedLessons / totalLessons) * 100)

      console.log(`📊 Module ${moduleId} progress: ${completedLessons}/${totalLessons} = ${progressPercent}%`)
      return progressPercent
    } catch (error) {
      console.error(`❌ Error calculating progress for module ${moduleId}:`, error)
      return 0
    }
  }

  const getCompletedModulesCount = () => {
    const count = userDataManager.getCompletedModulesCount()
    console.log("🏆 Completed modules count:", count)
    return count
  }

  const overallProgress = calculateOverallProgress()
  const completedModules = getCompletedModulesCount()

  // Show the learning dashboard for all signed up users
  if (!isUserSignedUp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-8 h-8 text-blue-600" />
                Financial Learning Center
              </h1>
              <p className="text-gray-600">Build your financial knowledge with interactive lessons</p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/signin">
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign In
                </Link>
              </Button>
              <Badge className="bg-gray-100 text-gray-500 border-gray-200">
                <Lock className="w-3 h-3 mr-1" />
                Locked
              </Badge>
            </div>
          </div>

          {/* Empty Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-gray-300 to-gray-400 text-white opacity-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-100">Overall Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0%</div>
                <Progress value={0} className="mt-2 bg-gray-400" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-300 to-gray-400 text-white opacity-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-100">Completed Lessons</CardTitle>
                <CheckCircle className="h-4 w-4 text-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-gray-200">
                  of {learningModules.reduce((sum, m) => sum + m.lessons, 0)} lessons
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-300 to-gray-400 text-white opacity-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-100">Modules Completed</CardTitle>
                <Trophy className="h-4 w-4 text-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-gray-200">of {learningModules.length} modules</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-300 to-gray-400 text-white opacity-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-100">Learning Streak</CardTitle>
                <Zap className="h-4 w-4 text-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-gray-200">days active</p>
              </CardContent>
            </Card>
          </div>

          {/* Signup Prompt */}
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <UserPlus className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Sign Up to Start Learning</h3>
              <p className="text-blue-800 mb-6 max-w-md mx-auto">
                Create your free account to access interactive financial lessons, track your progress, and earn
                achievements.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/signup">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up Free
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  <Link href="/signin">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview of Learning Modules (disabled) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
            {learningModules.slice(0, 6).map((module) => {
              const IconComponent = module.icon && typeof module.icon === "function" ? module.icon : DefaultLearningIcon
              const displayDuration = module.duration ?? "—"
              return (
                <Card key={module.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <IconComponent className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <CardTitle className="text-base text-gray-400">{module.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-gray-100 text-gray-400 border-gray-200">{module.difficulty}</Badge>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {displayDuration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 mb-4">{module.description}</CardDescription>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Progress</span>
                        <span>0%</span>
                      </div>
                      <Progress value={0} className="bg-gray-200" />
                      <p className="text-xs text-gray-400">0 of {module.lessons} lessons completed</p>
                    </div>
                    <Button disabled className="w-full mt-4 bg-gray-200 text-gray-400 cursor-not-allowed">
                      <Lock className="w-4 h-4 mr-2" />
                      Sign Up to Access
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Remove the budget setup prompt condition and go straight to the main dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6" key={refreshTrigger}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              Financial Learning Center
            </h1>
            <p className="text-gray-600">Build your financial knowledge with interactive lessons</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Zap className="w-3 h-3 mr-1" />
              Active Learning
            </Badge>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Overall Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress}%</div>
              <div className="relative w-full h-2 bg-blue-300 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Completed Lessons</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.values(userProgress.modules || {}).reduce((total, moduleData: any) => {
                  return total + (moduleData?.completedLessons?.length || 0)
                }, 0)}
              </div>
              <p className="text-xs text-green-200">
                of {learningModules.reduce((sum, m) => sum + m.lessons, 0)} lessons
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Modules Completed</CardTitle>
              <Trophy className="h-4 w-4 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedModules}</div>
              <p className="text-xs text-purple-200">of {learningModules.length} modules</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Learning Streak</CardTitle>
              <Zap className="h-4 w-4 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProgress.daysActive || 0}</div>
              <p className="text-xs text-orange-200">days active</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Alert */}
        {completedModules > 0 && (
          <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-blue-50">
            <Trophy className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Congratulations!</strong> You've completed {completedModules} module
              {completedModules > 1 ? "s" : ""}. Keep up the great work on your financial literacy journey!
            </AlertDescription>
          </Alert>
        )}

        {/* Learning Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningModules.map((module) => {
            const progress = getModuleProgress(module.id)
            const isCompleted = progress === 100
            const IconComponent = module.icon && typeof module.icon === "function" ? module.icon : DefaultLearningIcon

            const keyTopics = Array.isArray(module.keyTopics) ? module.keyTopics : []
            const displayDuration = module.duration ?? "—"

            return (
              <Card key={module.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-400">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{module.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            className={
                              module.difficulty === "Beginner"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : module.difficulty === "Intermediate"
                                  ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                  : "bg-red-100 text-red-700 border-red-200"
                            }
                          >
                            {module.difficulty}
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {displayDuration}
                          </span>
                        </div>
                      </div>
                      {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{module.description}</CardDescription>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium text-blue-600">{progress}%</span>
                    </div>
                    <div className="relative w-full h-3 bg-blue-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                        aria-label={`Module progress: ${progress}% complete`}
                        title={`${userProgress.modules?.[module.id]?.completedLessons?.length || 0} of ${module.lessons} lessons completed`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 flex items-center justify-between">
                      <span className="font-medium">
                        {userProgress.modules?.[module.id]?.completedLessons?.length || 0} of {module.lessons} lessons
                        completed
                      </span>
                      {userProgress.modules?.[module.id]?.lastAccessed && (
                        <span className="text-gray-400">
                          Last: {new Date(userProgress.modules[module.id].lastAccessed).toLocaleDateString()}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Key Topics:</h4>
                    {keyTopics.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {keyTopics.slice(0, 3).map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {keyTopics.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{keyTopics.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  <Button asChild className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href={`/learning/${module.id}`}>
                      {progress === 0 ? (
                        <>
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Start Learning
                        </>
                      ) : isCompleted ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Review Module
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Continue from Lesson {(userProgress.modules?.[module.id]?.currentLesson || 0) + 1}
                        </>
                      )}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Learning Tips */}
        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Lightbulb className="w-5 h-5" />
              Learning Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-800">Learn at Your Own Pace</h4>
                  <p className="text-sm text-purple-600">
                    Take your time with each lesson. Understanding is more important than knowledge.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-800">Apply What You Learn</h4>
                  <p className="text-sm text-purple-600">
                    Practice concepts in your budget tracker and portfolio simulator.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-800">Track Your Progress</h4>
                  <p className="text-sm text-purple-600">
                    Complete modules to earn achievements and build your financial knowledge.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-800">Stay Consistent</h4>
                  <p className="text-sm text-purple-600">
                    Regular learning sessions help build lasting financial habits.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
