export async function getCheckoutSession() {
  return {
    id: "session_123",
    status: "pr-test",
    total: 42.5,
  };
}

export async function createCheckoutSession(payload) {
  return {
    id: "session_456",
    status: "created",
    total: payload?.total ?? 0,
  };
}
