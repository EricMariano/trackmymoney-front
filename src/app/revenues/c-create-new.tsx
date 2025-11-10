"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { EllipsisVerticalIcon } from "lucide-react";

export function RevenuesCreateNew() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="solid"
          color="primary" 
        >
            Ações <EllipsisVerticalIcon className="w-5 h-5" /> 
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownItem key="new" shortcut="⌘N">
          Nova Receita
        </DropdownItem>
        <DropdownItem key="edit" shortcut="⌘⇧E">
          Gerenciar Categorias
        </DropdownItem>
        <DropdownItem key="export" shortcut="⌘⇧X">
          Exportar Receitas
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
