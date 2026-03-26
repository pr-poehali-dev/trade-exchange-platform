export type ListingType = 'sale' | 'exchange' | 'free';

export interface Listing {
  id: string;
  title: string;
  price: number | null;
  currency: string;
  type: ListingType;
  category: string;
  location: string;
  country: string;
  image: string;
  description: string;
  seller: {
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
  };
  createdAt: string;
  views: number;
  isFavorite: boolean;
  exchangeFor?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

export const categories: Category[] = [
  { id: 'electronics', name: 'Электроника', icon: '💻', count: 12430, color: 'from-violet-500 to-purple-600' },
  { id: 'clothes', name: 'Одежда', icon: '👗', count: 8920, color: 'from-pink-500 to-rose-600' },
  { id: 'home', name: 'Дом и сад', icon: '🏠', count: 6750, color: 'from-teal-500 to-cyan-600' },
  { id: 'sports', name: 'Спорт', icon: '⚽', count: 4320, color: 'from-orange-500 to-amber-600' },
  { id: 'auto', name: 'Авто', icon: '🚗', count: 3890, color: 'from-blue-500 to-indigo-600' },
  { id: 'books', name: 'Книги', icon: '📚', count: 5210, color: 'from-emerald-500 to-green-600' },
  { id: 'kids', name: 'Детское', icon: '🧸', count: 7640, color: 'from-yellow-500 to-orange-500' },
  { id: 'art', name: 'Искусство', icon: '🎨', count: 2180, color: 'from-fuchsia-500 to-pink-600' },
];

export const listings: Listing[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max 256GB',
    price: 1200,
    currency: 'USD',
    type: 'sale',
    category: 'electronics',
    location: 'Москва',
    country: 'RU',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop',
    description: 'Отличное состояние, полный комплект. Гарантия до 2025 года.',
    seller: { name: 'Алексей К.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex', rating: 4.9, verified: true },
    createdAt: '2024-03-20',
    views: 1243,
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Велосипед горный Trek',
    price: null,
    currency: 'EUR',
    type: 'exchange',
    category: 'sports',
    location: 'Берлин',
    country: 'DE',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop',
    description: 'Меняю на электросамокат или сноуборд в хорошем состоянии.',
    seller: { name: 'Stefan M.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=stefan', rating: 4.7, verified: true },
    createdAt: '2024-03-19',
    views: 876,
    isFavorite: true,
    exchangeFor: 'Электросамокат или сноуборд',
  },
  {
    id: '3',
    title: 'Учебники по программированию (10 шт)',
    price: 0,
    currency: 'USD',
    type: 'free',
    category: 'books',
    location: 'Лондон',
    country: 'GB',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
    description: 'Отдам бесплатно. JavaScript, Python, Rust — все в отличном состоянии.',
    seller: { name: 'Emma L.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma', rating: 5.0, verified: false },
    createdAt: '2024-03-21',
    views: 2109,
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Sony PlayStation 5',
    price: 450,
    currency: 'EUR',
    type: 'sale',
    category: 'electronics',
    location: 'Париж',
    country: 'FR',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=300&fit=crop',
    description: 'PS5 дисковая версия, 2 геймпада, 5 игр в комплекте.',
    seller: { name: 'Pierre D.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pierre', rating: 4.8, verified: true },
    createdAt: '2024-03-18',
    views: 3421,
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Куртка зимняя Moncler',
    price: null,
    currency: 'USD',
    type: 'exchange',
    category: 'clothes',
    location: 'Дубай',
    country: 'AE',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=300&fit=crop',
    description: 'Обменяю на летнюю одежду или электронику.',
    seller: { name: 'Mohammed A.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mohammed', rating: 4.6, verified: true },
    createdAt: '2024-03-17',
    views: 654,
    isFavorite: true,
    exchangeFor: 'Летняя одежда или электроника',
  },
  {
    id: '6',
    title: 'MacBook Air M2',
    price: 1100,
    currency: 'USD',
    type: 'sale',
    category: 'electronics',
    location: 'Нью-Йорк',
    country: 'US',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    description: 'MacBook Air M2, 8GB RAM, 256GB SSD. Как новый, 6 месяцев использования.',
    seller: { name: 'John W.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john', rating: 4.9, verified: true },
    createdAt: '2024-03-22',
    views: 2876,
    isFavorite: false,
  },
  {
    id: '7',
    title: 'Диван угловой IKEA',
    price: 0,
    currency: 'EUR',
    type: 'free',
    category: 'home',
    location: 'Стокгольм',
    country: 'SE',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    description: 'Отдам самовывозом. Состояние хорошее, нет дефектов.',
    seller: { name: 'Lars E.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lars', rating: 4.5, verified: false },
    createdAt: '2024-03-16',
    views: 4532,
    isFavorite: false,
  },
  {
    id: '8',
    title: 'Камера Canon EOS R6',
    price: 2300,
    currency: 'USD',
    type: 'sale',
    category: 'electronics',
    location: 'Токио',
    country: 'JP',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
    description: 'Canon EOS R6, пробег 5000 кадров. Два объектива в комплекте.',
    seller: { name: 'Yuki T.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yuki', rating: 5.0, verified: true },
    createdAt: '2024-03-21',
    views: 1876,
    isFavorite: true,
  },
];

export const currencies = [
  { code: 'USD', symbol: '$', name: 'Доллар США' },
  { code: 'EUR', symbol: '€', name: 'Евро' },
  { code: 'GBP', symbol: '£', name: 'Фунт стерлингов' },
  { code: 'RUB', symbol: '₽', name: 'Российский рубль' },
  { code: 'JPY', symbol: '¥', name: 'Японская иена' },
  { code: 'CNY', symbol: '¥', name: 'Китайский юань' },
  { code: 'AED', symbol: 'د.إ', name: 'Дирхам ОАЭ' },
  { code: 'TRY', symbol: '₺', name: 'Турецкая лира' },
];

export const formatPrice = (price: number | null, currency: string, type: ListingType): string => {
  if (type === 'free') return 'Бесплатно';
  if (type === 'exchange') return 'Обмен';
  if (price === null) return 'Договорная';
  const curr = currencies.find(c => c.code === currency);
  return `${curr?.symbol || ''}${price.toLocaleString()}`;
};
