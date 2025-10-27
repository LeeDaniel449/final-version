"use client"

import { PricingTable } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !user) {
      console.log("[v0] User not signed in on pricing page, redirecting to sign-up")
      router.push("/sign-up")
    }

    if (isLoaded && user?.publicMetadata?.premium === true) {
      console.log("[v0] User already has premium, redirecting to home")
      router.push("/")
    }
  }, [isLoaded, user, router])

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to WealthLink!</h1>
          <p className="text-xl text-gray-600">Subscribe to unlock your financial literacy journey</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <PricingTable />

          {/* Note: If you see an error about billing being disabled, you need to:
              1. Go to https://dashboard.clerk.com/last-active?path=billing/settings
              2. Enable Clerk Billing
              3. Configure your pricing plans
              This component will work once billing is enabled in your Clerk Dashboard */}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">Secure payment powered by Clerk. Cancel anytime.</p>
      </div>
    </div>
  )
}
