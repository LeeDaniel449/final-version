"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Sparkles } from "lucide-react"
import Link from "next/link"

export function PremiumBanner() {
  return (
    <Card className="border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              Upgrade to Premium
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </h3>
            <p className="text-gray-700 mb-4">
              Unlock all features including AI-powered insights, advanced portfolio tools, and personalized financial
              advice.
            </p>
            <Link href="/pricing">
              <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold">
                <Crown className="w-4 h-4 mr-2" />
                View Premium Plans
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
