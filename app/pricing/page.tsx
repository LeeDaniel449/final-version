"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Loader2, Crown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

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

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-brand-blue">Unlock Premium Access</h1>
          <p className="text-lg text-gray-600">
            Get full access to all WealthWise features and take control of your financial future
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>Limited access to basic features</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm">View pricing page only</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Sign up and sign in</span>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                  <Check className="w-5 h-5 text-gray-400" />
                  <span className="text-sm line-through">Full app access</span>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-transparent" disabled>
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-brand-blue shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-brand-blue to-brand-purple text-white px-4 py-1 text-sm font-semibold">
              REQUIRED
            </div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6 text-brand-blue" />
                <CardTitle className="text-2xl text-brand-blue">Premium</CardTitle>
              </div>
              <CardDescription>Full access to all features</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold text-brand-blue">$9.99</span>
                <span className="text-gray-600">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-brand-blue" />
                  <span className="text-sm font-medium">Budget Tracker with AI insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-brand-blue" />
                  <span className="text-sm font-medium">Financial Goals & Planning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-brand-blue" />
                  <span className="text-sm font-medium">Learning Hub with courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-brand-blue" />
                  <span className="text-sm font-medium">Portfolio Optimizer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-brand-blue" />
                  <span className="text-sm font-medium">Debt Payoff Calculator</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-brand-blue" />
                  <span className="text-sm font-medium">AI Financial Advisor</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-brand-blue" />
                  <span className="text-sm font-medium">Rewards & Achievements</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-brand-blue" />
                  <span className="text-sm font-medium">Priority support</span>
                </div>
              </div>
              {isPremium ? (
                <div className="space-y-2">
                  <Badge className="w-full justify-center bg-green-600 hover:bg-green-700 py-2">
                    <Check className="w-4 h-4 mr-2" />
                    Active Subscription
                  </Badge>
                  <Button
                    onClick={() => router.push("/")}
                    className="w-full bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4 mr-2" />
                      Subscribe Now
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-brand-blue/20">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-2 text-brand-blue">Why Premium?</h3>
            <p className="text-gray-700 leading-relaxed">
              WealthWise Premium gives you complete access to all our financial tools and resources. Track your
              spending, set and achieve goals, learn financial literacy, optimize your portfolio, and get personalized
              AI-powered advice. Everything you need to take control of your financial future, all in one place.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
