"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

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
