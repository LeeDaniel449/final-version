"use server"

import { cookies } from "next/headers"

const SESSION_COOKIE_NAME = "wealthwise_user_session"
const SESSION_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function setUserSession(userId: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  })
  return { success: true }
}

export async function getUserSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return session?.value || null
}

export async function clearUserSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
  return { success: true }
}
