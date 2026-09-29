import React, { useEffect, useRef } from 'react';

interface AdSenseBannerProps {
  client?: string;
  slot?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  client = 'ca-pub-7787471982992122',
  slot,
  format = 'auto',
  className = '',
  responsive = true,
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // Only push once per mounted ad slot
    if (pushedRef.current) return;

    try {
      if (typeof window !== 'undefined' && client !== 'ca-pub-0000000000000000') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch (err) {
      console.warn('AdSense push notice:', err);
    }
  }, [client]);

  const isConfigured = client && client !== 'ca-pub-0000000000000000';

  return (
    <div className={`w-full my-8 flex flex-col items-center justify-center overflow-hidden ${className}`}>
      <span className="text-[10px] uppercase font-bold text-stone-300 tracking-widest mb-1.5">
        Publicidade • Google AdSense
      </span>

      <div className="w-full max-w-4xl min-h-[90px] rounded-2xl border border-stone-800/80 bg-stone-950/60 p-2 flex items-center justify-center text-center">
        {isConfigured ? (
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px' }}
            data-ad-client={client}
            {...(slot ? { 'data-ad-slot': slot } : {})}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        ) : (
          <div className="py-6 px-4 space-y-1">
            <p className="text-xs font-semibold text-stone-300">
              Espaço reservado para o Google AdSense (Banner Responsivo)
            </p>
            <p className="text-[11px] text-stone-300">
              Assim que você informar seu <code className="text-amber-400 bg-stone-800/80 px-1.5 py-0.5 rounded">ca-pub-XXXXXXXXXXXXXXXX</code>, os anúncios oficiais do Google serão exibidos aqui.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
