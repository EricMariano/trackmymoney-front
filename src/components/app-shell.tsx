"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";

import NavbarComponent from "@/src/components/navbar";
import { SparklesIcon } from "@/src/components/icons";
import { useAuth } from "@/src/contexts/auth-context";

const AUTH_ROUTES = new Set(["/", "/signup", "/login"]);

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useAuth();

  const isAuthRoute = useMemo(
    () => AUTH_ROUTES.has(pathname ?? ""),
    [pathname],
  );

  useEffect(() => {
    if (!isAuthRoute && status === "unauthenticated") {
      router.replace("/");
    }
  }, [isAuthRoute, status, router]);

  if (!isAuthRoute && status !== "authenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner label="Carregando sua conta..." />
      </div>
    );
  }

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex h-screen flex-col">
      <NavbarComponent />
      <main className="flex-grow px-6 pt-10">{children}</main>
      <div className="fixed bottom-0 right-0 p-6">
        <Button isIconOnly className="shadow-lg" radius="full" variant="light">
          <SparklesIcon />
        </Button>
      </div>
    </div>
  );
}


