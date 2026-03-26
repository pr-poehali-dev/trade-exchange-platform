import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ListingCard from '@/components/listings/ListingCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { listings, categories, conditionLabels } from '@/data/mockData';
import type { ListingType, Condition } from '@/data/mockData';

const CITIES = ['Все города', 'Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург', 'Краснодар', 'Ростов-на-Дону', 'Уфа', 'Нижний Новгород', 'Самара', 'Воронеж', 'Пермь'];

const Listings = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<'all' | ListingType>('all');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [city, setCity] = useState('Все города');
  const [condition, setCondition] = useState<'all' | Condition>('all');
  const [delivery, setDelivery] = useState<'all' | 'yes' | 'no'>('all');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const allCategories = [{ id: 'all', name: 'Все', icon: '🌐' }, ...categories];

  const activeFiltersCount = [
    city !== 'Все города',
    condition !== 'all',
    delivery !== 'all',
    !!priceMin,
    !!priceMax,
    activeCategory !== 'all',
    activeType !== 'all',
  ].filter(Boolean).length;

  const resetFilters = () => {
    setCity('Все города');
    setCondition('all');
    setDelivery('all');
    setPriceMin('');
    setPriceMax('');
    setActiveCategory('all');
    setActiveType('all');
  };

  const filtered = listings
    .filter(l => activeType === 'all' || l.type === activeType)
    .filter(l => activeCategory === 'all' || l.category === activeCategory)
    .filter(l => city === 'Все города' || l.location === city)
    .filter(l => condition === 'all' || l.condition === condition)
    .filter(l => delivery === 'all' || (delivery === 'yes' ? l.delivery : !l.delivery))
    .filter(l => !priceMin || (l.price !== null && l.price >= Number(priceMin)))
    .filter(l => !priceMax || (l.price !== null && l.price <= Number(priceMax)))
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
            className="lg:hidden border-border/60 flex items-center gap-2"
          >
            <Icon name="SlidersHorizontal" size={16} />
            Фильтры
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full gradient-bg text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl border border-border/60 p-4 sticky top-20 space-y-5">

              {/* Reset */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="w-full flex items-center justify-center gap-2 text-sm text-red-500 hover:text-red-700 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Icon name="X" size={14} />
                  Сбросить фильтры ({activeFiltersCount})
                </button>
              )}

              {/* Тип */}
              <div>
                <h3 className="font-semibold mb-2 text-sm">Тип сделки</h3>
                <div className="flex flex-col gap-1">
                  {([['all', 'Все', 'LayoutGrid'], ['sale', 'Продажа', 'Tag'], ['exchange', 'Обмен', 'ArrowLeftRight'], ['free', 'Бесплатно', 'Gift']] as const).map(([type, label, icon]) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all
                        ${activeType === type ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}`}
                    >
                      <Icon name={icon} size={14} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Город */}
              <div>
                <h3 className="font-semibold mb-2 text-sm">Город</h3>
                <div className="relative">
                  <Icon name="MapPin" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-border/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
                  >
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Цена */}
              <div>
                <h3 className="font-semibold mb-2 text-sm">Цена, ₽</h3>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    value={priceMin}
                    onChange={e => setPriceMin(e.target.value)}
                    placeholder="от"
                    className="rounded-xl text-sm h-9"
                  />
                  <span className="text-muted-foreground text-sm flex-shrink-0">—</span>
                  <Input
                    type="number"
                    value={priceMax}
                    onChange={e => setPriceMax(e.target.value)}
                    placeholder="до"
                    className="rounded-xl text-sm h-9"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[['до 10 000', '', '10000'], ['10–50 000', '10000', '50000'], ['50 000+', '50000', '']].map(([label, min, max]) => (
                    <button
                      key={label}
                      onClick={() => { setPriceMin(min); setPriceMax(max); }}
                      className={`px-2.5 py-1 rounded-full text-xs transition-all border
                        ${priceMin === min && priceMax === max
                          ? 'gradient-bg text-white border-transparent'
                          : 'border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Состояние */}
              <div>
                <h3 className="font-semibold mb-2 text-sm">Состояние</h3>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setCondition('all')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all
                      ${condition === 'all' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}`}
                  >
                    Любое
                  </button>
                  {(Object.entries(conditionLabels) as [Condition, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setCondition(key)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all
                        ${condition === key ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}`}
                    >
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        key === 'new' ? 'bg-emerald-500' :
                        key === 'excellent' ? 'bg-blue-500' :
                        key === 'good' ? 'bg-amber-500' : 'bg-red-400'
                      }`} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Доставка */}
              <div>
                <h3 className="font-semibold mb-2 text-sm">Доставка</h3>
                <div className="flex flex-col gap-1">
                  {([['all', 'Любая', 'Package'], ['yes', 'Есть доставка', 'Truck'], ['no', 'Только самовывоз', 'MapPin']] as const).map(([val, label, icon]) => (
                    <button
                      key={val}
                      onClick={() => setDelivery(val)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all
                        ${delivery === val ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}`}
                    >
                      <Icon name={icon} size={14} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Категория */}
              <div>
                <h3 className="font-semibold mb-2 text-sm">Категория</h3>
                <div className="flex flex-col gap-1 max-h-44 overflow-y-auto pr-1">
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
              </div>

            </div>
          </aside>

          {/* Main */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
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

            {/* Быстрые фильтры-чипсы */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide flex-wrap">
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
              {delivery !== 'all' && (
                <button
                  onClick={() => setDelivery('all')}
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-teal-100 text-teal-700 flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Icon name="Truck" size={13} />
                  {delivery === 'yes' ? 'Доставка' : 'Самовывоз'}
                  <Icon name="X" size={12} />
                </button>
              )}
              {city !== 'Все города' && (
                <button
                  onClick={() => setCity('Все города')}
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-violet-100 text-violet-700 flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Icon name="MapPin" size={13} />
                  {city}
                  <Icon name="X" size={12} />
                </button>
              )}
              {condition !== 'all' && (
                <button
                  onClick={() => setCondition('all')}
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-700 flex items-center gap-1.5 whitespace-nowrap"
                >
                  {conditionLabels[condition]}
                  <Icon name="X" size={12} />
                </button>
              )}
              {(priceMin || priceMax) && (
                <button
                  onClick={() => { setPriceMin(''); setPriceMax(''); }}
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-pink-100 text-pink-700 flex items-center gap-1.5 whitespace-nowrap"
                >
                  {priceMin ? `от ${Number(priceMin).toLocaleString()} ₽` : ''}
                  {priceMin && priceMax ? ' — ' : ''}
                  {priceMax ? `до ${Number(priceMax).toLocaleString()} ₽` : ''}
                  <Icon name="X" size={12} />
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground mb-4">Попробуйте изменить фильтры или поисковый запрос</p>
                <Button onClick={resetFilters} variant="outline" className="border-primary/30 text-primary">
                  Сбросить фильтры
                </Button>
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
