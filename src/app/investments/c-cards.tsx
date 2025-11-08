import { BanknoteArrowUpIcon, BanknoteArrowDownIcon  } from "@/src/components/icons";
import { Card, CardBody } from "@heroui/card";
import { WalletIcon, HandCoinsIcon, BitcoinIcon } from "@/src/components/icons";

export function InvestmentsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-secondary-500 to-secondary-600 text-white shadow-lg">
                <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <WalletIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-secondary-100">Patrimônio Total</p>
                            <p className="text-2xl font-bold">R$ 12.000,00</p>
                        </div>
                    </div>
                    <p className="text-sm text-secondary-100">↑ 10% este mês</p>
                </CardBody>
            </Card>

            <Card className="border border-default-200 hover:shadow-lg transition-shadow">
                <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <BanknoteArrowUpIcon className="w-6 h-6 text-secondary-600" />
                        </div>
                        <div>
                            <p className="text-sm text-default-600">Investimentos Fixos</p>
                            <p className="text-2xl font-bold">R$ 5.200,00</p>
                        </div>
                    </div>
                    <p className="text-sm text-red-600">↓ 8% este mês</p>
                </CardBody>
            </Card>

            <Card className="border border-default-200 hover:shadow-lg transition-shadow">
                <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <BanknoteArrowUpIcon className="w-6 h-6 text-secondary-600" />
                        </div>
                        <div>
                            <p className="text-sm text-default-600">Rentabilidade</p>
                            <p className="text-2xl font-bold">10.5%</p>
                        </div>
                    </div>
                    <p className="text-sm text-red-600">↓ 2% este mês</p>
                </CardBody>
            </Card>

            <Card className="border border-default-200 hover:shadow-lg transition-shadow">
                <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <BitcoinIcon className="w-6 h-6 text-secondary-600" />
                        </div>
                        <div>
                            <p className="text-sm text-default-600">Melhor Investimento</p>
                            <p className="text-2xl font-bold">CDB Banco Inter</p>
                        </div>
                    </div>
                    <p className="text-sm text-emerald-600">↑ 8% este mês</p>
                </CardBody>
            </Card>
        </div>
    )
}