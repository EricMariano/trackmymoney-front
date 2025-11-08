"use client";

import type { ButtonProps } from "@heroui/button";
import type { CardProps } from "@heroui/card";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { cn } from "@heroui/theme";

type ChartData = {
  name: string;
  [key: string]: string | number;
};

type CircleChartProps = {
  title: string;
  color: ButtonProps["color"] | "red";
  categories: string[];
  chartData: ChartData[];
};

const data: CircleChartProps[] = [
  {
    title: "Receitas por categoria",
    categories: ["Salário", "Freelance", "Investimentos", "Outros"],
    color: "success",
    chartData: [
      {name: "Salário", value: 5000},
      {name: "Freelance", value: 1000},
      {name: "Investimentos", value: 1000},
      {name: "Outros", value: 1000},
    ],
  },
  {
    title: "Gastos por categoria",
    categories: ["Alimentação", "Transporte", "Moradia", "Lazer", "Saúde", "Educação", "Outros"],
    color: "red",
    chartData: [
      {name: "Alimentação", value: 1000},
      {name: "Transporte", value: 500},
      {name: "Moradia", value: 1000},
      {name: "Lazer", value: 500},
      {name: "Saúde", value: 200},
      {name: "Educação", value: 100},
      {name: "Outros", value: 100},
    ],
  },
];

export function HomeDashboard() {
  return (
    <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {data.map((item, index) => (
        <CircleChartCard key={index} {...item} />
      ))}
    </dl>
  );
}

const formatTotal = (total: number) => {
  return total >= 1000 ? `${(total / 1000).toFixed(1)}K` : total;
};

const getColorShade = (index: number, total: number) => {
  const shades = [700, 600, 500, 400, 300, 200, 100];
  if (total <= shades.length) {
    return shades[index];
  }
  const step = Math.floor(shades.length / total);
  return shades[index * step] || shades[shades.length - 1];
};

const getRedShade = (index: number, total: number) => {
  const redShades = [
    "#991b1b", // red-800
    "#b91c1c", // red-700
    "#dc2626", // red-600
    "#ef4444", // red-500
    "#f87171", // red-400
    "#fca5a5", // red-300
    "#fecaca", // red-200
  ];
  if (index < redShades.length) {
    return redShades[index];
  }
  return redShades[redShades.length - 1];
};

const getColor = (color: string | undefined, index: number, total: number) => {
  if (color === "red") {
    return getRedShade(index, total);
  }
  return `hsl(var(--heroui-${color}-${getColorShade(index, total)}))`;
};

const CircleChartCard = React.forwardRef<
  HTMLDivElement,
  Omit<CardProps, "children"> & CircleChartProps
>(({className, title, categories, color, chartData, ...props}, ref) => {
  return (
    <Card
      ref={ref}
      className={cn("dark:border-default-100 min-h-[240px] border border-transparent", className)}
      {...props}
    >
      <div className="flex flex-col gap-y-2 p-4 pb-0">
        <div className="flex items-center justify-between gap-x-2">
          <dt>
            <h3 className="text-small text-default-500 font-medium">{title}</h3>
          </dt>
          <div className="flex items-center justify-end gap-x-2">
            <Select
              aria-label="Time Range"
              classNames={{
                trigger: "min-w-[100px] min-h-7 h-7",
                value: "text-tiny text-default-500!",
                selectorIcon: "text-default-500",
                popoverContent: "min-w-[120px]",
              }}
              defaultSelectedKeys={["per-day"]}
              listboxProps={{
                itemClasses: {
                  title: "text-tiny",
                },
              }}
              placeholder="Por semana"
              size="sm"
            >
              <SelectItem key="per-week">Por semana</SelectItem>
              <SelectItem key="per-month">Por mês</SelectItem>
            </Select>
            <Dropdown
              classNames={{
                content: "min-w-[120px]",
              }}
              placement="bottom-end"
            >
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                itemClasses={{
                  title: "text-tiny",
                }}
                variant="flat"
              >
                <DropdownItem key="view-details">View Details</DropdownItem>
                <DropdownItem key="export-data">Export Data</DropdownItem>
                <DropdownItem key="set-alert">Set Alert</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-wrap items-center justify-center gap-x-2 lg:flex-nowrap">
        <ResponsiveContainer
          className="[&_.recharts-surface]:outline-hidden"
          height={200}
          width="100%"
        >
          <PieChart accessibilityLayer margin={{top: 0, right: 0, left: 0, bottom: 0}}>
            <Tooltip
              content={({label, payload}) => (
                <div className="rounded-medium bg-background text-tiny shadow-small flex h-8 min-w-[120px] items-center gap-x-2 px-1">
                  <span className="text-foreground font-medium">{label}</span>
                  {payload?.map((p) => {
                    const name = p.name;
                    const value = p.value;
                    const categoryIndex = chartData.findIndex((item) => item.name === name);
                    const category = categories.find((c) => c.toLowerCase() === name) ?? name;

                    return (
                      <div key={`${categoryIndex}-${name}`} className="flex w-full items-center gap-x-2">
                        <div
                          className="h-2 w-2 flex-none rounded-full"
                          style={{
                            backgroundColor: getColor(color, categoryIndex, chartData.length),
                          }}
                        />
                        <div className="text-default-700 flex w-full items-center justify-between gap-x-2 pr-1 text-xs">
                          <span className="text-default-500">{category}</span>
                          <span className="text-default-700 font-mono font-medium">
                            {formatTotal(value as number)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              cursor={false}
            />
            <Pie
              animationDuration={1000}
              animationEasing="ease"
              data={chartData}
              dataKey="value"
              innerRadius="68%"
              minAngle={30}
              nameKey="name"
              paddingAngle={-20}
              strokeWidth={0}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColor(color, index, chartData.length)}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className={cn(
          "text-tiny text-default-500 w-full pb-3 px-3 lg:p-0 lg:pr-3",
          categories.length > 4 ? "grid grid-cols-2 gap-x-4 gap-y-1.5" : "flex flex-col gap-1.5"
        )}>
          {categories.map((category, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: getColor(color, index, categories.length),
                }}
              />
              <span className="capitalize text-xs leading-tight">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
});

CircleChartCard.displayName = "CircleChartCard";
