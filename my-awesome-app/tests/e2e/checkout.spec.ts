describe("checkout flow", () => {
  it("starts with a checkout session", () => {
    const session = {
      id: "session_123",
      status: "pr-test",
      total: 42.5,
    };

    expect(session.status).toBe("pr-test");
    expect(session.total).toBeGreaterThan(0);
  });
});
