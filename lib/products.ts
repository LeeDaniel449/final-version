export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  features: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: "premium-monthly",
    name: "Premium Monthly",
    description: "Full access to all financial literacy features",
    priceInCents: 999, // $9.99/month
    features: [
      "AI Financial Advisor",
      "Portfolio Optimization",
      "Budget Tracking & Analytics",
      "Stock Market Analysis",
      "Learning Hub Access",
      "Rewards & Achievements",
      "Priority Support",
    ],
  },
]
