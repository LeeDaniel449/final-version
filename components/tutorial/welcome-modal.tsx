"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Target, Calculator, Bot, Play } from "lucide-react"

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
  onStartTutorial: () => void
}

export function WelcomeModal({ isOpen, onClose, onStartTutorial }: WelcomeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Welcome to WealthWise! 🎉</DialogTitle>
          <DialogDescription className="text-center text-lg">
            Your journey to financial literacy starts here
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900">Learn</h3>
                <p className="text-sm text-blue-700">Interactive lessons</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900">Set Goals</h3>
                <p className="text-sm text-green-700">Track your progress</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-4 text-center">
                <Calculator className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900">Budget</h3>
                <p className="text-sm text-purple-700">Manage your money</p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4 text-center">
                <Bot className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-orange-900">AI Advisor</h3>
                <p className="text-sm text-orange-700">Get personalized tips</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={onStartTutorial} className="bg-blue-600 hover:bg-blue-700">
              <Play className="h-4 w-4 mr-2" />
              Take the Tour
            </Button>
            <Button variant="outline" onClick={onClose}>
              Skip for Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
