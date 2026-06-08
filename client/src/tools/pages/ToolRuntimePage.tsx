import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

const toolLoaders = {
  "course-tiermaker": () => import("../runtime/course-tiermaker"),
  "chess-pgn-converter": () => import("../runtime/chess-pgn-converter"),
  "escape-room-chess": () => import("../runtime/escape-room-chess"),
} as const;

function getToolComponent(slug: string) {
  const loader = toolLoaders[slug as keyof typeof toolLoaders];
  return loader ? lazy(loader) : null;
}

export function ToolRuntimePage() {
  const { slug = "" } = useParams();
  const RuntimeTool = getToolComponent(slug);

  if (!RuntimeTool) {
    return (
      <div className="flex h-full min-h-screen items-center justify-center bg-[#0A0F33] p-6 text-white">
        <div className="border border-white/20 bg-white/5 p-6 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-white/70">
            Runtime not found
          </p>
          <h1 className="tk-din-condensed mt-2 text-3xl uppercase">
            {slug || "Unknown Tool"}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen w-full bg-[#F7F8F9]">
      <Suspense
        fallback={
          <div className="flex h-full min-h-screen items-center justify-center bg-[#0A0F33]">
            <p className="font-mono text-xs uppercase tracking-wider text-white/70">
              Loading runtime...
            </p>
          </div>
        }
      >
        <RuntimeTool />
      </Suspense>
    </div>
  );
}
