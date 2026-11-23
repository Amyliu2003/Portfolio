import React, { useState } from "react";
import { COLORS, THEME } from "../utils/theme";
import { MatchStatus } from "./MatchStatus";
import { Button, SearchInput } from "./ui";

export type SortOption = "default" | "alphabetical" | "newest";

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

  return (
    <div className="w-full z-30 px-8 flex flex-col gap-8 pointer-events-none mt-4">
      
      {/* Top Row: Search & Sort */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pointer-events-auto">
        
        {/* Search Bar */}
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm("")}
          placeholder="Search(Name || Tag)..."
          label="Search works by name or tag"
        />

        {/* Sort & Actions */}
        <div className="flex items-center gap-4">
           {/* Sort Dropdown */}
           <div className="relative">
              <Button
                variant="outline"
                aria-haspopup="true"
                aria-expanded={isSortOpen}
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                 <span>SORT:</span>
                 <span>{sortOption}</span>
                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`}>
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeLinecap="square"/>
                 </svg>
              </Button>
              
              {isSortOpen && (
                <div className="absolute top-full right-0 mt-1 w-full min-w-[120px] bg-[#181A4B] border border-white/20 flex flex-col z-50">
                   {(["default", "newest", "alphabetical"] as SortOption[]).map(opt => (
                      <Button
                        key={opt}
                        variant="ghost"
                        className="works-sort-option"
                        onClick={() => { setSortOption(opt); setIsSortOpen(false); }}
                      >
                         {opt}
                      </Button>
                   ))}
                </div>
              )}
           </div>

           <div className="w-px h-6 bg-white/10 mx-2"></div>

           {/* View Toggles */}
           <div className="works-view-toggle" role="group" aria-label="View mode">
              <Button
                 variant="outline"
                 icon
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
         <div className="works-tag-scroller flex-1 flex flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#BA76FF]/50 scrollbar-track-transparent">
            {tagData.map(([tag, count]) => {
                const isActive = activeTags.includes(tag);
                return (
                    <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`
                            shrink-0 h-[30px] px-3 flex items-center gap-2 border transition-all duration-200 whitespace-nowrap
                            ${isActive 
                                ? "bg-[#BA76FF] border-[#BA76FF] text-white" 
                                : "bg-transparent border-white/20 text-white hover:border-white"
                            }
                        `}
                    >
                        <span className="font-mono text-xs uppercase tracking-[0.6px]">{tag}</span>
                        <span className={`text-xs publicSans-text font-bold ${isActive ? 'text-white' : 'text-white/60'}`}>{count}</span>
                    </button>
                );
            })}
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
