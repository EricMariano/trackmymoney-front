"use client";

import { Card, CardBody } from "@heroui/card";
import {
  WalletIcon,
  BanknoteArrowUpIcon,
  BanknoteArrowDownIcon,
  PiggyBankIcon,
} from "@/src/components/icons";
import { formatCurrency } from "@/src/lib/formatters";

type HomeCardsProps = {
  totals: {
    net: number;
    revenues: number;
    expenses: number;
  };
};

function savingsRate(revenues: number, expenses: number) {
  if (revenues <= 0) return 0;
  return Math.max(0, ((revenues - expenses) / revenues) * 100);
}

export function HomeCards({ totals }: HomeCardsProps) {
  const rate = savingsRate(totals.revenues, totals.expenses);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
        <CardBody className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
              <WalletIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-emerald-100">Saldo consolidado</p>
              <p className="text-2xl font-bold">{formatCurrency(totals.net)}</p>
            </div>
          </div>
          <p className="text-sm text-emerald-100">
            {totals.net >= 0 ? "Você está no positivo" : "Atenção: saldo negativo"}
          </p>
        </CardBody>
      </Card>

      <Card className="border border-default-200 transition-shadow hover:shadow-lg">
        <CardBody className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
              <BanknoteArrowUpIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-default-600">Receitas</p>
              <p className="text-2xl font-bold">
                {formatCurrency(totals.revenues)}
              </p>
            </div>
          </div>
          <p className="text-sm text-emerald-600">Tudo que entrou no período</p>
        </CardBody>
      </Card>

      <Card className="border border-default-200 transition-shadow hover:shadow-lg">
        <CardBody className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
              <BanknoteArrowDownIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-default-600">Despesas</p>
              <p className="text-2xl font-bold">
                {formatCurrency(totals.expenses)}
              </p>
            </div>
          </div>
          <p className="text-sm text-red-600">Valor total gasto</p>
        </CardBody>
      </Card>

      <Card className="border border-default-200 transition-shadow hover:shadow-lg">
        <CardBody className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100">
              <PiggyBankIcon className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-default-600">Taxa de poupança</p>
              <p className="text-2xl font-bold">{rate.toFixed(1)}%</p>
            </div>
          </div>
          <p className="text-sm text-default-500">
            Percentual das receitas que ficou com você
          </p>
        </CardBody>
      </Card>
    </div>
  );
}