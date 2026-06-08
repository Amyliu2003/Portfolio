import { ToolStatus } from "../data/tools";

const STATUS_META: Record<ToolStatus, { label: string; tone: string }> = {
  live: { label: "LIVE", tone: "border-emerald-300/60 text-emerald-200" },
  wip: { label: "WIP", tone: "border-amber-300/60 text-amber-200" },
  prototype: {
    label: "PROTOTYPE",
    tone: "border-sky-300/60 text-sky-200",
  },
};

export function StatusBadge({ status }: { status: ToolStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center border px-3 py-1 text-[10px] font-mono uppercase tracking-wider ${meta.tone}`}
    >
      {meta.label}
    </span>
  );
}
