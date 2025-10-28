"use client"

import * as React from "react"
import { useUser, useClerk, SignedIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Loader2, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const clerk = useClerk()
  const router = useRouter()

  React.useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-up")
      return
    }

    if (isLoaded && user) {
      const metadata = user.publicMetadata as any

      const hasPremium =
        metadata?.premium === true ||
        metadata?.subscriptionStatus === "active" ||
        (Array.isArray(metadata?.subscriptions) &&
          metadata.subscriptions.some((sub: any) => sub.status === "active")) ||
        metadata?.subscription?.status === "active"

      if (hasPremium) {
        router.push("/")
        return
      }
    }
  }, [isLoaded, user, router])

  const handleSubscribe = () => {
    clerk.openUserProfile({
      appearance: {
        elements: {
          rootBox: "w-full",
          card: "w-full",
        },
      },
    })
  }

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto pt-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4" />
            Unlock Full Access
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Upgrade to Premium</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get unlimited access to all features and take control of your financial future
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Premium Plan</h2>
            <div className="text-5xl font-bold mb-2">$9.99</div>
            <p className="text-blue-100">per month</p>
          </div>

          <div className="p-8">
            <div className="space-y-4 mb-8">
              {[
                "AI-Powered Financial Advisor",
                "Advanced Portfolio Optimization",
                "Real-Time Stock Market Data",
                "Personalized Budget Planning",
                "Goal Tracking & Analytics",
                "Interactive Financial Simulator",
                "Comprehensive Learning Modules",
                "Priority Support",
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-1 mt-0.5">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 text-lg">{feature}</span>
                </div>
              ))}
            </div>

            <SignedIn>
              <Button
                onClick={handleSubscribe}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Subscribe Now
              </Button>
            </SignedIn>

            <p className="text-center text-sm text-gray-500 mt-6">Cancel anytime. No hidden fees.</p>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Secure payment powered by Clerk Billing</p>
        </div>
      </div>
    </div>
  )
}
