"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, DollarSign, Info, CheckCircle } from "lucide-react"

interface InvestmentConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  investment: {
    symbol: string
    name: string
    price: number
    recommendation: string
    riskLevel: string
    expenseRatio: number
  }
}

export function InvestmentConfirmationModal({ isOpen, onClose, investment }: InvestmentConfirmationModalProps) {
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState(1)
  const [hasReadEducation, setHasReadEducation] = useState(false)

  const shares = amount ? (Number.parseFloat(amount) / investment.price).toFixed(4) : "0"
  const totalCost = amount ? Number.parseFloat(amount) : 0

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleConfirm = () => {
    // Simulate investment
    setStep(4)
    setTimeout(() => {
      onClose()
      setStep(1)
      setAmount("")
      setHasReadEducation(false)
    }, 2000)
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "text-green-600 bg-green-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "high":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Investment Details
              </DialogTitle>
              <DialogDescription>Review the investment details before proceeding</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{investment.name}</h3>
                    <p className="text-gray-600">{investment.symbol}</p>
                  </div>
                  <Badge className={getRiskColor(investment.riskLevel)}>{investment.riskLevel} Risk</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <span className="text-sm text-gray-600">Current Price</span>
                    <div className="font-semibold">${investment.price.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Expense Ratio</span>
                    <div className="font-semibold">{investment.expenseRatio}%</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount">Investment Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount to invest"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                  />
                </div>

                {amount && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Investment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Shares to purchase:</span>
                        <span className="font-medium">{shares}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total cost:</span>
                        <span className="font-medium">${totalCost.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleNext} disabled={!amount || Number.parseFloat(amount) <= 0} className="flex-1">
                  Continue
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Educational Information
              </DialogTitle>
              <DialogDescription>Please read this important information about your investment</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Investment Risks</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      All investments carry risk. The value of your investment may go down as well as up, and you may
                      get back less than you invested.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">About {investment.name}</h4>
                <p className="text-sm text-gray-600">
                  This ETF provides broad market exposure and is suitable for long-term investors. It tracks a
                  diversified index of stocks, offering instant diversification across hundreds or thousands of
                  companies.
                </p>

                <h4 className="font-medium">Key Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Low expense ratio of {investment.expenseRatio}%</li>
                  <li>• Broad market diversification</li>
                  <li>• Suitable for long-term growth</li>
                  <li>• High liquidity and transparency</li>
                </ul>

                <h4 className="font-medium">Investment Strategy</h4>
                <p className="text-sm text-gray-600">
                  This investment aligns with a buy-and-hold strategy. Consider dollar-cost averaging by investing
                  regularly over time to reduce the impact of market volatility.
                </p>
              </div>

              <div className="flex items-center space-x-2 pt-4">
                <input
                  type="checkbox"
                  id="readEducation"
                  checked={hasReadEducation}
                  onChange={(e) => setHasReadEducation(e.target.checked)}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="readEducation" className="text-sm">
                  I have read and understood the investment information
                </Label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleNext} disabled={!hasReadEducation} className="flex-1">
                Continue to Confirmation
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Final Confirmation
              </DialogTitle>
              <DialogDescription>Please confirm your investment details</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-800 mb-3">Investment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Investment:</span>
                    <span className="font-medium">{investment.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium">${totalCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shares:</span>
                    <span className="font-medium">{shares}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per share:</span>
                    <span className="font-medium">${investment.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Safety Confirmation</span>
                </div>
                <p className="text-sm text-blue-700">
                  This investment has been reviewed and aligns with your risk profile and financial goals.
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleConfirm} className="flex-1 bg-green-600 hover:bg-green-700">
                  Confirm Investment
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Investment Successful!</h3>
            <p className="text-gray-600">
              Your investment of ${totalCost.toFixed(2)} in {investment.name} has been processed.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
