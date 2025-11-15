"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'

export default function ActivatePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!isLoaded) return

    if (!user) {
      setStatus("error")
      setMessage("You must be signed in to activate premium")
      return
    }

    // Automatically activate premium
    fetch("/api/activate-premium", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success")
          setMessage("Premium activated successfully!")
          setTimeout(() => {
            router.push("/")
          }, 2000)
        } else {
          setStatus("error")
          setMessage(data.error || "Failed to activate premium")
        }
      })
      .catch((err) => {
        setStatus("error")
        setMessage("Network error: " + err.message)
      })
  }, [isLoaded, user, router])

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-md rounded-lg border bg-card p-8 text-center shadow-lg">
        {status === "loading" && (
          <>
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
            <p className="text-lg">Activating premium...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-4 text-5xl">✅</div>
            <h2 className="mb-2 text-2xl font-bold">Success!</h2>
            <p className="text-muted-foreground">{message}</p>
            <p className="mt-4 text-sm">Redirecting to homepage...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-4 text-5xl">❌</div>
            <h2 className="mb-2 text-2xl font-bold">Error</h2>
            <p className="text-muted-foreground">{message}</p>
          </>
        )}
      </div>
    </div>
  )
}
