"use client"

import { useUser } from "@clerk/nextjs"
import { PricingTable } from "@clerk/nextjs"
import { useState } from "react"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const [activating, setActivating] = useState(false)

  console.log("[v0] SubscribePage component rendering")
  console.log("[v0] Subscribe page state:", { isLoaded, hasUser: !!user })

  const hasPremium = user?.publicMetadata?.premium === true || user?.publicMetadata?.subscriptionStatus === "active"

  const handleActivate = async () => {
    setActivating(true)
    try {
      const response = await fetch("/api/set-premium", { method: "POST" })
      if (response.ok) {
        window.location.href = "/"
      } else {
        alert("Failed to activate premium. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Activation error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setActivating(false)
    }
  }

  if (!isLoaded) {
    console.log("[v0] Showing loading state")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (isLoaded && user && hasPremium) {
    console.log("[v0] User has premium, showing success message")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900 p-6">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-12 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Premium Activated!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your payment was successful. You now have full access to all features!
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
          >
            Start Learning
          </a>
        </div>
      </div>
    )
  }

  console.log("[v0] Rendering subscribe page UI, isLoaded:", isLoaded, "user:", !!user)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900 p-6">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl p-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Choose Your Plan</h1>
          <p className="text-lg text-gray-600">Unlock all features and start your financial literacy journey</p>
        </div>

        <div className="w-full">
          <PricingTable />
        </div>

        {user && !hasPremium && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Testing & Development</h3>
              <p className="text-sm text-gray-600 mb-4">
                For testing purposes, you can manually activate premium access. In production, this happens
                automatically via webhook after payment.
              </p>
              <button
                onClick={handleActivate}
                disabled={activating}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {activating ? "Activating..." : "Activate Premium (Test)"}
              </button>
            </div>
          </div>
        )}

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>After successful payment, all pages will be immediately accessible</p>
          <p className="mt-2 text-xs">
            Webhook URL: <code className="bg-gray-100 px-2 py-1 rounded">/api/webhooks/clerk</code>
          </p>
        </div>
      </div>
    </div>
  )
}
