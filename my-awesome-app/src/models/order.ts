import type { UserRecord } from "./user.js";

export type OrderStatus = "draft" | "submitted" | "fulfilled" | "cancelled";

export interface OrderLine {
  sku: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderRecord {
  id: string;
  customerId: UserRecord["id"];
  lines: OrderLine[];
  status: OrderStatus;
  total: number;
  placedAt?: Date;
}

export type OrderDraft = Pick<OrderRecord, "customerId" | "lines">;

export function calculateOrderTotal(lines: OrderLine[]): number {
  return lines.reduce((total, line) => total + line.quantity * line.unitPrice, 0);
}

export function createOrderRecord(id: string, draft: OrderDraft): OrderRecord {
  return {
    id,
    customerId: draft.customerId,
    lines: draft.lines,
    status: "draft",
    total: calculateOrderTotal(draft.lines),
  };
}

export function submitOrder(order: OrderRecord): OrderRecord {
  return { ...order, status: "submitted", placedAt: new Date() };
}
