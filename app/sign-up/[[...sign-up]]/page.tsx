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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            width: "100%",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            padding: "32px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎯</div>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", color: "#1a202c" }}>
              Welcome to WealthLink!
            </h1>
            <p style={{ fontSize: "18px", color: "#4a5568", marginBottom: "8px" }}>
              Choose your plan to unlock all premium features
            </p>
          </div>

          <div
            style={{
              width: "100%",
              height: "600px",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <iframe
              src={`https://${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.split("_")[1]}.accounts.dev/user/billing?embedded=true`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              title="Clerk Billing"
            />
          </div>

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
