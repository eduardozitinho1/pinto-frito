import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-amber-500 text-stone-950 shadow-2xl font-bold text-xs border border-amber-400 animate-bounce"
    >
      <WifiOff className="w-4 h-4 stroke-[2.5]" />
      <span>Modo Offline Ativo — Navegando via cache ultrarrápido</span>
    </div>
  );
};
