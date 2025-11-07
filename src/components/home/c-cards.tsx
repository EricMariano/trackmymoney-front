import { Card, CardBody } from "@heroui/card";
import { WalletIcon, BanknoteArrowUpIcon, BanknoteArrowDownIcon } from "@/src/components/icons";

export function HomeCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <WalletIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-emerald-100">Saldo Total</p>
                            <p className="text-2xl font-bold">R$ 12.450</p>
                        </div>
                    </div>
                    <p className="text-sm text-emerald-100">↑ 12% este mês</p>
                </CardBody>
            </Card>

            <Card className="border border-default-200 hover:shadow-lg transition-shadow">
                <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <BanknoteArrowUpIcon className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm text-default-600">Receitas</p>
                            <p className="text-2xl font-bold">R$ 5.200</p>
                        </div>
                    </div>
                    <p className="text-sm text-emerald-600">Mês atual</p>
                </CardBody>
            </Card>

            <Card className="border border-default-200 hover:shadow-lg transition-shadow">
                <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <BanknoteArrowDownIcon className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-default-600">Despesas</p>
                            <p className="text-2xl font-bold">R$ 3.280</p>
                        </div>
                    </div>
                    <p className="text-sm text-red-600">↓ 5% vs anterior</p>
                </CardBody>
            </Card>
        </div>
    )
}