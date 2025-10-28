"use client"

import { useUser, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles } from "lucide-react"

export default function SubscribePage() {
  const { user } = useUser()
  const { openUserProfile } = useClerk()
  const router = useRouter()

  const handleSubscribe = () => {
    openUserProfile()
  }

  const handleSkip = () => {
    router.push("/")
  }

  const features = [
    "Personalized AI Financial Advisor",
    "Advanced Portfolio Optimization",
    "Real-time Stock Market Data",
    "Comprehensive Budget Tracking",
    "Goal Setting & Progress Tracking",
    "Financial Learning Modules",
    "Rewards & Achievements System",
    "Priority Customer Support",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to WealthWise Premium</h1>
          <p className="text-lg text-gray-600">Unlock your financial potential with our premium features</p>
        </div>

        <Card className="shadow-xl border-2">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold">Premium Plan</CardTitle>
            <CardDescription className="text-lg">Complete access to all features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-3">
              <Button
                onClick={handleSubscribe}
                className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Subscribe Now
              </Button>
              <Button onClick={handleSkip} variant="outline" className="w-full h-12 text-lg bg-transparent">
                Skip for Now
              </Button>
            </div>

            <p className="text-sm text-gray-500 text-center">
              You can upgrade to premium at any time from your account settings
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
