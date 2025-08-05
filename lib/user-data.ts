// User profile interface
interface UserProfile {
  firstName: string
  lastName: string
  email: string
  age: string
  riskTolerance: "conservative" | "moderate" | "aggressive"
  investmentExperience: "beginner" | "intermediate" | "advanced"
  timeHorizon: "short-term" | "medium-term" | "long-term"
  employmentStatus: string
  annualIncome: string
}

// Budget data interface
interface BudgetData {
  income: number
  expenses: Record<string, number>
  savings: number
}

// Goal interface
interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
  priority: "high" | "medium" | "low"
  completed: boolean
}

// Progress interface
interface UserProgress {
  completedLessons: number
  currentStreak: number
  totalPoints: number
  badges: string[]
  lastActivity: string
}

// Budget category interface
interface BudgetCategory {
  id: string
  name: string
  budgetAmount: number
  spent: number
  color: string
}

// Budget entry interface
interface BudgetEntry {
  id: string
  categoryId: string
  amount: number
  description: string
  date: string
  type: "income" | "expense"
}

// User data manager class
class UserDataManager {
  private storageKey = "financial-literacy-user-data"

  // Get all user data
  private getUserData() {
    if (typeof window === "undefined") return this.getDefaultData()

    try {
      const data = localStorage.getItem(this.storageKey)
      return data ? JSON.parse(data) : this.getDefaultData()
    } catch (error) {
      console.error("Error loading user data:", error)
      return this.getDefaultData()
    }
  }

  // Save user data
  private saveUserData(data: any) {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data))
    } catch (error) {
      console.error("Error saving user data:", error)
    }
  }

  // Get default data structure
  private getDefaultData() {
    return {
      profile: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        age: "28",
        riskTolerance: "moderate" as const,
        investmentExperience: "beginner" as const,
        timeHorizon: "long-term" as const,
        employmentStatus: "Full-time",
        annualIncome: "75000",
      },
      budgetData: {
        income: 6250, // Monthly income
        expenses: {
          housing: 2000,
          food: 600,
          transportation: 400,
          utilities: 200,
          entertainment: 300,
          healthcare: 150,
          other: 200,
        },
        savings: 15000,
      },
      goals: [
        {
          id: "1",
          title: "Emergency Fund",
          targetAmount: 25000,
          currentAmount: 15000,
          deadline: "2024-12-31",
          category: "Emergency",
          priority: "high" as const,
          completed: false,
        },
        {
          id: "2",
          title: "Vacation to Europe",
          targetAmount: 5000,
          currentAmount: 1200,
          deadline: "2024-08-15",
          category: "Travel",
          priority: "medium" as const,
          completed: false,
        },
      ],
      progress: {
        completedLessons: 8,
        currentStreak: 5,
        totalPoints: 850,
        badges: ["First Steps", "Budget Master", "Goal Setter"],
        lastActivity: new Date().toISOString(),
      },
      budgetCategories: [
        { id: "1", name: "Housing", budgetAmount: 2000, spent: 2000, color: "#ef4444" },
        { id: "2", name: "Food", budgetAmount: 600, spent: 580, color: "#f97316" },
        { id: "3", name: "Transportation", budgetAmount: 400, spent: 350, color: "#eab308" },
        { id: "4", name: "Utilities", budgetAmount: 200, spent: 185, color: "#22c55e" },
        { id: "5", name: "Entertainment", budgetAmount: 300, spent: 275, color: "#3b82f6" },
        { id: "6", name: "Healthcare", budgetAmount: 150, spent: 120, color: "#8b5cf6" },
        { id: "7", name: "Other", budgetAmount: 200, spent: 180, color: "#6b7280" },
      ],
      budgetEntries: [
        {
          id: "1",
          categoryId: "1",
          amount: 2000,
          description: "Monthly rent",
          date: "2024-01-01",
          type: "expense" as const,
        },
        {
          id: "2",
          categoryId: "2",
          amount: 120,
          description: "Groceries",
          date: "2024-01-03",
          type: "expense" as const,
        },
        {
          id: "3",
          categoryId: "3",
          amount: 60,
          description: "Gas",
          date: "2024-01-05",
          type: "expense" as const,
        },
      ],
    }
  }

  // User profile methods
  getUserProfile(): UserProfile {
    return this.getUserData().profile
  }

  updateUserProfile(profile: Partial<UserProfile>) {
    const data = this.getUserData()
    data.profile = { ...data.profile, ...profile }
    this.saveUserData(data)
  }

  // Budget data methods
  getBudgetData(): BudgetData {
    return this.getUserData().budgetData
  }

  updateBudgetData(budgetData: Partial<BudgetData>) {
    const data = this.getUserData()
    data.budgetData = { ...data.budgetData, ...budgetData }
    this.saveUserData(data)
  }

  hasStartedBudgeting(): boolean {
    const budgetData = this.getBudgetData()
    return budgetData.income > 0 || Object.keys(budgetData.expenses).length > 0
  }

  // Goals methods
  getGoals(): Goal[] {
    return this.getUserData().goals || []
  }

  addGoal(goal: Omit<Goal, "id">) {
    const data = this.getUserData()
    const newGoal = { ...goal, id: Date.now().toString() }
    data.goals = [...(data.goals || []), newGoal]
    this.saveUserData(data)
    return newGoal
  }

  updateGoal(goalId: string, updates: Partial<Goal>) {
    const data = this.getUserData()
    data.goals = data.goals.map((goal: Goal) => (goal.id === goalId ? { ...goal, ...updates } : goal))
    this.saveUserData(data)
  }

  deleteGoal(goalId: string) {
    const data = this.getUserData()
    data.goals = data.goals.filter((goal: Goal) => goal.id !== goalId)
    this.saveUserData(data)
  }

  // Progress methods
  getUserProgress(): UserProgress {
    return this.getUserData().progress
  }

  updateProgress(progress: Partial<UserProgress>) {
    const data = this.getUserData()
    data.progress = { ...data.progress, ...progress }
    this.saveUserData(data)
  }

  completeLesson(lessonId: string) {
    const progress = this.getUserProgress()
    this.updateProgress({
      completedLessons: progress.completedLessons + 1,
      totalPoints: progress.totalPoints + 50,
      lastActivity: new Date().toISOString(),
    })
  }

  // Budget categories methods
  getBudgetCategories(): BudgetCategory[] {
    return this.getUserData().budgetCategories || []
  }

  addBudgetCategory(category: Omit<BudgetCategory, "id">) {
    const data = this.getUserData()
    const newCategory = { ...category, id: Date.now().toString() }
    data.budgetCategories = [...(data.budgetCategories || []), newCategory]
    this.saveUserData(data)
    return newCategory
  }

  updateBudgetCategory(categoryId: string, updates: Partial<BudgetCategory>) {
    const data = this.getUserData()
    data.budgetCategories = data.budgetCategories.map((category: BudgetCategory) =>
      category.id === categoryId ? { ...category, ...updates } : category,
    )
    this.saveUserData(data)
  }

  deleteBudgetCategory(categoryId: string) {
    const data = this.getUserData()
    data.budgetCategories = data.budgetCategories.filter((category: BudgetCategory) => category.id !== categoryId)
    this.saveUserData(data)
  }

  // Budget entries methods
  getBudgetEntries(): BudgetEntry[] {
    return this.getUserData().budgetEntries || []
  }

  addBudgetEntry(entry: Omit<BudgetEntry, "id">) {
    const data = this.getUserData()
    const newEntry = { ...entry, id: Date.now().toString() }
    data.budgetEntries = [...(data.budgetEntries || []), newEntry]
    this.saveUserData(data)
    return newEntry
  }

  updateBudgetEntry(entryId: string, updates: Partial<BudgetEntry>) {
    const data = this.getUserData()
    data.budgetEntries = data.budgetEntries.map((entry: BudgetEntry) =>
      entry.id === entryId ? { ...entry, ...updates } : entry,
    )
    this.saveUserData(data)
  }

  deleteBudgetEntry(entryId: string) {
    const data = this.getUserData()
    data.budgetEntries = data.budgetEntries.filter((entry: BudgetEntry) => entry.id !== entryId)
    this.saveUserData(data)
  }

  // Utility methods
  getTotalMonthlyExpenses(): number {
    const budgetData = this.getBudgetData()
    return Object.values(budgetData.expenses).reduce((sum, expense) => sum + expense, 0)
  }

  getMonthlyLeftover(): number {
    const budgetData = this.getBudgetData()
    const totalExpenses = this.getTotalMonthlyExpenses()
    return budgetData.income - totalExpenses
  }

  getSavingsRate(): number {
    const budgetData = this.getBudgetData()
    const leftover = this.getMonthlyLeftover()
    return budgetData.income > 0 ? (leftover / budgetData.income) * 100 : 0
  }

  getEmergencyFundMonths(): number {
    const budgetData = this.getBudgetData()
    const totalExpenses = this.getTotalMonthlyExpenses()
    return totalExpenses > 0 ? budgetData.savings / totalExpenses : 0
  }

  // Clear all data
  clearAllData() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.storageKey)
    }
  }
}

// Create singleton instance
export const userDataManager = new UserDataManager()

// Export function for server-side usage
export function getUserData() {
  return {
    profile: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      age: "28",
      riskTolerance: "moderate" as const,
      investmentExperience: "beginner" as const,
      timeHorizon: "long-term" as const,
      employmentStatus: "Full-time",
      annualIncome: "75000",
    },
    budgetData: {
      income: 6250,
      expenses: {
        housing: 2000,
        food: 600,
        transportation: 400,
        utilities: 200,
        entertainment: 300,
        healthcare: 150,
        other: 200,
      },
      savings: 15000,
    },
    goals: [
      {
        id: "1",
        title: "Emergency Fund",
        targetAmount: 25000,
        currentAmount: 15000,
        deadline: "2024-12-31",
        category: "Emergency",
        priority: "high" as const,
        completed: false,
      },
      {
        id: "2",
        title: "Vacation to Europe",
        targetAmount: 5000,
        currentAmount: 1200,
        deadline: "2024-08-15",
        category: "Travel",
        priority: "medium" as const,
        completed: false,
      },
    ],
    progress: {
      completedLessons: 8,
      currentStreak: 5,
      totalPoints: 850,
      badges: ["First Steps", "Budget Master", "Goal Setter"],
      lastActivity: new Date().toISOString(),
    },
  }
}

// Export types
export type { UserProfile, BudgetData, Goal, UserProgress, BudgetCategory, BudgetEntry }
