import { DropdownItem, Dropdown, DropdownMenu, DropdownTrigger } from "@heroui/dropdown"
import { Avatar } from "@heroui/avatar"

export function AvatarDropdown() {
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

        <DropdownMenu aria-label="Profile Actions" variant="flat" disabledKeys={["profile"]}>
          <DropdownItem key="profile" textValue="profile" className="h-14 gap-2">
            <p>Login feito como</p>
            <p>ana@example.com</p>
          </DropdownItem>
          
          <DropdownItem key="configurations" textValue="configurations">Configurações</DropdownItem>
          
          <DropdownItem key="help_and_feedback" textValue="help_and_feedback">Ajuda & Feedback</DropdownItem>
          
          <DropdownItem key="logout" textValue="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
}