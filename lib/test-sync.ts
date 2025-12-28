import { userDataManager } from "./user-data"

// Test cross-device sync functionality
export async function testCrossDeviceSync() {
  console.log("[v0] ========================================")
  console.log("[v0] 🧪 TESTING CROSS-DEVICE SYNC")
  console.log("[v0] ========================================")

  // Step 1: Check current user
  const userId = userDataManager.getUserIdForStorage()
  console.log("[v0] Current user ID:", userId)

  if (!userId) {
    console.log("[v0] ❌ No user authenticated - cannot test sync")
    return
  }

  // Step 2: Add test data
  console.log("[v0] 📝 Adding test budget category...")
  userDataManager.updateBudgetCategory("Test Category", {
    budgetAmount: 1000,
    spentAmount: 250,
    type: "expense",
  })

  // Step 3: Verify it saved to localStorage
  const categories = userDataManager.getBudgetCategories()
  console.log("[v0] ✅ Categories in localStorage:", categories.length)

  // Step 4: Trigger manual sync
  console.log("[v0] 🚀 Manually triggering Supabase sync...")
  await userDataManager.syncToDatabase(userId)

  // Step 5: Clear localStorage and load from Supabase
  console.log("[v0] 🧹 Clearing localStorage to simulate new device...")
  localStorage.clear()

  console.log("[v0] 📥 Loading from Supabase...")
  await userDataManager.loadFromDatabase(userId)

  // Step 6: Check if data loaded
  const loadedCategories = userDataManager.getBudgetCategories()
  console.log("[v0] ✅ Categories loaded from Supabase:", loadedCategories.length)

  if (loadedCategories.length > 0) {
    console.log("[v0] ✅✅✅ CROSS-DEVICE SYNC WORKS! ✅✅✅")
  } else {
    console.log("[v0] ❌ Cross-device sync failed - no data loaded")
  }

  console.log("[v0] ========================================")
}

// Add to window for manual testing in console
if (typeof window !== "undefined") {
  ;(window as any).testSync = testCrossDeviceSync
}
