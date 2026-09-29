import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CheckCircle2, QrCode, Tag, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order, OrderStatus } from '../types/restaurant';
import { useDemoNotice } from '../context/DemoNoticeContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderCreated: (order: Order) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderCreated,
}) => {
  const { openDemoNotice } = useDemoNotice();
  if (!isOpen) return null;

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'retirada' | 'mesa'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pix Instantâneo');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [activeCreatedOrder, setActiveCreatedOrder] = useState<Order | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.totalItemPrice, 0);
  const deliveryFee = deliveryType === 'delivery' ? (subtotal > 100 ? 0 : 8.00) : 0;
  const total = Math.max(0, subtotal + deliveryFee - appliedDiscount);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'PINTO10') {
      const disc = subtotal * 0.1;
      setAppliedDiscount(disc);
      setCouponMessage('Cupom PINTO10 aplicado! 10% de desconto garantido.');
    } else if (code === 'CROCANTE') {
      setAppliedDiscount(15);
      setCouponMessage('Cupom CROCANTE aplicado! R$ 15,00 de desconto.');
    } else {
      setCouponMessage('Cupom inválido. Tente usar PINTO10 ou CROCANTE');
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!customerName.trim() || !phone.trim()) {
      alert('Por favor informe seu nome e telefone para contato.');
      return;
    }
    if (deliveryType === 'delivery' && !address.trim()) {
      alert('Por favor informe o endereço completo para entrega.');
      return;
    }

    const orderId = `PED-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      deliveryType,
      address: deliveryType === 'delivery' ? address.trim() : undefined,
      tableNumber: deliveryType === 'mesa' ? (tableNumber.trim() || 'Mesa não informada') : undefined,
      items: [...cart],
      subtotal,
      deliveryFee,
      discount: appliedDiscount,
      total,
      paymentMethod,
      status: 'Recebido' as OrderStatus,
      estimatedMinutes: deliveryType === 'delivery' ? 35 : 20,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onOrderCreated(newOrder);
    setActiveCreatedOrder(newOrder);
    onClearCart();

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ea580c']
      });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden text-stone-100 my-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">
                {activeCreatedOrder ? 'Pedido Confirmado & Rastreador' : 'Sua Sacola de Delícias'}
              </h2>
              <span className="text-[11px] text-stone-400">
                {activeCreatedOrder ? `Identificador: ${activeCreatedOrder.id}` : `${cart.length} itens selecionados`}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveCreatedOrder(null);
              onClose();
            }}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
            aria-label="Fechar sacola"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Confirmed Screen */}
        {activeCreatedOrder ? (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Pedido Recebido com Sucesso!
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                A cozinha do Pinto Frito já está em ação!
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Tempo estimado: <strong>~{activeCreatedOrder.estimatedMinutes} minutos</strong>
              </p>
            </div>

            {/* Live Progress Tracker */}
            <div className="bg-stone-950 border border-stone-800 rounded-2xl p-5 text-left space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Status do Pedido em Tempo Real
              </h4>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-emerald-500" />
                  <span className="font-bold text-emerald-400">1. Recebido</span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="font-bold text-amber-400">2. Em Preparo</span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-stone-800" />
                  <span className="text-stone-500">3. Na Entrega</span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-stone-800" />
                  <span className="text-stone-500">4. Entregue</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800 text-xs text-stone-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-400">Cliente:</span>
                  <span className="font-semibold text-white">{activeCreatedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Modalidade:</span>
                  <span className="capitalize font-semibold text-amber-400">{activeCreatedOrder.deliveryType}</span>
                </div>
                {activeCreatedOrder.address && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Endereço:</span>
                    <span className="text-white text-right max-w-xs">{activeCreatedOrder.address}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-400">Pagamento:</span>
                  <span className="font-semibold text-white">{activeCreatedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 font-bold text-amber-400 border-t border-stone-800/80">
                  <span>Total Pago:</span>
                  <span>R$ {activeCreatedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Share button */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => openDemoNotice({ platform: 'whatsapp' })}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Acompanhar via WhatsApp da Loja
              </button>

              <button
                onClick={() => {
                  setActiveCreatedOrder(null);
                  onClose();
                }}
                className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold"
              >
                Concluir & Fechar
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-800/80 text-stone-500 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white">Sua sacola está vazia</h3>
            <p className="text-xs text-stone-400 max-w-xs mx-auto">
              Que tal experimentar nosso premiado <strong>Balde Supremo da Casa</strong> ou o suculento <strong>Pinto Burger</strong>?
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
            >
              Explorar Cardápio
            </button>
          </div>
        ) : (
          /* Normal Cart List & Checkout Form */
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Items List */}
            <div className="space-y-3">
              {cart.map((cartItem) => (
                <div
                  key={cartItem.id}
                  className="bg-stone-950 border border-stone-800/90 rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 items-center justify-between"
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.altText}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-stone-800"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                      {cartItem.item.name}
                    </h4>

                    {/* Customizations tags */}
                    <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-stone-400">
                      {cartItem.selectedSpiciness && (
                        <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800 text-amber-400">
                          {cartItem.selectedSpiciness}
                        </span>
                      )}
                      {cartItem.selectedSauce && (
                        <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                          Molho: {cartItem.selectedSauce}
                        </span>
                      )}
                      {cartItem.selectedExtras?.map((e) => (
                        <span key={e.name} className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800 text-stone-300">
                          +{e.name}
                        </span>
                      ))}
                    </div>

                    <div className="mt-2 font-extrabold text-xs sm:text-sm text-amber-400">
                      R$ {cartItem.totalItemPrice.toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity Modifier & Remove */}
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
                        className="p-1 text-stone-400 hover:text-white"
                        aria-label="Diminuir"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-white px-1.5">{cartItem.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                        className="p-1 text-stone-400 hover:text-white"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(cartItem.id)}
                      className="p-1.5 text-stone-500 hover:text-red-400 transition-colors"
                      title="Remover item"
                      aria-label="Remover item da sacola"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Type Option */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-300 block uppercase">Como deseja receber?</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'delivery', label: 'Delivery Rápido', feeText: subtotal > 100 ? 'Grátis' : 'R$ 8,00' },
                  { id: 'retirada', label: 'Retirada no Balcão', feeText: 'Sem taxa' },
                  { id: 'mesa', label: 'Consumir na Mesa', feeText: 'No local' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setDeliveryType(type.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      deliveryType === type.id
                        ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                        : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{type.label}</div>
                    <div className="text-[10px] text-amber-400 mt-0.5">{type.feeText}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="bg-stone-950 p-3 rounded-2xl border border-stone-800 space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Cupom de Desconto (ex: PINTO10)"
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white uppercase placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-amber-400 font-bold rounded-xl text-xs transition-colors"
                >
                  Aplicar
                </button>
              </div>
              {couponMessage && (
                <p className={`text-[11px] ${appliedDiscount > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {couponMessage}
                </p>
              )}
            </div>

            {/* Customer Details Form */}
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-400 mb-1">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-400 mb-1">WhatsApp / Telefone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 98765-4321"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label className="block text-xs text-stone-400 mb-1">Endereço Completo para Entrega *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Rua, Número, Bairro, Apto/Bloco e Ponto de Referência"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              {deliveryType === 'mesa' && (
                <div>
                  <label className="block text-xs text-stone-400 mb-1">Número da sua Mesa no Salão</label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Ex: Mesa 04 ou Varanda 02"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs text-stone-400 mb-1">Forma de Pagamento</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Pix Instantâneo', 'Cartão no Delivery', 'Dinheiro'].map((pm) => (
                    <button
                      key={pm}
                      type="button"
                      onClick={() => setPaymentMethod(pm)}
                      className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                        paymentMethod === pm
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                          : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Financial Summary */}
              <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal dos Itens:</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Taxa de Entrega:</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-400">Grátis</strong> : `R$ ${deliveryFee.toFixed(2)}`}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Desconto do Cupom:</span>
                    <span>- R$ {appliedDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-800 flex justify-between text-base font-extrabold text-white">
                  <span>Total do Pedido:</span>
                  <span className="text-amber-400">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Final Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Finalizar Pedido • R$ {total.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
