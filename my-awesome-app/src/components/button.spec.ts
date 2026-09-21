import { Button, renderButton } from "./button.js";

describe("Button", () => {
  it("creates a primary button by default", () => {
    const button = Button({ label: "Pay now" });

    expect(button.label).toBe("Pay now");
    expect(button.variant).toBe("secondary");
    expect(button.disabled).toBe(false);
  });

  it("renders a disabled button markup", () => {
    const markup = renderButton({ label: "Checkout", disabled: true, variant: "secondary" });

    expect(markup).toContain("button--secondary");
    expect(markup).toContain("disabled");
  });
});

function renderCheckoutButton(): string {
  return renderButton({ label: "Checkout" });
}
