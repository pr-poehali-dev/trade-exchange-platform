import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const faqs = [
  {
    q: 'Как разместить объявление?',
    a: 'Нажмите "Подать объявление" в шапке сайта, выберите тип (продажа, обмен или бесплатно), заполните форму и опубликуйте. Это абсолютно бесплатно!',
  },
  {
    q: 'Как работает обмен?',
    a: 'Укажите тип "Обмен" и опишите, что хотите получить взамен. Другие пользователи смогут предложить вам свои товары. Вы сами решаете, принять предложение или нет.',
  },
  {
    q: 'Какие валюты поддерживаются?',
    a: 'Мы поддерживаем USD, EUR, GBP, RUB, JPY, CNY, AED и TRY. Вы можете указывать цены в любой из этих валют.',
  },
  {
    q: 'Как защищены мои сделки?',
    a: 'Мы проверяем продавцов, собираем отзывы и предлагаем защищённую систему платежей. Рекомендуем встречаться в публичных местах для передачи товара.',
  },
  {
    q: 'Платформа работает в моей стране?',
    a: 'SwapWorld работает в 180+ странах мира. Вы можете искать объявления по всему миру или фильтровать по конкретной стране.',
  },
  {
    q: 'Как связаться с продавцом?',
    a: 'Откройте страницу объявления и нажмите "Написать продавцу". Чат доступен прямо на платформе.',
  },
];

const Help = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  const filtered = faqs.filter(
    f => !query || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Layout>
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 to-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Центр помощи
          </h1>
          <p className="text-muted-foreground text-lg mb-6">Ответы на популярные вопросы</p>
          <div className="max-w-xl mx-auto relative">
            <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Поиск по вопросам..."
              className="pl-11 h-12 rounded-xl text-base shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: 'MessageCircle', title: 'Написать в чат', desc: 'Ответим в течение нескольких минут', color: 'from-violet-500 to-purple-600' },
            { icon: 'Mail', title: 'Email поддержка', desc: 'support@swapworld.com', color: 'from-pink-500 to-rose-600' },
            { icon: 'Globe', title: 'Сообщество', desc: 'Форум пользователей платформы', color: 'from-teal-500 to-cyan-600' },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-2xl border border-border/60 p-5 flex items-center gap-4 card-hover cursor-pointer">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                <Icon name={item.icon as 'Mail'} size={22} className="text-white" />
              </div>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Частые вопросы
          </h2>
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border/60 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/20 transition-colors"
                >
                  <span className="font-medium pr-4">{faq.q}</span>
                  <Icon
                    name={openFaq === i ? 'ChevronUp' : 'ChevronDown'}
                    size={18}
                    className="text-muted-foreground flex-shrink-0"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Ничего не найдено по запросу «{query}»
              </div>
            )}
          </div>

          <div className="mt-10 p-6 rounded-2xl gradient-bg text-center">
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Не нашли ответ?
            </h3>
            <p className="text-white/80 text-sm mb-4">Напишите нам, мы поможем разобраться</p>
            <Button className="bg-white text-primary hover:bg-white/90 font-semibold">
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Написать в поддержку
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
