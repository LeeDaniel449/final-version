"use client"

import { useUser, useClerk } from "@clerk/nextjs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Zap, Crown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const { openUserProfile } = useClerk()
  const router = useRouter()

  const handleSubscribe = () => {
    if (!user) {
      router.push("/sign-in")
      return
    }

    // Open Clerk's user profile modal to the billing section
    openUserProfile()
  }

  const features = [
    "Unlimited access to all learning modules",
    "Advanced portfolio optimization tools",
    "AI-powered financial advisor",
    "Real-time stock market data",
    "Personalized budget tracking",
    "Goal setting and tracking",
    "Investment simulator",
    "Priority customer support",
    "Ad-free experience",
    "Exclusive financial insights",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 via-brand-purple/10 to-pink-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-gradient-to-r from-brand-blue to-brand-purple text-white px-4 py-1">
            <Sparkles className="w-4 h-4 mr-2" />
            Premium Access
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-brand-blue via-brand-purple to-pink-600 bg-clip-text text-transparent">
            Unlock Your Financial Future
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get unlimited access to all premium features and take control of your financial journey
          </p>
        </div>

        {/* Pricing Card */}
        <Card className="border-2 border-brand-blue/20 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-brand-blue to-brand-purple p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Crown className="w-6 h-6" />
                  Premium Plan
                </h2>
                <p className="text-blue-100 mt-1">Everything you need to succeed</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">$9.99</div>
                <div className="text-blue-100">/month</div>
              </div>
            </div>
          </div>

          <CardContent className="p-8 space-y-6">
            {/* Features List */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-brand-blue" />
                What's Included
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleSubscribe}
              className="w-full bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all"
            >
              <Crown className="w-5 h-5 mr-2" />
              Subscribe Now
            </Button>

            {/* Trust Indicators */}
            <div className="text-center space-y-2 pt-4 border-t">
              <p className="text-sm text-gray-600">
                <Check className="w-4 h-4 inline text-green-600 mr-1" />
                Cancel anytime
              </p>
              <p className="text-sm text-gray-600">
                <Check className="w-4 h-4 inline text-green-600 mr-1" />
                Secure payment via Clerk
              </p>
              <p className="text-sm text-gray-600">
                <Check className="w-4 h-4 inline text-green-600 mr-1" />
                Instant access after subscription
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Already subscribed?{" "}
            <button onClick={() => router.push("/")} className="text-brand-blue hover:underline font-medium">
              Go to Dashboard
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
