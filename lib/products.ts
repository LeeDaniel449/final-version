export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  features: string[]
}

// This is the source of truth for all products/subscription plans
export const PRODUCTS: Product[] = [
  {
    id: "basic-plan",
    name: "Basic Plan",
    description: "Perfect for getting started with financial literacy",
    priceInCents: 999, // $9.99/month
    features: ["Access to all learning modules", "Budget tracking tools", "Basic portfolio analysis", "Email support"],
  },
  {
    id: "pro-plan",
    name: "Pro Plan",
    description: "Advanced tools for serious investors",
    priceInCents: 2999, // $29.99/month
    features: [
      "Everything in Basic",
      "AI-powered financial advisor",
      "Advanced portfolio optimization",
      "Real-time stock quotes",
      "Priority support",
      "Custom investment strategies",
    ],
  },
  {
    id: "enterprise-plan",
    name: "Enterprise Plan",
    description: "Complete financial management solution",
    priceInCents: 9999, // $99.99/month
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "White-label options",
      "API access",
      "Advanced analytics & reporting",
    ],
  },
]
