"use client"

import React from "react"
import { Home, BookOpen, Calculator, Target, Bot, LifeBuoy, Send, LogOut } from "lucide-react"
import { UserButton } from "@/components/user-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
import { useUser, useClerk } from "@clerk/nextjs"

/*
  Helpers ────────────────────────────────────────────────────────────────────
*/
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
export function AppSidebar({
  disableClerk,
  ...props
}: React.ComponentProps<typeof Sidebar> & { disableClerk?: boolean }) {
  const clerkUser = useUser()
  const clerk = useClerk()
  let user: any = { isSignedIn: false, isLoaded: true, user: null }
  let signOut: any = null

  if (!disableClerk) {
    user = clerkUser
    signOut = clerk.signOut
  } else {
    console.warn("[v0] Clerk hooks not available, using guest mode")
  }

  const isSignedIn = user.isSignedIn || false
  const userProfile = userDataManager.getUserProfile()
  const isLoaded = user.isLoaded || false

  const [profile, setProfile] = React.useState(userProfile)

  /* ----------------------------------------------------------------------- */
  /*  Sync with auth-state changes                                           */
  /* ----------------------------------------------------------------------- */
  React.useEffect(() => {
    function refreshProfile() {
      const currentProfile = userDataManager.getUserProfile()
      setProfile((prev) => (JSON.stringify(prev) !== JSON.stringify(currentProfile) ? currentProfile : prev))
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
    if (user.user?.firstName && user.user?.lastName) return `${user.user.firstName} ${user.user.lastName}`
    if (user.user?.firstName) return user.user.firstName
    if (user.user?.username) return user.user.username
    if (profile?.firstName) return profile.firstName
    return user.user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "Guest"
  }, [isSignedIn, profile, isLoaded])

  const displayEmail = React.useMemo(() => {
    if (!isLoaded) return "..."
    if (!isSignedIn) return "Not signed in"
    return user.user?.emailAddresses?.[0]?.emailAddress || profile?.email || "No email"
  }, [isSignedIn, profile, isLoaded])

  /* ----------------------------------------------------------------------- */
  /*  Sidebar navigation data                                                */
  /* ----------------------------------------------------------------------- */
  const navMain = [
    { title: "Home", url: "/", icon: Home },
    {
      title: "Learning Hub",
      url: "/learning",
      icon: BookOpen,
    },
    {
      title: "Budget Tracker",
      url: "/budget",
      icon: Calculator,
    },
    {
      title: "Goals & Planning",
      url: "/goals",
      icon: Target,
    },
    { title: "AI Advisor", url: "/ai-advisor", icon: Bot },
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
              <Link href="/">
                <div className="flex size-16 items-center justify-center rounded-lg overflow-hidden">
                  <img
                    src="/images/design-mode/image%281%29(1).png"
                    alt="WealthLink Logo"
                    className="size-16 object-contain"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-none -space-y-1 -ml-2">
                  <span className="truncate font-semibold leading-6 text-blue-800 text-lg">WealthLink</span>
                  <span className="text-xs text-blue-800 whitespace-nowrap">Spend Smart, Save Fast</span>
                </div>
              </Link>
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
              <div className="hidden md:block">{isSignedIn && !disableClerk && <UserButton />}</div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{displayName}</span>
                <span className="truncate text-xs">{displayEmail}</span>
              </div>
              {isSignedIn && signOut && !disableClerk && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden min-h-[48px] min-w-[48px] touch-manipulation"
                  onClick={() => {
                    console.log("[v0] Mobile sign out button clicked")
                    signOut()
                  }}
                  aria-label="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
