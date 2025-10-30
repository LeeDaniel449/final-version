"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Check } from "lucide-react"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      console.log("[v0] Subscribe page loaded for user:", user.id)
      const hasPremium = user.publicMetadata?.premium === true || user.publicMetadata?.subscriptionStatus === "active"
      console.log("[v0] User premium status:", hasPremium, "metadata:", user.publicMetadata)

      if (hasPremium) {
        console.log("[v0] User already has premium, redirecting to home")
        router.replace("/")
      }
    }
  }, [isLoaded, user, router])

  const handleSubscribe = () => {
    console.log("[v0] Opening Clerk billing page")
    window.open(`https://accounts.clerk.dev/user/billing?redirect_url=${window.location.origin}`, "_blank")
  }

  if (!isLoaded || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
        <div className="text-center text-white">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-6">
      <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl md:p-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Choose Your Plan</h1>
          <p className="text-lg text-gray-600">
            Subscribe to unlock all premium features and take control of your financial future
          </p>
        </div>

        <div className="mx-auto max-w-md">
          <div className="rounded-xl border-2 border-purple-600 bg-gradient-to-br from-purple-50 to-indigo-50 p-8 shadow-lg">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">Premium Plan</h2>
              <div className="mb-4">
                <span className="text-5xl font-bold text-purple-600">$9.99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-sm text-gray-600">Everything you need to master your finances</p>
            </div>

            <ul className="mb-8 space-y-4">
              {[
                "AI-Powered Financial Advisor",
                "Personalized Budget Planning",
                "Portfolio Optimization Tools",
                "Interactive Learning Modules",
                "Goal Tracking & Analytics",
                "Real-time Market Insights",
                "Priority Support",
                "Unlimited Access to All Features",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-purple-600 p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleSubscribe}
              className="w-full rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-purple-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              Subscribe Now
            </button>

            <p className="mt-4 text-center text-sm text-gray-500">Cancel anytime. No hidden fees.</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Once you subscribe, all features will be instantly unlocked.</p>
        </div>
      </div>
    </div>
  )
}
