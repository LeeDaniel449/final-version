"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface TutorialContextType {
  startTutorial: () => void
  currentStep: number
  isActive: boolean
  completeTutorial: () => void
  nextStep: () => void
  prevStep: () => void
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined)

interface TutorialProviderProps {
  children: ReactNode
}

export function TutorialProvider({ children }: TutorialProviderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const startTutorial = () => {
    setIsActive(true)
    setCurrentStep(0)
  }

  const completeTutorial = () => {
    setIsActive(false)
    setCurrentStep(0)
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  const value: TutorialContextType = {
    startTutorial,
    currentStep,
    isActive,
    completeTutorial,
    nextStep,
    prevStep,
  }

  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>
}

export function useTutorial(): TutorialContextType {
  const context = useContext(TutorialContext)
  if (context === undefined) {
    throw new Error("useTutorial must be used within a TutorialProvider")
  }
  return context
}
