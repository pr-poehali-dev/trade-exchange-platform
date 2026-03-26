import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ListingCard from '@/components/listings/ListingCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { listings, categories, currencies } from '@/data/mockData';
import type { ListingType } from '@/data/mockData';

const Listings = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<'all' | ListingType>('all');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeCurrency, setActiveCurrency] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const allCategories = [{ id: 'all', name: 'Все', icon: '🌐' }, ...categories];

  const filtered = listings
    .filter(l => activeType === 'all' || l.type === activeType)
    .filter(l => activeCategory === 'all' || l.category === activeCategory)
    .filter(l => activeCurrency === 'all' || l.currency === activeCurrency)
    .filter(l => !search || l.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price_asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price_desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'popular') return b.views - a.views;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Объявления
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{filtered.length} объявлений найдено</p>
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="sm:hidden border-border/60 flex items-center gap-2"
          >
            <Icon name="SlidersHorizontal" size={16} />
            Фильтры
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl border border-border/60 p-4 sticky top-20">
              <h3 className="font-semibold mb-3">Тип</h3>
              <div className="flex flex-col gap-1 mb-5">
                {([['all', 'Все'], ['sale', 'Продажа'], ['exchange', 'Обмен'], ['free', 'Бесплатно']] as const).map(([type, label]) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all
                      ${activeType === type ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}`}
                  >
                    {type === 'exchange' && <Icon name="ArrowLeftRight" size={14} />}
                    {type === 'sale' && <Icon name="Tag" size={14} />}
                    {type === 'free' && <Icon name="Gift" size={14} />}
                    {type === 'all' && <Icon name="LayoutGrid" size={14} />}
                    {label}
                  </button>
                ))}
              </div>

              <h3 className="font-semibold mb-3">Категория</h3>
              <div className="flex flex-col gap-1 mb-5 max-h-52 overflow-y-auto pr-1">
                {allCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all
                      ${activeCategory === cat.id ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}`}
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>

              <h3 className="font-semibold mb-3">Валюта</h3>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveCurrency('all')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all
                    ${activeCurrency === 'all' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/60'}`}
                >
                  🌐 Все валюты
                </button>
                {currencies.map(cur => (
                  <button
                    key={cur.code}
                    onClick={() => setActiveCurrency(cur.code)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all
                      ${activeCurrency === cur.code ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/60'}`}
                  >
                    {cur.symbol} {cur.code}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Поиск по объявлениям..."
                  className="pl-9 rounded-xl"
                />
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl border border-border/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="newest">Сначала новые</option>
                <option value="popular">По популярности</option>
                <option value="price_asc">Цена: по возрастанию</option>
                <option value="price_desc">Цена: по убыванию</option>
              </select>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
              {(['all', 'sale', 'exchange', 'free'] as const).map(type => {
                const labels = { all: 'Все', sale: 'Продажа', exchange: 'Обмен', free: 'Бесплатно' };
                return (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0
                      ${activeType === type ? 'gradient-bg text-white shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                  >
                    {labels[type]}
                  </button>
                );
              })}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">Попробуйте изменить фильтры или поисковый запрос</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Listings;
