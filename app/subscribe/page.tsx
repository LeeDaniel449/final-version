"use client"

import { PricingTable } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      const hasPremium = user.publicMetadata?.premium === true || user.publicMetadata?.subscriptionStatus === "active"

      if (hasPremium) {
        console.log("[v0] User already has premium, redirecting to home")
        router.replace("/")
      }
    }
  }, [isLoaded, user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Subscription</h1>
          <p className="text-lg text-gray-600">Choose a plan to unlock all premium features</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <PricingTable />
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">Subscription required to access WealthWise features</p>
      </div>
    </div>
  )
}
