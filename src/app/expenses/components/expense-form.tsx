"use client";

import { useEffect } from "react";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";

import { useExpenseForm } from "../hooks/use-expense-form";

type ExpenseFormProps = {
  onSuccess?: () => void;
};

export function ExpenseForm({ onSuccess }: ExpenseFormProps) {
  const {
    values,
    categories,
    isSubmitting,
    submitError,
    canSubmit,
    loadCategories,
    setField,
    submit,
  } = useExpenseForm();

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        submit(onSuccess);
      }}
    >
      <Input
        label="Descrição"
        isRequired
        value={values.description}
        onValueChange={(value) => setField("description", value)}
        placeholder="Ex.: Assinatura streaming"
      />

      <Input
        label="Valor"
        isRequired
        type="number"
        min={0}
        value={values.amount}
        onValueChange={(value) => setField("amount", value)}
        startContent={<span className="text-default-400">R$</span>}
      />

      <Input
        label="Data"
        type="date"
        isRequired
        value={values.date}
        onValueChange={(value) => setField("date", value)}
      />

      <Select
        label="Categoria"
        placeholder="Selecione"
        selectedKeys={values.categoryId ? [values.categoryId] : []}
        onSelectionChange={(selection) => {
          const key = Array.from(selection)[0] as string | undefined;
          setField("categoryId", key ?? null);
        }}
      >
        {categories.map((category) => (
          <SelectItem key={String(category.id)}>{category.name}</SelectItem>
        ))}
      </Select>

      {submitError && (
        <p className="text-sm text-danger-500">{submitError}</p>
      )}

      <Button
        type="submit"
        color="danger"
        isDisabled={!canSubmit || isSubmitting}
        isLoading={isSubmitting}
      >
        Salvar despesa
      </Button>
    </form>
  );
}


