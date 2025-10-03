"use client"

import { UserButton as ClerkUserButton, useUser } from "@clerk/nextjs"
import { Skeleton } from "@/components/ui/skeleton"

export function UserButton() {
  const { isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return <Skeleton className="h-8 w-8 rounded-full" />
  }

  if (!isSignedIn) {
    return null
  }

  return (
    <ClerkUserButton
      appearance={{
        elements: {
          avatarBox: "w-8 h-8",
        },
      }}
    />
  )
}
