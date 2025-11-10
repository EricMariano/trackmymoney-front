import { ExpensesCards } from "./c-cards";
import { ExpensesTable } from "./c-table";
import { ExpensesCreateNew } from "./c-create-new";
import { ExpensesCategorySlider } from "./c-category-slider";

export default function ExpensesPage() {
    return (
      <>
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Despesas</h1>
          <ExpensesCreateNew />
        </div>
        <div className="flex flex-col gap-4">
          <ExpensesCards />
          <ExpensesCategorySlider />
          <ExpensesTable />
        </div>
      </>
    )
}