import React from "react";
import { motion } from "motion/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ProjectItem } from "../data/projects";
import { COLORS } from "../utils/theme";

interface GridViewProps {
  items: ProjectItem[];
  onSelectProjectBySlug: (slug: string) => void;
}

export const GridView: React.FC<GridViewProps> = ({
  items,
  onSelectProjectBySlug,
}) => {
  return (
    <div className="w-full h-full overflow-y-auto p-8 pb-32">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 1100: 3, 1400: 4 }}
      >
        <Masonry gutter="3rem">
          {items.map((item) => {
            const isSvgTitleImage =
              typeof item.image === "string" &&
              item.image.toLowerCase().includes(".svg");

            return (
              <motion.div
              layoutId={`grid-${item.id}`}
              key={item.id}
              onClick={() => item.slug && onSelectProjectBySlug(item.slug)}
              className="relative group cursor-pointer radius-8 bg-[#172067] border border-white/10 hover:border-[var(--accent)] transition-all duration-300 bg-white/5 flex flex-col"
              whileHover={{ y: -5 }}
            >
              {/* Image Area */}
              <div
                className={`w-full overflow-hidden aspect-[4/3] relative border-b border-[#333] ${
                  isSvgTitleImage ? "bg-white" : "bg-black"
                }`}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                      isSvgTitleImage ? "object-contain p-3" : "object-cover"
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <span className="font-mono text-xs opacity-30">
                      NO IMAGE
                    </span>
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col gap-4">
                {/* Header: Label + Year */}
                <div className="flex justify-between items-center  font-mono text-xs tracking-widest uppercase">
                  <span className="text-[var(--accent)]">
                    {item.projectLabel}
                  </span>
                  <span className="text-white/30">2026</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl tk-din-condensed uppercase leading-none text-white">
                  {item.title}
                </h3>

                {/* Description */}
                <p className=" publicSans-text text-[#ffffff] text-sm leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.skills.split("•").map((skill, idx) => (
                    <span
                      key={idx}
                      className="border border-white/20 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-white hover:text-white hover:border-white transition-colors"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>

      {items.length === 0 && (
        <div className="w-full h-64 flex items-center justify-center opacity-30 font-mono text-sm uppercase">
          No matching protocols found.
        </div>
      )}
    </div>
  );
};
