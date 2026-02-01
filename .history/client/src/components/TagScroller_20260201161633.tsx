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
  <>
    {/* Bottom Row: Tags */}
    <div
      className="w-full overflow-x-auto overflow-y-hidden pointer-events-auto no-scrollbar"
    >
  <div
    className="
      flex
      flex-nowrap      /* 不换行 */
      gap-2
      w-max            /* 内容自然撑开 */
      pr-4
    "
  >
    {[...tagData]                 /* tagData 仍然来自数据库 */
      .sort((a, b) => b[1] - a[1]) /* 仅改变显示顺序 */
      .map(([tag, count]) => {
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
    </>
  );
};