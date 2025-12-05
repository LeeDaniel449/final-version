"use server"

import { cookies } from "next/headers"

const SESSION_COOKIE_NAME = "wealthwise_user_session"
const SESSION_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function setUserSession(userId: string) {
  console.log("[v0] 🍪 Setting server session cookie for user:", `${userId.substring(0, 15)}...`)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  })
  console.log("[v0] ✅ Session cookie set successfully")
  return { success: true }
}

export async function getUserSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  console.log("[v0] 🍪 Reading session cookie:", session?.value ? `${session.value.substring(0, 15)}...` : "none")
  return session?.value || null
}

export async function clearUserSession() {
  console.log("[v0] 🍪 Clearing session cookie")
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
  console.log("[v0] ✅ Session cookie cleared")
  return { success: true }
}
