type TagFilterProps = {
  tags: string[];
  activeTag: string;
  onSelect: (tag: string) => void;
};

export function TagFilter({ tags, activeTag, onSelect }: TagFilterProps) {
  return (
    <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
      {tags.map((tag) => {
        const isActive = tag === activeTag;
        return (
          <button
            key={tag}
            onClick={() => onSelect(tag)}
            className={`shrink-0 h-[32px] px-3 text-xs font-mono uppercase tracking-[0.6px] border transition-colors ${
              isActive
                ? "bg-[#BA76FF] border-[#BA76FF] text-white"
                : "bg-transparent border-white/20 text-white hover:border-white focus:border-[#BA76FF]"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
