import React, { useState } from 'react';
import { 
  Smartphone, 
  Download, 
  Terminal, 
  Copy, 
  Check, 
  X, 
  Layers, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Package, 
  FolderGit2 
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AndroidAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidAppModal: React.FC<AndroidAppModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'instant' | 'apk'>('instant');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { isInstallable, isInstalled, install } = usePWAInstall();

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const commands = [
    {
      title: '1. Sincronizar código web com Android nativo',
      cmd: 'npm run android:build',
    },
    {
      title: '2. Compilar APK Debug para celular',
      cmd: 'cd android && ./gradlew assembleDebug',
    },
    {
      title: '3. Abrir no Android Studio para gerar Release / Play Store',
      cmd: 'npx cap open android',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-4 animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden text-stone-100 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="android-modal-title"
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-stone-800 flex items-center justify-between bg-stone-900/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-amber-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="android-modal-title" className="text-xl font-extrabold text-white">
                  App Android do Pinto Frito
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                  Nativo & WebAPK
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Disponível para instalar direto no smartphone ou compilar via Gradle/Android Studio.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4 flex gap-2 border-b border-stone-800 bg-stone-950/40">
          <button
            onClick={() => setActiveTab('instant')}
            className={`pb-3 px-4 text-xs font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
              activeTab === 'instant'
                ? 'text-amber-400 font-extrabold border-b-2 border-amber-400'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Instalar no Celular (Instantâneo)</span>
          </button>

          <button
            onClick={() => setActiveTab('apk')}
            className={`pb-3 px-4 text-xs font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
              activeTab === 'apk'
                ? 'text-amber-400 font-extrabold border-b-2 border-amber-400'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Gerar APK Nativo (Capacitor & Android Studio)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {activeTab === 'instant' ? (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-stone-900 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instalação sem burocracia</span>
                  </div>
                  <h4 className="font-extrabold text-white text-base">
                    Instalar App no seu Smartphone Android
                  </h4>
                  <p className="text-xs text-stone-300">
                    O aplicativo roda em tela cheia, consome quase zero de memória e funciona mesmo sem conexão à internet.
                  </p>
                </div>

                {isInstalled ? (
                  <div className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center gap-2 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>App já Instalado!</span>
                  </div>
                ) : isInstallable ? (
                  <button
                    onClick={() => {
                      install();
                      onClose();
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Instalar Agora</span>
                  </button>
                ) : (
                  <div className="text-center sm:text-right shrink-0">
                    <span className="px-3 py-1 rounded-lg bg-stone-800 text-stone-400 text-[11px] font-bold block">
                      Disponível no Chrome Mobile
                    </span>
                  </div>
                )}
              </div>

              {/* Step by step */}
              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-stone-400">
                  Como adicionar à gaveta de apps do Android:
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center">
                      1
                    </span>
                    <strong className="text-white text-xs block">Abra no Chrome</strong>
                    <p className="text-[11px] text-stone-400">
                      Acesse este site pelo navegador Google Chrome do seu celular.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center">
                      2
                    </span>
                    <strong className="text-white text-xs block">Toque nos 3 pontos (⋮)</strong>
                    <p className="text-[11px] text-stone-400">
                      Abra as opções do navegador no canto superior direito.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center">
                      3
                    </span>
                    <strong className="text-white text-xs block">"Instalar Aplicativo"</strong>
                    <p className="text-[11px] text-stone-400">
                      Toque em Instalar. O ícone oficial será adicionado à sua tela inicial!
                    </p>
                  </div>
                </div>
              </div>

              {/* Android Features */}
              <div className="p-4 rounded-2xl bg-stone-950/50 border border-stone-800 space-y-2 text-xs">
                <strong className="text-amber-400 block font-bold">Vantagens do App Android:</strong>
                <ul className="space-y-1.5 text-stone-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Cardápio completo acessível mesmo offline</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Notificações e pedidos rápidos com 1 clique</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Sem anúncios e com abertura instantânea</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Native Capacitor Package Info */}
              <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white text-xs">Projeto Nativo Configurado:</span>
                  </div>
                  <span className="font-mono text-[11px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                    com.pintofrito.app
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800/80">
                    <span className="text-stone-400 block text-[10px]">Plataforma</span>
                    <strong className="text-white">Android SDK 34 / 35</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800/80">
                    <span className="text-stone-400 block text-[10px]">Framework</span>
                    <strong className="text-white">Capacitor v8 + Gradle</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800/80 col-span-2 sm:col-span-1">
                    <span className="text-stone-400 block text-[10px]">Saída</span>
                    <strong className="text-emerald-400">app-debug.apk / AAB</strong>
                  </div>
                </div>
              </div>

              {/* Step by step terminal commands */}
              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-stone-400">
                  Comandos para Compilar o APK no Terminal:
                </h5>

                <div className="space-y-2.5">
                  {commands.map((c, i) => (
                    <div key={i} className="p-3 rounded-xl bg-stone-950 border border-stone-800/90 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-300">{c.title}</span>
                        <button
                          onClick={() => copyToClipboard(c.cmd, i)}
                          className="px-2 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedIndex === i ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="font-mono text-xs text-amber-400 bg-stone-900/90 p-2 rounded-lg border border-stone-800 overflow-x-auto select-all">
                        $ {c.cmd}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output directory notice */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300/90 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <FolderGit2 className="w-4 h-4" />
                  <span>Localização do APK compilado:</span>
                </div>
                <code className="block bg-stone-950 p-2 rounded-lg text-[11px] font-mono text-stone-300 mt-1 select-all border border-amber-500/20">
                  android/app/build/outputs/apk/debug/app-debug.apk
                </code>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/60 flex items-center justify-between">
          <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Compatível com Android 8.0 até Android 15</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
