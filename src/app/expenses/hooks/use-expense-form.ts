"use client";

import { useCallback, useMemo, useState } from "react";

import { createExpense } from "@/src/lib/expenses-api";
import { listCategories } from "@/src/lib/categories-api";
import type { Category } from "@/src/lib/categories-api";
import { todayDateOnly, toDateTimeString } from "@/src/lib/dates";

export type ExpenseFormValues = {
  description: string;
  amount: string;
  date: string;
  categoryId: string | null;
};

export function useExpenseForm() {
  const [values, setValues] = useState<ExpenseFormValues>({
    description: "",
    amount: "",
    date: todayDateOnly(),
    categoryId: null,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    const response = await listCategories({ pageSize: 100, type: "expense" });
    setCategories(response.data);
  }, []);

  const setField = useCallback(
    <Key extends keyof ExpenseFormValues>(field: Key, value: ExpenseFormValues[Key]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const resetForm = useCallback(() => {
    setValues({
      description: "",
      amount: "",
      date: todayDateOnly(),
      categoryId: null,
    });
    setSubmitError(null);
  }, []);

  const submit = useCallback(
    async (onSuccess?: () => void) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        await createExpense({
          description: values.description,
          amount: Number(values.amount),
          date: toDateTimeString(values.date),
          categoryId: values.categoryId ? Number(values.categoryId) : null,
        });
        onSuccess?.();
        resetForm();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Não foi possível salvar a despesa.";
        setSubmitError(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, resetForm],
  );

  const canSubmit = useMemo(() => {
    return (
      values.description.trim().length > 0 &&
      Number(values.amount) > 0 &&
      Boolean(values.date)
    );
  }, [values]);

  return {
    values,
    categories,
    isSubmitting,
    submitError,
    canSubmit,
    loadCategories,
    setField,
    submit,
    resetForm,
  };
}


