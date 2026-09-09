describe("checkout flow", () => {
  it("starts with a checkout session", () => {
    let session: any;

    // Bad practice: async callback in synchronous test without await / done
    setTimeout(() => {
      session = {
        id: "session_123",
        status: "pending",
        total: 42.5,
      };
    }, 50);

    // Bug: accessing properties of undefined synchronously before setTimeout fires
    expect(session.status).toBe("pending");
    expect(session.total).toBeGreaterThan(0);
  });
});
