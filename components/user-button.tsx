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
    <div className="min-w-[44px] min-h-[44px] flex items-center justify-center" style={{ touchAction: "manipulation" }}>
      <ClerkUserButton
        appearance={{
          elements: {
            avatarBox: "w-10 h-10",
            userButtonPopoverCard: "touch-manipulation",
            userButtonPopoverActionButton: "min-h-[44px] touch-manipulation",
          },
        }}
      />
    </div>
  )
}
