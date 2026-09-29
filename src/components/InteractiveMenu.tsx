import React, { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, Plus, Clock, Users } from 'lucide-react';
import { MenuItem, MenuCategory, CartItem } from '../types/restaurant';
import { DishDetailModal } from './DishDetailModal';

interface InteractiveMenuProps {
  menuItems: MenuItem[];
  onAddToCart: (cartItem: CartItem) => void;
}

export const InteractiveMenu: React.FC<InteractiveMenuProps> = ({
  menuItems,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPopularOnly, setFilterPopularOnly] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);

  const categories: { id: MenuCategory; label: string; icon: string }[] = [
    { id: 'todos', label: 'Todos os Pratos', icon: '🍗' },
    { id: 'baldes', label: 'Baldes Crocantes', icon: '🪣' },
    { id: 'burgers', label: 'Pinto Burgers', icon: '🍔' },
    { id: 'tenders-wings', label: 'Tenders & Asinhas', icon: '🔥' },
    { id: 'acompanhamentos', label: 'Acompanhamentos', icon: '🍟' },
    { id: 'molhos', label: 'Molhos da Casa', icon: '🥣' },
    { id: 'bebidas', label: 'Chopps & Bebidas', icon: '🍺' },
    { id: 'sobremesas', label: 'Sobremesas', icon: '🍨' },
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'todos' && item.category !== selectedCategory) {
        return false;
      }
      // Popular filter
      if (filterPopularOnly && !item.isPopular) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesBadge = item.badges?.some((b) => b.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesBadge;
      }
      return true;
    });
  }, [menuItems, selectedCategory, filterPopularOnly, searchQuery]);

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    // If it has customization options, open modal for better UX
    if (item.customizationOptions?.spiciness || item.customizationOptions?.sauces) {
      setActiveModalItem(item);
    } else {
      const cartItem: CartItem = {
        id: `${item.id}-${Date.now()}`,
        item,
        quantity: 1,
        totalItemPrice: item.price,
      };
      onAddToCart(cartItem);
    }
  };

  return (
    <section id="cardapio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header with SEO-compliant H2 */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Cardápio Interativo
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Sabores Incomparáveis & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">Crocância Pura</span>
        </h2>
        <p className="mt-4 text-stone-300 text-base sm:text-lg">
          Cada pedaço é marinado por 24 horas em especiarias nobres e empanado no ponto exato para estalar a cada mordida. Faça seu pedido ou monte seu combo personalizado.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4 mb-10">
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
          {/* Search bar */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por prato, ingrediente, molho ou balde..."
              className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterPopularOnly(!filterPopularOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                filterPopularOnly
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-stone-700'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Mais Populares
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800/80 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-stone-900/50 rounded-2xl border border-stone-800">
          <p className="text-stone-400 text-base">Nenhum prato encontrado para sua busca.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('todos');
              setFilterPopularOnly(false);
            }}
            className="mt-4 px-4 py-2 text-xs font-bold text-amber-400 border border-amber-500/30 rounded-xl hover:bg-amber-500/10"
          >
            Limpar todos os filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              <div>
                {/* Image Container with strict SEO alt text */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-950">
                  <img
                    src={item.image}
                    alt={item.altText}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.badges?.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-amber-500 text-stone-950 shadow-md"
                      >
                        {badge}
                      </span>
                    ))}
                    {item.spicyLevel && item.spicyLevel > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-600 text-white shadow-md flex items-center gap-0.5">
                        <Flame className="w-3 h-3" /> Picante
                      </span>
                    ) : null}
                  </div>

                  {/* Rating Pill */}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-amber-400 flex items-center gap-1 border border-white/10">
                    <span>★</span>
                    <span>{item.rating.toFixed(1)}</span>
                  </div>

                  {/* Quick stats floating bar */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-stone-300 font-medium">
                    <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-amber-400" />
                      ~{item.prepTimeMinutes} min
                    </span>
                    <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      <Users className="w-3 h-3 text-amber-400" />
                      {item.servesPeople}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-stone-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Price and Action Bar */}
              <div className="p-5 pt-0 border-t border-stone-800/80 mt-2 flex items-center justify-between gap-3">
                <div>
                  {item.originalPrice && (
                    <span className="text-xs text-stone-500 line-through block">
                      R$ {item.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xl font-extrabold text-amber-400">
                    R$ {item.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-all hover:scale-105 shadow-md flex items-center gap-1 text-xs"
                    title="Adicionar à sacola"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span className="hidden sm:inline">Adicionar</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Dish Customizer Modal */}
      <DishDetailModal
        item={activeModalItem}
        isOpen={Boolean(activeModalItem)}
        onClose={() => setActiveModalItem(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};
