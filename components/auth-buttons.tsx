"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { SignUpButton, SignInButton } from "@clerk/nextjs"

interface AuthButtonsProps {
  variant?: "header" | "hero" | "card"
  size?: "sm" | "md" | "lg"
}

export function AuthButtons({ variant = "header", size = "md" }: AuthButtonsProps) {
  if (variant === "hero") {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <SignUpButton mode="modal" redirectUrl="/subscribe">
          <Button
            size="lg"
            className="bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white px-12 py-4 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Get Started Now - It's Free!
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </SignUpButton>
        <div className="text-gray-400 text-lg">or</div>
        <Link href="/learning">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-12 py-4 text-xl font-bold transition-all duration-300 transform hover:scale-105 bg-transparent"
          >
            Browse Lessons First
          </Button>
        </Link>
      </div>
    )
  }

  if (variant === "card") {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <SignInButton mode="modal">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-200 bg-transparent"
          >
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton mode="modal" redirectUrl="/subscribe">
          <Button
            size="lg"
            className="bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Sign Up Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </SignUpButton>
      </div>
    )
  }

  // Default header variant
  return (
    <div className="flex gap-3">
      <SignInButton mode="modal">
        <Button
          size={size === "lg" ? "lg" : "default"}
          variant="outline"
          className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white bg-transparent"
        >
          Sign In
        </Button>
      </SignInButton>
      <SignUpButton mode="modal" redirectUrl="/subscribe">
        <Button
          size={size === "lg" ? "lg" : "default"}
          className="bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Get Started
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </SignUpButton>
    </div>
  )
}
