"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import Checkout from "@/components/checkout"
import { PRODUCTS } from "@/lib/products"

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [showCheckout, setShowCheckout] = useState(false)

  useEffect(() => {
    if (isLoaded && !user) {
      console.log("[v0] User not signed in on pricing page, redirecting to sign-up")
      router.push("/sign-up")
    }

    // Check if user already has premium
    if (isLoaded && user?.publicMetadata?.premium === true) {
      console.log("[v0] User already has premium, redirecting to home")
      router.push("/")
    }
  }, [isLoaded, user, router])

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      </div>
    )
  }

  const product = PRODUCTS[0]

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Subscription</h1>
            <p className="text-gray-600">Subscribe to unlock all features</p>
          </div>
          <Checkout productId={product.id} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to WealthLink!</h1>
          <p className="text-xl text-gray-600">Subscribe to unlock your financial literacy journey</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold text-brand-blue">${(product.priceInCents / 100).toFixed(2)}</span>
              <span className="text-gray-600">/month</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-brand-blue" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-brand-blue text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-brand-blue/90 transition-colors"
          >
            Subscribe Now
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">Cancel anytime. No hidden fees.</p>
        </div>
      </div>
    </div>
  )
}
