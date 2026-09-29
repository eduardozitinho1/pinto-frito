import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, Car, Train, Shield, Copy, Check, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useDemoNotice } from '../context/DemoNoticeContext';

export const GoogleMapsSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { openDemoNotice } = useDemoNotice();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const googleMapsRouteUrl = 'https://www.google.com/maps/dir/?api=1&destination=Rua+das+Delícias+742+Jardins+São+Paulo+SP';
  const wazeRouteUrl = 'https://waze.com/ul?q=Rua+das+Delícias+742+São+Paulo&navigate=yes';

  return (
    <section id="localizacao" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header H2 */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <MapPin className="w-3.5 h-3.5" />
          Localização Privilegiada & Acesso Fácil
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Venha nos Visitar no Coração dos <span className="text-amber-400">Jardins</span>
        </h2>
        <p className="mt-3 text-stone-300 text-sm sm:text-base">
          Ambiente climatizado, varanda externa arborizada pet friendly e estacionamento com manobrista na porta.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Map Preview Container with Interactive Iframe */}
        <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="relative h-80 sm:h-96 w-full bg-stone-950">
            {/* Embedded Google Maps with search parameter */}
            <iframe
              title="Mapa de Localização do Restaurante Pinto Frito nos Jardins São Paulo"
              src="https://maps.google.com/maps?q=Jardins+Sao+Paulo+Oscar+Freire&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 filter contrast-105"
              loading="lazy"
              allowFullScreen
            />
            
            {/* Floating marker card */}
            <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-stone-800 shadow-xl max-w-xs text-xs">
              <div className="flex items-center gap-2 font-bold text-white mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <span>Restaurante Pinto Frito</span>
              </div>
              <p className="text-stone-300 text-[11px] leading-tight mb-2">
                Rua das Delícias, 742 - Jardins, SP
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => openDemoNotice({ platform: 'maps' })}
                  className="px-2.5 py-1 bg-amber-500 text-stone-950 font-bold rounded-lg text-[10px] hover:bg-amber-400 flex items-center gap-1 cursor-pointer"
                >
                  <Navigation className="w-3 h-3" /> Traçar Rota
                </button>
                <button
                  onClick={handleCopyAddress}
                  className="px-2.5 py-1 bg-stone-800 text-stone-300 rounded-lg text-[10px] hover:bg-stone-700 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copiado' : 'Copiar'}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Route Buttons */}
          <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-stone-400 font-medium">Navegue com seu app preferido:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openDemoNotice({ platform: 'maps' })}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white border border-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                Google Maps
              </button>
              <button
                onClick={() => openDemoNotice({ platform: 'waze' })}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white border border-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                Waze
              </button>
            </div>
          </div>
        </div>

        {/* Right: Address & Transportation Details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Address Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              Endereço Completo
            </h3>

            <div className="text-sm text-stone-300 space-y-1">
              <p className="font-semibold text-white">Restaurante Pinto Frito</p>
              <p>Rua das Delícias, 742 - Jardins / Vila Gastronômica</p>
              <p>São Paulo - SP, CEP: 01405-001</p>
              <p className="text-xs text-amber-400 font-medium pt-1">
                Referência: Entre a Rua Augusta e a Alameda Lorena
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleCopyAddress}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Endereço Copiado!' : 'Copiar Endereço'}
              </button>
              <button
                onClick={() => openDemoNotice({ platform: 'telefone' })}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                {RESTAURANT_INFO.phone}
              </button>
            </div>
          </div>

          {/* How to Get There (Metrô & Carro) */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-amber-500" />
              Como Chegar
            </h3>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-3 bg-stone-950/60 p-3 rounded-2xl border border-stone-800">
                <Train className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">De Metrô:</strong>
                  <span>Apenas 6 minutos de caminhada da estação <strong>Oscar Freire (Linha 4-Amarela)</strong> ou 10 min da estação Consolação (Linha 2-Verde).</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-950/60 p-3 rounded-2xl border border-stone-800">
                <Car className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">De Carro & Valet:</strong>
                  <span>Temos serviço de valet com manobrista na porta e estacionamento conveniado coberto 24h a 30 metros.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-950/60 p-3 rounded-2xl border border-stone-800">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Horários de Atendimento:</strong>
                  <span>Terça a Quinta (11:30 às 23:00) | Sexta e Sábado (11:30 às 00:00) | Domingo (11:30 às 22:00)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
