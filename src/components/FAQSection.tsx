import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Flame, Sparkles, ShieldCheck } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  badge?: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'O que é o Restaurante Pinto Frito?',
    answer:
      'O Pinto Frito é o restaurante oficial e mais conceituado de São Paulo especializado em frango frito artesanal ultra-crocante. Cada corte de peito, coxa e sobrecoxa passa por uma marinada lenta de 24 horas em 11 especiarias secretas e é empanado no momento do pedido para manter a crosta dourada e estalando.',
    badge: 'Sobre o Pinto Frito',
  },
  {
    question: 'Onde fica localizado o Restaurante Pinto Frito em São Paulo?',
    answer:
      'O Pinto Frito está localizado na Rua das Delícias, 742 - Jardins, São Paulo - SP (entre a Rua Augusta e a Alameda Lorena). Ficamos a 500 metros do Metrô Consolação (Linha 2-Verde / Linha 4-Amarela) e contamos com convênio de estacionamento com serviço de valet na porta.',
    badge: 'Localização',
  },
  {
    question: 'Como funciona o delivery do Pinto Frito e como o frango se mantém crocante?',
    answer:
      'O delivery do Pinto Frito pode ser feito com facilidade diretamente pelo cardápio digital do nosso site oficial. Desenvolvemos embalagens térmicas exclusivas com microventilação controlada que liberam o vapor sem deixar o calor escapar. Dessa forma, a casquinha do frango chega estalando e perfeita na sua casa.',
    badge: 'Delivery Oficial',
  },
  {
    question: 'Como fazer uma reserva de mesa no Pinto Frito?',
    answer:
      'As reservas no Pinto Frito são 100% online, instantâneas e sem burocracia. Você seleciona o dia, horário, quantidade de pessoas e preferência de ambiente — seja o salão interno climatizado ou a varanda externa pet friendly — garantindo sua mesa sem filas de espera.',
    badge: 'Reserva Online',
  },
  {
    question: 'Quais são os pratos e baldes mais pedidos do cardápio do Pinto Frito?',
    answer:
      'O grande campeão é o Balde Supremo da Casa (12 pedaços fartos de peito, coxa e sobrecoxa com 3 molhos especiais), seguido pelo Sanduíche Pinto Furioso (sobrecoxa desossada crocante com coleslaw e picles no pão brioche amanteigado) e pelas Coxinhas da Asa Crocantes acompanhadas de Chopp artesanal trincando.',
    badge: 'Mais Vendidos',
  },
  {
    question: 'Por que a receita do frango do Pinto Frito é tão diferenciada?',
    answer:
      'Nosso processo artesanal combina carne fresca de alta procedência, descanso de 24 horas em soro marinado com ervas finas e fritura com imersão em óleo vegetal novo em temperatura precisa. O resultado é zero excesso de óleo por fora, casca crocante incomparável e suculência máxima por dentro.',
    badge: 'Receita Secreta',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="perguntas-frequentes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-20">
      {/* Section Header with Rich SEO H2 */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Dúvidas Comuns &amp; Informações Oficiais</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Perguntas Frequentes sobre o <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">Pinto Frito</span>
        </h2>

        <p className="text-sm text-stone-300 leading-relaxed">
          Tudo o que você precisa saber sobre o restaurante, nossos baldes de frango crocante, reservas de mesa online, delivery em São Paulo e localização nos Jardins.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-stone-900/90 border-amber-500/50 shadow-xl shadow-amber-500/5'
                  : 'bg-stone-900/40 border-stone-800/90 hover:border-stone-700'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                className="w-full py-5 px-6 flex items-center justify-between gap-4 text-left cursor-pointer"
              >
                <div className="space-y-1">
                  {faq.badge && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 inline-block mr-2">
                      {faq.badge}
                    </span>
                  )}
                  <h3 className="text-base sm:text-lg font-bold text-white inline-block">
                    {faq.question}
                  </h3>
                </div>

                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isOpen ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                }`}>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/60 mt-1 animate-fadeIn">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SEO Trust Footer Badge */}
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950/20 to-stone-900 border border-stone-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div className="text-left">
            <strong className="text-white text-xs sm:text-sm block">
              Pronto para saborear o autêntico Pinto Frito?
            </strong>
            <span className="text-stone-400 text-xs">
              Peça online agora ou garanta sua mesa no restaurante mais amado de São Paulo.
            </span>
          </div>
        </div>

        <a
          href="#cardapio"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 text-xs font-black transition-all hover:scale-105 shrink-0"
        >
          Ver Cardápio Oficial
        </a>
      </div>
    </section>
  );
};
