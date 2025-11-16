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

import { RevenueForm } from "@/src/app/revenues/components/revenue-form";
import { CategoriesManager } from "@/src/components/categories/categories-manager";

type ActionKey = "new-revenue" | "manage-categories";

type RevenuesCreateNewProps = {
  onCreated?: () => void;
};

export function RevenuesCreateNew({ onCreated }: RevenuesCreateNewProps) {
  const [openAction, setOpenAction] = useState<ActionKey | null>(null);

  const closeModal = () => setOpenAction(null);

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="solid" color="primary">
            Ações <EllipsisVerticalIcon className="w-5 h-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="flat"
          onAction={(key) => setOpenAction(key as ActionKey)}
        >
          <DropdownItem key="new-revenue" shortcut="⌘N">
            Nova Receita
          </DropdownItem>
          <DropdownItem key="manage-categories" shortcut="⌘⇧E">
            Gerenciar Categorias
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
        isOpen={openAction === "new-revenue"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <ModalContent>
          <ModalHeader>Nova receita</ModalHeader>
          <ModalBody>
            <RevenueForm
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
            <CategoriesManager typeFilter="revenue" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
