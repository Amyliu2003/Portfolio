import React, { useEffect, useRef } from "react";
import { ProjectItem } from "../data/projects";
import { COLORS } from "../utils/theme";

interface FloatingTooltipProps {
  hoveredItem: ProjectItem | null;
  viewMode: "tray" | "grid";
  selectedProject: ProjectItem | null;
}

export const FloatingTooltip: React.FC<FloatingTooltipProps> = ({
  hoveredItem,
  viewMode,
  selectedProject,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Mouse tracking logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (tooltipRef.current) {
        tooltipRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={tooltipRef}
      className="fixed top-0 left-0 z-[100] pointer-events-none transition-opacity duration-150 ease-out will-change-transform"
      style={{
        opacity:
          viewMode === "tray" && hoveredItem && !selectedProject ? 1 : 0,
      }}
    >
      {hoveredItem && viewMode === "tray" && (
        <div className="relative">
          {hoveredItem.type === "special" ? (
            <div
              className="w-80 bg-[#1a1a1a] border-2 p-1 relative"
              style={{
                borderColor: COLORS.accent,
                boxShadow: `12px 12px 0px 0px ${COLORS.accent}80`,
              }}
            >
              <div className="h-40 w-full overflow-hidden mb-2 bg-black relative">
                {hoveredItem.image && (
                  <img
                    src={hoveredItem.image}
                    alt={hoveredItem.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
              </div>
              <div className="p-3 bg-black">
                <h3
                  className="text-3xl font-black italic uppercase leading-none mb-1"
                  style={{ color: COLORS.accent }}
                >
                  {hoveredItem.title}
                </h3>
                <div className="h-px w-full bg-[#333] my-3"></div>
                <div className="flex justify-between items-end">
                  <p className="text-white text-xs font-mono uppercase tracking-tight opacity-70">
                    {hoveredItem.skills}
                  </p>
                  <span className="text-white text-[10px] font-mono">
                    2026
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="bg-black border p-4 w-56 backdrop-blur-md bg-black/90"
              style={{ borderColor: COLORS.dim }}
            >
              <h3 className="text-white/60 text-xl font-black uppercase leading-none mb-1">
                {hoveredItem.title}
              </h3>
              <p className="text-white/30 text-xs font-mono uppercase mt-2">
                {hoveredItem.skills}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
