import { learningModules } from "./learning-data"

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
  totalXP: number
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
  profile: UserProfile
  budgetData: BudgetData
  goals: GoalData[]
  learningProgress: LearningProgress
  userProgress: UserProgress
  createdAt: string
  lastSignIn: string
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
    totalXP: 0,
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
    } catch (error) {
      console.error("Error saving user profile:", error)
    }
  }

  // Authentication Methods
  registerUser(profile: UserProfile): { success: boolean; error?: string } {
    if (typeof window === "undefined") return { success: false, error: "Not in browser environment" }

    try {
      // Get existing registered users
      const registeredUsers = this.getRegisteredUsers()

      // Check if user already exists
      const existingUser = registeredUsers.find(
        (user) => user.profile.email === profile.email || user.profile.username === profile.username,
      )

      if (existingUser) {
        return { success: false, error: "User with this email or username already exists" }
      }

      // Create new registered user
      const newUser: RegisteredUser = {
        profile: { ...profile, signedUp: true },
        budgetData: this.defaultBudgetData,
        goals: [],
        learningProgress: this.defaultLearningProgress,
        userProgress: this.defaultUserProgress,
        createdAt: new Date().toISOString(),
        lastSignIn: new Date().toISOString(),
      }

      // Add to registered users
      registeredUsers.push(newUser)
      localStorage.setItem(this.STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers))

      // Set as current user
      this.setCurrentUser(profile.email || profile.username)
      this.saveUserProfile(profile)

      return { success: true }
    } catch (error) {
      console.error("Error registering user:", error)
      return { success: false, error: "Registration failed" }
    }
  }

  authenticateUser(emailOrUsername: string, password: string): { success: boolean; error?: string } {
    if (typeof window === "undefined") return { success: false, error: "Not in browser environment" }

    try {
      const registeredUsers = this.getRegisteredUsers()

      // Add some demo users if none exist
      if (registeredUsers.length === 0) {
        const demoUsers = [
          {
            profile: {
              ...this.defaultProfile,
              email: "demo@example.com",
              username: "demo",
              password: "password123",
              firstName: "Demo",
              lastName: "User",
              signedUp: true,
            },
            budgetData: this.defaultBudgetData,
            goals: [],
            learningProgress: this.defaultLearningProgress,
            userProgress: this.defaultUserProgress,
            createdAt: new Date().toISOString(),
            lastSignIn: new Date().toISOString(),
          },
          {
            profile: {
              ...this.defaultProfile,
              email: "test@example.com",
              username: "testuser",
              password: "testpass",
              firstName: "Test",
              lastName: "User",
              signedUp: true,
            },
            budgetData: this.defaultBudgetData,
            goals: [],
            learningProgress: this.defaultLearningProgress,
            userProgress: this.defaultUserProgress,
            createdAt: new Date().toISOString(),
            lastSignIn: new Date().toISOString(),
          },
        ]
        localStorage.setItem(this.STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(demoUsers))
        registeredUsers.push(...demoUsers)
      }

      // Find user by email or username
      const user = registeredUsers.find(
        (user) =>
          (user.profile.email === emailOrUsername || user.profile.username === emailOrUsername) &&
          user.profile.password === password,
      )

      if (!user) {
        console.log("User not found or password incorrect")
        return { success: false, error: "Invalid username or password" }
      }

      console.log("User found, authenticating:", user.profile.email || user.profile.username)

      // Update last sign in
      user.lastSignIn = new Date().toISOString()
      localStorage.setItem(this.STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers))

      // Set as current user and load their data
      this.setCurrentUser(user.profile.email || user.profile.username)
      this.loadUserData(user)

      console.log("Authentication successful")
      return { success: true }
    } catch (error) {
      console.error("Error authenticating user:", error)
      return { success: false, error: "Authentication failed" }
    }
  }

  isUserSignedIn(): boolean {
    if (typeof window === "undefined") return false
    return localStorage.getItem(this.STORAGE_KEYS.SIGNED_IN) === "true"
  }

  setUserSignedIn(signedIn: boolean): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.STORAGE_KEYS.SIGNED_IN, signedIn.toString())
    console.log("User signed in status set to:", signedIn)
  }

  setUserSignedUp(signedUp: boolean): void {
    if (typeof window === "undefined") return
    const profile = this.getUserProfile()
    this.saveUserProfile({ ...profile, signedUp })
  }

  setRememberMe(remember: boolean): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.STORAGE_KEYS.REMEMBER_ME, remember.toString())
  }

  signOut(): void {
    if (typeof window === "undefined") return

    // Save current user data before signing out
    this.saveCurrentUserData()

    // Clear sign-in status but keep user data
    this.setUserSignedIn(false)
    localStorage.removeItem(this.STORAGE_KEYS.CURRENT_USER)

    // Clear remember me if not set
    const rememberMe = localStorage.getItem(this.STORAGE_KEYS.REMEMBER_ME) === "true"
    if (!rememberMe) {
      localStorage.removeItem(this.STORAGE_KEYS.REMEMBER_ME)
    }
  }

  isUserSignedUp(): boolean {
    if (typeof window === "undefined") return false

    // 1) Active session?
    if (this.isUserSignedIn()) return true

    // 2) Cached profile flag?
    const profile = this.getUserProfile()
    if (profile.signedUp) return true

    // 3) Stored in the registry?
    const identifier = profile.email || profile.username
    if (!identifier) return false

    const registeredUsers = this.getRegisteredUsers()
    return registeredUsers.some((u) => u.profile.email === identifier || u.profile.username === identifier)
  }

  // Helper Methods
  private getRegisteredUsers(): RegisteredUser[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.REGISTERED_USERS)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error("Error loading registered users:", error)
      return []
    }
  }

  private setCurrentUser(identifier: string): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, identifier)
    console.log("Current user set to:", identifier)
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

    const currentUserIdentifier = localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER)
    if (!currentUserIdentifier) return

    try {
      const registeredUsers = this.getRegisteredUsers()
      const userIndex = registeredUsers.findIndex(
        (user) => user.profile.email === currentUserIdentifier || user.profile.username === currentUserIdentifier,
      )

      if (userIndex !== -1) {
        // Update user's data
        registeredUsers[userIndex].profile = this.getUserProfile()
        registeredUsers[userIndex].budgetData = this.getBudgetData()
        registeredUsers[userIndex].goals = this.getGoals()
        registeredUsers[userIndex].learningProgress = this.getLearningProgress()
        registeredUsers[userIndex].userProgress = this.getUserProgress()

        localStorage.setItem(this.STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers))
        console.log("Current user data saved successfully")
      }
    } catch (error) {
      console.error("Error saving current user data:", error)
    }
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
    if (typeof window === "undefined") return this.getDefaultBudgetCategories()

    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.BUDGET_DATA + ":categories")
      if (stored) {
        const parsed: BudgetCategory[] = JSON.parse(stored)
        return parsed.length ? parsed : this.getDefaultBudgetCategories()
      }
    } catch (err) {
      console.error("Error loading budget categories:", err)
    }

    return this.getDefaultBudgetCategories()
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

  addBudgetEntry(entry: Omit<BudgetEntry, "id">): BudgetEntry {
    const newEntry: BudgetEntry = { ...entry, id: Date.now().toString() }
    const all = this.getBudgetEntries()
    all.push(newEntry)
    this.saveBudgetEntries(all)
    return newEntry
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
    const budget = this.getBudgetData()

    // Income or savings entered.
    if (budget.income > 0 || budget.savings > 0) return true

    // Any expense amount entered.
    if (Object.values(budget.expenses).some((value) => value > 0)) return true

    // Any goal with a non-zero target/current amount.
    if (budget.goals.some((g) => g.target > 0 || g.current > 0)) return true

    return false
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
          const userIndex = registeredUsers.findIndex(
            (user) => user.profile.email === currentUserIdentifier || user.profile.username === currentUserIdentifier,
          )

          if (userIndex !== -1) {
            registeredUsers[userIndex].userProgress = updated
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
  }

  updateGoal(id: string, updates: Partial<GoalData>): void {
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

  // Enhanced Learning Progress Management
  updateLessonProgress(moduleId: string, lessonIndex: number, completed = true): void {
    if (typeof window === "undefined") return

    console.log(`🔄 Updating lesson progress: ${moduleId}, lesson ${lessonIndex}, completed: ${completed}`)

    try {
      // Get current progress
      const progress = this.getUserProgress()

      // Initialize modules object if it doesn't exist
      if (!progress.modules) {
        progress.modules = {}
      }

      // Initialize this specific module if it doesn't exist
      if (!progress.modules[moduleId]) {
        progress.modules[moduleId] = {
          completedLessons: [],
          currentLesson: 0,
          completed: false,
          lastAccessed: new Date().toISOString(),
        }
      }

      const moduleProgress = progress.modules[moduleId]

      // Update completed lessons
      if (completed) {
        if (!moduleProgress.completedLessons.includes(lessonIndex)) {
          moduleProgress.completedLessons.push(lessonIndex)
          moduleProgress.completedLessons.sort((a, b) => a - b)
          console.log(`✅ Added lesson ${lessonIndex} to completed lessons`)
        }
      } else {
        // Remove from completed if not completed
        moduleProgress.completedLessons = moduleProgress.completedLessons.filter(
          (lesson: number) => lesson !== lessonIndex,
        )
      }

      // Update current lesson - set to the highest lesson accessed
      moduleProgress.currentLesson = Math.max(moduleProgress.currentLesson || 0, lessonIndex)
      moduleProgress.lastAccessed = new Date().toISOString()

      // Check if module is completed
      const module = learningModules.find((m) => m.id === moduleId)
      if (module) {
        moduleProgress.completed = moduleProgress.completedLessons.length >= module.lessons
        console.log(
          `🏆 Module completed: ${moduleProgress.completed} (${moduleProgress.completedLessons.length}/${module.lessons})`,
        )
      }

      // Update total completed lessons count across all modules
      progress.completedLessons = Object.values(progress.modules).reduce(
        (total: number, mod: ModuleProgress) => total + (mod.completedLessons?.length || 0),
        0,
      )

      // Update streak and activity
      const today = new Date().toDateString()
      const lastActive = progress.lastActiveDate ? new Date(progress.lastActiveDate).toDateString() : null

      if (lastActive !== today) {
        if (lastActive === new Date(Date.now() - 86400000).toDateString()) {
          // Yesterday - continue streak
          progress.currentStreak = (progress.currentStreak || 0) + 1
        } else {
          // Gap in activity - reset streak
          progress.currentStreak = 1
        }
        progress.lastActiveDate = new Date().toISOString()
      }

      // Calculate days active
      progress.daysActive = Math.max(progress.daysActive || 0, progress.currentStreak || 1)

      console.log(`📊 Final progress state:`, progress)

      // Save the updated progress
      this.saveUserProgress(progress)

      // Dispatch multiple events for immediate UI updates
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("progressUpdated", { detail: progress }))
        window.dispatchEvent(
          new CustomEvent("lessonCompleted", {
            detail: { moduleId, lessonIndex, completed, progress },
          }),
        )
      }

      console.log(`✅ Progress update completed successfully`)
    } catch (error) {
      console.error("❌ Error updating lesson progress:", error)
    }
  }

  getModuleLessonProgress(moduleId: string): { completedLessons: number[]; currentLesson: number } {
    if (typeof window === "undefined") return { completedLessons: [], currentLesson: 0 }

    try {
      const progress = this.getUserProgress()
      const moduleProgress = progress.modules?.[moduleId]

      if (moduleProgress) {
        return {
          completedLessons: moduleProgress.completedLessons || [],
          currentLesson: moduleProgress.currentLesson || 0,
        }
      }

      return { completedLessons: [], currentLesson: 0 }
    } catch (error) {
      console.error("❌ Error loading module progress:", error)
      return { completedLessons: [], currentLesson: 0 }
    }
  }

  calculateOverallLearningProgress(): number {
    const progress = this.getUserProgress()
    if (!progress.modules || Object.keys(progress.modules).length === 0) {
      return 0
    }

    const totalLessons = learningModules.reduce((sum, module) => sum + module.lessons, 0)
    const completedLessons = Object.values(progress.modules).reduce(
      (sum: number, moduleProgress: ModuleProgress) => sum + (moduleProgress?.completedLessons?.length || 0),
      0,
    )

    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
    console.log(`📊 Overall progress: ${completedLessons}/${totalLessons} = ${percentage}%`)
    return percentage
  }

  getCompletedModulesCount(): number {
    const progress = this.getUserProgress()
    if (!progress.modules) return 0

    const count = Object.values(progress.modules).filter(
      (moduleProgress: ModuleProgress) => moduleProgress?.completed === true,
    ).length
    console.log(`🏆 Completed modules: ${count}`)
    return count
  }

  // Data Management
  exportUserData(): string {
    const data = {
      profile: this.getUserProfile(),
      budgetData: this.getBudgetData(),
      goals: this.getGoals(),
      learningProgress: this.getLearningProgress(),
      exportDate: new Date().toISOString(),
      userProgress: this.getUserProgress(),
    }
    return JSON.stringify(data, null, 2)
  }

  importUserData(jsonData: string): { success: boolean; error?: string } {
    try {
      const data = JSON.parse(jsonData)

      if (data.profile) this.saveUserProfile(data.profile)
      if (data.budgetData) this.saveBudgetData(data.budgetData)
      if (data.goals) this.saveGoals(data.goals)
      if (data.learningProgress) this.saveLearningProgress(data.learningProgress)
      if (data.userProgress) this.saveUserProgress(data.userProgress)

      return { success: true }
    } catch (error) {
      console.error("Error importing user data:", error)
      return { success: false, error: "Invalid data format" }
    }
  }

  clearAllData(): void {
    if (typeof window === "undefined") return

    Object.values(this.STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key)
    })
  }
}

export const userDataManager = new UserDataManager()
