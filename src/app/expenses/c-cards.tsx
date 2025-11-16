"use client";

import { Card, CardBody } from "@heroui/card";
import {
  WalletIcon,
  BanknoteArrowDownIcon,
  HandCoinsIcon,
} from "@/src/components/icons";
import { formatCurrency } from "@/src/lib/formatters";

type ExpensesCardsProps = {
  totalSpent: number;
  currentMonthSpent: number;
  transactionsCount: number;
};

export function ExpensesCards({
  totalSpent,
  currentMonthSpent,
  transactionsCount,
}: ExpensesCardsProps) {
  const averageTicket =
    transactionsCount > 0 ? totalSpent / transactionsCount : 0;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
        <CardBody className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
              <WalletIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-red-50">Total gasto</p>
              <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
            </div>
          </div>
          <p className="text-sm text-red-100">
            Baseado em todas as despesas registradas
          </p>
        </CardBody>
      </Card>

      <Card className="border border-default-200 transition-shadow hover:shadow-lg">
        <CardBody className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
              <BanknoteArrowDownIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-default-600">Mês atual</p>
              <p className="text-2xl font-bold">
                {formatCurrency(currentMonthSpent)}
              </p>
            </div>
          </div>
          <p className="text-sm text-default-500">
            Despesas registradas no mês corrente
          </p>
        </CardBody>
      </Card>

      <Card className="border border-default-200 transition-shadow hover:shadow-lg">
        <CardBody className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
              <HandCoinsIcon className="h-6 w-6 text-red-600" />
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
