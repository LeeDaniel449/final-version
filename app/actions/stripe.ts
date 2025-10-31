"use server"

import { auth } from "@clerk/nextjs/server"
import { stripe } from "@/lib/stripe"
import { PRODUCTS } from "@/lib/products"

export async function startCheckoutSession(productId: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("User must be signed in to checkout")
  }

  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  console.log("[v0] Creating checkout session for user:", userId)
  console.log("[v0] Product:", product.name, product.priceInCents)

  // Create Checkout Sessions with user metadata
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // Store Clerk user ID in metadata so webhook can update the user
    metadata: {
      clerkUserId: userId,
    },
  })

  console.log("[v0] Checkout session created:", session.id)

  return session.client_secret!
}
