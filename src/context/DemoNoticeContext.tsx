import React, { createContext, useContext, useState, ReactNode } from 'react';
import { X, AlertCircle, MessageCircle, Mail, Copy, Check, ExternalLink, Sparkles, Phone, ArrowRight } from 'lucide-react';

interface DemoNoticeContextType {
  openDemoNotice: (options?: {
    platform?: 'instagram' | 'whatsapp' | 'facebook' | 'maps' | 'waze' | 'telefone' | 'geral';
    originalUrl?: string;
  }) => void;
}

const DemoNoticeContext = createContext<DemoNoticeContextType | undefined>(undefined);

export const useDemoNotice = () => {
  const context = useContext(DemoNoticeContext);
  if (!context) {
    throw new Error('useDemoNotice must be used within a DemoNoticeProvider');
  }
  return context;
};

interface DemoNoticeProviderProps {
  children: ReactNode;
}

export const DemoNoticeProvider: React.FC<DemoNoticeProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [noticePlatform, setNoticePlatform] = useState<'instagram' | 'whatsapp' | 'facebook' | 'maps' | 'waze' | 'telefone' | 'geral'>('geral');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const DEVELOPER_WHATSAPP = '+5511911297208';
  const DEVELOPER_WHATSAPP_DISPLAY = '+55 (11) 91129-7208';
  const EMAIL_HOTMAIL = 'dujango@hotmail.com';
  const EMAIL_GMAIL = 'dudu26315@gmail.com';

  const openDemoNotice = (options?: {
    platform?: 'instagram' | 'whatsapp' | 'facebook' | 'maps' | 'waze' | 'telefone' | 'geral';
    originalUrl?: string;
  }) => {
    setNoticePlatform(options?.platform || 'geral');
    setIsOpen(true);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const whatsappLink = `https://wa.me/5511911297208?text=${encodeURIComponent(
    'Olá! Vi o site demonstrativo do Restaurante Pinto Frito e gostaria de fazer um orçamento para criar um site profissional para o meu negócio!'
  )}`;

  const mailtoLink = `mailto:${EMAIL_HOTMAIL}?cc=${EMAIL_GMAIL}&subject=${encodeURIComponent(
    'Orçamento de Site Profissional - Contato'
  )}&body=${encodeURIComponent(
    'Olá!\n\nGostei muito do modelo demonstrativo do Restaurante Pinto Frito e tenho interesse em encomendar um site profissional para o meu restaurante / negócio.\n\nAguardo seu retorno com informações sobre valores e prazos!'
  )}`;

  return (
    <DemoNoticeContext.Provider value={{ openDemoNotice }}>
      {children}

      {/* Warning & Sales Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-notice-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <div
            className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient background glow */}
            <div className="absolute -top-24 -right-24 w-52 h-52 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
              aria-label="Fechar aviso"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Notice */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <AlertCircle className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                  Aviso Importante
                </span>
                <h3 id="demo-notice-title" className="text-lg sm:text-xl font-black text-white leading-tight">
                  Este é um Site Fictício Demonstrativo
                </h3>
              </div>
            </div>

            {/* Fictitious Explanation */}
            <div className="bg-stone-950/80 rounded-2xl p-4 border border-stone-800 text-xs sm:text-sm text-stone-300 leading-relaxed mb-6 space-y-2">
              <p>
                O <strong className="text-amber-400">Restaurante Pinto Frito</strong> é um projeto modelo criado exclusivamente para demonstrar alta tecnologia web (cardápio interativo, reservas online, sacola de pedidos e painel administrativo).
              </p>
              <p className="text-stone-400 text-xs">
                {noticePlatform === 'instagram' && 'Por ser fictício, o perfil do Instagram deste restaurante ainda não possui atendimento real.'}
                {noticePlatform === 'whatsapp' && 'Por ser fictício, o número de WhatsApp deste restaurante ainda não possui atendimento real ou delivery ativo.'}
                {noticePlatform === 'facebook' && 'Por ser fictício, não há página oficial no Facebook deste restaurante fictício.'}
                {noticePlatform === 'maps' && 'Por ser fictício, o restaurante não possui endereço físico aberto para visitação no Google Maps.'}
                {noticePlatform === 'waze' && 'Por ser fictício, o restaurante não possui endereço físico para navegação no Waze.'}
                {noticePlatform === 'telefone' && 'Por ser fictício, não há linha telefônica real para este restaurante.'}
                {noticePlatform === 'geral' && 'Por este motivo, não há atendimento de pedidos, telefone, endereço físico ou redes sociais reais deste restaurante.'}
              </p>
            </div>

              {/* Sales Pitch / Call to Action */}
              <div className="border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-stone-900 to-amber-950/30 rounded-2xl p-5 space-y-4 shadow-inner">
                <div className="flex items-center justify-between gap-2 text-emerald-400 font-bold text-xs">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Quer um site como este para o seu negócio?</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[10px] uppercase tracking-wide border border-emerald-500/30">
                    Preço Bom & Acessível
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-black text-white leading-snug">
                  Construo seu site profissional por um preço justo e que cabe no seu bolso!
                </h4>

                <p className="text-xs text-stone-300 leading-relaxed">
                  Crio sites modernos com cardápio digital interativo, agendamento de reservas online, integração com WhatsApp e painel de pedidos sob medida. Entre em contato direto para negociarmos as melhores condições:
                </p>

              {/* Developer WhatsApp Button */}
              <div className="space-y-2.5 pt-1">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Falar no WhatsApp: {DEVELOPER_WHATSAPP_DISPLAY}</span>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </a>

                  <button
                    onClick={() => handleCopy(DEVELOPER_WHATSAPP_DISPLAY, 'phone')}
                    title="Copiar número de WhatsApp"
                    className="px-3 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-stone-700"
                  >
                    {copiedText === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedText === 'phone' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>

                {/* Email Contacts */}
                <div className="bg-stone-950/60 rounded-xl p-3 border border-stone-800/80 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-stone-300 truncate">
                      <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-semibold text-white">{EMAIL_HOTMAIL}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={`mailto:${EMAIL_HOTMAIL}?subject=${encodeURIComponent('Orçamento de Site Profissional')}`}
                        className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] text-amber-400 font-medium"
                      >
                        Enviar
                      </a>
                      <button
                        onClick={() => handleCopy(EMAIL_HOTMAIL, 'email1')}
                        className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
                        title="Copiar e-mail"
                      >
                        {copiedText === 'email1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs pt-1 border-t border-stone-800/60">
                    <div className="flex items-center gap-2 text-stone-300 truncate">
                      <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-semibold text-white">{EMAIL_GMAIL}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={`mailto:${EMAIL_GMAIL}?subject=${encodeURIComponent('Orçamento de Site Profissional')}`}
                        className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] text-amber-400 font-medium"
                      >
                        Enviar
                      </a>
                      <button
                        onClick={() => handleCopy(EMAIL_GMAIL, 'email2')}
                        className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
                        title="Copiar e-mail"
                      >
                        {copiedText === 'email2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-bold transition-all text-center"
              >
                Entendi, continuar navegando no site
              </button>
            </div>
          </div>
        </div>
      )}
    </DemoNoticeContext.Provider>
  );
};
