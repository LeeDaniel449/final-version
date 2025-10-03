"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingDown, Plus, WalletIcon, RefreshCw } from "lucide-react"
import { userDataManager, type BudgetCategory, type BudgetEntry } from "@/lib/user-data"
import { useUser } from "@clerk/nextjs"

const defaultBudgetCategories: UserBudgetCategory[] = []

interface UserBudgetCategory {
  name: string
  budgetAmount: number
  spent: number
  spendingLimit: number
  color: string
}

interface DebtItem {
  id: string
  name: string
  balance: number
  minPayment: number
  interestRate: number
}

interface WhatIfScenario {
  category: string
  reduction: number
}

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  category: string
  type: "income" | "expense"
}

export default function BudgetTrackerPage() {
  const { user } = useUser()
  const [isUserSignedUp, setIsUserSignedUp] = useState(false)
  const [hasStartedBudgeting, setHasStartedBudgeting] = useState(false)
  const [selectedChart, setSelectedChart] = useState("pie")
  const [debtPayoffStrategy, setDebtPayoffStrategy] = useState("snowball")
  const [whatIfScenario, setWhatIfScenario] = useState<WhatIfScenario>({ category: "food & dining", reduction: 10 })
  const [showAddBudgetDialog, setShowAddBudgetDialog] = useState(false)
  const [showEditBudgetDialog, setShowEditBudgetDialog] = useState(false)
  const [showAddExpenseDialog, setShowAddExpenseDialog] = useState(false)
  const [newBudgetAmount, setNewBudgetAmount] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("housing")
  const [userBudgetCategories, setUserBudgetCategories] = useState<UserBudgetCategory[]>([])
  const [userBudgetEntries, setUserBudgetEntries] = useState<BudgetEntry[]>([])
  const [showSpendingLimitDialog, setShowSpendingLimitDialog] = useState(false)
  const [newSpendingLimit, setNewSpendingLimit] = useState("")
  const [notifications, setNotifications] = useState<
    Array<{
      id: string
      title: string
      message: string
      type: "info" | "warning" | "success"
      timestamp: Date
      read: boolean
    }>
  >([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [showAddDebtDialog, setShowAddDebtDialog] = useState(false)
  const [debts, setDebts] = useState<DebtItem[]>([])
  const [newDebt, setNewDebt] = useState({
    name: "",
    balance: "",
    minPayment: "",
    interestRate: "",
  })
  const [showAddIncomeDialog, setShowAddIncomeDialog] = useState(false)
  const [newIncomeAmount, setNewIncomeAmount] = useState("")
  const [incomeDescription, setIncomeDescription] = useState("")
  const [totalIncome, setTotalIncome] = useState(0)
  const [availableIncome, setAvailableIncome] = useState(0)
  const [showPieChart, setShowPieChart] = useState(true)
  const [chartType, setChartType] = useState("pie")
  const [_pieChartData, setPieChartData] = useState<any[]>([])
  const [newExpense, setNewExpense] = useState({ amount: 0, description: "", category: "", budgetAmount: 0 })

  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const isInitialized = useRef(false)
  const [isLoadingData, setIsLoadingData] = useState(false)

  const [newExpenseAmount, setNewExpenseAmount] = useState("")
  const [newExpenseDescription, setNewExpenseDescription] = useState("")
  const [newExpenseCategory, setNewExpenseCategory] = useState("")

  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true

    console.log("[v0] Budget page initializing, Clerk user:", user?.id)
    setIsLoadingData(true)

    const signedUp = userDataManager.isUserSignedUp() || !!user
    setIsUserSignedUp(signedUp)

    console.log("[v0] Loading user data, signedUp:", signedUp, "Clerk user:", !!user)

    if (signedUp || user) {
      const categories = userDataManager.getBudgetCategories()
      const entries = userDataManager.getBudgetEntries()
      const budgetingStarted = userDataManager.hasStartedBudgeting()

      console.log("[v0] User data loaded:", { categories, entries, budgetingStarted })

      const userCategories: UserBudgetCategory[] = categories.map((cat) => ({
        name: cat.name,
        budgetAmount: cat.budgetAmount,
        spent: cat.spentAmount,
        spendingLimit: cat.spendingLimit,
        color: cat.color,
      }))

      setHasStartedBudgeting(budgetingStarted)
      setUserBudgetCategories(userCategories)
      setUserBudgetEntries(entries)
      setIsDataLoaded(true)
    } else {
      console.log("[v0] User not signed in, starting with empty data")
      setHasStartedBudgeting(false)
      setUserBudgetCategories([])
      setUserBudgetEntries([])
      setIsDataLoaded(true)
    }
    setIsLoadingData(false)
  }, [user])

  const categorySpending = userBudgetEntries.reduce(
    (acc, entry) => {
      if (entry.type === "expense") {
        const categoryKey = entry.category.toLowerCase()
        acc[categoryKey] = (acc[categoryKey] || 0) + entry.amount
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const categoriesWithData = userBudgetCategories.filter(
    (cat) => cat.budgetAmount > 0 || cat.spent > 0 || categorySpending[cat.name.toLowerCase()] > 0,
  )

  const handleAddBudgetCategory = () => {
    if (!newBudgetAmount || !selectedCategory) return

    const amount = Number.parseFloat(newBudgetAmount)
    if (isNaN(amount) || amount <= 0) return

    // Check if category already exists
    const existingIndex = userBudgetCategories.findIndex(
      (cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase(),
    )

    if (existingIndex >= 0) {
      // Update existing category
      const updated = [...userBudgetCategories]
      updated[existingIndex] = {
        ...updated[existingIndex],
        budgetAmount: amount,
      }
      setUserBudgetCategories(updated)

      // Save to storage
      userDataManager.updateBudgetCategory(selectedCategory, { budgetAmount: amount })
    } else {
      // Add new category
      const colors = ["#0F52B9", "#10B981", "#8953A9", "#EF4444", "#06B6D4", "#8B5CF6", "#84CC16", "#F59E0B"]
      const newCategory: UserBudgetCategory = {
        name: selectedCategory,
        budgetAmount: amount,
        spent: categorySpending[selectedCategory.toLowerCase()] || 0,
        spendingLimit: amount,
        color: colors[userBudgetCategories.length % colors.length],
      }

      setUserBudgetCategories([...userBudgetCategories, newCategory])

      // Save to storage
      const budgetCategory: BudgetCategory = {
        id: Date.now().toString(),
        name: selectedCategory,
        budgetAmount: amount,
        spentAmount: 0,
        spendingLimit: amount,
        color: newCategory.color,
        type: "expense",
      }
      const allCategories = userDataManager.getBudgetCategories()
      userDataManager.saveBudgetCategories([...allCategories, budgetCategory])
    }

    setHasStartedBudgeting(true)
    setNewBudgetAmount("")
    setShowAddBudgetDialog(false)
  }

  const handleAddExpense = () => {
    if (!newExpenseAmount || !newExpenseDescription || !newExpenseCategory) return

    const amount = Number.parseFloat(newExpenseAmount)
    if (isNaN(amount) || amount <= 0) return

    // Add entry to storage
    userDataManager.addBudgetEntry({
      category: newExpenseCategory,
      amount,
      description: newExpenseDescription,
      date: new Date().toISOString(),
      type: "expense",
    })

    // Reload entries
    const entries = userDataManager.getBudgetEntries()
    setUserBudgetEntries(entries)

    // Update category spent amount
    const categoryKey = newExpenseCategory.toLowerCase()
    const updatedCategories = userBudgetCategories.map((cat) => {
      if (cat.name.toLowerCase() === categoryKey) {
        const newSpent = cat.spent + amount
        // Also update in storage
        userDataManager.updateBudgetCategory(cat.name, { spentAmount: newSpent })
        return { ...cat, spent: newSpent }
      }
      return cat
    })
    setUserBudgetCategories(updatedCategories)

    setHasStartedBudgeting(true)
    setNewExpenseAmount("")
    setNewExpenseDescription("")
    setNewExpenseCategory("")
    setShowAddExpenseDialog(false)
  }

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading your budget data...</p>
        </div>
      </div>
    )
  }

  if (!isUserSignedUp && !user) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>Please sign in to access the budget tracker</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => (window.location.href = "/sign-in")}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (categoriesWithData.length === 0 && userBudgetEntries.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Budget Tracker</CardTitle>
            <CardDescription>Start tracking your finances by adding your first budget category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8">
              <WalletIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Budget Data Yet</h3>
              <p className="text-muted-foreground mb-6">Get started by setting a budget for your first category</p>
              <Dialog open={showAddBudgetDialog} onOpenChange={setShowAddBudgetDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Budget Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Budget Category</DialogTitle>
                    <DialogDescription>Set a budget amount for a spending category</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Category</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Housing">Housing</SelectItem>
                          <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                          <SelectItem value="Transportation">Transportation</SelectItem>
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="Utilities">Utilities</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Shopping">Shopping</SelectItem>
                          <SelectItem value="Travel">Travel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Budget Amount</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={newBudgetAmount}
                        onChange={(e) => setNewBudgetAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddBudgetDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddBudgetCategory}>Add Category</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalBudget = categoriesWithData.reduce((sum, cat) => sum + cat.budgetAmount, 0)
  const totalSpent = categoriesWithData.reduce((sum, cat) => sum + (categorySpending[cat.name.toLowerCase()] || 0), 0)
  const remainingBudget = totalBudget - totalSpent

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Budget Tracker</h1>
          <p className="text-muted-foreground">Track your spending and manage your budget</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showAddBudgetDialog} onOpenChange={setShowAddBudgetDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Budget Category</DialogTitle>
                <DialogDescription>Set a budget amount for a spending category</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Housing">Housing</SelectItem>
                      <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Shopping">Shopping</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Budget Amount</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={newBudgetAmount}
                    onChange={(e) => setNewBudgetAmount(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddBudgetDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddBudgetCategory}>Add Category</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showAddExpenseDialog} onOpenChange={setShowAddExpenseDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Expense</DialogTitle>
                <DialogDescription>Record a new expense transaction</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Category</Label>
                  <Select value={newExpenseCategory} onValueChange={setNewExpenseCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesWithData.map((cat) => (
                        <SelectItem key={cat.name} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={newExpenseAmount}
                    onChange={(e) => setNewExpenseAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    placeholder="What was this expense for?"
                    value={newExpenseDescription}
                    onChange={(e) => setNewExpenseDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddExpenseDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddExpense}>Add Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <WalletIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${remainingBudget < 0 ? "text-red-500" : "text-green-500"}`}>
              ${remainingBudget.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Categories</CardTitle>
          <CardDescription>Your spending by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoriesWithData.map((category) => {
              const spent = categorySpending[category.name.toLowerCase()] || 0
              const percentage = category.budgetAmount > 0 ? (spent / category.budgetAmount) * 100 : 0
              const isOverBudget = spent > category.budgetAmount

              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${spent.toFixed(2)} / ${category.budgetAmount.toFixed(2)}
                    </div>
                  </div>
                  <Progress value={Math.min(percentage, 100)} className={isOverBudget ? "bg-red-100" : ""} />
                  {isOverBudget && (
                    <p className="text-xs text-red-500">Over budget by ${(spent - category.budgetAmount).toFixed(2)}</p>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      {userBudgetEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {userBudgetEntries
                .slice(-10)
                .reverse()
                .map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{entry.description}</p>
                      <p className="text-sm text-muted-foreground">{entry.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${entry.amount.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
