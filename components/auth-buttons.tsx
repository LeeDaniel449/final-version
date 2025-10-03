"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ArrowRight, LogIn, User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

interface AuthButtonsProps {
  variant?: "header" | "hero" | "card"
  size?: "sm" | "md" | "lg"
}

export function AuthButtons({ variant = "header", size = "md" }: AuthButtonsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsOpen(false)
      // Handle successful sign in
    }, 2000)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsOpen(false)
      // Handle successful sign up
    }, 2000)
  }

  if (variant === "hero") {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white px-12 py-4 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now - It's Free!
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <AuthModal onSignIn={handleSignIn} onSignUp={handleSignUp} isLoading={isLoading} />
          </DialogContent>
        </Dialog>
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
        {/* Sign Up Free button removed */}
      </div>
    )
  }

  // Default header variant
  return (
    <div className="flex gap-3">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size={size === "lg" ? "lg" : "default"}
            className="bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90 text-white px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <AuthModal onSignIn={handleSignIn} onSignUp={handleSignUp} isLoading={isLoading} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function AuthModal({
  onSignIn,
  onSignUp,
  isLoading,
}: {
  onSignIn: (e: React.FormEvent) => void
  onSignUp: (e: React.FormEvent) => void
  isLoading: boolean
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin" className="flex items-center gap-2">
          <LogIn className="w-4 h-4" />
          Sign In
        </TabsTrigger>
        <TabsTrigger value="signup" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Sign Up
        </TabsTrigger>
      </TabsList>

      <TabsContent value="signin">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>Sign in to your WealthWise account to continue your financial journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="signin-email" type="email" placeholder="Enter your email" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-brand-blue hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <LogIn className="w-4 h-4 ml-2" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="signup">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Join WealthWise!</CardTitle>
            <CardDescription>
              Create your free account and start building better financial habits today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-firstname">First Name</Label>
                  <Input id="signup-firstname" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-lastname">Last Name</Label>
                  <Input id="signup-lastname" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="signup-email" type="email" placeholder="Enter your email" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="text-xs text-gray-600">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-brand-blue hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-brand-blue hover:underline">
                  Privacy Policy
                </Link>
                .
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-blue to-brand-purple hover:from-brand-blue/90 hover:to-brand-purple/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
                {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-600">✓ Free forever ✓ No spam ✓ Cancel anytime</div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
