"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { PricingTable } from "@clerk/nextjs"
import { Loader2, Check } from "lucide-react"

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
          <h1 className="text-4xl font-bold text-brand-blue">Unlock WealthWise Premium</h1>
          <p className="text-lg text-gray-600">Premium is required to save your progress and access all features</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <PricingTable />
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-brand-blue/20 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4 text-brand-blue">What's Included in Premium</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Unlimited Budget Tracking</p>
                <p className="text-sm text-gray-600">Save unlimited budgets, categories, and expenses</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">AI Financial Advisor</p>
                <p className="text-sm text-gray-600">Get personalized financial advice powered by AI</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Portfolio Optimization</p>
                <p className="text-sm text-gray-600">Advanced tools to optimize your investment portfolio</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Learning Progress Saved</p>
                <p className="text-sm text-gray-600">Track your progress through all learning modules</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Goal Setting & Tracking</p>
                <p className="text-sm text-gray-600">Set and track unlimited financial goals</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Priority Support</p>
                <p className="text-sm text-gray-600">Get help when you need it with priority support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>All data saving features require an active Premium subscription</p>
        </div>
      </div>
    </div>
  )
}
