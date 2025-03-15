import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Home, CreditCard, TrendingDown, LineChart, Wallet, Repeat, Plus, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export default function DashboardHome() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); 
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("R$ 2.500,00");

  const formatMonthYear = (date: Date): string => {
    const formattedDate = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(date);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1); 
  };

  //função para navegar para o mês anterior
  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1); 
    setCurrentDate(newDate);
    updateExpenses(newDate);
  };

  //função para navegar para o próximo mês
  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1); 
    setCurrentDate(newDate);
    updateExpenses(newDate);
  };

  //função para atualizar as despesas com base no mês selecionado
  const updateExpenses = (date: Date) => {
    const expenses = getExpensesForMonth(date);
    setMonthlyExpenses(expenses);
  };

  //números imaginários para exemplo
  const getExpensesForMonth = (date: Date): string => {
    const monthKey = formatMonthYear(date).toLowerCase();
    const expenses: { [key: string]: string } = {
      "janeiro 2025": "R$ 2.000,00",
      "fevereiro 2025": "R$ 2.300,00",
      "março 2025": "R$ 2.500,00",
      "abril 2025": "R$ 2.700,00",
    };
    return expenses[monthKey] || "R$ 0,00"; //retorna "R$ 0,00" se não houver despesas
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-amber-50 text-black p-4 space-y-6">
        <h2 className="text-lg font-bold">FinPlan</h2>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-2 hover:text-gray-300">
            <Home size={20} /> Visão Geral
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-300">
            <Wallet size={20} /> Contas
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-300">
            <Repeat size={20} /> Transações
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-300">
            <CreditCard size={20} /> Cartões
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-300">
            <TrendingDown size={20} /> Despesas
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-300">
            <LineChart size={20} /> Investimentos
          </a>
        </nav>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Ações Rápidas</h3>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-2 hover:text-gray-300">
              <Plus size={16} /> Adicionar Transação
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-gray-300">
              <Plus size={16} /> Adicionar Conta
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-gray-300">
              <Plus size={16} /> Adicionar Despesa
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-gray-300">
              <Plus size={16} /> Adicionar Cartão
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-gray-300">
              <Plus size={16} /> Adicionar Investimento
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Menu Superior */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">FinPlan</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousMonth}
              className="p-2 hover:bg-gray-200 rounded flex items-center gap-1"
            >
              <ChevronLeft size={20} />
              <span>Anterior</span>
            </button>
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-gray-600" />
              <span className="text-lg">{formatMonthYear(currentDate)}</span>
            </div>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-200 rounded flex items-center gap-1"
            >
              <span>Próximo</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Seção de Cartões de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Saldo Total</p>
                <p className="text-lg font-bold">R$ 5.000,00</p>
                <p className="text-xs text-gray-400">Em 1 conta</p>
              </div>
              <Home size={24} className="text-gray-400" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Dívida no Cartão</p>
                <p className="text-lg font-bold">R$ 1.200,00</p>
                <p className="text-xs text-gray-400">Em 0 cartões</p>
              </div>
              <CreditCard size={24} className="text-gray-400" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Despesas Mensais</p>
                <p className="text-lg font-bold">{monthlyExpenses}</p>
                <p className="text-xs text-gray-400">Para {formatMonthYear(currentDate)}</p>
              </div>
              <TrendingDown size={24} className="text-gray-400" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Investimentos</p>
                <p className="text-lg font-bold">R$ 10.000,00</p>
                <p className="text-xs text-gray-400">Em 0 investimentos</p>
              </div>
              <LineChart size={24} className="text-gray-400" />
            </CardContent>
          </Card>
        </div>

        {/* Seção de Patrimônio Líquido */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">Patrimônio Líquido</p>
                <p className="text-xs text-gray-400">Seus ativos totais menos passivos</p>
              </div>
              <p className="text-lg font-bold">R$ 13.800,00</p>
            </div>
            <div className=" mt-4">
              <p className="text-sm text-primary">Ativos (Contas + Investimentos)</p>
              <p className="text-xs text-primary">R$ 15.000,00</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-primary">Passivos (Dívidas no Cartão)</p>
              <p className="text-xs text-primary">R$ 1.200,00</p>
            </div>
          </CardContent>
        </Card>

        {/* Seção de Contas */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Contas</p>
              <a href="#" className="text-sm text-blue-500 hover:underline">Ver Todas</a>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <p className="text-sm">Santander</p>
                <p className="text-sm font-bold">R$ 5.000,00</p>
              </div>
              <p className="text-xs text-gray-400">Conta Corrente</p>
            </div>
          </CardContent>
        </Card>

        {/* Seção de Cartões de Crédito */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Cartões de Crédito</p>
              <a href="#" className="text-sm text-blue-500 hover:underline">Ver Todos</a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Nenhum cartão adicionado ainda</p>
              <button className="mt-2 flex items-center gap-1 text-blue-500 hover:text-blue-600">
                <Plus size={16} />
                <span>Adicionar Cartão</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}