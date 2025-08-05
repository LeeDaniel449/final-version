// User profile interface
export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  age: number
  riskTolerance: "conservative" | "moderate" | "aggressive"
  investmentExperience: "beginner" | "intermediate" | "advanced"
  timeHorizon: "short" | "medium" | "long"
}

// Budget data interface
export interface BudgetData {
  income: number
  expenses: {
    housing: number
    food: number
    transportation: number
    utilities: number
    entertainment: number
    other: number
  }
  savings: number
}

// Goal interface
export interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  status: "active" | "completed" | "paused"
  category: "emergency" | "retirement" | "vacation" | "home" | "education" | "other"
}

// User progress interface
export interface UserProgress {
  completedLessons: number
  currentStreak: number
  totalXP: number
  badges: string[]
  lastLoginDate: string
}

// User data interface
export interface UserData {
  isSignedIn: boolean
  profile: UserProfile
  budgetData: BudgetData
  goals: Goal[]
  progress: UserProgress
}

// Learning progress interface
interface LearningProgress {
  completedModules: string[]
  currentModule: string | null
  totalProgress: number
  achievements: string[]
}

// Module progress interface
interface ModuleProgress {
  completedLessons: number[]
  currentLesson: number
  completed: boolean
  lastAccessed: string
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

// Declare learningModules variable
const learningModules = [
  { id: "1", lessons: 5 },
  { id: "2", lessons: 3 },
  { id: "3", lessons: 4 },
]

class UserDataManager {
  private static instance: UserDataManager
  private userData: UserData

  constructor() {
    this.userData = this.loadUserData()
  }

  static getInstance(): UserDataManager {
    if (!UserDataManager.instance) {
      UserDataManager.instance = new UserDataManager()
    }
    return UserDataManager.instance
  }

  private loadUserData(): UserData {
    if (typeof window === "undefined") {
      return this.getDefaultUserData()
    }

    try {
      const stored = localStorage.getItem("financialLiteracyUserData")
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    }

    return this.getDefaultUserData()
  }

  private getDefaultUserData(): UserData {
    return {
      isSignedIn: false,
      profile: {
        firstName: "Demo",
        lastName: "User",
        email: "demo@example.com",
        age: 28,
        riskTolerance: "moderate",
        investmentExperience: "beginner",
        timeHorizon: "long",
      },
      budgetData: {
        income: 5000,
        expenses: {
          housing: 1500,
          food: 600,
          transportation: 400,
          utilities: 200,
          entertainment: 300,
          other: 200,
        },
        savings: 800,
      },
      goals: [
        {
          id: "1",
          title: "Emergency Fund",
          targetAmount: 10000,
          currentAmount: 3500,
          deadline: "2024-12-31",
          status: "active",
          category: "emergency",
        },
        {
          id: "2",
          title: "Vacation to Europe",
          targetAmount: 5000,
          currentAmount: 1200,
          deadline: "2024-08-15",
          status: "active",
          category: "vacation",
        },
      ],
      progress: {
        completedLessons: 12,
        currentStreak: 5,
        totalXP: 2400,
        badges: ["First Steps", "Budget Master", "Saver"],
        lastLoginDate: new Date().toISOString(),
      },
    }
  }

  private saveUserData(): void {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("financialLiteracyUserData", JSON.stringify(this.userData))
        this.dispatchUserDataChange()
      } catch (error) {
        console.error("Error saving user data:", error)
      }
    }
  }

  private dispatchUserDataChange(): void {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("userDataChanged", { detail: this.userData }))
    }
  }

  // Public methods
  isUserSignedIn(): boolean {
    return this.userData.isSignedIn
  }

  getUserProfile(): UserProfile {
    return this.userData.profile
  }

  getUserProgress(): UserProgress {
    return this.userData.progress
  }

  getBudgetData(): BudgetData {
    return this.userData.budgetData
  }

  getGoals(): Goal[] {
    return this.userData.goals
  }

  getUserData(): UserData {
    return this.userData
  }

  signIn(email: string, password: string): boolean {
    // Simple demo authentication
    if (email === "demo@example.com" && password === "demo123") {
      this.userData.isSignedIn = true
      this.userData.progress.lastLoginDate = new Date().toISOString()
      this.saveUserData()
      return true
    }
    return false
  }

  signOut(): void {
    this.userData.isSignedIn = false
    this.saveUserData()
  }

  updateProfile(profile: Partial<UserProfile>): void {
    this.userData.profile = { ...this.userData.profile, ...profile }
    this.saveUserData()
  }

  updateBudget(budgetData: Partial<BudgetData>): void {
    this.userData.budgetData = { ...this.userData.budgetData, ...budgetData }
    this.saveUserData()
  }

  addGoal(goal: Omit<Goal, "id">): void {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
    }
    this.userData.goals.push(newGoal)
    this.saveUserData()
  }

  updateGoal(goalId: string, updates: Partial<Goal>): void {
    const goalIndex = this.userData.goals.findIndex((g) => g.id === goalId)
    if (goalIndex !== -1) {
      this.userData.goals[goalIndex] = { ...this.userData.goals[goalIndex], ...updates }
      this.saveUserData()
    }
  }

  deleteGoal(goalId: string): void {
    this.userData.goals = this.userData.goals.filter((g) => g.id !== goalId)
    this.saveUserData()
  }

  updateProgress(progress: Partial<UserProgress>): void {
    this.userData.progress = { ...this.userData.progress, ...progress }
    this.saveUserData()
  }

  completeLesson(lessonId: string): void {
    this.userData.progress.completedLessons += 1
    this.userData.progress.totalXP += 100
    this.userData.progress.currentStreak += 1
    this.saveUserData()
  }

  addBadge(badge: string): void {
    if (!this.userData.progress.badges.includes(badge)) {
      this.userData.progress.badges.push(badge)
      this.saveUserData()
    }
  }
}

// Export singleton instance
export const userDataManager = UserDataManager.getInstance()

// Export convenience function
export function getUserData(): UserData {
  return userDataManager.getUserData()
}
