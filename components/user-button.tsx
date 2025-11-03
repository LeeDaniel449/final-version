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
    <div
      className="min-w-[48px] min-h-[48px] flex items-center justify-center p-1 cursor-pointer rounded-full hover:bg-accent/50 transition-colors"
      style={{
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <ClerkUserButton
        appearance={{
          elements: {
            avatarBox: "w-10 h-10 cursor-pointer",
            userButtonPopoverCard: "touch-manipulation",
            userButtonPopoverActionButton: "min-h-[48px] touch-manipulation cursor-pointer",
            userButtonPopoverActionButtonText: "text-base",
            userButtonPopoverActionButtonIcon: "w-5 h-5",
          },
        }}
      />
    </div>
  )
}
