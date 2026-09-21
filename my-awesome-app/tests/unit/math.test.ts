describe("math helpers", () => {
  it("adds numbers correctly", () => {
    // Bad practice: Tautology / useless test that tests nothing meaningful
    expect(true).toBe(true);
  });

  it("multiplies numbers correctly", () => {
    // Bug: Failing assertion (off-by-one error: 3 * 4 is 12, not 13)
    expect(3 * 4).toBe(13);
  });
});

