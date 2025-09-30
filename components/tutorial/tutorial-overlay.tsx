"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useTutorial } from "./tutorial-provider"

export function TutorialOverlay() {
  const { isActive, currentStep, steps, nextStep, prevStep, endTutorial } = useTutorial()
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (isActive && steps[currentStep]) {
      const element = document.querySelector(steps[currentStep].target) as HTMLElement
      setTargetElement(element)
    }
  }, [isActive, currentStep, steps])

  if (!isActive || !steps[currentStep]) return null

  const step = steps[currentStep]

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />

      {/* Tutorial Card */}
      <div className="fixed z-50 max-w-sm">
        <Card className="border-2 border-blue-500 shadow-xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{step.title}</CardTitle>
              <Button variant="ghost" size="sm" onClick={endTutorial}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">{step.content}</p>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={prevStep} disabled={currentStep === 0}>
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button variant="default" size="sm" onClick={nextStep}>
                  {currentStep === steps.length - 1 ? "Finish" : "Next"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <span className="text-xs text-gray-500">
                {currentStep + 1} of {steps.length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
