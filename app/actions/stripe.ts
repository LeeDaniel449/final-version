"use server"

import { stripe } from "@/lib/stripe"
import { PRODUCTS } from "@/lib/products"
import { currentUser } from "@clerk/nextjs/server"

export async function startCheckoutSession(productId: string) {
  const user = await currentUser()

  if (!user) {
    throw new Error("User must be signed in to start checkout")
  }

  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  // Create Checkout Sessions for subscription
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
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    mode: "subscription",
    metadata: {
      userId: user.id,
      userEmail: user.emailAddresses[0]?.emailAddress || "",
    },
  })

  return session.client_secret
}
