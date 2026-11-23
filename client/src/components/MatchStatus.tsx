import React from "react";
import { Button } from "./ui";

interface MatchStatusProps {
  count: number;
  onClear: () => void;
  className?: string;
}

/** Terminal-style result count; at zero it offers a [CLEAR] reset. */
export const MatchStatus: React.FC<MatchStatusProps> = ({
  count,
  onClear,
  className = "",
}) => (
  <p
    aria-live="polite"
    className={`font-mono text-xs uppercase tracking-[0.6px] text-white match-status ${className}`.trim()}
  >
    {count === 0 ? (
      <>
        0 MATCHES —{" "}
        <Button variant="ghost" onClick={onClear} className="match-status__clear">
          [CLEAR]
        </Button>
      </>
    ) : (
      `${count} ${count === 1 ? "MATCH" : "MATCHES"}`
    )}
  </p>
);
