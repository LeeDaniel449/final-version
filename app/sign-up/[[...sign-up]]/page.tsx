"use client"

import { SignUp } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignUpPage() {
  const { isSignedIn, isLoaded, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log("[v0] User signed in, checking subscription status")
      // Check if user already has premium
      const hasPremium = user?.publicMetadata?.premium === true

      if (hasPremium) {
        console.log("[v0] User has premium, redirecting to home")
        router.replace("/")
      } else {
        console.log("[v0] User needs subscription, redirecting to subscribe")
        router.replace("/subscribe")
      }
    }
  }, [isLoaded, isSignedIn, router, user])

  if (isLoaded && isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-brand-blue mb-2">Get Started</h1>
          <p className="text-gray-600">Create your account and subscribe to unlock all features</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl",
            },
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignUpUrl="/subscribe"
          redirectUrl="/subscribe"
          forceRedirectUrl="/subscribe"
          fallbackRedirectUrl="/subscribe"
        />
      </div>
    </div>
  )
}
