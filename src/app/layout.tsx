import "@/src/lib/storage-polyfill";
import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Button } from "@heroui/button";
import { SparklesIcon } from "@/src/components/icons";
import { useMobile } from "@/src/hooks/use-mobile";

import { Providers } from "./providers";

import { siteConfig } from "@/src/config/site";
import { fontSans } from "@/src/config/fonts";
import NavbarComponent from "@/src/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <NavbarComponent />
            <main className="w-full pt-10 px-6 flex-grow">
              {children}
              <div className="flex items-center justify-end fixed bottom-0 right-0 p-6">
                <Button
                  isIconOnly
                  className="shadow-lg"
                  radius="full"
                  variant="light"
                > 
                  <SparklesIcon /> 
                </Button>
            </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
