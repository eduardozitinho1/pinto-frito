import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Printer, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Sparkles,
  ChevronRight,
  Eye,
  AlertTriangle,
  Download
} from 'lucide-react';
import { Order, Reservation, MenuItem, OrderStatus, ReservationStatus } from '../types/restaurant';

interface AdminDashboardProps {
  orders: Order[];
  reservations: Reservation[];
  menuItems: MenuItem[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdateReservationStatus: (reservationId: string, newStatus: ReservationStatus) => void;
  onToggleItemAvailability: (itemId: string) => void;
  onCloseAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  reservations,
  menuItems,
  onUpdateOrderStatus,
  onUpdateReservationStatus,
  onToggleItemAvailability,
  onCloseAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'orders' | 'reservations' | 'menu'>('metrics');
  const [orderFilter, setOrderFilter] = useState<string>('todos');
  const [reservationFilter, setReservationFilter] = useState<string>('todos');
  const [selectedOrderForTicket, setSelectedOrderForTicket] = useState<Order | null>(null);

  // Computed metrics
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'Cancelado' ? sum + o.total : sum), 0);
  const completedOrders = orders.filter((o) => o.status === 'Entregue').length;
  const activeOrders = orders.filter((o) => o.status !== 'Entregue' && o.status !== 'Cancelado').length;
  const averageTicket = orders.length > 0 ? totalRevenue / Math.max(1, orders.length) : 0;
  const confirmedReservations = reservations.filter((r) => r.status === 'Confirmada').length;

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'todos') return true;
    return o.status === orderFilter;
  });

  const filteredReservations = reservations.filter((r) => {
    if (reservationFilter === 'todos') return true;
    return r.status === reservationFilter;
  });

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Cliente,Tipo,Total,Status,Horario\n"
      + orders.map(o => `${o.id},"${o.customerName}",${o.deliveryType},${o.total.toFixed(2)},${o.status},${o.createdAt}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `relatorio_vendas_pintofrito_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      {/* Admin Top Bar */}
      <header className="bg-stone-900 border-b border-stone-800 px-4 sm:px-8 py-3.5 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-stone-950 font-black shadow-md">
            🍗
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
              Painel Administrativo Pinto Frito
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Modo Gestor
              </span>
            </h1>
            <p className="text-[11px] text-stone-400">
              Gerenciamento de Pedidos, Mesas & Estatísticas de Vendas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleExportCSV}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Exportar CSV
          </button>
          
          <button
            onClick={onCloseAdmin}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-md transition-all hover:scale-105"
          >
            Voltar ao Site Público
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-stone-900/60 border-b border-stone-800/80 px-4 sm:px-8">
        <nav className="flex items-center gap-4 overflow-x-auto scrollbar-none py-2.5">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'metrics'
                ? 'bg-amber-500 text-stone-950'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Visão Geral & Métricas
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-amber-500 text-stone-950'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Pedidos ({activeOrders} em aberto)
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'reservations'
                ? 'bg-amber-500 text-stone-950'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Reservas de Mesas ({reservations.length})
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'menu'
                ? 'bg-amber-500 text-stone-950'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Cardápio & Estoque
          </button>
        </nav>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
        {/* TAB 1: METRICS */}
        {activeTab === 'metrics' && (
          <div className="space-y-8 animate-fadeIn">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
                  <span>Faturamento Registrado</span>
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  R$ {totalRevenue.toFixed(2)}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold mt-2">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+18.4% vs semana anterior</span>
                </div>
              </div>

              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
                  <span>Pedidos Totais Hoje</span>
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {orders.length} pedidos
                </div>
                <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold mt-2">
                  <span>{activeOrders} em andamento na cozinha</span>
                </div>
              </div>

              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
                  <span>Ticket Médio por Cliente</span>
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  R$ {averageTicket.toFixed(2)}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-2">
                  <span>Excelente conversão de combos</span>
                </div>
              </div>

              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
                  <span>Ocupação do Salão</span>
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  84%
                </div>
                <div className="flex items-center gap-1 text-[11px] text-purple-400 font-semibold mt-2">
                  <span>{confirmedReservations} reservas confirmadas hoje</span>
                </div>
              </div>
            </div>

            {/* Sales Breakdown & Top Selling Dishes */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Top Dishes Table */}
              <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Top Pratos Mais Vendidos & Margem
                  </h3>
                  <span className="text-[11px] text-stone-400">Tempo real</span>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'Balde Supremo da Casa (12 pedaços)', sales: 48, revenue: 'R$ 4.315,20', share: '44%' },
                    { name: 'O Lendário Pinto Burger', sales: 34, revenue: 'R$ 1.322,60', share: '24%' },
                    { name: 'Chopp Artesanal Pinto Golden', sales: 78, revenue: 'R$ 1.318,20', share: '18%' },
                    { name: 'Tenders Crocantes Premium', sales: 22, revenue: 'R$ 767,80', share: '14%' },
                  ].map((dish, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-stone-950/60 border border-stone-800 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-5 font-black text-amber-400">#{i + 1}</span>
                        <div>
                          <strong className="text-white block">{dish.name}</strong>
                          <span className="text-stone-400 text-[11px]">{dish.sales} unidades vendidas</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-amber-400 block">{dish.revenue}</span>
                        <span className="text-stone-500 text-[10px]">{dish.share} do faturamento</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Operational Peak Hours & Delivery Speed */}
              <div className="lg:col-span-5 bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Horários de Pico & Performance
                  </h3>
                  <span className="text-[11px] text-emerald-400 font-bold">Cozinha Fluindo</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between text-stone-300 mb-1">
                      <span>Almoço Executivo (12:00 às 14:00)</span>
                      <span className="text-amber-400 font-bold">75% da capacidade</span>
                    </div>
                    <div className="h-2 rounded-full bg-stone-800 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-300 mb-1">
                      <span>Happy Hour & Jantar (19:00 às 22:30)</span>
                      <span className="text-red-400 font-bold">95% (Pico do Dia)</span>
                    </div>
                    <div className="h-2 rounded-full bg-stone-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-800 space-y-2">
                    <div className="flex justify-between text-stone-400">
                      <span>Tempo médio de fritura e preparo:</span>
                      <strong className="text-white">16 min</strong>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Tempo médio de entrega (motoboy):</span>
                      <strong className="text-white">28 min</strong>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Avaliação média do cliente:</span>
                      <strong className="text-amber-400">★ 4.95 / 5.0</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {['todos', 'Recebido', 'Em Preparo', 'Saiu para Entrega', 'Entregue', 'Cancelado'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      orderFilter === st
                        ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold shadow-md'
                        : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {st === 'todos' ? 'Todos os Pedidos' : st}
                  </button>
                ))}
              </div>

              <span className="text-xs text-stone-400">
                Mostrando <strong>{filteredOrders.length}</strong> pedidos
              </span>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center text-stone-500 bg-stone-900 rounded-2xl border border-stone-800 text-sm">
                  Nenhum pedido encontrado nesta categoria.
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg space-y-4 hover:border-stone-700 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-extrabold text-amber-400">{order.id}</span>
                        <span className="text-xs text-stone-400">• {order.createdAt}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-stone-800 text-stone-200 border border-stone-700">
                          {order.deliveryType}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Status badge */}
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'Recebido'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : order.status === 'Em Preparo'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                            : order.status === 'Saiu para Entrega'
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : order.status === 'Entregue'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {order.status}
                        </span>

                        <button
                          onClick={() => setSelectedOrderForTicket(order)}
                          className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                          title="Imprimir comanda de cozinha"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Customer & Address Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-stone-400 block text-[11px]">Cliente & Contato:</span>
                        <strong className="text-white text-sm">{order.customerName}</strong>
                        <span className="text-stone-400 block">{order.phone}</span>
                      </div>

                      <div>
                        <span className="text-stone-400 block text-[11px]">Local de Entrega:</span>
                        <span className="text-stone-200">
                          {order.deliveryType === 'delivery'
                            ? order.address
                            : order.deliveryType === 'mesa'
                            ? order.tableNumber || 'Consumo no local'
                            : 'Retirada no Balcão'}
                        </span>
                      </div>

                      <div>
                        <span className="text-stone-400 block text-[11px]">Pagamento & Total:</span>
                        <span className="text-stone-200">{order.paymentMethod}</span>
                        <strong className="text-amber-400 text-sm block">R$ {order.total.toFixed(2)}</strong>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 text-xs space-y-1.5">
                      <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">
                        Itens do Pedido ({order.items.length})
                      </div>
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between items-center text-stone-300">
                          <span>
                            <strong>{it.quantity}x</strong> {it.item.name}
                            {it.selectedSpiciness && <span className="text-amber-400"> ({it.selectedSpiciness})</span>}
                            {it.selectedSauce && <span className="text-stone-400"> [{it.selectedSauce}]</span>}
                          </span>
                          <span className="text-stone-400">R$ {it.totalItemPrice.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quick Status Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <span className="text-xs text-stone-500">Alterar status operacional:</span>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Recebido')}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            order.status === 'Recebido' ? 'bg-blue-600 text-white font-bold' : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                          }`}
                        >
                          Recebido
                        </button>
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Em Preparo')}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            order.status === 'Em Preparo' ? 'bg-amber-600 text-white font-bold' : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                          }`}
                        >
                          Em Preparo
                        </button>
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Saiu para Entrega')}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            order.status === 'Saiu para Entrega' ? 'bg-purple-600 text-white font-bold' : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                          }`}
                        >
                          Saiu p/ Entrega
                        </button>
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Entregue')}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            order.status === 'Entregue' ? 'bg-emerald-600 text-white font-bold' : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                          }`}
                        >
                          Entregue
                        </button>
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Cancelado')}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-red-900/50 hover:text-red-300 text-stone-400"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: RESERVATIONS MANAGEMENT */}
        {activeTab === 'reservations' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {['todos', 'Confirmada', 'Pendente', 'Cancelada'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setReservationFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      reservationFilter === st
                        ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold shadow-md'
                        : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {st === 'todos' ? 'Todas as Reservas' : st}
                  </button>
                ))}
              </div>

              <span className="text-xs text-stone-400">
                Total: <strong>{filteredReservations.length}</strong> agendamentos
              </span>
            </div>

            {/* Reservations Table */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950 text-stone-400 uppercase tracking-wider text-[11px] border-b border-stone-800">
                    <tr>
                      <th className="p-4">Código & Data</th>
                      <th className="p-4">Cliente</th>
                      <th className="p-4">Pessoas & Ambiente</th>
                      <th className="p-4">Ocasião & Observações</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    {filteredReservations.map((res) => (
                      <tr key={res.id} className="hover:bg-stone-800/40 transition-colors">
                        <td className="p-4">
                          <strong className="text-amber-400 block">{res.id}</strong>
                          <span className="text-white font-medium">{res.date}</span>
                          <span className="text-stone-400 block text-[11px]">às {res.time}</span>
                        </td>
                        <td className="p-4">
                          <strong className="text-white block">{res.customerName}</strong>
                          <span className="text-stone-400">{res.phone}</span>
                          <span className="text-stone-500 block text-[10px]">{res.email}</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-stone-800 text-amber-300 font-bold text-[11px]">
                            {res.guests} pessoas
                          </span>
                          <span className="text-stone-300 block mt-1">{res.seatingArea}</span>
                        </td>
                        <td className="p-4 max-w-xs">
                          <span className="text-white font-semibold block">{res.occasion || 'Jantar casual'}</span>
                          {res.specialRequests && (
                            <span className="text-stone-400 text-[11px] italic block mt-0.5">
                              "{res.specialRequests}"
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            res.status === 'Confirmada'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : res.status === 'Pendente'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {res.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {res.status !== 'Confirmada' && (
                              <button
                                onClick={() => onUpdateReservationStatus(res.id, 'Confirmada')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold"
                              >
                                Confirmar
                              </button>
                            )}
                            {res.status !== 'Cancelada' && (
                              <button
                                onClick={() => onUpdateReservationStatus(res.id, 'Cancelada')}
                                className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-red-900/50 hover:text-red-300 text-stone-400 text-[11px]"
                              >
                                Cancelar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MENU & STOCK MANAGEMENT */}
        {activeTab === 'menu' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-lg font-bold text-white">Gestão Rápida de Disponibilidade do Cardápio</h3>
                <p className="text-xs text-stone-400">
                  Desative itens esgotados instantaneamente para evitar pedidos sem estoque.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex gap-4 items-center justify-between shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.altText}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-800"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                      {item.name}
                    </h4>
                    <span className="text-xs font-extrabold text-amber-400">
                      R$ {item.price.toFixed(2)}
                    </span>
                    <span className="block text-[11px] text-stone-500 capitalize">
                      {item.category}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleItemAvailability(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      item.isAvailable !== false
                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30'
                        : 'bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30'
                    }`}
                  >
                    {item.isAvailable !== false ? 'Disponível' : 'Pausado'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Kitchen Ticket Printing Modal */}
      {selectedOrderForTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white text-black p-6 rounded-lg max-w-sm w-full font-mono text-xs shadow-2xl space-y-3">
            <div className="text-center border-b border-black pb-2">
              <h4 className="font-black text-sm uppercase">RESTAURANTE PINTO FRITO</h4>
              <p className="text-[10px]">COMANDA DE COZINHA</p>
              <p className="font-bold text-base mt-1">{selectedOrderForTicket.id}</p>
              <p className="text-[10px]">Data: {selectedOrderForTicket.createdAt} | Tipo: {selectedOrderForTicket.deliveryType.toUpperCase()}</p>
            </div>

            <div>
              <p><strong>Cliente:</strong> {selectedOrderForTicket.customerName}</p>
              <p><strong>Tel:</strong> {selectedOrderForTicket.phone}</p>
              {selectedOrderForTicket.address && <p><strong>End:</strong> {selectedOrderForTicket.address}</p>}
            </div>

            <div className="border-t border-b border-black py-2 space-y-1">
              <p className="font-bold">ITENS:</p>
              {selectedOrderForTicket.items.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{it.quantity}x {it.item.name}</span>
                  <span>R$ {it.totalItemPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-sm">
              <span>TOTAL:</span>
              <span>R$ {selectedOrderForTicket.total.toFixed(2)}</span>
            </div>

            <div className="pt-2 text-center flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 bg-black text-white font-bold rounded text-xs"
              >
                Imprimir
              </button>
              <button
                onClick={() => setSelectedOrderForTicket(null)}
                className="px-3 py-2 bg-gray-200 text-black rounded text-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
