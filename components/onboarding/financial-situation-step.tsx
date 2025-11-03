"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface FinancialSituationStepProps {
  onNext: (data: any) => void
  onBack: () => void
  initialData?: any
}

export function FinancialSituationStep({ onNext, onBack, initialData }: FinancialSituationStepProps) {
  const [formData, setFormData] = useState({
    incomeRange: initialData?.incomeRange || "",
    savingsRange: initialData?.savingsRange || "",
    debtLevel: initialData?.debtLevel || "",
    ...initialData,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.incomeRange && formData.savingsRange && formData.debtLevel) {
      onNext(formData)
    }
  }

  const incomeRanges = [
    { value: "under-25k", label: "Under $25,000" },
    { value: "25k-50k", label: "$25,000 - $50,000" },
    { value: "50k-75k", label: "$50,000 - $75,000" },
    { value: "75k-100k", label: "$75,000 - $100,000" },
    { value: "100k-150k", label: "$100,000 - $150,000" },
    { value: "over-150k", label: "Over $150,000" },
    { value: "prefer-not-to-say", label: "Prefer not to say" },
  ]

  const savingsRanges = [
    { value: "none", label: "No savings" },
    { value: "under-1k", label: "Under $1,000" },
    { value: "1k-5k", label: "$1,000 - $5,000" },
    { value: "5k-10k", label: "$5,000 - $10,000" },
    { value: "10k-25k", label: "$10,000 - $25,000" },
    { value: "25k-50k", label: "$25,000 - $50,000" },
    { value: "over-50k", label: "Over $50,000" },
  ]

  const debtLevels = [
    { value: "none", label: "No debt" },
    { value: "low", label: "Low debt (manageable monthly payments)" },
    { value: "moderate", label: "Moderate debt (some financial strain)" },
    { value: "high", label: "High debt (significant financial burden)" },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Financial Situation</CardTitle>
        <CardDescription>
          This information helps us provide more relevant advice and examples. All information is kept private.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <Label className="text-base font-medium">Annual Income Range</Label>
            <RadioGroup
              value={formData.incomeRange}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, incomeRange: value }))}
            >
              {incomeRanges.map((range) => (
                <div key={range.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={range.value} id={`income-${range.value}`} />
                  <Label htmlFor={`income-${range.value}`} className="cursor-pointer">
                    {range.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Current Savings</Label>
            <RadioGroup
              value={formData.savingsRange}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, savingsRange: value }))}
            >
              {savingsRanges.map((range) => (
                <div key={range.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={range.value} id={`savings-${range.value}`} />
                  <Label htmlFor={`savings-${range.value}`} className="cursor-pointer">
                    {range.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Current Debt Level</Label>
            <RadioGroup
              value={formData.debtLevel}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, debtLevel: value }))}
            >
              {debtLevels.map((level) => (
                <div key={level.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={level.value} id={`debt-${level.value}`} />
                  <Label htmlFor={`debt-${level.value}`} className="cursor-pointer">
                    {level.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" disabled={!formData.incomeRange || !formData.savingsRange || !formData.debtLevel}>
              Continue
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
