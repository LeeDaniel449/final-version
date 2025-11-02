"use client"

import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

export function AuthButtonsClient() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return <div className="w-32 h-9 bg-gray-100 animate-pulse rounded" />
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <UserButton afterSignOutUrl="/" />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/sign-in">
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          Sign Up
        </Button>
      </Link>
    </div>
  )
}
