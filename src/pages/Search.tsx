import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ListingCard from '@/components/listings/ListingCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { listings } from '@/data/mockData';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const results = query
    ? listings.filter(l =>
        l.title.toLowerCase().includes(query.toLowerCase()) ||
        l.description.toLowerCase().includes(query.toLowerCase()) ||
        l.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  const popularSearches = ['iPhone', 'MacBook', 'PlayStation', 'Велосипед', 'Книги', 'Одежда', 'Диван', 'Камера'];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Поиск по всему миру
          </h1>
          <form onSubmit={handleSearch}>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Что ищете?"
                  className="pl-10 rounded-xl text-base h-12"
                />
              </div>
              <Button type="submit" className="gradient-bg text-white border-0 px-6 rounded-xl hover:opacity-90 h-12">
                Найти
              </Button>
            </div>
          </form>

          {!query && (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-3 text-center">Популярные запросы</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {popularSearches.map(s => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); setSearchParams({ q: s }); }}
                    className="px-4 py-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-sm transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {query && (
          <div>
            <p className="text-muted-foreground mb-4">
              {results.length > 0
                ? `Найдено ${results.length} объявлений по запросу «${query}»`
                : `По запросу «${query}» ничего не найдено`
              }
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {results.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">Попробуйте другой запрос или просмотрите все объявления</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
