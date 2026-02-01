import React from "react";

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
    <div
      className="w-full overflow-x-auto overflow-y-hidden no-scrollbar pointer-events-auto cursor-grab active:cursor-grabbing"
    >
      <div
        className="flex flex-nowrap gap-2 w-max pr-4"
      >
        {sortedTagData.map(([tag, count]) => {
          const isActive = activeTags.includes(tag);

          return (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={`
                shrink-0          
                h-[30px]
                px-3
                flex
                items-center
                gap-2
                border
                transition-all
                duration-200
                ${
                  isActive
                    ? "bg-[#BA76FF] border-[#BA76FF] text-white"
                    : "bg-transparent border-white/20 text-white hover:border-white"
                }
              `}
            >
              <span className="publicSans-text text-xs uppercase tracking-[0.6px]">
                {tag}
              </span>
              <span
                className={`text-xs font-['Tinos'] font-bold ${
                  isActive ? "text-white" : "text-white/60"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};