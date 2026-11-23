import React, { useId } from "react";
import { cx } from "./cx";
import { Field, describedBy } from "./Field";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  fieldClassName?: string;
}

/** Design system C — multi-line input (body font, vertical resize). */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, fieldClassName, className, id, ...props }, ref) => {
    const autoId = useId();
    const textareaId = id ?? autoId;
    return (
      <Field id={textareaId} label={label} hint={hint} error={error} className={fieldClassName}>
        <textarea
          ref={ref}
          id={textareaId}
          className={cx("ui-input", "ui-textarea", className)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(textareaId, hint, error)}
          {...props}
        />
      </Field>
    );
  },
);
Textarea.displayName = "Textarea";
