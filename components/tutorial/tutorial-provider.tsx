"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface TutorialStep {
  id: string
  title: string
  content: string
  target: string
  position: "top" | "bottom" | "left" | "right"
}

interface TutorialContextType {
  isActive: boolean
  currentStep: number
  steps: TutorialStep[]
  startTutorial: (steps: TutorialStep[]) => void
  nextStep: () => void
  prevStep: () => void
  endTutorial: () => void
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined)

export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<TutorialStep[]>([])

  const startTutorial = useCallback((tutorialSteps: TutorialStep[]) => {
    setSteps(tutorialSteps)
    setCurrentStep(0)
    setIsActive(true)
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev < steps.length - 1) {
        return prev + 1
      } else {
        setIsActive(false)
        return 0
      }
    })
  }, [steps.length])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }, [])

  const endTutorial = useCallback(() => {
    setIsActive(false)
    setCurrentStep(0)
    setSteps([])
  }, [])

  return (
    <TutorialContext.Provider
      value={{
        isActive,
        currentStep,
        steps,
        startTutorial,
        nextStep,
        prevStep,
        endTutorial,
      }}
    >
      {children}
    </TutorialContext.Provider>
  )
}

export function useTutorial() {
  const context = useContext(TutorialContext)
  if (context === undefined) {
    throw new Error("useTutorial must be used within a TutorialProvider")
  }
  return context
}

export function TutorialOverlay() {
  const { isActive, currentStep, steps, nextStep, prevStep, endTutorial } = useTutorial()

  if (!isActive || steps.length === 0) {
    return null
  }

  const currentStepData = steps[currentStep]
  if (!currentStepData) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Tutorial Card */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <Card className="w-96 max-w-sm mx-4 shadow-2xl border-2 border-blue-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-blue-900">{currentStepData.title}</CardTitle>
              <Button variant="ghost" size="sm" onClick={endTutorial} className="h-6 w-6 p-0 hover:bg-red-100">
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
            <div className="text-xs text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-700 mb-4">{currentStepData.content}</p>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-1 bg-transparent"
              >
                <ChevronLeft className="h-3 w-3" />
                Previous
              </Button>

              <div className="flex gap-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentStep ? "bg-blue-500" : "bg-gray-300"}`}
                  />
                ))}
              </div>

              <Button size="sm" onClick={nextStep} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
                {currentStep === steps.length - 1 ? "Finish" : "Next"}
                {currentStep < steps.length - 1 && <ChevronRight className="h-3 w-3" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
