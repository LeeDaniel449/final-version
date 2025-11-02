"use client"

import { useUser, useOrganizationList } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { PricingTable } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SubscribePage() {
  const { user, isLoaded } = useUser()
  const { isLoaded: orgsLoaded, userMemberships } = useOrganizationList({
    userMemberships: { infinite: true },
  })
  const router = useRouter()
  const [isActivating, setIsActivating] = useState(false)
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(false)

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
    user?.publicMetadata?.subscriptionStatus === "created" ||
    user?.publicMetadata?.freeTrialActive === true

  const hasOrgMembership = userMemberships && userMemberships.data && userMemberships.data.length > 0

  console.log("[v0] hasPremiumMetadata:", hasPremiumMetadata)
  console.log("[v0] hasOrgMembership:", hasOrgMembership)

  const showActivateButton = isLoaded && orgsLoaded && user && hasOrgMembership && !hasPremiumMetadata

  console.log("[v0] showActivateButton:", showActivateButton)
  console.log("[v0] ========== SUBSCRIBE PAGE DEBUG END ==========")

  useEffect(() => {
    if (!user || !isLoaded || !orgsLoaded || hasPremiumMetadata || isCheckingSubscription) {
      return
    }

    if (hasOrgMembership) {
      console.log("[v0] 🔍 Organization membership detected, auto-activating premium...")
      setIsCheckingSubscription(true)

      const activatePremium = async () => {
        try {
          console.log("[v0] 🚀 Calling webhook to activate premium for user:", user.id)
          const response = await fetch("/api/webhooks/clerk", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "subscription.created",
              data: {
                userId: user.id,
                user_id: user.id,
                id: `sub_${Date.now()}`,
                status: "active",
              },
            }),
          })

          if (response.ok) {
            console.log("[v0] ✅ Webhook called successfully, reloading user data...")
            await user.reload()
            console.log("[v0] ✅ User data reloaded, checking premium status...")

            const nowHasPremium =
              user.publicMetadata?.premium === true ||
              user.publicMetadata?.subscriptionStatus === "active" ||
              user.publicMetadata?.subscriptionStatus === "created"

            if (nowHasPremium) {
              console.log("[v0] ✅ Premium activated! Redirecting to home...")
              window.location.href = "/"
            } else {
              console.log("[v0] ⚠️ Premium not detected after webhook, will retry...")
              setIsCheckingSubscription(false)
            }
          } else {
            console.error("[v0] ❌ Webhook call failed:", await response.text())
            setIsCheckingSubscription(false)
          }
        } catch (error) {
          console.error("[v0] ❌ Error calling webhook:", error)
          setIsCheckingSubscription(false)
        }
      }

      activatePremium()
    }
  }, [user, isLoaded, orgsLoaded, hasOrgMembership, hasPremiumMetadata, isCheckingSubscription])

  const handleActivate = async () => {
    setIsActivating(true)
    console.log("[v0] User clicked activate subscription button")

    try {
      const response = await fetch("/api/set-premium", {
        method: "POST",
      })

      if (response.ok) {
        console.log("[v0] Premium activated successfully")
        window.location.href = "/"
      } else {
        console.error("[v0] Failed to activate premium")
        alert("Failed to activate premium. Please try again.")
        setIsActivating(false)
      }
    } catch (error) {
      console.error("[v0] Error activating premium:", error)
      alert("An error occurred. Please try again.")
      setIsActivating(false)
    }
  }

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
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: "500px",
            width: "100%",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            padding: "48px 32px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", color: "#1a202c" }}>
            Sign In Required
          </h1>
          <p style={{ fontSize: "18px", color: "#4a5568", marginBottom: "32px" }}>
            Please sign in to view subscription options and access premium features.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/sign-in">
              <Button
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
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                variant="outline"
                style={{
                  padding: "12px 32px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (isCheckingSubscription) {
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
          <p style={{ fontSize: "18px" }}>Activating your premium access...</p>
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

        {showActivateButton && (
          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <p style={{ marginBottom: "16px", color: "#4a5568" }}>
              You have an active subscription. Click below to activate your premium access.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                onClick={handleActivate}
                disabled={isActivating}
                style={{
                  background: "#48bb78",
                  color: "white",
                  padding: "12px 32px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  border: "none",
                  cursor: isActivating ? "not-allowed" : "pointer",
                  opacity: isActivating ? 0.6 : 1,
                }}
              >
                {isActivating ? "Activating..." : "Activate Subscription"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
