import React, { useCallback, useEffect, useRef, useState } from "react";
import { COLORS, THEME } from "../utils/theme";
import { MatchStatus } from "./MatchStatus";
import { Button, SearchInput, Tag } from "./ui";

/** true while the viewport is at least `px` wide (tracks resizes) */
function useMinWidth(px: number) {
  const query = `(min-width: ${px}px)`;
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export type SortOption = "default" | "alphabetical" | "newest";

const SORT_LABELS: Record<SortOption, string> = {
  default: "Default",
  newest: "Newest",
  alphabetical: "Alphabetical",
};

interface ControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeTags: string[];
  handleTagClick: (tag: string) => void;
  tagData: [string, number][];
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  viewMode: "tray" | "grid";
  setViewMode: (mode: "tray" | "grid") => void;
  isLoggedIn: boolean;
  onAddProjectClick: () => void;
  hasFilter: boolean;
  matchCount: number;
  onClearFilters: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  searchTerm,
  setSearchTerm,
  activeTags,
  handleTagClick,
  tagData,
  sortOption,
  setSortOption,
  viewMode,
  setViewMode,
  isLoggedIn,
  onAddProjectClick,
  hasFilter,
  matchCount,
  onClearFilters,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const isWide = useMinWidth(480);
  const sortTriggerRef = useRef<HTMLButtonElement>(null);
  const closeSortMenu = () => {
    setIsSortOpen(false);
    sortTriggerRef.current?.focus();
  };

  // Tag row edge fades: left fade once scrolled away from the start, right fade until the end
  const tagScrollerRef = useRef<HTMLDivElement>(null);
  const [tagFade, setTagFade] = useState({ left: false, right: false });

  const updateTagFade = useCallback(() => {
    const el = tagScrollerRef.current;
    if (!el) return;
    const left = el.scrollLeft > 1;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
    setTagFade((prev) =>
      prev.left === left && prev.right === right ? prev : { left, right },
    );
  }, []);

  useEffect(() => {
    const el = tagScrollerRef.current;
    if (!el) return;
    updateTagFade();
    const observer = new ResizeObserver(updateTagFade);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateTagFade, tagData, hasFilter]);

  // Keyboard focus on a tag under a fade (or out of view) scrolls it fully into the clear area
  const revealFocusedTag = (e: React.FocusEvent<HTMLDivElement>) => {
    const container = tagScrollerRef.current;
    const tag = e.target as HTMLElement;
    if (!container || tag === container) return;
    // Fade width comes from the CSS variable --tag-fade (single source of truth)
    const fade =
      parseFloat(getComputedStyle(container).getPropertyValue("--tag-fade")) || 0;
    const box = container.getBoundingClientRect();
    const r = tag.getBoundingClientRect();
    // Tag position within the scroll content (independent of any scroll in progress)
    const contentLeft = r.left - box.left + container.scrollLeft;
    const contentRight = contentLeft + r.width;
    const current = container.scrollLeft;
    let target = current;
    if (contentLeft - fade < current) {
      // Reveal past the left fade; at the very start there is no left fade
      target = contentLeft - fade <= 0 ? 0 : contentLeft - fade;
    } else if (contentRight + fade > current + container.clientWidth) {
      target = contentRight + fade - container.clientWidth;
    }
    target = Math.max(0, Math.min(target, container.scrollWidth - container.clientWidth));
    if (Math.abs(target - current) < 1) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    container.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="w-full z-30 px-8 flex flex-col gap-8 pointer-events-none mt-4">
      
      {/* Top Row: Search + [Sort][Tray][Grid] on one row at every width */}
      <div className="w-full flex flex-row items-center gap-3 pointer-events-auto">
        
        {/* Search Bar */}
        <SearchInput
          size="lg"
          className="works-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm("")}
          placeholder={isWide ? "Search(Name || Tag)..." : "Search..."}
          label="Search works by name or tag"
        />

        {/* Sort, view toggles (and admin Add) as 46px squares */}
        <div className="works-view-toggle">
           {/* Sort Dropdown */}
           <div
              className="relative"
              onKeyDown={(e) => {
                if (e.key === "Escape" && isSortOpen) {
                  e.stopPropagation();
                  closeSortMenu();
                }
              }}
           >
              <Button
                ref={sortTriggerRef}
                variant="outline"
                icon
                size="lg"
                aria-label={`Sort: ${SORT_LABELS[sortOption]}`}
                title={`Sort: ${SORT_LABELS[sortOption]}`}
                aria-haspopup="true"
                aria-expanded={isSortOpen}
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M2.5 6.5H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                    <path d="M2.5 13.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                    <path d="M14 3V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                    <path d="M11 6L14 3L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                    <path d="M11 14L14 17L17 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                 </svg>
                 {sortOption !== "default" && <span className="works-sort-dot" aria-hidden="true" />}
              </Button>
              
              {isSortOpen && (
                <div className="absolute top-full right-0 mt-1 min-w-[180px] bg-[#181A4B] border border-white/20 flex flex-col z-50">
                   {(["default", "newest", "alphabetical"] as SortOption[]).map(opt => (
                      <Button
                        key={opt}
                        variant="ghost"
                        className="works-sort-option"
                        aria-current={opt === sortOption ? "true" : undefined}
                        onClick={() => { setSortOption(opt); closeSortMenu(); }}
                      >
                         <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ visibility: opt === sortOption ? "visible" : "hidden" }}>
                            <path d="M2 6.5L4.75 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                         </svg>
                         {SORT_LABELS[opt]}
                      </Button>
                   ))}
                </div>
              )}
           </div>

           {/* View Toggles */}
           <div className="works-view-toggle" role="group" aria-label="View mode">
              <Button
                 variant="outline"
                 icon
                 size="lg"
                 aria-label="Tray view"
                 aria-pressed={viewMode === "tray"}
                 onClick={() => setViewMode("tray")}
              >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M15.8333 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                      <path d="M2.5 7.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                      <path d="M2.5 12.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
              </Button>
              <Button
                 variant="outline"
                 icon
                 size="lg"
                 aria-label="Grid view"
                 aria-pressed={viewMode === "grid"}
                 onClick={() => setViewMode("grid")}
              >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="2.5" y="2.5" width="5.83" height="5.83" stroke="currentColor" strokeWidth="1.5"/>
                      <rect x="11.66" y="2.5" width="5.83" height="5.83" stroke="currentColor" strokeWidth="1.5"/>
                      <rect x="11.66" y="11.66" width="5.83" height="5.83" stroke="currentColor" strokeWidth="1.5"/>
                      <rect x="2.5" y="11.66" width="5.83" height="5.83" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
              </Button>
           </div>
           
           {/* Add Project Button */}
           {isLoggedIn && (
               <Button
                 variant="accent"
                 icon
                 size="lg"
                 aria-label="Add project"
                 onClick={onAddProjectClick}
               >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                     <line x1="12" y1="5" x2="12" y2="19"></line>
                     <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
               </Button>
           )}
        </div>
      </div>

      {/* Bottom Row: Tags */}
      <div className="w-full pointer-events-auto flex items-center gap-4">
         <div
            ref={tagScrollerRef}
            onScroll={updateTagFade}
            onFocus={revealFocusedTag}
            className={`works-tag-scroller ui-hit-scroll flex-1 flex flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#BA76FF]/50 scrollbar-track-transparent${tagFade.left ? " has-fade-left" : ""}${tagFade.right ? " has-fade-right" : ""}`}
         >
            {tagData.map(([tag, count]) => (
                <Tag
                    key={tag}
                    on={activeTags.includes(tag)}
                    onClick={() => handleTagClick(tag)}
                    className="shrink-0"
                >
                    {tag}
                    <span className="ui-tag__count">{count}</span>
                </Tag>
            ))}
         </div>
         {hasFilter && (
            <MatchStatus
               count={matchCount}
               onClear={onClearFilters}
               className="shrink-0 works-match-status"
            />
         )}
      </div>
    </div>
  );
};
