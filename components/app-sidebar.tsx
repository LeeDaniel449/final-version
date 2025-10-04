"use client"

import React from "react"
import { Home, BookOpen, Calculator, Target, Bot, LifeBuoy, Send, CreditCard } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { UserButton } from "@/components/user-button"

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
  const { isSignedIn, user, isLoaded } = useUser()
  const [userProfile, setUserProfile] = React.useState(userDataManager.getUserProfile())

  /* ----------------------------------------------------------------------- */
  /*  Sync with auth-state changes                                           */
  /* ----------------------------------------------------------------------- */
  React.useEffect(() => {
    function refreshProfile() {
      const profile = userDataManager.getUserProfile()
      setUserProfile((prev) => (JSON.stringify(prev) !== JSON.stringify(profile) ? profile : prev))
    }

    const handleUserDataUpdated = () => {
      console.log("[v0] Sidebar: User data updated event")
      refreshProfile()
    }

    window.addEventListener("userDataUpdated", handleUserDataUpdated)

    // Initial load
    refreshProfile()

    return () => {
      window.removeEventListener("userDataUpdated", handleUserDataUpdated)
    }
  }, [])

  /* ----------------------------------------------------------------------- */
  /*  Derived display values                                                 */
  /* ----------------------------------------------------------------------- */
  const displayName = React.useMemo(() => {
    if (!isLoaded) return "Loading..."
    if (!isSignedIn) return "Guest"
    if (user?.firstName && user?.lastName) return `${user.firstName} ${user.lastName}`
    if (user?.firstName) return user.firstName
    if (user?.username) return user.username
    if (userProfile?.firstName) return userProfile.firstName
    return user?.emailAddresses[0]?.emailAddress?.split("@")[0] || "Guest"
  }, [isSignedIn, user, userProfile, isLoaded])

  const displayEmail = React.useMemo(() => {
    if (!isLoaded) return "..."
    if (!isSignedIn) return "Not signed in"
    return user?.emailAddresses[0]?.emailAddress || userProfile?.email || "No email"
  }, [isSignedIn, user, userProfile, isLoaded])

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
    { title: "Subscriptions", url: `/subscriptions?cache-bust=${cacheBust}`, icon: CreditCard },
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
                <div className="flex size-16 items-center justify-center rounded-lg overflow-hidden">
                  <img
                    src="/images/design-mode/image%281%29(1).png"
                    alt="WealthLink Logo"
                    className="size-16 object-contain"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-none -space-y-1 -ml-2">
                  <span className="truncate font-semibold leading-6 text-blue-800 text-lg">WealthLink</span>
                  <span className="truncate text-sm text-blue-800">Financial Literacy</span>
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
            <div className="flex items-center gap-3 px-2 py-2">
              <UserButton />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{displayName}</span>
                <span className="truncate text-xs">{displayEmail}</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
