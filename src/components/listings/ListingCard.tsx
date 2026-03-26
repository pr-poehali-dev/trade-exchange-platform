import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Listing, formatPrice } from '@/data/mockData';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(listing.isFavorite);

  const typeConfig = {
    sale: { label: 'Продажа', className: 'tag-sale' },
    exchange: { label: 'Обмен', className: 'tag-exchange' },
    free: { label: 'Бесплатно', className: 'tag-free' },
  };

  const tc = typeConfig[listing.type];
  const priceDisplay = formatPrice(listing.price, listing.currency, listing.type);

  return (
    <div
      className="listing-card group"
      onClick={() => navigate(`/listings/${listing.id}`)}
    >
      <div className="relative overflow-hidden h-44">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2">
          <span className={`tag-badge ${tc.className}`}>
            {listing.type === 'exchange' && <Icon name="ArrowLeftRight" size={10} />}
            {listing.type === 'free' && <Icon name="Gift" size={10} />}
            {listing.type === 'sale' && <Icon name="Tag" size={10} />}
            {tc.label}
          </span>
        </div>
        <button
          onClick={e => { e.stopPropagation(); setIsFav(!isFav); }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm
            ${isFav ? 'bg-red-500 text-white' : 'bg-white/90 text-muted-foreground hover:text-red-500'}`}
        >
          <Icon name="Heart" size={14} />
        </button>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
          {listing.title}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <span className={`font-bold text-base ${listing.type === 'free' ? 'text-emerald-600' : listing.type === 'exchange' ? 'text-violet-600' : 'text-foreground'}`}>
            {priceDisplay}
          </span>
          {listing.type === 'exchange' && listing.exchangeFor && (
            <span className="text-xs text-muted-foreground truncate ml-2">на {listing.exchangeFor}</span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="MapPin" size={11} />
            <span>{listing.location}, {listing.country}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Eye" size={11} />
            <span>{listing.views.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-border/40">
          <div className="w-5 h-5 rounded-full gradient-bg flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
            {listing.seller.name[0]}
          </div>
          <span className="text-xs text-muted-foreground truncate">{listing.seller.name}</span>
          {listing.seller.verified && (
            <Icon name="BadgeCheck" size={12} className="text-primary flex-shrink-0 ml-auto" />
          )}
          <span className="text-xs text-amber-500 flex items-center gap-0.5 flex-shrink-0">
            <Icon name="Star" size={10} />
            {listing.seller.rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
