"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PricingTable } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function PricingPage() {
  const user = await currentUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  if (user?.publicMetadata?.subscriptionStatus === "active") {
    redirect("/")
  }

  const isPremium = user?.publicMetadata?.premium === true

  const handleSubscribe = async () => {
    if (!user) {
      router.push("/sign-in")
      return
    }

    setLoading(true)

    try {
      // Create Stripe price in your Stripe dashboard and use the price ID here
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: "price_1234567890", // Replace with your actual Stripe price ID
        }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("[v0] Error creating checkout session:", error)
    } finally {
      setLoading(false)
    }
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
