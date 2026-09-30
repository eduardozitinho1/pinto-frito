import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu, X, Sun, Moon } from 'lucide-react';
import { useDemoNotice } from '../context/DemoNoticeContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservations: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservations,
  onNavigateToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openDemoNotice } = useDemoNotice();
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'cardapio', label: 'Cardápio' },
    { id: 'reservas', label: 'Reservas' },
    { id: 'avaliacoes', label: 'Avaliações' },
    { id: 'perguntas-frequentes', label: 'Dúvidas' },
    { id: 'localizacao', label: 'Onde Estamos' },
  ];

  const handleNavClick = (id: string) => {
    onNavigateToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              🍗
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                Pinto Frito
                <span className="text-amber-500 text-xs px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 font-bold hidden sm:inline-block">
                  Artesanal
                </span>
              </span>
              <span className="text-[11px] text-stone-400 block -mt-0.5 tracking-wide">
                O Frango Mais Crocante de SP
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-stone-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="hover:text-amber-400 transition-colors py-2 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Switcher Button (Daylight / Night Mode) */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 transition-all hover:scale-105 cursor-pointer relative group flex items-center justify-center text-amber-400"
              aria-label={isDark ? 'Ativar tema claro (modo diurno)' : 'Ativar tema escuro (modo noturno)'}
              title={isDark ? 'Mudar para tema claro (Melhor visibilidade de dia)' : 'Mudar para tema escuro'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-amber-500 group-hover:-rotate-12 transition-transform" />
              )}
              <span className="sr-only">
                {isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
              </span>
            </button>

            {/* Instagram Link Icon */}
            <button
              onClick={() => openDemoNotice({ platform: 'instagram' })}
              className="p-2 sm:p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-pink-400 border border-stone-800 hover:border-pink-500/40 transition-all hover:scale-105 cursor-pointer"
              aria-label="Perfil do Instagram do Restaurante Pinto Frito"
              title="Instagram @pintofrito_oficial"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>

            {/* Reservation Button */}
            <button
              onClick={onOpenReservations}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Reservar Mesa</span>
            </button>

            {/* Shopping Cart Button with counter */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 cursor-pointer"
              aria-label="Abrir sacola de compras"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Sacola</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-stone-950 text-white font-black text-[10px] ml-1">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-xl bg-stone-900 text-stone-300 hover:text-white cursor-pointer"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-6 py-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-3 text-sm font-semibold">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left py-2 text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Theme Toggle Item */}
          <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-stone-200">Aparência</span>
              <span className="text-[11px] text-stone-400">
                {isDark ? 'Modo Escuro' : 'Modo Claro (Diurno)'}
              </span>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs font-bold text-amber-400 cursor-pointer hover:border-amber-500/40 transition-all"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-500" />}
              <span>{isDark ? 'Tema Claro' : 'Tema Escuro'}</span>
            </button>
          </div>

          <div className="pt-2 border-t border-stone-800 space-y-2.5">
            <button
              onClick={() => {
                onOpenReservations();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Fazer Reserva de Mesa
            </button>

            <button
              onClick={() => {
                openDemoNotice({ platform: 'instagram' });
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-stone-900 border border-pink-500/30 text-pink-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Instagram @pintofrito_oficial</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
