import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinks = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/listings', label: 'Объявления', icon: 'LayoutGrid' },
    { path: '/categories', label: 'Категории', icon: 'Tag' },
    { path: '/messages', label: 'Сообщения', icon: 'MessageCircle', badge: 3 },
    { path: '/favorites', label: 'Избранное', icon: 'Heart' },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 h-16">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl hidden sm:block" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span className="gradient-text">filipok</span>
            </span>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:flex">
            <div className="relative w-full">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Найти товары, услуги, обмен..."
                className="pl-9 pr-4 rounded-xl border-border/60 focus:border-primary/60 bg-white/80"
              />
            </div>
          </form>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
              >
                <Icon name={link.icon as any} size={16} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full gradient-bg text-white text-[10px] flex items-center justify-center font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            <Button
              onClick={() => navigate('/listings/new')}
              size="sm"
              className="gradient-bg text-white border-0 hover:opacity-90 shadow-md hidden sm:flex"
            >
              <Icon name="Plus" size={16} className="mr-1" />
              Подать объявление
            </Button>
            <Link to="/profile">
              <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity shadow-md">
                <Icon name="User" size={16} className="text-white" />
              </div>
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted/60 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-border/40 animate-fade-in">
            <form onSubmit={handleSearch} className="mb-3 md:hidden">
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Найти..."
                  className="pl-9 rounded-xl"
                />
              </div>
            </form>
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${location.pathname === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    }`}
                >
                  <Icon name={link.icon as any} size={16} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-auto w-5 h-5 rounded-full gradient-bg text-white text-[10px] flex items-center justify-center font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <Button
                onClick={() => { navigate('/listings/new'); setMobileMenuOpen(false); }}
                size="sm"
                className="gradient-bg text-white border-0 hover:opacity-90 mt-2 sm:hidden"
              >
                <Icon name="Plus" size={16} className="mr-1" />
                Подать объявление
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;