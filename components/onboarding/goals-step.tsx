"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface GoalsStepProps {
  onNext: (data: any) => void
  onBack: () => void
  initialData?: any
}

export function GoalsStep({ onNext, onBack, initialData }: GoalsStepProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(initialData?.goals || [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedGoals.length > 0) {
      onNext({ goals: selectedGoals })
    }
  }

  const handleGoalChange = (goalId: string, checked: boolean) => {
    if (checked) {
      setSelectedGoals((prev) => [...prev, goalId])
    } else {
      setSelectedGoals((prev) => prev.filter((id) => id !== goalId))
    }
  }

  const goalOptions = [
    {
      id: "emergency-fund",
      label: "Build an Emergency Fund",
      description: "Save 3-6 months of expenses for unexpected situations",
    },
    {
      id: "debt-payoff",
      label: "Pay Off Debt",
      description: "Eliminate credit card debt, student loans, or other debts",
    },
    {
      id: "retirement-planning",
      label: "Plan for Retirement",
      description: "Build long-term wealth for your golden years",
    },
    {
      id: "home-purchase",
      label: "Buy a Home",
      description: "Save for a down payment and understand mortgages",
    },
    {
      id: "investment-growth",
      label: "Grow Investments",
      description: "Learn about stocks, bonds, and other investment vehicles",
    },
    {
      id: "financial-independence",
      label: "Achieve Financial Independence",
      description: "Build enough wealth to have financial freedom",
    },
    {
      id: "education-funding",
      label: "Fund Education",
      description: "Save for your own or your children's education",
    },
    {
      id: "business-startup",
      label: "Start a Business",
      description: "Learn about business finances and entrepreneurship",
    },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Financial Goals</CardTitle>
        <CardDescription>
          What are your main financial objectives? Select all that apply to personalize your learning path.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            {goalOptions.map((goal) => (
              <div
                key={goal.id}
                className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={goal.id}
                  checked={selectedGoals.includes(goal.id)}
                  onCheckedChange={(checked) => handleGoalChange(goal.id, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor={goal.id} className="font-medium cursor-pointer">
                    {goal.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" disabled={selectedGoals.length === 0}>
              Continue ({selectedGoals.length} selected)
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
