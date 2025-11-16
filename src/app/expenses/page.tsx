"use client";

import { useMemo } from "react";
import useSWR from "swr";
import { Button } from "@heroui/button";
import { RefreshCw } from "lucide-react";

import { ExpensesCards } from "./c-cards";
import { ExpensesTable } from "./c-table";
import { ExpensesCreateNew } from "./c-create-new";
import { ExpensesCategorySlider } from "./c-category-slider";
import { listExpenses } from "@/src/lib/expenses-api";
import { listCategories } from "@/src/lib/categories-api";
import type { IExpense } from "@/src/app/interfaces/expenses";

type ExpensesViewData = {
  expenses: IExpense[];
};

async function fetchExpensesView(): Promise<ExpensesViewData> {
  const [expensesResponse, categoriesResponse] = await Promise.all([
    listExpenses({ pageSize: 100, sortDirection: "desc" }),
    listCategories({ pageSize: 100 }),
  ]);

  const categoryMap = new Map(
    categoriesResponse.data.map((category) => [category.id, category.name]),
  );

  const expenses = expensesResponse.data.map((expense) => ({
    ...expense,
    category: categoryMap.get(expense.categoryId ?? -1) ?? "Sem categoria",
  }));

  return { expenses };
}

export default function ExpensesPage() {
  const {
    data,
    error,
    isValidating,
    mutate,
  } = useSWR<ExpensesViewData>("expenses-overview", fetchExpensesView, {
    revalidateOnFocus: false,
  });

  const expenses = data?.expenses ?? [];
  const isLoading = !data && !error;
  const errorMessage = error
    ? error instanceof Error
      ? error.message
      : "Erro ao carregar despesas."
    : null;

  const totalSpent = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses],
  );

  const currentMonthSpent = useMemo(() => {
    const now = new Date();
    return expenses.reduce((sum, expense) => {
      const expenseDate = new Date(expense.date);
      if (
        expenseDate.getMonth() === now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      ) {
        return sum + expense.amount;
      }
      return sum;
    }, 0);
  }, [expenses]);

  const categorySliderData = useMemo(() => {
    if (expenses.length === 0) return [];

    const totals = expenses.reduce<Map<string, number>>((acc, expense) => {
      const key = expense.category || "Sem categoria";
      acc.set(key, (acc.get(key) ?? 0) + expense.amount);
      return acc;
    }, new Map());

    const generalTotal = Array.from(totals.values()).reduce(
      (sum, value) => sum + value,
      0,
    );

    return Array.from(totals.entries()).map(([category, value]) => ({
      category,
      value,
      percentage:
        generalTotal === 0 ? 0 : Number(((value / generalTotal) * 100).toFixed(1)),
    }));
  }, [expenses]);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Despesas</h1>
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
          <ExpensesCreateNew onCreated={() => mutate()} />
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-large border border-danger-200 bg-danger-50 px-4 py-3 text-danger-700 dark:border-danger-500/40 dark:bg-danger-500/10 dark:text-danger-100">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <ExpensesCards
          totalSpent={totalSpent}
          currentMonthSpent={currentMonthSpent}
          transactionsCount={expenses.length}
        />
        <ExpensesCategorySlider data={categorySliderData} />
        <ExpensesTable data={expenses} isLoading={isLoading} />
      </div>
    </>
  );
}