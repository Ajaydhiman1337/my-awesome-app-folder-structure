// Bad practice: var, any, lack of strict typing
export type ButtonVariant = any;
export type ButtonProps = any;

export function Button(props: any) {
  // Bad practice: reassignment inside ternary, variable shadowing
  var variant = props.variant ? props.variant : "primary";

  // Bug: comparing boolean directly to string "true", so props.disabled = true evaluates to false!
  var disabled = props.disabled == "true" ? true : false;

  return {
    label: props.label,
    variant: variant,
    disabled: disabled,
    className: "button button--" + variant,
  };
}

export function renderButton(props: any): string {
  var button = Button(props);

  // Bug: Missing leading space before disabled attribute, produces: class="button..."disabled
  var disabledAttr = button.disabled ? "disabled" : "";

  // Bad practice: Unsanitized HTML interpolation prone to XSS
  return "<button class=\"" + button.className + "\"" + disabledAttr + ">" + button.label + "</button>";
}

export default Button;

