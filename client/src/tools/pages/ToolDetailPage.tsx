import { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { toolBySlugAndId } from "../data/tools";

const toolLoaders = {
  "course-tiermaker": () => import("../runtime/course-tiermaker"),
  "chess-pgn-converter": () => import("../runtime/chess-pgn-converter"),
  "escape-room-chess": () => import("../runtime/escape-room-chess"),
} as const;

function getToolComponent(slug: string) {
  const loader = toolLoaders[slug as keyof typeof toolLoaders];
  return loader ? lazy(loader) : null;
}

export function ToolDetailPage() {
  const params = useParams();
  const slug = params.name ?? "";
  const id = params.id ?? "";
  const tool = toolBySlugAndId(slug, id);

  if (!tool) {
    return (
      <div className="min-h-screen min-h-dvh bg-[#181A4B] px-4 py-8 text-white sm:px-6 md:px-8 md:py-10">
        <Link to="/tools" className="font-mono text-xs uppercase hover:text-[#BA76FF]">
          Back to Tools
        </Link>
        <div className="mt-8 border border-white/20 bg-white/5 p-8">
          <h1 className="tk-din-condensed text-4xl uppercase">Tool Not Found</h1>
          <p className="publicSans-text mt-3 text-white/80">
            This tool route does not match an existing record.
          </p>
        </div>
      </div>
    );
  }

  const RuntimeTool = tool.type === "component" ? getToolComponent(tool.slug) : null;

  return (
    <div
      className="min-h-screen min-h-dvh px-4 py-6 text-white sm:px-6 md:px-8 md:py-8"
      style={{
        backgroundColor: "#181A4B",
        background:
          "linear-gradient(180deg, rgba(186, 118, 255, 0.30) 0%, rgba(186, 118, 255, 0.00) 20%), linear-gradient(180deg, #D5DCD9 0%, #83C1E6 20%, #1D5DE5 40%, #172FAB 56%, #181A4B 80%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <header className="mb-6 border-b border-white/20 pb-5 sm:mb-8 sm:pb-6">
        <Link to="/tools" className="font-mono text-xs uppercase hover:text-[#BA76FF]">
          Back to Tools
        </Link>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="tk-din-condensed text-4xl uppercase leading-none sm:text-5xl">
              {tool.name}
            </h1>
            <p className="publicSans-text mt-3 max-w-3xl text-white/85">
              {tool.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/20 px-3 py-1 text-[10px] font-mono uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-end">
            <StatusBadge status={tool.status} />
            <span className="font-mono text-xs uppercase text-white/70">
              {tool.year}
            </span>
          </div>
        </div>
      </header>

      <section className="border border-white/20 bg-white/5 p-4 md:p-8">
        {tool.type === "embed" ? (
          tool.embedUrl ? (
            <iframe
              src={tool.embedUrl}
              title={tool.name}
              className="h-[70dvh] w-full border border-white/10 bg-[#0A0F33] md:h-[75vh]"
            />
          ) : (
            <div className="p-8">
              <h2 className="tk-din-condensed text-3xl uppercase">Embed Missing</h2>
              <p className="publicSans-text mt-3 text-white/80">
                This tool is marked as embed, but no `embedUrl` is configured.
              </p>
            </div>
          )
        ) : RuntimeTool ? (
          <Suspense
            fallback={
              <div className="p-8 font-mono text-xs uppercase text-white/70">
                Loading tool runtime...
              </div>
            }
          >
            <RuntimeTool />
          </Suspense>
        ) : (
          <div className="p-8">
            <h2 className="tk-din-condensed text-3xl uppercase">Runtime Missing</h2>
            <p className="publicSans-text mt-3 text-white/80">
              No runtime component is mapped for this tool slug.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
