"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Clock, Trophy, Target, Star, Info, LogIn } from "lucide-react"
import Link from "next/link"
import { learningModules } from "@/lib/learning-data"
import { userDataManager } from "@/lib/user-data"
import { useUser, SignInButton } from "@clerk/nextjs"
import { SubscriptionGuard } from "@/components/subscription-guard"

export default function LearningDashboard() {
  const { user, isLoaded: isClerkLoaded } = useUser()

  const [isMounted, setIsMounted] = useState(false)
  const [userProgress, setUserProgress] = useState({
    completedModules: 0,
    totalProgress: 0,
    completedLessons: 0,
    currentStreak: 0,
    daysActive: 0,
  })
  const [hasClerkUser, setHasClerkUser] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isClerkLoaded && user) {
      userDataManager.setClerkUserId(user.id)
      setHasClerkUser(true)
      console.log("[v0] Clerk user loaded for learning page:", user.id)
    } else if (isClerkLoaded && !user) {
      userDataManager.setClerkUserId(null)
      setHasClerkUser(false)
      console.log("[v0] No Clerk user for learning page")
    }
  }, [user, isClerkLoaded])

  const refreshData = () => {
    if (!isMounted) {
      return
    }

    if (hasClerkUser && user) {
      userDataManager.checkAndUpdateDailyStreak()

      let totalCompletedLessons = 0
      let totalLessons = 0
      let completedModulesCount = 0

      learningModules.forEach((module) => {
        const moduleProgress = userDataManager.getModuleLessonProgress(module.id)
        const completedLessons = moduleProgress.completedLessons.length

        totalCompletedLessons += completedLessons
        totalLessons += module.lessons

        if (completedLessons >= module.lessons) {
          completedModulesCount++
        }
      })

      const overallProgress = totalLessons > 0 ? Math.round((totalCompletedLessons / totalLessons) * 100) : 0
      const progress = userDataManager.getUserProgress()

      setUserProgress({
        completedModules: completedModulesCount,
        totalProgress: overallProgress,
        completedLessons: totalCompletedLessons,
        currentStreak: progress.currentStreak || 0,
        daysActive: progress.daysActive || 0,
      })
    } else {
      setUserProgress({
        completedModules: 0,
        totalProgress: 0,
        completedLessons: 0,
        currentStreak: 0,
        daysActive: 0,
      })
    }
  }

  useEffect(() => {
    refreshData()

    const handleProgressUpdate = () => refreshData()
    window.addEventListener("progressUpdated", handleProgressUpdate)

    return () => {
      window.removeEventListener("progressUpdated", handleProgressUpdate)
    }
  }, [isMounted, hasClerkUser, user])

  if (!isMounted) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <SubscriptionGuard>
      <div className="container mx-auto p-6">
        {!hasClerkUser && (
          <Alert className="mb-6 border-brand-blue bg-blue-50">
            <Info className="h-4 w-4 text-brand-blue" />
            <AlertDescription className="flex items-center justify-between">
              <span className="text-sm">
                You're browsing as a guest. Sign in to save your progress and track your learning journey.
              </span>
              <SignInButton mode="modal">
                <Button size="sm" className="ml-4 bg-brand-blue hover:bg-brand-blue/90">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </SignInButton>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Learning Dashboard</h1>
            <p className="text-gray-600">
              {hasClerkUser
                ? "Track your progress and continue your financial education journey"
                : "Explore our learning modules and start your financial education journey"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                  <p className="text-2xl font-bold text-brand-blue">{userProgress.totalProgress}%</p>
                </div>
                <Target className="w-8 h-8 text-brand-blue" />
              </div>
              <Progress value={userProgress.totalProgress} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Modules</p>
                  <p className="text-2xl font-bold text-green-600">
                    {userProgress.completedModules}/{learningModules.length}
                  </p>
                </div>
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lessons Completed</p>
                  <p className="text-2xl font-bold text-purple-600">{userProgress.completedLessons}</p>
                </div>
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Streak</p>
                  <p className="text-2xl font-bold text-orange-600">{userProgress.currentStreak} days</p>
                </div>
                <Star className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningModules.map((module) => {
            const moduleProgress = hasClerkUser
              ? userDataManager.getModuleLessonProgress(module.id)
              : { completedLessons: [] }
            const completedLessons = moduleProgress.completedLessons.length
            const progressPercentage = Math.round((completedLessons / module.lessons) * 100)
            const isCompleted = completedLessons >= module.lessons

            return (
              <Card key={module.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={isCompleted ? "default" : "secondary"} className="text-xs">
                      {module.category}
                    </Badge>
                    {isCompleted && <Trophy className="w-4 h-4 text-yellow-500" />}
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{module.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        {completedLessons}/{module.lessons} lessons
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{module.lessons} lessons</span>
                    </div>
                  </div>

                  <Button asChild className="w-full mt-4" variant={isCompleted ? "outline" : "default"}>
                    <Link href={`/learning/${module.id}`}>
                      {isCompleted ? "Review Module" : completedLessons > 0 ? "Continue Learning" : "Start Module"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </SubscriptionGuard>
  )
}
