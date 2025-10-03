"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Trophy, Target, Star, Lock, User, LogIn } from "lucide-react"
import Link from "next/link"
import { learningModules } from "@/lib/learning-data"
import { userDataManager } from "@/lib/user-data"

export default function LearningDashboard() {
  const [userProgress, setUserProgress] = useState({
    completedModules: 0,
    totalProgress: 0,
    completedLessons: 0,
    currentStreak: 0,
    daysActive: 0,
  })
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  const refreshData = () => {
    const signedIn = userDataManager.isUserSignedIn()
    setIsSignedIn(signedIn)

    if (signedIn) {
      // Only load progress data if user is signed in
      console.log("[v0] Loading learning progress data...")
      const completedModules = userDataManager.getCompletedModulesCount()
      const totalProgress = userDataManager.calculateOverallLearningProgress()
      const progress = userDataManager.getUserProgress()

      const progressData = {
        completedModules,
        totalProgress,
        completedLessons: progress.completedLessons || 0,
        currentStreak: progress.currentStreak || 0,
        daysActive: progress.daysActive || 0,
      }

      console.log("[v0] Setting userProgress state to:", progressData)
      setUserProgress(progressData)
    } else {
      // Reset progress data when not signed in
      setUserProgress({
        completedModules: 0,
        totalProgress: 0,
        completedLessons: 0,
        currentStreak: 0,
        daysActive: 0,
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    refreshData()

    // Listen for progress updates and sign-in events
    const handleProgressUpdate = () => refreshData()
    const handleSignIn = () => refreshData()

    window.addEventListener("progressUpdated", handleProgressUpdate)
    window.addEventListener("userSignedIn", handleSignIn)

    return () => {
      window.removeEventListener("progressUpdated", handleProgressUpdate)
      window.removeEventListener("userSignedIn", handleSignIn)
    }
  }, [])

  if (loading) {
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

  // Show locked view for non-signed-in users
  if (!isSignedIn) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Learning Dashboard</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Sign in to track your progress, earn achievements, and access personalized learning content.
          </p>

          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
              <Link href="/signin">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/signup">
                <User className="w-4 h-4 mr-2" />
                Sign Up
              </Link>
            </Button>
          </div>

          {/* Preview of learning modules */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Available Learning Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningModules.slice(0, 6).map((module) => (
                <Card key={module.id} className="opacity-75">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {module.category}
                      </Badge>
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{module.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Dashboard</h1>
          <p className="text-gray-600">Track your progress and continue your financial education journey</p>
        </div>
      </div>

      {/* Progress Overview */}
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

      {/* Learning Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningModules.map((module) => {
          const moduleProgress = userDataManager.getModuleLessonProgress(module.id)
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
  )
}
