"use client"

import { SignIn } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignInPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      console.log("[v0] ✓ User signed in successfully:", {
        userId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        timestamp: new Date().toISOString(),
      })

      // Store session info for debugging
      if (typeof window !== "undefined") {
        localStorage.setItem("wealthwise_last_signin", Date.now().toString())
        localStorage.setItem("wealthwise_clerk_user_id", user.id)

        // Dispatch event to trigger sync
        window.dispatchEvent(new CustomEvent("clerk-signin-success", { detail: { userId: user.id } }))
      }

      console.log("[v0] User already signed in on sign-in page, redirecting to home")
      setTimeout(() => {
        router.replace("/")
      }, 500)
    }
  }, [isLoaded, user, router])

  // Don't render sign-in form if user is already signed in
  if (isLoaded && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your data...</p>
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
