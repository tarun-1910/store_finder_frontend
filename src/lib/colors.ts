const HIGHLIGHT_CATEGORY_PATTERN = /jewel|saree|sari/i;

export function isHighlightCategory(categoryName: string): boolean {
  return HIGHLIGHT_CATEGORY_PATTERN.test(categoryName);
}

export function getCategoryTagClasses(categoryName: string): string {
  return isHighlightCategory(categoryName)
    ? "bg-brand-highlight/20 text-brand-main font-semibold"
    : "bg-brand-accent/15 text-brand-main/90";
}

export function getCategoryEmoji(categoryName: string): string {
  const name = categoryName.toLowerCase();
  if (name.includes("bag")) return "👜";
  if (name.includes("beauty") || name.includes("skincare")) return "💄";
  if (name.includes("bedsheet")) return "🛏️";
  if (name.includes("gift")) return "🎁";
  if (name.includes("fashion") || name.includes("cloth") || name.includes("saree") || name.includes("sari")) return "👗";
  if (name.includes("furniture")) return "🛋️";
  if (name.includes("flower")) return "🌸";
  if (name.includes("decor")) return "🖼️";
  if (name.includes("furnish")) return "🧺";
  if (name.includes("jewel")) return "💎";
  if (name.includes("kid") || name.includes("toy")) return "🧸";
  return "🏪";
}

export function getExternalLinkClasses(label: string): string {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors";
  if (/whatsapp/i.test(label)) {
    return `${base} bg-brand-highlight hover:bg-brand-highlight/85 text-brand-main`;
  }
  if (/instagram/i.test(label)) {
    return `${base} bg-brand-accent hover:bg-brand-accent/90 text-brand-cream`;
  }
  return `${base} border border-brand-main/30 text-brand-main hover:bg-brand-main/10`;
}
