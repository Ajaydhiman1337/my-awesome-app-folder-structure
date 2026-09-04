export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
};

export function Button(props: ButtonProps) {
  return {
    label: props.label,
    variant: props.variant ?? "primary",
    disabled: Boolean(props.disabled),
    className: `button button--${props.variant ?? "primary"}`,
  };
}

export function renderButton(props: ButtonProps): string {
  const button = Button(props);
  const disabledAttr = button.disabled ? " disabled" : "";
  return `<button class="${button.className}"${disabledAttr}>${button.label}</button>`;
}

export default Button;

