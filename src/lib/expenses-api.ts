"use client";

import type { IExpense } from "@/src/app/interfaces/expenses";
import { authorizedRequest } from "./authenticated-request";
import { buildQueryString } from "./http";

export type ExpenseListResponse = {
  data: IExpense[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
  };
};

export type ListExpensesQuery = {
  categoryId?: number;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  sortDirection?: "asc" | "desc";
};

export type CreateExpensePayload = {
  description: string;
  amount: number;
  date: string;
  categoryId?: number | null;
  aiCategorized?: boolean;
};

export type UpdateExpensePayload = Partial<CreateExpensePayload>;

export async function listExpenses(query?: ListExpensesQuery) {
  const queryString = buildQueryString({
    categoryId: query?.categoryId,
    startDate: query?.startDate,
    endDate: query?.endDate,
    search: query?.search,
    page: query?.page,
    pageSize: query?.pageSize,
    sortDirection: query?.sortDirection,
  });

  return authorizedRequest<ExpenseListResponse>(`/expenses${queryString}`);
}

export async function createExpense(payload: CreateExpensePayload) {
  return authorizedRequest<{ id: number }>("/expenses", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateExpense(
  id: number,
  payload: UpdateExpensePayload,
) {
  return authorizedRequest<IExpense>(`/expenses/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteExpense(id: number) {
  return authorizedRequest<void>(`/expenses/${id}`, {
    method: "DELETE",
  });
}


