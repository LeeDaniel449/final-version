"use client"

import { useUser } from "@clerk/nextjs"
import Checkout from "@/components/checkout"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()

  console.log("[v0] ========== SUBSCRIBE PAGE ==========")
  console.log("[v0] isLoaded:", isLoaded)
  console.log("[v0] user exists:", !!user)
  if (user) {
    console.log("[v0] user id:", user.id)
    console.log("[v0] publicMetadata:", user.publicMetadata)
  }

  const hasPremium = user?.publicMetadata?.premium === true || user?.publicMetadata?.subscriptionStatus === "active"

  console.log("[v0] hasPremium:", hasPremium)
  console.log("[v0] ========== SUBSCRIBE PAGE END ==========")

  if (!isLoaded) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid rgba(255,255,255,0.3)",
              borderTop: "4px solid white",
              borderRadius: "50%",
              margin: "0 auto 16px",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ fontSize: "18px" }}>Loading...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    )
  }

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <p style={{ fontSize: "18px" }}>Please sign in to subscribe</p>
        </div>
      </div>
    )
  }

  // If user already has premium, show success message
  if (hasPremium) {
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
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "24px" }}>🎉</div>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", color: "#1a202c" }}>
            You're All Set!
          </h1>
          <p style={{ fontSize: "18px", color: "#4a5568", marginBottom: "32px" }}>
            You have premium access. Enjoy all features!
          </p>
          <a
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 32px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Go to Dashboard
          </a>
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
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          padding: "48px 32px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", color: "#1a202c" }}>
            Get Premium Access
          </h1>
          <p style={{ fontSize: "18px", color: "#4a5568" }}>Unlock all features for just $9.99/month</p>
        </div>

        <Checkout productId="premium-monthly" />
      </div>
    </div>
  )
}
