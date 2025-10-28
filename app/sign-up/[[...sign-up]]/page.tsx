"use client"

import { SignUp, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SignUpPage() {
  const { isSignedIn, isLoaded, user } = useUser()
  const router = useRouter()
  const [showSubscription, setShowSubscription] = useState(false)

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log("[v0] User signed in, checking premium status")
      const hasPremium = user.publicMetadata?.premium === true || user.publicMetadata?.subscriptionStatus === "active"

      if (hasPremium) {
        console.log("[v0] User has premium, redirecting to home")
        router.replace("/")
      } else {
        console.log("[v0] User needs premium, showing subscription step")
        setShowSubscription(true)
      }
    }
  }, [isLoaded, isSignedIn, user, router])

  if (showSubscription) {
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
        <div
          style={{
            maxWidth: "600px",
            width: "100%",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            padding: "48px 32px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎯</div>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", color: "#1a202c" }}>
              Welcome to WealthLink!
            </h1>
            <p style={{ fontSize: "18px", color: "#4a5568", marginBottom: "8px" }}>
              Subscribe to unlock all premium features
            </p>
          </div>

          <div
            style={{
              background: "#f7fafc",
              borderRadius: "12px",
              padding: "32px",
              marginBottom: "32px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "#667eea", marginBottom: "8px" }}>
                $9.99<span style={{ fontSize: "18px", fontWeight: "normal", color: "#718096" }}>/month</span>
              </div>
              <div style={{ fontSize: "16px", color: "#718096", fontWeight: "600" }}>Premium Plan</div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              {[
                "AI-Powered Financial Advisor",
                "Portfolio Optimization Tools",
                "Budget & Goal Tracking",
                "Real-time Market Data",
                "Advanced Analytics Dashboard",
                "Priority Support",
              ].map((feature, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ color: "#48bb78", marginRight: "12px", fontSize: "20px", fontWeight: "bold" }}>✓</span>
                  <span style={{ color: "#2d3748", fontSize: "16px" }}>{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                console.log("[v0] Redirecting to Clerk billing")
                window.location.href = `https://accounts.clerk.dev/user/billing?redirect_url=${window.location.origin}`
              }}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "18px",
                fontWeight: "600",
                color: "white",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.02)"
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.4)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              Subscribe Now
            </button>
          </div>

          <p style={{ fontSize: "14px", color: "#718096", textAlign: "center" }}>
            Premium subscription is required to access the platform
          </p>
        </div>
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
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "white", marginBottom: "8px" }}>Get Started</h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.9)" }}>Create your account to unlock all features</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl",
            },
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  )
}
