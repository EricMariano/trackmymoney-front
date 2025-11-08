import { BanknoteArrowUpIcon, BanknoteArrowDownIcon  } from "@/src/components/icons";
import { Card, CardBody } from "@heroui/card";
import { WalletIcon, HandCoinsIcon } from "@/src/components/icons";

export function ExpensesCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
                <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <WalletIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-red-100">Despesa Total</p>
                            <p className="text-2xl font-bold">R$ 3.280,00</p>
                        </div>
                    </div>
                    <p className="text-sm text-red-100">↓ 5% este mês</p>
                </CardBody>
            </Card>

            <Card className="border border-default-200 hover:shadow-lg transition-shadow">
                <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <BanknoteArrowUpIcon className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-default-600">Despesas Fixas</p>
                            <p className="text-2xl font-bold">R$ 1.280,00</p>
                        </div>
                    </div>
                    <p className="text-sm text-red-600">↓ 8% este mês</p>
                </CardBody>
            </Card>

            <Card className="border border-default-200 hover:shadow-lg transition-shadow">
                <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <HandCoinsIcon className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-default-600">Despesas Variáveis</p>
                            <p className="text-2xl font-bold">R$ 3.280,00</p>
                        </div>
                    </div>
                    <p className="text-sm text-red-600">↓ 5% vs anterior</p>
                </CardBody>
            </Card>
        </div>
    )
}