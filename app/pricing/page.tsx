"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Loader2, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckoutModal } from "@/components/checkout-modal"

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [showCheckout, setShowCheckout] = React.useState(false)

  React.useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-up")
    }

    if (isLoaded && user?.publicMetadata?.premium === true) {
      router.push("/")
    }
  }, [isLoaded, user, router])

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    )
  }

  const features = [
    "Unlimited access to all financial tools",
    "AI-powered financial advisor",
    "Advanced portfolio optimization",
    "Personalized budget tracking",
    "Goal setting and progress tracking",
    "Interactive learning modules",
    "Real-time market data",
    "Priority customer support",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Premium Access Required</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Unlock Your Financial Future</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get unlimited access to all premium features and start your journey to financial literacy
          </p>
        </div>

        <Card className="max-w-md mx-auto shadow-2xl border-2 border-blue-100">
          <CardHeader className="text-center pb-8 pt-8">
            <CardTitle className="text-3xl font-bold mb-2">Premium Plan</CardTitle>
            <CardDescription className="text-lg">Everything you need to succeed</CardDescription>
            <div className="mt-6">
              <span className="text-5xl font-bold text-gray-900">$9.99</span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check className="h-3 w-3 text-blue-600" />
                  </div>
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-8 pb-8">
            <Button
              onClick={() => setShowCheckout(true)}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Subscribe Now
            </Button>
            <p className="text-xs text-center text-gray-500">Secure payment powered by Stripe. Cancel anytime.</p>
          </CardFooter>
        </Card>

        <CheckoutModal open={showCheckout} onClose={() => setShowCheckout(false)} />
      </div>
    </div>
  )
}
