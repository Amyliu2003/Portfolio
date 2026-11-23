import React from "react";
import { cx } from "./cx";

interface FieldProps {
  id: string;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/** Label + control + hint/error wrapper shared by Input, Textarea and Slider. */
export const Field: React.FC<FieldProps> = ({ id, label, hint, error, className, children }) => (
  <div className={cx("ui-field", className)}>
    {label && (
      <label className="ui-field__label" htmlFor={id}>
        {label}
      </label>
    )}
    {children}
    {error ? (
      <p className="ui-field__hint ui-field__hint--error" id={`${id}-msg`}>
        {error}
      </p>
    ) : hint ? (
      <p className="ui-field__hint" id={`${id}-msg`}>
        {hint}
      </p>
    ) : null}
  </div>
);

export const describedBy = (id: string, hint?: React.ReactNode, error?: React.ReactNode) =>
  hint || error ? `${id}-msg` : undefined;
