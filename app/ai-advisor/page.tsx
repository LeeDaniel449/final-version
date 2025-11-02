"use client"

import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LogIn, Bot } from "lucide-react"
import Link from "next/link"

export default function AIAdvisorPage() {
  const { user, isLoaded } = useUser()

  if (isLoaded && !user) {
    return (
      <div className="flex h-full min-h-[calc(100vh-4rem)] flex-grow items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-6">
        <Card className="max-w-md w-full bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <LogIn className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-purple-900 mb-2">Sign In to Access AI Advisor</h3>
            <p className="text-purple-800 mb-6">
              Sign in to get personalized financial advice and insights from our AI-powered advisor.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
                <Link href="/sign-in">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] flex-grow items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="text-center max-w-2xl">
        <div className="flex items-center justify-center mb-6">
          <Bot className="h-16 w-16 text-purple-600" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-4">Coming Soon!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Our AI Advisor is being fine-tuned and will be available shortly. Get ready for personalized financial
          guidance powered by artificial intelligence.
        </p>
      </div>
    </div>
  )
}
