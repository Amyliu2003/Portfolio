import React, { useState } from "react";
import { COLORS, THEME } from "../utils/theme";

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
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="w-full z-30 px-8 flex flex-col gap-8 pointer-events-none mt-4">
      
      {/* Top Row: Search & Sort */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pointer-events-auto">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-[400px] h-[54px]">
           {/* Glow/Blur Effect */}
           <div className="absolute inset-0 bg-white/20 blur-md rounded-md opacity-20"></div>
           
           {/* Input Container */}
           <div className="relative w-full h-full border border-white/20 flex items-center bg-transparent backdrop-blur-sm group hover:border-[#BA76FF]/50 transition-colors">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="SEARCH()"
                className="w-full h-full bg-transparent px-4 text-lg text-white font-['Yarding'] uppercase tracking-[0.45px] placeholder-white/50 outline-none"
              />
              <div className="pr-4 text-[#BA76FF]">
                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                    <path d="M17.5 17.5L13.875 13.875" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                 </svg>
              </div>
           </div>
        </div>

        {/* Sort & Actions */}
        <div className="flex items-center gap-4">
           {/* Sort Dropdown */}
           <div className="relative h-[38px] flex items-center border border-white/20 group hover:border-white transition-colors bg-transparent backdrop-blur-sm">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-3 px-4 h-full text-xs font-['Alegreya_Sans'] uppercase tracking-[0.6px] text-white"
              >
                 <span>SORT:</span>
                 <span className="text-white font-normal">{sortOption}</span>
                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`}>
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeLinecap="square"/>
                 </svg>
              </button>
              
              {isSortOpen && (
                <div className="absolute top-full right-0 mt-1 w-full min-w-[120px] bg-[#181A4B] border border-white/20 flex flex-col z-50">
                   {(["default", "newest", "alphabetical"] as SortOption[]).map(opt => (
                      <button
                        key={opt}
                        onClick={() => { setSortOption(opt); setIsSortOpen(false); }}
                        className="text-left px-4 py-2 text-xs text-white font-['Alegreya_Sans'] uppercase hover:bg-[#BA76FF] hover:text-black transition-colors"
                      >
                         {opt}
                      </button>
                   ))}
                </div>
              )}
           </div>

           <div className="w-px h-6 bg-white/10 mx-2"></div>

           {/* View Toggles */}
           <div className="flex h-[38px] border border-white/20">
              <button 
                 onClick={() => setViewMode("tray")}
                 className={`w-[38px] h-full flex items-center justify-center transition-colors ${viewMode === "tray" ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
              >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.8333 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                      <path d="M2.5 7.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                      <path d="M2.5 12.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
              </button>
              <div className="w-px h-full bg-white/20"></div>
              <button 
                 onClick={() => setViewMode("grid")}
                 className={`w-[38px] h-full flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
              >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2.5" y="2.5" width="5.83" height="5.83" stroke="currentColor" strokeWidth="1.5"/>
                      <rect x="11.66" y="2.5" width="5.83" height="5.83" stroke="currentColor" strokeWidth="1.5"/>
                      <rect x="11.66" y="11.66" width="5.83" height="5.83" stroke="currentColor" strokeWidth="1.5"/>
                      <rect x="2.5" y="11.66" width="5.83" height="5.83" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
              </button>
           </div>
           
           {/* Add Project Button */}
           {isLoggedIn && (
               <button 
                 onClick={onAddProjectClick}
                 className="h-[38px] w-[38px] flex items-center justify-center border border-[#BA76FF] text-[#BA76FF] hover:bg-[#BA76FF] hover:text-white transition-colors ml-2"
               >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <line x1="12" y1="5" x2="12" y2="19"></line>
                     <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
               </button>
           )}
        </div>
      </div>

      {/* Bottom Row: Tags */}
      <div className="w-full overflow-hidden pointer-events-auto">
         <div className="flex flex-wrap gap-2">
            {tagData.map(([tag, count]) => {
                const isActive = activeTags.includes(tag);
                return (
                    <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`
                            h-[30px] px-3 flex items-center gap-2 border transition-all duration-200
                            ${isActive 
                                ? "bg-[#BA76FF] border-[#BA76FF] text-white" 
                                : "bg-transparent border-white/20 text-white hover:border-white"
                            }
                        `}
                    >
                        <span className="font-['Alegreya_Sans'] text-xs uppercase tracking-[0.6px]">{tag}</span>
                        <span className={`text-xs font-['Tinos'] font-bold ${isActive ? 'text-white' : 'text-white/60'}`}>{count}</span>
                    </button>
                );
            })}
         </div>
      </div>
    </div>
  );
};
