"use client";

import { ApiError, apiRequest, ApiRequestOptions } from "./api";
import { LoginResponse, refreshSession } from "./auth-api";
import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  persistSession,
  TokenPair,
} from "./auth-storage";

type AuthorizedRequestOptions = ApiRequestOptions;

let refreshPromise: Promise<LoginResponse | null> | null = null;

function buildAuthHeaders(
  headers: Record<string, string> = {},
  token: string,
) {
  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
}

function toTokenPair(response: LoginResponse): TokenPair {
  return {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
    refreshTokenExpiresAt: response.refreshTokenExpiresAt,
  };
}

async function refreshTokens() {
  if (refreshPromise) {
    return refreshPromise;
  }

  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearSession();
    return null;
  }

  refreshPromise = (async () => {
    try {
      const response = await refreshSession({ refreshToken });
      persistSession({
        tokens: toTokenPair(response),
        user: response.user,
      });
      return response;
    } catch (error) {
      clearSession();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function authorizedRequest<TResponse>(
  path: string,
  options: AuthorizedRequestOptions = {},
) {
  const accessToken = getAccessToken();

  if (!accessToken) {
    clearSession();
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  try {
    return await apiRequest<TResponse>(path, {
      ...options,
      headers: buildAuthHeaders(options.headers, accessToken),
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      const refreshed = await refreshTokens();

      if (!refreshed) {
        throw new Error("Sessão expirada. Faça login novamente.");
      }

      return apiRequest<TResponse>(path, {
        ...options,
        headers: buildAuthHeaders(
          options.headers,
          refreshed.accessToken,
        ),
      });
    }

    throw error;
  }
}


