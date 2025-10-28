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
    const handleSubscribe = () => {
      // Open Clerk's user profile to billing section
      window.open(`${window.location.origin}/user-profile#/billing`, "_blank")
    }

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
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
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>💎</div>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", color: "#1a202c" }}>
              Get Premium Access
            </h1>
            <p style={{ fontSize: "18px", color: "#4a5568", marginBottom: "24px" }}>
              Subscribe to unlock all features and start your financial journey
            </p>
          </div>

          <div
            style={{
              background: "#f7fafc",
              borderRadius: "12px",
              padding: "32px",
              marginBottom: "32px",
              border: "2px solid #e2e8f0",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  fontSize: "14px",
                  color: "#718096",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Premium Plan
              </div>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "#1a202c" }}>
                $9.99<span style={{ fontSize: "20px", color: "#718096" }}>/month</span>
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              {[
                "AI-Powered Financial Advisor",
                "Portfolio Optimization Tools",
                "Budget Tracking & Analytics",
                "Investment Recommendations",
                "Debt Payoff Calculator",
                "Unlimited Access to All Features",
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: index < 5 ? "1px solid #e2e8f0" : "none",
                  }}
                >
                  <span style={{ color: "#48bb78", marginRight: "12px", fontSize: "20px" }}>✓</span>
                  <span style={{ color: "#2d3748", fontSize: "16px" }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubscribe}
            style={{
              width: "100%",
              padding: "16px 32px",
              fontSize: "18px",
              fontWeight: "600",
              color: "white",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.5)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)"
            }}
          >
            Subscribe Now
          </button>

          <p style={{ fontSize: "14px", color: "#718096", textAlign: "center", marginTop: "24px" }}>
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
