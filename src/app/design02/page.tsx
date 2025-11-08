"use client";
import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Plus, 
  Calendar,
  Filter,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  ChevronDown,
  ArrowUpCircle,
  ArrowDownCircle,
  PiggyBank,
  Wallet,
  CreditCard,
  ShoppingCart,
  Home,
  Car,
  Coffee,
  Smartphone,
  Heart,
  GraduationCap,
  MoreHorizontal
} from 'lucide-react';

export default function TrackMyMoneyMVP() {
  const [currentPage, setCurrentPage] = useState('receitas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('receita');

  // Mock data
  const [receitas, setReceitas] = useState([
    { id: 1, description: 'Salário', amount: 5200.00, date: '2024-11-01', category: 'Salário', recurring: true },
    { id: 2, description: 'Freelance Web Design', amount: 1500.00, date: '2024-11-15', category: 'Freelance', recurring: false },
    { id: 3, description: 'Dividendos Ações', amount: 250.00, date: '2024-11-10', category: 'Investimentos', recurring: false },
  ]);

  const [despesas, setDespesas] = useState([
    { id: 1, description: 'Aluguel', amount: 1800.00, date: '2024-11-05', category: 'Moradia', recurring: true },
    { id: 2, description: 'Supermercado Extra', amount: 285.00, date: '2024-11-07', category: 'Alimentação', recurring: false },
    { id: 3, description: 'Netflix', amount: 55.90, date: '2024-11-01', category: 'Lazer', recurring: true },
    { id: 4, description: 'Uber', amount: 45.00, date: '2024-11-06', category: 'Transporte', recurring: false },
    { id: 5, description: 'Conta de Luz', amount: 180.00, date: '2024-11-03', category: 'Moradia', recurring: true },
  ]);

  const [investimentos, setInvestimentos] = useState([
    { id: 1, name: 'Tesouro Selic 2029', amount: 15000.00, invested: 12000.00, type: 'Renda Fixa', yield: 25.00, date: '2024-01-15' },
    { id: 2, name: 'Ações ITUB4', amount: 8500.00, invested: 7000.00, type: 'Ações', yield: 21.43, date: '2024-03-20' },
    { id: 3, name: 'ETF IVVB11', amount: 5200.00, invested: 5000.00, type: 'ETF', yield: 4.00, date: '2024-06-10' },
    { id: 4, name: 'CDB Banco Inter', amount: 10500.00, invested: 10000.00, type: 'Renda Fixa', yield: 5.00, date: '2024-02-01' },
  ]);

  const categories = {
    receita: ['Salário', 'Freelance', 'Investimentos', 'Presente', 'Outros'],
    despesa: ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Outros'],
    investimento: ['Renda Fixa', 'Ações', 'ETF', 'FII', 'Cripto', 'Outros']
  };

  const categoryIcons: { [key: string]: any } = {
    'Alimentação': Coffee,
    'Transporte': Car,
    'Moradia': Home,
    'Lazer': Smartphone,
    'Saúde': Heart,
    'Educação': GraduationCap,
    'Salário': Wallet,
    'Freelance': DollarSign,
    'Investimentos': TrendingUp,
  };

  const openModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  // Calculate totals
  const totalReceitas = receitas.reduce((sum, r) => sum + r.amount, 0);
  const totalDespesas = despesas.reduce((sum, d) => sum + d.amount, 0);
  const totalInvestido = investimentos.reduce((sum, i) => sum + i.invested, 0);
  const totalInvestimentos = investimentos.reduce((sum, i) => sum + i.amount, 0);
  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <DollarSign className="w-7 h-7" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">TrackMyMoney</h1>
                <p className="text-sm text-emerald-100">Novembro 2024</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-emerald-100 mb-1">Saldo do Mês</p>
              <p className="text-2xl font-bold">{formatCurrency(saldo)}</p>
              <p className="text-xs text-emerald-100 mt-1">
                {saldo >= 0 ? '↑' : '↓'} {Math.abs((saldo / totalReceitas * 100) || 0).toFixed(1)}%
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-emerald-100 mb-1">Total Receitas</p>
              <p className="text-2xl font-bold">{formatCurrency(totalReceitas)}</p>
              <p className="text-xs text-emerald-100 mt-1">{receitas.length} lançamentos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-emerald-100 mb-1">Total Despesas</p>
              <p className="text-2xl font-bold">{formatCurrency(totalDespesas)}</p>
              <p className="text-xs text-emerald-100 mt-1">{despesas.length} lançamentos</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'receitas', label: 'Receitas', icon: ArrowUpCircle, color: 'emerald' },
              { id: 'despesas', label: 'Despesas', icon: ArrowDownCircle, color: 'red' },
              { id: 'investimentos', label: 'Investimentos', icon: TrendingUp, color: 'blue' },
            ].map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setCurrentPage(id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all whitespace-nowrap ${
                  currentPage === id
                    ? `border-${color}-500 text-${color}-600`
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Receitas Page */}
        {currentPage === 'receitas' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Receitas</h2>
                <p className="text-gray-600">Gerencie suas fontes de renda</p>
              </div>
              <button
                onClick={() => openModal('receita')}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors shadow-md"
              >
                <Plus className="w-5 h-5" />
                Nova Receita
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar receitas..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5" />
                Filtros
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Total do Mês</p>
                  <ArrowUpCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalReceitas)}</p>
                <p className="text-sm text-emerald-600 mt-2">↑ 8% vs mês anterior</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Receitas Fixas</p>
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(receitas.filter(r => r.recurring).reduce((sum, r) => sum + r.amount, 0))}
                </p>
                <p className="text-sm text-gray-600 mt-2">{receitas.filter(r => r.recurring).length} recorrentes</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Receitas Variáveis</p>
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(receitas.filter(r => !r.recurring).reduce((sum, r) => sum + r.amount, 0))}
                </p>
                <p className="text-sm text-gray-600 mt-2">{receitas.filter(r => !r.recurring).length} lançamentos</p>
              </div>
            </div>

            {/* Receitas List */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {receitas.map((receita) => {
                      const Icon = categoryIcons[receita.category] || Wallet;
                      return (
                        <tr key={receita.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon className="w-5 h-5 text-emerald-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{receita.description}</p>
                                {receita.recurring && (
                                  <span className="text-xs text-gray-500">🔄 Recorrente</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                              {receita.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatDate(receita.date)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-lg font-semibold text-emerald-600">
                              {formatCurrency(receita.amount)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Despesas Page */}
        {currentPage === 'despesas' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Despesas</h2>
                <p className="text-gray-600">Controle seus gastos mensais</p>
              </div>
              <button
                onClick={() => openModal('despesa')}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors shadow-md"
              >
                <Plus className="w-5 h-5" />
                Nova Despesa
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar despesas..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5" />
                Filtros
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Total do Mês</p>
                  <ArrowDownCircle className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalDespesas)}</p>
                <p className="text-sm text-red-600 mt-2">↓ 5% vs mês anterior</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Despesas Fixas</p>
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(despesas.filter(d => d.recurring).reduce((sum, d) => sum + d.amount, 0))}
                </p>
                <p className="text-sm text-gray-600 mt-2">{despesas.filter(d => d.recurring).length} recorrentes</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Despesas Variáveis</p>
                  <ShoppingCart className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(despesas.filter(d => !d.recurring).reduce((sum, d) => sum + d.amount, 0))}
                </p>
                <p className="text-sm text-gray-600 mt-2">{despesas.filter(d => !d.recurring).length} lançamentos</p>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Gastos por Categoria</h3>
              <div className="space-y-3">
                {Object.entries(
                  despesas.reduce((acc, d) => {
                    acc[d.category] = (acc[d.category] || 0) + d.amount;
                    return acc;
                  }, {} as { [key: string]: number })
                ).map(([category, amount]) => {
                  const percentage = ((amount as number) / totalDespesas * 100).toFixed(1);
                  const Icon = categoryIcons[category] || MoreHorizontal;
                  return (
                    <div key={category} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-900">{category}</span>
                          <span className="text-sm font-semibold text-gray-900">{formatCurrency(amount)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{percentage}% do total</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Despesas List */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {despesas.map((despesa) => {
                      const Icon = categoryIcons[despesa.category] || ShoppingCart;
                      return (
                        <tr key={despesa.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon className="w-5 h-5 text-red-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{despesa.description}</p>
                                {despesa.recurring && (
                                  <span className="text-xs text-gray-500">🔄 Recorrente</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {despesa.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatDate(despesa.date)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-lg font-semibold text-red-600">
                              {formatCurrency(despesa.amount)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Investimentos Page */}
        {currentPage === 'investimentos' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Investimentos</h2>
                <p className="text-gray-600">Acompanhe seu patrimônio</p>
              </div>
              <button
                onClick={() => openModal('investimento')}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-md"
              >
                <Plus className="w-5 h-5" />
                Novo Investimento
              </button>
            </div>

            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-blue-100">Patrimônio Total</p>
                  <PiggyBank className="w-5 h-5 text-blue-200" />
                </div>
                <p className="text-3xl font-bold">{formatCurrency(totalInvestimentos)}</p>
                <p className="text-sm text-blue-100 mt-2">
                  +{formatCurrency(totalInvestimentos - totalInvestido)} de lucro
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Total Investido</p>
                  <ArrowDownCircle className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalInvestido)}</p>
                <p className="text-sm text-gray-600 mt-2">{investimentos.length} ativos</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Rentabilidade</p>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-3xl font-bold text-emerald-600">
                  {((totalInvestimentos / totalInvestido - 1) * 100).toFixed(2)}%
                </p>
                <p className="text-sm text-emerald-600 mt-2">
                  +{formatCurrency(totalInvestimentos - totalInvestido)}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Melhor Ativo</p>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-3xl font-bold text-emerald-600">
                  {Math.max(...investimentos.map(i => i.yield)).toFixed(2)}%
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {investimentos.find(i => i.yield === Math.max(...investimentos.map(inv => inv.yield)))?.name}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
