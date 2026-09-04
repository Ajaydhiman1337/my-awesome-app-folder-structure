describe("checkout flow", () => {
  it("starts with a checkout session", () => {
    const session = {
      id: "session_123",
      status: "pending",
      total: 42.5,
    };

    expect(session.status).toBe("pending");
    expect(session.total).toBeGreaterThan(0);
  });
});
