import React from 'react';

export const MenuCardSkeleton: React.FC = () => {
  return (
    <div
      role="status"
      aria-label="Carregando prato do cardápio"
      className="bg-stone-900/90 border border-stone-800/80 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.04] before:to-transparent pointer-events-none select-none"
    >
      <div>
        {/* Skeleton Image Container */}
        <div className="relative h-52 sm:h-56 w-full bg-stone-900/90 overflow-hidden">
          <div className="absolute inset-0 bg-stone-800/60 animate-pulse" />

          {/* Skeleton Badges (Top Left) */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <div className="w-16 h-5 rounded-full bg-stone-700/60 animate-pulse" />
            <div className="w-14 h-5 rounded-full bg-stone-700/40 animate-pulse hidden sm:block" />
          </div>

          {/* Skeleton Rating Pill (Top Right) */}
          <div className="absolute top-3 right-3 w-12 h-6 rounded-full bg-stone-950/70 border border-stone-700/40 animate-pulse" />

          {/* Skeleton Quick Stats (Bottom) */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
            <div className="w-16 h-5 rounded-md bg-stone-950/70 border border-stone-700/30 animate-pulse" />
            <div className="w-14 h-5 rounded-md bg-stone-950/70 border border-stone-700/30 animate-pulse" />
          </div>
        </div>

        {/* Skeleton Text Content */}
        <div className="p-5 space-y-3">
          {/* Dish Title */}
          <div className="h-6 w-3/4 rounded-lg bg-stone-800/90 animate-pulse" />

          {/* Dish Description (2 lines) */}
          <div className="space-y-2 pt-1">
            <div className="h-3.5 w-full rounded bg-stone-800/60 animate-pulse" />
            <div className="h-3.5 w-4/5 rounded bg-stone-800/60 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Skeleton Price and Action Bar */}
      <div className="p-5 pt-0 border-t border-stone-800/80 mt-2 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="h-3 w-12 rounded bg-stone-800/50 animate-pulse" />
          <div className="h-6 w-20 rounded-lg bg-stone-800/90 animate-pulse" />
        </div>

        {/* Skeleton Add Button */}
        <div className="h-9 w-24 rounded-xl bg-amber-500/20 border border-amber-500/20 animate-pulse" />
      </div>

      <span className="sr-only">Carregando itens do cardápio...</span>
    </div>
  );
};

export const MenuGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <MenuCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
};
