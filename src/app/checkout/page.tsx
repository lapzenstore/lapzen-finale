"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Check, ShoppingBag, AlertCircle, Package, Smartphone, Landmark, ReceiptText, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type PaymentMethod = "jazzcash" | "bank_transfer";

function LocalCheckoutForm({ 
  onSuccess, 
  customerDetails, 
  total 
}: { 
  onSuccess: (method: PaymentMethod, details: any) => void; 
  customerDetails: { name: string; email: string; phone: string; address: string };
  total: number;
}) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("jazzcash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone || !customerDetails.address) {
      setError("Please complete all customer information fields.");
      return;
    }

    if (!transactionId) {
      setError("Please provide the Transaction ID or Reference Number for verification.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSuccess(paymentMethod, { transactionId });
  };

  const paymentInstructions = {
    jazzcash: {
      title: "JazzCash",
      accountName: "Muhammad Asim",
      accountNumber: "0309-0009022",
      instructions: "Transfer the total amount to the JazzCash account below and enter the Transaction ID."
    },
    bank_transfer: {
      title: "Bank Transfer",
      accountName: "M. Asim",
      bankName: "United Bank Limited (UBL)",
      accountNumber: "0360274723326",
      instructions: "Transfer the total amount to our Meezan Bank account and enter the reference number."
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-navy mb-6 flex items-center gap-2">
          <ReceiptText className="w-5 h-5" />
          Select Payment Method
        </h3>
        
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setPaymentMethod("jazzcash")}
            className={cn(
              "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all gap-3",
              paymentMethod === "jazzcash" 
                ? "border-navy bg-navy/5 shadow-sm" 
                : "border-border hover:border-navy/30"
            )}
          >
            <Smartphone className={cn("w-8 h-8", paymentMethod === "jazzcash" ? "text-navy" : "text-muted-foreground")} />
            <span className="font-semibold">JazzCash</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("bank_transfer")}
            className={cn(
              "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all gap-3",
              paymentMethod === "bank_transfer" 
                ? "border-navy bg-navy/5 shadow-sm" 
                : "border-border hover:border-navy/30"
            )}
          >
            <Landmark className={cn("w-8 h-8", paymentMethod === "bank_transfer" ? "text-navy" : "text-muted-foreground")} />
            <span className="font-semibold">Bank Transfer</span>
          </button>
        </div>

        <div className="bg-muted/30 rounded-xl p-5 mb-6 border border-dashed border-navy/20">
          <h4 className="font-bold text-navy mb-3 flex items-center gap-2">
            Payment Instructions ({paymentInstructions[paymentMethod].title})
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            {paymentInstructions[paymentMethod].instructions}
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Name:</span>
              <span className="font-bold text-navy">{paymentInstructions[paymentMethod].accountName}</span>
            </div>
            {paymentMethod === "bank_transfer" && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bank:</span>
                <span className="font-bold text-navy">{(paymentInstructions.bank_transfer as any).bankName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Number:</span>
              <span className="font-bold text-navy tracking-wider">{paymentInstructions[paymentMethod].accountNumber}</span>
            </div>
            <div className="flex justify-between border-t border-navy/10 pt-2 mt-2">
              <span className="text-muted-foreground">Total to Pay:</span>
              <span className="font-bold text-navy">Rs. {total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy">Transaction ID / Reference Number</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
              placeholder="Enter ID from payment receipt"
              required
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
            <p className="text-[10px] text-muted-foreground">
              Our team will verify this ID before shipping your order.
            </p>
          </div>
          
          <Button
            type="submit"
            variant="outline"
            className="w-full border-navy text-navy hover:bg-navy hover:text-white transition-colors flex items-center justify-center gap-2"
            disabled={isProcessing || !transactionId}
          >
            {isProcessing ? (
              <span className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            Verify & Submit Payment ID
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="bg-green-50 rounded-xl p-6 border border-green-100">
            <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Custom Payment Option
            </h4>
            <p className="text-sm text-green-700 mb-4">
              Click the button below to choose a custom payment option other than the two available above. Our team will assist you on WhatsApp.
            </p>
            <a 
              href="https://wa.me/923090009022" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-lg transition-colors w-full sm:w-auto"
            >
              <Smartphone className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-14 text-lg font-semibold bg-navy hover:bg-navy/90"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Check className="w-5 h-5" />
            Submit Order
          </span>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Order will be processed after payment verification
      </p>
    </form>
  );
}

function OrderSummary() {
  const { items, total } = useCart();

  return (
    <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-navy mb-6 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5" />
        Order Summary
      </h3>

      <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-navy text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-navy truncate">{item.name}</p>
              <p className="text-sm text-muted-foreground">Rs. {item.price.toLocaleString()}</p>
            </div>
            <p className="text-sm font-semibold text-navy">
              Rs. {(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">Rs. {total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="font-medium">Rs. 0</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-navy pt-3 border-t border-border">
          <span>Total</span>
          <span>Rs. {total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function SuccessState({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-navy mb-4">Order Submitted!</h2>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. We have received your order and payment reference. Our team will verify the payment and process your shipment shortly.
        </p>
        <Button onClick={onContinue} className="h-12 px-8">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    address: "" 
  });

  const handleLocalSuccess = async (method: PaymentMethod, paymentData: any) => {
    try {
      // Save order to database with payment info inside customer_details
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_details: {
            ...customerDetails,
            payment_method: method,
            transaction_id: paymentData.transactionId
          },
          total_amount: total,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save order");
      }

      setIsSuccess(true);
      clearCart();
    } catch (err) {
      console.error("Error saving order:", err);
      alert("There was an error submitting your order. Please try again.");
    }
  };

  const handleContinue = () => {
    window.location.href = "/";
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-border bg-white sticky top-0 z-50">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group transition-all">
              <div className="bg-white p-1 rounded-lg shadow-sm flex items-center justify-center border border-slate-100">
                <Image
                  src="/logo.png"
                  alt="Lapzen Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold tracking-tighter text-navy">Lapzen</span>
            </Link>
          </div>
        </header>
        <main className="container py-12">
          <SuccessState onContinue={handleContinue} />
        </main>
      </div>
    );
  }

  if (items.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-border bg-white sticky top-0 z-50">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group transition-all">
              <div className="bg-white p-1 rounded-lg shadow-sm flex items-center justify-center border border-slate-100">
                <Image
                  src="/logo.png"
                  alt="Lapzen Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold tracking-tighter text-navy">Lapzen</span>
            </Link>
          </div>
        </header>
        <main className="container py-12">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-navy mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some items to proceed to checkout</p>
              <Link href="/">
                <Button className="h-12 px-8">Browse Products</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group transition-all">
            <div className="bg-white p-1 rounded-lg shadow-sm flex items-center justify-center border border-slate-100">
              <Image
                src="/logo.png"
                alt="Lapzen Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tighter text-navy">Lapzen</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            Secure Checkout
          </div>
        </div>
      </header>

      <main className="container py-8 lg:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-navy transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Store
        </Link>

        <h1 className="text-3xl font-bold text-navy mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-[1fr,400px] gap-8 lg:gap-12">
          <div className="space-y-8">
            <div className="bg-white border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Customer Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
                    placeholder="John Doe"
                    required
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
                    placeholder="john@example.com"
                    required
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
                    placeholder="0300-1234567"
                    required
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Shipping Address</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
                    placeholder="Street, City, Province"
                    required
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <LocalCheckoutForm 
              onSuccess={handleLocalSuccess} 
              customerDetails={customerDetails}
              total={total}
            />
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
      </main>
    </div>
  );
}

