import { RevenuesCards } from "./c-cards";
import { RevenuesTable } from "./c-table";
import { RevenuesCreateNew } from "./c-create-new";

export default function RevenuesPage() {
    return (
      <>
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Receitas</h1>
          <RevenuesCreateNew />
        </div>
        <div className="flex flex-col gap-4">
          <RevenuesCards />
          <RevenuesTable />
        </div>
      </>
    )
}