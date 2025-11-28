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
import { useUser, useClerk } from "@clerk/nextjs"

function ClerkUserInfo({ onSignOut }: { onSignOut?: () => void }) {
  const { user, isSignedIn, isLoaded } = useUser()
  const clerk = useClerk()

  const displayName = React.useMemo(() => {
    if (!isLoaded) return "Loading..."
    if (!isSignedIn || !user) return "Guest"
    if (user?.firstName && user?.lastName) return `${user.firstName} ${user.lastName}`
    if (user?.firstName) return user.firstName
    if (user?.username) return user.username
    return user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "Guest"
  }, [isSignedIn, isLoaded, user])

  const displayEmail = React.useMemo(() => {
    if (!isLoaded) return "..."
    if (!isSignedIn || !user) return "Not signed in"
    return user?.emailAddresses?.[0]?.emailAddress || "No email"
  }, [isSignedIn, isLoaded, user])

  return (
    <div className="flex items-center gap-3 px-2 py-2">
      <div className="hidden md:block">{isSignedIn && <UserButton />}</div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{displayName}</span>
        <span className="truncate text-xs">{displayEmail}</span>
      </div>
      {isSignedIn && (
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden min-h-[48px] min-w-[48px] touch-manipulation"
          onClick={() => {
            console.log("[v0] Mobile sign out button clicked")
            clerk.signOut()
          }}
          aria-label="Sign out"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}

function GuestUserInfo() {
  return (
    <div className="flex items-center gap-3 px-2 py-2">
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">Guest</span>
        <span className="truncate text-xs">Not signed in</span>
      </div>
    </div>
  )
}

export function AppSidebar({
  disableClerk,
  ...props
}: React.ComponentProps<typeof Sidebar> & { disableClerk?: boolean }) {
  const navMain = [
    { title: "Home", url: "/", icon: Home },
    { title: "Learning Hub", url: "/learning", icon: BookOpen },
    { title: "Budget Tracker", url: "/budget", icon: Calculator },
    { title: "Goals & Planning", url: "/goals", icon: Target },
    { title: "AI Advisor", url: "/ai-advisor", icon: Bot },
  ]

  const navSecondary = [
    { title: "Support", url: "#", icon: LifeBuoy },
    { title: "Feedback", url: "#", icon: Send },
  ]

  return (
    <Sidebar variant="inset" {...props}>
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

      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>{disableClerk ? <GuestUserInfo /> : <ClerkUserInfo />}</SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
