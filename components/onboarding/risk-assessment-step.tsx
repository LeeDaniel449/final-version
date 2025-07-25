"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface RiskAssessmentStepProps {
  onNext: (data: any) => void
  onBack: () => void
  initialData?: any
}

export function RiskAssessmentStep({ onNext, onBack, initialData }: RiskAssessmentStepProps) {
  const [answers, setAnswers] = useState({
    timeHorizon: initialData?.timeHorizon || "",
    riskTolerance: initialData?.riskTolerance || "",
    investmentExperience: initialData?.investmentExperience || "",
    ...initialData,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (answers.timeHorizon && answers.riskTolerance && answers.investmentExperience) {
      onNext(answers)
    }
  }

  const updateAnswer = (field: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Risk Assessment</CardTitle>
        <CardDescription>
          Understanding your risk tolerance helps us recommend appropriate investment strategies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <Label className="text-base font-medium">Investment Time Horizon</Label>
            <p className="text-sm text-muted-foreground">How long do you plan to invest before needing the money?</p>
            <RadioGroup value={answers.timeHorizon} onValueChange={(value) => updateAnswer("timeHorizon", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="short" id="time-short" />
                <Label htmlFor="time-short" className="cursor-pointer">
                  Less than 3 years
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="time-medium" />
                <Label htmlFor="time-medium" className="cursor-pointer">
                  3-10 years
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="long" id="time-long" />
                <Label htmlFor="time-long" className="cursor-pointer">
                  More than 10 years
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Risk Tolerance</Label>
            <p className="text-sm text-muted-foreground">How would you react to a 20% drop in your investment value?</p>
            <RadioGroup value={answers.riskTolerance} onValueChange={(value) => updateAnswer("riskTolerance", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="conservative" id="risk-conservative" />
                <Label htmlFor="risk-conservative" className="cursor-pointer">
                  I'd be very concerned and likely sell
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderate" id="risk-moderate" />
                <Label htmlFor="risk-moderate" className="cursor-pointer">
                  I'd be worried but would probably hold
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="aggressive" id="risk-aggressive" />
                <Label htmlFor="risk-aggressive" className="cursor-pointer">
                  I'd see it as a buying opportunity
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Investment Experience</Label>
            <p className="text-sm text-muted-foreground">How familiar are you with different investment options?</p>
            <RadioGroup
              value={answers.investmentExperience}
              onValueChange={(value) => updateAnswer("investmentExperience", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="exp-none" />
                <Label htmlFor="exp-none" className="cursor-pointer">
                  No experience with investing
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="basic" id="exp-basic" />
                <Label htmlFor="exp-basic" className="cursor-pointer">
                  Basic knowledge of stocks and bonds
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="exp-intermediate" />
                <Label htmlFor="exp-intermediate" className="cursor-pointer">
                  Some experience with various investments
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="exp-advanced" />
                <Label htmlFor="exp-advanced" className="cursor-pointer">
                  Experienced with complex investments
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button
              type="submit"
              disabled={!answers.timeHorizon || !answers.riskTolerance || !answers.investmentExperience}
            >
              Continue
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
