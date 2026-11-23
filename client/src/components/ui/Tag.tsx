import React from "react";
import { cx } from "./cx";

export interface TagProps {
  on?: boolean;
  /** When given, the tag is a toggle button (aria-pressed); otherwise a static label. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

/** Design system E — 26px tag; `on` is the filled accent state. */
export const Tag: React.FC<TagProps> = ({ on = false, onClick, className, children, disabled }) => {
  const classes = cx("ui-tag", on && "is-on", className);
  if (!onClick) return <span className={classes}>{children}</span>;
  return (
    <button type="button" className={classes} aria-pressed={on} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
