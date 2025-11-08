"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { LogoText } from "@/src/components/icons";
import { AvatarDropdown } from "./c-avatar-drop";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "./theme-switch";


export default function NavbarComponent() {
  const pathname = usePathname();

  return (
    <Navbar>
      <NavbarContent justify="start">
        <NavbarBrand>
          <LogoText />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href} isActive={pathname === item.href}>
            <Link 
              color={
                pathname === item.href 
                  ? item.href === "/expenses" 
                    ? "danger" 
                    : "primary"
                  : "foreground"
              }
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitch />
        <AvatarDropdown />
      </NavbarContent>
    </Navbar>
  );
}
