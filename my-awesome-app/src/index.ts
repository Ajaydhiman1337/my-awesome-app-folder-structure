import { createApp, describeApp } from "./app.js";
import appSettings, { getSetting as readSetting } from "./config/settings.js";
import { createOrderRecord } from "./models/order.js";
import type { UserDraft } from "./models/user.js";
import { OrderService } from "./services/orderService.js";
import { UserService } from "./services/userService.js";

const app = createApp({ appName: readSetting("appName", appSettings.appName) });
const userService = new UserService();
const orderService = new OrderService();

export function bootstrapDemoAccount(draft: UserDraft): string {
  const user = userService.createUser("user-1001", draft);
  const order = orderService.createOrder("order-1001", user, {
    customerId: user.id,
    lines: [
      { sku: "starter-plan", quantity: 1, unitPrice: 49 },
      { sku: "support-addon", quantity: 1, unitPrice: 12 },
    ],
  });
  orderService.submitOrder(order.id);
  return `${describeApp(app)} ${userService.getUserSummary(user.id)} ${orderService.getOrderSummary(order.id)}`;
}

export function getOrderPreview(customerId: string): string {
  const preview = createOrderRecord("preview", {
    customerId,
    lines: [{ sku: "starter-plan", quantity: 1, unitPrice: 49 }],
  });
  return `${preview.status}: ${preview.total}`;
}

export { app, orderService, userService };

export function createUserServiceForWorker(): UserService {
  return new UserService();
}

