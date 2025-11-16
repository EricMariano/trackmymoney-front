"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { useRouter } from "next/navigation";

import { signup } from "@/src/lib/auth-api";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setIsLoading(true);

    try {
      await signup({ name, email, password });
      router.push("/?registered=1");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Não foi possível concluir seu cadastro.";
      setFormError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitDisabled =
    !name || !email || password.length < 8 || isLoading;

  return (
    <section className="flex flex-1 items-center justify-center py-12">
      <Card className="w-full max-w-md border border-default-100 bg-content1/60 backdrop-blur">
        <CardHeader className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold">Crie sua conta</h1>
          <p className="text-sm text-default-500">
            Comece a organizar suas finanças em poucos minutos.
          </p>
        </CardHeader>

        <Divider />

        <CardBody className="flex flex-col gap-6">
          {formError && (
            <p className="rounded-medium bg-danger-50 px-4 py-3 text-sm text-danger-700 dark:bg-danger-100/10 dark:text-danger-300">
              {formError}
            </p>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              isRequired
              label="Nome completo"
              labelPlacement="outside"
              placeholder="Ana Carolina"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <Input
              isRequired
              label="E-mail"
              labelPlacement="outside"
              placeholder="voce@exemplo.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              isRequired
              label="Senha"
              labelPlacement="outside"
              placeholder="Mínimo de 8 caracteres"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              description="Deve ter ao menos 8 caracteres."
            />

            <Button
              color="primary"
              type="submit"
              isLoading={isLoading}
              isDisabled={isSubmitDisabled}
            >
              Criar conta
            </Button>
          </form>

          <p className="text-center text-sm text-default-500">
            Já tem uma conta?{" "}
            <Link color="primary" href="/" underline="always">
              Fazer login
            </Link>
          </p>
        </CardBody>
      </Card>
    </section>
  );
}


