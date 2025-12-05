"use client"

import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { clearUserSession } from "@/app/actions/session"

export default function SignOutPage() {
  const { signOut } = useClerk()
  const router = useRouter()

  useEffect(() => {
    const handleSignOut = async () => {
      console.log("[v0] 👋 Signing out...")

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("wealthwise_clerk_user_id")
        localStorage.removeItem("wealthwise_session")
        console.log("[v0] ✅ Cleared localStorage")
      }

      // Clear server-side cookie
      try {
        await clearUserSession()
        console.log("[v0] ✅ Cleared server session cookie")
      } catch (error) {
        console.error("[v0] ❌ Failed to clear server session:", error)
      }

      // Sign out from Clerk
      await signOut()

      router.replace("/")
    }

    handleSignOut()
  }, [signOut, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto"></div>
        <p className="text-lg font-semibold text-brand-blue">Signing out...</p>
      </div>
    </div>
  )
}
