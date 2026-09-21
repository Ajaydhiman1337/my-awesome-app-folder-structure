export type CheckoutSession = {
  id: string;
  status: "pending" | "created" | "completed" | "pr-test";
  total: number;
};

export type CreateCheckoutSessionInput = {
  total: number;
  currency?: string;
};
