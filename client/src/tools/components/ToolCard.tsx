import { Link } from "react-router-dom";
import { Tool } from "../data/tools";
import { StatusBadge } from "./StatusBadge";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      to={`/tools/${tool.slug}/${tool.id}`}
      className="group block border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="tk-din-condensed text-2xl uppercase leading-none text-white sm:text-3xl">
          {tool.name}
        </h3>
        <StatusBadge status={tool.status} />
      </div>

      <p className="publicSans-text mt-3 line-clamp-3 text-sm leading-relaxed text-white/80 sm:mt-4">
        {tool.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="border border-white/20 px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-white/80"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
