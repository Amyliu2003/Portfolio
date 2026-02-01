import React from "react";
import { handleTagClick } from "../App";

type TagData = [string, number];

interface TagScrollerProps {
  tagData: TagData[];
  activeTags: string[];
  onTagClick: (tag: string) => void;
}

export const TagScroller: React.FC<TagScrollerProps> = ({
  tagData,
  activeTags,
  onTagClick,
}) => {
  const sortedTagData = [...tagData].sort((a, b) => b[1] - a[1]);

return (
  <>
    {/* Bottom Row: Tags */}
 <div className="w-full pointer-events-auto">
         <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#BA76FF]/50 scrollbar-track-transparent">
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