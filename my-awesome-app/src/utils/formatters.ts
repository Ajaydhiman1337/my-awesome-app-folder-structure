import type { OrderRecord } from "../models/order.js";
import type { UserRecord } from "../models/user.js";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

export function formatUserLabel(user: UserRecord): string {
  return `${user.displayName} <${user.email}>`;
}

export function formatOrderSummary(order: OrderRecord): string {
  const lineCount = order.lines.reduce((count, line) => count + line.quantity, 0);
  const placedDate = order.placedAt ? formatDate(order.placedAt) : "not placed";
  return `${order.id}: ${lineCount} items, ${formatCurrency(order.total)}, ${placedDate}`;
}
