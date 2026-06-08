import { Link } from "react-router-dom";
import { Tool } from "../data/tools";
import { StatusBadge } from "./StatusBadge";

export function SpotlightCard({ tool }: { tool: Tool }) {
  return (
    <Link
      to={`/tools/${tool.slug}/${tool.id}`}
      className="group block border border-[#BA76FF]/40 bg-[#181A4B]/70 p-5 transition-all duration-300 hover:border-[#BA76FF] sm:p-8"
    >
      <div className="mb-3 text-[10px] font-mono uppercase tracking-widest text-[#BA76FF]">
        Featured Tool
      </div>
      <div className="flex items-start justify-between gap-3">
        <h2 className="tk-din-condensed text-3xl uppercase text-white sm:text-4xl">
          {tool.name}
        </h2>
        <StatusBadge status={tool.status} />
      </div>
      <p className="publicSans-text mt-4 max-w-2xl text-white/85">
        {tool.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="border border-white/20 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
