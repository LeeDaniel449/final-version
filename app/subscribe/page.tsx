"use client"

import "clsx"
import "class-variance-authority"

import { PricingTable } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      const hasPremium = user.publicMetadata?.premium === true || user.publicMetadata?.subscriptionStatus === "active"

      if (hasPremium) {
        router.replace("/")
      }
    }
  }, [isLoaded, user, router])

  if (!isLoaded || !user) {
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
          ></div>
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
          maxWidth: "900px",
          width: "100%",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "48px 32px",
            textAlign: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎯</div>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "12px", margin: 0 }}>
            Complete Your Subscription
          </h1>
          <p style={{ fontSize: "18px", opacity: 0.9, margin: 0 }}>Choose your plan to unlock all premium features</p>
        </div>

        <div style={{ padding: "40px 32px" }}>
          <PricingTable />
        </div>
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
