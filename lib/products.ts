export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  images?: string[]
}

// Premium subscription product
export const PRODUCTS: Product[] = [
  {
    id: "premium-monthly",
    name: "Premium Monthly",
    description: "Full access to all features",
    priceInCents: 999, // $9.99/month
  },
]
