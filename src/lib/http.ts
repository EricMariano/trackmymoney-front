"use client";

type QueryValue = string | number | boolean | undefined | null;

export function buildQueryString(params?: Record<string, QueryValue>) {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    searchParams.append(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}


