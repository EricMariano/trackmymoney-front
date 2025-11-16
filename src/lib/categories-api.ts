"use client";

import { authorizedRequest } from "./authenticated-request";
import { buildQueryString } from "./http";

export type Category = {
  id: number;
  name: string;
  type: string;
  color: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CategoryListResponse = {
  data: Category[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
  };
};

export type ListCategoriesQuery = {
  type?: string;
  search?: string;
  page?: number;
  pageSize?: number;
};

export type CreateCategoryPayload = {
  name: string;
  type: string;
  color?: string | null;
};

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;

export async function listCategories(query?: ListCategoriesQuery) {
  const queryString = buildQueryString({
    type: query?.type,
    search: query?.search,
    page: query?.page,
    pageSize: query?.pageSize,
  });

  return authorizedRequest<CategoryListResponse>(
    `/categories${queryString}`,
  );
}

export async function createCategory(payload: CreateCategoryPayload) {
  return authorizedRequest<{ id: number }>("/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateCategory(
  id: number,
  payload: UpdateCategoryPayload,
) {
  return authorizedRequest<Category>(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteCategory(id: number) {
  return authorizedRequest<void>(`/categories/${id}`, {
    method: "DELETE",
  });
}


