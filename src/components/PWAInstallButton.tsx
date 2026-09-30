import React, { useState } from 'react';
import { Download, Share2, X, Smartphone, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'banner' | 'footer';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'navbar' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  // If already installed in standalone mode, do not display
  if (isInstalled) {
    return null;
  }

  // Handle click based on device
  const handleClick = () => {
    if (isInstallable) {
      install();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // In desktop or browsers without prompt, trigger installation or show guidance
      install();
    }
  };

  // If neither installable event nor iOS, still allow user to trigger if available
  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={
          variant === 'navbar'
            ? 'hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all hover:scale-105 cursor-pointer'
            : variant === 'banner'
            ? 'inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all hover:scale-105 cursor-pointer'
            : 'inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-semibold cursor-pointer'
        }
        aria-label="Instalar aplicativo do Restaurante Pinto Frito no seu celular ou computador"
        title="Instalar App Oficial (funciona offline)"
      >
        <Download className="w-3.5 h-3.5 text-amber-400" />
        <span>Instalar App</span>
      </button>

      {/* iOS Safari Installation Instruction Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-sm rounded-2xl bg-stone-900 border border-stone-800 p-6 shadow-2xl space-y-4 text-stone-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">Instalar no iPhone / iPad</h3>
                  <span className="text-[11px] text-stone-400">Sem precisar da App Store</span>
                </div>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-stone-950/60 rounded-xl p-3.5 space-y-2.5 text-xs text-stone-300 border border-stone-800/80">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-black flex items-center justify-center shrink-0 text-[10px]">
                  1
                </span>
                <p>
                  Toque no botão <strong className="text-white">Compartilhar</strong> (ícone de quadrado com seta para cima <Share2 className="w-3.5 h-3.5 inline text-amber-400 mx-0.5" />) no Safari.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-black flex items-center justify-center shrink-0 text-[10px]">
                  2
                </span>
                <p>
                  Role o menu para baixo e toque em <strong className="text-white">"Adicionar à Tela de Início"</strong>.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-black flex items-center justify-center shrink-0 text-[10px]">
                  3
                </span>
                <p>
                  Toque em <strong className="text-amber-400">Adicionar</strong> no canto superior. Pronto! O app abrirá em tela cheia com acesso instantâneo.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs transition-colors cursor-pointer"
            >
              Entendi, obrigado!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
