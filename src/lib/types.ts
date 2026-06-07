export type StoreType = "ONLINE" | "OFFLINE" | "BOTH";
export type SellerStatus = "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "INACTIVE";
export type EntityStatus = "ACTIVE" | "INACTIVE";
export type Role = "SUPER_ADMIN" | "ADMIN";

export interface ApiResponse<T> {
  success: boolean; 
  message: string;
  data: T;
}  

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  status: EntityStatus;
}

export interface SellerCard {
  id: number;
  slug: string;
  businessName: string;
  shortDescription: string;
  categoryName: string;
  storeType: StoreType;
  area: string;
  phone: string;
  logoUrl?: string;
  verified: boolean;
  featured: boolean;
}

export interface SellerDetail {
  id: number;
  slug: string;
  businessName: string;
  description: string;
  logoUrl?: string;
  coverUrl?: string;
  categoryName: string;
  categorySlug: string;
  categoryId?: number;
  storeType: StoreType;
  address?: string;
  area?: string;
  city?: string;
  state?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  whatsappUrl?: string;
  instagramUrl?: string;
  websiteUrl?: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  verified: boolean;
  featured: boolean;
  status: SellerStatus;
  tags: string[];
}

export interface Product {
  id: number;
  sellerId: number;
  sellerName?: string;
  name: string;
  imageUrl?: string;
  description?: string;
  status: EntityStatus;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: { id: number; name: string; email: string; role: Role };
}

export interface DashboardStats {
  totalSellers: number;
  activeSellers: number;
  pendingSellers: number;
  inactiveSellers: number;
  totalProducts: number;
  totalCategories: number;
  totalSearches: number;
  topCategories: { categoryName: string; sellerCount: number }[];
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
