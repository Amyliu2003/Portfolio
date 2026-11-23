import React from "react";
import { cx } from "./cx";

export type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "danger";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

/** Design system B. "Disabled" is the native `disabled` prop on any variant. */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "outline", className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cx("ui-btn", `ui-btn--${variant}`, className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
