export type MenuCategory = 
  | 'todos'
  | 'baldes'
  | 'burgers'
  | 'tenders-wings'
  | 'acompanhamentos'
  | 'molhos'
  | 'bebidas'
  | 'sobremesas';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  altText: string;
  badges?: string[];
  spicyLevel?: 0 | 1 | 2 | 3;
  rating: number;
  reviewCount: number;
  servesPeople: string;
  prepTimeMinutes: number;
  isPopular?: boolean;
  isAvailable?: boolean;
  availableSauces?: string[];
  customizationOptions?: {
    spiciness?: string[];
    sauces?: string[];
    extras?: { name: string; price: number }[];
  };
}

export interface CartItem {
  id: string;
  item: MenuItem;
  quantity: number;
  selectedSpiciness?: string;
  selectedSauce?: string;
  selectedExtras?: { name: string; price: number }[];
  notes?: string;
  totalItemPrice: number;
}

export type OrderStatus = 'Recebido' | 'Em Preparo' | 'Saiu para Entrega' | 'Entregue' | 'Cancelado';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  deliveryType: 'delivery' | 'retirada' | 'mesa';
  address?: string;
  tableNumber?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  estimatedMinutes: number;
  createdAt: string;
}

export type ReservationStatus = 'Confirmada' | 'Pendente' | 'Cancelada';

export interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Salão Principal Climatizado' | 'Varanda Jardim Pet Friendly' | 'Lounge Bar & Chopp';
  occasion?: string;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  authorName: string;
  avatarUrl: string;
  rating: number;
  date: string;
  comment: string;
  dishRecommended?: string;
  photoUrl?: string;
  altText?: string;
  verified: boolean;
  likes: number;
}
