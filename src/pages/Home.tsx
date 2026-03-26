import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ListingCard from '@/components/listings/ListingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { listings, categories } from '@/data/mockData';

const PAGE_SIZE = 4;

const statsData = [
  { value: '2.4M+', label: 'Объявлений', icon: '📋' },
  { value: '180+', label: 'Стран', icon: '🌍' },
  { value: '50K+', label: 'Обменов', icon: '🔄' },
  { value: '8', label: 'Валют', icon: '💳' },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<'all' | 'sale' | 'exchange' | 'free'>('all');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const allFiltered = activeType === 'all'
    ? listings
    : listings.filter(l => l.type === activeType);

  const infinitePool = [...allFiltered, ...allFiltered, ...allFiltered, ...allFiltered].map((l, i) => ({ ...l, id: `${l.id}-${i}` }));
  const visibleListings = infinitePool.slice(0, page * PAGE_SIZE);
  const hasMore = page * PAGE_SIZE < infinitePool.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setPage(p => p + 1);
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore]);

  useEffect(() => {
    setPage(1);
  }, [activeType]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [loadMore]);

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-300/20 rounded-full blur-2xl" />
        </div>

        <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Новая эра торговли и обмена
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Покупай. Продавай.
            <br />
            <span className="text-yellow-300">Меняйся!</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Глобальная платформа для торговли и обмена вещами. Бесплатные объявления, 180+ стран, 8 валют.
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex-1 relative">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Что ищете? iPhone, велосипед, обмен..."
                  className="border-0 shadow-none pl-10 text-base focus-visible:ring-0 bg-transparent"
                />
              </div>
              <Button type="submit" className="gradient-bg text-white border-0 px-6 rounded-xl hover:opacity-90">
                Найти
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['iPhone 15', 'PlayStation 5', 'MacBook', 'Обмен одежды', 'Велосипед'].map(tag => (
              <button
                key={tag}
                onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm transition-colors backdrop-blur-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statsData.map(stat => (
            <div key={stat.label} className="glass rounded-2xl p-4 text-center shadow-lg">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Категории
          </h2>
          <button
            onClick={() => navigate('/categories')}
            className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
          >
            Все категории <Icon name="ChevronRight" size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate(`/listings?category=${cat.id}`)}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl border border-border/60 hover:border-primary/30 hover:shadow-md transition-all bg-white card-hover"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-center text-foreground leading-tight">{cat.name}</span>
              <span className="text-[10px] text-muted-foreground">{(cat.count / 1000).toFixed(1)}K</span>
            </button>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 mt-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Свежие объявления
          </h2>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'sale', 'exchange', 'free'] as const).map(type => {
              const labels = { all: 'Все', sale: 'Продажа', exchange: 'Обмен', free: 'Бесплатно' };
              return (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                    ${activeType === type ? 'gradient-bg text-white shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                >
                  {labels[type]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visibleListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        <div ref={loaderRef} className="mt-8 flex flex-col items-center gap-3">
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              Загружаем ещё...
            </div>
          )}
          {!hasMore && (
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-3">Вы посмотрели все объявления</p>
              <Button
                onClick={() => navigate('/listings')}
                variant="outline"
                className="px-8 border-primary/30 text-primary hover:bg-primary/5"
              >
                Перейти в каталог
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 mt-16">
        <div className="relative rounded-3xl overflow-hidden gradient-bg p-8 md:p-12 text-center">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300/20 rounded-full blur-2xl" />
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Разместить объявление бесплатно
            </h2>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Продайте ненужное, найдите замену или просто подарите — всё это бесплатно и по всему миру
            </p>
            <Button
              onClick={() => navigate('/listings/new')}
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 rounded-xl shadow-xl"
            >
              <Icon name="Plus" size={18} className="mr-2" />
              Подать объявление
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Почему SwapWorld?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: 'Globe',
              title: '180+ стран мира',
              desc: 'Покупайте и продавайте без границ. Поддержка множества валют и языков.',
              color: 'from-violet-500 to-purple-600',
            },
            {
              icon: 'ArrowLeftRight',
              title: 'Уникальный обмен',
              desc: 'Не хватает денег? Просто обменяйтесь! Находите выгодные сделки по бартеру.',
              color: 'from-pink-500 to-rose-600',
            },
            {
              icon: 'Shield',
              title: 'Безопасные сделки',
              desc: 'Верификация продавцов, рейтинговая система и защита покупателей.',
              color: 'from-teal-500 to-cyan-600',
            },
          ].map(feature => (
            <div key={feature.title} className="p-6 rounded-2xl border border-border/60 bg-white card-hover">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-md`}>
                <Icon name={feature.icon as 'Globe'} size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16" />
    </Layout>
  );
};

export default Home;