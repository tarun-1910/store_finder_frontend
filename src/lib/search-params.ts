import type { StoreType } from "./types";

export function parseSearchFilters(params: {
  storeType?: string;
  categoryId?: string;
}) {
  const storeTypeRaw = params.storeType;
  const categoryId = params.categoryId;
  return {
    storeType:
      storeTypeRaw && storeTypeRaw !== "ALL" ? (storeTypeRaw as StoreType) : undefined,
    categoryId: categoryId && categoryId !== "ALL" ? Number(categoryId) : undefined,
  };
}
