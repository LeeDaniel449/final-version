import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your financial journey</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl",
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          forceRedirectUrl="/budget"
          fallbackRedirectUrl="/budget"
        />
      </div>
    </div>
  )
}
