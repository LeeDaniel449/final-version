interface UserProfile {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  age: string
  experience: string
  goals: string[]
  income: string
  expenses: string
  savings: string
  debt: string
  riskTolerance: string
  timeHorizon: string
  investmentExperience: string
  completedOnboarding: boolean
  signedUp: boolean
  signedIn: boolean
  rememberMe: boolean
}

interface BudgetData {
  income: number
  expenses: { [category: string]: number }
  savings: number
  goals: { name: string; target: number; current: number }[]
  categories?: BudgetCategory[]
}

interface GoalData {
  id: string
  title: string
  target: number
  current: number
  deadline: string
  category: string
  priority: "high" | "medium" | "low"
  status: "active" | "completed" | "paused"
}

interface BudgetCategory {
  id: string
  name: string
  budgetAmount: number
  spentAmount: number
  spendingLimit: number
  color: string
  type: "income" | "expense"
}

interface BudgetEntry {
  id: string
  category: string
  amount: number
  description: string
  date: string
  type: "income" | "expense"
}

interface LearningProgress {
  completedModules: string[]
  currentModule: string | null
  totalProgress: number
  achievements: string[]
}

interface ModuleProgress {
  completedLessons: number[]
  currentLesson: number
  completed: boolean
  lastAccessed: string
}

interface UserProgress {
  completedModules: string[]
  completedLessons: number
  totalPoints: number
  currentStreak: number
  lastActiveDate: string
  achievements: string[]
  budgetEntries: number
  budgetCategories: number
  totalBudgetAmount: number
  daysActive?: number
  modules: {
    [moduleId: string]: ModuleProgress
  }
}

interface RegisteredUser {
  id: string
  profile: UserProfile
  password: string
  budgetData: BudgetData
  goals: GoalData[]
  learningProgress: LearningProgress
  userProgress: UserProgress
  createdAt: string
  lastSignIn: string
}

interface AuthResult {
  success: boolean
  message: string
}

class UserDataManager {
  private readonly STORAGE_KEYS = {
    USER_PROFILE: "wealthwise_user_profile",
    BUDGET_DATA: "wealthwise_budget_data",
    GOALS: "wealthwise_goals",
    LEARNING_PROGRESS: "wealthwise_learning_progress",
    REGISTERED_USERS: "wealthwise_registered_users",
    CURRENT_USER: "wealthwise_current_user",
    SIGNED_IN: "wealthwise_signed_in",
    REMEMBER_ME: "wealthwise_remember_me",
    USER_PROGRESS: "wealthwise_user_progress",
    SIGNED_UP: "wealthwise_signed_up",
  }

  private defaultProfile: UserProfile = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    age: "",
    experience: "",
    goals: [],
    income: "",
    expenses: "",
    savings: "",
    debt: "",
    riskTolerance: "",
    timeHorizon: "",
    investmentExperience: "",
    completedOnboarding: false,
    signedUp: false,
    signedIn: false,
    rememberMe: false,
  }

  private defaultBudgetData: BudgetData = {
    income: 0,
    expenses: {},
    savings: 0,
    goals: [],
  }

  private defaultLearningProgress: LearningProgress = {
    completedModules: [],
    currentModule: null,
    totalProgress: 0,
    achievements: [],
  }

  private defaultUserProgress: UserProgress = {
    completedModules: [],
    completedLessons: 0,
    totalPoints: 0,
    currentStreak: 0,
    lastActiveDate: new Date().toISOString(),
    achievements: [],
    budgetEntries: 0,
    budgetCategories: 0,
    totalBudgetAmount: 0,
    modules: {},
  }

  // User Profile Management
  getUserProfile(): UserProfile {
    if (typeof window === "undefined") return this.defaultProfile

    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.USER_PROFILE)
      return stored ? { ...this.defaultProfile, ...JSON.parse(stored) } : this.defaultProfile
    } catch (error) {
      console.error("Error loading user profile:", error)
      return this.defaultProfile
    }
  }

  saveUserProfile(profile: Partial<UserProfile>): void {
    if (typeof window === "undefined") return

    try {
      const currentProfile = this.getUserProfile()
      const updatedProfile = { ...currentProfile, ...profile }
      localStorage.setItem(this.STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedProfile))
      console.log("User profile saved:", updatedProfile)

      // Dispatch event for UI updates
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("userDataUpdated"))
      }
    } catch (error) {
      console.error("Error saving user profile:", error)
    }
  }

  // Authentication Methods
  isUserSignedUp(): boolean {
    if (typeof window === "undefined") return false

    try {
      // Check localStorage first
      const authenticated = localStorage.getItem("wealthwise_authenticated")
      const currentUser = localStorage.getItem("wealthwise_current_user")

      if (authenticated === "true" && currentUser) {
        console.log("[v0] User authenticated via localStorage")
        return true
      }

      // Check sessionStorage as fallback
      const sessionIn = sessionStorage.getItem("wealthwise_session_in")
      const sessionUp = sessionStorage.getItem("wealthwise_session_up")
      const sessionUser = sessionStorage.getItem("wealthwise_session_user")

      if (sessionIn === "true" && sessionUp === "true" && sessionUser) {
        console.log("[v0] User authenticated via sessionStorage")
        return true
      }

      console.log("[v0] User not authenticated")
      return false
    } catch (error) {
      console.error("[v0] Error checking authentication:", error)
      return false
    }
  }

  isUserSignedIn(): boolean {
    return this.isUserSignedUp()
  }

  setUserSignedIn(signedIn: boolean, isExplicitSignOut = false): void {
    if (typeof window === "undefined") return

    try {
      if (signedIn) {
        // Set authentication flags
        localStorage.setItem("wealthwise_authenticated", "true")
        sessionStorage.setItem("wealthwise_session_in", "true")

        // Load user data when signing in
        const currentUserIdentifier = localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER)
        if (currentUserIdentifier) {
          const registeredUsers = this.getRegisteredUsers()
          const user = registeredUsers[currentUserIdentifier]
          if (user) {
            this.loadUserData(user)
            console.log("User data loaded after sign in")
          }
        }
      } else {
        // Save current data before signing out (unless explicit sign out)
        if (!isExplicitSignOut) {
          this.saveCurrentUserData()
        }

        // Clear session flags but keep persistent authentication if not explicit sign out
        sessionStorage.removeItem("wealthwise_session_in")
        sessionStorage.removeItem("wealthwise_session_up")

        if (isExplicitSignOut) {
          // Only clear persistent flags on explicit sign out
          localStorage.removeItem("wealthwise_authenticated")
          localStorage.removeItem(this.STORAGE_KEYS.CURRENT_USER)

          // Clear all user data from current session
          localStorage.removeItem(this.STORAGE_KEYS.USER_PROFILE)
          localStorage.removeItem(this.STORAGE_KEYS.BUDGET_DATA)
          localStorage.removeItem(this.STORAGE_KEYS.GOALS)
          localStorage.removeItem(this.STORAGE_KEYS.LEARNING_PROGRESS)
          localStorage.removeItem(this.STORAGE_KEYS.USER_PROGRESS)
        }
      }

      // Dispatch events
      window.dispatchEvent(new CustomEvent("userSignedIn", { detail: { signedIn } }))
      window.dispatchEvent(new CustomEvent("userDataUpdated"))
    } catch (error) {
      console.error("Error in setUserSignedIn:", error)
    }
  }

  async registerUser(email: string, password: string, name: string): Promise<{ success: boolean; message: string }> {
    if (typeof window === "undefined") {
      return { success: false, message: "Registration not available on server" }
    }

    try {
      console.log("[v0] Starting simple registration for:", email)

      // Validate inputs
      if (!email || typeof email !== "string") {
        console.log("[v0] Invalid email:", email, typeof email)
        return { success: false, message: "Valid email is required" }
      }

      if (!password || typeof password !== "string") {
        console.log("[v0] Invalid password:", typeof password)
        return { success: false, message: "Valid password is required" }
      }

      if (!name || typeof name !== "string") {
        console.log("[v0] Invalid name:", typeof name)
        return { success: false, message: "Valid name is required" }
      }

      const userKey = email.toLowerCase()

      const registeredUsers = this.getRegisteredUsers()

      // Check if user already exists
      if (registeredUsers[userKey]) {
        console.log("[v0] User already exists:", email)
        return { success: false, message: "An account with this email already exists" }
      }

      this.clearCurrentUserData()

      const newUser: RegisteredUser = {
        id: Date.now().toString(),
        profile: {
          firstName: name.split(" ")[0] || "",
          lastName: name.split(" ").slice(1).join(" ") || "",
          email: email,
          username: email.split("@")[0],
          password: password,
          age: "",
          experience: "beginner",
          goals: [],
          income: "",
          expenses: "",
          savings: "",
          debt: "",
          riskTolerance: "",
          timeHorizon: "",
          investmentExperience: "",
          completedOnboarding: false,
          signedUp: true,
          signedIn: true,
          rememberMe: false,
        },
        password: password,
        budgetData: { ...this.defaultBudgetData },
        goals: [],
        learningProgress: { ...this.defaultLearningProgress },
        userProgress: { ...this.defaultUserProgress },
        createdAt: new Date().toISOString(),
        lastSignIn: new Date().toISOString(),
      }

      registeredUsers[userKey] = newUser

      // Save updated users list
      try {
        localStorage.setItem(this.STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers))
        localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, userKey)
        localStorage.setItem("wealthwise_authenticated", "true")
        console.log("[v0] Saved to localStorage successfully")
      } catch (e) {
        console.log("[v0] localStorage failed, using sessionStorage")
        sessionStorage.setItem(this.STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers))
        sessionStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, userKey)
        sessionStorage.setItem("wealthwise_authenticated", "true")
      }

      // Always set session storage as backup
      sessionStorage.setItem("wealthwise_session_in", "true")
      sessionStorage.setItem("wealthwise_session_up", "true")
      sessionStorage.setItem("wealthwise_session_user", userKey)

      this.loadUserData(newUser)

      console.log("[v0] User registered successfully:", email)
      return { success: true, message: "Registration successful" }
    } catch (error) {
      console.error("[v0] Registration error:", error)
      return { success: false, message: "Registration failed: " + error.message }
    }
  }

  async authenticateUser(email: string, password: string): Promise<{ success: boolean; message: string }> {
    if (typeof window === "undefined") {
      return { success: false, message: "Authentication not available on server" }
    }

    try {
      const userKey = email.toLowerCase()
      const registeredUsers = this.getRegisteredUsers()
      const user = registeredUsers[userKey]

      console.log(`[v0] Authenticating user: ${email}`)
      console.log(`[v0] User found:`, !!user)

      if (!user) {
        return { success: false, message: "Invalid email or password" }
      }

      const passwordMatch = user.password === password
      console.log(`[v0] Password match:`, passwordMatch)

      if (!passwordMatch) {
        return { success: false, message: "Invalid email or password" }
      }

      // Clear and load user data
      this.clearCurrentUserData()
      this.loadUserData(user)

      // Set authentication flags - try localStorage first, fallback to sessionStorage
      let authSuccess = false

      // Try localStorage
      const currentUserSet = this.setStorageItem(this.STORAGE_KEYS.CURRENT_USER, userKey)
      const persistentAuth = this.setStorageItem("wealthwise_authenticated", "true")

      if (persistentAuth && currentUserSet) {
        console.log("[v0] Successfully set persistent authentication")
        authSuccess = true
      } else {
        console.log("[v0] localStorage failed, using sessionStorage fallback")
        // Fallback to sessionStorage
        const sessionIn = this.setStorageItem("wealthwise_session_in", "true", true)
        const sessionUp = this.setStorageItem("wealthwise_session_up", "true", true)
        const sessionUser = this.setStorageItem("wealthwise_session_user", userKey, true)

        if (sessionIn && sessionUp && sessionUser) {
          console.log("[v0] Successfully set session authentication")
          authSuccess = true
        }
      }

      if (!authSuccess) {
        console.error("[v0] Failed to set authentication flags")
        return { success: false, message: "Authentication failed" }
      }

      // Update last sign in time
      user.lastSignIn = new Date().toISOString()
      registeredUsers[userKey] = user
      this.setStorageItem(this.STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers))

      console.log(`[v0] User authenticated successfully: ${email}`)
      return { success: true, message: "Authentication successful" }
    } catch (error) {
      console.error("[v0] Authentication error:", error)
      return { success: false, message: "Authentication failed due to an error" }
    }
  }

  signOut(): void {
    if (typeof window === "undefined") return

    console.log("[v0] Starting sign out process")

    // Save current user data before signing out
    this.saveCurrentUserData()

    // Clear authentication flags
    this.removeStorageItem("wealthwise_authenticated")
    this.removeStorageItem("wealthwise_session_in", true)
    this.removeStorageItem("wealthwise_session_up", true)
    this.removeStorageItem(this.STORAGE_KEYS.CURRENT_USER)
    this.removeStorageItem("wealthwise_session_user", true) // Also remove session user

    // Clear current session data but preserve registered users
    this.removeStorageItem(this.STORAGE_KEYS.USER_PROFILE)
    this.removeStorageItem(this.STORAGE_KEYS.BUDGET_DATA)
    this.removeStorageItem(this.STORAGE_KEYS.GOALS)
    this.removeStorageItem(this.STORAGE_KEYS.LEARNING_PROGRESS)
    this.removeStorageItem(this.STORAGE_KEYS.USER_PROGRESS)

    // Dispatch sign out events
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("userSignedOut"))
      window.dispatchEvent(new CustomEvent("userDataUpdated"))
    }

    console.log("[v0] User signed out successfully")
  }

  // Helper Methods
  private getRegisteredUsers(): { [key: string]: RegisteredUser } {
    if (typeof window === "undefined") return {}

    try {
      const stored = localStorage.getItem("wealthwise_registered_users")
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error("Error loading registered users:", error)
      return {}
    }
  }

  private setStorageItem(key: string, value: string, useSession = false): boolean {
    if (typeof window === "undefined") return false

    try {
      const storage = useSession ? sessionStorage : localStorage
      storage.setItem(key, value)

      // Verify the item was actually saved
      const saved = storage.getItem(key)
      if (saved !== value) {
        console.error(`[v0] Failed to save ${key} to ${useSession ? "session" : "local"}Storage`)
        return false
      }

      console.log(`[v0] Successfully saved ${key} to ${useSession ? "session" : "local"}Storage:`, value)
      return true
    } catch (error) {
      console.error(`[v0] Error saving ${key} to ${useSession ? "session" : "local"}Storage:`, error)
      return false
    }
  }

  private getStorageItem(key: string, useSession = false): string | null {
    if (typeof window === "undefined") return null

    try {
      const storage = useSession ? sessionStorage : localStorage
      return storage.getItem(key)
    } catch (error) {
      console.error(`[v0] Error reading ${key} from ${useSession ? "session" : "local"}Storage:`, error)
      return null
    }
  }

  private removeStorageItem(key: string, useSession = false): void {
    if (typeof window === "undefined") return

    try {
      const storage = useSession ? sessionStorage : localStorage
      storage.removeItem(key)
      console.log(`[v0] Removed ${key} from ${useSession ? "session" : "local"}Storage`)
    } catch (error) {
      console.error(`[v0] Error removing ${key} from ${useSession ? "session" : "local"}Storage:`, error)
    }
  }

  private setCurrentUser(identifier: string): void {
    if (typeof window === "undefined") return

    // Use the consistent storage key from STORAGE_KEYS
    const success = this.setStorageItem(this.STORAGE_KEYS.CURRENT_USER, identifier)
    if (success) {
      console.log("[v0] Current user set to:", identifier)
    } else {
      console.error("[v0] Failed to set current user:", identifier)
    }
  }

  private getCurrentUser(): string | null {
    if (typeof window === "undefined") return null
    return this.getStorageItem(this.STORAGE_KEYS.CURRENT_USER)
  }

  private loadUserData(user: RegisteredUser): void {
    if (typeof window === "undefined") return

    console.log("Loading user data for:", user.profile.email || user.profile.username)

    // Load user's data into current session
    this.saveUserProfile(user.profile)
    localStorage.setItem(this.STORAGE_KEYS.BUDGET_DATA, JSON.stringify(user.budgetData))
    localStorage.setItem(this.STORAGE_KEYS.GOALS, JSON.stringify(user.goals))
    localStorage.setItem(this.STORAGE_KEYS.LEARNING_PROGRESS, JSON.stringify(user.learningProgress))

    // Ensure userProgress exists and has proper structure
    const userProgress = user.userProgress || this.defaultUserProgress
    if (!userProgress.modules) {
      userProgress.modules = {}
    }
    localStorage.setItem(this.STORAGE_KEYS.USER_PROGRESS, JSON.stringify(userProgress))

    console.log("User data loaded successfully")
  }

  private saveCurrentUserData(): void {
    if (typeof window === "undefined") return

    try {
      const currentUserKey = localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER)
      if (!currentUserKey) return

      const registeredUsers = this.getRegisteredUsers()
      const currentUser = registeredUsers[currentUserKey]
      if (!currentUser) return

      // Update user's data with current session data
      const profile = this.getUserProfile()
      const budgetData = this.getBudgetData()
      const goals = this.getGoals()
      const learningProgress = this.getLearningProgress()
      const userProgress = this.getUserProgress()

      if (profile) currentUser.profile = profile
      if (budgetData) currentUser.budgetData = budgetData
      if (goals) currentUser.goals = goals
      if (learningProgress) currentUser.learningProgress = learningProgress
      if (userProgress) currentUser.userProgress = userProgress

      currentUser.lastSignIn = new Date().toISOString()

      registeredUsers[currentUserKey] = currentUser
      localStorage.setItem(this.STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers))

      console.log("[v0] User data saved successfully for:", currentUserKey)
    } catch (error) {
      console.error("Error saving current user data:", error)
    }
  }

  private clearCurrentUserData(): void {
    // Clear current session data but preserve registered users
    // Note: These properties are not directly part of the class instance in the original code.
    // They are loaded from localStorage. So, clearing them here might not be effective.
    // The actual clearing happens by removing items from localStorage/sessionStorage.
    // this.budgetData = { ...this.defaultBudgetData }
    // this.goals = []
    // this.learningProgress = { ...this.defaultLearningProgress }
    // this.userProgress = { ...this.defaultUserProgress }

    // Clear session storage items that represent current user data
    sessionStorage.removeItem(this.STORAGE_KEYS.BUDGET_DATA)
    sessionStorage.removeItem(this.STORAGE_KEYS.GOALS)
    sessionStorage.removeItem(this.STORAGE_KEYS.LEARNING_PROGRESS)
    sessionStorage.removeItem(this.STORAGE_KEYS.USER_PROGRESS)
    sessionStorage.removeItem(this.STORAGE_KEYS.USER_PROFILE) // Also clear profile from session if it was there

    // Clear localStorage items for the current user session
    localStorage.removeItem(this.STORAGE_KEYS.BUDGET_DATA)
    localStorage.removeItem(this.STORAGE_KEYS.GOALS)
    localStorage.removeItem(this.STORAGE_KEYS.LEARNING_PROGRESS)
    localStorage.removeItem(this.STORAGE_KEYS.USER_PROGRESS)
    localStorage.removeItem(this.STORAGE_KEYS.USER_PROFILE)
  }

  /* ---------- CATEGORY HELPERS ---------- */
  private getDefaultBudgetCategories(): BudgetCategory[] {
    return [
      {
        id: "1",
        name: "Housing",
        budgetAmount: 0,
        spentAmount: 0,
        spendingLimit: 0,
        color: "#0F52B9",
        type: "expense",
      },
      {
        id: "2",
        name: "Food & Dining",
        budgetAmount: 0,
        spentAmount: 0,
        spendingLimit: 0,
        color: "#10B981",
        type: "expense",
      },
      {
        id: "3",
        name: "Transportation",
        budgetAmount: 0,
        spentAmount: 0,
        spendingLimit: 0,
        color: "#8953A9",
        type: "expense",
      },
      {
        id: "4",
        name: "Entertainment",
        budgetAmount: 0,
        spentAmount: 0,
        spendingLimit: 0,
        color: "#EF4444",
        type: "expense",
      },
      {
        id: "5",
        name: "Utilities",
        budgetAmount: 0,
        spentAmount: 0,
        spendingLimit: 0,
        color: "#06B6D4",
        type: "expense",
      },
      {
        id: "6",
        name: "Healthcare",
        budgetAmount: 0,
        spentAmount: 0,
        spendingLimit: 0,
        color: "#8B5CF6",
        type: "expense",
      },
      { id: "7", name: "Travel", budgetAmount: 0, spentAmount: 0, spendingLimit: 0, color: "#84CC16", type: "expense" },
    ]
  }

  /* ---------- CATEGORY CRUD ---------- */
  getBudgetCategories(): BudgetCategory[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.BUDGET_DATA + ":categories")
      if (stored) {
        const parsed: BudgetCategory[] = JSON.parse(stored)
        const categoriesWithData = parsed.filter((cat) => cat.budgetAmount > 0 || cat.spentAmount > 0)
        return categoriesWithData
      }
    } catch (err) {
      console.error("Error loading budget categories:", err)
    }

    return []
  }

  saveBudgetCategories(categories: BudgetCategory[]): void {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(this.STORAGE_KEYS.BUDGET_DATA + ":categories", JSON.stringify(categories))
    } catch (err) {
      console.error("Error saving budget categories:", err)
    }
  }

  updateBudgetCategory(name: string, updates: Partial<BudgetCategory>): void {
    const cats = this.getBudgetCategories()
    const idx = cats.findIndex((c) => c.name.toLowerCase() === name.toLowerCase())
    if (idx === -1) return
    cats[idx] = { ...cats[idx], ...updates }
    this.saveBudgetCategories(cats)
  }

  /* ---------- BUDGET ENTRIES ---------- */
  getBudgetEntries(): BudgetEntry[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.BUDGET_DATA + ":entries")
      return stored ? JSON.parse(stored) : []
    } catch (err) {
      console.error("Error loading budget entries:", err)
      return []
    }
  }

  saveBudgetEntries(entries: BudgetEntry[]): void {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(this.STORAGE_KEYS.BUDGET_DATA + ":entries", JSON.stringify(entries))
    } catch (err) {
      console.error("Error saving budget entries:", err)
    }
  }

  addBudgetEntry(entry: Omit<BudgetEntry, "id">): void {
    const entries = this.getBudgetEntries()
    const newEntry: BudgetEntry = {
      ...entry,
      id: Date.now().toString(),
    }
    entries.push(newEntry)
    this.saveBudgetEntries(entries)
    // Automatically save to user account
    this.saveCurrentUserData()
  }

  clearAllBudgetEntries(): void {
    if (typeof window === "undefined") return
    try {
      localStorage.removeItem(this.STORAGE_KEYS.BUDGET_DATA + ":entries")
      console.log("[v0] All budget entries cleared")
    } catch (err) {
      console.error("Error clearing budget entries:", err)
    }
  }

  // Budget Data Management
  getBudgetData(): BudgetData {
    if (typeof window === "undefined") return this.defaultBudgetData

    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.BUDGET_DATA)
      return stored ? JSON.parse(stored) : this.defaultBudgetData
    } catch (error) {
      console.error("Error loading budget data:", error)
      return this.defaultBudgetData
    }
  }

  saveBudgetData(budgetData: Partial<BudgetData>): void {
    if (typeof window === "undefined") return

    try {
      const currentData = this.getBudgetData()
      const updatedData = { ...currentData, ...budgetData }
      localStorage.setItem(this.STORAGE_KEYS.BUDGET_DATA, JSON.stringify(updatedData))
    } catch (error) {
      console.error("Error saving budget data:", error)
    }
  }

  hasStartedBudgeting(): boolean {
    const categories = this.getBudgetCategories()
    const entries = this.getBudgetEntries()

    // User has started budgeting if they have any categories with data or any entries
    if (categories.length > 0 || entries.length > 0) return true

    const budget = this.getBudgetData()

    // Income or savings entered.
    if (budget.income > 0 || budget.savings > 0) return true

    // Any expense amount entered.
    if (Object.values(budget.expenses).some((value) => value > 0)) return true

    // Any goal with a non-zero target/current amount.
    if (budget.goals.some((g) => g.target > 0 || g.current > 0)) return true

    return false
  }

  resetUserBudgetData(): void {
    if (typeof window === "undefined") return

    try {
      // Clear stored budget categories and entries
      localStorage.removeItem(this.STORAGE_KEYS.BUDGET_DATA + ":categories")
      localStorage.removeItem(this.STORAGE_KEYS.BUDGET_DATA + ":entries")
      localStorage.removeItem(this.STORAGE_KEYS.BUDGET_DATA)

      console.log("[v0] User budget data reset to clean state")

      // Dispatch event to update UI
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("userDataUpdated"))
      }
    } catch (error) {
      console.error("Error resetting user budget data:", error)
    }
  }

  // -------------------- USER PROGRESS MANAGEMENT -------------------- //
  getUserProgress(): UserProgress {
    if (typeof window === "undefined") return this.defaultUserProgress

    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.USER_PROGRESS)
      const progress = stored ? JSON.parse(stored) : this.defaultUserProgress

      // Ensure modules object exists
      if (!progress.modules) {
        progress.modules = {}
      }

      return progress
    } catch (error) {
      console.error("Error loading user progress:", error)
      return this.defaultUserProgress
    }
  }

  saveUserProgress(progress: Partial<UserProgress>): void {
    if (typeof window === "undefined") return

    try {
      const current = this.getUserProgress()
      const updated = { ...current, ...progress }

      // Ensure modules object exists
      if (!updated.modules) {
        updated.modules = {}
      }

      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEYS.USER_PROGRESS, JSON.stringify(updated))
      console.log("✅ User progress saved to localStorage")

      // Also save to registered users if signed in
      const currentUserIdentifier = localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER)
      if (currentUserIdentifier) {
        try {
          const registeredUsers = this.getRegisteredUsers()
          const user = registeredUsers[currentUserIdentifier]

          if (user) {
            user.userProgress = updated
            localStorage.setItem(this.STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers))
            console.log("✅ User progress saved to registered users")
          }
        } catch (error) {
          console.error("❌ Error saving to registered users:", error)
        }
      }

      // Dispatch event to notify other components
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("progressUpdated", { detail: updated }))
      }
    } catch (error) {
      console.error("❌ Error saving user progress:", error)
    }
  }

  // Goals Management
  getGoals(): GoalData[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.GOALS)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error("Error loading goals:", error)
      return []
    }
  }

  saveGoals(goals: GoalData[]): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(this.STORAGE_KEYS.GOALS, JSON.stringify(goals))
    } catch (error) {
      console.error("Error saving goals:", error)
    }
  }

  addGoal(goal: Omit<GoalData, "id">): void {
    const goals = this.getGoals()
    const newGoal: GoalData = {
      ...goal,
      id: Date.now().toString(),
    }
    goals.push(newGoal)
    this.saveGoals(goals)
    // Automatically save to user account
    this.saveCurrentUserData()
  }

  updateGoal(id: string, updates: Partial<GoalData>): void {
    const goals = this.getGoals()
    const index = goals.findIndex((goal) => goal.id === id)
    if (index !== -1) {
      goals[index] = { ...goals[index], ...updates }
      this.saveGoals(goals)
      // Automatically save to user account
      this.saveCurrentUserData()
    }
  }

  deleteGoal(id: string): void {
    const goals = this.getGoals().filter((goal) => goal.id !== id)
    this.saveGoals(goals)
    // Automatically save to user account
    this.saveCurrentUserData()
  }

  // Learning Progress Management
  getLearningProgress(): LearningProgress {
    if (typeof window === "undefined") return this.defaultLearningProgress

    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.LEARNING_PROGRESS)
      return stored ? JSON.parse(stored) : this.defaultLearningProgress
    } catch (error) {
      console.error("Error loading learning progress:", error)
      return this.defaultLearningProgress
    }
  }

  saveLearningProgress(progress: Partial<LearningProgress>): void {
    if (typeof window === "undefined") return

    try {
      const currentProgress = this.getLearningProgress()
      const updatedProgress = { ...currentProgress, ...progress }
      localStorage.setItem(this.STORAGE_KEYS.LEARNING_PROGRESS, JSON.stringify(updatedProgress))
    } catch (error) {
      console.error("Error saving learning progress:", error)
    }
  }

  completeModule(moduleId: string): void {
    const progress = this.getLearningProgress()
    if (!progress.completedModules.includes(moduleId)) {
      progress.completedModules.push(moduleId)
      progress.totalProgress = Math.min(100, progress.totalProgress + 10)
      this.saveLearningProgress(progress)
    }
  }

  getCompletedModulesCount(): number {
    const userProgress = this.getUserProgress()
    return userProgress.completedModules?.length || 0
  }

  calculateOverallLearningProgress(): number {
    const userProgress = this.getUserProgress()
    // Calculate progress based on completed modules
    // Assuming there are learning modules to track against
    return Math.round(userProgress.totalProgress || 0)
  }

  getModuleLessonProgress(moduleId: string): ModuleProgress {
    const userProgress = this.getUserProgress()

    // Return existing module progress or default
    if (userProgress.modules && userProgress.modules[moduleId]) {
      return userProgress.modules[moduleId]
    }

    // Return default module progress
    return {
      completedLessons: [],
      currentLesson: 0,
      completed: false,
      lastAccessed: new Date().toISOString(),
    }
  }
}

export const userDataManager = new UserDataManager()

export function getUserData() {
  return {
    profile: userDataManager.getUserProfile(),
    budgetData: userDataManager.getBudgetData(),
    goals: userDataManager.getGoals(),
    learningProgress: userDataManager.getLearningProgress(),
    userProgress: userDataManager.getUserProgress(),
    budgetCategories: userDataManager.getBudgetCategories(),
    budgetEntries: userDataManager.getBudgetEntries(),
  }
}

export type {
  UserProfile,
  UserProgress,
  GoalData as Goal,
  BudgetData,
  BudgetCategory,
  BudgetEntry,
  LearningProgress,
  ModuleProgress,
  RegisteredUser,
  AuthResult,
}
