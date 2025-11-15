import { useState, useEffect, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";
import { getAccessToken, setAccessToken, clearTokens } from "../utils/storage";
import { refreshToken } from "../services/auth.api";
import type { User } from "../types/user.types";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setToken] = useState<string | null>(getAccessToken());

  useEffect(() => {
    (async () => {
      const newToken = await refreshToken();
      if (newToken) {
        setToken(newToken);
        setAccessToken(newToken);
      }
    })();
  }, []);

  const login = (data: { accessToken: string; user: User }) => {
    setUser(data.user);
    setToken(data.accessToken);
    setAccessToken(data.accessToken);
  };

  const logout = () => {
    clearTokens();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
