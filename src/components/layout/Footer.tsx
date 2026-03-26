import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="mt-20" style={{ background: 'rgba(10,0,25,0.7)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                SwapWorld
              </span>
            </div>
            <p className="text-sm text-white/50 mb-4">
              Глобальная платформа для покупки, продажи и обмена вещами. Работает по всему миру.
            </p>
            <div className="flex gap-3">
              {['Twitter', 'Instagram', 'Youtube'].map(s => (
                <div key={s} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <Icon name="Globe" size={14} className="text-white/60" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Платформа</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {[
                { label: 'Все объявления', to: '/listings' },
                { label: 'Категории', to: '/categories' },
                { label: 'Поиск', to: '/search' },
                { label: 'Подать объявление', to: '/listings/new' },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Аккаунт</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {[
                { label: 'Мой профиль', to: '/profile' },
                { label: 'Сообщения', to: '/messages' },
                { label: 'Избранное', to: '/favorites' },
                { label: 'Помощь', to: '/help' },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Оплата</h4>
            <p className="text-sm text-white/50 mb-3">Принимаем по всему миру</p>
            <div className="flex flex-wrap gap-2">
              {['💳 Visa', '💳 MC', '₿ Crypto', '🏦 SWIFT', '💰 PayPal'].map(p => (
                <span key={p} className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/60">
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-white/50">
              <Icon name="Globe" size={14} />
              <span>50+ стран, 8 валют</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <span>© 2024 SwapWorld. Все права защищены.</span>
          <div className="flex gap-4">
            <Link to="/help" className="hover:text-white transition-colors">Конфиденциальность</Link>
            <Link to="/help" className="hover:text-white transition-colors">Условия</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;