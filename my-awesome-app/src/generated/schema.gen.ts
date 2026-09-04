export type CheckoutSession = {
  id: string;
  status: "pending" | "created" | "completed";
  total: number;
};

export type CreateCheckoutSessionInput = {
  total: number;
  currency?: string;
};
