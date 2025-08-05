// User data management for the financial literacy app
interface UserProfile {
  name: string
  email: string
  age: number
  riskTolerance: "conservative" | "moderate" | "aggressive"
  investmentExperience: "beginner" | "intermediate" | "advanced"
  timeHorizon: string
  isSignedIn: boolean
}

interface BudgetData {
  income: number
  expenses: {
    housing: number
    food: number
    transportation: number
    entertainment: number
    healthcare: number
    other: number
  }
  savings: number
}

interface Goal {
  id: string
  title: string
  target: number
  current: number
  deadline: string
  priority: "high" | "medium" | "low"
}

interface BudgetCategory {
  id: string
  name: string
  budgeted: number
  spent: number
  color: string
}

interface BudgetEntry {
  id: string
  categoryId: string
  amount: number
  description: string
  date: string
}

interface UserProgress {
  completedModules: string[]
  totalPoints: number
  currentStreak: number
  achievements: string[]
}

class UserDataManager {
  private storageKey = "financial-app-data"
  private registeredUsersKey = "financial-app-registered-users"

  // Get current session data
  private getSessionData() {
    if (typeof window === "undefined") return null
    try {
      const data = localStorage.getItem(this.storageKey)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  }

  // Save session data
  private saveSessionData(data: any) {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data))
    } catch (error) {
      console.error("Failed to save session data:", error)
    }
  }

  // Get registered users data
  private getRegisteredUsers() {
    if (typeof window === "undefined") return {}
    try {
      const data = localStorage.getItem(this.registeredUsersKey)
      return data ? JSON.parse(data) : {}
    } catch {
      return {}
    }
  }

  // Save registered users data
  private saveRegisteredUsers(users: any) {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(this.registeredUsersKey, JSON.stringify(users))
    } catch (error) {
      console.error("Failed to save registered users:", error)
    }
  }

  // Initialize default data structure
  private getDefaultData() {
    return {
      profile: {
        name: "",
        email: "",
        age: 25,
        riskTolerance: "moderate" as const,
        investmentExperience: "beginner" as const,
        timeHorizon: "5-10 years",
        isSignedIn: false,
      },
      budgetData: {
        income: 0,
        expenses: {
          housing: 0,
          food: 0,
          transportation: 0,
          entertainment: 0,
          healthcare: 0,
          other: 0,
        },
        savings: 0,
      },
      goals: [] as Goal[],
      budgetCategories: [] as BudgetCategory[],
      budgetEntries: [] as BudgetEntry[],
      progress: {
        completedModules: [],
        totalPoints: 0,
        currentStreak: 0,
        achievements: [],
      },
    }
  }

  // Get user profile
  getUserProfile(): UserProfile {
    const data = this.getSessionData() || this.getDefaultData()
    return data.profile
  }

  // Update user profile
  updateUserProfile(updates: Partial<UserProfile>) {
    const data = this.getSessionData() || this.getDefaultData()
    data.profile = { ...data.profile, ...updates }
    this.saveSessionData(data)

    // If user is signed in, also save to registered users
    if (data.profile.isSignedIn && data.profile.email) {
      const users = this.getRegisteredUsers()
      users[data.profile.email] = data
      this.saveRegisteredUsers(users)
    }
  }

  // Get budget data
  getBudgetData(): BudgetData {
    const data = this.getSessionData() || this.getDefaultData()
    return data.budgetData
  }

  // Update budget data
  updateBudgetData(updates: Partial<BudgetData>) {
    const data = this.getSessionData() || this.getDefaultData()
    data.budgetData = { ...data.budgetData, ...updates }
    this.saveSessionData(data)

    // If user is signed in, also save to registered users
    if (data.profile.isSignedIn && data.profile.email) {
      const users = this.getRegisteredUsers()
      users[data.profile.email] = data
      this.saveRegisteredUsers(users)
    }
  }

  // Get goals
  getGoals(): Goal[] {
    const data = this.getSessionData() || this.getDefaultData()
    return data.goals
  }

  // Update goals
  updateGoals(goals: Goal[]) {
    const data = this.getSessionData() || this.getDefaultData()
    data.goals = goals
    this.saveSessionData(data)

    // If user is signed in, also save to registered users
    if (data.profile.isSignedIn && data.profile.email) {
      const users = this.getRegisteredUsers()
      users[data.profile.email] = data
      this.saveRegisteredUsers(users)
    }
  }

  // Get budget categories
  getBudgetCategories(): BudgetCategory[] {
    const data = this.getSessionData() || this.getDefaultData()
    return data.budgetCategories
  }

  // Update budget categories
  updateBudgetCategories(categories: BudgetCategory[]) {
    const data = this.getSessionData() || this.getDefaultData()
    data.budgetCategories = categories
    this.saveSessionData(data)

    // If user is signed in, also save to registered users
    if (data.profile.isSignedIn && data.profile.email) {
      const users = this.getRegisteredUsers()
      users[data.profile.email] = data
      this.saveRegisteredUsers(users)
    }
  }

  // Get budget entries
  getBudgetEntries(): BudgetEntry[] {
    const data = this.getSessionData() || this.getDefaultData()
    return data.budgetEntries
  }

  // Update budget entries
  updateBudgetEntries(entries: BudgetEntry[]) {
    const data = this.getSessionData() || this.getDefaultData()
    data.budgetEntries = entries
    this.saveSessionData(data)

    // If user is signed in, also save to registered users
    if (data.profile.isSignedIn && data.profile.email) {
      const users = this.getRegisteredUsers()
      users[data.profile.email] = data
      this.saveRegisteredUsers(users)
    }
  }

  // Get user progress
  getUserProgress(): UserProgress {
    const data = this.getSessionData() || this.getDefaultData()
    return data.progress
  }

  // Update user progress
  updateUserProgress(updates: Partial<UserProgress>) {
    const data = this.getSessionData() || this.getDefaultData()
    data.progress = { ...data.progress, ...updates }
    this.saveSessionData(data)

    // If user is signed in, also save to registered users
    if (data.profile.isSignedIn && data.profile.email) {
      const users = this.getRegisteredUsers()
      users[data.profile.email] = data
      this.saveRegisteredUsers(users)
    }
  }

  // Sign in user
  signIn(email: string, password: string): boolean {
    const users = this.getRegisteredUsers()
    const userData = users[email]

    if (userData) {
      // Load user data into session
      this.saveSessionData(userData)

      // Update sign-in status
      userData.profile.isSignedIn = true
      this.saveSessionData(userData)
      users[email] = userData
      this.saveRegisteredUsers(users)

      // Dispatch event for UI updates
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("userSignedIn"))
      }

      return true
    }

    return false
  }

  // Sign up user
  signUp(email: string, password: string, name: string): boolean {
    const users = this.getRegisteredUsers()

    if (users[email]) {
      return false // User already exists
    }

    // Create new user data
    const userData = this.getDefaultData()
    userData.profile.email = email
    userData.profile.name = name
    userData.profile.isSignedIn = true

    // Save to registered users and session
    users[email] = userData
    this.saveRegisteredUsers(users)
    this.saveSessionData(userData)

    // Dispatch event for UI updates
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("userSignedIn"))
    }

    return true
  }

  // Sign out user
  signOut() {
    const data = this.getSessionData()

    if (data && data.profile.isSignedIn && data.profile.email) {
      // Save current data to registered users before signing out
      const users = this.getRegisteredUsers()
      users[data.profile.email] = data
      this.saveRegisteredUsers(users)
    }

    // Clear session data
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.storageKey)
      window.dispatchEvent(new CustomEvent("userSignedOut"))
    }
  }

  // Check if user is signed in
  isSignedIn(): boolean {
    const profile = this.getUserProfile()
    return profile.isSignedIn
  }

  // Get current user email
  getCurrentUserEmail(): string | null {
    const profile = this.getUserProfile()
    return profile.isSignedIn ? profile.email : null
  }

  // Authenticate user (for API calls)
  authenticateUser(email: string, password: string): boolean {
    const users = this.getRegisteredUsers()
    return !!users[email]
  }
}

// Export singleton instance
export const userDataManager = new UserDataManager()

// Export function for API routes
export function getUserData() {
  return {
    isSignedIn: userDataManager.isSignedIn(),
    profile: userDataManager.getUserProfile(),
    budgetData: userDataManager.getBudgetData(),
    goals: userDataManager.getGoals(),
    budgetCategories: userDataManager.getBudgetCategories(),
    budgetEntries: userDataManager.getBudgetEntries(),
    progress: userDataManager.getUserProgress(),
  }
}
