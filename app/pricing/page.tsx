"use client"

import * as React from "react"
import { SignedIn, ClerkLoaded, useUser } from "@clerk/nextjs"
import {
  CheckoutProvider,
  useCheckout,
  PaymentElementProvider,
  PaymentElement,
  usePaymentElement,
} from "@clerk/nextjs/experimental"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to WealthLink Premium!</h1>
          <p className="text-xl text-gray-600">Subscribe to unlock your financial literacy journey</p>
        </div>

        <CheckoutProvider for="user" planId="cplan_34V21R75vXuGKwyVCpbw2bgdiXm" planPeriod="month">
          <ClerkLoaded>
            <SignedIn>
              <CustomCheckout />
            </SignedIn>
          </ClerkLoaded>
        </CheckoutProvider>

        <p className="text-center text-sm text-gray-500 mt-6">Secure payment powered by Clerk. Cancel anytime.</p>
      </div>
    </div>
  )
}

function CustomCheckout() {
  const { checkout } = useCheckout()
  const { status } = checkout

  if (status === "needs_initialization") {
    return <CheckoutInitialization />
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <CheckoutSummary />
      <PaymentElementProvider checkout={checkout}>
        <PaymentSection />
      </PaymentElementProvider>
    </div>
  )
}

function CheckoutInitialization() {
  const { checkout } = useCheckout()
  const { start, status, fetchStatus } = checkout

  if (status !== "needs_initialization") {
    return null
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">WealthLink Premium</CardTitle>
        <CardDescription>Everything you need to master your finances</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center">
                <Check className="w-3 h-3 text-brand-blue" />
              </div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-3xl font-bold text-gray-900">$9.99</span>
            <span className="text-gray-600">/month</span>
          </div>

          <Button
            onClick={start}
            disabled={fetchStatus === "fetching"}
            className="w-full bg-brand-blue hover:bg-brand-blue/90"
            size="lg"
          >
            {fetchStatus === "fetching" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Initializing...
              </>
            ) : (
              "Start Checkout"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PaymentSection() {
  const { checkout } = useCheckout()
  const { isConfirming, confirm, finalize, error } = checkout

  const { isFormReady, submit } = usePaymentElement()
  const [isProcessing, setIsProcessing] = React.useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormReady || isProcessing) return
    setIsProcessing(true)

    try {
      console.log("[v0] Submitting payment form")
      const { data, error } = await submit()
      if (error) {
        console.error("[v0] Payment form error:", error)
        return
      }

      console.log("[v0] Confirming checkout")
      await confirm(data)

      console.log("[v0] Finalizing checkout")
      await finalize({
        navigate: () => {
          console.log("[v0] Payment successful, redirecting to home")
          router.push("/")
        },
      })
    } catch (error) {
      console.error("[v0] Payment failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Enter your payment information to complete your subscription</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement fallback={<div className="text-center py-8">Loading payment form...</div>} />

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error.message}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={!isFormReady || isProcessing || isConfirming}
            className="w-full bg-brand-blue hover:bg-brand-blue/90"
            size="lg"
          >
            {isProcessing || isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Complete Purchase"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function CheckoutSummary() {
  const { checkout } = useCheckout()
  const { plan, totals } = checkout

  if (!plan) {
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">{plan.name}</span>
          <span className="font-semibold text-gray-900">
            {totals.totalDueNow.currencySymbol}
            {totals.totalDueNow.amountFormatted}
          </span>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total Due Today</span>
            <span className="text-2xl font-bold text-brand-blue">
              {totals.totalDueNow.currencySymbol}
              {totals.totalDueNow.amountFormatted}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-600" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-600" />
            <span>Secure payment processing</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-600" />
            <span>Instant access after payment</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
