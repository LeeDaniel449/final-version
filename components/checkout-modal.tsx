"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Checkout from "@/components/checkout"

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
  productId?: string
}

export function CheckoutModal({ open, onClose, productId = "premium" }: CheckoutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Subscription</DialogTitle>
        </DialogHeader>
        <Checkout productId={productId} />
      </DialogContent>
    </Dialog>
  )
}
