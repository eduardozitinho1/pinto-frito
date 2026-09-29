import React from 'react';
import { Sparkles, Calendar, ShoppingBag, ArrowRight, ShieldCheck, Flame, Star, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { SocialShareBar } from './SocialShareBar';
import { useDemoNotice } from '../context/DemoNoticeContext';

interface HeroSectionProps {
  onOpenMenu: () => void;
  onOpenReservations: () => void;
  onOpenCart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenMenu,
  onOpenReservations,
  onOpenCart,
}) => {
  const { openDemoNotice } = useDemoNotice();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-600/20 via-orange-600/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-sm animate-pulse">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>Receita Secreta de 11 Especiarias</span>
            </div>

            {/* Main SEO H1 - Exact Keyword Match */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">Pinto Frito</span>: O Frango Mais Crocante & Suculento do Brasil
            </h1>

            {/* Subtitle H2 */}
            <h2 className="text-base sm:text-lg lg:text-xl text-stone-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              No <strong>Restaurante Pinto Frito</strong>, cada pedaço é marinado por 24 horas e empanado na perfeição artesanal. Faça sua reserva de mesa online em segundos ou receba em casa com embalagem térmica que mantém a casca estalando!
            </h2>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenMenu}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-stone-950" />
                <span>Explorar Cardápio Digital</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenReservations}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-100 font-bold text-sm border border-stone-700 hover:border-amber-500/50 transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
              >
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>Reservar Mesa Online</span>
              </button>

              <button
                onClick={() => openDemoNotice({ platform: 'whatsapp' })}
                className="w-full sm:w-auto p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 cursor-pointer"
                title="Atendimento via WhatsApp (Demonstrativo)"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span className="sm:hidden">WhatsApp</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-stone-800/80 text-left">
              <div>
                <div className="flex items-center gap-1 text-amber-400 font-extrabold text-base sm:text-lg">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>4.9 / 5.0</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-0.5">+2.480 avaliações no Google</p>
              </div>

              <div>
                <div className="text-amber-400 font-extrabold text-base sm:text-lg">
                  24 Horas
                </div>
                <p className="text-[11px] text-stone-400 mt-0.5">Marinada lenta em buttermilk</p>
              </div>

              <div>
                <div className="text-emerald-400 font-extrabold text-base sm:text-lg flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Crocante</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-0.5">Garantia casquinha estalando</p>
              </div>
            </div>

            {/* Social Share Bar with Direct Instagram and WhatsApp */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <SocialShareBar variant="compact" />
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with Strict SEO alt text */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glowing decorative backdrop */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl opacity-30 blur-2xl animate-glow" />

              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-stone-900 group">
                <img
                  src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80"
                  alt="Pinto Frito - Balde de Frango Frito artesanal ultra crocante com pedaços dourados do Restaurante Pinto Frito"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  width="1000"
                  height="750"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating promo badge */}
                <div className="absolute top-4 right-4 bg-stone-950/85 backdrop-blur-md border border-amber-500/40 px-3.5 py-2 rounded-2xl shadow-xl text-right">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                    Destaque do Chef
                  </span>
                  <strong className="text-white text-xs sm:text-sm font-extrabold block">
                    Balde Supremo 12 Pedaços
                  </strong>
                  <span className="text-amber-400 text-xs font-bold">R$ 89,90</span>
                </div>

                {/* Floating reviews badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-stone-950/90 backdrop-blur-md border border-stone-800 p-3.5 rounded-2xl shadow-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🍗</span>
                    <div>
                      <span className="font-bold text-white block">Frango Empanado na Hora</span>
                      <span className="text-stone-400 text-[11px]">Crocância garantida até a última mordida</span>
                    </div>
                  </div>
                  <button
                    onClick={onOpenMenu}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-[11px] hover:bg-amber-400"
                  >
                    Ver Preços
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
