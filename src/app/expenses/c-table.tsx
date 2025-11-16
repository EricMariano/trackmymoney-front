"use client";

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
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { DateRangePicker } from "@heroui/date-picker";
import { columns } from "./v-columns";
import {
  Search,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
} from "lucide-react";
import { IExpense } from "@/src/app/interfaces/expenses";

const numberRangeFilterFn: FilterFn<IExpense> = (
  row,
  columnId,
  filterValue
) => {
  const value = row.getValue(columnId) as number;
  const [min, max] = filterValue as [number, number];
  return value >= (min || 0) && value <= (max || Infinity);
};

const dateRangeFilterFn: FilterFn<IExpense> = (row, columnId, filterValue) => {
  const dateValue = new Date(row.getValue(columnId) as string);
  const [startDate, endDate] = filterValue as [Date | null, Date | null];

  if (!startDate && !endDate) return true;
  if (startDate && !endDate) return dateValue >= startDate;
  if (!startDate && endDate) return dateValue <= endDate;
  return dateValue >= startDate! && dateValue <= endDate!;
};

type ExpensesTableProps = {
  data: IExpense[];
  isLoading?: boolean;
};

export function ExpensesTable({ data, isLoading = false }: ExpensesTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [dateRange, setDateRange] = useState<any>(null);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(data.map((item) => item.category ?? "Sem categoria")),
      ),
    [data],
  );

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
      dateRangeFilterFn,
    },
  });

  const categoryFilter =
    (columnFilters.find((f) => f.id === "category")?.value as string) || "";
  const minAmount =
    (
      columnFilters.find((f) => f.id === "amount")?.value as [number, number]
    )?.[0] || "";
  const maxAmount =
    (
      columnFilters.find((f) => f.id === "amount")?.value as [number, number]
    )?.[1] || "";

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="flex gap-3 items-center">
        <Input
          placeholder="Buscar despesas..."
          value={globalFilter}
          onValueChange={setGlobalFilter}
          size="lg"
          variant="bordered"
          classNames={{
            inputWrapper: "border-1",
          }}
          className="flex-1"
          startContent={<Search className="w-5 h-5 text-default-400" />}
          endContent={
            globalFilter && (
              <button onClick={() => setGlobalFilter("")}>
                <X className="w-5 h-5 text-default-400 hover:text-default-600" />
              </button>
            )
          }
        />

        {/* Filters Button */}
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button
              size="lg"
              className="shadow-none border"
              variant={columnFilters.length > 0 ? "solid" : "bordered"}
              color={columnFilters.length > 0 ? "danger" : "default"}
              startContent={<Filter className="w-5 h-5" />}
            >
              Filtrar
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="px-1 py-2 w-full">
              <div className="flex justify-between items-center mb-4">
                <p className="text-small font-bold">Filtros Avançados</p>
                {columnFilters.length > 0 && (
                  <Button
                    size="sm"
                    variant="light"
                    onPress={() => {
                      setColumnFilters([]);
                      setDateRange(null);
                    }}
                    startContent={<X className="w-4 h-4" />}
                  >
                    Limpar
                  </Button>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {/* Category Filter */}
                <Select
                  label="Categoria"
                  placeholder="Todas as categorias"
                  selectedKeys={categoryFilter ? [categoryFilter] : []}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0] as string;
                    table
                      .getColumn("category")
                      ?.setFilterValue(value || undefined);
                  }}
                >
                  {categories.map((cat) => (
                    <SelectItem key={cat}>{cat}</SelectItem>
                  ))}
                </Select>

                {/* Date Range Filter */}
                <DateRangePicker
                  label="Período"
                  value={dateRange}
                  onChange={(value: any) => {
                    setDateRange(value);
                    if (value?.start && value?.end) {
                      const startDate = new Date(
                        value.start.year,
                        value.start.month - 1,
                        value.start.day
                      );
                      const endDate = new Date(
                        value.end.year,
                        value.end.month - 1,
                        value.end.day
                      );
                      table
                        .getColumn("date")
                        ?.setFilterValue([startDate, endDate]);
                    } else {
                      table.getColumn("date")?.setFilterValue(undefined);
                    }
                  }}
                />

                {/* Minimum Value Filter */}
                <Input
                  type="number"
                  label="Valor mínimo"
                  placeholder="0.00"
                  value={minAmount.toString()}
                  onValueChange={(value) => {
                    const min = value ? Number(value) : undefined;
                    const max = maxAmount ? Number(maxAmount) : undefined;
                    table
                      .getColumn("amount")
                      ?.setFilterValue(
                        min || max ? [min || 0, max || Infinity] : undefined
                      );
                  }}
                  startContent={<span className="text-gray-400">R$</span>}
                />

                {/* Maximum Value Filter */}
                <Input
                  type="number"
                  label="Valor máximo"
                  placeholder="0.00"
                  value={maxAmount.toString()}
                  onValueChange={(value) => {
                    const min = minAmount ? Number(minAmount) : undefined;
                    const max = value ? Number(value) : undefined;
                    table
                      .getColumn("amount")
                      ?.setFilterValue(
                        min || max ? [min || 0, max || Infinity] : undefined
                      );
                  }}
                  startContent={<span className="text-gray-400">R$</span>}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Table */}
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
          <tbody className="divide-y divide-gray-200 bg-white">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  Carregando despesas...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  Nenhuma despesa encontrada
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap px-6 py-4 text-sm text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500">
        Mostrando {table.getRowModel().rows.length} de {data.length} despesas
      </div>
    </div>
  );
}
