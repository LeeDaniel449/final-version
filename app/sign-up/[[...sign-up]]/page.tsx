"use client"

import { SignUp, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignUpPage() {
  const { isSignedIn, isLoaded, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log("[v0] User signed in, checking premium status")
      const hasPremium = user.publicMetadata?.premium === true || user.publicMetadata?.subscriptionStatus === "active"

      if (hasPremium) {
        console.log("[v0] User has premium, redirecting to home")
        router.replace("/")
      } else {
        console.log("[v0] User needs premium, redirecting to subscribe")
        router.replace("/subscribe")
      }
    }
  }, [isLoaded, isSignedIn, user, router])

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
