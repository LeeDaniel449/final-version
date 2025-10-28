"use client"

import { useUser, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Loader2, Sparkles } from "lucide-react"

const PLAN_ID = "cplan_34V21R75vXuGKwyVCpbw2bgdiXm"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const { openUserProfile } = useClerk()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (isLoaded && !user) {
      console.log("[v0] User not signed in, redirecting to sign-up")
      router.replace("/sign-up")
    }

    if (isLoaded && user) {
      // Check if user already has premium
      const hasPremium = user.publicMetadata?.premium === true
      if (hasPremium) {
        console.log("[v0] User already has premium, redirecting to home")
        router.replace("/")
      }
    }
  }, [isLoaded, user, router])

  const handleSubscribe = async () => {
    setIsProcessing(true)
    console.log("[v0] Opening Clerk billing interface")

    // Open Clerk's user profile modal to the billing section
    openUserProfile()

    // Note: In production, you would use Clerk's useCheckout() hook here
    // with the plan ID to create a proper checkout flow
    setIsProcessing(false)
  }

  const handleSkip = () => {
    console.log("[v0] User skipped subscription")
    router.push("/")
  }

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user.firstName}!</h1>
          <p className="text-lg text-gray-600">Complete your setup with a premium subscription</p>
        </div>

        {/* Pricing Card */}
        <Card className="border-2 border-blue-200 shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="text-3xl font-bold text-gray-900">Premium Access</CardTitle>
            <CardDescription className="text-lg">Unlock all features and start your financial journey</CardDescription>
            <div className="mt-4">
              <div className="text-5xl font-bold text-blue-600">$9.99</div>
              <div className="text-gray-600">per month</div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {/* Features */}
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">Everything you need to succeed:</h3>
              {[
                "Complete Financial Literacy Course",
                "AI-Powered Budget Recommendations",
                "Investment Portfolio Optimizer",
                "Real-Time Stock Market Data",
                "Personalized Financial Goals Tracker",
                "Debt Payoff Calculator & Strategies",
                "24/7 AI Financial Advisor",
                "Unlimited Portfolio Simulations",
                "Advanced Analytics & Insights",
                "Priority Customer Support",
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleSubscribe}
                disabled={isProcessing}
                className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Subscribe Now
                  </div>
                )}
              </Button>

              <Button onClick={handleSkip} variant="ghost" className="w-full text-gray-600 hover:text-gray-900">
                Skip for now
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Cancel anytime
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Secure payment
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Money-back guarantee
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <p className="text-center text-sm text-gray-600 mt-6">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          <br />
          Your subscription will automatically renew monthly until cancelled.
        </p>
      </div>
    </div>
  )
}
