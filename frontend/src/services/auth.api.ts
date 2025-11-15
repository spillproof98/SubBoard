import api from "./api";
import type { LoginPayload, RegisterPayload, AuthResponse } from "../types/auth.type";

export async function loginApi(data: LoginPayload): Promise<AuthResponse> {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export async function registerApi(data: RegisterPayload): Promise<AuthResponse> {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export async function refreshToken(): Promise<string | null> {
  try {
    const res = await api.post("/auth/refresh");
    return res.data.accessToken;
  } catch {
    return null;
  }
}
