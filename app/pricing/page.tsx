"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Checkout from "@/components/checkout"
import { PRODUCTS } from "@/lib/products"

export default function PricingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [showCheckout, setShowCheckout] = useState(false)

  useEffect(() => {
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      </div>
    )
  }

  const product = PRODUCTS[0] // Premium Monthly plan

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to WealthLink!</h1>
          <p className="text-xl text-gray-600">Subscribe to unlock your financial literacy journey</p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
            <div className="mt-4">
              <span className="text-5xl font-bold">${(product.priceInCents / 100).toFixed(2)}</span>
              <span className="text-gray-600">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
              size="lg"
            >
              Subscribe Now
            </Button>
          </CardFooter>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">Secure payment powered by Stripe. Cancel anytime.</p>

        <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Complete Your Subscription</DialogTitle>
              <DialogDescription>Subscribe to unlock all WealthLink features</DialogDescription>
            </DialogHeader>
            <Checkout productId={product.id} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
