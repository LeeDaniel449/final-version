"use client"

import React from "react"
import { Home, BookOpen, Calculator, Target, Bot, LifeBuoy, Send, Command, User2 } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { userDataManager } from "@/lib/user-data"

/*
  Helpers ────────────────────────────────────────────────────────────────────
*/
const cacheBust = "123"

function getDisplayName(profile: any, isSignedIn: boolean) {
  if (!isSignedIn) return "Guest"
  if (profile.username) return profile.username
  if (profile.firstName && profile.lastName) return `${profile.firstName} ${profile.lastName}`
  if (profile.firstName) return profile.firstName
  if (profile.email) return profile.email.split("@")[0]
  return "Guest"
}

function getDisplayEmail(profile: any, isSignedIn: boolean) {
  if (!isSignedIn) return "Not signed in"
  return profile.email || "No email"
}

/*
  Component ──────────────────────────────────────────────────────────────────
*/
export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [userProfile, setUserProfile] = React.useState(userDataManager.getUserProfile())
  const [isSignedIn, setIsSignedIn] = React.useState(userDataManager.isUserSignedIn())

  /* ----------------------------------------------------------------------- */
  /*  Sync with auth-state changes                                           */
  /* ----------------------------------------------------------------------- */
  React.useEffect(() => {
    function refreshProfile() {
      const profile = userDataManager.getUserProfile()
      const signedIn = userDataManager.isUserSignedIn()

      // Only update when something actually changed
      setUserProfile((prev) => (JSON.stringify(prev) !== JSON.stringify(profile) ? profile : prev))
      setIsSignedIn((prev) => (prev !== signedIn ? signedIn : prev))
    }

    /* 1️⃣  Custom events from the auth flow */
    const handleUserSignedIn = () => refreshProfile()
    const handleUserDataUpdated = () => refreshProfile()

    /* 2️⃣  Cross-tab updates via localStorage */
    const handleStorage = (e: StorageEvent) => {
      if (e.key?.startsWith("wealthwise:")) refreshProfile()
    }

    /* 3️⃣  (Optional) Fallback polling every 5 s                          */
    const poll = setInterval(refreshProfile, 5000)

    window.addEventListener("userSignedIn", handleUserSignedIn)
    window.addEventListener("userDataUpdated", handleUserDataUpdated)
    window.addEventListener("storage", handleStorage)

    // Initial load (in case something changed before mount)
    refreshProfile()

    return () => {
      clearInterval(poll)
      window.removeEventListener("userSignedIn", handleUserSignedIn)
      window.removeEventListener("userDataUpdated", handleUserDataUpdated)
      window.removeEventListener("storage", handleStorage)
    }
  }, []) // ← run once

  /* ----------------------------------------------------------------------- */
  /*  Derived display values                                                 */
  /* ----------------------------------------------------------------------- */
  const displayName = React.useMemo(() => getDisplayName(userProfile, isSignedIn), [userProfile, isSignedIn])
  const displayEmail = React.useMemo(() => getDisplayEmail(userProfile, isSignedIn), [userProfile, isSignedIn])

  /* ----------------------------------------------------------------------- */
  /*  Sidebar navigation data                                                */
  /* ----------------------------------------------------------------------- */
  const navMain = [
    { title: "Home", url: `/?cache-bust=${cacheBust}`, icon: Home },
    {
      title: "Learning Hub",
      url: `/learning?cache-bust=${cacheBust}`,
      icon: BookOpen,
    },
    {
      title: "Budget Tracker",
      url: `/budget?cache-bust=${cacheBust}`,
      icon: Calculator,
    },
    {
      title: "Goals & Planning",
      url: `/goals?cache-bust=${cacheBust}`,
      icon: Target,
    },
    { title: "AI Advisor", url: `/ai-advisor?cache-bust=${cacheBust}`, icon: Bot },
  ]

  const navSecondary = [
    { title: "Support", url: "#", icon: LifeBuoy },
    { title: "Feedback", url: "#", icon: Send },
  ]

  /* ----------------------------------------------------------------------- */
  /*  Render                                                                 */
  /* ----------------------------------------------------------------------- */
  return (
    <Sidebar variant="inset" {...props}>
      {/* ── Brand ─────────────────────────────────────────────────────── */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href={`/?cache-bust=${cacheBust}`}>
                <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">WealthLink</span>
                  <span className="truncate text-xs">Financial Literacy</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ── Main navigation ────────────────────────────────────────────── */}
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* ── User footer ────────────────────────────────────────────────── */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href={`/settings?cache-bust=${cacheBust}`}>
                <User2 className="size-4" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{displayName}</span>
                  <span className="truncate text-xs">{displayEmail}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
