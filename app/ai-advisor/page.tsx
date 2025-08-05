import AIAdvisor from "@/components/ai-advisor"

export default function AIAdvisorPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Financial Advisor</h1>
          <p className="text-lg text-gray-600">Get personalized financial advice powered by GPT-4</p>
          <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            GPT-4 Powered
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <AIAdvisor />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">What I Can Help With</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-500">💰</span>
                  <div>
                    <h4 className="font-medium">Budget Analysis</h4>
                    <p className="text-sm text-gray-600">Review your income, expenses, and savings rate</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500">📈</span>
                  <div>
                    <h4 className="font-medium">Investment Advice</h4>
                    <p className="text-sm text-gray-600">
                      Personalized portfolio recommendations based on your age and risk tolerance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-500">🎯</span>
                  <div>
                    <h4 className="font-medium">Goal Planning</h4>
                    <p className="text-sm text-gray-600">Strategies to reach your financial goals faster</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500">💳</span>
                  <div>
                    <h4 className="font-medium">Debt Management</h4>
                    <p className="text-sm text-gray-600">Optimal strategies for paying off debt</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">Quick Starters</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-white rounded border hover:bg-gray-50 text-sm">
                  "Analyze my budget and spending"
                </button>
                <button className="w-full text-left p-3 bg-white rounded border hover:bg-gray-50 text-sm">
                  "How should I invest my savings?"
                </button>
                <button className="w-full text-left p-3 bg-white rounded border hover:bg-gray-50 text-sm">
                  "Review my financial goals"
                </button>
                <button className="w-full text-left p-3 bg-white rounded border hover:bg-gray-50 text-sm">
                  "What's my emergency fund status?"
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
              <div className="flex items-start gap-3">
                <span className="text-yellow-600">⚠️</span>
                <div>
                  <h4 className="font-medium text-yellow-900">Disclaimer</h4>
                  <p className="text-sm text-yellow-800">
                    This AI provides educational information only. Always consult with a qualified financial advisor for
                    personalized advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
