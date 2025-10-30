import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Define public routes that don't require premium
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/subscribe(.*)", "/api(.*)"])

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl

  if (pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  const { userId } = await auth()

  if (!userId) {
    // Not signed in, redirect to sign-in
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }

  // Get user metadata to check premium status
  const user = await auth().then(async (authData) => {
    if (!authData.userId) return null
    const { clerkClient } = await import("@clerk/nextjs/server")
    const client = await clerkClient()
    return await client.users.getUser(authData.userId)
  })

  const hasPremium = user?.publicMetadata?.premium === true

  if (!hasPremium && pathname !== "/subscribe") {
    return NextResponse.redirect(new URL("/subscribe", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
