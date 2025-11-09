import { RevenuesCards } from "./c-cards";
import { RevenuesTable } from "./c-table";

export default function RevenuesPage() {
    return (
      <>
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Receitas</h1>
        </div>
        <div className="flex flex-col gap-4">
          <RevenuesCards />
          <RevenuesTable />
        </div>
      </>
    )
}