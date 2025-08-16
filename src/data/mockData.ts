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
    description: 'Azeite de Oliva Gallo 250ml',
    category: 'Óleos'
  },
  {
    id: '7896213005924',
    name: 'Biscoito Treloso',
    price: 2.50,
    image: 'https://www.chegouafeira.com.br/image/cache/catalog/FOTOS%20MERCADORIAS/Biscoito%20Treloso%20Chocolate%20130g-500x500.jpg',
    description: 'Biscoito recheado sabor chocolate 120g',
    category: 'Biscoitos'
  },
  {
    id: '7891000368572',
    name: 'Chocolate Nestle',
    price: 8.50,
    image: 'https://docesvaz.vtexassets.com/arquivos/ids/164219/Sem-titulo.png?v=638445502116400000',
    description: 'Chocolate meio amargo 80g',
    category: 'Chocolates'
  },
  {
    id: '7892840822347',
    name: 'Doritos',
    price: 7.00,
    image: 'https://cdn.awsli.com.br/600x700/2738/2738763/produto/285738442/202406251444250471novo_projeto_71-405teb65vc.png',
    description: 'Doritos sabor queijo nacho 75g',
    category: 'Salgadinhos'
  },
  {
    id: '78909045',
    name: 'Coca-Cola zero açúcar',
    price: 5.00,
    image: 'https://img.megaboxatacado.com.br/produto/1000X1000/20181113_86433.jpg',
    description: 'Coca-Cola zero açúcar 250ml',
    category: 'Refrigerantes'
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