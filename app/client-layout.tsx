"use client"

import type React from "react"
import { Suspense, useEffect, useState, useRef } from "react"
import { ClerkProvider, useUser } from "@clerk/nextjs"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PremiumGate } from "@/components/premium-gate"
import { userDataManager } from "@/lib/user-data"
import { EnvDiagnostic } from "@/components/env-diagnostic"
import { syncOnSignIn, saveToCloud, loadFromLocal } from "@/lib/simple-sync"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Loader2 } from "lucide-react"
import { ClerkUserIdSync } from "@/components/clerk-user-id-sync" // Added import

function SafeSidebar({ hasClerk }: { hasClerk: boolean }) {
  return <AppSidebar disableClerk={!hasClerk} />
}

// Simple sync component - loads data from Supabase when user signs in
function DataSync() {
  const { user, isLoaded } = useUser()
  const [syncing, setSyncing] = useState(false)
  const [synced, setSynced] = useState(false)
  const syncedRef = useRef(false)

  // CLEAR legacy auth on startup - prevent data leakage
  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.removeItem("wealthwise_authenticated")
    localStorage.removeItem("wealthwise_current_user")
  }, [])

  // Fallback sync using stored user ID when Clerk fails to load
  useEffect(() => {
    if (typeof window === "undefined" || syncedRef.current) return
    
    // Wait a bit for Clerk, then fallback to stored user ID
    const fallbackTimer = setTimeout(async () => {
      if (syncedRef.current) return
      
      const storedUserId = localStorage.getItem("wealthwise_clerk_user_id")
      if (!storedUserId || !storedUserId.startsWith("user_")) return
      
      console.log("[SYNC] Clerk timeout - using stored user ID:", storedUserId)
      syncedRef.current = true
      setSyncing(true)
      
      userDataManager.setClerkUserId(storedUserId)
      
      // Load from Supabase
      const data = await syncOnSignIn(storedUserId, "")
      
      if (data.budgetCategories?.length || data.budgetEntries?.length || data.goals?.length) {
        localStorage.setItem(`wealthwise_budget_categories_${storedUserId}`, JSON.stringify(data.budgetCategories || []))
        localStorage.setItem(`wealthwise_budget_entries_${storedUserId}`, JSON.stringify(data.budgetEntries || []))
        localStorage.setItem(`wealthwise_goals_${storedUserId}`, JSON.stringify(data.goals || []))
        if (data.userProgress) {
          localStorage.setItem(`wealthwise_user_progress_${storedUserId}`, JSON.stringify(data.userProgress))
        }
        
        console.log("[SYNC] Fallback sync complete, triggering UI update")
        window.dispatchEvent(new Event("storage"))
        window.dispatchEvent(new CustomEvent("userDataUpdated"))
      }
      
      setSyncing(false)
      setSynced(true)
      setTimeout(() => setSynced(false), 2000)
    }, 2000) // 2 second timeout before fallback
    
    return () => clearTimeout(fallbackTimer)
  }, [])

  // Main sync using Clerk user
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!isLoaded || !user?.id || syncedRef.current) return
    
    const clerkUserId = user.id
    const clerkEmail = user.primaryEmailAddress?.emailAddress || ""
    
    // Clear mismatched legacy auth
    const legacyEmail = localStorage.getItem("wealthwise_current_user")
    if (legacyEmail && legacyEmail !== clerkEmail) {
      localStorage.removeItem("wealthwise_authenticated")
      localStorage.removeItem("wealthwise_current_user")
    }

    const doSync = async () => {
      syncedRef.current = true
      setSyncing(true)
      
      console.log("[SYNC] Starting sync for Clerk user:", clerkUserId, "email:", clerkEmail)
      
      // Store the Clerk user ID for future fallback
      localStorage.setItem("wealthwise_clerk_user_id", clerkUserId)
      localStorage.removeItem("wealthwise_authenticated")
      localStorage.removeItem("wealthwise_current_user")
      
      userDataManager.setClerkUserId(clerkUserId)
      
      const data = await syncOnSignIn(clerkUserId, clerkEmail)
      
      if (data.budgetCategories?.length || data.budgetEntries?.length || data.goals?.length) {
        localStorage.setItem(`wealthwise_budget_categories_${clerkUserId}`, JSON.stringify(data.budgetCategories || []))
        localStorage.setItem(`wealthwise_budget_entries_${clerkUserId}`, JSON.stringify(data.budgetEntries || []))
        localStorage.setItem(`wealthwise_goals_${clerkUserId}`, JSON.stringify(data.goals || []))
        if (data.userProgress) {
          localStorage.setItem(`wealthwise_user_progress_${clerkUserId}`, JSON.stringify(data.userProgress))
        }
        
        console.log("[SYNC] Data saved to localStorage, triggering UI update")
        window.dispatchEvent(new Event("storage"))
        window.dispatchEvent(new CustomEvent("userDataUpdated"))
      } else {
        console.log("[SYNC] No data found to sync")
      }
      
      setSyncing(false)
      setSynced(true)
      setTimeout(() => setSynced(false), 2000)
    }

    doSync()
  }, [isLoaded, user?.id, user?.primaryEmailAddress?.emailAddress])

  // Auto-save to cloud when data changes
  useEffect(() => {
    if (!user?.id) return

    const handleDataChange = async () => {
      const localData = loadFromLocal(user.id)
      if (localData) {
        await saveToCloud(user.id, localData)
      }
    }

    window.addEventListener("userDataUpdated", handleDataChange)
    return () => window.removeEventListener("userDataUpdated", handleDataChange)
  }, [user?.id])

  if (syncing) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Alert className="w-auto shadow-lg">
          <Loader2 className="h-4 w-4 animate-spin" />
          <AlertTitle>Syncing...</AlertTitle>
          <AlertDescription>Loading your data</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (synced) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Alert className="w-auto shadow-lg">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>Synced!</AlertTitle>
        </Alert>
      </div>
    )
  }

  return null
}

function AppWithoutClerk({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SafeSidebar hasClerk={false} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function ClerkLoadingWrapper({
  children,
  clerkPublishableKey,
}: {
  children: React.ReactNode
  clerkPublishableKey: string
}) {
  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      appearance={{
        elements: {
          rootBox: "clerk-root-box",
        },
      }}
    >
      <DataSync />
      <SidebarProvider>
        <SafeSidebar hasClerk={true} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <main className="flex-1 p-4 md:p-6">
            <Suspense fallback={<div>Loading...</div>}>
              <PremiumGate>{children}</PremiumGate>
            </Suspense>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ClerkProvider>
  )
}

export default function ClientLayout({
  children,
  clerkPublishableKey,
}: {
  children: React.ReactNode
  clerkPublishableKey: string
}) {
  if (!clerkPublishableKey) {
    return (
      <>
        <EnvDiagnostic />
        <AppWithoutClerk>{children}</AppWithoutClerk>
      </>
    )
  }

  return <ClerkLoadingWrapper clerkPublishableKey={clerkPublishableKey}>{children}</ClerkLoadingWrapper>
}
