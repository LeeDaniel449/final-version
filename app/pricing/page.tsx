"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { PricingTable } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  React.useEffect(() => {
    if (isLoaded && !user) {
      console.log("[v0] User not signed in on pricing page, redirecting to sign-up")
      router.push("/sign-up")
    }

    if (isLoaded && user?.publicMetadata?.premium === true) {
      console.log("[v0] User already has premium, redirecting to home")
      router.push("/")
    }
  }, [isLoaded, user, router])

  React.useEffect(() => {
    console.log("[v0] Pricing page loaded, attempting to render PricingTable")
    console.log("[v0] User metadata:", user?.publicMetadata)
  }, [user])

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-brand-blue" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to WealthLink Premium!</h1>
          <p className="text-xl text-gray-600">Subscribe to unlock your financial literacy journey</p>
        </div>

        <div className="w-full">
          <PricingTable />
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Secure payment powered by Clerk Billing. Your subscription will be managed automatically.
        </p>
      </div>
    </div>
  )
}
