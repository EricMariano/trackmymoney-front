"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  login as loginRequest,
  LoginPayload,
  logout as logoutRequest,
} from "@/src/lib/auth-api";
import {
  clearSession,
  clearStoredUser,
  clearTokens,
  getAccessToken,
  getRefreshToken,
  getStoredUser,
  persistSession,
  StoredUser,
  subscribeToAuthChanges,
} from "@/src/lib/auth-storage";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  user: StoredUser | null;
  status: AuthStatus;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("checking");

  const syncFromStorage = useCallback(() => {
    const storedUser = getStoredUser();
    const hasSession = Boolean(getAccessToken() && getRefreshToken());

    if (storedUser && hasSession) {
      setUser(storedUser);
      setStatus("authenticated");
      return;
    }

    setUser(null);
    clearTokens(false);
    clearStoredUser(false);
    setStatus("unauthenticated");
  }, []);

  useEffect(() => {
    syncFromStorage();
    const unsubscribe = subscribeToAuthChanges(syncFromStorage);
    return () => {
      unsubscribe?.();
    };
  }, [syncFromStorage]);

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await loginRequest(payload);

    persistSession({
      tokens: {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        refreshTokenExpiresAt: response.refreshTokenExpiresAt,
      },
      user: response.user,
    });
    setUser(response.user);
    setStatus("authenticated");
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken();

    if (refreshToken) {
      try {
        await logoutRequest({ refreshToken });
      } catch {
        // best effort logout
      }
    }

    clearSession();
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      login,
      logout,
    }),
    [user, status, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}


