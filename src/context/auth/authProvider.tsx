import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyTokenRequest,
} from "@/api/auth/auth";
import type { LoginUser, RegisterUser, User } from "@/types/user.type";
import { toast } from "@pheralb/toast";
import type { AxiosError } from "axios";
import { AuthContext } from "./authContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const clearErrors = () => setErrors([]);

  const register = async (data: RegisterUser) => {
    try {
      setErrors([]);

      await registerRequest(data);
      toast.success({ text: "Registro exitoso, Inicia sesión" });
      navigate("/login");
    } catch (err: unknown) {
      const error = err as AxiosError<{
        errors?: string[];
        message?: string;
      }>;

      if (Array.isArray(error.response?.data?.errors)) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(["Error inesperado en el servidor"]);
      }
    }
  };

  const login = async (data: LoginUser) => {
    try {
      setErrors([]);

      const res = await loginRequest(data);
      setUser(res.data.usuario);
      setIsAuthenticated(true);
      const nombreMostrar = res.data.usuario.nombre;
      toast.success({ text: `Bienvenido ${nombreMostrar}` });
      navigate("/");
    } catch (err: unknown) {
      const error = err as AxiosError<{
        errors?: string[];
        message?: string;
      }>;

      if (Array.isArray(error.response?.data?.errors)) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(["Error inesperado en el servidor"]);
      }
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await verifyTokenRequest();
        if (!res.data?.usuario) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setUser(res.data.usuario);
        setIsAuthenticated(true);
      } catch (error) {
        Promise.reject(error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const initialUsers = () => {
    if (!user?.nombre) return "👤";

    return user.nombre
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        errors,
        register,
        login,
        logout,
        clearErrors,
        initialUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
