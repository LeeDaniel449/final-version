"use client"

import { useUser } from "@clerk/nextjs"
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

  if (!user) {
    console.log("[v0] No user, showing sign in message")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Subscribe to Premium</h1>
          <p className="text-lg mb-8">Please sign in to access subscription options</p>
          <a
            href="/sign-in"
            className="inline-block px-8 py-3 bg-white text-purple-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    )
  }

  if (hasPremium) {
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
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Get Premium Access</h1>
          <p className="text-lg text-gray-600 mb-8">Unlock all features and start your financial literacy journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Free Plan */}
          <div className="border-2 border-gray-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-gray-600 mb-4">Limited access to basic features</p>
            <div className="text-4xl font-bold mb-6">
              $0<span className="text-lg text-gray-500">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Basic financial tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span className="text-gray-400">AI Financial Advisor</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span className="text-gray-400">Portfolio Optimizer</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span className="text-gray-400">Advanced Analytics</span>
              </li>
            </ul>
            <button disabled className="w-full py-3 bg-gray-200 text-gray-500 rounded-lg font-bold cursor-not-allowed">
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-purple-600 rounded-xl p-8 relative bg-gradient-to-br from-purple-50 to-white">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
              RECOMMENDED
            </div>
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <p className="text-gray-600 mb-4">Full access to all features</p>
            <div className="text-4xl font-bold mb-6">
              $9.99<span className="text-lg text-gray-500">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>All basic features</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>AI Financial Advisor</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Portfolio Optimizer</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Advanced Analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Priority Support</span>
              </li>
            </ul>
            <button
              onClick={handleActivate}
              disabled={activating}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-bold hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              {activating ? "Activating..." : "Activate Premium"}
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Click "Activate Premium" to get instant access to all features</p>
          <p className="mt-2">After activation, all pages will be immediately accessible</p>
        </div>
      </div>
    </div>
  )
}
