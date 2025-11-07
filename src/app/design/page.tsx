"use client";
import React, { useState } from 'react';
import { Wallet, TrendingUp, DollarSign, PiggyBank, CreditCard } from 'lucide-react';

export default function TrackMyMoneyBranding() {
  const [activeTab, setActiveTab] = useState('logo');

  const colors = {
    primary: '#10B981', // Green
    primaryDark: '#059669',
    secondary: '#3B82F6', // Blue
    accent: '#F59E0B', // Amber
    dark: '#1F2937',
    light: '#F9FAFB',
    success: '#10B981',
    danger: '#EF4444',
  };

  const gradients = {
    primary: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    hero: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
    card: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">TrackMyMoney</h1>
          <p className="text-gray-600 mt-1">Guia de Identidade Visual</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['logo', 'cores', 'tipografia', 'componentes', 'exemplos'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Logo Section */}
        {activeTab === 'logo' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Logo Principal</h2>
              
              {/* Logo Versions */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Light Background */}
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <p className="text-sm text-gray-600 mb-4">Fundo Claro</p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <DollarSign className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">TrackMyMoney</h3>
                      <p className="text-sm text-emerald-600 font-medium">Suas finanças sob controle</p>
                    </div>
                  </div>
                </div>

                {/* Dark Background */}
                <div className="bg-gray-900 rounded-xl p-8 text-center">
                  <p className="text-sm text-gray-400 mb-4">Fundo Escuro</p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <DollarSign className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">TrackMyMoney</h3>
                      <p className="text-sm text-emerald-400 font-medium">Suas finanças sob controle</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Icon Variations */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Variações do Ícone</h3>
                <div className="flex flex-wrap gap-6">
                  {[
                    { icon: DollarSign, label: 'Principal' },
                    { icon: TrendingUp, label: 'Crescimento' },
                    { icon: Wallet, label: 'Carteira' },
                    { icon: PiggyBank, label: 'Economia' },
                    { icon: CreditCard, label: 'Transações' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mb-2 hover:scale-105 transition-transform">
                        <Icon className="w-12 h-12 text-white" strokeWidth={2.5} />
                      </div>
                      <p className="text-xs text-gray-600">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Logo Usage */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Regras de Uso</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-emerald-600 flex items-center gap-2">
                    <span className="text-2xl">✓</span> Fazer
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Manter proporções originais</li>
                    <li>• Usar em fundos claros ou escuros</li>
                    <li>• Deixar espaço de respiro ao redor</li>
                    <li>• Usar versão monocromática quando necessário</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-600 flex items-center gap-2">
                    <span className="text-2xl">✗</span> Não Fazer
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Distorcer ou rotacionar</li>
                    <li>• Mudar as cores da paleta</li>
                    <li>• Adicionar sombras ou efeitos</li>
                    <li>• Colocar em fundos com baixo contraste</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Colors Section */}
        {activeTab === 'cores' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Paleta de Cores</h2>
              
              {/* Primary Colors */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cores Principais</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ColorCard color="#10B981" name="Primary" description="Verde principal" />
                  <ColorCard color="#059669" name="Primary Dark" description="Verde escuro" />
                  <ColorCard color="#3B82F6" name="Secondary" description="Azul secundário" />
                  <ColorCard color="#F59E0B" name="Accent" description="Destaque" />
                </div>
              </div>

              {/* Semantic Colors */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cores Semânticas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ColorCard color="#10B981" name="Success" description="Receitas/Sucesso" />
                  <ColorCard color="#EF4444" name="Danger" description="Despesas/Erro" />
                  <ColorCard color="#F59E0B" name="Warning" description="Alertas" />
                  <ColorCard color="#6366F1" name="Info" description="Informação" />
                </div>
              </div>

              {/* Neutral Colors */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tons Neutros</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  <ColorCard color="#1F2937" name="Gray 900" description="Texto" />
                  <ColorCard color="#374151" name="Gray 700" description="Secundário" />
                  <ColorCard color="#6B7280" name="Gray 500" description="Placeholder" />
                  <ColorCard color="#D1D5DB" name="Gray 300" description="Bordas" />
                  <ColorCard color="#F3F4F6" name="Gray 100" description="Fundo" />
                  <ColorCard color="#F9FAFB" name="Gray 50" description="Base" />
                </div>
              </div>
            </div>

            {/* Gradients */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Gradientes</h3>
              <div className="space-y-4">
                <div 
                  className="h-32 rounded-xl shadow-md flex items-center justify-center"
                  style={{ background: gradients.primary }}
                >
                  <span className="text-white font-semibold">Primary Gradient</span>
                </div>
                <div 
                  className="h-32 rounded-xl shadow-md flex items-center justify-center"
                  style={{ background: gradients.hero }}
                >
                  <span className="text-white font-semibold">Hero Gradient</span>
                </div>
                <div 
                  className="h-32 rounded-xl shadow-md flex items-center justify-center"
                  style={{ background: gradients.card }}
                >
                  <span className="text-gray-700 font-semibold">Card Gradient</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Typography Section */}
        {activeTab === 'tipografia' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tipografia</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fonte Principal: Inter</h3>
                <p className="text-gray-600 mb-4">Fonte moderna, legível e otimizada para telas</p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <p className="text-5xl font-bold text-gray-900">Aa</p>
                    <p className="text-sm text-gray-600 mt-2">Inter Bold - Títulos principais</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-3xl font-semibold text-gray-900">Aa</p>
                    <p className="text-sm text-gray-600 mt-2">Inter Semibold - Subtítulos</p>
                  </div>
                  
                  <div className="border-l-4 border-gray-400 pl-4">
                    <p className="text-xl text-gray-900">Aa</p>
                    <p className="text-sm text-gray-600 mt-2">Inter Regular - Corpo de texto</p>
                  </div>
                  
                  <div className="border-l-4 border-gray-300 pl-4">
                    <p className="text-base font-medium text-gray-900">Aa</p>
                    <p className="text-sm text-gray-600 mt-2">Inter Medium - Botões e labels</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hierarquia de Texto</h3>
                <div className="space-y-3">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900">H1 - Título Principal</h1>
                    <code className="text-xs text-gray-500">text-4xl font-bold</code>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">H2 - Seção</h2>
                    <code className="text-xs text-gray-500">text-3xl font-bold</code>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">H3 - Subseção</h3>
                    <code className="text-xs text-gray-500">text-2xl font-semibold</code>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">H4 - Card Title</h4>
                    <code className="text-xs text-gray-500">text-xl font-semibold</code>
                  </div>
                  <div>
                    <p className="text-base text-gray-700">Body - Texto principal do aplicativo</p>
                    <code className="text-xs text-gray-500">text-base</code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Small - Legendas e informações secundárias</p>
                    <code className="text-xs text-gray-500">text-sm</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Components Section */}
        {activeTab === 'componentes' && (
          <div className="space-y-8">
            {/* Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Botões</h3>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors shadow-md">
                    Primary Button
                  </button>
                  <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-md">
                    Secondary Button
                  </button>
                  <button className="px-6 py-3 border-2 border-emerald-500 text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors">
                    Outline Button
                  </button>
                  <button className="px-6 py-3 text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors">
                    Text Button
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <button className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors">
                    Small Button
                  </button>
                  <button className="px-8 py-4 bg-emerald-500 text-white text-lg font-medium rounded-lg hover:bg-emerald-600 transition-colors shadow-lg">
                    Large Button
                  </button>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Cards</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Saldo Total</p>
                      <p className="text-2xl font-bold text-gray-900">R$ 12.450,00</p>
                    </div>
                  </div>
                  <p className="text-sm text-emerald-600">↑ 12% este mês</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-50">Gastos do Mês</p>
                      <p className="text-2xl font-bold">R$ 3.280,00</p>
                    </div>
                  </div>
                  <p className="text-sm text-emerald-100">↓ 5% vs mês anterior</p>
                </div>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Formulários</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Almoço no restaurante"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-500">R$</span>
                    <input
                      type="number"
                      placeholder="0,00"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all">
                    <option>Selecione uma categoria</option>
                    <option>Alimentação</option>
                    <option>Transporte</option>
                    <option>Lazer</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Examples Section */}
        {activeTab === 'exemplos' && (
          <div className="space-y-8">
            {/* Mobile Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Preview Mobile</h3>
              <div className="max-w-sm mx-auto bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-emerald-500 px-6 py-4">
                    <div className="flex justify-between items-center text-white text-xs">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-3 border border-white rounded-sm"></div>
                        <div className="w-4 h-3 border border-white rounded-sm"></div>
                        <div className="w-3 h-3 border border-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Header */}
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 py-6 text-white">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-6 h-6" />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold">TrackMyMoney</h1>
                        <p className="text-xs text-emerald-100">Olá, Usuário!</p>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                      <p className="text-xs text-emerald-100 mb-1">Saldo Total</p>
                      <p className="text-3xl font-bold">R$ 12.450,00</p>
                      <p className="text-xs text-emerald-100 mt-2">↑ 12% este mês</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-1 bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                        <p className="text-xs text-gray-600 mb-1">Receitas</p>
                        <p className="text-lg font-bold text-emerald-600">R$ 5.200</p>
                      </div>
                      <div className="flex-1 bg-red-50 rounded-xl p-4 border border-red-100">
                        <p className="text-xs text-gray-600 mb-1">Despesas</p>
                        <p className="text-lg font-bold text-red-600">R$ 3.280</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Transações Recentes</h3>
                      <div className="space-y-2">
                        {[
                          { name: 'Mercado', value: '-R$ 285,00', cat: 'Alimentação', color: 'red' },
                          { name: 'Salário', value: '+R$ 5.200,00', cat: 'Receita', color: 'emerald' },
                          { name: 'Uber', value: '-R$ 45,00', cat: 'Transporte', color: 'red' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                            <div className={`w-10 h-10 bg-${item.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <Wallet className={`w-5 h-5 text-${item.color}-600`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.cat}</p>
                            </div>
                            <p className={`text-sm font-semibold text-${item.color}-600`}>{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Nav */}
                  <div className="border-t border-gray-200 px-6 py-4">
                    <div className="flex justify-around">
                      {[
                        { icon: TrendingUp, label: 'Dashboard', active: true },
                        { icon: CreditCard, label: 'Transações', active: false },
                        { icon: PiggyBank, label: 'Orçamentos', active: false },
                        { icon: Wallet, label: 'Perfil', active: false },
                      ].map(({ icon: Icon, label, active }) => (
                        <div key={label} className="flex flex-col items-center gap-1">
                          <Icon className={`w-5 h-5 ${active ? 'text-emerald-500' : 'text-gray-400'}`} />
                          <span className={`text-xs ${active ? 'text-emerald-500 font-medium' : 'text-gray-400'}`}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Preview Desktop</h3>
              <div className="border-4 border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-gray-100 px-4 py-2 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                
                <div className="bg-white flex">
                  {/* Sidebar */}
                  <div className="w-64 bg-gray-50 border-r border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-gray-900">TrackMyMoney</h2>
                        <p className="text-xs text-gray-500">v1.0</p>
                      </div>
                    </div>
                    
                    <nav className="space-y-2">
                      {[
                        { icon: TrendingUp, label: 'Dashboard', active: true },
                        { icon: CreditCard, label: 'Transações', active: false },
                        { icon: PiggyBank, label: 'Orçamentos', active: false },
                        { icon: Wallet, label: 'Carteiras', active: false },
                      ].map(({ icon: Icon, label, active }) => (
                        <button
                          key={label}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            active
                              ? 'bg-emerald-500 text-white shadow-md'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-8">
                    <div className="mb-6">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                      <p className="text-gray-600">Visão geral das suas finanças</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <Wallet className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-sm text-emerald-100">Saldo Total</p>
                            <p className="text-2xl font-bold">R$ 12.450</p>
                          </div>
                        </div>
                        <p className="text-sm text-emerald-100">↑ 12% este mês</p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Receitas</p>
                            <p className="text-2xl font-bold text-gray-900">R$ 5.200</p>
                          </div>
                        </div>
                        <p className="text-sm text-emerald-600">Mês atual</p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-red-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Despesas</p>
                            <p className="text-2xl font-bold text-gray-900">R$ 3.280</p>
                          </div>
                        </div>
                        <p className="text-sm text-red-600">↓ 5% vs anterior</p>
                      </div>
                    </div>

                    {/* Transactions */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Transações Recentes</h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Salário', value: '+R$ 5.200,00', cat: 'Receita', date: 'Hoje', color: 'emerald' },
                          { name: 'Supermercado Extra', value: '-R$ 285,00', cat: 'Alimentação', date: 'Ontem', color: 'red' },
                          { name: 'Uber', value: '-R$ 45,00', cat: 'Transporte', date: '2 dias', color: 'red' },
                          { name: 'Netflix', value: '-R$ 55,90', cat: 'Lazer', date: '3 dias', color: 'red' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <Wallet className={`w-6 h-6 text-${item.color}-600`} />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500">{item.cat} • {item.date}</p>
                            </div>
                            <p className={`text-lg font-semibold text-${item.color}-600`}>{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <DollarSign className="w-10 h-10" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-400 rounded-full"></div>
            </div>
            <h2 className="text-3xl font-bold">TrackMyMoney</h2>
          </div>
          <p className="text-emerald-50 text-lg mb-6">Suas finanças sob controle</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="font-semibold">Primary:</span> #10B981
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="font-semibold">Secondary:</span> #3B82F6
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="font-semibold">Font:</span> Inter
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorCard({ color, name, description }: { color: string; name: string; description: string }) {
  return (
    <div className="group cursor-pointer">
      <div
        className="h-24 rounded-lg shadow-md group-hover:shadow-xl transition-shadow mb-2"
        style={{ backgroundColor: color }}
      ></div>
      <p className="font-semibold text-gray-900 text-sm">{name}</p>
      <p className="text-xs text-gray-600">{description}</p>
      <code className="text-xs text-gray-400 font-mono">{color}</code>
    </div>
  );
}