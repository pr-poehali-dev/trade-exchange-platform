import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ListingCard from '@/components/listings/ListingCard';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { listings } from '@/data/mockData';

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(listings.filter(l => l.isFavorite));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Избранное
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{favorites.length} сохранённых объявлений</p>
          </div>
          {favorites.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFavorites([])}
              className="border-border/60 text-muted-foreground"
            >
              <Icon name="Trash2" size={14} className="mr-1.5" />
              Очистить
            </Button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Icon name="Heart" size={36} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">Избранное пусто</h2>
            <p className="text-muted-foreground mb-6">Сохраняйте понравившиеся объявления, нажав на сердечко</p>
            <Button
              onClick={() => navigate('/listings')}
              className="gradient-bg text-white border-0 hover:opacity-90"
            >
              Смотреть объявления
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favorites.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
