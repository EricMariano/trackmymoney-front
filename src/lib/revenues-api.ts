"use client";

import type { IRevenue } from "@/src/app/interfaces/revenues";
import { authorizedRequest } from "./authenticated-request";
import { buildQueryString } from "./http";

export type RevenueListResponse = {
  data: IRevenue[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
  };
};

export type ListRevenuesQuery = {
  categoryId?: number;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  sortDirection?: "asc" | "desc";
};

export type CreateRevenuePayload = {
  description: string;
  amount: number;
  date: string;
  categoryId?: number | null;
};

export type UpdateRevenuePayload = Partial<CreateRevenuePayload>;

export async function listRevenues(query?: ListRevenuesQuery) {
  const queryString = buildQueryString({
    categoryId: query?.categoryId,
    startDate: query?.startDate,
    endDate: query?.endDate,
    search: query?.search,
    page: query?.page,
    pageSize: query?.pageSize,
    sortDirection: query?.sortDirection,
  });

  return authorizedRequest<RevenueListResponse>(`/revenues${queryString}`);
}

export async function createRevenue(payload: CreateRevenuePayload) {
  return authorizedRequest<{ id: number }>("/revenues", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteRevenue(id: number) {
  return authorizedRequest<void>(`/revenues/${id}`, {
    method: "DELETE",
  });
}

export async function updateRevenue(
  id: number,
  payload: UpdateRevenuePayload,
) {
  return authorizedRequest<IRevenue>(`/revenues/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}


