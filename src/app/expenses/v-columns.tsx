import { ColumnDef } from "@tanstack/react-table";
import { IExpense } from "@/src/app/interfaces/expenses";

export const columns: ColumnDef<IExpense>[] = [
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
    },
    {
        header: "Categoria",
        accessorKey: "category",
        enableColumnFilter: true,
        filterFn: "includesString",
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