import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/sign-in(.*)", "/sign-up(.*)", "/subscribe(.*)", "/api(.*)"],
  afterAuth(auth, req) {
    // Redirect from onboarding to home
    if (req.nextUrl.pathname === "/onboarding") {
      return Response.redirect(new URL("/", req.url))
    }

    // If user is not signed in and trying to access a protected route, redirect to sign-up
    if (!auth.userId && !auth.isPublicRoute) {
      const signUpUrl = new URL("/sign-up", req.url)
      return Response.redirect(signUpUrl)
    }

    // Allow the request to proceed
    return
  },
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
