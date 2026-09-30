import { z } from 'zod';

// Brazilian phone regex supporting:
// (11) 98765-4321, (11) 987654321, 11987654321, (11) 8765-4321, 1187654321
const phoneRegex = /^(?:\+?55\s?)?(?:\(?([1-9]{2})\)?\s?)(?:(9\d{4}|\d{4})-?(\d{4}))$/;

export const reservationSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(80, 'O nome deve ter no máximo 80 caracteres.')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'O nome deve conter apenas letras e espaços.'),
  phone: z
    .string()
    .trim()
    .min(10, 'Informe um telefone com DDD válido (ex: 11 98765-4321).')
    .refine((val) => {
      const digits = val.replace(/\D/g, '');
      return digits.length === 10 || digits.length === 11;
    }, {
      message: 'Telefone inválido. Informe o DDD e os 8 ou 9 dígitos.',
    }),
  email: z
    .string()
    .trim()
    .min(1, 'E-mail é obrigatório para confirmação.')
    .email('Informe um e-mail válido (ex: nome@exemplo.com).'),
  occasion: z.string().min(1, 'Selecione a ocasião.'),
  specialRequests: z.string().max(300, 'Máximo de 300 caracteres.').optional(),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;

export const orderCheckoutSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(80, 'O nome deve ter no máximo 80 caracteres.')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'O nome deve conter apenas letras e espaços.'),
  phone: z
    .string()
    .trim()
    .min(10, 'Informe um telefone com DDD válido (ex: 11 98765-4321).')
    .refine((val) => {
      const digits = val.replace(/\D/g, '');
      return digits.length === 10 || digits.length === 11;
    }, {
      message: 'Telefone inválido. Informe o DDD e os 8 ou 9 dígitos.',
    }),
  deliveryType: z.enum(['delivery', 'retirada', 'mesa']),
  address: z.string().optional(),
  tableNumber: z.string().optional(),
  paymentMethod: z.string().min(1, 'Selecione a forma de pagamento.'),
}).superRefine((data, ctx) => {
  if (data.deliveryType === 'delivery') {
    if (!data.address || data.address.trim().length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['address'],
        message: 'Por favor, informe a rua, número e bairro para a entrega.',
      });
    }
  }
  if (data.deliveryType === 'mesa') {
    if (!data.tableNumber || data.tableNumber.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['tableNumber'],
        message: 'Informe o número da sua mesa ou área no salão.',
      });
    }
  }
});

export type OrderCheckoutFormData = z.infer<typeof orderCheckoutSchema>;

/**
 * Automatically masks and formats Brazilian phone numbers as the user types:
 * (11) 98765-4321 or (11) 3456-7890
 */
export function formatPhoneNumber(value: string): string {
  if (!value) return '';
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 2) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}
