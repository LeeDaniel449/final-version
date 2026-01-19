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

  useEffect(() => {
    if (typeof window === "undefined") return
    
    // Get user ID from Clerk
    const clerkUserId = user?.id
    const clerkEmail = user?.primaryEmailAddress?.emailAddress
    
    // Check for legacy auth data
    const legacyEmail = localStorage.getItem("wealthwise_current_user")
    const hasLegacyAuth = localStorage.getItem("wealthwise_authenticated") === "true"
    
    // If Clerk user is signed in, CLEAR any legacy auth that doesn't match
    if (clerkUserId && clerkEmail) {
      if (hasLegacyAuth && legacyEmail && legacyEmail !== clerkEmail) {
        console.log("[SYNC] Clearing mismatched legacy auth. Clerk email:", clerkEmail, "Legacy email:", legacyEmail)
        localStorage.removeItem("wealthwise_authenticated")
        localStorage.removeItem("wealthwise_current_user")
      }
    }
    
    // Only use Clerk user ID - don't fall back to legacy
    const userId = clerkUserId
    const email = clerkEmail || ""

    // Skip if no Clerk user ID or already synced
    if (!userId || syncedRef.current) return
    if (!isLoaded) return

    const doSync = async () => {
      syncedRef.current = true
      setSyncing(true)
      
      console.log("[SYNC] Starting sync for Clerk user:", userId, "email:", email)
      
      // Clear any legacy auth when using Clerk
      localStorage.removeItem("wealthwise_authenticated")
      localStorage.removeItem("wealthwise_current_user")
      
      // Set the user ID in userDataManager
      userDataManager.setClerkUserId(userId)
      
      // Use simple sync - loads from Supabase, falls back to localStorage/legacy
      const data = await syncOnSignIn(userId, email)
      
      if (data.budgetCategories?.length || data.budgetEntries?.length || data.goals?.length) {
        // Store in localStorage under the user ID
        localStorage.setItem(`wealthwise_budget_categories_${userId}`, JSON.stringify(data.budgetCategories || []))
        localStorage.setItem(`wealthwise_budget_entries_${userId}`, JSON.stringify(data.budgetEntries || []))
        localStorage.setItem(`wealthwise_goals_${userId}`, JSON.stringify(data.goals || []))
        if (data.userProgress) {
          localStorage.setItem(`wealthwise_user_progress_${userId}`, JSON.stringify(data.userProgress))
        }
        
        console.log("[SYNC] Data saved to localStorage, triggering UI update")
        
        // Trigger UI update
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
