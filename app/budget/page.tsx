"use client"

import { DialogDescription } from "@/components/ui/dialog"

import { useState, useCallback, useEffect, useMemo, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import { Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Calculator, TrendingUp, AlertTriangle, Lightbulb, DollarSign, BarChart3, Target, Zap, Brain, CreditCard, LogIn, PieChartIcon, UserPlus, Bell, Plus, Wallet, Banknote, Home, Car, Coffee, Gamepad2, Heart, Phone, Plane, RotateCcw, Snowflake, TrendingDown, Trash2, Edit2, Calendar, PlusCircle } from 'lucide-react'
import { userDataManager } from "@/lib/user-data"
import type { BudgetCategory, BudgetEntry } from "@/lib/user-data"
import { TutorialProvider, useTutorial } from "@/components/tutorial/tutorial-provider"
import { useUser } from "@clerk/nextjs"
import { AreaChart, Area } from "recharts"
import React from "react" // Added import for React.useMemo
import { ShoppingCart } from 'lucide-react' // Imported ShoppingCart
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import debounce from "lodash/debounce"
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BudgetCategory {
  name: string
  key: string
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

interface BudgetEntry {
  id: string
  amount: number
  category: string
  description: string
  date: string
  type: "income" | "expense"
}

interface UserBudgetCategory {
  id: string
  name: string
  budgetAmount: number
  spentAmount?: number // Added for clarity, though not strictly used in some calculations
  spendingLimit: number
  color?: string // Added for potential future use
  type: "expense" // Explicitly marking as expense, income is handled separately
}

interface WhatIfScenario {
  category: string
  reduction: number
}

const defaultBudgetCategories: UserBudgetCategory[] = []

const DEFAULT_CATEGORIES = [
  "Housing",
  "Transportation",
  "Food & Dining",
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Utilities",
  "Travel",
]

const CustomPieChart = ({ data }: { data: any[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null as number | null)

  if (data.length === 0) return null

  const size = 320
  const radius = 90
  const centerX = size / 2
  const centerY = size / 2

  let currentAngle = 0
  const total = data.reduce((sum, item) => sum + item.value, 0)

  const createPath = (startAngle: number, endAngle: number, isHovered = false) => {
    const currentRadius = isHovered ? radius + 15 : radius

    if (endAngle - startAngle >= 2 * Math.PI - 0.001) {
      // For a complete circle, draw two semicircles to avoid SVG arc issues
      const x1 = centerX + currentRadius
      const y1 = centerY
      const x2 = centerX - currentRadius
      const y2 = centerY

      return `M ${centerX} ${centerY}
              L ${x1} ${y1}
              A ${currentRadius} ${currentRadius} 0 0 1 ${x2} ${y2}
              A ${currentRadius} ${currentRadius} 0 0 1 ${x1} ${y1} Z`
    }

    const x1 = centerX + currentRadius * Math.cos(startAngle)
    const y1 = centerY + currentRadius * Math.sin(startAngle)
    const x2 = centerX + currentRadius * Math.cos(endAngle)
    const y2 = centerY + currentRadius * Math.sin(endAngle)

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${currentRadius} ${currentRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
  }

  return (
    <div className="w-full h-80 flex justify-center items-center bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl shadow-sm">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.15)" />
          </filter>
        </defs>

        {data.map((item, index) => {
          const angle = (item.value / total) * 2 * Math.PI
          const startAngle = currentAngle
          const endAngle = currentAngle + angle
          const isHovered = hoveredIndex === index
          const path = createPath(startAngle, endAngle, isHovered)

          // Calculate label position
          const labelAngle = startAngle + angle / 2
          const labelRadius = isHovered ? radius + 40 : radius + 25
          const labelX = centerX + labelRadius * Math.cos(labelAngle)
          const labelY = centerY + labelRadius * Math.sin(labelAngle)

          currentAngle += angle

          return (
            <g key={index}>
              <path
                d={path}
                fill={item.color}
                stroke="#ffffff"
                strokeWidth={3}
                filter={isHovered ? "url(#shadow)" : "none"}
                style={{
                  opacity: hoveredIndex === null || isHovered ? 1 : 0.75,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  transformOrigin: `${centerX}px ${centerY}px`,
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={isHovered ? "16" : "14"}
                fill="#1f2937"
                fontWeight="600"
                className="font-sans"
                style={{
                  transition: "all 0.3s ease",
                  pointerEvents: "none",
                  textShadow: "0 1px 2px rgba(255,255,255,0.8)",
                }}
              >
                {item.percentage}%
              </text>
              {isHovered && (
                <>
                  <text
                    x={labelX}
                    y={labelY + 18}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="12"
                    fill="#374151"
                    fontWeight="500"
                    className="font-sans"
                    style={{ pointerEvents: "none", textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
                  >
                    {item.name}
                  </text>
                  <text
                    x={labelX}
                    y={labelY + 32}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="11"
                    fill="#6b7280"
                    fontWeight="500"
                    className="font-sans"
                    style={{ pointerEvents: "none", textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
                  >
                    ${item.value?.toLocaleString() || 0}
                  </text>
                </>
              )}
            </g>
          )
        })}

        {/* Enhanced Legend */}
        <g transform={`translate(15, ${size - 100})`}>
          {data.map((item, index) => (
            <g key={`legend-${index}`} transform={`translate(0, ${index * 22})`}></g>
          ))}
        </g>
      </svg>
    </div>
  )
}

const BudgetDashboardContent = () => {
  const { user, isLoaded: isClerkLoaded } = useUser()
  const router = useRouter()

  const [isUserSignedUp, setIsUserSignedUp] = useState(false)
  const [hasStartedBudgeting, setHasStartedBudgeting] = useState(false)
  const [debtPayoffStrategy, setDebtPayoffStrategy] = useState("snowball")
  const [whatIfScenario, setWhatIfScenario] = useState<WhatIfScenario>({ category: "food & dining", reduction: 10 })
  const [showAddBudgetDialog, setShowAddBudgetDialog] = useState(false)
  const [showEditBudgetDialog, setShowEditBudgetDialog] = useState(false)
  const [getDialog, setGetDialog] = useState(false)
  const [newBudgetAmount, setNewBudgetAmount] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("housing")
  const [userBudgetCategories, setUserBudgetCategories] = useState([] as UserBudgetCategory[])
  const [userBudgetEntries, setUserBudgetEntries] = useState([] as BudgetEntry[])
  const { startTutorial } = useTutorial()
  // Added state variable for reset confirmation dialog
  const [showResetDialog, setShowResetDialog] = useState(false)
  // Added missing state variable for spending limit dialog
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
  const [debts, setDebts] = useState([] as DebtItem[])
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
  const [newExpense, setNewExpense] = useState({ amount: 0, description: "", category: "", budgetAmount: 0 }) // State for adding expense from category details

  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const isInitialized = useRef(false)
  const [isLoadingData, setIsLoadingData] = useState(false)

  // Added state for new entry dialog and its fields
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newEntry, setNewEntry] = useState<{
    description: string
    amount: string
    category: string
    date: string
    type: "income" | "expense"
  }>({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    type: "expense",
  })

  // Added state for editing category dialog and its fields
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editAmount, setEditAmount] = useState("")

  // CHANGE: Use userDataManager for consistent storage instead of direct localStorage
  useEffect(() => {
    if (isClerkLoaded && user) {
      // Clerk is loaded - use Clerk user ID
      userDataManager.setClerkUserId(user.id)
      const storageKey = `wealthwise_debts_${user.id}`
      const savedDebts = localStorage.getItem(storageKey)
      if (savedDebts) {
        try {
          const parsedDebts = JSON.parse(savedDebts)
          console.log("[v0] Loaded debts from localStorage:", parsedDebts)
          setDebts(parsedDebts)
        } catch (error) {
          console.error("[v0] Error loading debts:", error)
        }
      }
    } else if (isClerkLoaded && !user) {
      // Clerk loaded but no user - try fallback to wealthwise auth
      const currentUser = localStorage.getItem('wealthwise_current_user') ||
                         sessionStorage.getItem('wealthwise_session_user')
      if (currentUser) {
        console.log("[v0] Using fallback authentication for debts")
        const storageKey = `wealthwise_debts_${currentUser}`
        const savedDebts = localStorage.getItem(storageKey)
        if (savedDebts) {
          try {
            const parsedDebts = JSON.parse(savedDebts) // Fixed JSON.JSON.parse typo
            console.log("[v0] Loaded debts from fallback storage:", parsedDebts)
            setDebts(parsedDebts)
          } catch (error) {
            console.error("[v0] Error loading debts from fallback:", error)
          }
        }
      }
    }
  }, [isClerkLoaded, user])

  // CHANGE: Save with fallback support
  useEffect(() => {
    let storageKey: string | null = null

    if (isClerkLoaded && user) {
      // Clerk user available
      storageKey = `wealthwise_debts_${user.id}`
    } else if (isClerkLoaded && !user) {
      // Try fallback authentication
      const currentUser = localStorage.getItem('wealthwise_current_user') ||
                         sessionStorage.getItem('wealthwise_session_user')
      if (currentUser) {
        storageKey = `wealthwise_debts_${currentUser}`
      }
    }

    if (storageKey) {
      if (debts.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(debts))
        console.log("[v0] Saved debts to localStorage:", debts)
      } else {
        localStorage.removeItem(storageKey)
        console.log("[v0] Cleared debts from localStorage as the list is empty")
      }
    } else {
      console.log("[v0] No storage key available - debts not saved")
    }
  }, [debts, isClerkLoaded, user])

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

  useEffect(() => {
    if (isClerkLoaded && user) {
      userDataManager.setClerkUserId(user.id)
      console.log("[v0] Clerk user loaded:", user.id)

      userDataManager.clearLegacyBudgetData()
    } else if (isClerkLoaded && !user) {
      userDataManager.setClerkUserId(null)
      console.log("[v0] No Clerk user")
    }
  }, [user, isClerkLoaded])

  const loadUserData = useCallback(() => {
    if (isLoadingData) return

    setIsLoadingData(true)

    // Check if user is signed up using fallback auth system
    const signedUp = userDataManager.isUserSignedUp()
    console.log("[v0] Loading user data, user signed up:", signedUp)

    if (signedUp) {
      const categories = userDataManager.getBudgetCategories()
      const entries = userDataManager.getBudgetEntries()
      const budgetingStarted = userDataManager.hasStartedBudgeting()

      console.log("[v0] User data loaded:", { categories, entries, budgetingStarted })

      setHasStartedBudgeting(budgetingStarted)
      setUserBudgetCategories(categories)
      setUserBudgetEntries(entries)
      setIsDataLoaded(true)
    } else {
      console.log("[v0] User not signed in - showing zero data")
      setHasStartedBudgeting(false)
      setUserBudgetCategories([])
      setUserBudgetEntries([])
      setIsDataLoaded(true)
    }
    setIsLoadingData(false)
  }, [isLoadingData])

  useEffect(() => {
    if (isInitialized.current || isDataLoaded || isLoadingData) return
    isInitialized.current = true

    const isAuthenticated = userDataManager.isUserSignedUp()
    setIsUserSignedUp(isAuthenticated)

    if (isAuthenticated) {
      loadUserData()
    } else {
      setIsDataLoaded(true)
    }
  }, [loadUserData, isDataLoaded, isLoadingData]) // Added loadUserData, isDataLoaded, isLoadingData, and isUserSignedUp to dependencies

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

  const calculateCategorySpending = useCallback(() => {
    const categorySpending: Record<string, number> = {}

    // Get current month and year
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    // Filter entries to only include current month
    const currentMonthEntries = userBudgetEntries.filter((entry) => {
      const entryDate = new Date(entry.date)
      return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear
    })

    currentMonthEntries.forEach((entry) => {
      if (entry.type === "expense") {
        // Normalize category names for better matching
        const categoryKey = entry.category.toLowerCase().trim()
        categorySpending[categoryKey] = (categorySpending[categoryKey] || 0) + entry.amount
      }
    })

    return categorySpending
  }, [userBudgetEntries])

  // Convert user data to display format
  const convertToDisplayData = (): BudgetCategory[] => {
    const categorySpending = calculateCategorySpending()

    const defaultCategories = [
      { name: "Housing", key: "housing", color: "#FF0000" }, // bright red
      { name: "Transportation", key: "transportation", color: "#00FF00" }, // bright green
      { name: "Food & Dining", key: "food & dining", color: "#0000FF" }, // bright blue
      { name: "Shopping", key: "shopping", color: "#FFFF00" }, // bright yellow
      { name: "Entertainment", key: "entertainment", color: "#FF00FF" }, // bright magenta
      { name: "Healthcare", key: "healthcare", color: "#FF8000" }, // bright orange
      { name: "Utilities", key: "utilities", color: "#8000FF" }, // bright purple
      { name: "Travel", key: "travel", color: "#00FFFF" }, // bright cyan
    ]

    return defaultCategories.map((category) => {
      const userCategory = userBudgetCategories.find((uc) => uc.name.toLowerCase() === category.name.toLowerCase())

      let spent = categorySpending[category.key] || 0

      // Try alternative matching strategies if no direct match
      if (spent === 0) {
        // Try exact name match
        spent = categorySpending[category.name.toLowerCase()] || 0

        // Try partial matching for common variations
        if (spent === 0) {
          Object.keys(categorySpending).forEach((key) => {
            if (key.includes(category.key.split(" ")[0]) || category.key.includes(key.split(" ")[0])) {
              spent += categorySpending[key]
            }
          })
        }
      }

      return {
        name: category.name,
        key: category.key,
        budgeted: userCategory?.budgetAmount || 0,
        spent: spent,
        color: category.color,
        icon: getCategoryIcon(category.name),
      }
    })
  }

  const calculateBudgetProgress = (categories: BudgetCategory[]) => {
    // Show zero progress if no spending data exists
    const hasAnySpending = categories.some((cat) => (cat.spent || 0) > 0)
    if (!hasAnySpending) {
      return categories.map((cat) => ({
        ...cat,
        spent: 0,
        percentage: 0,
      }))
    }

    return categories.map((category) => {
      const spent = category.spent || 0
      const budgeted = category.budgeted || 0
      const percentage = budgeted > 0 ? (spent / budgeted) * 100 : 0

      return {
        ...category,
        spent,
        percentage: Math.min(percentage, 100),
      }
    })
  }

  const calculateOverallBudgetHealth = () => {
    const totalBudgeted = userBudgetCategories.reduce((sum, cat) => sum + (cat.budgetAmount || 0), 0)
    const totalSpent = displayBudgetData.reduce((sum, cat) => sum + (cat.spent || 0), 0)

    // Show zero progress if no spending or no budget set
    if (totalBudgeted === 0) {
      return {
        percentage: 0,
        status: "Not Started",
        remaining: 0,
      }
    }

    // Calculate how much budget is remaining (unspent)
    const remaining = totalBudgeted - totalSpent
    // Health score is percentage of budget NOT spent (inverse of spending)
    const healthScore = Math.max(0, (remaining / totalBudgeted) * 100)

    // Status based on health score (higher is better)
    let status = "Excellent"
    if (healthScore < 20) status = "Poor"
    else if (healthScore < 50) status = "Needs Improvement"
    else if (healthScore < 80) status = "Good"

    return {
      percentage: Math.min(healthScore, 100),
      status,
      remaining,
    }
  }

  const COLORS = ["#FF0000", "#00FF00", "#0000FF", "#FF00FF", "#FFFF00", "#00FFFF", "#FF8000", "#8000FF"]

  const categoryColors = {
    housing: "hsl(217, 91%, 60%)", // WealthLink primary blue
    transportation: "hsl(200, 85%, 55%)", // Sky blue
    "food & dining": "hsl(195, 80%, 50%)", // Light blue
    healthcare: "hsl(210, 88%, 65%)", // Soft blue
    shopping: "hsl(225, 75%, 58%)", // Deep blue
    entertainment: "hsl(185, 82%, 52%)", // Cyan blue
    utilities: "hsl(205, 78%, 60%)", // Medium blue
    travel: "hsl(190, 85%, 48%)", // Teal blue
  }

  const displayBudgetData = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const currentMonthEntries = userBudgetEntries.filter((entry) => {
      const entryDate = new Date(entry.date)
      return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear
    })

    const categorySpending: { [key: string]: number } = {}

    currentMonthEntries.forEach((entry) => {
      if (entry.type === "expense") {
        const key = entry.category.toLowerCase()
        categorySpending[key] = (categorySpending[key] || 0) + entry.amount
      }
    })

    const defaultCategories = [
      { name: "Housing", key: "housing", color: "#FF0000" },
      { name: "Transportation", key: "transportation", color: "#00FF00" },
      { name: "Food & Dining", key: "food & dining", color: "#0000FF" },
      { name: "Shopping", key: "shopping", color: "#FFFF00" },
      { name: "Entertainment", key: "entertainment", color: "#FF00FF" },
      { name: "Healthcare", key: "healthcare", color: "#FF8000" },
      { name: "Utilities", key: "utilities", color: "#8000FF" },
      { name: "Travel", key: "travel", color: "#00FFFF" },
    ]

    return defaultCategories.map((category) => {
      const userCategory = userBudgetCategories.find((uc) => uc.name.toLowerCase() === category.name.toLowerCase())

      let spent = categorySpending[category.key] || 0

      if (spent === 0) {
        spent = categorySpending[category.name.toLowerCase()] || 0

        if (spent === 0) {
          Object.keys(categorySpending).forEach((key) => {
            if (key.includes(category.key.split(" ")[0]) || category.key.includes(key.split(" ")[0])) {
              spent += categorySpending[key]
            }
          })
        }
      }

      return {
        name: category.name,
        key: category.key,
        budgeted: userCategory?.budgetAmount || 0,
        spent: spent,
        color: category.color,
        icon: getCategoryIcon(category.name),
        spendingLimit: userCategory?.spendingLimit || 0,
      }
    })
  }, [userBudgetCategories, userBudgetEntries])

  const handleAddExpense = (category: string, amount?: number, description?: string, budgetAmount?: number) => {
    const expenseAmount = amount || newExpense.amount
    const expenseDescription = description || newExpense.description
    const expenseCategory = category || newExpense.category
    const newBudgetAmount = budgetAmount || newExpense.budgetAmount

    console.log("[v0] Adding expense:", {
      category: expenseCategory,
      amount: expenseAmount,
      description: expenseDescription,
      budgetAmount: newBudgetAmount,
    })

    // Add the expense entry
    userDataManager.addBudgetEntry({
      category: expenseCategory,
      amount: expenseAmount,
      description: expenseDescription,
      date: new Date().toISOString(),
      type: "expense",
    })

    if (newBudgetAmount > 0) {
      const categoryName =
        userBudgetCategories.find((cat) => cat.name.toLowerCase() === expenseCategory.toLowerCase())?.name ||
        expenseCategory
      userDataManager.updateBudgetCategory(categoryName, {
        budgetAmount: newBudgetAmount,
      })
    }

    console.log("[v0] User budget entries after adding expense:", userBudgetEntries)

    addNotification("Expense Added", `Added $${expenseAmount} for ${expenseCategory}: ${expenseDescription}`, "info")

    // Refresh data
    loadUserData()
  }

  const handleAddEntry = () => {
    if (!user) {
      alert("Please sign in to add budget entries")
      return
    }

    if (newEntry.description && newEntry.amount && newEntry.category && newEntry.date) {
      userDataManager.addBudgetEntry({
        description: newEntry.description,
        amount: Number.parseFloat(newEntry.amount),
        category: newEntry.category,
        date: newEntry.date,
        type: newEntry.type as "income" | "expense",
      })

      setNewEntry({
        description: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        type: "expense",
      })

      setIsAddDialogOpen(false)
      loadUserData()
    }
  }

  const handleUpdateCategory = () => {
    if (!user) {
      alert("Please sign in to update budget categories")
      return
    }

    if (editingCategory && editAmount) {
      userDataManager.updateBudgetCategory(editingCategory, {
        budgetAmount: Number.parseFloat(editAmount),
      })
      setEditingCategory(null)
      setEditAmount("")
      setIsEditDialogOpen(false)
      loadUserData()
    }
  }

  const pieChartData = useMemo(() => {
    if (!user || !userBudgetEntries || userBudgetEntries.length === 0) {
      return []
    }

    const categorySpending = calculateCategorySpending()
    const totalUserSpending = Object.values(categorySpending).reduce((sum, amount) => sum + amount, 0)

    if (totalUserSpending === 0) {
      return []
    }

    const result = Object.entries(categorySpending)
      .filter(([_, amount]) => amount > 0)
      .map(([categoryName, amount]) => {
        const percentage = Math.round((amount / totalUserSpending) * 100)
        const normalizedCategoryName = categoryName.toLowerCase()
        const color = categoryColors[normalizedCategoryName] || "hsl(217, 91%, 60%)"

        return {
          name: categoryName,
          value: amount,
          color,
          percentage,
        }
      })

    return result
  }, [user, userBudgetEntries, calculateCategorySpending])

  const budgetVsActualData = useMemo(() => {
    if (!user || userBudgetEntries.length === 0) return []

    const categorySpending = calculateCategorySpending()

    return Object.entries(categorySpending)
      .filter(([_, amount]) => amount > 0)
      .map(([categoryName, spent]) => {
        const normalizedCategoryName = categoryName.toLowerCase()
        const color = categoryColors[normalizedCategoryName] || "hsl(220, 14%, 96%)"
        const budgetCategory = displayBudgetData.find((cat) => cat.name.toLowerCase() === normalizedCategoryName)

        return {
          name: categoryName,
          budgeted: budgetCategory?.budgeted || 0,
          spent: spent,
          color: color,
        }
      })
  }, [user, userBudgetEntries, displayBudgetData, calculateCategorySpending])

  const displayMonthlyData: MonthlyData[] = React.useMemo(() => {
    // Instead, check if we have entries to process
    if (userBudgetEntries.length === 0) {
      // Return empty months structure instead of empty array so chart still renders
      const months: MonthlyData[] = []
      const now = new Date()

      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const monthName = date.toLocaleDateString("en-US", { month: "short" })

        months.push({
          month: monthName,
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
        })
      }
      return months
    }

    const entries = userBudgetEntries

    // Get last 6 months including current month
    const months: MonthlyData[] = []
    const now = new Date()

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthName = date.toLocaleDateString("en-US", { month: "short" })
      const year = date.getFullYear()
      const month = date.getMonth()

      // Filter entries for this month
      const monthEntries = entries.filter((entry) => {
        const entryDate = new Date(entry.date)
        return entryDate.getFullYear() === year && entryDate.getMonth() === month
      })

      // Calculate totals
      const income = monthEntries.filter((e) => e.type === "income").reduce((sum, e) => sum + e.amount, 0)

      const expenses = monthEntries.filter((e) => e.type === "expense").reduce((sum, e) => sum + e.amount, 0)

      // Calculate category breakdowns
      const getCategoryTotal = (categoryName: string) => {
        return monthEntries
          .filter((e) => e.type === "expense" && e.category.toLowerCase() === categoryName.toLowerCase())
          .reduce((sum, e) => sum + e.amount, 0)
      }

      months.push({
        month: monthName,
        income,
        expenses,
        savings: income - expenses,
        housing: getCategoryTotal("housing"),
        transportation: getCategoryTotal("transportation"),
        food: getCategoryTotal("food & dining"),
        shopping: getCategoryTotal("shopping"),
        entertainment: getCategoryTotal("entertainment"),
        healthcare: getCategoryTotal("healthcare"),
        utilities: getCategoryTotal("utilities"),
        travel: getCategoryTotal("travel"),
      })
    }

    console.log("[v0] Calculated monthly data from user entries:", months)
    return months
  }, [userBudgetEntries]) // Removed 'user' dependency to prevent chart from disappearing during Clerk re-renders

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

  // CHANGE: Show all transactions instead of just the last 5, sorted by date (newest first)
  const recentTransactions: Transaction[] =
    isUserSignedUp && userBudgetEntries.length > 0
      ? userBudgetEntries
          .filter((entry) => entry.type === "expense")
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
  const totalBudget = displayBudgetData.reduce((sum, cat) => sum + (cat.budgeted || 0), 0)
  const totalSpent = displayBudgetData.reduce((sum, cat) => sum + (cat.spent || 0), 0)
  const remainingBudget = totalBudget - totalSpent
  const spentPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0
  const overallHealth = calculateOverallBudgetHealth()

  const hasAnySpendingData = userBudgetEntries.length > 0 && userBudgetEntries.some((entry) => (entry.amount || 0) > 0)

  const shouldShowProgress = hasAnySpendingData

  // CHANGE: Updated handleAddBudget to create category if it doesn't exist
  const handleAddBudget = () => {
    console.log("[v0] handleAddBudget called")
    console.log("[v0] isUserSignedUp:", isUserSignedUp)
    console.log("[v0] newBudgetAmount:", newBudgetAmount)
    console.log("[v0] selectedCategory:", selectedCategory)

    if (!isUserSignedUp) {
      console.log("[v0] User not signed up, returning early")
      return
    }

    const amount = Number.parseFloat(newBudgetAmount)
    console.log("[v0] Parsed amount:", amount)

    if (amount > 0) {
      console.log("[v0] Amount is valid, proceeding with budget update")
      // Only check against income if income has been added.
      if (totalIncome > 0 && availableIncome < amount) {
        addNotification(
          "Insufficient Income! ⚠️",
          `You only have $${(availableIncome || 0).toLocaleString()} available income. Add more income or reduce the budget amount.`,
          "warning",
        )
        return
      }

      const categoryColors: { [key: string]: string } = {
        housing: "hsl(217, 91%, 60%)",
        transportation: "hsl(200, 85%, 55%)",
        "food & dining": "hsl(195, 80%, 50%)",
        healthcare: "hsl(210, 88%, 65%)",
        shopping: "hsl(225, 75%, 58%)",
        entertainment: "hsl(185, 82%, 52%)",
        utilities: "hsl(205, 78%, 60%)",
        travel: "hsl(190, 85%, 48%)",
      }

      // Get current categories
      const currentCategories = userDataManager.getBudgetCategories()
      console.log("[v0] Current categories count:", currentCategories.length)

      // Find or create the category
      let existingCategory = currentCategories.find((cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase())

      if (!existingCategory) {
        // Category doesn't exist, create it
        const categoryName =
          DEFAULT_CATEGORIES.find((cat) => cat.toLowerCase() === selectedCategory.toLowerCase()) || selectedCategory

        const newCategory: BudgetCategory = {
          id: Date.now().toString(),
          name: categoryName,
          budgetAmount: amount,
          spentAmount: 0,
          spendingLimit: 0,
          color: categoryColors[selectedCategory.toLowerCase()] || "hsl(217, 91%, 60%)",
          type: "expense",
        }

        console.log("[v0] Creating new category:", newCategory)
        // Add new category to the list and save
        const updatedCategories = [...currentCategories, newCategory]
        userDataManager.saveBudgetCategories(updatedCategories)
        console.log("[v0] Saved categories, new count:", updatedCategories.length)
        existingCategory = newCategory
      } else {
        // Category exists, update it
        console.log("[v0] Updating existing category:", existingCategory.name)
        userDataManager.updateBudgetCategory(existingCategory.name, {
          budgetAmount: amount,
        })
      }

      console.log("[v0] Budget set successfully, unlocking page")
      setHasStartedBudgeting(true)

      // Refresh the data
      loadUserData()
      setShowAddBudgetDialog(false)
      setNewBudgetAmount("")

      const categoryNameForNotification = existingCategory?.name || selectedCategory

      const notificationMessage =
        totalIncome > 0
          ? `You've set a budget of $${amount} for ${categoryNameForNotification}. Available income: $${((availableIncome || 0) - amount).toLocaleString()}`
          : `Budget set for ${categoryNameForNotification}: $${amount}. Available income: $${((availableIncome || 0) - amount).toLocaleString()}`

      console.log("[v0] Budget update completed successfully")
      addNotification("Budget Added Successfully! 🎉", notificationMessage, "success")
    } else {
      console.log("[v0] Invalid amount, not proceeding with budget update")
      addNotification("Invalid Amount", "Please enter a valid budget amount greater than 0.", "warning")
    }
  }

  // CHANGE: Added handleResetCurrentMonth function to move current month expenses to previous month
  const handleResetCurrentMonth = () => {
    if (!isUserSignedUp) {
      return
    }

    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    // Get last day of previous month
    const lastDayPrevMonth = new Date(currentYear, currentMonth, 0)

    // Get all entries
    const allEntries = userDataManager.getBudgetEntries()

    // Update current month's expense entries to previous month
    const updatedEntries = allEntries.map((entry) => {
      const entryDate = new Date(entry.date)
      const entryMonth = entryDate.getMonth()
      const entryYear = entryDate.getFullYear()

      // If it's an expense from current month, move it to last day of previous month
      if (entry.type === "expense" && entryMonth === currentMonth && entryYear === currentYear) {
        return {
          ...entry,
          date: lastDayPrevMonth.toISOString(),
        }
      }

      return entry
    })

    // Save updated entries
    userDataManager.saveBudgetEntries(updatedEntries)

    // Reload data
    loadUserData()

    // Close dialog
    setShowResetDialog(false)

    toast({
      title: "Budget Reset",
      description: "Current month's spending has been reset. Transaction history preserved.",
    })
  }

  const getAIInsights = () => {
    // Return empty insights for non-authenticated users
    if (!isUserSignedUp || userBudgetEntries.length === 0) return []

    const insights = []

    // Income vs Budget insights
    if (totalBudget > totalIncome) {
      insights.push({
        type: "warning",
        title: "Budget Exceeds Income! ⚠️",
        description: `Your total budget ($${(totalBudget || 0).toLocaleString()}) exceeds your income ($${(totalIncome || 0).toLocaleString()}). Consider adding more income or reducing budgets.`,
        action: "Add Income",
      })
    }

    // Low available income warning
    if (availableIncome < totalIncome * 0.1 && totalIncome > 0) {
      insights.push({
        type: "warning",
        title: "Low Available Income ⚠️",
        description: `You have only $${(availableIncome || 0).toLocaleString()} available income remaining. Consider reviewing your budget allocations.`,
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
    if (totalSpent === 0 && totalBudget > 0) {
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

  // CHANGE: Enhanced debt payoff calculation with more details
  const calculateDebtPayoff = useCallback(
    (debts: DebtItem[], strategy: "snowball" | "avalanche") => {
      console.log("[v0] Calculating debt payoff with strategy:", strategy)
      console.log("[v0] Input debts:", debts)

      if (debts.length === 0) {
        console.log("[v0] No debts to calculate")
        return { debts: [], totalInterest: 0, totalMonths: 0, debtFreeDate: null }
      }

      const maxMonths = 600 // 50 years max to prevent infinite loops

      // Sort debts based on strategy
      const sortedDebts = [...debts].sort((a, b) => {
        if (strategy === "snowball") {
          return a.balance - b.balance // Smallest balance first
        } else {
          return b.interestRate - a.interestRate // Highest interest rate first
        }
      })

      console.log("[v0] Sorted debts:", sortedDebts)

      let totalInterestPaid = 0 // Declare totalInterestPaid here

      // Calculate payoff details for each debt
      const debtPayoffDetails = sortedDebts.map((debt, index) => {
        const monthlyInterestRate = debt.interestRate / 100 / 12
        let remainingBalance = debt.balance
        let monthsToPayoff = 0

        // Check if minimum payment covers interest
        const monthlyInterest = remainingBalance * monthlyInterestRate
        if (debt.minPayment <= monthlyInterest) {
          console.warn("[v0] Debt cannot be paid off - payment doesn't cover interest:", debt.name)
          return {
            ...debt,
            payoffOrder: index + 1,
            estimatedPayoff: "Cannot pay off",
            totalInterest: 0,
            monthlyPayment: debt.minPayment,
            canPayoff: false,
            monthsToPayoff: maxMonths, // Indicate it won't be paid off
          }
        }

        // Calculate actual payoff time with interest
        while (remainingBalance > 0 && monthsToPayoff < maxMonths) {
          const interestCharge = remainingBalance * monthlyInterestRate
          const principalPayment = debt.minPayment - interestCharge

          totalInterestPaid += interestCharge // Use the declared variable
          remainingBalance -= principalPayment
          monthsToPayoff++

          if (remainingBalance < 0) remainingBalance = 0
        }

        const years = Math.floor(monthsToPayoff / 12)
        const months = monthsToPayoff % 12
        const payoffText =
          years > 0
            ? `${years} year${years > 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""}`
            : `${months} month${months !== 1 ? "s" : ""}`

        return {
          ...debt,
          payoffOrder: index + 1,
          estimatedPayoff: payoffText,
          totalInterest: Math.round(totalInterestPaid),
          monthlyPayment: debt.minPayment,
          monthsToPayoff: monthsToPayoff,
          canPayoff: true,
        }
      })

      // Calculate totals
      const totalInterest = debtPayoffDetails.reduce((sum, debt) => sum + (debt.totalInterest || 0), 0)
      const totalMonths = Math.max(0, ...debtPayoffDetails.map((d) => d.monthsToPayoff || 0)) // Ensure totalMonths is at least 0

      // Calculate debt-free date
      const debtFreeDate = new Date()
      if (totalMonths > 0 && totalMonths < maxMonths) {
        // Only set if payoff is possible and calculated
        debtFreeDate.setMonth(debtFreeDate.getMonth() + totalMonths)
      } else if (totalMonths >= maxMonths) {
        // If maxMonths is reached, indicate no concrete date
        debtFreeDate.setFullYear(debtFreeDate.getFullYear() + 50) // Set far in the future
      } else {
        // If totalMonths is 0 (no debts), set to current date
        debtFreeDate.setMonth(debtFreeDate.getMonth())
      }

      console.log("[v0] Debt payoff calculation complete:", {
        totalInterest,
        totalMonths,
        debtFreeDate: debtFreeDate.toLocaleDateString(),
      })

      return {
        debts: debtPayoffDetails,
        totalInterest,
        totalMonths,
        debtFreeDate,
      }
    },
    [], // No dependencies as debts are passed as an argument
  )

  // CHANGE: Calculate both strategies for comparison
  const snowballPlan = useMemo(() => calculateDebtPayoff(debts, "snowball"), [debts, calculateDebtPayoff])
  const avalanchePlan = useMemo(() => calculateDebtPayoff(debts, "avalanche"), [debts, calculateDebtPayoff])
  const debtPayoffPlan = debtPayoffStrategy === "snowball" ? snowballPlan : avalanchePlan

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-blue-200 rounded-lg shadow-xl backdrop-blur-sm bg-opacity-95 transform transition-all duration-200 ease-in-out">
          <p className="font-semibold text-blue-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <p className="text-sm font-medium" style={{ color: entry.color }}>
                {entry.name}: ${entry.value?.toLocaleString() || 0}
              </p>
            </div>
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
  // CHANGE: Removed direct call to calculateDebtPayoff, it's now handled by useMemo hooks
  // const debtPayoffPlan = calculateDebtPayoff(debts, debtPayoffStrategy)

  // NEW FUNCTION DEFINITION for handleStrategyChange
  const handleStrategyChange = (strategy: "snowball" | "avalanche") => {
    setDebtPayoffStrategy(strategy)
    // No need to call calculateDebtPayoff here, as it's a dependency of debtPayoffPlan which will re-render
  }

  // Now only checks if user is signed in, not if they've started budgeting
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
                <Link href="/sign-in">
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
                Tutorial
              </Badge>
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
                <Button
                  asChild
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  <Link href="/sign-in">
                    <LogIn className="h-4 w-4 mr-1" />
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

  if (!hasStartedBudgeting && userBudgetEntries.length === 0) {
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

          {/* Budget Setup Prompt */}
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <PieChartIcon className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Set Your First Budget</h3>
              <p className="text-blue-800 mb-6 max-w-md mx-auto">
                Start by setting a budget for a category. This will help you track your spending and stay on target. You
                can add income later.
              </p>
              <div className="flex gap-4 justify-center">
                <Dialog open={showAddBudgetDialog} onOpenChange={setShowAddBudgetDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Set First Budget
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Set a Budget</DialogTitle>
                      <DialogDescription>
                        Choose a category and set a monthly budget amount. You can add income later.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="budget-category">Category</Label>
                        <select
                          id="budget-category"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          {DEFAULT_CATEGORIES.map((category) => (
                            <option key={category} value={category.toLowerCase()}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget-amount">Monthly Budget Amount ($)</Label>
                        <Input
                          id="budget-amount"
                          type="number"
                          placeholder="e.g., 500"
                          value={newBudgetAmount}
                          onChange={(e) => setNewBudgetAmount(e.target.value)}
                          className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <Button onClick={handleAddBudget} className="w-full bg-blue-600 hover:bg-blue-700">
                        Set Budget
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
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
                    <p className="text-sm text-gray-400">Add budgets and income to get AI-powered insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  } // Added missing closing brace for if statement

  // Main dashboard - show when user has data or has started budgeting
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
                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${getPriorityBorder(
                              notification.type,
                              notification.title,
                            )} ${!notification.read ? "bg-blue-50" : ""}`}
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
                console.log("[v0] AI Analysis button clicked")
                console.log("[v0] displayBudgetData:", displayBudgetData)
                console.log("[v0] totalIncome:", totalIncome)
                console.log("[v0] debts:", debts)

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

                console.log("[v0] AI Suggestions calculated:", aiSuggestions.length)

                // Tells the user how to use their money the best way
                const moneyOptimizationTips = []

                // Analyze spending efficiency
                const totalExpenses = displayBudgetData.reduce((sum, cat) => sum + cat.spent, 0)
                const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0

                console.log("[v0] Total expenses:", totalExpenses, "Savings rate:", savingsRate)

                // Emergency fund recommendation
                const monthlyExpenses = totalExpenses
                const recommendedEmergencyFund = monthlyExpenses * 6
                moneyOptimizationTips.push({
                  category: "Emergency Fund",
                  recommendation: `Build an emergency fund of $${(recommendedEmergencyFund || 0).toLocaleString()} (6 months of expenses)`,
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

                // Housing optimization (50/30/20 rule)
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

                console.log("[v0] Money optimization tips:", moneyOptimizationTips.length)

                // Send AI notifications
                console.log("[v0] Sending notifications...")
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

                setShowNotifications(true)

                console.log("[v0] AI Budget Analysis:", aiSuggestions)
                console.log("[v0] Money Optimization Tips:", moneyOptimizationTips)
                console.log("[v0] AI Analysis complete!")
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
                {/* Added null check for totalIncome */}
                <div className="text-2xl font-bold text-gray-900">${(totalIncome || 0).toLocaleString()}</div>
                <div className="text-xs text-gray-600">Total Income</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-900">${totalBudget.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Budgeted</div>
              </div>
              <div
                className={`text-center p-3 rounded-lg border ${
                  availableIncome >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                {/* Added null check for availableIncome */}
                <div className={`text-2xl font-bold ${availableIncome >= 0 ? "text-green-900" : "text-red-900"}`}>
                  ${(availableIncome || 0).toLocaleString()}
                </div>
                <div className={`text-sm ${availableIncome >= 0 ? "text-green-700" : "text-red-700"}`}>
                  {availableIncome >= 0 ? "Available for Budget" : "Over Budget"}
                </div>
              </div>
            </div>
            {availableIncome < 0 && (
              <Alert className="mt-4 border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {/* Added null check for availableIncome */}
                  Your budget exceeds your income by ${Math.abs(availableIncome || 0).toLocaleString()}. Consider adding
                  more income or reducing budget allocations.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
              <p className="text-xs text-blue-100">
                {shouldShowProgress ? "Monthly allocation" : "Set your budget to start tracking"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
              <p className="text-xs text-green-100">{shouldShowProgress ? "This month" : "No expenses tracked yet"}</p>
            </CardContent>
          </Card>

          {shouldShowProgress ? (
            <Card
              className={`bg-gradient-to-br ${
                overallHealth.status === "Good"
                  ? "from-green-500 to-green-600"
                  : overallHealth.status === "Needs Improvement"
                    ? "from-yellow-500 to-yellow-600"
                    : overallHealth.status === "Poor"
                      ? "from-red-500 to-red-600"
                      : overallHealth.status === "Excellent"
                        ? "from-green-500 to-green-600" // Default to green for "Excellent"
                        : "from-gray-500 to-gray-600" // Fallback for unexpected status
              } text-white`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget Health</CardTitle>
                <BarChart3 className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallHealth.percentage.toFixed(1)}%</div>
                <Progress value={overallHealth.percentage} className="mt-2 bg-white/20 [&>div]:bg-white" />
                <p className="text-xs mt-1 opacity-90">{overallHealth.status}</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-gray-300 to-gray-400 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget Health</CardTitle>
                <BarChart3 className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Not Set</div>
                <Progress value={0} className="mt-2 bg-gray-400" />
                <p className="text-xs mt-1 opacity-90">Add expenses to track progress</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Interactive Charts */}
        <div className="grid grid-cols-1 gap-6" data-tutorial="interactive-charts">
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
                    variant={showPieChart ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setShowPieChart(true)
                      // console.log("[v0] Chart rendering - pieChartData.length:", pieChartData.length, "budgetVsActualData.length:", budgetVsActualData.length, "showPieChart:", true)
                      // console.log("[v0] Rendering pie chart:", true)
                      // console.log("[v0] Rendering bar chart:", false)
                    }}
                  >
                    Pie Chart
                  </Button>
                  <Button
                    variant={!showPieChart ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setShowPieChart(false)
                      // console.log("[v0] Chart rendering - pieChartData.length:", pieChartData.length, "budgetVsActualData.length:", budgetVsActualData.length, "showPieChart:", false)
                      // console.log("[v0] Rendering pie chart:", false)
                      // console.log("[v0] Rendering bar chart:", true)
                    }}
                  >
                    Bar Chart
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {pieChartData.length > 0 && showPieChart && <CustomPieChart data={pieChartData} />}

              {!showPieChart && budgetVsActualData.length > 0 && (
                <div style={{ width: "100%", height: "400px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={400} height={300} data={budgetVsActualData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="budgeted" name="Budgeted" radius={[4, 4, 0, 0]} fill="#8884d8">
                        {budgetVsActualData.map((entry, index) => (
                          <Cell key={`budgeted-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                      <Bar dataKey="spent" name="Spent" radius={[4, 4, 0, 0]} fill="#82ca9d">
                        {budgetVsActualData.map((entry, index) => (
                          <Cell key={`spent-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Show empty state only if no data exists at all */}
              {pieChartData.length === 0 && budgetVsActualData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No spending data yet</p>
                  <p className="text-sm">Add expenses to see your spending breakdown</p>
                </div>
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
              {(() => {
                const hasMonthlyData = displayMonthlyData.some((month) => month.income > 0 || month.expenses > 0)
                console.log("[v0] Monthly trends chart - hasMonthlyData:", hasMonthlyData)
                console.log("[v0] Monthly trends chart - displayMonthlyData sample:", displayMonthlyData.slice(0, 2))

                return hasMonthlyData ? (
                  <div style={{ width: "100%", height: "300px" }}>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={displayMonthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <defs>
                          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#10B981" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#EF4444" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#EF4444" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="income"
                          stackId="1"
                          stroke="#10B981"
                          strokeWidth={3}
                          fill="url(#incomeGradient)"
                          name="Income"
                          dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: "#10B981", strokeWidth: 2 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="expenses"
                          stackId="2"
                          stroke="#EF4444"
                          strokeWidth={3}
                          fill="url(#expensesGradient)"
                          name="Expenses"
                          dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: "#EF4444", strokeWidth: 2 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="savings"
                          stackId="3"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          fill="url(#savingsGradient)"
                          name="Savings"
                          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p>No trend data yet</p>
                      <p className="text-sm text-gray-400">Add income and expenses to see trends</p>
                    </div>
                  </div>
                )
              })()}
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4 bg-transparent"
                        onClick={() => {
                          // Navigate based on the insight action type
                          if (insight.action === "Add Income") {
                            setShowAddIncomeDialog(true)
                          } else if (insight.action === "Review Budget" || insight.action === "Review Categories") {
                            // Stay on current page and scroll to categories tab
                            const tabsElement = document.querySelector('[data-tutorial="category-tabs"]')
                            if (tabsElement) {
                              tabsElement.scrollIntoView({ behavior: "smooth" })
                              // Removed duplicate tabsElement declaration and fixed the tab switching logic
                              const categoriesTab = document.querySelector('[value="categories"]') as HTMLButtonElement
                              if (categoriesTab) categoriesTab.click()
                            }
                          } else if (insight.action === "Allocate Savings" || insight.action === "Add Expenses") {
                            // Navigate to goals and planning section
                            window.location.href = "/goals"
                          } else {
                            // Default action - navigate to goals
                            window.location.href = "/goals"
                          }
                        }}
                      >
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
              {/* Added null check for availableIncome */}
              Available Income: ${(availableIncome || 0).toLocaleString()}
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
                      <div className="text-2xl font-bold text-blue-900">${totalBudget.toLocaleString()}</div>
                      <div className="text-sm text-blue-700">Budgeted</div>
                    </div>
                    <div
                      className={`p-4 rounded-lg border ${
                        availableIncome >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                      }`}
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
                                <div className="p-2 bg-white rounded-lg">
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
                          <div className="flex items-center gap-4 flex-1">
                            <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                              <category.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 text-lg">{category.name}</h3>
                              <p className="text-sm text-gray-600 truncate">
                                {/* CHANGE: Fixed syntax error and moved Budget Progress left by one character space */}
                                ${(category.spent || 0).toLocaleString()} of $
                                {(category.budgeted || 0).toLocaleString()} budget
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 ml-4">
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">{percentage.toFixed(0)}% used</div>
                              <div
                                className={`text-xs ${isOverBudget ? "text-red-600" : percentage > 80 ? "text-yellow-600" : "text-green-600"}`}
                              >
                                {isOverBudget ? "Over budget" : percentage > 80 ? "Near limit" : "On track"}
                              </div>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="shrink-0 bg-transparent">
                                  <Plus className="w-4 h-4 mr-1" />
                                  Add
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Add Expense to {category.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input
                                      id="amount"
                                      type="number"
                                      placeholder="0.00"
                                      value={newExpense.amount}
                                      onChange={(e) =>
                                        setNewExpense({
                                          ...newExpense,
                                          amount: Number.parseFloat(e.target.value) || 0,
                                        })
                                      }
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                      id="description"
                                      placeholder="What did you spend on?"
                                      value={newExpense.description}
                                      onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="budgetAmount">Budget Amount (Optional)</Label>
                                    <Input
                                      id="budgetAmount"
                                      type="number"
                                      placeholder="Set or update budget for this category"
                                      value={newExpense.budgetAmount || ""}
                                      onChange={(e) =>
                                        setNewExpense({
                                          ...newExpense,
                                          budgetAmount: Number.parseFloat(e.target.value) || 0,
                                        })
                                      }
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                      Current budget: ${(category.budgetAmount || 0).toLocaleString()}
                                    </p>
                                  </div>
                                  <Button
                                    onClick={() => {
                                      handleAddExpense(category.name)
                                      setNewExpense({ amount: 0, description: "", category: "", budgetAmount: 0 })
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
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-600 mb-3">
                            {/* CHANGE: Fixed syntax error and moved Budget Progress left by one character space */}
                            <span style={{ marginLeft: "-1ch" }}>Budget Progress - </span>
                            <span>{percentage.toFixed(1)}% used</span>
                          </div>
                          <Progress
                            value={percentage}
                            className={`h-4 ${
                              isOverBudget ? "bg-blue-100 [&>div]:bg-blue-500" : "bg-blue-200 [&>div]:bg-blue-500"
                            }`}
                          />
                          <div className="flex justify-between text-sm text-gray-600 mt-4">
                            <span
                              className={
                                percentage === 0
                                  ? "text-gray-500"
                                  : isOverBudget
                                    ? "text-red-600 font-medium"
                                    : "text-green-600"
                              }
                            >
                              {percentage === 0
                                ? "No spending yet"
                                : isOverBudget
                                  ? `$${((category.spent || 0) - (category.budgeted || 0)).toLocaleString()} over budget`
                                  : `$${((category.budgeted || 0) - (category.spent || 0)).toLocaleString()} remaining`}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  <div className="pt-4 border-t">
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setShowResetDialog(true)}
                      disabled={!isUserSignedUp}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset Current Month
                    </Button>
                  </div>
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
                    <p className="text-sm text-gray-600 mb-4">Start adding expenses to track your spending patterns.</p>
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
                          transaction.isAnomaly ? "border-red-200 bg-red-50" : "border-blue-200 bg-blue-50"
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
                            {/* Added null check for transaction.amount */}
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
                            {category.name} (Currently spending: ${(category.spent || 0).toLocaleString()})
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
                      {/* Added null check for whatIfResults.savings */}
                      <p className="text-2xl font-bold text-green-600">
                        ${(whatIfResults.savings || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-blue-700 mb-1">New Monthly Spending</p>
                      {/* Added null check for whatIfResults.newSpent */}
                      <p className="text-2xl font-bold text-blue-900">
                        ${(whatIfResults.newSpent || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-blue-700 mb-1">Annual Impact</p>
                      {/* Added null check for whatIfResults.annualImpact */}
                      <p className="text-2xl font-bold text-purple-600">
                        ${(whatIfResults.annualImpact || 0).toLocaleString()}
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
                        <ul className="text-sm text-green-700 mt-2 space-y-1">
                          <li>• Try meal planning and batch cooking on weekends</li>
                          <li>• Cook at home 4-5 times per week instead of ordering out</li>
                          <li>• Use grocery store apps for coupons and deals</li>
                          <li>• Consider generic brands for 20-30% savings</li>
                        </ul>
                      </div>
                    ) : whatIfScenario.category.includes("transportation") ? (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800 font-medium">🚗 Transportation Tips:</p>
                        <ul className="text-sm text-blue-700 mt-2 space-y-1">
                          <li>• Combine errands into single trips</li>
                          <li>• Use public transportation or carpool when possible</li>
                          <li>• Keep up with regular car maintenance to improve fuel efficiency</li>
                          <li>• Consider walking or biking for short distances</li>
                        </ul>
                      </div>
                    ) : (
                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-sm text-purple-800 font-medium">💡 General Savings Tips:</p>
                        <ul className="text-sm text-purple-700 mt-2 space-y-1">
                          <li>• Review and cancel unused subscriptions</li>
                          <li>• Set up automatic transfers to savings</li>
                          <li>• Use the 24-hour rule for non-essential purchases</li>
                          <li>• Look for free alternatives to paid services</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="debt" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Debt Payoff Strategy</CardTitle>
                <CardDescription>Choose a strategy to pay off your debts faster and save on interest.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Strategy Selection */}
                <div className="space-y-4">
                  <Label>Select Your Strategy</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                      className={`cursor-pointer transition-all ${
                        debtPayoffStrategy === "snowball"
                          ? "border-blue-500 border-2 bg-blue-50"
                          : "hover:border-gray-400"
                      }`}
                      onClick={() => {
                        console.log("[v0] Strategy changed to: snowball")
                        setDebtPayoffStrategy("snowball")
                      }}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Snowflake className="h-5 w-5" />
                          Debt Snowball
                        </CardTitle>
                        <CardDescription>Pay smallest balance first</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Build momentum by paying off your smallest debts first. Great for motivation and quick wins!
                        </p>
                        {debts.length > 0 && (
                          <div className="mt-4 p-3 bg-white rounded-lg border">
                            <p className="text-sm font-medium">With this strategy:</p>
                            <p className="text-2xl font-bold text-blue-600">
                              ${snowballPlan.totalInterest.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">Total interest paid</p>
                            <p className="text-sm mt-2">
                              Debt-free in{" "}
                              <span className="font-semibold">
                                {Math.floor(snowballPlan.totalMonths / 12)} years {snowballPlan.totalMonths % 12} months
                              </span>
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all ${
                        debtPayoffStrategy === "avalanche"
                          ? "border-blue-500 border-2 bg-blue-50"
                          : "hover:border-gray-400"
                      }`}
                      onClick={() => {
                        console.log("[v0] Strategy changed to: avalanche")
                        setDebtPayoffStrategy("avalanche")
                      }}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingDown className="h-5 w-5" />
                          Debt Avalanche
                        </Title>
                        <CardDescription>Pay highest interest first</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Save the most money by tackling high-interest debts first. Mathematically optimal!
                        </p>
                        {debts.length > 0 && (
                          <div className="mt-4 p-3 bg-white rounded-lg border">
                            <p className="text-sm font-medium">With this strategy:</p>
                            <p className="text-2xl font-bold text-green-600">
                              ${avalanchePlan.totalInterest.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">Total interest paid</p>
                            <p className="text-sm mt-2">
                              Debt-free in{" "}
                              <span className="font-semibold">
                                {Math.floor(avalanchePlan.totalMonths / 12)} years {avalanchePlan.totalMonths % 12}{" "}
                                months
                              </span>
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Strategy Comparison */}
                  {debts.length > 0 && (
                    <Card className="bg-gradient-to-r from-blue-50 to-green-50">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Potential Savings</p>
                            <p className="text-3xl font-bold text-green-600">
                              ${Math.abs(snowballPlan.totalInterest - avalanchePlan.totalInterest).toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {snowballPlan.totalInterest > avalanchePlan.totalInterest
                                ? "Save by choosing Avalanche"
                                : "Save by choosing Snowball"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-muted-foreground">Time Difference</p>
                            <p className="text-2xl font-bold">
                              {Math.abs(snowballPlan.totalMonths - avalanchePlan.totalMonths)} months
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {snowballPlan.totalMonths > avalanchePlan.totalMonths
                                ? "Faster with Avalanche"
                                : "Faster with Snowball"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Add Debt Button */}
                <Dialog open={showAddDebtDialog} onOpenChange={setShowAddDebtDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Debt
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Debt</DialogTitle>
                      <DialogDescription>
                        Enter the details of your debt to include it in your payoff plan.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="debt-name">Debt Name</Label>
                        <Input
                          id="debt-name"
                          type="text"
                          placeholder="e.g., Credit Card, Student Loan"
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
                        <Label htmlFor="debt-min-payment">Minimum Monthly Payment ($)</Label>
                        <Input
                          id="debt-min-payment"
                          type="number"
                          placeholder="e.g., 150"
                          value={newDebt.minPayment}
                          onChange={(e) => setNewDebt({ ...newDebt, minPayment: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="debt-interest-rate">Annual Interest Rate (%)</Label>
                        <Input
                          id="debt-interest-rate"
                          type="number"
                          step="0.01"
                          placeholder="e.g., 18.99"
                          value={newDebt.interestRate}
                          onChange={(e) => setNewDebt({ ...newDebt, interestRate: e.target.value })}
                        />
                      </div>
                      <Button
                        onClick={() => {
                          console.log("[v0] Add Debt button clicked")
                          console.log("[v0] New debt data:", newDebt)

                          // Validate input
                          if (
                            !newDebt.name.trim() ||
                            !newDebt.balance.trim() ||
                            !newDebt.minPayment.trim() ||
                            !newDebt.interestRate.trim()
                          ) {
                            console.log("[v0] Validation failed: missing fields")
                            alert("Please fill in all fields.")
                            return
                          }

                          const balance = Number.parseFloat(newDebt.balance)
                          const minPayment = Number.parseFloat(newDebt.minPayment)
                          const interestRate = Number.parseFloat(newDebt.interestRate)

                          if (isNaN(balance) || isNaN(minPayment) || isNaN(interestRate)) {
                            console.log("[v0] Validation failed: invalid numbers")
                            alert("Please enter valid numbers for balance, minimum payment, and interest rate.")
                            return
                          }

                          if (balance <= 0 || minPayment <= 0 || interestRate < 0) {
                            console.log("[v0] Validation failed: invalid values")
                            alert("Please enter positive values for balance and minimum payment.")
                            return
                          }

                          // Create new debt item
                          const newDebtItem: DebtItem = {
                            name: newDebt.name,
                            balance: balance,
                            minPayment: minPayment,
                            interestRate: interestRate,
                            priority: debts.length + 1, // Assign default priority
                          }

                          console.log("[v0] Adding new debt:", newDebtItem)

                          // Update debts state
                          setDebts([...debts, newDebtItem])

                          // Close the dialog
                          setShowAddDebtDialog(false)

                          // Reset newDebt state
                          setNewDebt({ name: "", balance: "", minPayment: "", interestRate: "" })

                          console.log("[v0] Debt added successfully. Total debts:", debts.length + 1)
                        }}
                        className="w-full"
                      >
                        Add Debt
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Debt Payoff Plan Table */}
                {debtPayoffPlan.debts.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Your Payoff Plan</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          console.log("[v0] Clearing all debts")
                          setDebts([])
                          if (isClerkLoaded && user) {
                            const storageKey = `wealthwise_debts_${user.id}`
                            localStorage.removeItem(storageKey)
                          } else {
                            const currentUser = localStorage.getItem('wealthwise_current_user') ||
                                               sessionStorage.getItem('wealthwise_session_user')
                            if (currentUser) {
                              const storageKey = `wealthwise_debts_${currentUser}`
                              localStorage.removeItem(storageKey)
                            }
                          }
                        }}
                      >
                        Clear All Debts
                      </Button>
                    </div>

                    {/* Debt-Free Countdown */}
                    {debtPayoffPlan.debtFreeDate && (
                      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm font-medium text-muted-foreground">Projected Debt-Free Date</p>
                            <p className="text-4xl font-bold text-green-600 my-2">
                              {debtPayoffPlan.debtFreeDate.toLocaleDateString("en-US", {
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              That's {debtPayoffPlan.totalMonths} months from now!
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order</TableHead>
                            <TableHead>Debt Name</TableHead>
                            <TableHead className="text-right">Balance</TableHead>
                            <TableHead className="text-right">Interest Rate</TableHead>
                            <TableHead className="text-right">Monthly Payment</TableHead>
                            <TableHead className="text-right">Time to Payoff</TableHead>
                            <TableHead className="text-right">Total Interest</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {debtPayoffPlan.debts.map((debt, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Badge variant={index === 0 ? "default" : "secondary"}>
                                  {index === 0 ? "Focus" : `#${debt.payoffOrder}`}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">{debt.name}</TableCell>
                              <TableCell className="text-right">${debt.balance.toLocaleString()}</TableCell>
                              <TableCell className="text-right">{debt.interestRate}%</TableCell>
                              <TableCell className="text-right">${debt.monthlyPayment.toLocaleString()}</TableCell>
                              <TableCell className="text-right">
                                {debt.canPayoff ? (
                                  <span className="text-green-600 font-medium">{debt.estimatedPayoff}</span>
                                ) : (
                                  <span className="text-red-600 font-medium">Cannot pay off</span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                {debt.canPayoff ? (
                                  `$${debt.totalInterest.toLocaleString()}`
                                ) : (
                                  <span className="text-red-600">N/A</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    console.log("[v0] Removing debt:", debt.name)
                                    setDebts(debts.filter((d) => d.name !== debt.name))
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Summary */}
                    <Card>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Debt</p>
                            <p className="text-2xl font-bold">
                              ${debtPayoffPlan.debts.reduce((sum, d) => sum + d.balance, 0).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Interest</p>
                            <p className="text-2xl font-bold text-orange-600">
                              ${debtPayoffPlan.totalInterest.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Monthly Payments</p>
                            <p className="text-2xl font-bold">
                              ${debtPayoffPlan.debts.reduce((sum, d) => sum + d.monthlyPayment, 0).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Motivational Message */}
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-900">Pro Tip</p>
                            <p className="text-sm text-blue-700 mt-1">
                              {debtPayoffStrategy === "snowball"
                                ? "Focus all extra payments on your smallest debt while making minimum payments on others. Once it's paid off, roll that payment into the next smallest debt!"
                                : "Focus all extra payments on your highest interest debt while making minimum payments on others. This saves you the most money in interest charges!"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Empty State */}
                {debts.length === 0 && (
                  <Card className="border-dashed">
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Debts Added Yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Add your debts to create a personalized payoff plan and see how much you can save!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CHANGE: Added reset confirmation dialog */}
        <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Current Month?</DialogTitle>
              <DialogDescription>
                This will move all of this month's expenses to the previous month, resetting your current month's
                spending to $0. Your transaction history and monthly trends data will be preserved.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowResetDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleResetCurrentMonth}>Confirm Reset</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default function BudgetPage() {
  return (
    <TutorialProvider>
      <BudgetDashboardContent />
    </TutorialProvider>
  )
}
