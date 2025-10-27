"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { PricingTable } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.subscriptionStatus === "active") {
      console.log("[v0] User already has premium, redirecting to home")
      router.push("/")
    }
  }, [isLoaded, user, router])

  // Show loading while checking user status
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  // If user already has premium, show loading while redirecting
  if (user?.publicMetadata?.subscriptionStatus === "active") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-brand-blue">Unlock Premium Access</h1>
          <p className="text-lg text-gray-600">
            Get full access to all WealthWise features and take control of your financial future
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <PricingTable />
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-brand-blue/20 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-2 text-brand-blue">Why Premium?</h3>
          <p className="text-gray-700 leading-relaxed">
            WealthWise Premium gives you complete access to all our financial tools and resources. Track your spending,
            set and achieve goals, learn financial literacy, optimize your portfolio, and get personalized AI-powered
            advice. Everything you need to take control of your financial future, all in one place.
          </p>
        </div>
      </div>
    </div>
  )
}
