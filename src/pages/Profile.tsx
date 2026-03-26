import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ListingCard from '@/components/listings/ListingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { listings, currencies } from '@/data/mockData';

const tabs = [
  { id: 'listings', label: 'Мои объявления', icon: 'LayoutGrid' },
  { id: 'exchanges', label: 'Обмены', icon: 'ArrowLeftRight' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
  { id: 'payments', label: 'Оплата', icon: 'CreditCard' },
];

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [currency, setCurrency] = useState('USD');

  const myListings = listings.slice(0, 4);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="relative rounded-3xl overflow-hidden mb-6">
          <div className="h-36 gradient-bg relative">
            <div className="absolute inset-0">
              <div className="absolute top-4 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-20 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl" />
            </div>
          </div>
          <div className="bg-white border border-border/60 rounded-b-3xl px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10">
              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-white flex-shrink-0">
                А
              </div>
              <div className="flex-1 sm:pb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Алексей Константинов
                  </h1>
                  <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">
                    <Icon name="BadgeCheck" size={12} />
                    Верифицирован
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    Москва, RU
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Star" size={12} className="text-amber-500" />
                    <span className="text-amber-600 font-medium">4.9</span>
                    <span>(128 отзывов)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    На платформе с 2024
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-border/60">
                  <Icon name="Share2" size={14} className="mr-1.5" />
                  Поделиться
                </Button>
                <Button
                  size="sm"
                  className="gradient-bg text-white border-0 hover:opacity-90"
                  onClick={() => navigate('/listings/new')}
                >
                  <Icon name="Plus" size={14} className="mr-1.5" />
                  Объявление
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-border/40">
              {[
                { value: '24', label: 'Объявлений', icon: '📋' },
                { value: '18', label: 'Сделок', icon: '🤝' },
                { value: '6', label: 'Обменов', icon: '🔄' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.icon} {stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-1 overflow-x-auto pb-1 mb-6 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0
                ${activeTab === tab.id ? 'gradient-bg text-white shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            >
              <Icon name={tab.icon as 'LayoutGrid'} size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'listings' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {myListings.map(l => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button
                onClick={() => navigate('/listings/new')}
                className="gradient-bg text-white border-0 hover:opacity-90"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить объявление
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'exchanges' && (
          <div className="space-y-3">
            {[
              { title: 'Велосипед Trek → Электросамокат', status: 'В процессе', partner: 'Stefan M.', date: '20 марта' },
              { title: 'Куртка Moncler → Летняя одежда', status: 'Завершён', partner: 'Mohammed A.', date: '15 марта' },
              { title: 'Книги по Python → Учебники по дизайну', status: 'Завершён', partner: 'Emma L.', date: '10 марта' },
            ].map((ex, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border/60 p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl gradient-cool flex items-center justify-center flex-shrink-0">
                  <Icon name="ArrowLeftRight" size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{ex.title}</p>
                  <p className="text-xs text-muted-foreground">с {ex.partner} · {ex.date}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ex.status === 'В процессе' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {ex.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-lg space-y-4">
            <div className="bg-white rounded-2xl border border-border/60 p-5">
              <h3 className="font-semibold mb-4">Личные данные</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Имя</label>
                  <Input defaultValue="Алексей Константинов" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                  <Input defaultValue="alex@example.com" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Местоположение</label>
                  <Input defaultValue="Москва, Россия" className="rounded-xl" />
                </div>
                <Button className="gradient-bg text-white border-0 hover:opacity-90 w-full mt-2">
                  Сохранить изменения
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="max-w-lg space-y-4">
            <div className="bg-white rounded-2xl border border-border/60 p-5">
              <h3 className="font-semibold mb-4">Валюта по умолчанию</h3>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {currencies.map(cur => (
                  <option key={cur.code} value={cur.code}>
                    {cur.symbol} {cur.code} — {cur.name}
                  </option>
                ))}
              </select>
              <h3 className="font-semibold mb-3">Способы оплаты</h3>
              <div className="space-y-2">
                {['💳 Visa **** 4521', '💳 Mastercard **** 8833', '₿ Bitcoin wallet'].map(method => (
                  <div key={method} className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                    <span className="text-sm">{method}</span>
                    <button className="text-xs text-red-500 hover:text-red-700">Удалить</button>
                  </div>
                ))}
              </div>
              <Button className="gradient-bg text-white border-0 hover:opacity-90 w-full mt-4">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить способ оплаты
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
