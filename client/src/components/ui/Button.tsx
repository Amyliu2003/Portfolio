import React from "react";
import { cx } from "./cx";

export type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "danger";
export type ButtonSize = "md" | "lg";

interface ButtonStyleProps {
  variant?: ButtonVariant;
  /** md = 38px (design default), lg = 46px (matches Input height) */
  size?: ButtonSize;
  /** Square icon-only button; pass an aria-label. */
  icon?: boolean;
}

const buttonClasses = (
  { variant = "outline", size = "md", icon = false }: ButtonStyleProps,
  className?: string,
) =>
  cx(
    "ui-btn",
    `ui-btn--${variant}`,
    size === "lg" && "ui-btn--lg",
    icon && "ui-btn--icon",
    className,
  );

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyleProps {}

/** Design system B. "Disabled" is the native `disabled` prop on any variant. */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, icon, className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={buttonClasses({ variant, size, icon }, className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    ButtonStyleProps {}

/** Same look as Button, rendered as <a> so links keep open-in-new-tab, copy URL, etc. */
export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant, size, icon, className, ...props }, ref) => (
    <a ref={ref} className={buttonClasses({ variant, size, icon }, className)} {...props} />
  ),
);
ButtonLink.displayName = "ButtonLink";
