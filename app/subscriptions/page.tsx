"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Check, X, Crown, Zap, Shield, Users, Calendar, CheckCircle } from "lucide-react"

type SubscriptionTier = "free" | "premium" | "pro"

interface SubscriptionData {
  tier: SubscriptionTier
  billingCycle: "monthly" | "yearly"
  nextBillingDate?: string
  autoRenew: boolean
  paymentMethod?: {
    type: string
    last4: string
  }
}

export default function SubscriptionsPage() {
  const { isSignedIn, user, isLoaded } = useUser()
  const [subscription, setSubscription] = useState<SubscriptionData>({
    tier: "free",
    billingCycle: "monthly",
    autoRenew: true,
  })
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (isLoaded && user) {
      // Load subscription data from localStorage or user data
      const savedSubscription = localStorage.getItem("wealthlink_subscription")
      if (savedSubscription) {
        setSubscription(JSON.parse(savedSubscription))
      }
    }
  }, [isLoaded, user])

  const saveSubscription = (data: SubscriptionData) => {
    setSubscription(data)
    localStorage.setItem("wealthlink_subscription", JSON.stringify(data))
  }

  const handleUpgrade = (tier: SubscriptionTier, billingCycle: "monthly" | "yearly") => {
    const nextBillingDate = new Date()
    nextBillingDate.setMonth(nextBillingDate.getMonth() + (billingCycle === "monthly" ? 1 : 12))

    const newSubscription: SubscriptionData = {
      tier,
      billingCycle,
      nextBillingDate: nextBillingDate.toISOString(),
      autoRenew: true,
      paymentMethod: {
        type: "Visa",
        last4: "4242",
      },
    }

    saveSubscription(newSubscription)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleCancelSubscription = () => {
    if (confirm("Are you sure you want to cancel your subscription? You'll lose access to premium features.")) {
      const newSubscription: SubscriptionData = {
        tier: "free",
        billingCycle: "monthly",
        autoRenew: false,
      }
      saveSubscription(newSubscription)
    }
  }

  const handleToggleAutoRenew = (checked: boolean) => {
    saveSubscription({ ...subscription, autoRenew: checked })
  }

  const plans = [
    {
      tier: "free" as SubscriptionTier,
      name: "Free",
      icon: Users,
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started with financial literacy",
      features: [
        { text: "Access to basic learning modules", included: true },
        { text: "Budget tracking", included: true },
        { text: "Up to 3 financial goals", included: true },
        { text: "Basic AI advisor (5 questions/day)", included: true },
        { text: "Portfolio analysis", included: false },
        { text: "Advanced AI insights", included: false },
        { text: "Priority support", included: false },
      ],
      color: "gray",
    },
    {
      tier: "premium" as SubscriptionTier,
      name: "Premium",
      icon: Zap,
      price: { monthly: 9.99, yearly: 99.99 },
      description: "Unlock advanced features for serious learners",
      features: [
        { text: "All free features", included: true },
        { text: "Access to all learning modules", included: true },
        { text: "Unlimited financial goals", included: true },
        { text: "Unlimited AI advisor questions", included: true },
        { text: "Portfolio analysis & optimization", included: true },
        { text: "Advanced analytics dashboard", included: true },
        { text: "Priority email support", included: true },
      ],
      color: "blue",
      popular: true,
    },
    {
      tier: "pro" as SubscriptionTier,
      name: "Pro",
      icon: Crown,
      price: { monthly: 19.99, yearly: 199.99 },
      description: "For professionals who want the complete experience",
      features: [
        { text: "All premium features", included: true },
        { text: "Personalized financial coaching", included: true },
        { text: "Custom investment strategies", included: true },
        { text: "Tax optimization tools", included: true },
        { text: "Real-time market alerts", included: true },
        { text: "API access for integrations", included: true },
        { text: "24/7 priority support", included: true },
      ],
      color: "purple",
    },
  ]

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-brand-blue to-brand-purple rounded-lg flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-brand-blue">Manage Subscriptions</h1>
            <p className="text-gray-600 mt-2">Choose the plan that's right for you</p>
          </div>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Subscription updated successfully! Your new features are now available.
            </AlertDescription>
          </Alert>
        )}

        {/* Current Subscription Status */}
        {subscription.tier !== "free" && (
          <Card className="border-brand-blue/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-brand-blue" />
                Current Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold capitalize">{subscription.tier} Plan</p>
                  <p className="text-sm text-gray-600">
                    Billed {subscription.billingCycle === "monthly" ? "monthly" : "annually"}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
              </div>

              {subscription.nextBillingDate && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Next billing date: {new Date(subscription.nextBillingDate).toLocaleDateString()}</span>
                </div>
              )}

              {subscription.paymentMethod && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4" />
                  <span>
                    {subscription.paymentMethod.type} ending in {subscription.paymentMethod.last4}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Auto-renewal</p>
                  <p className="text-xs text-gray-600">Automatically renew your subscription</p>
                </div>
                <Switch checked={subscription.autoRenew} onCheckedChange={handleToggleAutoRenew} />
              </div>

              <Button onClick={handleCancelSubscription} variant="outline" className="w-full bg-transparent">
                Cancel Subscription
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon
            const isCurrentPlan = subscription.tier === plan.tier
            const isUpgrade = plan.tier !== "free" && subscription.tier === "free"

            return (
              <Card
                key={plan.tier}
                className={`relative ${
                  plan.popular
                    ? "border-brand-blue shadow-xl scale-105"
                    : isCurrentPlan
                      ? "border-green-500 shadow-lg"
                      : "border-gray-200 shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-brand-blue text-white">Most Popular</Badge>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white">Current Plan</Badge>
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        plan.color === "blue"
                          ? "bg-brand-blue"
                          : plan.color === "purple"
                            ? "bg-brand-purple"
                            : "bg-gray-500"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">${plan.price.monthly}</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    {plan.tier !== "free" && (
                      <p className="text-sm text-gray-600 mt-1">
                        or ${plan.price.yearly}/year (save ${(plan.price.monthly * 12 - plan.price.yearly).toFixed(2)})
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? "text-gray-900" : "text-gray-500"}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {isCurrentPlan ? (
                    <Button disabled className="w-full bg-transparent" variant="outline">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Current Plan
                    </Button>
                  ) : plan.tier === "free" ? (
                    <Button
                      onClick={() => handleCancelSubscription()}
                      variant="outline"
                      className="w-full bg-transparent"
                      disabled={subscription.tier === "free"}
                    >
                      Downgrade to Free
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleUpgrade(plan.tier, "monthly")}
                        className={`w-full ${
                          plan.popular
                            ? "bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90"
                            : "bg-brand-purple hover:bg-brand-purple/90"
                        } text-white`}
                      >
                        {isUpgrade ? "Upgrade" : "Switch"} to Monthly
                      </Button>
                      <Button
                        onClick={() => handleUpgrade(plan.tier, "yearly")}
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        {isUpgrade ? "Upgrade" : "Switch"} to Yearly
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <Card className="border-brand-blue/20 shadow-lg">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Can I change my plan at any time?</h4>
              <p className="text-sm text-gray-600">
                Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect
                immediately, and we'll prorate any charges.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What happens if I cancel?</h4>
              <p className="text-sm text-gray-600">
                You'll retain access to premium features until the end of your current billing period. After that,
                you'll be moved to the free plan.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Is there a free trial?</h4>
              <p className="text-sm text-gray-600">
                New users get a 14-day free trial of the Premium plan. No credit card required to start!
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
              <p className="text-sm text-gray-600">
                We accept all major credit cards (Visa, Mastercard, American Express) and PayPal.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
