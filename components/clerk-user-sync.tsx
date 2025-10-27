"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { userDataManager } from "@/lib/user-data"

export function ClerkUserSync() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      // Store Clerk user ID and user object for premium checks
      userDataManager.setClerkUserId(user.id)
      userDataManager.setClerkUser(user)
      console.log("[v0] Clerk user synced:", user.id, "Premium:", user.publicMetadata?.subscriptionStatus)
    } else if (isLoaded && !user) {
      // Clear Clerk user data when signed out
      userDataManager.setClerkUserId(null)
      userDataManager.setClerkUser(null)
      console.log("[v0] Clerk user cleared")
    }
  }, [user, isLoaded])

  return null
}
