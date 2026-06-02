import { api } from "./api";
import type {
  ApiResponse,
  AuthResponse,
  Category,
  DashboardStats,
  Product,
  SellerCard,
  SellerDetail,
  StoreType,
} from "./types";

export const publicApi = {
  search: (q: string, storeType?: StoreType, categoryId?: number) =>
    api.get<ApiResponse<SellerCard[]>>("/api/v1/search", {
      params: { q, storeType, categoryId },
    }),
  sellers: () => api.get<ApiResponse<SellerCard[]>>("/api/v1/sellers"),
  categories: () => api.get<ApiResponse<Category[]>>("/api/v1/categories"),
  category: (slug: string) => api.get<ApiResponse<Category>>(`/api/v1/categories/${slug}`),
  seller: (slug: string) => api.get<ApiResponse<SellerDetail>>(`/api/v1/sellers/${slug}`),
  sellerProducts: (id: number) =>
    api.get<ApiResponse<Product[]>>(`/api/v1/sellers/${id}/products`),
  sellersByCategory: (slug: string) =>  
    api.get<ApiResponse<SellerCard[]>>(`/api/v1/sellers/category/${slug}`),
};

export const adminApi = {
  login: (email: string, password: string) =>   
    api.post<ApiResponse<AuthResponse>>("/api/v1/admin/auth/login", { email, password }),
  dashboard: () => api.get<ApiResponse<DashboardStats>>("/api/v1/admin/dashboard/stats"),
  categories: () => api.get<ApiResponse<Category[]>>("/api/v1/admin/categories"),
  createCategory: (data: { name: string; icon?: string; status?: string }) =>
    api.post<ApiResponse<Category>>("/api/v1/admin/categories", data),
  updateCategory: (id: number, data: { name: string; icon?: string; status?: string }) =>
    api.put<ApiResponse<Category>>(`/api/v1/admin/categories/${id}`, data),
  deleteCategory: (id: number) => api.delete(`/api/v1/admin/categories/${id}`),
  sellers: () => api.get<ApiResponse<SellerDetail[]>>("/api/v1/admin/sellers"),   
  createSeller: (data: Record<string, unknown>) =>
    api.post<ApiResponse<SellerDetail>>("/api/v1/admin/sellers", data),
  updateSeller: (id: number, data: Record<string, unknown>) =>
    api.put<ApiResponse<SellerDetail>>(`/api/v1/admin/sellers/${id}`, data),
  deleteSeller: (id: number) => api.delete(`/api/v1/admin/sellers/${id}`),
  products: () => api.get<ApiResponse<Product[]>>("/api/v1/admin/products"),
  createProduct: (data: Record<string, unknown>) =>
    api.post<ApiResponse<Product>>("/api/v1/admin/products", data),
  updateProduct: (id: number, data: Record<string, unknown>) =>
    api.put<ApiResponse<Product>>(`/api/v1/admin/products/${id}`, data),
  deleteProduct: (id: number) => api.delete(`/api/v1/admin/products/${id}`),
};
     