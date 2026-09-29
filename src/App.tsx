import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SocialShareBar } from './components/SocialShareBar';
import { InteractiveMenu } from './components/InteractiveMenu';
import { ReservationSection } from './components/ReservationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GoogleMapsSection } from './components/GoogleMapsSection';
import { FAQSection } from './components/FAQSection';
import { AdSenseBanner } from './components/AdSenseBanner';
import { CartModal } from './components/CartModal';
import { AdminAuthGate } from './components/AdminAuthGate';
import { Footer } from './components/Footer';
import { DemoNoticeProvider } from './context/DemoNoticeContext';

import {
  INITIAL_MENU_ITEMS,
  INITIAL_ORDERS,
  INITIAL_RESERVATIONS,
  INITIAL_REVIEWS,
} from './data/restaurantData';
import { MenuItem, CartItem, Order, Reservation, CustomerReview, OrderStatus, ReservationStatus } from './types/restaurant';
import { Flame, Clock, UtensilsCrossed, Award } from 'lucide-react';

function RestaurantApp() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Real path state for routing
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  // Listen to browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateHome = () => {
    window.history.pushState(null, '', '/');
    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic SEO Page Title updates
  useEffect(() => {
    if (currentPath === '/admin') {
      document.title = 'Acesso da Gerência | Pinto Frito';
    } else {
      document.title = 'Pinto Frito – O Melhor Frango Frito Crocante de SP | Site Oficial';
    }
  }, [currentPath]);

  // Cart operations
  const handleAddToCart = (cartItem: CartItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.item.id === cartItem.item.id &&
          ci.selectedSpiciness === cartItem.selectedSpiciness &&
          ci.selectedSauce === cartItem.selectedSauce &&
          JSON.stringify(ci.selectedExtras) === JSON.stringify(cartItem.selectedExtras)
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        const updatedItem = { ...updated[existingIdx] };
        updatedItem.quantity += cartItem.quantity;
        updatedItem.totalItemPrice =
          (updatedItem.totalItemPrice / (updatedItem.quantity - cartItem.quantity)) *
          updatedItem.quantity;
        updated[existingIdx] = updatedItem;
        return updated;
      }

      return [...prev, cartItem];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => {
        if (ci.id === cartItemId) {
          const unitPrice = ci.totalItemPrice / ci.quantity;
          return {
            ...ci,
            quantity: newQuantity,
            totalItemPrice: unitPrice * newQuantity,
          };
        }
        return ci;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Orders & Reservations
  const handleOrderCreated = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const handleReservationCreated = (reservation: Reservation) => {
    setReservations((prev) => [reservation, ...prev]);
  };

  const handleAddReview = (review: CustomerReview) => {
    setReviews((prev) => [review, ...prev]);
  };

  // Admin status actions
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleUpdateReservationStatus = (reservationId: string, newStatus: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, status: newStatus } : r))
    );
  };

  const handleToggleItemAvailability = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, isAvailable: !it.isAvailable } : it))
    );
  };

  // Navigation smoothly scrolls to anchors
  const handleNavigateToSection = (sectionId: string) => {
    if (currentPath === '/admin') {
      handleNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If on /admin, display the AdminAuthGate (only accessible on /admin with password 1234)
  if (currentPath === '/admin') {
    return (
      <AdminAuthGate
        orders={orders}
        reservations={reservations}
        menuItems={menuItems}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onUpdateReservationStatus={handleUpdateReservationStatus}
        onToggleItemAvailability={handleToggleItemAvailability}
        onNavigateHome={handleNavigateHome}
      />
    );
  }

  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950">
      {/* Top Announcement Bar */}
      <SocialShareBar variant="banner" />

      {/* Main Navbar */}
      <Navbar
        cartCount={totalCartItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservations={() => handleNavigateToSection('reservas')}
        onNavigateToSection={handleNavigateToSection}
      />

      <main className="flex-1">
        {/* Hero Section with H1, Social, CTAs */}
        <HeroSection
          onOpenMenu={() => handleNavigateToSection('cardapio')}
          onOpenReservations={() => handleNavigateToSection('reservas')}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Feature Highlights Banner */}
        <section className="border-y border-stone-800 bg-stone-900/60 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white text-xs sm:text-sm block">11 Especiarias</strong>
                <span className="text-stone-400 text-[11px]">Receita secreta autêntica</span>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white text-xs sm:text-sm block">Reserva Instantânea</strong>
                <span className="text-stone-400 text-[11px]">Sem filas ou esperas</span>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white text-xs sm:text-sm block">Cardápio Digital</strong>
                <span className="text-stone-400 text-[11px]">Pedidos com 1 clique</span>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white text-xs sm:text-sm block">Nota 4.9 no Google</strong>
                <span className="text-stone-400 text-[11px]">+2.480 clientes felizes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Menu Section */}
        <InteractiveMenu
          menuItems={menuItems}
          onAddToCart={handleAddToCart}
        />

        {/* AdSense Monetization Banner */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSenseBanner />
        </div>

        {/* Table Reservation & Scheduling Section */}
        <ReservationSection
          onReservationCreated={handleReservationCreated}
        />

        {/* Customer Reviews & Google Ratings */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* Semantic FAQ Section for Google SERP Rich Snippets */}
        <FAQSection />

        {/* Location & Google Maps Integration */}
        <GoogleMapsSection />
      </main>

      {/* Cart & Checkout Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderCreated={handleOrderCreated}
      />

      {/* Footer */}
      <Footer
        onNavigateToSection={handleNavigateToSection}
        onOpenReservations={() => handleNavigateToSection('reservas')}
      />
    </div>
  );
}

export default function App() {
  return (
    <DemoNoticeProvider>
      <RestaurantApp />
    </DemoNoticeProvider>
  );
}
