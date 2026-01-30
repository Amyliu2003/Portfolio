import React, { useEffect, useRef } from "react";
import { ProjectItem } from "../data/projects";
import { Footer } from "./Footer";
import lavaLampsImage from "figma:asset/4982c18ccbbad3bc7b36782f83f72c099210cbe3.png";

interface TrayViewProps {
  items: ProjectItem[];
  searchTerm: string;
  activeTags: string[];
  onSelectProject: (item: ProjectItem) => void;
  setHoveredItem: (item: ProjectItem | null) => void;
}

export const TrayView: React.FC<TrayViewProps> = ({
  items,
  searchTerm,
  activeTags,
  onSelectProject,
  setHoveredItem,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to first match logic
  useEffect(() => {
    if (
      (!searchTerm && activeTags.length === 0) ||
      !scrollContainerRef.current
    )
      return;

    const allDisplayedItems: any[] = [];
    // We duplicate items 4 times for the infinite loop effect
    for (let cycle = 0; cycle < 4; cycle++) {
      items.forEach((item) =>
        allDisplayedItems.push({ ...item, cycle }),
      );
    }

    const firstMatchIndex = allDisplayedItems.findIndex(
      (item) => {
        const query = searchTerm.toLowerCase();
        const matchesText =
          searchTerm === "" ||
          item.title.toLowerCase().includes(query) ||
          item.skills.toLowerCase().includes(query) ||
          item.projectLabel.toLowerCase().includes(query);

        const matchesTags =
          activeTags.length === 0 ||
          activeTags.some((tag) => item.skills.includes(tag));

        return matchesText && matchesTags;
      },
    );

    if (firstMatchIndex !== -1) {
      const itemWidth = 160;
      const scrollPos = firstMatchIndex * itemWidth;
      const containerWidth =
        scrollContainerRef.current.clientWidth;
      const centeredPos =
        scrollPos - containerWidth / 2 + itemWidth / 2;

      scrollContainerRef.current.scrollTo({
        left: Math.max(0, centeredPos),
        behavior: "smooth",
      });
    }
  }, [searchTerm, activeTags, items]);

  return (
    <div className="w-full h-full flex flex-col bg-transparent">
      <div
        ref={scrollContainerRef}
        className="w-full flex-1 overflow-x-auto overflow-y-hidden flex items-center gap-0 snap-x snap-mandatory cursor-grab active:cursor-grabbing scrollbar-hide pt-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex gap-0 pl-0 h-full items-center">
          {[0, 1, 2, 3].map((cycle) => (
            <div
              key={`cycle-${cycle}`}
              className="flex h-full items-center"
            >
              {/* We chunk items into groups of 5 for the background image logic */}
              {items.map((item, index) => {
                if (index % 5 === 0) {
                  const groupItems = items.slice(
                    index,
                    index + 5,
                  );
                  return (
                    <div
                      key={`group-${cycle}-${index}`}
                      className="relative flex-shrink-0 w-[800px] h-full flex items-center select-none snap-center group/tray"
                    >
                      {/* BASE IMAGE (Grayscale + Dim) */}
                      <div className="absolute top-0 left-0 w-full bottom-14 overflow-hidden">
                        <img
                          src={lavaLampsImage}
                          alt="Lava Lamps Group Base"
                          className="w-full h-full object-cover block contrast-125 saturate-0 opacity-40"
                          draggable="false"
                        />
                      </div>
                      {/* INDIVIDUAL ITEMS */}
                      <div className="relative w-full h-full flex">
                        {groupItems.map((gItem, gIndex) => {
                          const isSpecial =
                            gItem.type === "special";

                          // Determine if there is an active search or filter
                          const hasFilter =
                            searchTerm !== "" ||
                            activeTags.length > 0;

                          const query =
                            searchTerm.toLowerCase();
                          const matchesText =
                            searchTerm === "" ||
                            gItem.title
                              .toLowerCase()
                              .includes(query) ||
                            gItem.skills
                              .toLowerCase()
                              .includes(query) ||
                            gItem.projectLabel
                              .toLowerCase()
                              .includes(query);
                          const matchesTag =
                            activeTags.length === 0 ||
                            activeTags.some((tag) =>
                              gItem.skills.includes(tag),
                            );

                          const isMatch =
                            matchesText && matchesTag;

                          // Highlight logic
                          const shouldHighlightPersistent =
                            hasFilter && isMatch;

                          return (
                            <div
                              key={`${gItem.id}-${cycle}`}
                              className={`flex-1 h-full relative group/item outline-none overflow-hidden
                                ${isSpecial ? "cursor-pointer" : "cursor-default"}
                              `}
                              onClick={() => {
                                if (isSpecial)
                                  onSelectProject(gItem);
                              }}
                              onMouseEnter={() =>
                                setHoveredItem(gItem)
                              }
                              onMouseLeave={() =>
                                setHoveredItem(null)
                              }
                            >
                              {/* COLORED HOVER IMAGE LAYER */}
                              <div
                                className={`absolute top-0 left-0 w-full bottom-14 z-10 pointer-events-none transition-opacity duration-300 overflow-hidden
                                  ${shouldHighlightPersistent ? "opacity-100" : "opacity-0 group-hover/item:opacity-100"}
                                `}
                              >
                                <img
                                  src={lavaLampsImage}
                                  className="max-w-none h-full block contrast-125 saturate-100 object-cover"
                                  style={{
                                    width: "500%", // 5x the item width
                                    transform: `translateX(-${gIndex * 20}%)`,
                                  }}
                                  alt=""
                                />
                              </div>

                              {/* NUMBER INDICATOR AT BOTTOM */}
                              <div
                                className={`absolute bottom-0 left-0 w-full h-14 z-40 transition-colors duration-300 flex items-center justify-center overflow-hidden 
                                  ${shouldHighlightPersistent ? "bg-transparent" : " bg-[#0A0F33] group-hover/item:bg-[#BA76FF] group-hover/item:scale-120  group-hover/item:-translate-y-2"}
                                `}
                              >
                                <span
                                  className={`text-2xl font-black font-sans transition-all duration-300 transform group-hover/item:-translate-y-1
                                    ${
                                      shouldHighlightPersistent
                                        ? "text-black -translate-y-1"
                                        : "text-white group-hover/item:text-black"
                                    }
                                  `}
                                >
                                  {gItem.idStr}
                                </span>
                              </div>

                              {/* Content Container (Invisible hit area mostly) */}
                              <div className="relative z-20 w-full h-full flex items-center justify-center">
                                {/* We rely on the hover tooltip for visuals in Tray Mode */}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};