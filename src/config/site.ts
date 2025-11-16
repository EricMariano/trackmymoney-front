export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Meu Bolso",
  description: "Gerencie suas finanças de forma simples e eficiente.",
  navItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Investimentos",
      href: "/investments",
    },
    {
      label: "Receitas",
      href: "/revenues",
    },
    {
      label: "Despesas",
      href: "/expenses",
    },
  ],
};
