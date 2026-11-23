import React, { useId, useState } from "react";
import { cx } from "./cx";
import { Field } from "./Field";

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: React.ReactNode;
  /** Show the current value after the label, e.g. "Intensity — 40". */
  showValue?: boolean;
  onValueChange?: (value: number) => void;
  fieldClassName?: string;
}

/**
 * Design system D — native range input, so arrow keys, Home/End and PageUp/PageDown work.
 * Round thumb; the filled part of the track follows --ui-slider-pct.
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    { value, defaultValue = 0, min = 0, max = 100, step = 1, label, showValue = true, onValueChange, fieldClassName, className, id, style, ...props },
    ref,
  ) => {
    const autoId = useId();
    const sliderId = id ?? autoId;
    const [inner, setInner] = useState(defaultValue);
    const current = value ?? inner;
    const pct = max > min ? ((current - min) / (max - min)) * 100 : 0;

    return (
      <Field
        id={sliderId}
        label={label && (showValue ? <>{label} — {current}</> : label)}
        className={fieldClassName}
      >
        <input
          ref={ref}
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={current}
          className={cx("ui-slider", className)}
          style={{ ...style, ["--ui-slider-pct" as string]: `${pct}%` }}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (value === undefined) setInner(next);
            onValueChange?.(next);
          }}
          {...props}
        />
      </Field>
    );
  },
);
Slider.displayName = "Slider";
