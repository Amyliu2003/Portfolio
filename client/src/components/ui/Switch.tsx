import React, { useState } from "react";
import { cx } from "./cx";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "role"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Visible label; the whole row is the click/keyboard target. */
  children?: React.ReactNode;
}

/** Design system D — role="switch" button (Space/Enter toggle), pill track, round thumb. */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked = false, onCheckedChange, className, children, onClick, ...props }, ref) => {
    const [inner, setInner] = useState(defaultChecked);
    const on = checked ?? inner;
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={on}
        className={cx("ui-switch", className)}
        onClick={(e) => {
          const next = !on;
          if (checked === undefined) setInner(next);
          onCheckedChange?.(next);
          onClick?.(e);
        }}
        {...props}
      >
        <span className="ui-switch__track" aria-hidden="true">
          <span className="ui-switch__thumb" />
        </span>
        {children && <span>{children}</span>}
      </button>
    );
  },
);
Switch.displayName = "Switch";
