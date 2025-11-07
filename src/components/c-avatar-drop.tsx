"use client";

import { DropdownItem, Dropdown, DropdownMenu, DropdownTrigger } from "@heroui/dropdown"
import { Avatar } from "@heroui/avatar"
import { useRouter } from "next/navigation"

export function AvatarDropdown() {
  const router = useRouter();

  const handleAction = (key: string | number) => {
    router.push(key.toString());
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="primary"
          name="Ana Carolina"
          size="sm"
        />
      </DropdownTrigger>

      <DropdownMenu 
        aria-label="Profile Actions" 
        variant="flat" 
        disabledKeys={["profile"]}
        onAction={handleAction}
      >
        <DropdownItem key="profile" textValue="profile" className="h-14 gap-2">
          <p className="font-semibold">Login feito como</p>
          <p className="font-semibold">ana@example.com</p>
        </DropdownItem>
        <DropdownItem key="/profile" textValue="Profile">
          Perfil
        </DropdownItem>
        <DropdownItem key="/settings" textValue="Settings">
          Configurações
        </DropdownItem>
        <DropdownItem key="/help-feedback" textValue="Help & Feedback">
          Ajuda & Feedback
        </DropdownItem>
        <DropdownItem key="/logout" textValue="Logout" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}