import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Clock, Users, MapPin, CheckCircle, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Reservation } from '../types/restaurant';
import { useDemoNotice } from '../context/DemoNoticeContext';
import { reservationSchema, ReservationFormData, formatPhoneNumber } from '../schemas/formSchemas';

interface ReservationSectionProps {
  onReservationCreated: (reservation: Reservation) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationCreated,
}) => {
  const [dateOption, setDateOption] = useState('Hoje');
  const [customDate, setCustomDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('20:00');
  const [guests, setGuests] = useState(4);
  const [seatingArea, setSeatingArea] = useState<'Salão Principal Climatizado' | 'Varanda Jardim Pet Friendly' | 'Lounge Bar & Chopp'>('Salão Principal Climatizado');
  const { openDemoNotice } = useDemoNotice();

  // Confirmation state
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const timeSlots = [
    { time: '12:00', label: 'Almoço', available: true },
    { time: '13:00', label: 'Almoço', available: true },
    { time: '14:00', label: 'Almoço', available: true },
    { time: '19:00', label: 'Jantar', available: true },
    { time: '19:30', label: 'Jantar', available: true },
    { time: '20:00', label: 'Jantar (Mais procurado)', available: true },
    { time: '20:30', label: 'Jantar', available: true },
    { time: '21:00', label: 'Jantar', available: true },
    { time: '21:30', label: 'Jantar', available: true },
  ];

  // react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      customerName: '',
      phone: '',
      email: '',
      occasion: 'Jantar com Amigos',
      specialRequests: '',
    },
    mode: 'onTouched',
  });

  const onValidSubmit = (data: ReservationFormData) => {
    const dateToSave = dateOption === 'Outra data' ? (customDate || 'Data a confirmar') : dateOption;

    const newRes: Reservation = {
      id: `RES-${Math.floor(100 + Math.random() * 900)}`,
      customerName: data.customerName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      date: dateToSave,
      time: selectedTime,
      guests,
      seatingArea,
      occasion: data.occasion,
      specialRequests: data.specialRequests?.trim() || undefined,
      status: 'Confirmada',
      createdAt: 'Agora mesmo',
    };

    onReservationCreated(newRes);
    setConfirmedReservation(newRes);

    // Blast celebratory confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ea580c', '#fbbf24', '#ffffff']
      });
    } catch {
      // Ignore if canvas is disabled
    }
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('phone', formatted, { shouldValidate: true, shouldDirty: true });
  };

  const handleReset = () => {
    setConfirmedReservation(null);
    reset();
  };

  return (
    <section id="reservas" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* SEO Header H2 */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5" />
              Agendamento em Tempo Real
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Reserve sua Mesa no <span className="text-amber-400">Pinto Frito</span>
            </h2>
            <p className="mt-3 text-stone-300 text-sm sm:text-base">
              Garanta seu lugar sem filas. Confirmação instantânea por e-mail e WhatsApp com atendimento VIP.
            </p>
          </div>

          {confirmedReservation ? (
            /* Confirmation Screen */
            <div className="max-w-xl mx-auto bg-stone-950/80 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Reserva Confirmada com Sucesso!
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  Esperamos por você, {confirmedReservation.customerName}!
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Código da Reserva: <strong className="text-amber-400">{confirmedReservation.id}</strong>
                </p>
              </div>

              {/* Reservation summary voucher */}
              <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 text-left text-xs sm:text-sm space-y-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                  <span className="text-stone-400">Data & Horário:</span>
                  <span className="font-bold text-white">{confirmedReservation.date} às {confirmedReservation.time}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                  <span className="text-stone-400">Número de Pessoas:</span>
                  <span className="font-bold text-white">{confirmedReservation.guests} convidados</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                  <span className="text-stone-400">Espaço Reservado:</span>
                  <span className="font-bold text-amber-400">{confirmedReservation.seatingArea}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Ocasião:</span>
                  <span className="font-medium text-stone-200">{confirmedReservation.occasion}</span>
                </div>
                {confirmedReservation.specialRequests && (
                  <div className="pt-2 border-t border-stone-800 text-stone-400 text-xs">
                    <em>Observação: {confirmedReservation.specialRequests}</em>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => openDemoNotice({ platform: 'whatsapp' })}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enviar no WhatsApp do Restaurante
                </button>

                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-all"
                >
                  Fazer Outra Reserva
                </button>
              </div>
            </div>
          ) : (
            /* Reservation Form */
            <form onSubmit={handleSubmit(onValidSubmit)} className="max-w-4xl mx-auto space-y-8" noValidate>

              {/* Step 1: Date & Guests */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-stone-200 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-stone-950 text-xs font-extrabold">1</span>
                  Escolha o Dia e o Número de Convidados
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['Hoje', 'Amanhã', 'Esta Sexta', 'Este Sábado', 'Outra data'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setDateOption(opt)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-center border transition-all ${
                        dateOption === opt
                          ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold shadow-md'
                          : 'bg-stone-950/60 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {dateOption === 'Outra data' && (
                  <div>
                    <label htmlFor="custom-date-input" className="block text-xs text-stone-400 mb-1">Selecione o dia desejado:</label>
                    <input
                      id="custom-date-input"
                      type="date"
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}

                {/* Number of Guests Slider / Buttons */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs text-stone-400 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      Quantidade de Lugares / Pessoas:
                    </label>
                    <span className="text-sm font-extrabold text-amber-400 bg-stone-950 px-3 py-0.5 rounded-full border border-stone-800">
                      {guests} {guests === 1 ? 'Pessoa' : 'Pessoas'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuests(num)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                          guests === num
                            ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-md scale-105'
                            : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Time Slots & Seating Area */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-stone-200 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-stone-950 text-xs font-extrabold">2</span>
                  Horário e Ambiente do Restaurante
                </h3>

                <div>
                  <label className="block text-xs text-stone-400 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Horários Disponíveis (Confirmação Imediata):
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                          selectedTime === slot.time
                            ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-md scale-105'
                            : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seating Area choice */}
                <div>
                  <label className="block text-xs text-stone-400 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Escolha o Espaço Desejado:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        name: 'Salão Principal Climatizado',
                        desc: 'Ambiente aconchegante com ar-condicionado, luz acolhedora e música ambiente.',
                      },
                      {
                        name: 'Varanda Jardim Pet Friendly',
                        desc: 'Área externa arborizada e fresca. Seu pet é super bem-vindo com pote de água!',
                      },
                      {
                        name: 'Lounge Bar & Chopp',
                        desc: 'Próximo às torneiras de chopp artesanal e balcão, ideal para happy hours e amigos.',
                      },
                    ].map((area) => (
                      <button
                        key={area.name}
                        type="button"
                        onClick={() => setSeatingArea(area.name as any)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          seatingArea === area.name
                            ? 'border-amber-500 bg-amber-500/10 shadow-md'
                            : 'border-stone-800 bg-stone-950/70 hover:border-stone-700'
                        }`}
                      >
                        <div className="font-bold text-xs sm:text-sm text-white mb-1">
                          {area.name}
                        </div>
                        <p className="text-[11px] text-stone-400 leading-relaxed">
                          {area.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Contact & Occasion */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-stone-200 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-stone-950 text-xs font-extrabold">3</span>
                  Seus Dados para Confirmação VIP
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="res-name" className="block text-xs text-stone-400 mb-1">Nome Completo *</label>
                    <input
                      id="res-name"
                      type="text"
                      {...register('customerName')}
                      placeholder="Ex: Carlos Oliveira"
                      className={`w-full bg-stone-950 border rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-600 focus:outline-none transition-colors ${
                        errors.customerName ? 'border-red-500 focus:border-red-500' : 'border-stone-800 focus:border-amber-500'
                      }`}
                    />
                    {errors.customerName && (
                      <p className="mt-1 text-[11px] text-red-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.customerName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="res-phone" className="block text-xs text-stone-400 mb-1">WhatsApp / Telefone *</label>
                    <input
                      id="res-phone"
                      type="tel"
                      {...register('phone')}
                      onChange={handlePhoneInputChange}
                      placeholder="(11) 98765-4321"
                      className={`w-full bg-stone-950 border rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-600 focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500 focus:border-red-500' : 'border-stone-800 focus:border-amber-500'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-[11px] text-red-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="res-email" className="block text-xs text-stone-400 mb-1">E-mail para Confirmação *</label>
                    <input
                      id="res-email"
                      type="email"
                      {...register('email')}
                      placeholder="carlos@exemplo.com"
                      className={`w-full bg-stone-950 border rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-600 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-stone-800 focus:border-amber-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="res-occasion" className="block text-xs text-stone-400 mb-1">Ocasião Especial</label>
                    <select
                      id="res-occasion"
                      {...register('occasion')}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Jantar com Amigos">Jantar com Amigos</option>
                      <option value="Aniversário (Ganhe sobremesa!)">Aniversário (Ganhe sobremesa! 🎉)</option>
                      <option value="Encontro Romântico">Encontro Romântico</option>
                      <option value="Almoço de Família">Almoço de Família</option>
                      <option value="Happy Hour de Trabalho">Happy Hour de Trabalho</option>
                      <option value="Outro">Outro momento especial</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="res-special" className="block text-xs text-stone-400 mb-1">Observações / Cadeirinha de bebê / etc.</label>
                    <input
                      id="res-special"
                      type="text"
                      {...register('specialRequests')}
                      placeholder="Ex: levaremos bolo, preferência perto da janela..."
                      className={`w-full bg-stone-950 border rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-600 focus:outline-none transition-colors ${
                        errors.specialRequests ? 'border-red-500 focus:border-red-500' : 'border-stone-800 focus:border-amber-500'
                      }`}
                    />
                    {errors.specialRequests && (
                      <p className="mt-1 text-[11px] text-red-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.specialRequests.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-stone-400 text-center sm:text-left">
                  ⚡ <strong>Sem taxa de reserva</strong> • Cancelamento gratuito até 30min antes.
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-stone-950" />
                  Confirmar Reserva Online Grátis
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
