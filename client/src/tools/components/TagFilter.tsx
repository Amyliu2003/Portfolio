import { Tag } from "../../components/ui";

type TagFilterProps = {
  tags: string[];
  activeTag: string;
  onSelect: (tag: string) => void;
};

export function TagFilter({ tags, activeTag, onSelect }: TagFilterProps) {
  return (
    <div className="ui-hit-scroll ui-tag-row flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
      {tags.map((tag) => (
        <Tag
          key={tag}
          on={tag === activeTag}
          onClick={() => onSelect(tag)}
          className="shrink-0"
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
}
