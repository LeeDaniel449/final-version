"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Target, Calculator, TrendingUp } from "lucide-react"

interface WelcomeStepProps {
  onNext: () => void
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to WealthWise
        </CardTitle>
        <CardDescription className="text-lg">
          Your journey to financial literacy starts here. Let's personalize your learning experience.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="font-semibold">Interactive Learning</h3>
              <p className="text-sm text-muted-foreground">Engaging modules and quizzes</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
            <Target className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="font-semibold">Goal Setting</h3>
              <p className="text-sm text-muted-foreground">Track your financial goals</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
            <Calculator className="h-8 w-8 text-purple-600" />
            <div>
              <h3 className="font-semibold">Budget Tools</h3>
              <p className="text-sm text-muted-foreground">Manage your finances</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20">
            <TrendingUp className="h-8 w-8 text-orange-600" />
            <div>
              <h3 className="font-semibold">Investment Simulator</h3>
              <p className="text-sm text-muted-foreground">Practice with virtual money</p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            This quick setup will take about 3-5 minutes and help us customize your experience.
          </p>
          <Button onClick={onNext} size="lg" className="w-full sm:w-auto">
            Get Started
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
