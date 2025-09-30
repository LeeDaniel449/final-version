"use client"

import { useState } from "react"
import { WelcomeStep } from "@/components/onboarding/welcome-step"
import { PersonalInfoStep } from "@/components/onboarding/personal-info-step"
import { ExperienceStep } from "@/components/onboarding/experience-step"
import { GoalsStep } from "@/components/onboarding/goals-step"
import { FinancialSituationStep } from "@/components/onboarding/financial-situation-step"
import { RiskAssessmentStep } from "@/components/onboarding/risk-assessment-step"
import { SummaryStep } from "@/components/onboarding/summary-step"
import { Progress } from "@/components/ui/progress"

const STEPS = ["Welcome", "Personal Info", "Experience", "Goals", "Financial Situation", "Risk Assessment", "Summary"]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})

  const handleNext = (stepData?: any) => {
    if (stepData) {
      setFormData((prev) => ({ ...prev, ...stepData }))
    }
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleComplete = () => {
    // Save onboarding data and redirect to main app
    localStorage.setItem("onboardingData", JSON.stringify(formData))
    window.location.href = "/?cache-bust=123"
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Getting Started</h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {STEPS.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {STEPS.map((step, index) => (
              <span key={step} className={index <= currentStep ? "text-primary" : ""}>
                {step}
              </span>
            ))}
          </div>
        </div>

        {currentStep === 0 && <WelcomeStep onNext={handleNext} />}
        {currentStep === 1 && <PersonalInfoStep onNext={handleNext} onBack={handleBack} initialData={formData} />}
        {currentStep === 2 && <ExperienceStep onNext={handleNext} onBack={handleBack} initialData={formData} />}
        {currentStep === 3 && <GoalsStep onNext={handleNext} onBack={handleBack} initialData={formData} />}
        {currentStep === 4 && <FinancialSituationStep onNext={handleNext} onBack={handleBack} initialData={formData} />}
        {currentStep === 5 && <RiskAssessmentStep onNext={handleNext} onBack={handleBack} initialData={formData} />}
        {currentStep === 6 && <SummaryStep onComplete={handleComplete} onBack={handleBack} formData={formData} />}
      </div>
    </div>
  )
}
