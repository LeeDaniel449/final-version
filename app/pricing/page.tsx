"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { CheckoutButton } from "@clerk/nextjs/experimental"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  React.useEffect(() => {
    if (isLoaded && !user) {
      console.log("[v0] User not signed in on pricing page, redirecting to sign-up")
      router.push("/sign-up")
    }

    if (isLoaded && user?.publicMetadata?.premium === true) {
      console.log("[v0] User already has premium, redirecting to home")
      router.push("/")
    }
  }, [isLoaded, user, router])

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-brand-blue" />
      </div>
    )
  }

  const features = [
    "AI-Powered Financial Advisor",
    "Advanced Portfolio Optimization",
    "Real-time Stock Data & Analysis",
    "Personalized Budget Management",
    "Goal Tracking & Planning",
    "Interactive Learning Modules",
    "Risk Assessment Tools",
    "Unlimited Data Storage",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to WealthLink Premium!</h1>
          <p className="text-xl text-gray-600">Subscribe to unlock your financial literacy journey</p>
        </div>

        <Card className="w-full shadow-xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl mb-2">Premium Plan</CardTitle>
            <CardDescription className="text-lg">Everything you need to master your finances</CardDescription>
            <div className="mt-6">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-gray-900">$9.99</span>
                <span className="text-xl text-gray-600">/month</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-brand-blue" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 space-y-3">
              <CheckoutButton
                planId="cplan_34V21R75vXuGKwyVCpbw2bgdiXm"
                for="user"
                planPeriod="monthly"
                afterCheckoutUrl="/"
                asChild
              >
                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90" size="lg">
                  Subscribe Now
                </Button>
              </CheckoutButton>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          Secure payment powered by Clerk Billing. Your subscription will be managed automatically.
        </p>
      </div>
    </div>
  )
}
