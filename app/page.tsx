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

  useEffect(() => {
    const profile = userDataManager.getUserProfile()
    const progress = userDataManager.getUserProgress()
    const userGoals = userDataManager.getGoals()

    setUserProfile(profile)
    setUserProgress(progress)
    setGoals(userGoals)
  }, [])

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

  /* ---------- derived values ---------- */
  const completedModulesCount = userProgress?.completedModules?.length ?? 0
  const completedLessons = userProgress?.completedLessons ?? 0
  const totalXP = userProgress?.totalXP ?? 0
  const currentStreak = userProgress?.currentStreak ?? 0
  const achievementsCount = userProgress?.achievements?.length ?? 0
  const totalModules = 12

  const activeGoals = goals.filter((g) => g.currentAmount < g.targetAmount)
  const completedGoals = goals.filter((g) => g.currentAmount >= g.targetAmount)
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0)
  const learningProgress = (completedModulesCount / totalModules) * 100

  const displayName = user?.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : userProfile?.firstName
      ? `${userProfile.firstName} ${userProfile.lastName || ""}`.trim()
      : user?.emailAddresses[0]?.emailAddress || "User"

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

        {/* Recommended for You */}
        <Card className="border-brand-blue/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-brand-blue">Recommended for You</CardTitle>
            <CardDescription>Continue your financial learning journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-800">Investment Basics</h3>
                    <p className="text-sm text-blue-600">Learn the fundamentals of investing</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Beginner
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-green-800">Budgeting Basics</h3>
                    <p className="text-sm text-green-600">Master the art of budgeting</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Essential
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-purple-800">Emergency Fund</h3>
                    <p className="text-sm text-purple-600">Build your financial safety net</p>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Important
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <span className="text-sm text-gray-600">{completedModulesCount} modules completed</span>
                </div>
                <Progress value={learningProgress} className="h-3" />
              </div>

              {userProgress?.completedModules && userProgress.completedModules.length > 0 ? (
                <div>
                  <h4 className="font-medium mb-3 text-blue-800">Completed Modules</h4>
                  <div className="space-y-2">
                    {userProgress?.completedModules?.slice(0, 3).map((moduleId) => (
                      <div key={moduleId} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="capitalize">{moduleId.replace(/-/g, " ")}</span>
                      </div>
                    ))}
                    {completedModulesCount > 3 && (
                      <p className="text-sm text-gray-600">+{completedModulesCount - 3} more modules</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No modules completed yet</p>
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
    </div>
  )
}
