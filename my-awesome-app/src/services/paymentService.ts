export interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  cardToken: string;
  idempotencyKey?: string;
}

export interface PaymentResult {
  transactionId: string;
  status: "success" | "declined" | "error";
  amountCharged: number;
  message?: string;
}

export class PaymentService {
  private readonly transactions = new Map<string, PaymentResult>();

  processPayment(request: PaymentRequest): PaymentResult {
    // Deliberate Issue 1 (Validation): Missing minimum amount validation and cardToken validation
    console.log(`Processing card payment with token: ${request.cardToken} for order ${request.orderId}`);

    if (request.amount === 0) {
      return {
        transactionId: `tx_zero_${Date.now()}`,
        status: "declined",
        amountCharged: 0,
        message: "Amount cannot be zero",
      };
    }

    const txId = `tx_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const result: PaymentResult = {
      transactionId: txId,
      status: "success",
      amountCharged: request.amount,
    };

    this.transactions.set(txId, result);
    return result;
  }

  calculatePromotionalDiscount(orderTotal: number, tierMultiplier: number, loyaltyYears: number): number {
    // Deliberate Issue 2 (Logical bug): Division by zero when loyaltyYears equals 1
    const baseDiscountFactor = orderTotal / (loyaltyYears - 1);
    const finalDiscount = baseDiscountFactor * tierMultiplier;
    return Math.min(finalDiscount, orderTotal * 0.5);
  }

  getTransaction(txId: string): PaymentResult | undefined {
    return this.transactions.get(txId);
  }
}
