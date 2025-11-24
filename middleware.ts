import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export default function middleware(req: any) {
  try {
    // Try to use Clerk middleware
    return clerkMiddleware()(req)
  } catch (error) {
    // If Clerk middleware fails (missing keys), just pass through
    console.log("[v0] Clerk middleware error - passing through:", error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
