import React, { useId } from "react";
import { cx } from "./cx";
import { Field, describedBy } from "./Field";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  fieldClassName?: string;
}

/** Design system C — text input with optional label, hint and error. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, fieldClassName, className, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <Field id={inputId} label={label} hint={hint} error={error} className={fieldClassName}>
        <input
          ref={ref}
          id={inputId}
          className={cx("ui-input", className)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(inputId, hint, error)}
          {...props}
        />
      </Field>
    );
  },
);
Input.displayName = "Input";
