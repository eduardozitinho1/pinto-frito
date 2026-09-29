import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquarePlus, CheckCircle, ShieldCheck, X } from 'lucide-react';
import { CustomerReview } from '../types/restaurant';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
  onAddReview: (review: CustomerReview) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onAddReview,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newDish, setNewDish] = useState('');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const review: CustomerReview = {
      id: `rev-${Date.now()}`,
      authorName: newAuthor.trim(),
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=120&q=80`,
      rating: newRating,
      date: 'Agora mesmo',
      comment: newComment.trim(),
      dishRecommended: newDish.trim() || undefined,
      verified: true,
      likes: 1,
    };

    onAddReview(review);
    setIsModalOpen(false);
    setNewAuthor('');
    setNewComment('');
    setNewDish('');
    setNewRating(5);
  };

  return (
    <section id="avaliacoes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section SEO Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            Avaliações Verificadas do Google
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Quem Provou, <span className="text-amber-400">Virou Fã</span>
          </h2>
          <p className="mt-2 text-stone-400 text-sm sm:text-base max-w-xl">
            Mais de 2.400 clientes apaixonados pelo nosso frango crocante, ambiente e chopp gelado.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 hover:text-white border border-stone-700 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shrink-0 hover:scale-105"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Deixar Minha Avaliação
        </button>
      </div>

      {/* Google Reviews Summary Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 mb-10 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Main Score */}
        <div className="text-center md:text-left md:border-r md:border-stone-800 md:pr-8">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-5xl font-black text-white">4.9</span>
            <div>
              <div className="flex text-amber-400 text-lg">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-stone-400 mt-1 block">
                Baseado em <strong>2.482 avaliações</strong>
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center md:justify-start gap-1.5 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Classificação Excelente no Google & TripAdvisor</span>
          </div>
        </div>

        {/* Rating Bars */}
        <div className="space-y-1.5 text-xs">
          {[
            { stars: '5 estrelas', pct: '92%', count: '2.283' },
            { stars: '4 estrelas', pct: '6%', count: '148' },
            { stars: '3 estrelas', pct: '1%', count: '35' },
            { stars: '2 estrelas', pct: '<1%', count: '11' },
            { stars: '1 estrela', pct: '<1%', count: '5' },
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center gap-3">
              <span className="w-16 text-stone-400 text-right shrink-0">{bar.stars}</span>
              <div className="flex-1 h-2 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: bar.pct }}
                />
              </div>
              <span className="w-12 text-stone-400 text-left shrink-0">{bar.pct}</span>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="bg-stone-950/70 p-4 rounded-2xl border border-stone-800 space-y-2 text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Crocância & Sabor: <strong>99.4% aprovação</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Velocidade de Atendimento: <strong>4.9 / 5.0</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Espaço Acolhedor & Pet Friendly: <strong>5.0 / 5.0</strong></span>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => {
          const isLiked = likedReviews[rev.id];
          const totalLikes = rev.likes + (isLiked ? 1 : 0);

          return (
            <article
              key={rev.id}
              className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:border-stone-700 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatarUrl}
                      alt={`Foto de perfil de ${rev.authorName}`}
                      className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/30"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-white">{rev.authorName}</h3>
                        {rev.verified && (
                          <span title="Cliente Verificado">
                            <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-400">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-400' : 'text-stone-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-stone-200 text-xs sm:text-sm leading-relaxed mb-4">
                  "{rev.comment}"
                </p>

                {rev.dishRecommended && (
                  <div className="mb-4">
                    <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full inline-block">
                      🍗 Prato recomendado: {rev.dishRecommended}
                    </span>
                  </div>
                )}

                {/* Review Photo with explicit alt text */}
                {rev.photoUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-stone-800 h-40">
                    <img
                      src={rev.photoUrl}
                      alt={rev.altText || `Foto de prato do Restaurante Pinto Frito enviada por ${rev.authorName}`}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span className="text-[11px]">Avaliação verificada no Google</span>
                <button
                  onClick={() => handleLike(rev.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                    isLiked
                      ? 'bg-amber-500/20 text-amber-400 font-semibold'
                      : 'hover:bg-stone-800 text-stone-400'
                  }`}
                  aria-label="Marcar como útil"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Útil ({totalLikes})</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal to Submit Review */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-stone-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-2">Compartilhe sua Experiência</h3>
            <p className="text-xs text-stone-400 mb-6">
              Sua avaliação ajuda outros clientes a escolherem o prato perfeito e fortalece nosso atendimento!
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-stone-300 font-semibold mb-1.5">Sua Nota</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewRating(s)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          s <= newRating ? 'fill-amber-400 text-amber-400' : 'text-stone-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="rev-author" className="block text-xs text-stone-300 font-semibold mb-1">Seu Nome *</label>
                <input
                  id="rev-author"
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="Ex: Beatriz Silva"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label htmlFor="rev-dish" className="block text-xs text-stone-300 font-semibold mb-1">Prato que Você Mais Amou (Opcional)</label>
                <input
                  id="rev-dish"
                  type="text"
                  value={newDish}
                  onChange={(e) => setNewDish(e.target.value)}
                  placeholder="Ex: Balde Supremo, Pinto Burger..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label htmlFor="rev-comment" className="block text-xs text-stone-300 font-semibold mb-1">Seu Comentário *</label>
                <textarea
                  id="rev-comment"
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Conte como foi sua visita, o sabor do frango, atendimento..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all"
                >
                  Publicar Avaliação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
