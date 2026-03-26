import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { categories, currencies } from '@/data/mockData';

const NewListing = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<'sale' | 'exchange' | 'free'>('sale');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'USD',
    category: '',
    location: '',
    exchangeFor: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/listings');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>

        <div className="bg-white rounded-2xl border border-border/60 p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Новое объявление
          </h1>

          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Тип объявления</label>
            <div className="grid grid-cols-3 gap-3">
              {([
                ['sale', '🏷️', 'Продажа', 'Установите цену за товар'],
                ['exchange', '🔄', 'Обмен', 'Предложите обмен товарами'],
                ['free', '🎁', 'Бесплатно', 'Подарите или отдайте'],
              ] as const).map(([t, icon, label, desc]) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`p-3 rounded-xl border-2 text-left transition-all
                    ${type === t ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-primary/30'}`}
                >
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="font-semibold text-sm">{label}</div>
                  <div className="text-xs text-muted-foreground">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Название *</label>
              <Input
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Например: iPhone 15 Pro Max"
                className="rounded-xl"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Описание *</label>
              <textarea
                required
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Опишите товар подробнее: состояние, характеристики, комплектация..."
                rows={4}
                className="w-full px-3 py-2 rounded-xl border border-border/60 bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {type === 'sale' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Цена *</label>
                  <Input
                    required
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    placeholder="0"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Валюта</label>
                  <select
                    value={formData.currency}
                    onChange={e => setFormData({...formData, currency: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {currencies.map(cur => (
                      <option key={cur.code} value={cur.code}>
                        {cur.symbol} {cur.code} — {cur.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {type === 'exchange' && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Что хотите получить взамен? *</label>
                <Input
                  required
                  value={formData.exchangeFor}
                  onChange={e => setFormData({...formData, exchangeFor: e.target.value})}
                  placeholder="Например: смартфон, велосипед, игровая консоль"
                  className="rounded-xl"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-1.5 block">Категория *</label>
              <select
                required
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Выберите категорию</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Местоположение *</label>
              <Input
                required
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="Город, страна"
                className="rounded-xl"
              />
            </div>

            <div className="border-2 border-dashed border-border/60 rounded-xl p-6 text-center hover:border-primary/40 transition-colors cursor-pointer">
              <Icon name="ImagePlus" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Загрузите фото товара</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG до 10 МБ. До 10 фотографий.</p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-border/60"
                onClick={() => navigate(-1)}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                className="flex-1 gradient-bg text-white border-0 hover:opacity-90 shadow-md"
              >
                <Icon name="Send" size={16} className="mr-2" />
                Опубликовать бесплатно
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewListing;
