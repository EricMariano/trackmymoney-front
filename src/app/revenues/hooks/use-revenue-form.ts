"use client";

import { useCallback, useMemo, useState } from "react";

import { createRevenue } from "@/src/lib/revenues-api";
import { listCategories } from "@/src/lib/categories-api";
import type { Category } from "@/src/lib/categories-api";
import { todayDateOnly, toDateTimeString } from "@/src/lib/dates";

export type RevenueFormValues = {
  description: string;
  amount: string;
  date: string;
  categoryId: string | null;
};

export function useRevenueForm() {
  const [values, setValues] = useState<RevenueFormValues>({
    description: "",
    amount: "",
    date: todayDateOnly(),
    categoryId: null,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    const response = await listCategories({ pageSize: 100, type: "revenue" });
    setCategories(response.data);
  }, []);

  const setField = useCallback(
    <Key extends keyof RevenueFormValues>(field: Key, value: RevenueFormValues[Key]) => {
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
        await createRevenue({
          description: values.description,
          amount: Number(values.amount),
          date: toDateTimeString(values.date),
          categoryId: values.categoryId ? Number(values.categoryId) : null,
        });
        onSuccess?.();
        resetForm();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Não foi possível salvar a receita.";
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


