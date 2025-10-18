"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, User, Bot, Play, RotateCcw } from "lucide-react"

interface ConversationStep {
  role: "user" | "assistant"
  message: string
  followUpNote?: string
}

const ConversationExamples = () => {
  const [activeExample, setActiveExample] = useState<number | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const examples = [
    {
      title: "First-Time Investor",
      description: "See how AI naturally discovers your situation",
      conversation: [
        {
          role: "user" as const,
          message: "I have $1,000 to invest but I'm totally new to this",
        },
        {
          role: "assistant" as const,
          message:
            "That's awesome that you're getting started! $1,000 is a perfect amount to begin with. Have you thought about when you might need this money back?",
          followUpNote: "AI asks about timeline to understand risk tolerance",
        },
        {
          role: "user" as const,
          message: "Probably not for at least 5 years",
        },
        {
          role: "assistant" as const,
          message:
            "Perfect! That gives us plenty of time for growth. Do you have an emergency fund saved up already, or would this be your first chunk of savings?",
          followUpNote: "AI checks emergency fund before investing advice",
        },
        {
          role: "user" as const,
          message: "I have about $3,000 in my savings account",
        },
        {
          role: "assistant" as const,
          message:
            "Nice! You're already ahead of most people with that safety net. For your $1,000, I'd suggest a simple index fund like VTI - it's like buying a tiny piece of 4,000 companies at once. Are you comfortable with the idea that it might go up and down in the short term?",
          followUpNote: "AI explains simply and checks risk comfort",
        },
        {
          role: "user" as const,
          message: "Yeah, I can handle some ups and downs if it grows over time",
        },
        {
          role: "assistant" as const,
          message:
            "Perfect mindset! You can open a brokerage account with Fidelity or Vanguard - both are free and user-friendly. Want me to walk you through the steps, or do you have questions about index funds first?",
          followUpNote: "AI offers specific next steps and lets user choose direction",
        },
      ],
    },
    {
      title: "Goal-Based Planning",
      description: "Watch AI help clarify and prioritize goals",
      conversation: [
        {
          role: "user" as const,
          message: "I want to buy a house in a few years but also save for retirement",
        },
        {
          role: "assistant" as const,
          message:
            "Great goals! Let's figure out the best approach. When are you hoping to buy the house - 2 years, 5 years, or somewhere in between?",
          followUpNote: "AI gets specific timeline first",
        },
        {
          role: "user" as const,
          message: "Probably in about 3-4 years",
        },
        {
          role: "assistant" as const,
          message:
            "Perfect timeline! For the house, you'll want that money safe and accessible. How much are you thinking for a down payment?",
          followUpNote: "AI focuses on the shorter-term goal first",
        },
        {
          role: "user" as const,
          message: "Maybe $40,000 for a down payment",
        },
        {
          role: "assistant" as const,
          message:
            "That's a solid target! For house money, I'd suggest high-yield savings or CDs since you need it safe. How much can you save per month toward both goals?",
          followUpNote: "AI asks about capacity to create realistic plan",
        },
        {
          role: "user" as const,
          message: "I can probably save around $800 a month total",
        },
        {
          role: "assistant" as const,
          message:
            "Excellent! With $800/month, you could do $500 for the house fund and $300 for retirement. The house money stays safe, retirement money can grow in index funds. Does that split feel right to you?",
          followUpNote: "AI proposes specific allocation and asks for feedback",
        },
      ],
    },
    {
      title: "Risk Assessment",
      description: "See how AI naturally gauges comfort level",
      conversation: [
        {
          role: "user" as const,
          message: "I'm scared of losing money in the stock market",
        },
        {
          role: "assistant" as const,
          message:
            "That's totally normal - most people feel that way at first! Can you tell me what specifically worries you most? Is it seeing your account go down day-to-day, or the fear of a big crash?",
          followUpNote: "AI validates feelings and digs into specific fears",
        },
        {
          role: "user" as const,
          message: "I guess both, but mainly I don't want to lose everything",
        },
        {
          role: "assistant" as const,
          message:
            "I get it! The good news is that diversified investing (like index funds) has never lost money over any 20-year period in history. What's your timeline - are you investing for something specific?",
          followUpNote: "AI provides reassurance with facts, then asks about timeline",
        },
        {
          role: "user" as const,
          message: "Just general long-term wealth building, maybe 15-20 years",
        },
        {
          role: "assistant" as const,
          message:
            "Perfect! With that timeline, you have history on your side. Would you feel more comfortable starting with just 60% stocks and 40% bonds, then getting more aggressive as you see how it works?",
          followUpNote: "AI suggests conservative start based on comfort level",
        },
      ],
    },
  ]

  const startExample = (index: number) => {
    setActiveExample(index)
    setCurrentStep(0)
  }

  const nextStep = () => {
    if (activeExample !== null && currentStep < examples[activeExample].conversation.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const resetExample = () => {
    setCurrentStep(0)
  }

  const closeExample = () => {
    setActiveExample(null)
    setCurrentStep(0)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Natural Conversation Flow</h2>
        <p className="text-gray-600">See how the AI asks follow-up questions that actually make sense</p>
      </div>

      {activeExample === null ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-brand-blue" />
                  {example.title}
                </CardTitle>
                <p className="text-sm text-gray-600">{example.description}</p>
              </CardHeader>
              <CardContent>
                <Button onClick={() => startExample(index)} className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Conversation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-brand-blue" />
                  {examples[activeExample].title}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">{examples[activeExample].description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  Step {currentStep + 1} of {examples[activeExample].conversation.length}
                </Badge>
                <Button variant="outline" size="sm" onClick={closeExample}>
                  ✕
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-4">
              {examples[activeExample].conversation.slice(0, currentStep + 1).map((step, index) => (
                <div key={index} className="space-y-3">
                  <div className={`flex gap-3 ${step.role === "user" ? "justify-end" : "justify-start"}`}>
                    {step.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-brand-blue" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        step.role === "user" ? "bg-brand-blue text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="text-sm">{step.message}</div>
                    </div>

                    {step.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>

                  {step.followUpNote && index === currentStep && (
                    <div className="ml-11 mr-11">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <MessageCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-xs font-medium text-blue-800 mb-1">Why this follow-up works:</div>
                            <div className="text-xs text-blue-700">{step.followUpNote}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <Button variant="outline" onClick={resetExample} disabled={currentStep === 0}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
              </Button>

              <div className="flex items-center gap-2">
                {currentStep < examples[activeExample].conversation.length - 1 ? (
                  <Button onClick={nextStep}>
                    Next Step
                    <Play className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <div className="text-sm text-green-600 font-medium">✓ Conversation Complete</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-lg text-green-800">What Makes These Follow-ups Natural?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong>Builds on what you said:</strong> Each question connects to your previous answer
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong>Shows genuine interest:</strong> Questions feel like the AI actually cares about helping you
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong>Moves toward solutions:</strong> Each question gets closer to actionable advice
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong>Feels conversational:</strong> Like talking to a knowledgeable friend, not a robot
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ConversationExamples
