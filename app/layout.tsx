import type React from "react"
import { Suspense } from "react"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 sticky top-0 z-10">
                <SidebarTrigger className="-ml-1" />
              </header>
              <main className="flex-1 overflow-auto">{children}</main>
            </SidebarInset>
          </Suspense>
        </SidebarProvider>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata = {
  generator: "v0.dev",
}
