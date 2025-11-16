"use client";

import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Pencil, Plus, RefreshCcw } from "lucide-react";

import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from "@/src/lib/categories-api";

type Props = {
  typeFilter?: "expense" | "revenue";
};

const CATEGORY_TYPES = [
  { label: "Receita", value: "revenue" },
  { label: "Despesa", value: "expense" },
];

export function CategoriesManager({ typeFilter }: Props) {
  const {
    data,
    error,
    isValidating,
    mutate: refresh,
  } = useSWR(["categories", typeFilter], () =>
    listCategories({ type: typeFilter, pageSize: 100 }),
  );

  const [formValues, setFormValues] = useState({
    id: null as number | null,
    name: "",
    type: typeFilter ?? "expense",
    color: "#9333ea",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = data?.data ?? [];

  const openForCreate = () => {
    setFormValues({
      id: null,
      name: "",
      type: typeFilter ?? "expense",
      color: "#9333ea",
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openForEdit = (id: number) => {
    const category = categories.find((item) => item.id === id);
    if (!category) return;
    setFormValues({
      id: category.id,
      name: category.name,
      type: category.type,
      color: category.color ?? "#9333ea",
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formValues.name.trim()) {
      setFormError("Nome é obrigatório.");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    try {
      if (formValues.id) {
        await updateCategory(formValues.id, {
          name: formValues.name,
          type: formValues.type,
          color: formValues.color,
        });
      } else {
        await createCategory({
          name: formValues.name,
          type: formValues.type,
          color: formValues.color,
        });
      }
      setIsModalOpen(false);
      await refresh();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Não foi possível salvar a categoria.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const typeOptions = useMemo(() => {
    if (typeFilter) {
      return CATEGORY_TYPES.filter((item) => item.value === typeFilter);
    }
    return CATEGORY_TYPES;
  }, [typeFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-default-500">
            Administre os tipos que aparecem nos formulários.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="flat"
            startContent={<RefreshCcw className="h-4 w-4" />}
            onPress={() => refresh()}
            isDisabled={isValidating}
          >
            Atualizar
          </Button>
          <Button
            color="secondary"
            size="sm"
            startContent={<Plus className="h-4 w-4" />}
            onPress={openForCreate}
          >
            Nova categoria
          </Button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-danger-500">
          {error instanceof Error
            ? error.message
            : "Não foi possível carregar categorias."}
        </p>
      )}

      <Table aria-label="Categorias">
        <TableHeader>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Tipo</TableColumn>
          <TableColumn>Cor</TableColumn>
          <TableColumn />
        </TableHeader>
        <TableBody
          emptyContent={
            isValidating ? "Carregando..." : "Nenhuma categoria encontrada."
          }
        >
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                {category.type === "revenue" ? "Receita" : "Despesa"}
              </TableCell>
              <TableCell>
                {category.color ? (
                  <span
                    className="inline-flex h-4 w-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="light"
                  isIconOnly
                  onPress={() => openForEdit(category.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          <ModalHeader>
            {formValues.id ? "Editar categoria" : "Nova categoria"}
          </ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            <Input
              label="Nome"
              value={formValues.name}
              onValueChange={(value) =>
                setFormValues((prev) => ({ ...prev, name: value }))
              }
              isRequired
            />

            <Select
              label="Tipo"
              selectedKeys={[formValues.type]}
              onSelectionChange={(selection) => {
                const key = Array.from(selection)[0];
                if (typeof key === "string") {
                  setFormValues((prev) => ({ ...prev, type: key }));
                }
              }}
            >
              {typeOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>

            <Input
              type="color"
              label="Cor"
              value={formValues.color ?? "#9333ea"}
              onValueChange={(value) =>
                setFormValues((prev) => ({ ...prev, color: value }))
              }
            />

            {formError && (
              <p className="text-sm text-danger-500">{formError}</p>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="light" onPress={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}


