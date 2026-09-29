import React, { useState } from 'react';
import { Lock, KeyRound, ArrowLeft, ShieldAlert, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { Order, Reservation, MenuItem, OrderStatus, ReservationStatus } from '../types/restaurant';

interface AdminAuthGateProps {
  orders: Order[];
  reservations: Reservation[];
  menuItems: MenuItem[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdateReservationStatus: (reservationId: string, newStatus: ReservationStatus) => void;
  onToggleItemAvailability: (itemId: string) => void;
  onNavigateHome: () => void;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({
  orders,
  reservations,
  menuItems,
  onUpdateOrderStatus,
  onUpdateReservationStatus,
  onToggleItemAvailability,
  onNavigateHome,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('pintofrito_admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('pintofrito_admin_auth', 'true');
      setError(null);
    } else {
      setError('Senha incorreta! Digite a senha de administrador.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('pintofrito_admin_auth');
    setIsAuthenticated(false);
    onNavigateHome();
  };

  if (isAuthenticated) {
    return (
      <AdminDashboard
        orders={orders}
        reservations={reservations}
        menuItems={menuItems}
        onUpdateOrderStatus={onUpdateOrderStatus}
        onUpdateReservationStatus={onUpdateReservationStatus}
        onToggleItemAvailability={onToggleItemAvailability}
        onCloseAdmin={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-4 selection:bg-amber-500 selection:text-stone-950">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back to site button */}
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-stone-400 hover:text-white text-xs font-semibold mb-6 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para a Página Inicial</span>
        </button>

        {/* Login Box */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-purple-900/30 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Acesso Administrativo
            </h1>
            <p className="text-xs text-stone-400 max-w-xs mx-auto">
              Área restrita aos gerentes do <strong>Restaurante Pinto Frito</strong>. Digite a senha para gerenciar pedidos, reservas e vendas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-pass" className="block text-xs font-bold text-stone-300 mb-1.5 uppercase tracking-wider">
                Senha de Acesso
              </label>
              <div className="relative">
                <input
                  id="admin-pass"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  autoFocus
                  placeholder="Digite a senha..."
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-white text-sm tracking-wider outline-none transition-all placeholder:text-stone-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 p-1 cursor-pointer"
                  aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 animate-fadeIn">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Entrar no Sistema</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
