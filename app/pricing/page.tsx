"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { PricingTable } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle } from "lucide-react"

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [showFallback, setShowFallback] = React.useState(false)

  React.useEffect(() => {
    console.log("[v0] Pricing page mounted", { isLoaded, userId: user?.id })

    if (isLoaded && !user) {
      console.log("[v0] No user, redirecting to sign-up")
      router.push("/sign-up")
    }

    if (isLoaded && user?.publicMetadata?.premium === true) {
      console.log("[v0] User has premium, redirecting to home")
      router.push("/")
    }

    // Show fallback after 3 seconds if PricingTable doesn't load
    const timer = setTimeout(() => {
      console.log("[v0] PricingTable timeout, showing fallback")
      setShowFallback(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isLoaded, user, router])

  if (!isLoaded || !user) {
    console.log("[v0] Pricing page loading...")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    )
  }

  console.log("[v0] Rendering pricing page for user:", user.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto pt-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get unlimited access to all premium features and start your journey to financial literacy
          </p>
        </div>

        {showFallback ? (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Clerk Billing Setup Required</h3>
                <p className="text-gray-600 mb-4">
                  The pricing table is not loading. This usually means Clerk Billing needs to be enabled for your test
                  environment.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>To enable Clerk Billing:</strong>
                  </p>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Go to your Clerk Dashboard</li>
                    <li>Navigate to Billing Settings</li>
                    <li>Enable billing for your test instance</li>
                    <li>Create your pricing plans</li>
                  </ol>
                </div>
                <a
                  href="https://dashboard.clerk.com/last-active?path=billing/settings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Open Clerk Billing Settings
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            {console.log("[v0] Attempting to render PricingTable")}
            <PricingTable />
          </>
        )}
      </div>
    </div>
  )
}
