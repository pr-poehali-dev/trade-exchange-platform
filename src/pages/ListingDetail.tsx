import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { listings, formatPrice } from '@/data/mockData';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === id);
  const [isFav, setIsFav] = useState(listing?.isFavorite || false);

  if (!listing) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2">Объявление не найдено</h2>
          <Button onClick={() => navigate('/listings')} className="gradient-bg text-white border-0">
            Вернуться к объявлениям
          </Button>
        </div>
      </Layout>
    );
  }

  const priceDisplay = formatPrice(listing.price, listing.currency, listing.type);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden h-80 bg-muted">
              <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className={`tag-badge ${listing.type === 'sale' ? 'tag-sale' : listing.type === 'exchange' ? 'tag-exchange' : 'tag-free'}`}>
                  {listing.type === 'sale' ? 'Продажа' : listing.type === 'exchange' ? 'Обмен' : 'Бесплатно'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {listing.title}
              </h1>
              <div className="flex items-center gap-3">
                <span className={`text-3xl font-bold ${listing.type === 'free' ? 'text-emerald-600' : listing.type === 'exchange' ? 'text-violet-600' : 'text-foreground'}`}>
                  {priceDisplay}
                </span>
              </div>
              {listing.exchangeFor && (
                <p className="text-sm text-muted-foreground mt-1">Хочу получить: {listing.exchangeFor}</p>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="MapPin" size={14} />
                {listing.location}, {listing.country}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Eye" size={14} />
                {listing.views.toLocaleString()} просмотров
              </span>
            </div>

            <div className="p-4 bg-muted/40 rounded-xl">
              <h3 className="font-semibold mb-2">Описание</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{listing.description}</p>
            </div>

            <div className="p-4 bg-white border border-border/60 rounded-xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {listing.seller.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{listing.seller.name}</span>
                  {listing.seller.verified && (
                    <Icon name="BadgeCheck" size={16} className="text-primary" />
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-amber-500">
                  <Icon name="Star" size={12} />
                  <span>{listing.seller.rating}</span>
                  <span className="text-muted-foreground ml-1">рейтинг продавца</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 gradient-bg text-white border-0 hover:opacity-90 shadow-md"
                onClick={() => navigate('/messages')}
              >
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Написать продавцу
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsFav(!isFav)}
                className={`px-4 border-border/60 ${isFav ? 'text-red-500 border-red-200 bg-red-50' : ''}`}
              >
                <Icon name="Heart" size={16} />
              </Button>
            </div>

            {listing.type === 'exchange' && (
              <div className="p-4 rounded-xl border-2 border-dashed border-violet-200 bg-violet-50/50">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="ArrowLeftRight" size={16} className="text-violet-600" />
                  <span className="font-semibold text-violet-700">Предложить обмен</span>
                </div>
                <p className="text-sm text-violet-600/80 mb-3">Продавец хочет: {listing.exchangeFor}</p>
                <Button className="w-full bg-violet-600 text-white hover:bg-violet-700 border-0">
                  Предложить свой товар
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListingDetail;
