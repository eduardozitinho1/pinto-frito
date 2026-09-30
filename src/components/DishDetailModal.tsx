import React, { useState } from 'react';
import { X, Flame, Clock, Users, Plus, Minus, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { MenuItem, CartItem } from '../types/restaurant';

interface DishDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const defaultSpiciness = item?.customizationOptions?.spiciness?.[0] || 'Tradicional Crocante';
  const defaultSauce = item?.customizationOptions?.sauces?.[0] || 'Maionese Verde da Casa';

  const [quantity, setQuantity] = useState(1);
  const [selectedSpiciness, setSelectedSpiciness] = useState(defaultSpiciness);
  const [selectedSauce, setSelectedSauce] = useState(defaultSauce);
  const [selectedExtras, setSelectedExtras] = useState<{ name: string; price: number }[]>([]);
  const [notes, setNotes] = useState('');
  const [addedAlert, setAddedAlert] = useState(false);

  if (!isOpen || !item) return null;

  const extrasCost = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const unitPrice = item.price + extrasCost;
  const totalPrice = unitPrice * quantity;

  const toggleExtra = (extra: { name: string; price: number }) => {
    if (selectedExtras.some((e) => e.name === extra.name)) {
      setSelectedExtras(selectedExtras.filter((e) => e.name !== extra.name));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const handleAdd = () => {
    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      item,
      quantity,
      selectedSpiciness: item.customizationOptions?.spiciness ? selectedSpiciness : undefined,
      selectedSauce: item.customizationOptions?.sauces ? selectedSauce : undefined,
      selectedExtras: selectedExtras.length > 0 ? selectedExtras : undefined,
      notes: notes.trim() ? notes.trim() : undefined,
      totalItemPrice: totalPrice,
    };

    onAddToCart(cartItem);
    setAddedAlert(true);
    setTimeout(() => {
      setAddedAlert(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden text-stone-100 my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-stone-300 hover:text-white transition-all backdrop-blur-md"
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dish Hero Image with SEO-friendly alt tag */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-950">
          <img
            src={item.image}
            alt={item.altText}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {item.badges?.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-stone-950 shadow-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <h2 id="dish-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white">
                {item.name}
              </h2>
            </div>
            
            <div className="text-right">
              {item.originalPrice && (
                <span className="text-sm text-stone-400 line-through block">
                  R$ {item.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                R$ {item.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 border-b border-stone-800 pb-4">
            <span className="flex items-center gap-1.5 bg-stone-800 px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4 text-amber-400" />
              Preparo em ~{item.prepTimeMinutes} min
            </span>
            <span className="flex items-center gap-1.5 bg-stone-800 px-3 py-1.5 rounded-lg">
              <Users className="w-4 h-4 text-amber-400" />
              {item.servesPeople}
            </span>
            <span className="flex items-center gap-1.5 bg-stone-800 px-3 py-1.5 rounded-lg">
              <span className="text-amber-400 font-bold">★ {item.rating.toFixed(2)}</span>
              ({item.reviewCount} avaliações)
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-1">Descrição do Prato</h3>
            <p className="text-stone-200 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Spiciness Options */}
          {item.customizationOptions?.spiciness && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-stone-200 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-red-500" />
                  Nível de Picância (Obrigatório)
                </h3>
                <span className="text-xs text-amber-400">Selecione 1</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {item.customizationOptions.spiciness.map((spice) => (
                  <button
                    key={spice}
                    type="button"
                    onClick={() => setSelectedSpiciness(spice)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      selectedSpiciness === spice
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-sm'
                        : 'border-stone-800 bg-stone-800/60 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    {spice}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sauce Options */}
          {item.customizationOptions?.sauces && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-stone-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Molho Artesanal Incluso
                </h3>
                <span className="text-xs text-amber-400">Selecione 1</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.customizationOptions.sauces.map((sauce) => (
                  <button
                    key={sauce}
                    type="button"
                    onClick={() => setSelectedSauce(sauce)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                      selectedSauce === sauce
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-stone-800 bg-stone-800/60 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <span>{sauce}</span>
                    {selectedSauce === sauce && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extras */}
          {item.customizationOptions?.extras && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-stone-200">
                Adicionais Extras para Turbinar
              </h3>
              <div className="space-y-2">
                {item.customizationOptions.extras.map((extra) => {
                  const isSelected = selectedExtras.some((e) => e.name === extra.name);
                  return (
                    <button
                      key={extra.name}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`w-full p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-stone-800 bg-stone-800/40 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isSelected ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-stone-600'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{extra.name}</span>
                      </div>
                      <span className="font-semibold text-amber-400">
                        + R$ {extra.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cooking notes */}
          <div>
            <label htmlFor="dish-notes" className="block text-xs font-semibold text-stone-400 uppercase mb-1.5">
              Observações para a Cozinha (Opcional)
            </label>
            <input
              id="dish-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: sem picles, molho à parte, bem douradinho..."
              maxLength={120}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-stone-900 border border-stone-800 rounded-xl p-1 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="p-2 text-stone-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-sm min-w-8 text-center text-white">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Aumentar quantidade"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAdd}
            className={`w-full sm:flex-1 py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
              addedAlert
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 hover:scale-[1.02]'
            }`}
          >
            {addedAlert ? (
              <>
                <Check className="w-5 h-5" />
                Adicionado com Sucesso!
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>Adicionar à Sacola • R$ {totalPrice.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
