// User profile interface
export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  age: number
  occupation: string
  experience: string
  goals: string[]
  incomeRange: string
  riskTolerance: string
  isOnboarded: boolean
  signedUpAt: string
}

// Budget data interface
export interface BudgetData {
  income: number
  expenses: Record<string, number>
  savings: number
  lastUpdated: string
}

// Goal interface
export interface Goal {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
  priority: "high" | "medium" | "low"
  status: "active" | "completed" | "paused"
  createdAt: string
}

// Progress interface
export interface UserProgress {
  completedLessons: number
  totalLessons: number
  currentStreak: number
  longestStreak: number
  totalTimeSpent: number
  lastActiveDate: string
  achievements: string[]
  level: number
  xp: number
}

// Budget category interface
export interface BudgetCategory {
  id: string
  name: string
  budgetAmount: number
  spendingLimit: number
  color: string
  icon: string
}

// Budget entry interface
export interface BudgetEntry {
  id: string
  amount: number
  category: string
  description: string
  date: string
  type: "income" | "expense"
}

// Learning progress interface
interface LearningProgress {
  completedModules: string[]
  currentModule: string | null
  totalProgress: number
  achievements: string[]
}

// Registered user interface
interface RegisteredUser {
  profile: UserProfile
  budgetData: BudgetData
  goals: Goal[]
  learningProgress: LearningProgress
  userProgress: UserProgress
  createdAt: string
  lastSignIn: string
}

// User data interface
interface UserData {
  isSignedIn: boolean
  profile: UserProfile
  budgetData: BudgetData
  goals: Goal[]
}

// Default user data structure
const defaultUserData: UserData = {
  isSignedIn: false,
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    occupation: "",
    experience: "",
    goals: [],
    incomeRange: "",
    riskTolerance: "",
    isOnboarded: false,
    signedUpAt: "",
  },
  budgetData: {
    income: 0,
    expenses: {},
    savings: 0,
    lastUpdated: new Date().toISOString(),
  },
  goals: [],
}

// Storage key for localStorage
const STORAGE_KEY = "financial_app_user_data"

// Event name for user data changes
const USER_DATA_CHANGED_EVENT = "userDataChanged"

// Declare learningModules variable
const learningModules = [
  { id: "1", lessons: 5 },
  { id: "2", lessons: 3 },
  { id: "3", lessons: 4 },
]

class UserDataManager {
  private storageKey = "wealthwise_user_data"
  private profileKey = "wealthwise_user_profile"
  private budgetKey = "wealthwise_budget_data"
  private goalsKey = "wealthwise_goals"
  private progressKey = "wealthwise_progress"
  private categoriesKey = "wealthwise_budget_categories"
  private entriesKey = "wealthwise_budget_entries"
  private signedInKey = "wealthwise_signed_in"

  private defaultProfile: UserProfile = {
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    occupation: "",
    experience: "",
    goals: [],
    incomeRange: "",
    riskTolerance: "",
    isOnboarded: false,
    signedUpAt: "",
  }

  private defaultBudgetData: BudgetData = {
    income: 0,
    expenses: {},
    savings: 0,
    lastUpdated: new Date().toISOString(),
  }

  private defaultLearningProgress: LearningProgress = {
    completedModules: [],
    currentModule: null,
    totalProgress: 0,
    achievements: [],
  }

  private defaultUserProgress: UserProgress = {
    completedLessons: 0,
    totalLessons: 20,
    currentStreak: 0,
    longestStreak: 0,
    totalTimeSpent: 0,
    lastActiveDate: new Date().toISOString(),
    achievements: [],
    level: 1,
    xp: 0,
  }

  private userData: UserData
  private listeners: Set<() => void> = new Set()

  constructor() {
    this.userData = this.loadFromStorage()
  }

  // Load user data from localStorage
  private loadFromStorage(): UserData {
    if (typeof window === "undefined") {
      return { ...defaultUserData }
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Merge with default data to ensure all properties exist
        return {
          ...defaultUserData,
          ...parsed,
          profile: { ...defaultUserData.profile, ...parsed.profile },
          budgetData: {
            ...defaultUserData.budgetData,
            ...parsed.budgetData,
            expenses: { ...defaultUserData.budgetData.expenses, ...parsed.budgetData?.expenses },
          },
          goals: parsed.goals || [],
        }
      }
    } catch (error) {
      console.error("Error loading user data from storage:", error)
    }

    return { ...defaultUserData }
  }

  // Save user data to localStorage
  private saveToStorage(): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.userData))
      this.notifyListeners()
      // Dispatch custom event for components that don't use the manager directly
      window.dispatchEvent(
        new CustomEvent(USER_DATA_CHANGED_EVENT, {
          detail: this.userData,
        }),
      )
    } catch (error) {
      console.error("Error saving user data to storage:", error)
    }
  }

  // Notify all listeners of data changes
  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      try {
        listener()
      } catch (error) {
        console.error("Error in user data listener:", error)
      }
    })
  }

  // Subscribe to user data changes
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  // User Authentication
  isUserSignedIn(): boolean {
    if (typeof window === "undefined") return false
    return localStorage.getItem(this.signedInKey) === "true"
  }

  isUserSignedUp(): boolean {
    return this.isUserSignedIn()
  }

  signInUser(email: string): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.signedInKey, "true")
    localStorage.setItem("wealthwise_user_email", email)
  }

  signOutUser(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.signedInKey)
    localStorage.removeItem("wealthwise_user_email")
  }

  // User Profile Management
  getUserProfile(): UserProfile | null {
    if (typeof window === "undefined") return null
    const profile = localStorage.getItem(this.profileKey)
    return profile ? JSON.parse(profile) : null
  }

  saveUserProfile(profile: UserProfile): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.profileKey, JSON.stringify(profile))
  }

  updateUserProfile(updates: Partial<UserProfile>): void {
    const currentProfile = this.getUserProfile()
    if (currentProfile) {
      const updatedProfile = { ...currentProfile, ...updates }
      this.saveUserProfile(updatedProfile)
    }
  }

  // Budget Data Management
  getBudgetData(): BudgetData {
    if (typeof window === "undefined") {
      return {
        income: 0,
        expenses: {},
        savings: 0,
        lastUpdated: new Date().toISOString(),
      }
    }
    const data = localStorage.getItem(this.budgetKey)
    return data
      ? JSON.parse(data)
      : {
          income: 0,
          expenses: {},
          savings: 0,
          lastUpdated: new Date().toISOString(),
        }
  }

  saveBudgetData(data: BudgetData): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.budgetKey, JSON.stringify(data))
  }

  updateBudgetData(updates: Partial<BudgetData>): void {
    const currentData = this.getBudgetData()
    const updatedData = { ...currentData, ...updates, lastUpdated: new Date().toISOString() }
    this.saveBudgetData(updatedData)
  }

  // Goals Management
  getGoals(): Goal[] {
    if (typeof window === "undefined") return []
    const goals = localStorage.getItem(this.goalsKey)
    return goals ? JSON.parse(goals) : []
  }

  saveGoals(goals: Goal[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.goalsKey, JSON.stringify(goals))
  }

  addGoal(goal: Omit<Goal, "id" | "createdAt">): void {
    const goals = this.getGoals()
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    goals.push(newGoal)
    this.saveGoals(goals)
  }

  updateGoal(id: string, updates: Partial<Goal>): void {
    const goals = this.getGoals()
    const index = goals.findIndex((goal) => goal.id === id)
    if (index !== -1) {
      goals[index] = { ...goals[index], ...updates }
      this.saveGoals(goals)
    }
  }

  deleteGoal(id: string): void {
    const goals = this.getGoals().filter((goal) => goal.id !== id)
    this.saveGoals(goals)
  }

  // User Progress Management
  getUserProgress(): UserProgress {
    if (typeof window === "undefined") {
      return {
        completedLessons: 0,
        totalLessons: 20,
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        lastActiveDate: new Date().toISOString(),
        achievements: [],
        level: 1,
        xp: 0,
      }
    }
    const progress = localStorage.getItem(this.progressKey)
    return progress
      ? JSON.parse(progress)
      : {
          completedLessons: 0,
          totalLessons: 20,
          currentStreak: 0,
          longestStreak: 0,
          totalTimeSpent: 0,
          lastActiveDate: new Date().toISOString(),
          achievements: [],
          level: 1,
          xp: 0,
        }
  }

  saveUserProgress(progress: UserProgress): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.progressKey, JSON.stringify(progress))
  }

  updateUserProgress(updates: Partial<UserProgress>): void {
    const currentProgress = this.getUserProgress()
    const updatedProgress = { ...currentProgress, ...updates }
    this.saveUserProgress(updatedProgress)
  }

  // Budget Categories Management
  getBudgetCategories(): BudgetCategory[] {
    if (typeof window === "undefined") return this.getDefaultCategories()
    const categories = localStorage.getItem(this.categoriesKey)
    return categories ? JSON.parse(categories) : this.getDefaultCategories()
  }

  private getDefaultCategories(): BudgetCategory[] {
    return [
      { id: "1", name: "Housing", budgetAmount: 0, spendingLimit: 0, color: "#3B82F6", icon: "home" },
      { id: "2", name: "Transportation", budgetAmount: 0, spendingLimit: 0, color: "#8B5CF6", icon: "car" },
      { id: "3", name: "Food & Dining", budgetAmount: 0, spendingLimit: 0, color: "#10B981", icon: "coffee" },
      { id: "4", name: "Shopping", budgetAmount: 0, spendingLimit: 0, color: "#F59E0B", icon: "shopping-cart" },
      { id: "5", name: "Entertainment", budgetAmount: 0, spendingLimit: 0, color: "#EF4444", icon: "gamepad-2" },
      { id: "6", name: "Healthcare", budgetAmount: 0, spendingLimit: 0, color: "#EC4899", icon: "heart" },
      { id: "7", name: "Utilities", budgetAmount: 0, spendingLimit: 0, color: "#06B6D4", icon: "phone" },
      { id: "8", name: "Travel", budgetAmount: 0, spendingLimit: 0, color: "#84CC16", icon: "plane" },
    ]
  }

  saveBudgetCategories(categories: BudgetCategory[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.categoriesKey, JSON.stringify(categories))
  }

  updateBudgetCategory(categoryName: string, updates: Partial<BudgetCategory>): void {
    const categories = this.getBudgetCategories()
    const index = categories.findIndex((cat) => cat.name.toLowerCase() === categoryName.toLowerCase())
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updates }
      this.saveBudgetCategories(categories)
    }
  }

  // Budget Entries Management
  getBudgetEntries(): BudgetEntry[] {
    if (typeof window === "undefined") return []
    const entries = localStorage.getItem(this.entriesKey)
    return entries ? JSON.parse(entries) : []
  }

  saveBudgetEntries(entries: BudgetEntry[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.entriesKey, JSON.stringify(entries))
  }

  addBudgetEntry(entry: Omit<BudgetEntry, "id">): void {
    const entries = this.getBudgetEntries()
    const newEntry: BudgetEntry = {
      ...entry,
      id: Date.now().toString(),
    }
    entries.push(newEntry)
    this.saveBudgetEntries(entries)
  }

  // Helper Methods
  hasStartedBudgeting(): boolean {
    const categories = this.getBudgetCategories()
    const entries = this.getBudgetEntries()
    return categories.some((cat) => cat.budgetAmount > 0) || entries.length > 0
  }

  getTotalBudget(): number {
    return this.getBudgetCategories().reduce((sum, cat) => sum + cat.budgetAmount, 0)
  }

  getTotalSpent(): number {
    return this.getBudgetEntries()
      .filter((entry) => entry.type === "expense")
      .reduce((sum, entry) => sum + entry.amount, 0)
  }

  // Clear all data (for testing/reset)
  clearAllData(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.profileKey)
    localStorage.removeItem(this.budgetKey)
    localStorage.removeItem(this.goalsKey)
    localStorage.removeItem(this.progressKey)
    localStorage.removeItem(this.categoriesKey)
    localStorage.removeItem(this.entriesKey)
    localStorage.removeItem(this.signedInKey)
  }
}

export const userDataManager = new UserDataManager()

// Server-side export for API routes
export function getUserDataForAPI() {
  return {
    profile: userDataManager.getUserProfile(),
    budgetData: userDataManager.getBudgetData(),
    goals: userDataManager.getGoals(),
    progress: userDataManager.getUserProgress(),
    budgetCategories: userDataManager.getBudgetCategories(),
    budgetEntries: userDataManager.getBudgetEntries(),
  }
}
