import React from "react";
import { cx } from "./cx";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Accessible name; defaults to the placeholder or "Search". */
  label?: string;
  /** Called when Escape is pressed, e.g. to clear the query. */
  onClear?: () => void;
  /** md = 54px / 14px (design default), lg = 46px / 16px (matches Button lg and Input) */
  size?: "md" | "lg";
}

/** Design system C — search field with the accent search icon on the right (54px, or 46px with size="lg"). */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ label, onClear, className, size = "md", placeholder = "Search...", onKeyDown, ...props }, ref) => (
    <div className={cx("ui-search", size === "lg" && "ui-search--lg", className)} role="search">
      <input
        ref={ref}
        type="search"
        className="ui-input"
        placeholder={placeholder}
        aria-label={label ?? placeholder}
        onKeyDown={(e) => {
          if (e.key === "Escape" && onClear) onClear();
          onKeyDown?.(e);
        }}
        {...props}
      />
      <svg className="ui-search__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
        <circle cx="9.2" cy="9.2" r="6.7" stroke="currentColor" strokeWidth="2" />
        <path d="M17.5 17.5l-3.6-3.6" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  ),
);
SearchInput.displayName = "SearchInput";
