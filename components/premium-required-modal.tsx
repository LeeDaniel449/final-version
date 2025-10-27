"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Lock, Sparkles } from "lucide-react"

interface PremiumRequiredModalProps {
  isOpen: boolean
  onClose: () => void
  action: string
}

export function PremiumRequiredModal({ isOpen, onClose, action }: PremiumRequiredModalProps) {
  const router = useRouter()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 space-y-4">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
          <Lock className="w-8 h-8 text-white" />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Premium Required</h2>
          <p className="text-gray-600">
            To {action}, you need to upgrade to WealthWise Premium. Get unlimited access to all features and take
            control of your financial future.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Unlimited budget tracking</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>AI-powered financial advice</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Portfolio optimization tools</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Complete learning modules</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Maybe Later
          </Button>
          <Button
            onClick={() => router.push("/pricing")}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  )
}
