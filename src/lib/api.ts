const DEFAULT_API_BASE_URL = "http://localhost:8080";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE_URL;

export type ApiRequestOptions = RequestInit & {
  headers?: Record<string, string>;
};

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
    this.name = "ApiError";
  }
}

export async function apiRequest<TResponse>(
  path: string,
  { headers, ...options }: ApiRequestOptions = {},
): Promise<TResponse> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && "message" in payload
        ? String(payload.message)
        : `Erro ao chamar ${path}`;

    throw new ApiError(message, response.status, payload);
  }

  return payload as TResponse;
}

