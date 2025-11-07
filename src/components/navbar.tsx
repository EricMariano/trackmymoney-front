"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { SparklesIcon } from "@/src/components/icons";
import { LogoText } from "@/src/components/icons";
import { useState, useEffect } from "react";
import { AvatarDropdown } from "./c-avatar-drop";


export default function NavbarComponent() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <Navbar>
      <NavbarContent justify="start">
        <NavbarBrand>
          <LogoText />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={activeTab === "home"}>
          <Link className="text-primarydark" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Receitas
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Despesas
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Investimentos
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <AvatarDropdown />
      </NavbarContent>
    </Navbar>
  );
}
