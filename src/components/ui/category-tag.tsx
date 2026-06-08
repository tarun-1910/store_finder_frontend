import { cn } from "@/lib/utils";
import { getCategoryTagClasses, getCategoryEmoji } from "@/lib/colors";

export function CategoryTag({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span className={cn("text-xs px-2.5 py-1 rounded-md flex items-center gap-1 w-fit", getCategoryTagClasses(name), className)}>
      <span>{getCategoryEmoji(name)}</span>
      <span>{name}</span>
    </span>
  );
}
