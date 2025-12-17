import type {
  LoginUser,
  RegisterUser,
  VerifyTokenResponse,
} from "@/types/user.type";
import axiosAuth from "./axiosAuth";

export const registerRequest = (user: RegisterUser) =>
  axiosAuth.post("/register", user);

export const loginRequest = (user: LoginUser) => axiosAuth.post("/login", user);

export const logoutRequest = () => axiosAuth.post("/logout");

export const verifyTokenRequest = () =>
  axiosAuth.get<VerifyTokenResponse>("/verifyToken");
