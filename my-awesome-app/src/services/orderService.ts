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
}
