"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ExperienceStepProps {
  onNext: (data: any) => void
  onBack: () => void
  initialData?: any
}

export function ExperienceStep({ onNext, onBack, initialData }: ExperienceStepProps) {
  const [experience, setExperience] = useState(initialData?.experience || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (experience) {
      onNext({ experience })
    }
  }

  const experienceOptions = [
    {
      value: "beginner",
      label: "Complete Beginner",
      description: "I'm new to personal finance and investing",
    },
    {
      value: "some-knowledge",
      label: "Some Knowledge",
      description: "I know the basics but want to learn more",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      description: "I have some experience with budgeting and investing",
    },
    {
      value: "advanced",
      label: "Advanced",
      description: "I'm experienced but want to refine my strategies",
    },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Financial Experience Level</CardTitle>
        <CardDescription>
          Help us understand your current knowledge so we can tailor the content appropriately.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <RadioGroup value={experience} onValueChange={setExperience}>
            {experienceOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={option.value} className="font-medium cursor-pointer">
                    {option.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" disabled={!experience}>
              Continue
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
