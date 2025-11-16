"use client";

import { Slider } from "@heroui/slider";
import { Card, CardBody } from "@heroui/card";
import { formatCurrency } from "@/src/lib/formatters";

interface CategoryData {
  category: string;
  value: number;
  percentage: number;
}

interface ExpensesCategorySliderProps {
  data?: CategoryData[];
}

export function ExpensesCategorySlider({
  data = [],
}: ExpensesCategorySliderProps) {
  const defaultCategories = [
    { category: "Alimentação", value: 800, percentage: 24 },
    { category: "Transporte", value: 500, percentage: 15 },
    { category: "Moradia", value: 1200, percentage: 37 },
    { category: "Lazer", value: 400, percentage: 12 },
    { category: "Outros", value: 380, percentage: 12 },
  ];

  const categories = (data.length > 0 ? data : defaultCategories).sort(
    (a, b) => b.percentage - a.percentage,
  );

  return (
    <Card className="border border-default-200 p-4 shadow-none">
      <CardBody>
        <div className="flex w-full flex-col gap-4">
          {categories.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="min-w-[120px] text-sm font-medium">
                {item.category}
              </span>
              <div className="flex-1 px-3">
                <Slider
                  aria-label={`${item.category} - ${item.percentage}%`}
                  className="w-full"
                  color="danger"
                  minValue={0}
                  maxValue={100}
                  value={item.percentage}
                  isDisabled
                  hideThumb
                  size="sm"
                />
              </div>
              <span className="min-w-[160px] text-right text-sm text-default-500">
                {formatCurrency(item.value)} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

