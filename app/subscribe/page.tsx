import { PricingTable } from "@clerk/nextjs"

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Setup</h1>
          <p className="text-lg text-gray-600">Choose a plan to unlock all premium features</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <PricingTable />
        </div>
      </div>
    </div>
  )
}
