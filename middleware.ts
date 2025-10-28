import { NextResponse } from "next/server"

// Authentication is handled at the page level via PremiumGuard components
export default function middleware(req: any) {
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
