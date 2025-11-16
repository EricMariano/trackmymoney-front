import { ColumnDef } from "@tanstack/react-table";

import type { IRevenue } from "@/src/app/interfaces/revenues";
import { formatCurrency } from "@/src/lib/formatters";

export const columns: ColumnDef<IRevenue>[] = [
  {
    header: "Descrição",
    accessorKey: "description",
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    header: "Valor",
    accessorKey: "amount",
    enableColumnFilter: true,
    filterFn: "inNumberRange",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return formatCurrency(value);
    },
  },
  {
    header: "Categoria",
    accessorKey: "category",
    enableColumnFilter: true,
    filterFn: "equalsString",
  },
  {
    header: "Data",
    accessorKey: "date",
    enableColumnFilter: true,
    filterFn: "inNumberRange",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return new Date(value).toLocaleDateString("pt-BR");
    },
  },
];

