import axios from "axios";
import { getAccessToken, setAccessToken } from "../utils/storage";
import { refreshToken } from "./auth.api";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,  // enables httpOnly cookie refresh tokens
});

// Attach access token on every request
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const newToken = await refreshToken();
      if (newToken) {
        setAccessToken(newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
