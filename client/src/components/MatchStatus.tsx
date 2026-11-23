import React from "react";

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
        <button
          type="button"
          onClick={onClear}
          className="uppercase hover:text-[#BA76FF] transition-colors"
        >
          [CLEAR]
        </button>
      </>
    ) : (
      `${count} ${count === 1 ? "MATCH" : "MATCHES"}`
    )}
  </p>
);
