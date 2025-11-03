"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogIn, Eye, EyeOff, ArrowLeft, DollarSign } from "lucide-react"
import { userDataManager } from "@/lib/user-data"

export default function SignInPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      if (userDataManager.isUserSignedUp()) {
        console.log("[v0] User already signed in, redirecting to home")
        router.push("/")
        return
      }
    }

    checkAuth()
    const timeoutId = setTimeout(checkAuth, 200)

    return () => clearTimeout(timeoutId)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (!emailOrUsername || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      console.log("[v0] Attempting to authenticate:", emailOrUsername)

      if (userDataManager.isUserSignedUp()) {
        console.log("[v0] User already signed in, redirecting to home")
        router.push("/")
        return
      }

      const registeredUsers = JSON.parse(localStorage.getItem("wealthwise_registered_users") || "{}")
      console.log("[v0] Debug - Available users:", Object.keys(registeredUsers))
      Object.entries(registeredUsers).forEach(([key, user]: [string, any]) => {
        console.log(
          `[v0] User ${key}: email=${user.profile?.email}, username=${user.profile?.username}, password=${user.password}`,
        )
      })

      // Try to authenticate the user
      const authResult = await userDataManager.authenticateUser(emailOrUsername, password)

      console.log("[v0] Authentication result:", authResult)

      if (authResult && authResult.success) {
        console.log("[v0] Authentication successful, redirecting to home")

        // Set remember me preference
        if (rememberMe) {
          userDataManager.setRememberMe(true)
        }

        // Force multiple updates to ensure sidebar catches the change
        const dispatchEvents = () => {
          window.dispatchEvent(new CustomEvent("userSignedIn"))
          window.dispatchEvent(new CustomEvent("userDataUpdated"))
        }

        // Dispatch events multiple times with delays
        dispatchEvents()
        setTimeout(dispatchEvents, 100)
        setTimeout(dispatchEvents, 300)

        console.log("[v0] Sign in successful, redirecting to home")
        router.push("/")
        return
      } else {
        const errorMessage = authResult?.message || "Invalid email or password"
        console.log("[v0] Authentication failed:", errorMessage)
        setError(errorMessage)
      }
    } catch (err) {
      console.error("[v0] Sign in error:", err)
      setError("Sign in failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">WealthWise</h1>
          </div>
          <p className="text-gray-600">Welcome back to your financial journey</p>
        </div>

        {/* Sign In Form */}
        <Card className="border-blue-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-blue-800">
              <LogIn className="w-5 h-5" />
              Sign In
            </CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="emailOrUsername" className="text-blue-700">
                  Email or Username
                </Label>
                <Input
                  id="emailOrUsername"
                  type="text"
                  placeholder="Enter your email or username"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-blue-300 focus:ring-blue-500 focus:border-blue-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <Link href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
