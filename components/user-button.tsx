"use client"

import { useUser, useClerk } from "@clerk/nextjs"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings } from "lucide-react"
import { userDataManager } from "@/lib/user-data"
import { useRouter } from "next/navigation"

export function UserButton() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    console.log("[v0] Sign out button clicked")
    try {
      // Clear local data first
      userDataManager.signOut()
      // Then sign out from Clerk
      await signOut()
      console.log("[v0] Sign out successful")
      router.push("/")
    } catch (error) {
      console.error("[v0] Sign out error:", error)
    }
  }

  if (!isLoaded) {
    return <Skeleton className="h-10 w-10 rounded-full" />
  }

  if (!isSignedIn) {
    return null
  }

  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : user?.firstName
        ? user.firstName[0]
        : user?.emailAddresses[0]?.emailAddress?.[0]?.toUpperCase() || "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 rounded-full p-0 hover:bg-accent" aria-label="User menu">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.imageUrl || "/placeholder.svg"} alt={user?.fullName || "User"} />
            <AvatarFallback className="bg-blue-600 text-white">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.fullName || user?.firstName || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.emailAddresses[0]?.emailAddress}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
