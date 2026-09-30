import React from 'react';
import { MapPin, Phone, Clock, Instagram, ExternalLink, ShieldCheck, Flame, UtensilsCrossed, Smartphone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { SocialShareBar } from './SocialShareBar';
import { useDemoNotice } from '../context/DemoNoticeContext';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenReservations: () => void;
  onOpenAndroidApp?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToSection,
  onOpenReservations,
  onOpenAndroidApp,
}) => {
  const { openDemoNotice } = useDemoNotice();

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-300 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Restaurant Newsletter & VIP Club Banner */}
        <div className="bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/40 border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[11px] uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              Experiência Gastronômica Única
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Venha viver a crocância inconfundível do Pinto Frito!
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Ambiente moderno, climatizado, varanda pet friendly e o melhor frango frito com receita secreta de 11 especiarias. Reserve sua mesa agora mesmo sem filas!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={onOpenReservations}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Garantir Minha Mesa</span>
            </button>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-xl font-black text-stone-950 shadow-md">
                🍗
              </div>
              <div>
                <span className="font-black text-lg text-white block">Pinto Frito</span>
                <span className="text-[11px] text-amber-400 font-semibold block">Frango Crocante Gourmet</span>
              </div>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed">
              Marinada artesanal de 24h, temperos nobres e a crosta mais crocante e suculenta de São Paulo. Feito na hora para você.
            </p>

            {/* Social Share Bar */}
            <div className="pt-2">
              <SocialShareBar variant="compact" />
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigateToSection('inicio')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('cardapio')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Cardápio Completo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('reservas')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Reservar Mesa Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('avaliacoes')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Avaliações de Clientes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('perguntas-frequentes')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Perguntas Frequentes (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('localizacao')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Como Chegar & Estacionamento
                </button>
              </li>
              {onOpenAndroidApp && (
                <li>
                  <button
                    onClick={onOpenAndroidApp}
                    className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>App Android (APK & WebAPK)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Horários & Contato</h4>
            <div className="space-y-2.5 text-stone-400 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Terça a Domingo</p>
                  <p>11:30 às 23:30 (Sex/Sáb até 00:00)</p>
                  <p className="text-[10px] text-stone-500">Segunda-feira: Fechado</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <button
                  onClick={() => openDemoNotice({ platform: 'telefone' })}
                  className="hover:text-amber-400 font-medium cursor-pointer"
                >
                  {RESTAURANT_INFO.phone}
                </button>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>Rua das Delícias, 742 - Jardins, São Paulo - SP</p>
              </div>
            </div>
          </div>

          {/* Col 4: Instagram & Social Profiles */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Siga Nossas Redes</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Fique por dentro de promoções relâmpago, vídeos apetitosos e lançamentos de novos molhos!
            </p>

            <button
              onClick={() => openDemoNotice({ platform: 'instagram' })}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-bold rounded-xl text-xs shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>{RESTAURANT_INFO.instagramHandle}</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            <div className="pt-1 text-[11px] text-stone-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Crocância e Qualidade Garantidas</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Meta */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Restaurante Pinto Frito. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            O frango mais amado e crocante da cidade
          </p>
        </div>
      </div>
    </footer>
  );
};
