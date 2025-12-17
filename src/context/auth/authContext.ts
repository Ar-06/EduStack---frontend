import { createContext } from "react";

import type { User, RegisterUser, LoginUser } from "@/types/user.type";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  errors: string[];
  register: (data: RegisterUser) => Promise<void>;
  login: (data: LoginUser) => Promise<void>;
  logout: () => void;
  clearErrors: () => void;
  initialUsers: () => React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
