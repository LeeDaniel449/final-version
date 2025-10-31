"use client"

import { useUser } from "@clerk/nextjs"
import { PricingTable } from "@clerk/nextjs"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()

  const hasPremium = user?.publicMetadata?.premium === true || user?.publicMetadata?.subscriptionStatus === "active"

  if (!isLoaded) {
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900">
        <div className="text-center text-white">
          <p className="text-lg">Please sign in to subscribe</p>
        </div>
      </div>
    )
  }

  if (hasPremium) {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900 p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Get Premium Access</h1>
          <p className="text-lg text-gray-600 mb-4">Unlock all features and start your financial literacy journey</p>
          <p className="text-sm text-gray-500">After payment, you'll automatically get full access to all pages</p>
        </div>

        <div className="flex justify-center">
          <PricingTable />
        </div>
        {/* Note: To configure your pricing plans, go to your Clerk Dashboard → Monetization → Pricing Tables */}
      </div>
    </div>
  )
}
