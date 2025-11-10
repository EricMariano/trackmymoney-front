import { Slider } from "@heroui/slider";
import { Card, CardBody } from "@heroui/card";

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
    (a, b) => b.percentage - a.percentage
  );

  return (
    <Card className="p-4 border border-default-200 shadow-none">
      <CardBody>
        <div className="flex flex-col gap-4 w-full">
          {categories.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="font-medium text-sm min-w-[120px]">
                {item.category}
              </span>
              <div className="flex-1">
                <Slider
                  aria-label={`${item.category} - ${item.percentage}%`}
                  className="w-full"
                  color="danger"
                  minValue={0}
                  maxValue={100}
                  value={item.percentage}
                  isDisabled={true}
                  hideThumb={true}
                  size="sm"
                />
              </div>
              <span className="text-sm text-default-500 min-w-[140px] text-right">
                R$ {item.value.toFixed(2)} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
