"use client";

import { useMemo } from "react";
import useSWR from "swr";
import { Button } from "@heroui/button";
import { RefreshCw } from "lucide-react";

import { RevenuesCards } from "./c-cards";
import { RevenuesTable } from "./c-table";
import { RevenuesCreateNew } from "./c-create-new";
import { listRevenues } from "@/src/lib/revenues-api";
import { listCategories } from "@/src/lib/categories-api";
import type { IRevenue } from "@/src/app/interfaces/revenues";

type RevenuesViewData = {
  revenues: IRevenue[];
};

async function fetchRevenuesView(): Promise<RevenuesViewData> {
  const [revenuesResponse, categoriesResponse] = await Promise.all([
    listRevenues({ pageSize: 100, sortDirection: "desc" }),
    listCategories({ pageSize: 100 }),
  ]);

  const categoryMap = new Map(
    categoriesResponse.data.map((category) => [category.id, category.name]),
  );

  const revenues = revenuesResponse.data.map((revenue) => ({
    ...revenue,
    category: categoryMap.get(revenue.categoryId ?? -1) ?? "Sem categoria",
  }));

  return { revenues };
}

export default function RevenuesPage() {
  const {
    data,
    error,
    isValidating,
    mutate,
  } = useSWR<RevenuesViewData>("revenues-overview", fetchRevenuesView, {
    revalidateOnFocus: false,
  });

  const revenues = data?.revenues ?? [];
  const isLoading = !data && !error;
  const errorMessage = error
    ? error instanceof Error
      ? error.message
      : "Erro ao carregar receitas."
    : null;

  const totalIncome = useMemo(
    () => revenues.reduce((sum, revenue) => sum + revenue.amount, 0),
    [revenues],
  );

  const currentMonthIncome = useMemo(() => {
    const now = new Date();
    return revenues.reduce((sum, revenue) => {
      const revenueDate = new Date(revenue.date);
      if (
        revenueDate.getMonth() === now.getMonth() &&
        revenueDate.getFullYear() === now.getFullYear()
      ) {
        return sum + revenue.amount;
      }
      return sum;
    }, 0);
  }, [revenues]);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Receitas</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="flat"
            color="default"
            startContent={<RefreshCw className="h-4 w-4" />}
            onPress={() => mutate()}
            isDisabled={isValidating}
          >
            Atualizar
          </Button>
          <RevenuesCreateNew onCreated={() => mutate()} />
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-large border border-danger-200 bg-danger-50 px-4 py-3 text-danger-700 dark:border-danger-500/40 dark:bg-danger-500/10 dark:text-danger-100">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <RevenuesCards
          totalIncome={totalIncome}
          currentMonthIncome={currentMonthIncome}
          transactionsCount={revenues.length}
        />
        <RevenuesTable data={revenues} isLoading={isLoading} />
      </div>
    </>
  );
}