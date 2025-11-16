"use client";

import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { EllipsisVerticalIcon } from "lucide-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/modal";

import { ExpenseForm } from "@/src/app/expenses/components/expense-form";
import { CategoriesManager } from "@/src/components/categories/categories-manager";

type ActionKey = "new-expense" | "manage-categories";

type ExpensesCreateNewProps = {
  onCreated?: () => void;
};

export function ExpensesCreateNew({ onCreated }: ExpensesCreateNewProps) {
  const [openAction, setOpenAction] = useState<ActionKey | null>(null);

  const closeModal = () => setOpenAction(null);

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="solid" color="danger">
            Ações <EllipsisVerticalIcon className="w-5 h-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="flat"
          onAction={(key) => setOpenAction(key as ActionKey)}
        >
          <DropdownItem key="new-expense" shortcut="⌘N">
            Nova Despesa
          </DropdownItem>
          <DropdownItem key="manage-categories" shortcut="⌘⇧E">
            Gerenciar Categorias
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
        isOpen={openAction === "new-expense"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <ModalContent>
          <ModalHeader>Nova despesa</ModalHeader>
          <ModalBody>
            <ExpenseForm
              onSuccess={() => {
                onCreated?.();
                closeModal();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        size="xl"
        isOpen={openAction === "manage-categories"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <ModalContent>
          <ModalHeader>Gerenciar categorias</ModalHeader>
          <ModalBody>
            <CategoriesManager typeFilter="expense" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
