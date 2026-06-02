import { Badge } from "@/components/ui/badge";
import type { StoreType } from "@/lib/types";

const labels: Record<StoreType, { text: string; emoji: string }> = {
  ONLINE: { text: "Online", emoji: "🌐" },
  OFFLINE: { text: "Offline", emoji: "🏪" },
  BOTH: { text: "Online + Offline", emoji: "🌐🏪" },
};

export function StoreTypeBadge({ storeType }: { storeType: StoreType }) {
  const { text, emoji } = labels[storeType];
  return (
    <Badge variant="secondary" className="gap-1">
      <span>{emoji}</span> {text}
    </Badge>
  );
}
