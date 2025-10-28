"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Target,
  Plus,
  Calendar,
  DollarSign,
  BookOpen,
  ShoppingBag,
  Wallet,
  Gift,
  Film,
  AlertCircle,
  LogIn,
  UserPlus,
  PlusCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { userDataManager } from "@/lib/user-data"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { SubscriptionGuard } from "@/components/subscription-guard"

interface Goal {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  category: string
  deadline: string
  icon: React.ReactNode
  dailySavings: number
  weeklySavings: number
  monthlySavings: number
}

const quickStartGoals = [
  {
    title: "$100 Emergency Fund",
    description: "Perfect starter emergency fund for unexpected expenses",
    targetAmount: 100,
    category: "Emergency Fund",
    icon: <AlertCircle className="h-5 w-5" />,
    timeframe: "3 months",
  },
  {
    title: "School Supplies",
    description: "Save for notebooks, pens, and other school essentials",
    targetAmount: 50,
    category: "School Supplies",
    icon: <BookOpen className="h-5 w-5" />,
    timeframe: "2 months",
  },
  {
    title: "New Backpack",
    description: "Get a quality backpack for school or travel",
    targetAmount: 75,
    category: "Shopping",
    icon: <ShoppingBag className="h-5 w-5" />,
    timeframe: "2 months",
  },
  {
    title: "Monthly Savings Streak",
    description: "Build the habit of saving $25 every month",
    targetAmount: 25,
    category: "Savings Streak",
    icon: <Wallet className="h-5 w-5" />,
    timeframe: "1 month",
  },
  {
    title: "Birthday Gift Fund",
    description: "Save for a special gift for someone you care about",
    targetAmount: 40,
    category: "Shopping",
    icon: <Gift className="h-5 w-5" />,
    timeframe: "2 months",
  },
  {
    title: "Movie Night Fund",
    description: "Save for tickets, snacks, and a fun night out",
    targetAmount: 30,
    category: "Shopping",
    icon: <Film className="h-5 w-5" />,
    timeframe: "1 month",
  },
]

function GoalsPage() {
  const { user, isLoaded: isClerkLoaded } = useUser()
  const [goals, setGoals] = useState<Goal[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false)
  const [addMoneyDialog, setAddMoneyDialog] = useState<{ open: boolean; goalId: string }>({ open: false, goalId: "" })
  const [moneyAmount, setMoneyAmount] = useState("")
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    targetAmount: "",
    category: "",
    deadline: "",
  })

  const { toast } = useToast()

  useEffect(() => {
    if (!isClerkLoaded) return

    // Set Clerk user ID
    if (user) {
      userDataManager.setClerkUserId(user.id)
      console.log("[v0] Clerk user loaded for goals page:", user.id)
    } else {
      userDataManager.setClerkUserId(null)
      console.log("[v0] No Clerk user for goals page")
    }

    const checkAuth = () => {
      const userSignedUp = !!user
      setIsOnboardingComplete(userSignedUp)

      if (userSignedUp) {
        // Load goals from user data
        const userGoals = userDataManager.getGoals()
        const formattedGoals = userGoals.map((goal) => {
          const savings = calculateSavings(goal.targetAmount, goal.targetDate)
          return {
            id: goal.id,
            title: goal.title,
            description: goal.description || "",
            targetAmount: goal.targetAmount,
            currentAmount: goal.currentAmount,
            category: goal.category,
            deadline: goal.targetDate,
            icon: getCategoryIcon(goal.category),
            ...savings,
          }
        })
        setGoals(formattedGoals)
      } else {
        // Show empty states for non-signed up users
        console.log("[v0] User not signed in - showing zero goals")
        setGoals([])
      }
    }

    // Check immediately
    checkAuth()

    // Listen for authentication events
    const handleAuthChange = () => {
      // Defer state updates to avoid updating during render
      setTimeout(() => {
        checkAuth()
      }, 0)
    }

    window.addEventListener("userSignedIn", handleAuthChange)
    window.addEventListener("userDataUpdated", handleAuthChange)
    window.addEventListener("storage", handleAuthChange)

    return () => {
      window.removeEventListener("userSignedIn", handleAuthChange)
      window.removeEventListener("userDataUpdated", handleAuthChange)
      window.removeEventListener("storage", handleAuthChange)
    }
  }, [user, isClerkLoaded])

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "emergency fund":
        return <AlertCircle className="h-5 w-5" />
      case "school supplies":
        return <BookOpen className="h-5 w-5" />
      case "shopping":
        return <ShoppingBag className="h-5 w-5" />
      case "savings streak":
        return <Wallet className="h-5 w-5" />
      default:
        return <Target className="h-5 w-5" />
    }
  }

  const calculateSavings = (target: number, deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysLeft <= 0) {
      return { dailySavings: 0, weeklySavings: 0, monthlySavings: 0 }
    }

    const dailySavings = target / daysLeft
    const weeklySavings = dailySavings * 7
    const monthlySavings = dailySavings * 30

    return { dailySavings, weeklySavings, monthlySavings }
  }

  const addQuickGoal = (quickGoal: (typeof quickStartGoals)[0]) => {
    if (!isOnboardingComplete || !user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to start setting goals and track your money.",
        variant: "destructive",
      })
      return
    }

    try {
      const deadline = new Date()
      const months = Number.parseInt(quickGoal.timeframe.split(" ")[0])
      deadline.setMonth(deadline.getMonth() + months)

      const savings = calculateSavings(quickGoal.targetAmount, deadline.toISOString().split("T")[0])

      const goal: Goal = {
        id: Date.now().toString(),
        title: quickGoal.title,
        description: quickGoal.description,
        targetAmount: quickGoal.targetAmount,
        currentAmount: 0, // Always start with 0 - user needs to add money manually
        category: quickGoal.category,
        deadline: deadline.toISOString().split("T")[0],
        icon: quickGoal.icon,
        ...savings,
      }

      setGoals([...goals, goal])

      // Add goal to user data
      userDataManager.addGoal({
        title: goal.title,
        description: goal.description,
        targetAmount: goal.targetAmount,
        currentAmount: 0,
        category: goal.category,
        targetDate: goal.deadline,
      })

      toast({
        title: "Goal added!",
        description: `Added ${quickGoal.title} to your goals. Click "Add Money" to start tracking progress. Money added will be deducted from your available budget.`,
      })
    } catch (error) {
      console.error("Error adding quick goal:", error)
      toast({
        title: "Error",
        description: "Failed to add quick goal. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addCustomGoal = () => {
    if (!isOnboardingComplete || !user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to start setting goals and track your money.",
        variant: "destructive",
      })
      return
    }

    if (!newGoal.title || !newGoal.targetAmount || !newGoal.deadline) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      const targetAmount = Number.parseInt(newGoal.targetAmount)
      if (isNaN(targetAmount) || targetAmount <= 0) {
        toast({
          title: "Error",
          description: "Target amount must be a valid positive number.",
          variant: "destructive",
        })
        return
      }

      const savings = calculateSavings(targetAmount, newGoal.deadline)

      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        targetAmount: targetAmount,
        currentAmount: 0, // Always start with 0 - user needs to add money manually
        category: newGoal.category || "Other",
        deadline: newGoal.deadline,
        icon: <Target className="h-5 w-5" />,
        ...savings,
      }

      setGoals([...goals, goal])

      // Add goal to user data
      userDataManager.addGoal({
        title: goal.title,
        description: goal.description,
        targetAmount: goal.targetAmount,
        currentAmount: 0,
        category: goal.category,
        targetDate: goal.deadline,
      })

      setNewGoal({ title: "", description: "", targetAmount: "", category: "", deadline: "" })
      setIsDialogOpen(false)
      toast({
        title: "Goal created!",
        description: `Created custom goal: ${goal.title}. Click "Add Money" to start tracking progress. Money added will be deducted from your available budget.`,
      })
    } catch (error) {
      console.error("Error adding custom goal:", error)
      toast({
        title: "Error",
        description: "Failed to create custom goal. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addMoneyToGoal = () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to add money to goals.",
        variant: "destructive",
      })
      return
    }

    const amount = Number.parseFloat(moneyAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount.",
        variant: "destructive",
      })
      return
    }

    try {
      // Find the goal and update it
      const goalIndex = goals.findIndex((g) => g.id === addMoneyDialog.goalId)
      if (goalIndex === -1) {
        toast({
          title: "Error",
          description: "Goal not found.",
          variant: "destructive",
        })
        return
      }

      const updatedGoals = [...goals]
      updatedGoals[goalIndex] = {
        ...updatedGoals[goalIndex],
        currentAmount: updatedGoals[goalIndex].currentAmount + amount,
      }
      setGoals(updatedGoals)

      // Update in user data
      userDataManager.updateGoal(addMoneyDialog.goalId, {
        currentAmount: updatedGoals[goalIndex].currentAmount,
      })

      // Add a budget entry to track this as an expense (money allocated to goals)
      userDataManager.addBudgetEntry({
        amount,
        category: "Savings & Goals",
        description: `Money added to goal: ${updatedGoals[goalIndex].title}`,
        date: new Date().toISOString(),
        type: "expense",
      })

      setAddMoneyDialog({ open: false, goalId: "" })
      setMoneyAmount("")

      const goalTitle = updatedGoals[goalIndex].title
      const newTotal = updatedGoals[goalIndex].currentAmount

      toast({
        title: "Money added! 💰",
        description: `Added $${amount} to ${goalTitle}. Total saved: $${newTotal}. This amount has been deducted from your available budget.`,
      })
    } catch (error) {
      console.error("Error adding money to goal:", error)
      toast({
        title: "Error",
        description: "Failed to add money to goal. Please try again.",
        variant: "destructive",
      })
    }
  }

  const totalSaved = goals.reduce((sum, goal) => sum + (goal.currentAmount || 0), 0)
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const overallProgress = totalTarget > 0 && totalSaved > 0 ? (totalSaved / totalTarget) * 100 : 0

  // Show onboarding prompt for non-onboarded users
  if (!isOnboardingComplete) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Goals & Planning
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Set realistic financial goals and track your progress. Start small and build healthy saving habits.
          </p>
        </div>

        {/* Empty Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="opacity-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-2xl font-bold text-gray-400">$0</p>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-2xl font-bold text-gray-400">$0</p>
                  <p className="text-sm text-muted-foreground">Total Target</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-2xl font-bold text-gray-400">0%</p>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Signup Prompt */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <UserPlus className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-900 mb-2">Sign In to Start Setting Goals</h3>
            <p className="text-green-800 mb-6 max-w-md mx-auto">
              Sign in to unlock goal tracking, savings recommendations, and progress monitoring.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                asChild
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
              >
                <Link href="/sign-in">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview of Quick Start Goals (disabled) */}
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 opacity-50">
          <CardHeader>
            <CardTitle className="text-gray-500">🚀 Quick Start Goals (Preview)</CardTitle>
            <CardDescription className="text-gray-400">These goals will be available after you sign in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickStartGoals.slice(0, 6).map((goal, index) => (
                <Card key={index} className="bg-white border-gray-100 cursor-not-allowed">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-lg bg-gray-100 text-gray-400">{goal.icon}</div>
                        <div>
                          <h4 className="font-semibold text-sm text-gray-400">{goal.title}</h4>
                          <Badge variant="outline" className="text-xs text-gray-400 border-gray-300">
                            {goal.timeframe}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">{goal.description}</p>
                    <Button size="sm" disabled className="w-full bg-gray-200 text-gray-400 cursor-not-allowed">
                      Locked
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <SubscriptionGuard>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Goals & Planning
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Set realistic financial goals and track your progress. Start small and build healthy saving habits.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">${totalSaved}</p>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">${totalTarget}</p>
                  <p className="text-sm text-muted-foreground">Total Target</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{Math.round(overallProgress)}%</p>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start Goals */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">🚀 Quick Start Goals</CardTitle>
            <CardDescription className="text-green-800">
              Add these realistic goals with one click to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickStartGoals.map((goal, index) => (
                <Card key={index} className="bg-white border-green-100">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-lg bg-green-100 text-green-600">{goal.icon}</div>
                        <div>
                          <h4 className="font-semibold text-sm">{goal.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {goal.timeframe}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{goal.description}</p>
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => addQuickGoal(goal)}
                    >
                      Add Goal
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Goals */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Goals</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Custom Goal</DialogTitle>
                  <DialogDescription>
                    Set up a personalized savings goal with your own target and timeline.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Goal Title</Label>
                    <Input
                      id="title"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                      placeholder="e.g., New Phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                      placeholder="What are you saving for?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Target Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newGoal.category}
                      onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Emergency Fund">Emergency Fund</SelectItem>
                        <SelectItem value="School Supplies">School Supplies</SelectItem>
                        <SelectItem value="Shopping">Shopping</SelectItem>
                        <SelectItem value="Savings Streak">Savings Streak</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="deadline">Target Date</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Button onClick={addCustomGoal}>Create Goal</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {goals.length === 0 ? (
            <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Goals Yet</h3>
                <p className="text-gray-600 mb-4">Start by adding a quick goal above or create your own custom goal.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal) => {
                const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0
                const remaining = goal.targetAmount - goal.currentAmount
                const isCompleted = goal.currentAmount >= goal.targetAmount

                return (
                  <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-lg ${isCompleted ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
                          >
                            {goal.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{goal.title}</CardTitle>
                            <Badge variant="outline">{goal.category}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${isCompleted ? "text-green-600" : "text-blue-600"}`}>
                            ${goal.currentAmount}
                          </p>
                          <p className="text-sm text-muted-foreground">of ${goal.targetAmount}</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <CardDescription>{goal.description}</CardDescription>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress
                          value={Math.min(progress, 100)}
                          className={`h-2 ${isCompleted ? "[&>div]:bg-green-600" : "[&>div]:bg-blue-600"}`}
                        />
                      </div>

                      {!isCompleted && (
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="space-y-1">
                            <p className="text-lg font-semibold text-blue-600">${goal.dailySavings.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">Daily</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg font-semibold text-purple-600">${goal.weeklySavings.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">Weekly</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg font-semibold text-green-600">${goal.monthlySavings.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">Monthly</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                        </div>
                        {isCompleted ? (
                          <Badge className="bg-green-100 text-green-700">🎉 Goal Completed!</Badge>
                        ) : (
                          <p className="text-sm font-medium">${remaining} remaining</p>
                        )}
                      </div>

                      {!isCompleted && (
                        <div className="pt-2">
                          <Button
                            onClick={() => setAddMoneyDialog({ open: true, goalId: goal.id })}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            size="sm"
                          >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Money
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Add Money Dialog */}
        <Dialog open={addMoneyDialog.open} onOpenChange={(open) => setAddMoneyDialog({ open, goalId: "" })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Money to Goal</DialogTitle>
              <DialogDescription>How much would you like to add to your savings goal?</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="money-amount">Amount ($)</Label>
                <Input
                  id="money-amount"
                  type="number"
                  step="0.01"
                  value={moneyAmount}
                  onChange={(e) => setMoneyAmount(e.target.value)}
                  placeholder="Enter amount (e.g., 25.00)"
                  className="text-lg"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setMoneyAmount("5")}>
                  $5
                </Button>
                <Button variant="outline" size="sm" onClick={() => setMoneyAmount("10")}>
                  $10
                </Button>
                <Button variant="outline" size="sm" onClick={() => setMoneyAmount("25")}>
                  $25
                </Button>
                <Button variant="outline" size="sm" onClick={() => setMoneyAmount("50")}>
                  $50
                </Button>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={addMoneyToGoal} className="flex-1 bg-green-600 hover:bg-green-700">
                Add Money
              </Button>
              <Button variant="outline" onClick={() => setAddMoneyDialog({ open: false, goalId: "" })}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SubscriptionGuard>
  )
}

export default GoalsPage
