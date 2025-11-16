"use client";

import { useMemo } from "react";
import useSWR from "swr";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { RefreshCw } from "lucide-react";

import { HomeCards } from "@/src/components/home/c-cards";
import { HomeDashboard } from "@/src/components/home/c-dashboard";
import { ExpensesCategorySlider } from "@/src/app/expenses/c-category-slider";
import {
  getMetricsOverview,
  MetricsOverviewResponse,
} from "@/src/lib/metrics-api";

export default function DashboardPage() {
  const {
    data: metrics,
    error,
    isValidating,
    mutate,
  } = useSWR<MetricsOverviewResponse>(
    "metrics-overview",
    getMetricsOverview,
    { revalidateOnFocus: false },
  );

  const isLoading = !metrics && !error;
  const errorMessage = error
    ? error instanceof Error
      ? error.message
      : "Erro ao carregar métricas. Tente novamente."
    : null;

  const topCategoriesData = useMemo(() => {
    if (!metrics) return [];

    const total = metrics.topCategories.reduce(
      (acc, item) => acc + item.total,
      0,
    );

    if (total === 0) {
      return metrics.topCategories.map((item) => ({
        category: item.categoryName,
        value: 0,
        percentage: 0,
      }));
    }

    return metrics.topCategories.map((item) => ({
      category: item.categoryName,
      value: item.total,
      percentage: Number(((item.total / total) * 100).toFixed(1)),
    }));
  }, [metrics]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-default-500">Visão consolidada</p>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <Button
          variant="flat"
          color="primary"
          startContent={<RefreshCw className="h-4 w-4" />}
          onPress={() => mutate()}
          isDisabled={isValidating}
        >
          Atualizar
        </Button>
      </div>

      {errorMessage && (
        <div className="rounded-large border border-danger-200 bg-danger-50 px-4 py-3 text-danger-700 dark:border-danger-500/40 dark:bg-danger-500/10 dark:text-danger-100">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <Spinner label="Carregando métricas..." />
        </div>
      ) : null}

      {metrics && (
        <div className="flex flex-col gap-6">
          <HomeCards totals={metrics.totals} />
          <HomeDashboard
            expenseSeries={metrics.monthly.expenses}
            revenueSeries={metrics.monthly.revenues}
          />
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-xl font-semibold">Categorias com mais gasto</h2>
              <p className="text-sm text-default-500">
                Use este ranking para priorizar reduções ou renegociações.
              </p>
            </div>
            <ExpensesCategorySlider data={topCategoriesData} />
          </div>
        </div>
      )}
    </div>
  );
}


