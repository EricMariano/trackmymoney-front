"use client"

import { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    flexRender,
    ColumnFiltersState,
    SortingState,
    FilterFn,
} from "@tanstack/react-table";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { columns } from "./v-columns";
import { IRevenue } from "../interfaces/revenues";
import { Search, X, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

const data: IRevenue[] = [
    {
        id: "1",
        description: "Salário",
        amount: 5000,
        date: "2025-01-01",
        category: "Salário",
    },
    {
        id: "2",
        description: "Freelance",
        amount: 1500,
        date: "2025-01-15",
        category: "Freelance",
    },
    {
        id: "3",
        description: "Investimentos",
        amount: 250,
        date: "2025-01-10",
        category: "Investimentos",
    },
    {
        id: "4",
        description: "Bônus",
        amount: 800,
        date: "2025-01-20",
        category: "Outros",
    },
];

// Categorias únicas para o filtro
const categories = Array.from(new Set(data.map(item => item.category)));

// Custom filter para range numérico
const numberRangeFilterFn: FilterFn<IRevenue> = (row, columnId, filterValue) => {
    const value = row.getValue(columnId) as number;
    const [min, max] = filterValue as [number, number];
    return value >= (min || 0) && value <= (max || Infinity);
};

export function RevenuesTable() {
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        state: {
            globalFilter,
            columnFilters,
            sorting,
        },
        filterFns: {
            numberRangeFilterFn,
        },
    });

    // Filtros específicos por coluna
    const categoryFilter = columnFilters.find(f => f.id === "category")?.value as string || "";
    const minAmount = (columnFilters.find(f => f.id === "amount")?.value as [number, number])?.[0] || "";
    const maxAmount = (columnFilters.find(f => f.id === "amount")?.value as [number, number])?.[1] || "";

    return (
        <div className="space-y-4">
            {/* Barra de Filtros */}
            <div className="flex flex-col gap-4 p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold">Filtros</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Busca Global */}
                    <Input
                        placeholder="Buscar em tudo..."
                        value={globalFilter}
                        onValueChange={setGlobalFilter}
                        startContent={<Search className="w-4 h-4 text-gray-400" />}
                        endContent={
                            globalFilter && (
                                <button onClick={() => setGlobalFilter("")}>
                                    <X className="w-4 h-4 text-gray-400" />
                                </button>
                            )
                        }
                    />

                    {/* Filtro por Categoria */}
                    <Select
                        placeholder="Categoria"
                        selectedKeys={categoryFilter ? [categoryFilter] : []}
                        onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0] as string;
                            table.getColumn("category")?.setFilterValue(value || undefined);
                        }}
                    >
                        {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                                {cat}
                            </SelectItem>
                        ))}
                    </Select>

                    {/* Filtro Valor Mínimo */}
                    <Input
                        type="number"
                        placeholder="Valor mínimo"
                        value={minAmount.toString()}
                        onValueChange={(value) => {
                            const min = value ? Number(value) : undefined;
                            const max = maxAmount ? Number(maxAmount) : undefined;
                            table.getColumn("amount")?.setFilterValue(
                                min || max ? [min || 0, max || Infinity] : undefined
                            );
                        }}
                        startContent={<span className="text-gray-400">R$</span>}
                    />

                    {/* Filtro Valor Máximo */}
                    <Input
                        type="number"
                        placeholder="Valor máximo"
                        value={maxAmount.toString()}
                        onValueChange={(value) => {
                            const min = minAmount ? Number(minAmount) : undefined;
                            const max = value ? Number(value) : undefined;
                            table.getColumn("amount")?.setFilterValue(
                                min || max ? [min || 0, max || Infinity] : undefined
                            );
                        }}
                        startContent={<span className="text-gray-400">R$</span>}
                    />
                </div>

                {/* Botão Limpar Filtros */}
                {(globalFilter || columnFilters.length > 0) && (
                    <Button
                        size="sm"
                        variant="flat"
                        onPress={() => {
                            setGlobalFilter("");
                            setColumnFilters([]);
                        }}
                        startContent={<X className="w-4 h-4" />}
                    >
                        Limpar filtros
                    </Button>
                )}
            </div>

            {/* Tabela */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div className="flex items-center gap-2">
                                                {/* Header com Sorting */}
                                                <button
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className="flex items-center gap-1 hover:text-gray-700"
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {header.column.getIsSorted() === "asc" && (
                                                        <ArrowUp className="w-4 h-4" />
                                                    )}
                                                    {header.column.getIsSorted() === "desc" && (
                                                        <ArrowDown className="w-4 h-4" />
                                                    )}
                                                    {!header.column.getIsSorted() && (
                                                        <ArrowUpDown className="w-4 h-4 opacity-30" />
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-8 text-center text-gray-500"
                                >
                                    Nenhuma receita encontrada
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Info rodapé */}
            <div className="text-sm text-gray-500">
                Mostrando {table.getRowModel().rows.length} de {data.length} receitas
            </div>
        </div>
    );
}