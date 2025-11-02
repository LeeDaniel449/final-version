"use client"

import { useUser, useOrganizationList } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { PricingTable } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const { isLoaded: orgsLoaded, userMemberships } = useOrganizationList({
    userMemberships: { infinite: true },
  })
  const router = useRouter()
  const [isAutoActivating, setIsAutoActivating] = useState(false)

  console.log("[v0] ========== SUBSCRIBE PAGE DEBUG ==========")
  console.log("[v0] isLoaded:", isLoaded)
  console.log("[v0] orgsLoaded:", orgsLoaded)
  console.log("[v0] user exists:", !!user)
  if (user) {
    console.log("[v0] user id:", user.id)
    console.log("[v0] publicMetadata:", user.publicMetadata)
  }
  console.log("[v0] userMemberships:", userMemberships)
  console.log("[v0] userMemberships.data:", userMemberships?.data)
  console.log("[v0] userMemberships.data.length:", userMemberships?.data?.length)

  const hasPremiumMetadata =
    user?.publicMetadata?.premium === true ||
    user?.publicMetadata?.subscriptionStatus === "active" ||
    user?.publicMetadata?.freeTrialActive === true

  const hasOrgMembership = userMemberships && userMemberships.data && userMemberships.data.length > 0

  console.log("[v0] hasPremiumMetadata:", hasPremiumMetadata)
  console.log("[v0] hasOrgMembership:", hasOrgMembership)
  console.log("[v0] ========== SUBSCRIBE PAGE DEBUG END ==========")

  useEffect(() => {
    if (!isLoaded || !orgsLoaded || !user || isAutoActivating) return

    if (hasOrgMembership && !hasPremiumMetadata) {
      console.log("[v0] 🚀 Subscription detected! Auto-activating premium...")
      setIsAutoActivating(true)

      fetch("/api/webhooks/clerk?client=true", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      })
        .then(async (response) => {
          const data = await response.json()
          if (response.ok) {
            console.log("[v0] ✅ Premium auto-activated successfully")
            await user.reload()
            setTimeout(() => {
              window.location.href = "/"
            }, 1000)
          } else {
            console.error("[v0] ❌ Auto-activation failed:", data)
            setIsAutoActivating(false)
          }
        })
        .catch((error) => {
          console.error("[v0] ❌ Error during auto-activation:", error)
          setIsAutoActivating(false)
        })
    }
  }, [isLoaded, orgsLoaded, user, hasOrgMembership, hasPremiumMetadata, isAutoActivating])

  if (!isLoaded || !orgsLoaded) {
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

  if (isAutoActivating) {
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
          <p style={{ fontSize: "18px" }}>Activating your premium subscription...</p>
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
          maxWidth: "1200px",
          width: "100%",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          padding: "48px 32px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", color: "#1a202c" }}>
            Choose Your Plan
          </h1>
          <p style={{ fontSize: "18px", color: "#4a5568" }}>Subscribe to unlock all premium features</p>
        </div>

        {!hasPremiumMetadata && (
          <div style={{ marginBottom: "32px" }}>
            <PricingTable />
          </div>
        )}

        {hasPremiumMetadata && (
          <div
            style={{
              textAlign: "center",
              padding: "48px 24px",
              background: "#f7fafc",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "#48bb78",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px", color: "#1a202c" }}>
              You're Already Subscribed!
            </h2>
            <p style={{ fontSize: "16px", color: "#4a5568", marginBottom: "24px" }}>
              You have access to all premium features.
            </p>
            <Button
              onClick={() => router.push("/")}
              style={{
                background: "#667eea",
                color: "white",
                padding: "12px 32px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
              }}
            >
              Go to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
