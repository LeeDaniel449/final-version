"use client"

import { SignIn } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { setUserSession } from "@/app/actions/session"

export default function SignInPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      console.log("[v0] ========================================")
      console.log("[v0] ✓ SIGN-IN SUCCESSFUL")
      console.log("[v0] User ID:", user.id)
      console.log("[v0] Email:", user.primaryEmailAddress?.emailAddress)
      console.log("[v0] Timestamp:", new Date().toISOString())
      console.log("[v0] ========================================")

      const storeSession = async () => {
        if (typeof window !== "undefined") {
          const sessionData = {
            lastSignIn: Date.now(),
            userId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
          }
          localStorage.setItem("wealthwise_session", JSON.stringify(sessionData))
          localStorage.setItem("wealthwise_clerk_user_id", user.id)

          // Store in server-side cookie for persistence across page reloads
          try {
            await setUserSession(user.id)
            console.log("[v0] ✅ Session stored in cookie")
          } catch (error) {
            console.error("[v0] ❌ Failed to store session in cookie:", error)
          }

          // Dispatch event to trigger sync
          window.dispatchEvent(new CustomEvent("clerk-signin-success", { detail: { userId: user.id } }))

          console.log("[v0] Session stored. Redirecting to home...")
        }
      }

      storeSession().then(() => {
        setTimeout(() => {
          router.replace("/")
        }, 1000)
      })
    }
  }, [isLoaded, user, router])

  // Don't render sign-in form if user is already signed in
  if (isLoaded && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto"></div>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-brand-blue">Signed in successfully!</p>
            <p className="text-gray-600">Loading your data from the cloud...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-brand-blue mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to sync your progress across devices</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl",
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          redirectUrl="/"
          afterSignInUrl="/"
          forceRedirectUrl="/"
          fallbackRedirectUrl="/"
        />
      </div>
    </div>
  )
}
