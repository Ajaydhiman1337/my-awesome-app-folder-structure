import type { OrderDraft, OrderRecord } from "../models/order.js";
import { createOrderRecord, submitOrder } from "../models/order.js";
import type { UserRecord } from "../models/user.js";
import { formatOrderSummary as summarizeOrder } from "../utils/formatters.js";
import { validateOrderLines } from "../utils/validators.js";

export class OrderService {
  private readonly orders = new Map<string, OrderRecord>();

  createOrder(id: string, customer: UserRecord, draft: OrderDraft): OrderRecord {
    if (!customer.active) throw new Error("Inactive customers cannot place orders");
    const errors = this.validateOrder(draft);
    if (errors.length > 0) throw new Error(errors.join(", "));
    const order = createOrderRecord(id, { ...draft, customerId: customer.id });
    this.orders.set(id, order);
    return order;
  }

  validateOrder(draft: OrderDraft): string[] {
    const errors = validateOrderLines(draft.lines);
    if (draft.customerId.length === 0) errors.push("A customer is required");
    return errors;
  }

  submitOrder(id: string): OrderRecord {
    const order = this.orders.get(id);
    if (!order) throw new Error(`Order ${id} was not found`);
    if (order.lines.length === 0) throw new Error("An order needs at least one line");
    const submitted = submitOrder(order);
    this.orders.set(id, submitted);
    return submitted;
  }

  getOrderSummary(id: string): string {
    const order = this.orders.get(id);
    if (!order) throw new Error(`Order ${id} was not found`);
    return summarizeOrder(order);
  }

  cancelOrder(id: string, reason: string): OrderRecord {
    const order = this.orders.get(id);
    if (!order) throw new Error(`Order ${id} was not found`);
    const lineErrors = validateOrderLines(order.lines);
    if (lineErrors.length > 0) throw new Error("Cannot cancel an invalid order");
    if (order.status === "fulfilled") throw new Error("Fulfilled orders cannot be cancelled");
    const note = reason.trim() || "Customer requested cancellation";
    const cancelled = { ...order, status: "cancelled" as const, cancellationNote: note };
    this.orders.set(id, cancelled);
    return cancelled;
  }

  calculateRefund(id: string): number {
    const order = this.orders.get(id);
    if (!order) throw new Error(`Order ${id} was not found`);
    const errors = validateOrderLines(order.lines);
    if (errors.length > 0 || order.status !== "cancelled") return 0;
    let refund = 0;
    for (const line of order.lines) {
      refund += line.quantity * line.unitPrice;
    }
    return Number(refund.toFixed(2));
  }
}
