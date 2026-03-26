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
    price: 89000,
    currency: 'RUB',
    type: 'sale',
    category: 'electronics',
    location: 'Москва',
    country: 'RU',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop',
    description: 'Отличное состояние, полный комплект. Гарантия до 2025 года.',
    seller: { name: 'Алексей К.', avatar: '', rating: 4.9, verified: true },
    createdAt: '2024-03-20',
    views: 1243,
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Велосипед горный Trek Marlin 7',
    price: null,
    currency: 'RUB',
    type: 'exchange',
    category: 'sports',
    location: 'Санкт-Петербург',
    country: 'RU',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop',
    description: 'Меняю на электросамокат или сноуборд в хорошем состоянии.',
    seller: { name: 'Сергей П.', avatar: '', rating: 4.7, verified: true },
    createdAt: '2024-03-19',
    views: 876,
    isFavorite: true,
    exchangeFor: 'Электросамокат или сноуборд',
  },
  {
    id: '3',
    title: 'Учебники по программированию (10 шт)',
    price: 0,
    currency: 'RUB',
    type: 'free',
    category: 'books',
    location: 'Казань',
    country: 'RU',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
    description: 'Отдам бесплатно. JavaScript, Python, Rust — все в отличном состоянии.',
    seller: { name: 'Мария В.', avatar: '', rating: 5.0, verified: false },
    createdAt: '2024-03-21',
    views: 2109,
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Sony PlayStation 5 Disc Edition',
    price: 42000,
    currency: 'RUB',
    type: 'sale',
    category: 'electronics',
    location: 'Новосибирск',
    country: 'RU',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=300&fit=crop',
    description: 'PS5 дисковая версия, 2 геймпада, 5 игр в комплекте.',
    seller: { name: 'Дмитрий С.', avatar: '', rating: 4.8, verified: true },
    createdAt: '2024-03-18',
    views: 3421,
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Куртка зимняя пуховик Canada Goose',
    price: null,
    currency: 'RUB',
    type: 'exchange',
    category: 'clothes',
    location: 'Екатеринбург',
    country: 'RU',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=300&fit=crop',
    description: 'Обменяю на летнюю одежду или электронику.',
    seller: { name: 'Анна Л.', avatar: '', rating: 4.6, verified: true },
    createdAt: '2024-03-17',
    views: 654,
    isFavorite: true,
    exchangeFor: 'Летняя одежда или электроника',
  },
  {
    id: '6',
    title: 'MacBook Air M2 8/256GB',
    price: 95000,
    currency: 'RUB',
    type: 'sale',
    category: 'electronics',
    location: 'Краснодар',
    country: 'RU',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    description: 'MacBook Air M2, 8GB RAM, 256GB SSD. Как новый, 6 месяцев использования.',
    seller: { name: 'Николай Р.', avatar: '', rating: 4.9, verified: true },
    createdAt: '2024-03-22',
    views: 2876,
    isFavorite: false,
  },
  {
    id: '7',
    title: 'Диван угловой, серый',
    price: 0,
    currency: 'RUB',
    type: 'free',
    category: 'home',
    location: 'Ростов-на-Дону',
    country: 'RU',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    description: 'Отдам самовывозом. Состояние хорошее, нет дефектов.',
    seller: { name: 'Ольга М.', avatar: '', rating: 4.5, verified: false },
    createdAt: '2024-03-16',
    views: 4532,
    isFavorite: false,
  },
  {
    id: '8',
    title: 'Камера Canon EOS R6 + 2 объектива',
    price: 190000,
    currency: 'RUB',
    type: 'sale',
    category: 'electronics',
    location: 'Уфа',
    country: 'RU',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
    description: 'Canon EOS R6, пробег 5000 кадров. Два объектива в комплекте.',
    seller: { name: 'Павел Т.', avatar: '', rating: 5.0, verified: true },
    createdAt: '2024-03-21',
    views: 1876,
    isFavorite: true,
  },
  {
    id: '9',
    title: 'Samsung Galaxy S24 Ultra 512GB',
    price: 102000,
    currency: 'RUB',
    type: 'sale',
    category: 'electronics',
    location: 'Нижний Новгород',
    country: 'RU',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
    description: 'Куплен 2 месяца назад, полный комплект, чек есть.',
    seller: { name: 'Иван Ф.', avatar: '', rating: 4.8, verified: true },
    createdAt: '2024-03-23',
    views: 987,
    isFavorite: false,
  },
  {
    id: '10',
    title: 'Детская коляска Bugaboo Fox',
    price: null,
    currency: 'RUB',
    type: 'exchange',
    category: 'kids',
    location: 'Самара',
    country: 'RU',
    image: 'https://images.unsplash.com/photo-1591086782584-5a8f43c2e2f3?w=400&h=300&fit=crop',
    description: 'Меняю коляску на детский велосипед или самокат возраст 3-5 лет.',
    seller: { name: 'Елена К.', avatar: '', rating: 4.7, verified: false },
    createdAt: '2024-03-22',
    views: 543,
    isFavorite: false,
    exchangeFor: 'Детский велосипед или самокат 3-5 лет',
  },
  {
    id: '11',
    title: 'Кроссовки Nike Air Max 90, размер 42',
    price: 7500,
    currency: 'RUB',
    type: 'sale',
    category: 'clothes',
    location: 'Воронеж',
    country: 'RU',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    description: 'Оригинал, б/у 2 месяца, отличное состояние.',
    seller: { name: 'Артём Б.', avatar: '', rating: 4.6, verified: true },
    createdAt: '2024-03-20',
    views: 1120,
    isFavorite: false,
  },
  {
    id: '12',
    title: 'Гитара акустическая Yamaha F310',
    price: 0,
    currency: 'RUB',
    type: 'free',
    category: 'art',
    location: 'Пермь',
    country: 'RU',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
    description: 'Отдам в хорошие руки. Небольшая царапина на деке, звучит отлично.',
    seller: { name: 'Кирилл Ш.', avatar: '', rating: 4.9, verified: false },
    createdAt: '2024-03-19',
    views: 3210,
    isFavorite: false,
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