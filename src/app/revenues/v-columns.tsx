import { ColumnDef } from "@tanstack/react-table";
import { IRevenue } from "../interfaces/revenues";

export const columns: ColumnDef<IRevenue>[] = [
    {
        header: "Descrição",
        accessorKey: "description",
        enableColumnFilter: true,
        filterFn: "includesString", // Filtro de texto
    },
    {
        header: "Valor",
        accessorKey: "amount",
        enableColumnFilter: true,
        filterFn: "inNumberRange", // Filtro de range numérico
        cell: ({ getValue }) => {
            const value = getValue() as number;
            return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(value);
        },
    },
    {
        header: "Categoria",
        accessorKey: "category",
        enableColumnFilter: true,
        filterFn: "equalsString", // Filtro exato (para select)
    },
    {
        header: "Data",
        accessorKey: "date",
        enableColumnFilter: true,
        // filterFn: "dateRange", // Filtro de range de datas (TODO: Implementar)
        cell: ({ getValue }) => {
            const value = getValue() as string;
            return new Date(value).toLocaleDateString("pt-BR");
        },
    },
];