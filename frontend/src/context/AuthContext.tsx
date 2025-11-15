import type { User } from "../types/user.types";
import { createContext } from "react";

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  login: (data: { accessToken: string; user: User }) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  login: () => {},
  logout: () => {},
});
