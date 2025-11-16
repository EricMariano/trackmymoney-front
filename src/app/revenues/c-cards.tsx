"use client";

import { Card, CardBody } from "@heroui/card";
import {
  WalletIcon,
  BanknoteArrowUpIcon,
  HandCoinsIcon,
} from "@/src/components/icons";
import { formatCurrency } from "@/src/lib/formatters";

type RevenuesCardsProps = {
  totalIncome: number;
  currentMonthIncome: number;
  transactionsCount: number;
};

export function RevenuesCards({
  totalIncome,
  currentMonthIncome,
  transactionsCount,
}: RevenuesCardsProps) {
  const averageTicket =
    transactionsCount > 0 ? totalIncome / transactionsCount : 0;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
        <CardBody className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
              <WalletIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-emerald-100">Receita acumulada</p>
              <p className="text-2xl font-bold">
                {formatCurrency(totalIncome)}
              </p>
            </div>
          </div>
          <p className="text-sm text-emerald-100">
            Soma de todas as receitas registradas
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
              <p className="text-sm text-default-600">Mês atual</p>
              <p className="text-2xl font-bold">
                {formatCurrency(currentMonthIncome)}
              </p>
            </div>
          </div>
          <p className="text-sm text-default-500">
            Receitas registradas no mês corrente
          </p>
        </CardBody>
      </Card>

      <Card className="border border-default-200 transition-shadow hover:shadow-lg">
        <CardBody className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
              <HandCoinsIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-default-600">Ticket médio</p>
              <p className="text-2xl font-bold">
                {formatCurrency(averageTicket)}
              </p>
            </div>
          </div>
          <p className="text-sm text-default-500">
            {transactionsCount} lançamentos registrados
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

