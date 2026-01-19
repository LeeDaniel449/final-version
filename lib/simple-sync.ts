"use client"

// Simple cross-device sync using Supabase
// When user signs in: Load from Supabase -> Save to localStorage
// When user changes data: Save to localStorage -> Upload to Supabase

export interface SyncData {
  budgetCategories: any[]
  budgetEntries: any[]
  goals: any[]
  userProgress: any
  learningProgress: any
}

const STORAGE_PREFIX = "wealthwise_"

export async function loadFromCloud(userId: string): Promise<SyncData | null> {
  console.log("[SYNC] Loading data from Supabase for:", userId)
  
  try {
    const response = await fetch("/api/user-data", {
      method: "GET",
      headers: { "x-user-id": userId },
    })
    
    if (!response.ok) {
      console.log("[SYNC] No data in Supabase")
      return null
    }
    
    const { data } = await response.json()
    
    if (!data || Object.keys(data).length === 0) {
      console.log("[SYNC] Supabase returned empty data")
      return null
    }
    
    console.log("[SYNC] Got data from Supabase:", {
      categories: data.budgetCategories?.length || 0,
      entries: data.budgetEntries?.length || 0,
      goals: data.goals?.length || 0,
    })
    
    return data as SyncData
  } catch (error) {
    console.error("[SYNC] Error loading from Supabase:", error)
    return null
  }
}

export async function saveToCloud(userId: string, data: SyncData): Promise<boolean> {
  // Don't upload empty data
  if (!data.budgetCategories?.length && !data.budgetEntries?.length && !data.goals?.length) {
    console.log("[SYNC] Skipping upload - no data to save")
    return false
  }
  
  console.log("[SYNC] Saving to Supabase:", {
    categories: data.budgetCategories?.length || 0,
    entries: data.budgetEntries?.length || 0,
    goals: data.goals?.length || 0,
  })
  
  try {
    const response = await fetch("/api/user-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId,
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      console.error("[SYNC] Failed to save to Supabase")
      return false
    }
    
    console.log("[SYNC] Successfully saved to Supabase")
    return true
  } catch (error) {
    console.error("[SYNC] Error saving to Supabase:", error)
    return false
  }
}

export function saveToLocal(userId: string, data: SyncData): void {
  if (typeof window === "undefined") return
  
  console.log("[SYNC] Saving to localStorage for:", userId)
  
  if (data.budgetCategories) {
    localStorage.setItem(`${STORAGE_PREFIX}budget_categories_${userId}`, JSON.stringify(data.budgetCategories))
  }
  if (data.budgetEntries) {
    localStorage.setItem(`${STORAGE_PREFIX}budget_entries_${userId}`, JSON.stringify(data.budgetEntries))
  }
  if (data.goals) {
    localStorage.setItem(`${STORAGE_PREFIX}goals_${userId}`, JSON.stringify(data.goals))
  }
  if (data.userProgress) {
    localStorage.setItem(`${STORAGE_PREFIX}user_progress_${userId}`, JSON.stringify(data.userProgress))
  }
  if (data.learningProgress) {
    localStorage.setItem(`${STORAGE_PREFIX}learning_progress_${userId}`, JSON.stringify(data.learningProgress))
  }
}

export function loadFromLocal(userId: string): SyncData | null {
  if (typeof window === "undefined") return null
  
  console.log("[SYNC] Loading from localStorage for:", userId)
  
  const categories = localStorage.getItem(`${STORAGE_PREFIX}budget_categories_${userId}`)
  const entries = localStorage.getItem(`${STORAGE_PREFIX}budget_entries_${userId}`)
  const goals = localStorage.getItem(`${STORAGE_PREFIX}goals_${userId}`)
  const progress = localStorage.getItem(`${STORAGE_PREFIX}user_progress_${userId}`)
  const learning = localStorage.getItem(`${STORAGE_PREFIX}learning_progress_${userId}`)
  
  const data: SyncData = {
    budgetCategories: categories ? JSON.parse(categories) : [],
    budgetEntries: entries ? JSON.parse(entries) : [],
    goals: goals ? JSON.parse(goals) : [],
    userProgress: progress ? JSON.parse(progress) : { completedModules: [], completedLessons: {} },
    learningProgress: learning ? JSON.parse(learning) : {},
  }
  
  console.log("[SYNC] Loaded from localStorage:", {
    categories: data.budgetCategories.length,
    entries: data.budgetEntries.length,
    goals: data.goals.length,
  })
  
  return data
}

// Find data stored under old/legacy keys
export function findLegacyData(email: string): SyncData | null {
  if (typeof window === "undefined") return null
  
  // All possible prefixes that data might be stored under
  const prefixes = [
    "wealthwise_",
    "wealthwise_user_data_",
  ]
  
  // All possible user ID formats
  const userIds = [
    email,
    `legacy_${email}`,
  ]
  
  console.log("[SYNC] Searching for legacy data...")
  
  for (const prefix of prefixes) {
    for (const userId of userIds) {
      const catKey = `${prefix}budget_categories_${userId}`
      const entKey = `${prefix}budget_entries_${userId}`
      const goalKey = `${prefix}goals_${userId}`
      
      console.log("[SYNC] Checking key:", catKey)
      
      const categories = localStorage.getItem(catKey)
      const entries = localStorage.getItem(entKey)
      const goals = localStorage.getItem(goalKey)
      
      if (categories || entries || goals) {
        console.log("[SYNC] FOUND legacy data at prefix:", prefix, "userId:", userId)
        
        const progress = localStorage.getItem(`${prefix}user_progress_${userId}`)
        const learning = localStorage.getItem(`${prefix}learning_progress_${userId}`)
        
        const data = {
          budgetCategories: categories ? JSON.parse(categories) : [],
          budgetEntries: entries ? JSON.parse(entries) : [],
          goals: goals ? JSON.parse(goals) : [],
          userProgress: progress ? JSON.parse(progress) : { completedModules: [], completedLessons: {} },
          learningProgress: learning ? JSON.parse(learning) : {},
        }
        
        console.log("[SYNC] Legacy data found:", {
          categories: data.budgetCategories.length,
          entries: data.budgetEntries.length,
          goals: data.goals.length,
        })
        
        return data
      }
    }
  }
  
  console.log("[SYNC] No legacy data found")
  return null
}

// Main sync function - call when user signs in
export async function syncOnSignIn(clerkUserId: string, userEmail: string): Promise<SyncData> {
  console.log("[SYNC] === SYNC ON SIGN IN ===")
  console.log("[SYNC] Clerk User ID:", clerkUserId)
  console.log("[SYNC] Email:", userEmail)
  
  // Step 1: Try to load from Supabase
  const cloudData = await loadFromCloud(clerkUserId)
  
  if (cloudData && (cloudData.budgetCategories?.length || cloudData.budgetEntries?.length || cloudData.goals?.length)) {
    console.log("[SYNC] Using data from Supabase")
    saveToLocal(clerkUserId, cloudData)
    return cloudData
  }
  
  // Step 2: Check localStorage for this user
  const localData = loadFromLocal(clerkUserId)
  
  if (localData && (localData.budgetCategories?.length || localData.budgetEntries?.length || localData.goals?.length)) {
    console.log("[SYNC] Using data from localStorage, uploading to Supabase")
    await saveToCloud(clerkUserId, localData)
    return localData
  }
  
  // Step 3: Check for legacy data (stored under email)
  const legacyData = findLegacyData(userEmail)
  
  if (legacyData && (legacyData.budgetCategories?.length || legacyData.budgetEntries?.length || legacyData.goals?.length)) {
    console.log("[SYNC] Found legacy data! Migrating to new user ID")
    saveToLocal(clerkUserId, legacyData)
    await saveToCloud(clerkUserId, legacyData)
    return legacyData
  }
  
  // No data found anywhere
  console.log("[SYNC] No existing data found - starting fresh")
  return {
    budgetCategories: [],
    budgetEntries: [],
    goals: [],
    userProgress: { completedModules: [], completedLessons: {} },
    learningProgress: {},
  }
}
