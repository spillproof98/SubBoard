import api from "../services/api";
import { getAccessToken } from "../utils/storage";

export function useAxiosAuth() {
  const token = getAccessToken();
  api.defaults.headers.Authorization = token ? `Bearer ${token}` : "";
  return api;
}
