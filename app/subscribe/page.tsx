"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isLoaded && user) {
      const hasPremium = user.publicMetadata?.premium === true || user.publicMetadata?.subscriptionStatus === "active"

      if (hasPremium) {
        router.replace("/")
      }
    }
  }, [isLoaded, user, router])

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          priceId: "price_premium_monthly", // This will be your Stripe price ID
        }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("[v0] Subscription error:", error)
      setLoading(false)
    }
  }

  if (!isLoaded || !user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "24px",
      }}
    >
      <Card style={{ width: "100%", maxWidth: "600px" }}>
        <CardHeader style={{ textAlign: "center" }}>
          <CardTitle style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "8px" }}>
            🎯 Complete Your Subscription
          </CardTitle>
          <CardDescription style={{ fontSize: "16px" }}>Subscribe now to unlock all premium features</CardDescription>
        </CardHeader>
        <CardContent style={{ padding: "24px" }}>
          <div style={{ marginBottom: "32px" }}>
            <div
              style={{
                padding: "24px",
                background: "#f8f9fa",
                borderRadius: "12px",
                marginBottom: "24px",
              }}
            >
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Premium Features</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "start" }}>
                  <span style={{ marginRight: "12px", color: "#10b981", fontSize: "20px" }}>✓</span>
                  <span>AI-Powered Financial Advisor</span>
                </li>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "start" }}>
                  <span style={{ marginRight: "12px", color: "#10b981", fontSize: "20px" }}>✓</span>
                  <span>Portfolio Optimization Tools</span>
                </li>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "start" }}>
                  <span style={{ marginRight: "12px", color: "#10b981", fontSize: "20px" }}>✓</span>
                  <span>Budget & Goal Tracking</span>
                </li>
                <li style={{ marginBottom: "12px", display: "flex", alignItems: "start" }}>
                  <span style={{ marginRight: "12px", color: "#10b981", fontSize: "20px" }}>✓</span>
                  <span>Real-Time Market Data</span>
                </li>
                <li style={{ display: "flex", alignItems: "start" }}>
                  <span style={{ marginRight: "12px", color: "#10b981", fontSize: "20px" }}>✓</span>
                  <span>Unlimited Access to All Features</span>
                </li>
              </ul>
            </div>

            <div
              style={{
                padding: "20px",
                background: "#667eea",
                color: "white",
                borderRadius: "12px",
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              <p style={{ fontSize: "18px", marginBottom: "8px" }}>Premium Plan</p>
              <p style={{ fontSize: "36px", fontWeight: "bold" }}>
                $29.99<span style={{ fontSize: "18px" }}>/month</span>
              </p>
            </div>

            <Button
              onClick={handleSubscribe}
              disabled={loading}
              style={{
                width: "100%",
                height: "56px",
                fontSize: "18px",
                fontWeight: "600",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Processing..." : "Subscribe Now with Stripe"}
            </Button>

            <p
              style={{
                textAlign: "center",
                marginTop: "16px",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              Secure payment powered by Stripe
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
