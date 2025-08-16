import { ShoppingItem, Product, PaymentMethod, CartItem } from '@/types/grocery';

export const mockShoppingList: ShoppingItem[] = [
  { id: '1', name: 'Arroz', checked: false },
  { id: '2', name: 'Macarrão', checked: true },
  { id: '3', name: 'Molho de tomate', checked: false },
  { id: '4', name: 'Refrigerante', checked: false },
  { id: '5', name: 'Frango', checked: false },
];

export const mockProducts: Product[] = [
  {
    id: '7898215151784',
    name: 'Creme de Leite',
    price: 5.99,
    image: 'https://images.tcdn.com.br/img/img_prod/919170/creme_de_leite_200g_piracanjuba_1005_1_9d998d633434b6f375ec9d99045e8608.jpg',
    description: 'Creme de Leite Piracanjuba 200g',
    category: 'lacticínios'
  },
  {
    id: '5601252102433',
    name: 'Azeite de Oliva',
    price: 10.00,
    image: 'https://ibassets.com.br/ib.item.image.big/b-0a2d948ecdf741748294d8a2af96e3ad.jpeg',
    description: 'Azeite de Oliva Gallo 250 ml',
    category: 'Óleos'
  }
];

export const mockPaymentMethods: PaymentMethod[] = [
  { id: '1', type: 'pix', name: 'PIX', icon: '💳' },
  { id: '2', type: 'credit', name: 'Cartão de Crédito', icon: '💳' },
  { id: '3', type: 'voucher', name: 'Voucher', icon: '🎫' },
  { id: '4', type: 'cash', name: 'Cartão Presente', icon: '🎁' },
];

export const mockCartItems: CartItem[] = [

];