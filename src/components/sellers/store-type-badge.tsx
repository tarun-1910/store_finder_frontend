import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { StoreType } from "@/lib/types";

const labels: Record<StoreType, { text: string; emoji: string; className: string }> = {
  ONLINE: {
    text: "Online",
    emoji: "🌐",
    className: "bg-brand-highlight/15 text-brand-main border-brand-highlight/30",
  },
  OFFLINE: {
    text: "Offline",
    emoji: "🏪",
    className: "bg-brand-gray text-brand-main/80 border-brand-gray/50",
  },
  BOTH: {
    text: "Online + Offline",
    emoji: "🌐🏪",
    className: "bg-brand-accent/15 text-brand-main border-brand-accent/30",
  },
};

export function StoreTypeBadge({ storeType }: { storeType: StoreType }) {
  const { text, emoji, className } = labels[storeType];
  return (
    <Badge variant="outline" className={cn("gap-1", className)}>
      {(storeType === "ONLINE" || storeType === "BOTH") && (
        <span className="size-1.5 rounded-full bg-brand-accent shrink-0" />
      )}
      <span>{emoji}</span> {text}
    </Badge>
  );
}
