import { type NextRequest, NextResponse } from "next/server"
import { getUserSession } from "@/app/actions/session"

const SESSION_COOKIE_NAME = "wealthwise_user_session"
const SESSION_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserSession()

    console.log("[v0] Session API - userId from cookie:", userId ? `${userId.substring(0, 15)}...` : "none")

    return NextResponse.json({
      userId,
      authenticated: !!userId,
    })
  } catch (error) {
    console.error("[v0] Session API error:", error)
    return NextResponse.json({ userId: null, authenticated: false }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId || typeof userId !== "string" || !userId.startsWith("user_")) {
      console.error("[v0] ❌ Invalid userId provided to session API:", userId)
      return NextResponse.json({ success: false, error: "Invalid user ID" }, { status: 400 })
    }

    console.log("[v0] 🍪 Setting session cookie via API for user:", `${userId.substring(0, 15)}...`)

    // Create response and set cookie
    const response = NextResponse.json({ success: true, userId })

    response.cookies.set(SESSION_COOKIE_NAME, userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    })

    console.log("[v0] ✅ Session cookie set successfully via API")
    return response
  } catch (error) {
    console.error("[v0] ❌ Session API POST error:", error)
    return NextResponse.json({ success: false, error: "Failed to set session" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log("[v0] 🍪 Clearing session cookie via API")

    const response = NextResponse.json({ success: true })
    response.cookies.delete(SESSION_COOKIE_NAME)

    console.log("[v0] ✅ Session cookie cleared via API")
    return response
  } catch (error) {
    console.error("[v0] ❌ Session API DELETE error:", error)
    return NextResponse.json({ success: false, error: "Failed to clear session" }, { status: 500 })
  }
}
