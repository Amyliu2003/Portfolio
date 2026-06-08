import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SpotlightCard } from "../components/SpotlightCard";
import { TagFilter } from "../components/TagFilter";
import { ToolCard } from "../components/ToolCard";
import { featuredTool, tools } from "../data/tools";

const ALL_TAG = "ALL";

export function ToolsIndexPage() {
  const [activeTag, setActiveTag] = useState(ALL_TAG);

  const tags = useMemo(() => {
    const unique = new Set<string>();
    tools.forEach((tool) => tool.tags.forEach((tag) => unique.add(tag)));
    return [ALL_TAG, ...Array.from(unique)];
  }, []);

  const gridTools = useMemo(() => {
    const base = tools.filter((tool) => tool.id !== featuredTool?.id);
    if (activeTag === ALL_TAG) return base;
    return base.filter((tool) => tool.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <div
      className="min-h-screen min-h-dvh w-full px-4 py-6 sm:px-6 md:px-8 md:py-8 selection:bg-[#BA76FF] selection:text-white"
      style={{
        backgroundColor: "#181A4B",
        background:
          "linear-gradient(180deg, rgba(186, 118, 255, 0.30) 0%, rgba(186, 118, 255, 0.00) 20%), linear-gradient(180deg, #D5DCD9 0%, #83C1E6 20%, #1D5DE5 40%, #172FAB 56%, #181A4B 80%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <header className="mb-6 flex flex-col gap-4 border-b border-white/20 pb-5 sm:mb-8 sm:flex-row sm:items-start sm:justify-between sm:pb-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-white/70">
            Library
          </p>
          <h1 className="tk-din-condensed text-4xl uppercase leading-none text-white sm:text-5xl">
            Tools
          </h1>
        </div>
        <Link
          to="/"
          className="w-fit font-mono text-xs uppercase tracking-wider text-white hover:text-[#BA76FF]"
        >
          Back to Portfolio
        </Link>
      </header>

      {featuredTool && (
        <section className="mb-8">
          <SpotlightCard tool={featuredTool} />
        </section>
      )}

      <section className="mb-8">
        <TagFilter tags={tags} activeTag={activeTag} onSelect={setActiveTag} />
      </section>

      <section className="grid grid-cols-1 gap-4 pb-16 sm:gap-5 md:grid-cols-2 md:gap-6 md:pb-20 lg:grid-cols-3">
        {gridTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </section>
    </div>
  );
}
