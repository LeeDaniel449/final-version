"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

interface SummaryStepProps {
  onComplete: () => void
  onBack: () => void
  formData: any
}

export function SummaryStep({ onComplete, onBack, formData }: SummaryStepProps) {
  const getExperienceLabel = (experience: string) => {
    const labels = {
      beginner: "Complete Beginner",
      "some-knowledge": "Some Knowledge",
      intermediate: "Intermediate",
      advanced: "Advanced",
    }
    return labels[experience as keyof typeof labels] || experience
  }

  const getIncomeLabel = (income: string) => {
    const labels = {
      "under-25k": "Under $25,000",
      "25k-50k": "$25,000 - $50,000",
      "50k-75k": "$50,000 - $75,000",
      "75k-100k": "$75,000 - $100,000",
      "100k-150k": "$100,000 - $150,000",
      "over-150k": "Over $150,000",
      "prefer-not-to-say": "Prefer not to say",
    }
    return labels[income as keyof typeof labels] || income
  }

  const getRiskLabel = (risk: string) => {
    const labels = {
      conservative: "Conservative",
      moderate: "Moderate",
      aggressive: "Aggressive",
    }
    return labels[risk as keyof typeof labels] || risk
  }

  const getGoalLabels = (goals: string[]) => {
    const labels = {
      "emergency-fund": "Emergency Fund",
      "debt-payoff": "Pay Off Debt",
      "retirement-planning": "Retirement Planning",
      "home-purchase": "Home Purchase",
      "investment-growth": "Investment Growth",
      "financial-independence": "Financial Independence",
      "education-funding": "Education Funding",
      "business-startup": "Business Startup",
    }
    return goals.map((goal) => labels[goal as keyof typeof labels] || goal)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <CardTitle>Setup Complete!</CardTitle>
        </div>
        <CardDescription>
          Here's a summary of your profile. You can always update this information later in settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-semibold mb-2">Personal Information</h3>
            <p className="text-sm">
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </p>
            <p className="text-sm">
              <strong>Age:</strong> {formData.age}
            </p>
            <p className="text-sm">
              <strong>Occupation:</strong> {formData.occupation}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-semibold mb-2">Experience & Goals</h3>
            <p className="text-sm mb-2">
              <strong>Experience Level:</strong> {getExperienceLabel(formData.experience)}
            </p>
            <div>
              <strong className="text-sm">Financial Goals:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {getGoalLabels(formData.goals || []).map((goal) => (
                  <Badge key={goal} variant="secondary" className="text-xs">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-semibold mb-2">Financial Profile</h3>
            <p className="text-sm">
              <strong>Income Range:</strong> {getIncomeLabel(formData.incomeRange)}
            </p>
            <p className="text-sm">
              <strong>Risk Tolerance:</strong> {getRiskLabel(formData.riskTolerance)}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">What's Next?</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Explore personalized learning modules</li>
            <li>• Set up your first financial goals</li>
            <li>• Try the investment simulator</li>
            <li>• Connect with our AI financial advisor</li>
          </ul>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onComplete} size="lg">
            Enter WealthWise
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
