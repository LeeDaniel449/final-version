"use client"

import { useUser, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const { openUserProfile } = useClerk()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      const hasPremium = user.publicMetadata?.premium === true || user.publicMetadata?.subscriptionStatus === "active"

      if (hasPremium) {
        router.replace("/")
      }
    }
  }, [isLoaded, user, router])

  const handleSubscribe = () => {
    openUserProfile()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <Card className="w-full max-width-2xl shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Complete Your Subscription
          </CardTitle>
          <CardDescription className="text-lg">
            Subscribe to unlock all premium features and start your financial journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">AI-Powered Financial Advisor</h3>
                <p className="text-gray-600">Get personalized financial advice powered by advanced AI</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Portfolio Optimization</h3>
                <p className="text-gray-600">Optimize your investment portfolio with smart algorithms</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Budget & Goal Tracking</h3>
                <p className="text-gray-600">Track your spending and achieve your financial goals</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Real-Time Market Data</h3>
                <p className="text-gray-600">Access live stock quotes and market analysis</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleSubscribe}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Subscribe Now
            </Button>
            <p className="text-sm text-gray-500 text-center">Subscription required to access all features</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
