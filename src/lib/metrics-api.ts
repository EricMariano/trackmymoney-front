"use client";

import { authorizedRequest } from "./authenticated-request";

export type MetricsOverviewResponse = {
  totals: {
    revenues: number;
    expenses: number;
    net: number;
  };
  monthly: {
    revenues: { month: string; total: number }[];
    expenses: { month: string; total: number }[];
  };
  topCategories: {
    categoryId: number | null;
    categoryName: string;
    total: number;
  }[];
};

export async function getMetricsOverview() {
  return authorizedRequest<MetricsOverviewResponse>("/metrics/overview");
}


