import { apiRequest } from "./api";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
};

export type LoginResponse = TokenResponse & {
  user: User;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

type SignupResponse = {
  user: User;
};

type RefreshPayload = {
  refreshToken: string;
};

export async function signup(payload: SignupPayload) {
  return apiRequest<SignupResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function login(payload: LoginPayload) {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function refreshSession(payload: RefreshPayload) {
  return apiRequest<LoginResponse>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function logout(payload: RefreshPayload) {
  return apiRequest<void>("/auth/logout", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

