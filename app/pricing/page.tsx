"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { PricingTable } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [showFallback, setShowFallback] = React.useState(false)

  React.useEffect(() => {
    if (isLoaded && !user) {
      console.log("[v0] User not signed in on pricing page, redirecting to sign-up")
      router.push("/sign-up")
    }

    if (isLoaded && user?.publicMetadata?.premium === true) {
      console.log("[v0] User already has premium, redirecting to home")
      router.push("/")
    }

    // Show fallback after 2 seconds if PricingTable doesn't load
    const timer = setTimeout(() => {
      setShowFallback(true)
    }, 2000)

    return () => clearTimeout(timer)
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to WealthLink Premium!</h1>
          <p className="text-xl text-gray-600">Subscribe to unlock your financial literacy journey</p>
        </div>

        {/* Try to render Clerk PricingTable */}
        <div className={showFallback ? "hidden" : "block"}>
          <PricingTable />
        </div>

        {/* Fallback UI if PricingTable doesn't load */}
        {showFallback && (
          <div className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Clerk Billing Setup Required</AlertTitle>
              <AlertDescription>
                To enable subscriptions, please enable Clerk Billing in your Clerk Dashboard at{" "}
                <a
                  href="https://dashboard.clerk.com/last-active?path=billing/settings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-brand-blue hover:text-brand-blue/80"
                >
                  Billing Settings
                </a>
              </AlertDescription>
            </Alert>

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

                <div className="pt-6">
                  <Button className="w-full bg-gray-400 cursor-not-allowed" size="lg" disabled>
                    Enable Billing to Subscribe
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mt-3">
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
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Secure payment powered by Clerk Billing. Your subscription will be managed automatically.
        </p>
      </div>
    </div>
  )
}
