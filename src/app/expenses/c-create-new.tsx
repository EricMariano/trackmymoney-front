"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { EllipsisVerticalIcon } from "lucide-react";

export function ExpensesCreateNew() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="solid"
          color="danger" 
        >
            Ações <EllipsisVerticalIcon className="w-5 h-5" /> 
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownItem key="new" shortcut="⌘N">
          Nova Despesa
        </DropdownItem>
        <DropdownItem key="edit" shortcut="⌘⇧E">
          Gerenciar Categorias
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
