import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import type { ProjectItem } from "../data/types";
import { hasActiveFilter, matchesSearch } from "../data/projects-helpers";
import { Footer } from "./Footer";
import lavaLampsImage from "../assets/lava_lamps.png";

interface TrayViewProps {
  items: ProjectItem[];
  searchTerm: string;
  activeTags: string[];
  setHoveredItem: (item: ProjectItem | null) => void;
}

export const TrayView: React.FC<TrayViewProps> = ({
  items,
  searchTerm,
  activeTags,
  setHoveredItem,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hasFilter = hasActiveFilter(searchTerm, activeTags);

  // Scroll the tray (not the page) so the first highlighted slot is centered
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!hasFilter || !container) return;

    const firstMatch = container.querySelector<HTMLElement>(
      '[data-match="true"]',
    );
    if (!firstMatch) return;

    const containerRect = container.getBoundingClientRect();
    const matchRect = firstMatch.getBoundingClientRect();
    const offsetInContent =
      matchRect.left - containerRect.left + container.scrollLeft;

    container.scrollTo({
      left: Math.max(
        0,
        offsetInContent - container.clientWidth / 2 + matchRect.width / 2,
      ),
      behavior: "smooth",
    });
  }, [hasFilter, searchTerm, activeTags, items]);

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
                      <div className="absolute top-0 left-0 w-full bottom-14 overflow-hidden bg-black/50">
                        <img
                          src={lavaLampsImage}
                          alt="Lava Lamps Group Base"
                          className="w-full h-full object-cover block contrast-150 saturate-0 opacity-40"
                          draggable="false"
                        />
                      </div>
                      {/* INDIVIDUAL ITEMS */}
                      <div className="relative w-full h-full flex">
                        {groupItems.map((gItem, gIndex) => {
                          const isSpecial =
                            gItem.type === "special";

                          const isMatch = matchesSearch(
                            gItem,
                            searchTerm,
                            activeTags,
                          );

                          // Lit lamps: matches while filtering, otherwise the featured projects
                          const shouldHighlightPersistent = hasFilter
                            ? isMatch
                            : !!gItem.featured;

                          // Special items are real links; duplicate loop cycles stay out of the tab order.
                          const isLink = isSpecial && !!gItem.slug;
                          const SlotTag: React.ElementType = isLink ? Link : "div";
                          const slotLinkProps = isLink
                            ? {
                                to: `/works/${gItem.slug}`,
                                "aria-label": gItem.title,
                                ...(cycle > 0 ? { tabIndex: -1 } : {}),
                              }
                            : {};

                          return (
                            <SlotTag
                              key={`${gItem.slug}-${cycle}`}
                              {...slotLinkProps}
                              data-match={
                                hasFilter && isMatch ? "true" : undefined
                              }
                              className={`tray-slot flex-1 h-full relative group/item outline-none overflow-hidden
                                ${isSpecial ? "cursor-pointer" : "cursor-default"}
                                ${shouldHighlightPersistent ? "overflow-visible" : "overflow-hidden"}
                              `}
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
                                  className="max-w-none h-full block object-cover"
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
                                  ${shouldHighlightPersistent 
                                    ? "bg-[#BA76FF] scale-120 -translate-y-2" 
                                    : "bg-[#0A0F33] group-hover/item:bg-[#BA76FF] group-hover/item:scale-120  group-hover/item:-translate-y-2"}
                                `}
                              >
                                <div className="flex w-full flex-col items-center">
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
                                  {/* Title: pinned on lit lamps; on hover devices others show on hover/focus (see custom.css) */}
                                  <span
                                    title={gItem.title}
                                    className={`publicSans-text tray-title-label ${shouldHighlightPersistent ? "is-pinned" : ""} uppercase text-[10px] leading-none text-center transition-all duration-300 transform group-hover/item:-translate-y-1
                                      ${
                                        shouldHighlightPersistent
                                          ? "text-black -translate-y-1"
                                          : "text-white group-hover/item:text-black"
                                      }
                                    `}
                                  >
                                    {gItem.title}
                                  </span>
                                </div>
                              </div>

                              {/* Content Container (Invisible hit area mostly) */}
                              <div className="relative z-20 w-full h-full flex items-center justify-center">
                                {/* We rely on the hover tooltip for visuals in Tray Mode */}
                              </div>
                            </SlotTag>
                          );
                        })}
                        {/* Pad a short final group so every group keeps 5 lamp slots */}
                        {Array.from(
                          { length: 5 - groupItems.length },
                          (_, padIndex) => (
                            <div
                              key={`pad-${cycle}-${index}-${padIndex}`}
                              aria-hidden="true"
                              className="flex-1 h-full relative cursor-default"
                            >
                              <div className="absolute bottom-0 left-0 w-full h-14 bg-[#0A0F33]" />
                            </div>
                          ),
                        )}
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