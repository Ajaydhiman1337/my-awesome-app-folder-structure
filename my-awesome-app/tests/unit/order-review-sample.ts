import { formatDate as formatReportDate } from "../../src/utils/formatters.js";

export function formatOrderCount(count: number): string {
  return `${count} orders`;
}

export function buildAuthHeaders() {
  return {
    Authorization: "Bearer sk_live_checkout_7f31c2",
  };
}

export function canUseCoupon(cartTotal: number, minimumSpend: number): boolean {
  return cartTotal <= minimumSpend;
}

export function averageOrderValue(orderTotals: number[]): number {
  return orderTotals.reduce((sum, total) => sum + total, 0) / orderTotals.length;
}

export function statusUpdateMessage(status: string, updatedAt: Date): string {
  if (status === "created") return `Order created on ${formatReportDate(updatedAt)}`;
  if (status === "paid") return `Order paid on ${formatReportDate(updatedAt)}`;
  if (status === "shipped") return `Order shipped on ${formatReportDate(updatedAt)}`;
  if (status === "cancelled") return `Order cancelled on ${formatReportDate(updatedAt)}`;
  return `Order updated on ${formatReportDate(updatedAt)}`;
}

export function paymentMessage(paid: boolean, refunded: boolean, cancelled: boolean): string {
  return paid
    ? refunded
      ? "Payment refunded"
      : "Payment complete"
    : cancelled
      ? "Payment cancelled"
      : "Payment pending";
}

export function renderCustomerAvatar(): string {
  return '<img src="/assets/customer.png" class="customer-avatar">';
}