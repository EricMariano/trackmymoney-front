const ACCESS_TOKEN_KEY = "trackmymoney:accessToken";
const REFRESH_TOKEN_KEY = "trackmymoney:refreshToken";
const REFRESH_EXPIRES_AT_KEY = "trackmymoney:refreshTokenExpiresAt";
const USER_KEY = "trackmymoney:user";

const AUTH_CHANGE_EVENT = "trackmymoney:auth-change";

const isBrowser = typeof window !== "undefined";

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
};

export type StoredUser = {
  id: number;
  name: string;
  email: string;
};

function emitAuthChange() {
  if (!isBrowser) return;
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function persistTokenPair(tokenPair: TokenPair, emitEvent = true) {
  if (!isBrowser) return;

  localStorage.setItem(ACCESS_TOKEN_KEY, tokenPair.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokenPair.refreshToken);
  localStorage.setItem(
    REFRESH_EXPIRES_AT_KEY,
    tokenPair.refreshTokenExpiresAt,
  );

  if (emitEvent) {
    emitAuthChange();
  }
}

export function persistUser(user: StoredUser, emitEvent = true) {
  if (!isBrowser) return;

  localStorage.setItem(USER_KEY, JSON.stringify(user));

  if (emitEvent) {
    emitAuthChange();
  }
}

export function persistSession({
  tokens,
  user,
}: {
  tokens: TokenPair;
  user: StoredUser;
}) {
  persistTokenPair(tokens, false);
  persistUser(user, false);
  emitAuthChange();
}

export function getAccessToken() {
  if (!isBrowser) return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  if (!isBrowser) return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getRefreshTokenExpiry() {
  if (!isBrowser) return null;
  return localStorage.getItem(REFRESH_EXPIRES_AT_KEY);
}

export function getStoredUser(): StoredUser | null {
  if (!isBrowser) return null;
  const payload = localStorage.getItem(USER_KEY);
  if (!payload) return null;

  try {
    return JSON.parse(payload) as StoredUser;
  } catch {
    return null;
  }
}

export function clearTokens(emitEvent = true) {
  if (!isBrowser) return;

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_EXPIRES_AT_KEY);

  if (emitEvent) {
    emitAuthChange();
  }
}

export function clearStoredUser(emitEvent = true) {
  if (!isBrowser) return;
  localStorage.removeItem(USER_KEY);

  if (emitEvent) {
    emitAuthChange();
  }
}

export function clearSession() {
  if (!isBrowser) return;
  clearTokens(false);
  clearStoredUser(false);
  emitAuthChange();
}

export function subscribeToAuthChanges(handler: () => void) {
  if (!isBrowser) return () => undefined;

  window.addEventListener(AUTH_CHANGE_EVENT, handler);
  return () => window.removeEventListener(AUTH_CHANGE_EVENT, handler);
}

