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
    BUDGET_CATEGORIES: "wealthwise_budget_categories", // Added for clarity
    BUDGET_ENTRIES: "wealthwise_budget_entries", // Added for clarity
  }

  // Added a prefix for user-specific storage keys to avoid conflicts
  private readonly STORAGE_PREFIX = "wealthwise_user_data_"

  private defaultProfile: UserProfile = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
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

  private databaseSyncEnabled = true // Enable database sync by default

  private async syncToDatabase(userId?: string): Promise<void> {
    if (!this.databaseSyncEnabled) {
      console.log("[v0] Database sync is disabled")
      return
    }

    try {
      const resolvedUserId = userId || this.getResolvedUserId()
      if (!resolvedUserId) {
        console.warn("[v0] Cannot sync to database: No user ID available")
        return
      }

      console.log("[v0] 🔄 SUPABASE SYNC STARTED ========================================")
      console.log("[v0] 📤 Syncing data to Supabase for user:", resolvedUserId)

      const data = {
        profile: this.getUserProfile(),
        budgetData: this.getBudgetData(),
        budgetCategories: this.getBudgetCategories(),
        budgetEntries: this.getBudgetEntries(),
        goals: this.getGoals(),
        learningProgress: this.getLearningProgress(),
        userProgress: this.getUserProgress(),
      }

      console.log("[v0] 📊 Data package prepared for Supabase:")
      console.log("[v0]    - Budget Categories:", data.budgetCategories.length)
      console.log("[v0]    - Budget Entries:", data.budgetEntries.length)
      console.log("[v0]    - Goals:", data.goals.length)
      console.log("[v0]    - Completed Modules:", data.userProgress.completedModules.length)
      console.log("[v0]    - Total Data Size:", JSON.stringify(data).length, "bytes")

      console.log("[v0] 🌐 Sending POST request to /api/user-data...")

      const response = await fetch("/api/user-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": resolvedUserId,
        },
        body: JSON.stringify({ data, userId: resolvedUserId }),
      })

      if (!response.ok) {
        const result = await response.json()
        if (result.tableNotFound) {
          console.log("[v0] ⚠️ Database table not ready - will retry later")
          return
        }
        console.error("[v0] ❌ SUPABASE SYNC FAILED:", result)
        console.error("[v0] ❌ Status:", response.status, response.statusText)
      } else {
        const result = await response.json()
        if (result.tableNotFound) {
          console.log("[v0] ⚠️ Database table not ready - using localStorage only")
        } else if (result.success) {
          console.log("[v0] ✅ SUPABASE SYNC SUCCESSFUL!")
          console.log("[v0] ✅ Data successfully saved to cloud database")
          console.log("[v0] ✅ This data will now sync to all your devices")
          console.log("[v0] ========================================")
        } else {
          console.error("[v0] ❌ Unexpected response:", result)
        }
      }
    } catch (error) {
      console.error("[v0] ❌ SUPABASE SYNC ERROR:", error)
    }
  }

  private async loadFromDatabase(userId?: string): Promise<any> {
    if (!this.databaseSyncEnabled) {
      console.log("[v0] Database sync is disabled")
      return null
    }

    try {
      const resolvedUserId = userId || this.getResolvedUserId()
      if (!resolvedUserId) {
        console.warn("[v0] Cannot load from database: No user ID available")
        return null
      }

      console.log("[v0] 📥 SUPABASE LOAD STARTED")
      console.log("[v0] Loading from Supabase database for user:", resolvedUserId)

      const response = await fetch(`/api/user-data?userId=${encodeURIComponent(resolvedUserId)}`, {
        headers: {
          "x-user-id": resolvedUserId,
        },
      })

      if (!response.ok) {
        const result = await response.json()
        console.error("[v0] ❌ Failed to load from Supabase:", result)
        return null
      }

      const result = await response.json()

      if (result.data && Object.keys(result.data).length > 0) {
        console.log("[v0] 📊 Supabase data found! Loading into browser...")
        console.log("[v0] Data loaded from Supabase:", {
          hasProfile: !!result.data.profile,
          categories: result.data.budgetCategories?.length || 0,
          entries: result.data.budgetEntries?.length || 0,
          goals: result.data.goals?.length || 0,
          completedModules: result.data.userProgress?.completedModules?.length || 0,
        })

        if (result.data.profile) {
          localStorage.setItem(`${this.STORAGE_PREFIX}profile_${resolvedUserId}`, JSON.stringify(result.data.profile))
        }
        if (result.data.budgetData) {
          localStorage.setItem(`${this.STORAGE_PREFIX}budget_${resolvedUserId}`, JSON.stringify(result.data.budgetData))
        }
        if (result.data.budgetCategories) {
          localStorage.setItem(
            `${this.STORAGE_PREFIX}categories_${resolvedUserId}`,
            JSON.stringify(result.data.budgetCategories),
          )
        }
        if (result.data.budgetEntries) {
          localStorage.setItem(
            `${this.STORAGE_PREFIX}entries_${resolvedUserId}`,
            JSON.stringify(result.data.budgetEntries),
          )
        }
        if (result.data.goals) {
          localStorage.setItem(`${this.STORAGE_PREFIX}goals_${resolvedUserId}`, JSON.stringify(result.data.goals))
        }
        if (result.data.learningProgress) {
          localStorage.setItem(
            `${this.STORAGE_PREFIX}learning_progress_${resolvedUserId}`,
            JSON.stringify(result.data.learningProgress),
          )
        }
        if (result.data.userProgress) {
          localStorage.setItem(
            `${this.STORAGE_PREFIX}user_progress_${resolvedUserId}`,
            JSON.stringify(result.data.userProgress),
          )
        }

        console.log("[v0] ✅ SUPABASE LOAD SUCCESSFUL - Data loaded from database into browser")

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("userDataUpdated"))
          window.dispatchEvent(new CustomEvent("storageChanged"))
        }

        return result.data
      } else {
        console.log("[v0] 📭 No data in Supabase database for this user (first time signing in on this device)")
        return null
      }
    } catch (error) {
      console.error("[v0] ❌ Error loading from Supabase:", error)
      return null
    }
  }

  async migrateLocalDataToDatabase(userId: string): Promise<void> {
    if (typeof window === "undefined") return

    try {
      console.log("[v0] 🔄 MIGRATION CHECK - Checking if local data needs to be migrated to Supabase")
      console.log("[v0] User ID for migration:", userId)

      // Check if data already exists in database
      const response = await fetch("/api/user-data", {
        headers: { "x-user-id": userId },
      })

      if (response.ok) {
        const { data } = await response.json()

        // If database already has data, don't overwrite
        if (data && Object.keys(data).length > 0) {
          console.log("[v0] ✅ Supabase database already has data - skipping migration to avoid overwriting")
          return
        }
      }

      // Gather all existing local data
      const localData = {
        profile: this.getUserProfile(),
        budgetData: this.getBudgetData(),
        budgetCategories: this.getBudgetCategories(),
        budgetEntries: this.getBudgetEntries(),
        goals: this.getGoals(),
        learningProgress: this.getLearningProgress(),
        userProgress: this.getUserProgress(),
      }

      // Check if there's any meaningful data to migrate
      const hasData =
        localData.budgetCategories.length > 0 ||
        localData.budgetEntries.length > 0 ||
        localData.goals.length > 0 ||
        localData.userProgress.completedModules.length > 0

      if (!hasData) {
        console.log("[v0] 📭 No local data to migrate to Supabase")
        return
      }

      console.log("[v0] 📤 MIGRATING LOCAL DATA TO SUPABASE:")
      console.log("[v0] - Budget categories:", localData.budgetCategories.length)
      console.log("[v0] - Budget entries:", localData.budgetEntries.length)
      console.log("[v0] - Financial goals:", localData.goals.length)
      console.log("[v0] - Completed modules:", localData.userProgress.completedModules.length)

      // Upload to database
      await this.syncToDatabase(userId)

      console.log("[v0] ✅ MIGRATION COMPLETE - Local data successfully uploaded to Supabase")
    } catch (error) {
      console.error("[v0] ❌ Error migrating local data to Supabase:", error)
    }
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

        const clerkUserId = this.getClerkUserId()
        if (clerkUserId && clerkUserId.startsWith("user_")) {
          this.loadFromDatabase(clerkUserId).catch(console.error)
          this.migrateLocalDataToDatabase(clerkUserId).catch(console.error) // Added migration call
        }
      } else {
        const clerkUserId = this.getClerkUserId()
        if (clerkUserId && clerkUserId.startsWith("user_") && !isExplicitSignOut) {
          this.syncToDatabase(clerkUserId).catch(console.error)
        }

        // Save current user data before signing out (unless explicit sign out)
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
          localStorage.removeItem("wealthwise_clerk_user_id") // Clear Clerk ID as well

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
    this.removeStorageItem("wealthwise_clerk_user_id") // Clear Clerk ID as well

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

  // Store the Clerk user ID internally
  private clerkUserId: string | null = null

  private getUserStorageKey(baseKey: string, userId?: string): string {
    if (!userId && typeof window !== "undefined") {
      userId = this.getClerkUserId() || undefined

      if (userId && userId.startsWith("user_")) {
        console.log("[v0] Using Clerk user ID for storage:", userId)
      } else {
        console.log("[v0] No valid Clerk user ID - using anonymous mode")
        userId = "anonymous"
      }
    }

    return `${baseKey}_${userId || "anonymous"}`
  }

  setClerkUserId(userId: string | null): void {
    console.log(
      "[v0] 🔑 Setting Clerk user ID:",
      userId ? `${userId.substring(0, 20)}...` : "null (clearing user data)",
    )

    if (userId && userId.startsWith("user_")) {
      this.clerkUserId = userId
      if (typeof window !== "undefined") {
        localStorage.setItem("wealthwise_clerk_user_id", userId)
      }
      console.log("[v0] 📥 Loading data from Supabase for user:", userId)
      this.loadFromDatabase(userId).catch((error) => {
        console.error("[v0] ❌ Failed to load from database:", error)
      })
      this.migrateLocalDataToDatabase(userId).catch((error) => {
        console.error("[v0] ❌ Failed to migrate local data:", error)
      })
    } else {
      console.log("[v0] 🧹 Clearing Clerk user ID and user profile data")
      this.clerkUserId = null
      if (typeof window !== "undefined" && userId === null) {
        localStorage.removeItem("wealthwise_clerk_user_id")
        console.log("[v0] ✅ User profile cleared from localStorage")
      }
    }
  }

  private getClerkUserId(): string | null {
    if (typeof window === "undefined") return null

    const fromMemory = this.clerkUserId
    const fromStorage = localStorage.getItem("wealthwise_clerk_user_id")
    const clerkId = fromMemory || fromStorage || null

    console.log("[v0] 🔍 getClerkUserId check:", {
      fromMemory: fromMemory ? `${fromMemory.substring(0, 15)}...` : null,
      fromStorage: fromStorage ? `${fromStorage.substring(0, 15)}...` : null,
      finalId: clerkId ? `${clerkId.substring(0, 15)}...` : null,
    })

    if (clerkId && clerkId.startsWith("user_")) {
      console.log("[v0] ✅ Valid Clerk user ID found")
      return clerkId
    }

    console.log("[v0] ❌ No valid Clerk user ID found")
    return null
  }

  syncUserIdAcrossBrowserContexts(): void {
    if (typeof window === "undefined") return

    try {
      const clerkUserId = this.getClerkUserId()

      if (clerkUserId && clerkUserId.startsWith("user_")) {
        localStorage.setItem("wealthwise_clerk_user_id", clerkUserId)
        console.log("[v0] Clerk user ID synced:", clerkUserId)
      } else {
        console.log("[v0] No valid Clerk user ID to sync")
      }
    } catch (error) {
      console.error("[v0] Error syncing user ID:", error)
    }
  }

  private getResolvedUserId(): string | null {
    if (typeof window === "undefined") return null

    const clerkUserId = this.getClerkUserId()

    if (clerkUserId && clerkUserId.startsWith("user_")) {
      return clerkUserId
    }

    console.log("[v0] No valid Clerk user ID found")
    return null
  }

  /* ---------- CATEGORY CRUD ---------- */
  getBudgetCategories(): BudgetCategory[] {
    if (typeof window === "undefined") return []

    try {
      const userId = this.getClerkUserId()

      console.log("[v0] 📊 getBudgetCategories - userId:", userId ? `${userId.substring(0, 15)}...` : null)

      if (!userId || !userId.startsWith("user_")) {
        console.log("[v0] ⚠️ No Clerk user authenticated - returning empty categories")
        return []
      }

      const storageKey = this.getUserStorageKey(this.STORAGE_KEYS.BUDGET_CATEGORIES, userId)

      console.log("[v0] 📂 Loading categories from:", storageKey)
      const stored = localStorage.getItem(storageKey)

      if (stored) {
        const parsed: BudgetCategory[] = JSON.parse(stored)
        console.log("[v0] ✅ Loaded categories:", parsed.length, "items")

        if (parsed.length > 0) {
          const validCategories = parsed.every(
            (cat) =>
              cat.hasOwnProperty("budgetAmount") &&
              cat.hasOwnProperty("spentAmount") &&
              typeof cat.budgetAmount === "number" &&
              typeof cat.spentAmount === "number",
          )
          if (validCategories) {
            const filteredCategories = parsed.filter((cat) => cat.budgetAmount > 0 || cat.spentAmount > 0)
            console.log("[v0] 📤 Returning", filteredCategories.length, "categories with data")
            return filteredCategories
          }
        }
      } else {
        console.log("[v0] 📭 No stored categories found at key:", storageKey)
      }
    } catch (err) {
      console.error("[v0] ❌ Error loading budget categories:", err)
    }

    console.log("[v0] 📭 Returning empty categories array")
    return []
  }

  saveBudgetCategories(categories: BudgetCategory[]): void {
    if (typeof window === "undefined") return
    try {
      const userId = this.getClerkUserId()

      if (!userId || !userId.startsWith("user_")) {
        console.error("[v0] ❌ Cannot save categories - no Clerk user authenticated")
        console.error("[v0] 💡 Please sign in to enable cross-device sync")
        return
      }

      const storageKey = this.getUserStorageKey(this.STORAGE_KEYS.BUDGET_CATEGORIES, userId)

      localStorage.setItem(storageKey, JSON.stringify(categories))
      console.log("[v0] ✅ Budget categories saved to localStorage - count:", categories.length)

      console.log("[v0] 🚀 Triggering automatic Supabase sync for user:", userId)
      this.syncToDatabase(userId).catch(console.error)
    } catch (err) {
      console.error("[v0] ❌ Error saving budget categories:", err)
    }
  }

  updateBudgetCategory(name: string, updates: Partial<BudgetCategory>): void {
    const cats = this.getBudgetCategories()
    const idx = cats.findIndex((c) => c.name.toLowerCase() === name.toLowerCase())

    if (idx === -1) {
      // Category doesn't exist, create a new one
      const defaultColors = [
        "hsl(217, 91%, 60%)", // blue
        "hsl(142, 71%, 45%)", // green
        "hsl(24, 95%, 53%)", // orange
        "hsl(262, 83%, 58%)", // purple
        "hsl(339, 82%, 52%)", // pink
        "hsl(48, 96%, 53%)", // yellow
        "hsl(199, 89%, 48%)", // cyan
        "hsl(14, 90%, 53%)", // red-orange
      ]

      const newCategory: BudgetCategory = {
        id: Date.now().toString(),
        name: name,
        budgetAmount: 0,
        spentAmount: 0,
        spendingLimit: 0,
        color: defaultColors[cats.length % defaultColors.length],
        type: "expense",
        ...updates, // Apply the updates on top of defaults
      }

      cats.push(newCategory)
      console.log("[v0] Created new budget category:", name, "with budget:", newCategory.budgetAmount)
    } else {
      // Category exists, update it
      cats[idx] = { ...cats[idx], ...updates }
      console.log("[v0] Updated existing budget category:", name)
    }

    this.saveBudgetCategories(cats)
  }

  /* ---------- BUDGET ENTRIES ---------- */
  getBudgetEntries(): BudgetEntry[] {
    if (typeof window === "undefined") return []

    try {
      const userId = this.getClerkUserId()

      console.log("[v0] 📊 getBudgetEntries - userId:", userId ? `${userId.substring(0, 15)}...` : null)

      if (!userId || !userId.startsWith("user_")) {
        console.log("[v0] ⚠️ No Clerk user authenticated - returning empty entries")
        return []
      }
      const storageKey = this.getUserStorageKey(this.STORAGE_KEYS.BUDGET_ENTRIES, userId)

      console.log("[v0] 📂 Loading entries from:", storageKey)
      const stored = localStorage.getItem(storageKey)
      const entries = stored ? JSON.parse(stored) : []
      console.log("[v0] ✅ Loaded", entries.length, "budget entries")
      return entries
    } catch (err) {
      console.error("[v0] ❌ Error loading budget entries:", err)
      return []
    }
  }

  saveBudgetEntries(entries: BudgetEntry[]): void {
    if (typeof window === "undefined") return
    try {
      const userId = this.getClerkUserId()
      if (!userId || !userId.startsWith("user_")) {
        console.error("[v0] ❌ Cannot save entries - no Clerk user authenticated")
        console.error("[v0] 💡 Please sign in to enable cross-device sync")
        return
      }
      const storageKey = this.getUserStorageKey(this.STORAGE_KEYS.BUDGET_ENTRIES, userId)

      localStorage.setItem(storageKey, JSON.stringify(entries))
      console.log("[v0] ✅ Budget entries saved to localStorage - count:", entries.length)

      console.log("[v0] 🚀 Triggering automatic Supabase sync for user:", userId)
      this.syncToDatabase(userId).catch(console.error)
    } catch (err) {
      console.error("[v0] ❌ Error saving budget entries:", err)
    }
  }

  addBudgetEntry(entry: Omit<BudgetEntry, "id">): void {
    const userId = this.getClerkUserId()
    // Prevent adding if no valid Clerk user ID
    if (!userId || !userId.startsWith("user_")) {
      console.error("[v0] Cannot add budget entry - user not authenticated. Please sign in.")
      return
    }
    const storageKey = this.getUserStorageKey(this.STORAGE_KEYS.BUDGET_ENTRIES, userId)

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
      const userId = this.getClerkUserId()
      // Only clear if we have a valid Clerk user ID
      if (!userId || !userId.startsWith("user_")) {
        console.warn("[v0] Cannot clear entries - no Clerk user authenticated")
        return
      }
      const storageKey = this.getUserStorageKey(this.STORAGE_KEYS.BUDGET_ENTRIES, userId)
      localStorage.removeItem(storageKey)
      console.log("[v0] All budget entries cleared")
    } catch (err) {
      console.error("Error clearing budget entries:", err)
    }
  }

  // Budget Data Management
  getBudgetData(): BudgetData {
    if (typeof window === "undefined") return this.defaultBudgetData

    try {
      const userId = this.getClerkUserId()
      // Return default if no Clerk user ID
      if (!userId || !userId.startsWith("user_")) {
        console.log("[v0] No Clerk user authenticated - returning default budget data")
        return this.defaultBudgetData
      }
      const storageKey = this.getUserStorageKey(this.STORAGE_KEYS.BUDGET_DATA, userId)
      const stored = localStorage.getItem(storageKey)
      return stored ? JSON.parse(stored) : this.defaultBudgetData
    } catch (error) {
      console.error("Error loading budget data:", error)
      return this.defaultBudgetData
    }
  }

  saveBudgetData(data: Partial<BudgetData>): void {
    if (typeof window === "undefined") return

    try {
      const currentData = this.getBudgetData()
      const updatedData = { ...currentData, ...data }
      const userId = this.getClerkUserId()
      if (!userId || !userId.startsWith("user_")) {
        console.error("[v0] Cannot save budget data - no Clerk user authenticated")
        return
      }
      const storageKey = this.getUserStorageKey(this.STORAGE_KEYS.BUDGET_DATA, userId)
      localStorage.setItem(storageKey, JSON.stringify(updatedData))

      if (userId && userId.startsWith("user_")) {
        console.log("[v0] 💾 Budget data saved - triggering auto-sync to Supabase")
        this.syncToDatabase(userId).catch((error) => {
          console.error("[v0] Auto-sync failed:", error)
        })
      }
    } catch (error) {
      console.error("Error saving budget data:", error)
    }
  }

  hasStartedBudgeting(): boolean {
    const categories = this.getBudgetCategories()
    const entries = this.getBudgetEntries()

    return categories.length > 0 || entries.length > 0
  }

  resetUserBudgetData(): void {
    if (typeof window === "undefined") return

    try {
      const userId = this.getClerkUserId()
      // Only reset if we have a valid Clerk user ID
      if (!userId || !userId.startsWith("user_")) {
        console.warn("[v0] Cannot reset budget data - no Clerk user authenticated")
        return
      }
      const storageKeyCategories = this.getUserStorageKey(this.STORAGE_KEYS.BUDGET_CATEGORIES, userId)
      const storageKeyEntries = this.getUserStorageKey(this.STORAGE_KEYS.BUDGET_ENTRIES, userId)
      const storageKeyBudgetData = this.getUserStorageKey(this.STORAGE_KEYS.BUDGET_DATA, userId)

      // Clear stored budget categories and entries
      localStorage.removeItem(storageKeyCategories)
      localStorage.removeItem(storageKeyEntries)
      localStorage.removeItem(storageKeyBudgetData)

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
      const userId = this.getClerkUserId()

      // Return default if no Clerk user ID
      if (!userId || !userId.startsWith("user_")) {
        console.log("[v0] No Clerk user authenticated - returning default user progress")
        return this.defaultUserProgress
      }

      const storageKey = this.getUserStorageKey(this.STORAGE_KEYS.USER_PROGRESS, userId)
      const stored = localStorage.getItem(storageKey)
      const progress = stored ? JSON.parse(stored) : this.defaultUserProgress

      // Ensure modules object exists
      if (!progress.modules) {
        progress.modules = {}
      }

      console.log("[v0] getUserProgress loaded:", {
        completedModules: progress.completedModules?.length || 0,
        completedLessons: progress.completedLessons || 0,
        totalProgress: progress.totalProgress || 0,
        currentStreak: progress.currentStreak || 0,
        daysActive: progress.daysActive || 0,
      })

      return progress
    } catch (error) {
      console.error("Error loading user progress:", error)
      return this.defaultUserProgress
    }
  }

  saveUserProgress(progress: Partial<UserProgress>): void {
    if (typeof window === "undefined") return

    try {
      const userId = this.getClerkUserId()

      if (!userId || !userId.startsWith("user_")) {
        console.error("[v0] Cannot save user progress - no Clerk user authenticated")
        return
      }

      const current = this.getUserProgress()
      const updated = { ...current, ...progress }

      // Ensure modules object exists
      if (!updated.modules) {
        updated.modules = {}
      }

      const storageKey = this.getUserStorageKey(this.STORAGE_KEYS.USER_PROGRESS, userId)
      // Save to localStorage
      localStorage.setItem(storageKey, JSON.stringify(updated))
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

      console.log("[v0] Triggering database sync for Clerk user:", userId)
      this.syncToDatabase(userId).catch(console.error)

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
      const userId = this.getClerkUserId()

      if (!userId || !userId.startsWith("user_")) {
        console.log("[v0] No Clerk user authenticated - returning empty goals")
        return []
      }

      const storageKey = this.getUserStorageKey(this.STORAGE_KEYS.GOALS, userId)
      const stored = localStorage.getItem(storageKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error("Error loading goals:", error)
      return []
    }
  }

  saveGoals(goals: GoalData[]): void {
    if (typeof window === "undefined") return

    try {
      const userId = this.getClerkUserId()

      if (!userId || !userId.startsWith("user_")) {
        console.error("[v0] ❌ Cannot save goals - no Clerk user authenticated")
        console.error("[v0] 💡 Please sign in to enable cross-device sync")
        return
      }

      const storageKey = this.getUserStorageKey(this.STORAGE_KEYS.GOALS, userId)
      localStorage.setItem(storageKey, JSON.stringify(goals))

      console.log("[v0] ✅ Goals saved to localStorage - count:", goals.length)
      console.log("[v0] 🚀 Triggering automatic Supabase sync for user:", userId)
      this.syncToDatabase(userId).catch(console.error)
    } catch (error) {
      console.error("[v0] ❌ Error saving goals:", error)
    }
  }

  addGoal(goal: Omit<GoalData, "id">): void {
    const userId = this.getClerkUserId()

    // Prevent adding if no valid Clerk user ID
    if (!userId || !userId.startsWith("user_")) {
      console.error("[v0] Cannot add goal - user not authenticated. Please sign in.")
      return
    }

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
    const userId = this.getClerkUserId()

    // Prevent updating if no valid Clerk user ID
    if (!userId || !userId.startsWith("user_")) {
      console.error("[v0] Cannot update goal - no Clerk user ID")
      return
    }

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
    const userId = this.getClerkUserId()

    // Prevent deleting if no valid Clerk user ID
    if (!userId || !userId.startsWith("user_")) {
      console.error("[v0] Cannot delete goal - no Clerk user ID")
      return
    }

    const goals = this.getGoals().filter((goal) => goal.id !== id)
    this.saveGoals(goals)
    // Automatically save to user account
    this.saveCurrentUserData()
  }

  // Learning Progress Management
  getLearningProgress(): LearningProgress {
    if (typeof window === "undefined") return this.defaultLearningProgress

    try {
      const userId = this.getClerkUserId()

      // Return default if no Clerk user ID
      if (!userId || !userId.startsWith("user_")) {
        console.log("[v0] No Clerk user authenticated - returning default learning progress")
        return this.defaultLearningProgress
      }

      const storageKey = this.getUserStorageKey(this.STORAGE_KEYS.LEARNING_PROGRESS, userId)
      const stored = localStorage.getItem(storageKey)
      return stored ? JSON.parse(stored) : this.defaultLearningProgress
    } catch (error) {
      console.error("Error loading learning progress:", error)
      return this.defaultLearningProgress
    }
  }

  saveLearningProgress(progress: Partial<LearningProgress>): void {
    if (typeof window === "undefined") return

    try {
      const userId = this.getClerkUserId()

      if (!userId || !userId.startsWith("user_")) {
        console.error("[v0] Cannot save learning progress - no Clerk user authenticated")
        return
      }

      const currentProgress = this.getLearningProgress()
      const updatedProgress = { ...currentProgress, ...progress }
      const storageKey = this.getUserStorageKey(this.STORAGE_KEYS.LEARNING_PROGRESS, userId)
      localStorage.setItem(storageKey, JSON.stringify(updatedProgress))

      console.log("[v0] Triggering database sync for Clerk user:", userId)
      this.syncToDatabase(userId).catch(console.error)
    } catch (error) {
      console.error("Error saving learning progress:", error)
    }
  }

  completeModule(moduleId: string): void {
    const userId = this.getClerkUserId()

    // Prevent completion if no valid Clerk user ID
    if (!userId || !userId.startsWith("user_")) {
      console.error("[v0] Cannot complete module - no Clerk user ID")
      return
    }

    const progress = this.getLearningProgress()
    if (!progress.completedModules.includes(moduleId)) {
      progress.completedModules.push(moduleId)
      progress.totalProgress = Math.min(100, progress.totalProgress + 10)
      this.saveLearningProgress(progress)
    }
  }

  getCompletedModulesCount(): number {
    const userProgress = this.getUserProgress()
    const count = userProgress.completedModules?.length || 0
    console.log("[v0] getCompletedModulesCount:", count, "modules:", userProgress.completedModules)
    return count
  }

  calculateOverallLearningProgress(): number {
    const userProgress = this.getUserProgress()
    const progress = Math.round(userProgress.totalProgress || 0)
    console.log(
      "[v0] calculateOverallLearningProgress:",
      progress,
      "% (totalProgress:",
      userProgress.totalProgress,
      ")",
    )
    return progress
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

  updateLessonProgress(moduleId: string, lessonIndex: number, completed: boolean): void {
    if (typeof window === "undefined") return

    try {
      const userId = this.getClerkUserId()

      // Prevent update if no valid Clerk user ID
      if (!userId || !userId.startsWith("user_")) {
        console.error("[v0] Cannot update lesson progress - no Clerk user ID")
        return
      }

      const userProgress = this.getUserProgress()

      // Ensure modules object exists
      if (!userProgress.modules) {
        userProgress.modules = {}
      }

      // Get or create module progress
      if (!userProgress.modules[moduleId]) {
        userProgress.modules[moduleId] = {
          completedLessons: [],
          currentLesson: 0,
          completed: false,
          lastAccessed: new Date().toISOString(),
        }
      }

      const moduleProgress = userProgress.modules[moduleId]

      // Update current lesson
      moduleProgress.currentLesson = lessonIndex
      moduleProgress.lastAccessed = new Date().toISOString() // Fixed typo here: modulemoduleProgress to moduleProgress

      // Update completed lessons
      if (completed && !moduleProgress.completedLessons.includes(lessonIndex)) {
        moduleProgress.completedLessons.push(lessonIndex)
        moduleProgress.completedLessons.sort((a, b) => a - b)

        userProgress.completedLessons = (userProgress.completedLessons || 0) + 1
      }

      // Import learningModules to check total lessons per module
      const learningModules = this.getLearningModules()
      const currentModule = learningModules.find((m) => m.id === moduleId)

      if (currentModule) {
        const totalLessons = currentModule.lessons
        const completedLessonsCount = moduleProgress.completedLessons.length

        // Check if module is now completed
        if (completedLessonsCount >= totalLessons && !moduleProgress.completed) {
          moduleProgress.completed = true

          // Add to completedModules if not already there
          if (!userProgress.completedModules.includes(moduleId)) {
            userProgress.completedModules.push(moduleId)
          }
        }
      }

      const totalModules = learningModules.length
      const completedModulesCount = userProgress.completedModules.length
      userProgress.totalProgress = totalModules > 0 ? Math.round((completedModulesCount / totalModules) * 100) : 0

      this.updateStreak(userProgress)

      // Save updated progress
      this.saveUserProgress(userProgress)

      console.log(`📚 Lesson progress updated: Module ${moduleId}, Lesson ${lessonIndex}, Completed: ${completed}`)
      console.log(
        `📊 Overall progress: ${userProgress.totalProgress}%, Completed modules: ${userProgress.completedModules.length}, Streak: ${userProgress.currentStreak} days`,
      )
    } catch (error) {
      console.error("Error updating lesson progress:", error)
    }
  }

  updateStreak(userProgress: UserProgress): void {
    const today = new Date().toISOString().split("T")[0]
    const lastActive = userProgress.lastActiveDate?.split("T")[0]

    if (lastActive !== today) {
      // User is active today (different from last active date)
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

      if (lastActive === yesterday) {
        // Consecutive day - increment streak
        userProgress.currentStreak = (userProgress.currentStreak || 0) + 1
        console.log(`🔥 Streak incremented to ${userProgress.currentStreak} days`)
      } else if (!lastActive || lastActive < yesterday) {
        // Streak broken - reset to 0
        userProgress.currentStreak = 0
        console.log(`❌ Streak broken - reset to 0`)
      }

      // Update days active
      userProgress.daysActive = (userProgress.daysActive || 0) + 1
      userProgress.lastActiveDate = new Date().toISOString()
    }
  }

  checkAndUpdateDailyStreak(): void {
    if (typeof window === "undefined") return

    try {
      const userId = this.getClerkUserId()

      // Prevent check if no valid Clerk user ID
      if (!userId || !userId.startsWith("user_")) {
        console.log("[v0] Cannot check streak - no Clerk user ID")
        return
      }

      const userProgress = this.getUserProgress()
      const today = new Date().toISOString().split("T")[0]
      const lastActive = userProgress.lastActiveDate?.split("T")[0]

      // Only update if this is a new day
      if (lastActive !== today) {
        this.updateStreak(userProgress)
        this.saveUserProgress(userProgress)
        console.log(`✅ Daily streak checked and updated: ${userProgress.currentStreak} days`)
      } else {
        console.log(`ℹ️ Already active today - streak: ${userProgress.currentStreak} days`)
      }
    } catch (error) {
      console.error("Error checking daily streak:", error)
    }
  }

  // Helper method to get learning modules data
  private getLearningModules() {
    // Return the learning modules structure
    // This should match the structure in lib/learning-data.ts
    return [
      { id: "budgeting-basics", lessons: 5 },
      { id: "saving-strategies", lessons: 4 },
      { id: "debt-management", lessons: 4 },
      { id: "investing-101", lessons: 5 },
      { id: "credit-scores", lessons: 4 },
      { id: "retirement-planning", lessons: 5 },
      { id: "tax-basics", lessons: 4 },
      { id: "insurance-guide", lessons: 4 },
    ]
  }

  clearLegacyBudgetData(): void {
    if (typeof window === "undefined") return

    try {
      // Clear old data that doesn't have user ID suffix
      const legacyKeys = [
        this.STORAGE_KEYS.BUDGET_DATA + ":categories",
        this.STORAGE_KEYS.BUDGET_DATA + ":entries",
        this.STORAGE_KEYS.BUDGET_DATA,
      ]

      legacyKeys.forEach((key) => {
        if (localStorage.getItem(key)) {
          console.log("[v0] Clearing legacy data from:", key)
          localStorage.removeItem(key)
        }
      })

      console.log("[v0] Legacy budget data cleared")
    } catch (error) {
      console.error("Error clearing legacy budget data:", error)
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
