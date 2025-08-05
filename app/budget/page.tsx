"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  DollarSign,
  BarChart3,
  Target,
  Zap,
  Brain,
  CreditCard,
  Home,
  Car,
  ShoppingCart,
  Coffee,
  Plane,
  Phone,
  Gamepad2,
  Heart,
  LogIn,
  PieChartIcon,
  UserPlus,
  Bell,
  Plus,
  Wallet,
  Banknote,
} from "lucide-react"
import { userDataManager, type BudgetCategory as UserBudgetCategory, type BudgetEntry } from "@/lib/user-data"
import { TutorialProvider } from "@/components/tutorial/tutorial-provider"
import { TutorialOverlay } from "@/components/tutorial/tutorial-overlay"
import { useTutorial } from "@/components/tutorial/tutorial-provider"

interface BudgetCategory {
  name: string
  budgeted: number
  spent: number
  spendingLimit: number
  icon: any
  trend: "up" | "down" | "stable"
  trendPercent: number
  color: string
}

interface Transaction {
  id: string
  description: string
  amount: number
  category: string
  date: string
  isAnomaly?: boolean
}

interface DebtItem {
  name: string
  balance: number
  minPayment: number
  interestRate: number
  priority: number
}

interface MonthlyData {
  month: string
  income: number
  expenses: number
  savings: number
  housing: number
  transportation: number
  food: number
  shopping: number
  entertainment: number
  healthcare: number
  utilities: number
  travel: number
}

interface CategoryTrendData {
  month: string
  [key: string]: string | number
}

function BudgetDashboardContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [whatIfScenario, setWhatIfScenario] = useState({ category: "dining", reduction: 20 })
  const [debtPayoffStrategy, setDebtPayoffStrategy] = useState("snowball")
  const [selectedChart, setSelectedChart] = useState("pie")
  const [isUserSignedUp, setIsUserSignedUp] = useState(false)
  const [hasStartedBudgeting, setHasStartedBudgeting] = useState(false)
  const [showAddBudgetDialog, setShowAddBudgetDialog] = useState(false)
  const [newBudgetAmount, setNewBudgetAmount] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("housing")
  const [userBudgetCategories, setUserBudgetCategories] = useState<UserBudgetCategory[]>([])
  const [userBudgetEntries, setUserBudgetEntries] = useState<BudgetEntry[]>([])
  const { startTutorial } = useTutorial()
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

  const addNotification = (title: string, message: string, type: "info" | "warning" | "success" = "info") => {
    const newNotification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      timestamp: new Date(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]) // Keep only 10 most recent
    setUnreadCount((prev) => Math.min(prev + 1, 9))
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
    setUnreadCount(0)
  }

  // Calculate income totals
  const calculateIncomeData = useCallback(() => {
    const incomeEntries = userBudgetEntries.filter((entry) => entry.type === "income")
    const totalIncomeAmount = incomeEntries.reduce((sum, entry) => sum + entry.amount, 0)

    // Calculate total budgeted amounts
    const totalBudgetedAmount = userBudgetCategories.reduce((sum, cat) => sum + (cat.budgetAmount || 0), 0)

    const available = totalIncomeAmount - totalBudgetedAmount

    setTotalIncome(totalIncomeAmount)
    setAvailableIncome(available)
  }, [userBudgetEntries, userBudgetCategories])

  // Load user data
  const loadUserData = useCallback(() => {
    const signedUp = userDataManager.isUserSignedUp()

    // Check if user has started budgeting by looking at categories with budget amounts
    const categories = userDataManager.getBudgetCategories()
    const budgetingStarted =
      signedUp && (userDataManager.hasStartedBudgeting() || categories.some((cat) => cat.budgetAmount > 0))

    setIsUserSignedUp(signedUp)
    setHasStartedBudgeting(budgetingStarted)

    if (signedUp) {
      const entries = userDataManager.getBudgetEntries()
      setUserBudgetCategories(categories)
      setUserBudgetEntries(entries)
    }
  }, [])

  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  useEffect(() => {
    calculateIncomeData()
  }, [calculateIncomeData])

  // Handle adding income
  const handleAddIncome = () => {
    if (!isUserSignedUp) {
      return
    }

    const amount = Number.parseFloat(newIncomeAmount)
    if (amount > 0 && incomeDescription.trim()) {
      userDataManager.addBudgetEntry({
        amount,
        category: "Income",
        description: incomeDescription,
        date: new Date().toISOString(),
        type: "income",
      })

      // Refresh the data
      loadUserData()
      setShowAddIncomeDialog(false)
      setNewIncomeAmount("")
      setIncomeDescription("")

      // Add notification
      addNotification(
        "Income Added Successfully! 💰",
        `Added $${amount} income: ${incomeDescription}. Your available budget has increased!`,
        "success",
      )
    }
  }

  // Icon mapping for categories
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase()
    if (name.includes("housing") || name.includes("rent") || name.includes("mortgage")) return Home
    if (name.includes("transportation") || name.includes("car") || name.includes("gas")) return Car
    if (name.includes("food") || name.includes("dining") || name.includes("grocery")) return Coffee
    if (name.includes("shopping") || name.includes("retail")) return ShoppingCart
    if (name.includes("entertainment") || name.includes("games") || name.includes("movies")) return Gamepad2
    if (name.includes("healthcare") || name.includes("medical") || name.includes("health")) return Heart
    if (name.includes("utilities") || name.includes("phone") || name.includes("internet")) return Phone
    if (name.includes("travel") || name.includes("vacation")) return Plane
    return DollarSign
  }

  // Calculate spending by category from budget entries
  const calculateCategorySpending = () => {
    const categorySpending: Record<string, number> = {}

    userBudgetEntries.forEach((entry) => {
      if (entry.type === "expense") {
        const categoryKey = entry.category.toLowerCase()
        categorySpending[categoryKey] = (categorySpending[categoryKey] || 0) + entry.amount
      }
    })

    return categorySpending
  }

  // Convert user data to display format
  const convertToDisplayData = (): BudgetCategory[] => {
    // Always show zero values until user has started budgeting AND has actual money tracked
    if (!hasStartedBudgeting || !isUserSignedUp) {
      return [
        {
          name: "Housing",
          budgeted: 0,
          spent: 0,
          spendingLimit: 0,
          icon: Home,
          trend: "stable",
          trendPercent: 0,
          color: "#0F52B9",
        },
        {
          name: "Transportation",
          budgeted: 0,
          spent: 0,
          spendingLimit: 0,
          icon: Car,
          trend: "stable",
          trendPercent: 0,
          color: "#8953A9",
        },
        {
          name: "Food & Dining",
          budgeted: 0,
          spent: 0,
          spendingLimit: 0,
          icon: Coffee,
          trend: "stable",
          trendPercent: 0,
          color: "#10B981",
        },
        {
          name: "Shopping",
          budgeted: 0,
          spent: 0,
          spendingLimit: 0,
          icon: ShoppingCart,
          trend: "stable",
          trendPercent: 0,
          color: "#F59E0B",
        },
        {
          name: "Entertainment",
          budgeted: 0,
          spent: 0,
          spendingLimit: 0,
          icon: Gamepad2,
          trend: "stable",
          trendPercent: 0,
          color: "#EF4444",
        },
        {
          name: "Healthcare",
          budgeted: 0,
          spent: 0,
          spendingLimit: 0,
          icon: Heart,
          trend: "stable",
          trendPercent: 0,
          color: "#8B5CF6",
        },
        {
          name: "Utilities",
          budgeted: 0,
          spent: 0,
          spendingLimit: 0,
          icon: Phone,
          trend: "stable",
          trendPercent: 0,
          color: "#06B6D4",
        },
        {
          name: "Travel",
          budgeted: 0,
          spent: 0,
          spendingLimit: 0,
          icon: Plane,
          trend: "stable",
          trendPercent: 0,
          color: "#84CC16",
        },
      ]
    }

    const categorySpending = calculateCategorySpending()
    const colors = ["#0F52B9", "#8953A9", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16"]

    return userBudgetCategories.map((category, index) => {
      const spent = categorySpending[category.name.toLowerCase()] || 0
      const budgeted = category.budgetAmount || 0
      const spendingLimit = category.spendingLimit || 0

      // Calculate trend (simplified - in real app this would compare to previous periods)
      let trend: "up" | "down" | "stable" = "stable"
      let trendPercent = 0

      if (spent > budgeted * 1.1) {
        trend = "up"
        trendPercent = Math.round(((spent - budgeted) / budgeted) * 100)
      } else if (spent < budgeted * 0.9) {
        trend = "down"
        trendPercent = -Math.round(((budgeted - spent) / budgeted) * 100)
      }

      return {
        name: category.name,
        budgeted,
        spent,
        spendingLimit,
        icon: getCategoryIcon(category.name),
        trend,
        trendPercent,
        color: colors[index % colors.length],
      }
    })
  }

  // Generate monthly data from user entries
  const generateMonthlyData = (): MonthlyData[] => {
    // Show zero data until user has started budgeting AND has actual money tracked
    if (!hasStartedBudgeting || !isUserSignedUp) {
      return Array.from({ length: 6 }, (_, i) => ({
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
        income: 0,
        expenses: 0,
        savings: 0,
        housing: 0,
        transportation: 0,
        food: 0,
        shopping: 0,
        entertainment: 0,
        healthcare: 0,
        utilities: 0,
        travel: 0,
      }))
    }

    // Group entries by month
    const monthlyGroups: Record<string, BudgetEntry[]> = {}
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

    userBudgetEntries.forEach((entry) => {
      const date = new Date(entry.date)
      const monthKey = months[date.getMonth()] || "Jun"
      if (!monthlyGroups[monthKey]) {
        monthlyGroups[monthKey] = []
      }
      monthlyGroups[monthKey].push(entry)
    })

    return months.map((month) => {
      const entries = monthlyGroups[month] || []
      const income = entries.filter((e) => e.type === "income").reduce((sum, e) => sum + e.amount, 0)
      const expenses = entries.filter((e) => e.type === "expense").reduce((sum, e) => sum + e.amount, 0)
      const savings = income - expenses

      // Calculate category spending for this month
      const categorySpending: Record<string, number> = {}
      entries
        .filter((e) => e.type === "expense")
        .forEach((entry) => {
          const key = entry.category.toLowerCase()
          categorySpending[key] = (categorySpending[key] || 0) + entry.amount
        })

      return {
        month,
        income,
        expenses,
        savings,
        housing: categorySpending["housing"] || 0,
        transportation: categorySpending["transportation"] || 0,
        food: categorySpending["food & dining"] || categorySpending["food"] || 0,
        shopping: categorySpending["shopping"] || 0,
        entertainment: categorySpending["entertainment"] || 0,
        healthcare: categorySpending["healthcare"] || 0,
        utilities: categorySpending["utilities"] || 0,
        travel: categorySpending["travel"] || 0,
      }
    })
  }

  const displayBudgetData = convertToDisplayData()
  const displayMonthlyData = generateMonthlyData()

  const pieChartData = displayBudgetData
    .filter((category) => category.spent > 0)
    .map((category) => ({
      name: category.name,
      value: category.spent,
      budget: category.budgeted,
      color: category.color,
      percentage: ((category.spent / displayBudgetData.reduce((sum, cat) => sum + cat.spent, 0)) * 100).toFixed(1),
    }))

  const budgetVsActualData = displayBudgetData
    .filter((category) => category.budgeted > 0 || category.spent > 0)
    .map((category) => ({
      name: category.name.length > 12 ? category.name.substring(0, 12) + "..." : category.name,
      budgeted: category.budgeted,
      spent: category.spent,
      color: category.color,
    }))

  const savingsRateData = displayMonthlyData.map((month) => ({
    month: month.month,
    savingsRate: month.income > 0 ? ((month.savings / month.income) * 100).toFixed(1) : "0",
    income: month.income,
    expenses: month.expenses,
    savings: month.savings,
  }))

  const categoryTrendData: CategoryTrendData[] = displayMonthlyData.map((month) => ({
    month: month.month,
    Housing: month.housing,
    Transportation: month.transportation,
    "Food & Dining": month.food,
    Shopping: month.shopping,
    Entertainment: month.entertainment,
    Healthcare: month.healthcare,
    Utilities: month.utilities,
    Travel: month.travel,
  }))

  // Convert budget entries to transactions for display
  const recentTransactions: Transaction[] =
    hasStartedBudgeting && isUserSignedUp
      ? userBudgetEntries
          .filter((entry) => entry.type === "expense")
          .slice(-5)
          .map((entry) => ({
            id: entry.id,
            description: entry.description,
            amount: entry.amount,
            category: entry.category,
            date: entry.date,
            isAnomaly: entry.amount > 100, // Simple anomaly detection
          }))
      : []

  // Sample debt data (would come from user data in real app)
  const [debts, setDebts] = useState<DebtItem[]>(
    hasStartedBudgeting && isUserSignedUp
      ? [
          { name: "Credit Card 1", balance: 3500, minPayment: 105, interestRate: 18.99, priority: 1 },
          { name: "Credit Card 2", balance: 1200, minPayment: 35, interestRate: 22.99, priority: 2 },
          { name: "Student Loan", balance: 15000, minPayment: 180, interestRate: 4.5, priority: 3 },
          { name: "Car Loan", balance: 8500, minPayment: 285, interestRate: 6.2, priority: 4 },
        ]
      : [],
  )

  const totalBudgeted = displayBudgetData.reduce((sum, cat) => sum + (cat.budgeted || 0), 0)
  const totalSpent = displayBudgetData.reduce((sum, cat) => sum + (cat.spent || 0), 0)
  const remainingBudget = totalBudgeted - totalSpent
  const spentPercentage = totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0

  const handleAddBudget = () => {
    if (!isUserSignedUp) {
      return
    }

    const amount = Number.parseFloat(newBudgetAmount)
    if (amount > 0) {
      // Check if there's enough available income
      if (amount > availableIncome) {
        addNotification(
          "Insufficient Income! ⚠️",
          `You only have $${availableIncome.toLocaleString()} available income. Add more income or reduce the budget amount.`,
          "warning",
        )
        return
      }

      // Update the budget category
      userDataManager.updateBudgetCategory(selectedCategory, {
        budgetAmount: amount,
      })

      // Mark that user has started budgeting by adding a budget entry
      const budgetData = userDataManager.getBudgetData()
      userDataManager.saveBudgetData({
        ...budgetData,
        expenses: {
          ...budgetData.expenses,
          [selectedCategory.toLowerCase()]: budgetData.expenses[selectedCategory.toLowerCase()] || 0,
        },
      })

      // Refresh the data
      loadUserData()
      setShowAddBudgetDialog(false)
      setNewBudgetAmount("")

      // Add notification
      addNotification(
        "Budget Added Successfully! 🎉",
        `You've set a budget of $${amount} for ${selectedCategory}. Available income: $${(availableIncome - amount).toLocaleString()}`,
        "success",
      )
    }
  }

  const handleAddExpense = (category: string, amount: number, description: string) => {
    if (!isUserSignedUp) return

    userDataManager.addBudgetEntry({
      amount,
      category,
      description,
      date: new Date().toISOString(),
      type: "expense",
    })

    loadUserData()

    addNotification("Expense Added", `Added $${amount} expense for ${category}: ${description}`, "info")
  }

  const getAIInsights = () => {
    if (!hasStartedBudgeting) return []

    const insights = []

    // Income vs Budget insights
    if (totalBudgeted > totalIncome) {
      insights.push({
        type: "warning",
        title: "Budget Exceeds Income",
        description: `Your total budget ($${totalBudgeted.toLocaleString()}) exceeds your income ($${totalIncome.toLocaleString()}). Consider adding more income or reducing budgets.`,
        action: "Add Income",
      })
    }

    // Low available income warning
    if (availableIncome < totalIncome * 0.1 && totalIncome > 0) {
      insights.push({
        type: "warning",
        title: "Low Available Income",
        description: `You have only $${availableIncome.toLocaleString()} available income remaining. Consider reviewing your budget allocations.`,
        action: "Review Budget",
      })
    }

    // Overspending categories
    const overspendingCategories = displayBudgetData.filter((cat) => cat.spent > cat.budgeted && cat.budgeted > 0)
    if (overspendingCategories.length > 0) {
      insights.push({
        type: "warning",
        title: "Overspending Alert",
        description: `You're over budget in ${overspendingCategories.length} categories. Consider adjusting your spending in ${overspendingCategories[0].name}.`,
        action: "Review Categories",
      })
    }

    // Spending limit alerts
    const overLimitCategories = displayBudgetData.filter(
      (cat) => cat.spent > cat.spendingLimit && cat.spendingLimit > 0,
    )
    if (overLimitCategories.length > 0) {
      insights.push({
        type: "warning",
        title: "Spending Limit Exceeded",
        description: `You've exceeded spending limits in ${overLimitCategories.length} categories. Consider reviewing your spending in ${overLimitCategories[0].name}.`,
        action: "Review Limits",
      })
    }

    // Near spending limit warnings
    const nearLimitCategories = displayBudgetData.filter(
      (cat) => cat.spendingLimit > 0 && cat.spent > cat.spendingLimit * 0.8 && cat.spent <= cat.spendingLimit,
    )
    if (nearLimitCategories.length > 0) {
      insights.push({
        type: "info",
        title: "Approaching Spending Limit",
        description: `You're close to your spending limit in ${nearLimitCategories.length} categories. Be mindful of your remaining budget.`,
        action: "Monitor Spending",
      })
    }

    // Positive trends
    const savingCategories = displayBudgetData.filter(
      (cat) => cat.trend === "down" && cat.spent < cat.budgeted && cat.budgeted > 0,
    )
    if (savingCategories.length > 0) {
      insights.push({
        type: "success",
        title: "Great Savings!",
        description: `You're saving money in ${savingCategories.length} categories. You've saved $${savingCategories.reduce((sum, cat) => sum + (cat.budgeted - cat.spent), 0)} this month.`,
        action: "Allocate Savings",
      })
    }

    // Anomaly detection
    const anomalies = recentTransactions.filter((t) => t.isAnomaly)
    if (anomalies.length > 0) {
      insights.push({
        type: "info",
        title: "Unusual Spending Detected",
        description: `We noticed ${anomalies.length} unusual transactions. Review them to ensure they're legitimate.`,
        action: "Review Transactions",
      })
    }

    // No data insights
    if (totalSpent === 0 && totalBudgeted > 0) {
      insights.push({
        type: "info",
        title: "Start Tracking Expenses",
        description:
          "You've set budgets but haven't tracked any expenses yet. Start adding your spending to get personalized insights.",
        action: "Add Expenses",
      })
    }

    return insights
  }

  // Update the calculateWhatIf function to be more comprehensive
  const whatIfResults = useMemo(() => {
    const category = displayBudgetData.find((cat) =>
      cat.name.toLowerCase().includes(whatIfScenario.category.toLowerCase()),
    )
    if (!category || category.spent === 0) return { savings: 0, newSpent: 0, annualImpact: 0 }

    const reduction = (whatIfScenario.reduction / 100) * category.spent
    const newSpent = Math.max(0, category.spent - reduction)
    return { savings: reduction, newSpent, annualImpact: reduction * 12 }
  }, [displayBudgetData, whatIfScenario])

  const calculateDebtPayoff = () => {
    const sortedDebts =
      debtPayoffStrategy === "snowball"
        ? [...debts].sort((a, b) => a.balance - b.balance)
        : [...debts].sort((a, b) => b.interestRate - a.interestRate)

    return sortedDebts.map((debt, index) => ({
      ...debt,
      payoffOrder: index + 1,
      estimatedPayoff: Math.ceil(debt.balance / (debt.minPayment * 1.5)), // Simplified calculation
    }))
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-blue-200 rounded-lg shadow-lg">
          <p className="font-medium text-blue-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: ${entry.value?.toLocaleString() || 0}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-blue-200 rounded-lg shadow-lg">
          <p className="font-medium text-blue-800">{data.name}</p>
          <p className="text-sm text-blue-600">Spent: ${data.value?.toLocaleString() || 0}</p>
          <p className="text-sm text-blue-600">Budget: ${data.budget?.toLocaleString() || 0}</p>
          <p className="text-sm text-purple-600">{data.percentage}% of total spending</p>
        </div>
      )
    }
    return null
  }

  const handleSetSpendingLimit = () => {
    if (!isUserSignedUp) {
      return
    }

    const amount = Number.parseFloat(newSpendingLimit)
    if (amount > 0) {
      // Update the budget category with spending limit
      userDataManager.updateBudgetCategory(selectedCategory, {
        spendingLimit: amount,
      })

      // Refresh the data
      loadUserData()
      setShowSpendingLimitDialog(false)
      setNewSpendingLimit("")

      // Add notification
      addNotification(
        "Spending Limit Set! 🚨",
        `You've set a spending limit of $${amount} for ${selectedCategory}. You'll be alerted if you exceed this limit.`,
        "success",
      )
    }
  }

  const insights = getAIInsights()
  const debtPayoffPlan = calculateDebtPayoff()

  // Show signup prompt for non-signed up users
  if (!isUserSignedUp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between" data-tutorial="budget-header">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Calculator className="w-8 h-8 text-blue-600" />
                Smart Budget Dashboard
              </h1>
              <p className="text-gray-600">AI-powered insights for smarter spending</p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/signin">
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign In
                </Link>
              </Button>
              <Button disabled variant="ghost" size="sm" className="text-gray-400 cursor-not-allowed">
                <Zap className="w-4 h-4 mr-1" />
                Tutorial
              </Button>
              <Badge className="bg-gray-100 text-gray-500 border-gray-200">
                <Zap className="w-3 h-3 mr-1" />
                Locked
              </Badge>
            </div>
          </div>

          {/* Empty Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-tutorial="overview-cards">
            <Card className="bg-gradient-to-br from-gray-300 to-gray-400 text-white opacity-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-100">Total Budget</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0</div>
                <p className="text-xs text-gray-200">This month</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-300 to-gray-400 text-white opacity-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-100">Total Spent</CardTitle>
                <TrendingUp className="h-4 w-4 text-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0</div>
                <p className="text-xs text-gray-200">0% of budget</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-300 to-gray-400 text-white opacity-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-100">Remaining</CardTitle>
                <Target className="h-4 w-4 text-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0</div>
                <p className="text-xs text-gray-200">No budget set</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-300 to-gray-400 text-white opacity-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-100">Budget Health</CardTitle>
                <BarChart3 className="h-4 w-4 text-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Not Set</div>
                <Progress value={0} className="mt-2 bg-gray-400" />
              </CardContent>
            </Card>
          </div>

          {/* Signup Prompt */}
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <UserPlus className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Sign Up to Start Budget Tracking</h3>
              <p className="text-blue-800 mb-6 max-w-md mx-auto">
                Create your free account to unlock personalized budget tracking, AI insights, and spending analysis.
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

          {/* Preview of Features (disabled) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-50">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-500 flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5" />
                  Budget Categories (Preview)
                </CardTitle>
                <CardDescription className="text-gray-400">Track spending across different categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {displayBudgetData.slice(0, 4).map((category) => (
                    <div key={category.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-200 rounded">
                          <category.icon className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="font-medium text-gray-400">{category.name}</span>
                      </div>
                      <div className="text-gray-400">$0 / $0</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-500 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Insights (Preview)
                </CardTitle>
                <CardDescription className="text-gray-400">Get personalized financial recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-l-gray-300">
                    <h4 className="font-medium text-gray-400">No insights available</h4>
                    <p className="text-sm text-gray-400">Sign up to get AI-powered insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Show budget setup prompt for signed up users who haven't started budgeting
  if (!hasStartedBudgeting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between" data-tutorial="budget-header">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Calculator className="w-8 h-8 text-blue-600" />
                Smart Budget Dashboard
              </h1>
              <p className="text-gray-600">AI-powered insights for smarter spending</p>
            </div>
            <div className="flex items-center gap-2">
              <Button disabled variant="ghost" size="sm" className="text-gray-400 cursor-not-allowed">
                <Zap className="w-4 h-4 mr-1" />
                Tutorial
              </Button>
              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                <Zap className="w-3 h-3 mr-1" />
                Setup Required
              </Badge>
            </div>
          </div>

          {/* Empty Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-tutorial="overview-cards">
            <Card className="bg-gradient-to-br from-gray-300 to-gray-400 text-white opacity-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-100">Total Budget</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0</div>
                <p className="text-xs text-gray-200">This month</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-300 to-gray-400 text-white opacity-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-100">Total Spent</CardTitle>
                <TrendingUp className="h-4 w-4 text-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0</div>
                <p className="text-xs text-gray-200">0% of budget</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-300 to-gray-400 text-white opacity-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-100">Remaining</CardTitle>
                <Target className="h-4 w-4 text-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0</div>
                <p className="text-xs text-gray-200">No budget set</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-300 to-gray-400 text-white opacity-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-100">Budget Health</CardTitle>
                <BarChart3 className="h-4 w-4 text-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Not Set</div>
                <Progress value={0} className="mt-2 bg-gray-400" />
              </CardContent>
            </Card>
          </div>

          {/* Income Setup Prompt */}
          <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <Wallet className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Start by Adding Your Income</h3>
              <p className="text-green-800 mb-6 max-w-md mx-auto">
                Add your paycheck or other income sources first, then allocate money to different budget categories.
              </p>
              <div className="flex gap-4 justify-center">
                <Dialog open={showAddIncomeDialog} onOpenChange={setShowAddIncomeDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Banknote className="h-4 w-4 mr-2" />
                      Add Income
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Income Source</DialogTitle>
                      <DialogDescription>
                        Add your paycheck, freelance income, or other income sources.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="income-amount">Income Amount ($)</Label>
                        <Input
                          id="income-amount"
                          type="number"
                          placeholder="Enter income amount (e.g., 3000)"
                          value={newIncomeAmount}
                          onChange={(e) => setNewIncomeAmount(e.target.value)}
                          className="border-green-300 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="income-description">Description</Label>
                        <Input
                          id="income-description"
                          type="text"
                          placeholder="e.g., Monthly Salary, Freelance Payment"
                          value={incomeDescription}
                          onChange={(e) => setIncomeDescription(e.target.value)}
                          className="border-green-300 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <Button onClick={handleAddIncome} className="w-full bg-green-600 hover:bg-green-700">
                        Add Income
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  asChild
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                >
                  <Link href="/goals">
                    <Target className="h-4 w-4 mr-2" />
                    Set Goals Instead
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview of Features (disabled) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-50">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-500 flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5" />
                  Budget Categories (Preview)
                </CardTitle>
                <CardDescription className="text-gray-400">Track spending across different categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {displayBudgetData.slice(0, 4).map((category) => (
                    <div key={category.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-200 rounded">
                          <category.icon className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="font-medium text-gray-400">{category.name}</span>
                      </div>
                      <div className="text-gray-400">$0 / $0</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-500 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Insights (Preview)
                </CardTitle>
                <CardDescription className="text-gray-400">Get personalized financial recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-l-gray-300">
                    <h4 className="font-medium text-gray-400">No insights available</h4>
                    <p className="text-sm text-gray-400">Add income and budgets to get AI-powered insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between" data-tutorial="budget-header">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Calculator className="w-8 h-8 text-blue-600" />
              Smart Budget Dashboard
            </h1>
            <p className="text-gray-600">AI-powered insights for smarter spending</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Zap className="w-3 h-3 mr-1" />
              Real-time Sync
            </Badge>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 text-white text-xs border-2 border-white shadow-lg">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
              </Button>
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Brain className="w-4 h-4 text-blue-600" />
                        Smart Financial Notifications
                      </h3>
                      <p className="text-xs text-gray-600">AI-powered insights and alerts</p>
                    </div>
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                      >
                        Mark all read
                      </Button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center">
                        <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">No notifications yet</p>
                        <p className="text-gray-400 text-xs mt-1">We'll notify you of important financial insights</p>
                      </div>
                    ) : (
                      notifications.map((notification) => {
                        const getNotificationIcon = (type: string, title: string) => {
                          if (title.includes("Budget") || title.includes("Overspending"))
                            return <AlertTriangle className="w-4 h-4 text-red-500" />
                          if (title.includes("Savings") || title.includes("Milestone"))
                            return <TrendingUp className="w-4 h-4 text-green-500" />
                          if (title.includes("Investment") || title.includes("Portfolio"))
                            return <TrendingUp className="w-4 h-4 text-blue-500" />
                          if (title.includes("AI") || title.includes("Analysis"))
                            return <Brain className="w-4 h-4 text-purple-500" />
                          if (title.includes("Goal") || title.includes("Target"))
                            return <Target className="w-4 h-4 text-orange-500" />
                          if (title.includes("Debt") || title.includes("Payoff"))
                            return <CreditCard className="w-4 h-4 text-red-500" />
                          if (title.includes("Tip") || title.includes("Daily"))
                            return <Lightbulb className="w-4 h-4 text-yellow-500" />
                          if (title.includes("Income")) return <Banknote className="w-4 h-4 text-green-500" />
                          return <Bell className="w-4 h-4 text-blue-500" />
                        }

                        const getPriorityBorder = (type: string, title: string) => {
                          if (title.includes("Alert") || title.includes("Overspending") || type === "warning")
                            return "border-l-red-500"
                          if (title.includes("Milestone") || title.includes("Achievement") || type === "success")
                            return "border-l-green-500"
                          return "border-l-blue-500"
                        }

                        const getTimeAgo = (timestamp: Date) => {
                          const now = new Date()
                          const diffMs = now.getTime() - timestamp.getTime()
                          const diffMins = Math.floor(diffMs / 60000)
                          const diffHours = Math.floor(diffMs / 3600000)
                          const diffDays = Math.floor(diffMs / 86400000)

                          if (diffMins < 1) return "Just now"
                          if (diffMins < 60) return `${diffMins}m ago`
                          if (diffHours < 24) return `${diffHours}h ago`
                          return `${diffDays}d ago`
                        }

                        const extractAmount = (message: string) => {
                          const match = message.match(/\$[\d,]+/)
                          return match ? match[0] : null
                        }

                        return (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${getPriorityBorder(notification.type, notification.title)} ${
                              !notification.read ? "bg-blue-50" : ""
                            }`}
                            onClick={() => {
                              markAsRead(notification.id)
                              // Navigate to relevant page based on notification type
                              if (notification.title.includes("Budget")) {
                                // Stay on budget page
                              } else if (
                                notification.title.includes("Portfolio") ||
                                notification.title.includes("Investment")
                              ) {
                                window.location.href = "/portfolio"
                              } else if (notification.title.includes("Goal")) {
                                window.location.href = "/goals"
                              }
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-0.5">
                                {getNotificationIcon(notification.type, notification.title)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <h4 className="font-medium text-sm text-gray-900 truncate pr-2">
                                    {notification.title}
                                  </h4>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    {extractAmount(notification.message) && (
                                      <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
                                        {extractAmount(notification.message)}
                                      </Badge>
                                    )}
                                    {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                                  </div>
                                </div>
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <p className="text-xs text-gray-400">{getTimeAgo(notification.timestamp)}</p>
                                  <div className="flex items-center gap-1">
                                    {notification.type === "warning" && (
                                      <Badge className="bg-red-100 text-red-600 text-xs px-2 py-0.5">
                                        High Priority
                                      </Badge>
                                    )}
                                    {notification.type === "success" && (
                                      <Badge className="bg-green-100 text-green-600 text-xs px-2 py-0.5">
                                        Good News
                                      </Badge>
                                    )}
                                    {notification.type === "info" && (
                                      <Badge className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5">Insight</Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-200 bg-gray-50 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-gray-600 hover:text-gray-800"
                        onClick={() => setNotifications([])}
                      >
                        Clear all notifications
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <Dialog open={showAddIncomeDialog} onOpenChange={setShowAddIncomeDialog}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Banknote className="w-4 h-4 mr-1" />
                  Add Income
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Income Source</DialogTitle>
                  <DialogDescription>Add your paycheck, freelance income, or other income sources.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="income-amount">Income Amount ($)</Label>
                    <Input
                      id="income-amount"
                      type="number"
                      placeholder="Enter income amount (e.g., 3000)"
                      value={newIncomeAmount}
                      onChange={(e) => setNewIncomeAmount(e.target.value)}
                      className="border-green-300 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="income-description">Description</Label>
                    <Input
                      id="income-description"
                      type="text"
                      placeholder="e.g., Monthly Salary, Freelance Payment"
                      value={incomeDescription}
                      onChange={(e) => setIncomeDescription(e.target.value)}
                      className="border-green-300 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <Button onClick={handleAddIncome} className="w-full bg-green-600 hover:bg-green-700">
                    Add Income
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => {
                // AI-driven suggestions: Use machine learning to analyze the user's spending habits and suggest budgets per category
                const aiSuggestions = displayBudgetData.map((category) => {
                  const avgSpending = category.spent
                  const trendMultiplier = category.trend === "up" ? 1.15 : category.trend === "down" ? 0.9 : 1.0
                  const suggestedBudget = Math.round(avgSpending * trendMultiplier)

                  return {
                    category: category.name,
                    currentBudget: category.budgeted,
                    currentSpending: category.spent,
                    suggestedBudget,
                    reasoning:
                      category.spent > category.budgeted
                        ? `Increase budget by ${(((suggestedBudget - category.budgeted) / category.budgeted) * 100).toFixed(0)}% based on spending patterns`
                        : category.trend === "down"
                          ? `Reduce budget by ${(((category.budgeted - suggestedBudget) / category.budgeted) * 100).toFixed(0)}% - you're consistently under-spending`
                          : `Current budget aligns well with your spending habits`,
                    priority: category.spent > category.budgeted ? "High" : category.trend === "up" ? "Medium" : "Low",
                  }
                })

                // Tells the user how to use their money the best way
                const moneyOptimizationTips = []

                // Analyze spending efficiency
                const totalExpenses = displayBudgetData.reduce((sum, cat) => sum + cat.spent, 0)
                const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0

                // Emergency fund recommendation
                const monthlyExpenses = totalExpenses
                const recommendedEmergencyFund = monthlyExpenses * 6
                moneyOptimizationTips.push({
                  category: "Emergency Fund",
                  recommendation: `Build an emergency fund of $${recommendedEmergencyFund.toLocaleString()} (6 months of expenses)`,
                  action:
                    savingsRate < 20
                      ? "Increase savings rate to 20% to build emergency fund faster"
                      : "You're on track with savings",
                  impact: "Financial security and peace of mind",
                })

                // Debt optimization
                if (debts.length > 0) {
                  const highInterestDebt = debts.filter((debt) => debt.interestRate > 15)
                  if (highInterestDebt.length > 0) {
                    moneyOptimizationTips.push({
                      category: "Debt Optimization",
                      recommendation: `Focus on paying off high-interest debt (${highInterestDebt[0].name} at ${highInterestDebt[0].interestRate}% APR)`,
                      action: `Pay an extra $${Math.round(highInterestDebt[0].minPayment * 0.5)} monthly to save thousands in interest`,
                      impact: `Could save $${Math.round(highInterestDebt[0].balance * 0.3)} over the loan term`,
                    })
                  }
                }

                // Investment recommendations based on savings
                if (savingsRate > 20) {
                  moneyOptimizationTips.push({
                    category: "Investment Growth",
                    recommendation: "Consider investing excess savings for long-term wealth building",
                    action: `Invest $${Math.round(((savingsRate - 20) * totalIncome) / 1200)} monthly in index funds or retirement accounts`,
                    impact: "Potential to grow wealth through compound interest",
                  })
                }

                // Category-specific optimization
                const overspendingCategories = displayBudgetData.filter(
                  (cat) => cat.spent > cat.budgeted && cat.budgeted > 0,
                )
                if (overspendingCategories.length > 0) {
                  const topOverspender = overspendingCategories.sort(
                    (a, b) => b.spent - b.budgeted - (a.spent - a.budgeted),
                  )[0]
                  moneyOptimizationTips.push({
                    category: "Spending Optimization",
                    recommendation: `Reduce ${topOverspender.name} spending by $${Math.round((topOverspender.spent - topOverspender.budgeted) * 0.5)}`,
                    action: topOverspender.name.includes("Food")
                      ? "Try meal planning and cooking at home more often"
                      : topOverspender.name.includes("Transportation")
                        ? "Consider carpooling, public transit, or combining trips"
                        : "Review subscriptions and eliminate unused services",
                    impact: `Save $${Math.round((topOverspender.spent - topOverspender.budgeted) * 6)} annually`,
                  })
                }

                // 50/30/20 rule analysis
                const housingCost = displayBudgetData.find((cat) => cat.name === "Housing")?.spent || 0
                const housingPercentage = totalIncome > 0 ? (housingCost / totalIncome) * 100 : 0

                if (housingPercentage > 30) {
                  moneyOptimizationTips.push({
                    category: "Housing Optimization",
                    recommendation: `Housing costs are ${housingPercentage.toFixed(0)}% of income (recommended: 25-30%)`,
                    action: "Consider refinancing, downsizing, or finding additional income sources",
                    impact: `Reducing housing costs by 5% could free up $${Math.round((totalIncome * 0.05) / 12)} monthly`,
                  })
                }

                // Send AI notifications
                addNotification(
                  "AI Budget Analysis Complete",
                  `Your financial health score is ${savingsRate > 20 ? "Excellent" : savingsRate > 10 ? "Good" : "Needs Improvement"} with a ${savingsRate.toFixed(1)}% savings rate.`,
                  savingsRate > 20 ? "success" : savingsRate > 10 ? "info" : "warning",
                )

                if (moneyOptimizationTips.length > 0) {
                  addNotification("Top Money Optimization Tip", moneyOptimizationTips[0].action, "info")
                }

                if (overspendingCategories.length > 0) {
                  addNotification(
                    "Overspending Alert",
                    `You're over budget in ${overspendingCategories.length} categories. Focus on ${overspendingCategories[0].name} first.`,
                    "warning",
                  )
                }

                console.log("AI Budget Analysis:", aiSuggestions)
                console.log("Money Optimization Tips:", moneyOptimizationTips)
              }}
            >
              <Brain className="w-4 h-4 mr-1" />
              AI Analysis
            </Button>
          </div>
        </div>

        {/* Income Overview */}
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Wallet className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-900">Income Overview</h3>
                  <p className="text-green-700 text-sm">Track your income and budget allocation</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-900">${totalIncome.toLocaleString()}</div>
                <div className="text-sm text-green-700">Total Income</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-lg font-semibold text-gray-900">${totalIncome.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Total Income</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-lg font-semibold text-blue-900">${totalBudgeted.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Budgeted</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className={`text-lg font-semibold ${availableIncome >= 0 ? "text-green-900" : "text-red-900"}`}>
                  ${availableIncome.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Available</div>
              </div>
            </div>
            {availableIncome < 0 && (
              <Alert className="mt-4 border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  Your budget exceeds your income by ${Math.abs(availableIncome).toLocaleString()}. Consider adding more
                  income or reducing budget allocations.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-tutorial="overview-cards">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBudgeted.toLocaleString()}</div>
              <p className="text-xs text-blue-200">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Total Spent</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
              <p className="text-xs text-purple-200">{spentPercentage.toFixed(1)}% of budget</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Remaining</CardTitle>
              <Target className="h-4 w-4 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${remainingBudget >= 0 ? "text-white" : "text-red-200"}`}>
                ${Math.abs(remainingBudget).toLocaleString()}
              </div>
              <p className="text-xs text-green-200">{remainingBudget >= 0 ? "Available" : "Over budget"}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Budget Health</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {spentPercentage <= 80 ? "Excellent" : spentPercentage <= 100 ? "Good" : "Over Budget"}
              </div>
              <Progress
                value={Math.min(spentPercentage, 100)}
                className="mt-2"
                style={{
                  background: "rgba(255,255,255,0.2)",
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Interactive Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-tutorial="interactive-charts">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5 text-blue-600" />
                    Spending Breakdown
                  </CardTitle>
                  <CardDescription>Your spending by category this month</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedChart === "pie" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedChart("pie")}
                  >
                    Pie
                  </Button>
                  <Button
                    variant={selectedChart === "bar" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedChart("bar")}
                  >
                    Bar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {totalSpent === 0 ? (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <PieChartIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p>No spending data yet</p>
                    <p className="text-sm text-gray-400">Add expenses to see your spending breakdown</p>
                  </div>
                </div>
              ) : selectedChart === "pie" ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={budgetVsActualData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="budgeted" fill="#8884d8" name="Budgeted" />
                    <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Monthly Trends
              </CardTitle>
              <CardDescription>Income, expenses, and savings over time</CardDescription>
            </CardHeader>
            <CardContent>
              {displayMonthlyData.every((month) => month.income === 0 && month.expenses === 0) ? (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p>No trend data yet</p>
                    <p className="text-sm text-gray-400">Add income and expenses to see trends</p>
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={displayMonthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="income" stackId="1" stroke="#10B981" fill="#10B981" name="Income" />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stackId="2"
                      stroke="#EF4444"
                      fill="#EF4444"
                      name="Expenses"
                    />
                    <Area
                      type="monotone"
                      dataKey="savings"
                      stackId="3"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      name="Savings"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card data-tutorial="ai-insights">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI-Powered Insights
            </CardTitle>
            <CardDescription>Personalized recommendations based on your spending patterns</CardDescription>
          </CardHeader>
          <CardContent>
            {insights.length === 0 ? (
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Building Your Financial Profile</h3>
                <p className="text-gray-600 mb-4">
                  Add more budget data and track expenses for a few days to get personalized AI insights.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <Lightbulb className="w-6 h-6 text-blue-600 mb-2" />
                    <h4 className="font-medium text-blue-900">Smart Suggestions</h4>
                    <p className="text-sm text-blue-700">Get personalized tips to optimize your spending</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
                    <h4 className="font-medium text-green-900">Trend Analysis</h4>
                    <p className="text-sm text-green-700">Identify patterns and predict future spending</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-purple-600 mb-2" />
                    <h4 className="font-medium text-purple-900">Anomaly Detection</h4>
                    <p className="text-sm text-purple-700">Catch unusual transactions and potential issues</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <Alert
                    key={index}
                    className={
                      insight.type === "warning"
                        ? "border-l-4 border-l-red-500 bg-red-50"
                        : insight.type === "success"
                          ? "border-l-4 border-l-green-500 bg-green-50"
                          : "border-l-4 border-l-blue-500 bg-blue-50"
                    }
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {insight.type === "warning" ? (
                          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                        ) : insight.type === "success" ? (
                          <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">{insight.title}</h4>
                          <AlertDescription className="text-gray-700">{insight.description}</AlertDescription>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4 bg-transparent">
                        {insight.action}
                      </Button>
                    </div>
                  </Alert>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category Details and Analysis */}
        <Tabs defaultValue="categories" className="space-y-4" data-tutorial="category-tabs">
          <TabsList className="grid w-full grid-cols-5 relative">
            <div className="absolute -top-8 right-0 text-xs text-green-600 font-medium">
              Available Income: ${availableIncome.toLocaleString()}
            </div>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="whatif">What-If</TabsTrigger>
            <TabsTrigger value="debt">Debt Payoff</TabsTrigger>
          </TabsList>

          <TabsContent value="income" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-green-600" />
                  Income Management
                </CardTitle>
                <CardDescription>Track your income sources and see how much is available for budgeting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-900">${totalIncome.toLocaleString()}</div>
                      <div className="text-sm text-green-700">Total Income</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-900">${totalBudgeted.toLocaleString()}</div>
                      <div className="text-sm text-blue-700">Total Budgeted</div>
                    </div>
                    <div
                      className={`p-4 rounded-lg border ${availableIncome >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                    >
                      <div className={`text-2xl font-bold ${availableIncome >= 0 ? "text-green-900" : "text-red-900"}`}>
                        ${availableIncome.toLocaleString()}
                      </div>
                      <div className={`text-sm ${availableIncome >= 0 ? "text-green-700" : "text-red-700"}`}>
                        {availableIncome >= 0 ? "Available for Budget" : "Over Budget"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Recent Income Entries</h4>
                    {userBudgetEntries.filter((entry) => entry.type === "income").length === 0 ? (
                      <div className="text-center py-8">
                        <Banknote className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Income Entries Yet</h3>
                        <p className="text-gray-600 mb-4">Add your first income source to start budgeting.</p>
                        <Dialog open={showAddIncomeDialog} onOpenChange={setShowAddIncomeDialog}>
                          <DialogTrigger asChild>
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                              <Plus className="h-4 w-4 mr-2" />
                              Add First Income
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {userBudgetEntries
                          .filter((entry) => entry.type === "income")
                          .slice(-5)
                          .map((entry) => (
                            <div
                              key={entry.id}
                              className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                  <Banknote className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{entry.description}</h4>
                                  <p className="text-sm text-gray-600">{new Date(entry.date).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="font-medium text-green-900">+${entry.amount.toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget Categories & Spending Limits</CardTitle>
                <CardDescription>
                  Track your spending, set budgets, and manage spending limits for each category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {displayBudgetData.map((category) => {
                    const percentage = category.budgeted > 0 ? (category.spent / category.budgeted) * 100 : 0
                    const isOverBudget = percentage > 100

                    return (
                      <div key={category.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <category.icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{category.name}</h3>
                              <p className="text-sm text-gray-600">
                                ${(category.spent || 0).toLocaleString()} of $
                                {(category.budgeted || 0).toLocaleString()} budget
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                category.trend === "up"
                                  ? "bg-red-100 text-red-700"
                                  : category.trend === "down"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700"
                              }
                            >
                              {category.trend === "up" ? (
                                <TrendingUp className="w-3 h-3 mr-1" />
                              ) : category.trend === "down" ? (
                                <TrendingDown className="w-3 h-3 mr-1" />
                              ) : null}
                              {category.trendPercent !== 0 ? `${Math.abs(category.trendPercent)}%` : "Stable"}
                            </Badge>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Edit Budget
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Budget for {category.name}</DialogTitle>
                                  <DialogDescription>
                                    Update your monthly budget amount for this category.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="text-sm text-blue-800">
                                      Available Income: ${availableIncome.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-blue-600 mt-1">
                                      Current budget for {category.name}: ${category.budgeted.toLocaleString()}
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-budget-amount">Monthly Budget Amount ($)</Label>
                                    <Input
                                      id="edit-budget-amount"
                                      type="number"
                                      placeholder={`Current: $${category.budgeted || 0}`}
                                      defaultValue={category.budgeted || 0}
                                      onChange={(e) => {
                                        const newAmount = e.target.value
                                        // Store the new amount in a temporary state or ref
                                      }}
                                    />
                                  </div>
                                  <Button
                                    onClick={() => {
                                      const input = document.getElementById("edit-budget-amount") as HTMLInputElement
                                      const newBudget = Number.parseFloat(input.value)
                                      const currentBudget = category.budgeted || 0
                                      const budgetDifference = newBudget - currentBudget

                                      if (newBudget > 0) {
                                        // Check if there's enough available income for the increase
                                        if (budgetDifference > availableIncome) {
                                          addNotification(
                                            "Insufficient Income! ⚠️",
                                            `You only have $${availableIncome.toLocaleString()} available income. The increase of $${budgetDifference.toLocaleString()} exceeds your available funds.`,
                                            "warning",
                                          )
                                          return
                                        }

                                        userDataManager.updateBudgetCategory(category.name.toLowerCase(), {
                                          budgetAmount: newBudget,
                                        })
                                        loadUserData()
                                        addNotification(
                                          "Budget Updated! 💰",
                                          `Updated budget for ${category.name} to $${newBudget}. Available income: $${(availableIncome - budgetDifference).toLocaleString()}`,
                                          "success",
                                        )
                                      }
                                    }}
                                    className="w-full"
                                  >
                                    Update Budget
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Add Expense
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Add Expense to {category.name}</DialogTitle>
                                  <DialogDescription>Record a new expense for this category.</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="expense-amount">Amount ($)</Label>
                                    <Input id="expense-amount" type="number" placeholder="Enter expense amount" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="expense-description">Description</Label>
                                    <Input
                                      id="expense-description"
                                      type="text"
                                      placeholder="What was this expense for?"
                                    />
                                  </div>
                                  <Button
                                    onClick={() => {
                                      const amountInput = document.getElementById("expense-amount") as HTMLInputElement
                                      const descriptionInput = document.getElementById(
                                        "expense-description",
                                      ) as HTMLInputElement
                                      const amount = Number.parseFloat(amountInput.value)
                                      const description = descriptionInput.value

                                      if (amount > 0 && description.trim()) {
                                        handleAddExpense(category.name, amount, description)
                                        // Clear the form
                                        amountInput.value = ""
                                        descriptionInput.value = ""
                                      }
                                    }}
                                    className="w-full"
                                  >
                                    Add Expense
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Budget Progress</span>
                            <span>{percentage.toFixed(1)}% used</span>
                          </div>
                          <Progress
                            value={Math.min(percentage, 100)}
                            className={`h-2 ${isOverBudget ? "bg-blue-100 [&>div]:bg-blue-500" : "bg-blue-200 [&>div]:bg-blue-500"}`}
                          />
                          <div className="flex justify-between text-xs text-gray-600">
                            <span className={isOverBudget ? "text-red-600 font-medium" : "text-green-600"}>
                              {isOverBudget
                                ? `$${((category.spent || 0) - (category.budgeted || 0)).toLocaleString()} over budget`
                                : `$${((category.budgeted || 0) - (category.spent || 0)).toLocaleString()} remaining`}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest spending activity</CardDescription>
              </CardHeader>
              <CardContent>
                {recentTransactions.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions Yet</h3>
                    <p className="text-gray-600 mb-4">Start adding expenses to track your spending patterns.</p>
                    <Button
                      onClick={() => {
                        const category = prompt("Category:")
                        const amount = prompt("Amount:")
                        const description = prompt("Description:")
                        if (category && amount && description) {
                          handleAddExpense(category, Number.parseFloat(amount), description)
                        }
                      }}
                    >
                      Add First Transaction
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          transaction.isAnomaly ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <DollarSign className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                            <p className="text-sm text-gray-600">
                              {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {transaction.isAnomaly && (
                            <Badge className="bg-red-100 text-red-700">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Unusual
                            </Badge>
                          )}
                          <span className="font-medium text-gray-900">
                            ${(transaction.amount || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatif" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>What-If Scenarios</CardTitle>
                <CardDescription>See how changes to your spending would affect your budget</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scenario-category">Category</Label>
                    <select
                      id="scenario-category"
                      value={whatIfScenario.category}
                      onChange={(e) => setWhatIfScenario({ ...whatIfScenario, category: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {displayBudgetData
                        .filter((category) => category.spent > 0)
                        .map((category) => (
                          <option key={category.name} value={category.name.toLowerCase()}>
                            {category.name} (Currently spending: ${category.spent.toLocaleString()})
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reduction-percent">Reduction Percentage</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="reduction-percent"
                        type="range"
                        min="5"
                        max="50"
                        step="5"
                        value={whatIfScenario.reduction}
                        onChange={(e) =>
                          setWhatIfScenario({ ...whatIfScenario, reduction: Number.parseInt(e.target.value) })
                        }
                        className="flex-1"
                      />
                      <span className="text-sm font-medium text-gray-700 min-w-[3rem]">
                        {whatIfScenario.reduction}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    Scenario Results
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-blue-700 mb-1">Monthly Savings</p>
                      <p className="text-2xl font-bold text-green-600">${whatIfResults.savings.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-blue-700 mb-1">New Monthly Spending</p>
                      <p className="text-2xl font-bold text-blue-900">${whatIfResults.newSpent.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-blue-700 mb-1">Annual Impact</p>
                      <p className="text-2xl font-bold text-purple-600">
                        ${whatIfResults.annualImpact.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    Smart Suggestions
                  </h4>
                  <div className="space-y-2">
                    {whatIfScenario.category.includes("dining") || whatIfScenario.category.includes("food") ? (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800 font-medium">🍳 Food & Dining Tips:</p>
                        <ul className="text-sm text-green-700 mt-1 space-y-1">
                          <li>• Meal plan for the week and create a shopping list</li>
                          <li>• Cook at home 2-3 more times per week</li>
                          <li>• Try batch cooking on weekends</li>
                          <li>• Use grocery store apps for coupons and deals</li>
                        </ul>
                      </div>
                    ) : whatIfScenario.category.includes("transportation") ? (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800 font-medium">🚗 Transportation Tips:</p>
                        <ul className="text-sm text-blue-700 mt-1 space-y-1">
                          <li>• Combine errands into fewer trips</li>
                          <li>• Consider carpooling or public transit</li>
                          <li>• Work from home when possible</li>
                          <li>• Keep up with vehicle maintenance for better fuel efficiency</li>
                        </ul>
                      </div>
                    ) : whatIfScenario.category.includes("entertainment") ? (
                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-sm text-purple-800 font-medium">🎬 Entertainment Tips:</p>
                        <ul className="text-sm text-purple-700 mt-1 space-y-1">
                          <li>• Look for free community events and activities</li>
                          <li>• Use streaming services instead of going to movies</li>
                          <li>• Take advantage of happy hour specials</li>
                          <li>• Host game nights instead of going out</li>
                        </ul>
                      </div>
                    ) : whatIfScenario.category.includes("shopping") ? (
                      <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm text-orange-800 font-medium">🛍️ Shopping Tips:</p>
                        <ul className="text-sm text-orange-700 mt-1 space-y-1">
                          <li>• Wait 24 hours before making non-essential purchases</li>
                          <li>• Use price comparison apps and browser extensions</li>
                          <li>• Shop with a list and stick to it</li>
                          <li>• Consider buying generic or store brands</li>
                        </ul>
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-800 font-medium">💡 General Tips:</p>
                        <ul className="text-sm text-gray-700 mt-1 space-y-1">
                          <li>• Track your spending for this category daily</li>
                          <li>• Set up alerts when you're close to your limit</li>
                          <li>• Review and cancel unused subscriptions</li>
                          <li>• Look for ways to reduce or eliminate recurring expenses</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      if (whatIfResults.savings > 0) {
                        // Find the category that matches the scenario
                        const categoryName = displayBudgetData.find((cat) =>
                          cat.name.toLowerCase().includes(whatIfScenario.category.toLowerCase()),
                        )?.name

                        if (categoryName && isUserSignedUp) {
                          // Update the budget category with the new reduced amount
                          userDataManager.updateBudgetCategory(categoryName.toLowerCase(), {
                            budgetAmount: Math.round(whatIfResults.newSpent),
                          })

                          // Also update spending limit if it exists and is higher than new budget
                          const currentCategory = userBudgetCategories.find(
                            (cat) => cat.name.toLowerCase() === categoryName.toLowerCase(),
                          )

                          if (currentCategory && currentCategory.spendingLimit > whatIfResults.newSpent) {
                            userDataManager.updateBudgetCategory(categoryName.toLowerCase(), {
                              budgetAmount: Math.round(whatIfResults.newSpent),
                              spendingLimit: Math.round(whatIfResults.newSpent * 0.9), // Set limit to 90% of new budget
                            })
                          }

                          // Refresh the data to show changes
                          loadUserData()

                          // Add success notification with detailed info
                          addNotification(
                            "Scenario Applied Successfully! 🎯",
                            `Reduced ${categoryName} budget to $${Math.round(whatIfResults.newSpent)}. You'll save $${Math.round(whatIfResults.savings)} monthly ($${Math.round(whatIfResults.annualImpact)} annually)! Available income increased by $${Math.round(whatIfResults.savings)}.`,
                            "success",
                          )

                          // Reset the scenario to default after applying
                          setTimeout(() => {
                            setWhatIfScenario({ category: "dining", reduction: 20 })
                          }, 1000)
                        } else if (!isUserSignedUp) {
                          addNotification(
                            "Sign In Required",
                            "Please sign in to apply budget changes to your account.",
                            "warning",
                          )
                        } else {
                          addNotification(
                            "Category Not Found",
                            "Unable to find the selected category in your budget. Please try again.",
                            "warning",
                          )
                        }
                      } else {
                        addNotification(
                          "No Changes to Apply",
                          "This scenario doesn't result in any savings. Try adjusting the reduction percentage or selecting a different category.",
                          "info",
                        )
                      }
                    }}
                    disabled={whatIfResults.savings === 0 || !isUserSignedUp}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {whatIfResults.savings > 0 ? "Apply This Scenario" : "No Savings Available"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setWhatIfScenario({ category: "dining", reduction: 20 })
                    }}
                  >
                    Reset to Default
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="debt" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Debt Payoff Strategy</CardTitle>
                <CardDescription>Optimize your debt payments with AI-powered strategies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {debts.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Debt Data</h3>
                    <p className="text-gray-600 mb-4">Add your debts to get personalized payoff strategies.</p>
                    <Dialog open={showAddDebtDialog} onOpenChange={setShowAddDebtDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Debt Information
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Debt Information</DialogTitle>
                          <DialogDescription>
                            Enter your debt details to get personalized payoff strategies and recommendations.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="debt-name">Debt Name</Label>
                            <Input
                              id="debt-name"
                              placeholder="e.g., Credit Card 1, Student Loan"
                              value={newDebt.name}
                              onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="debt-balance">Current Balance ($)</Label>
                            <Input
                              id="debt-balance"
                              type="number"
                              placeholder="e.g., 5000"
                              value={newDebt.balance}
                              onChange={(e) => setNewDebt({ ...newDebt, balance: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="debt-payment">Minimum Monthly Payment ($)</Label>
                            <Input
                              id="debt-payment"
                              type="number"
                              placeholder="e.g., 150"
                              value={newDebt.minPayment}
                              onChange={(e) => setNewDebt({ ...newDebt, minPayment: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="debt-rate">Interest Rate (%)</Label>
                            <Input
                              id="debt-rate"
                              type="number"
                              step="0.1"
                              placeholder="e.g., 18.5"
                              value={newDebt.interestRate}
                              onChange={(e) => setNewDebt({ ...newDebt, interestRate: e.target.value })}
                            />
                          </div>
                          <Button
                            onClick={() => {
                              if (newDebt.name && newDebt.balance && newDebt.minPayment && newDebt.interestRate) {
                                const debtToAdd = {
                                  name: newDebt.name,
                                  balance: Number(newDebt.balance),
                                  minPayment: Number(newDebt.minPayment),
                                  interestRate: Number(newDebt.interestRate),
                                  priority: debts.length + 1,
                                }

                                setDebts([...debts, debtToAdd])
                                setShowAddDebtDialog(false)
                                setNewDebt({ name: "", balance: "", minPayment: "", interestRate: "" })

                                addNotification(
                                  "Debt Added Successfully! 💳",
                                  `Added ${newDebt.name} with $${Number(newDebt.balance).toLocaleString()} balance. You can now see personalized payoff strategies.`,
                                  "success",
                                )
                              }
                            }}
                            className="w-full"
                            disabled={!newDebt.name || !newDebt.balance || !newDebt.minPayment || !newDebt.interestRate}
                          >
                            Add Debt
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-4">
                      <Button
                        variant={debtPayoffStrategy === "snowball" ? "default" : "outline"}
                        onClick={() => setDebtPayoffStrategy("snowball")}
                      >
                        Debt Snowball
                      </Button>
                      <Button
                        variant={debtPayoffStrategy === "avalanche" ? "default" : "outline"}
                        onClick={() => setDebtPayoffStrategy("avalanche")}
                      >
                        Debt Avalanche
                      </Button>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">
                        {debtPayoffStrategy === "snowball" ? "Debt Snowball Strategy" : "Debt Avalanche Strategy"}
                      </h4>
                      <p className="text-sm text-blue-800">
                        {debtPayoffStrategy === "snowball"
                          ? "Pay minimum on all debts, then focus extra payments on the smallest balance first. This builds momentum and motivation."
                          : "Pay minimum on all debts, then focus extra payments on the highest interest rate first. This saves the most money over time."}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Recommended Payoff Order</h4>
                      {debtPayoffPlan.map((debt, index) => (
                        <div key={debt.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-blue-100 text-blue-700">#{debt.payoffOrder}</Badge>
                            <div>
                              <h5 className="font-medium text-gray-900">{debt.name}</h5>
                              <p className="text-sm text-gray-600">
                                ${debt.balance.toLocaleString()} at {debt.interestRate}% APR
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">${debt.minPayment}/month</p>
                            <p className="text-sm text-gray-600">~{debt.estimatedPayoff} months</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">💡 Pro Tip</h4>
                      <p className="text-sm text-green-800">
                        If you can pay an extra $100/month toward your debts, you could save thousands in interest and
                        become debt-free years earlier.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function BudgetDashboard() {
  return (
    <TutorialProvider>
      <BudgetDashboardContent />
      <TutorialOverlay />
    </TutorialProvider>
  )
}
