import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log("API_URL =", API_URL);

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  console.log("🚀 REQUEST");
  console.log("Method:", config.method);
  console.log("Base URL:", config.baseURL);
  console.log("Endpoint:", config.url);

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("✅ RESPONSE");
    console.log("Status:", response.status);
    console.log("URL:", response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ API ERROR");
    console.error(error.message);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}