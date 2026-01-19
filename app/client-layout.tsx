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
    // Get user ID from Clerk OR from localStorage
    const clerkUserId = user?.id
    const storedUserId = typeof window !== "undefined" ? localStorage.getItem("wealthwise_clerk_user_id") : null
    const userId = clerkUserId || storedUserId
    
    // Get email from Clerk or localStorage
    const clerkEmail = user?.primaryEmailAddress?.emailAddress
    const storedEmail = typeof window !== "undefined" ? localStorage.getItem("wealthwise_current_user") : null
    const email = clerkEmail || storedEmail || ""

    // Skip if no user ID at all, or already synced
    if (!userId || syncedRef.current) return
    
    // If Clerk is still loading and we have a stored ID, use it
    // If Clerk is loaded and has no user but we have stored ID, also try sync
    if (!isLoaded && !storedUserId) return

    const doSync = async () => {
      syncedRef.current = true
      setSyncing(true)
      
      console.log("[SYNC] Starting sync for user:", userId, "email:", email)
      
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
