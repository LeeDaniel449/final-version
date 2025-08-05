// User profile interface
export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  age: number
  riskTolerance: "conservative" | "moderate" | "aggressive"
  investmentExperience: "beginner" | "intermediate" | "advanced"
  timeHorizon: "short" | "medium" | "long"
  annualIncome: number
  employmentStatus: "employed" | "self-employed" | "unemployed" | "retired" | "student"
  dependents: number
}

// Budget data interface
export interface BudgetData {
  income: number
  expenses: {
    housing: number
    transportation: number
    food: number
    utilities: number
    insurance: number
    healthcare: number
    entertainment: number
    shopping: number
    other: number
  }
  savings: number
}

// Financial goal interface
export interface FinancialGoal {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  targetDate: string
  category: "emergency" | "retirement" | "house" | "education" | "vacation" | "other"
  priority: "high" | "medium" | "low"
  status: "active" | "completed" | "paused"
}

// User progress interface
export interface UserProgress {
  completedLessons: number
  totalLessons: number
  currentStreak: number
  longestStreak: number
  pointsEarned: number
  level: number
  badges: string[]
  lastActivity: string
}

// Budget category interface
export interface BudgetCategory {
  id: string
  name: string
  budgeted: number
  spent: number
  remaining: number
  color: string
}

// Budget entry interface
export interface BudgetEntry {
  id: string
  date: string
  description: string
  amount: number
  category: string
  type: "income" | "expense"
}

// Sample user data
const sampleUserProfile: UserProfile = {
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.johnson@example.com",
  age: 28,
  riskTolerance: "moderate",
  investmentExperience: "beginner",
  timeHorizon: "long",
  annualIncome: 75000,
  employmentStatus: "employed",
  dependents: 0,
}

const sampleBudgetData: BudgetData = {
  income: 6250, // Monthly income
  expenses: {
    housing: 2000,
    transportation: 400,
    food: 600,
    utilities: 200,
    insurance: 300,
    healthcare: 150,
    entertainment: 300,
    shopping: 250,
    other: 200,
  },
  savings: 15000,
}

const sampleGoals: FinancialGoal[] = [
  {
    id: "1",
    title: "Emergency Fund",
    description: "Build 6 months of expenses for emergencies",
    targetAmount: 25000,
    currentAmount: 15000,
    targetDate: "2024-12-31",
    category: "emergency",
    priority: "high",
    status: "active",
  },
  {
    id: "2",
    title: "House Down Payment",
    description: "Save for 20% down payment on a home",
    targetAmount: 60000,
    currentAmount: 12000,
    targetDate: "2026-06-30",
    category: "house",
    priority: "high",
    status: "active",
  },
  {
    id: "3",
    title: "Vacation Fund",
    description: "Save for a trip to Europe",
    targetAmount: 5000,
    currentAmount: 1200,
    targetDate: "2024-08-15",
    category: "vacation",
    priority: "medium",
    status: "active",
  },
]

const sampleProgress: UserProgress = {
  completedLessons: 12,
  totalLessons: 25,
  currentStreak: 5,
  longestStreak: 14,
  pointsEarned: 2400,
  level: 3,
  badges: ["First Steps", "Budget Master", "Goal Setter"],
  lastActivity: "2024-01-15",
}

const sampleBudgetCategories: BudgetCategory[] = [
  {
    id: "housing",
    name: "Housing",
    budgeted: 2000,
    spent: 2000,
    remaining: 0,
    color: "#3B82F6",
  },
  {
    id: "food",
    name: "Food & Dining",
    budgeted: 600,
    spent: 520,
    remaining: 80,
    color: "#10B981",
  },
  {
    id: "transportation",
    name: "Transportation",
    budgeted: 400,
    spent: 380,
    remaining: 20,
    color: "#F59E0B",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    budgeted: 300,
    spent: 280,
    remaining: 20,
    color: "#8B5CF6",
  },
  {
    id: "utilities",
    name: "Utilities",
    budgeted: 200,
    spent: 195,
    remaining: 5,
    color: "#EF4444",
  },
]

const sampleBudgetEntries: BudgetEntry[] = [
  {
    id: "1",
    date: "2024-01-15",
    description: "Salary",
    amount: 6250,
    category: "income",
    type: "income",
  },
  {
    id: "2",
    date: "2024-01-01",
    description: "Rent Payment",
    amount: -2000,
    category: "housing",
    type: "expense",
  },
  {
    id: "3",
    date: "2024-01-03",
    description: "Grocery Shopping",
    amount: -120,
    category: "food",
    type: "expense",
  },
  {
    id: "4",
    date: "2024-01-05",
    description: "Gas Station",
    amount: -45,
    category: "transportation",
    type: "expense",
  },
  {
    id: "5",
    date: "2024-01-07",
    description: "Movie Night",
    amount: -25,
    category: "entertainment",
    type: "expense",
  },
]

// User data manager class
class UserDataManager {
  private userProfile: UserProfile = sampleUserProfile
  private budgetData: BudgetData = sampleBudgetData
  private goals: FinancialGoal[] = sampleGoals
  private progress: UserProgress = sampleProgress
  private budgetCategories: BudgetCategory[] = sampleBudgetCategories
  private budgetEntries: BudgetEntry[] = sampleBudgetEntries

  // User Profile Methods
  getUserProfile(): UserProfile {
    return this.userProfile
  }

  updateUserProfile(profile: Partial<UserProfile>): void {
    this.userProfile = { ...this.userProfile, ...profile }
  }

  // Budget Data Methods
  getBudgetData(): BudgetData {
    return this.budgetData
  }

  updateBudgetData(budget: Partial<BudgetData>): void {
    this.budgetData = { ...this.budgetData, ...budget }
  }

  updateBudgetExpenses(expenses: Partial<BudgetData["expenses"]>): void {
    this.budgetData.expenses = { ...this.budgetData.expenses, ...expenses }
  }

  // Goals Methods
  getGoals(): FinancialGoal[] {
    return this.goals
  }

  addGoal(goal: FinancialGoal): void {
    this.goals.push(goal)
  }

  updateGoal(goalId: string, updates: Partial<FinancialGoal>): void {
    const goalIndex = this.goals.findIndex((g) => g.id === goalId)
    if (goalIndex !== -1) {
      this.goals[goalIndex] = { ...this.goals[goalIndex], ...updates }
    }
  }

  deleteGoal(goalId: string): void {
    this.goals = this.goals.filter((g) => g.id !== goalId)
  }

  // Progress Methods
  getUserProgress(): UserProgress {
    return this.progress
  }

  updateProgress(progress: Partial<UserProgress>): void {
    this.progress = { ...this.progress, ...progress }
  }

  completeLesson(): void {
    this.progress.completedLessons += 1
    this.progress.pointsEarned += 100
    this.progress.currentStreak += 1
    if (this.progress.currentStreak > this.progress.longestStreak) {
      this.progress.longestStreak = this.progress.currentStreak
    }
    this.progress.lastActivity = new Date().toISOString().split("T")[0]
  }

  // Budget Categories Methods
  getBudgetCategories(): BudgetCategory[] {
    return this.budgetCategories
  }

  updateBudgetCategory(categoryId: string, updates: Partial<BudgetCategory>): void {
    const categoryIndex = this.budgetCategories.findIndex((c) => c.id === categoryId)
    if (categoryIndex !== -1) {
      this.budgetCategories[categoryIndex] = { ...this.budgetCategories[categoryIndex], ...updates }
    }
  }

  // Budget Entries Methods
  getBudgetEntries(): BudgetEntry[] {
    return this.budgetEntries
  }

  addBudgetEntry(entry: BudgetEntry): void {
    this.budgetEntries.push(entry)
  }

  updateBudgetEntry(entryId: string, updates: Partial<BudgetEntry>): void {
    const entryIndex = this.budgetEntries.findIndex((e) => e.id === entryId)
    if (entryIndex !== -1) {
      this.budgetEntries[entryIndex] = { ...this.budgetEntries[entryIndex], ...updates }
    }
  }

  deleteBudgetEntry(entryId: string): void {
    this.budgetEntries = this.budgetEntries.filter((e) => e.id !== entryId)
  }

  // Utility Methods
  getNetWorth(): number {
    return this.budgetData.savings // Simplified calculation
  }

  getMonthlyLeftover(): number {
    const totalExpenses = Object.values(this.budgetData.expenses).reduce((sum, expense) => sum + expense, 0)
    return this.budgetData.income - totalExpenses
  }

  getSavingsRate(): number {
    const monthlyLeftover = this.getMonthlyLeftover()
    return this.budgetData.income > 0 ? (monthlyLeftover / this.budgetData.income) * 100 : 0
  }

  getGoalProgress(goalId: string): number {
    const goal = this.goals.find((g) => g.id === goalId)
    return goal ? (goal.currentAmount / goal.targetAmount) * 100 : 0
  }

  // Reset Methods (for testing)
  resetToDefaults(): void {
    this.userProfile = sampleUserProfile
    this.budgetData = sampleBudgetData
    this.goals = [...sampleGoals]
    this.progress = sampleProgress
    this.budgetCategories = [...sampleBudgetCategories]
    this.budgetEntries = [...sampleBudgetEntries]
  }
}

// Export singleton instance
export const userDataManager = new UserDataManager()

// Export function for API routes
export function getUserData() {
  return {
    profile: userDataManager.getUserProfile(),
    budgetData: userDataManager.getBudgetData(),
    goals: userDataManager.getGoals(),
    progress: userDataManager.getUserProgress(),
    budgetCategories: userDataManager.getBudgetCategories(),
    budgetEntries: userDataManager.getBudgetEntries(),
  }
}

// Export types
export type { UserProfile, BudgetData, FinancialGoal, UserProgress, BudgetCategory, BudgetEntry }
