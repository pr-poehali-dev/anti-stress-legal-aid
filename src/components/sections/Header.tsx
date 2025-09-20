import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onContactClick: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img 
                src="/img/694efd06-400d-4cfb-9679-efd28ff9a896.jpg" 
                alt="ПравоПомощь 24/7" 
                className="h-10 md:h-12 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
          
          {/* Мобильное меню */}
          <div className="md:hidden flex items-center space-x-2">
            <Button size="sm" className="bg-professional-600 hover:bg-professional-700 text-xs px-3 py-2 min-h-[36px] font-medium" onClick={onContactClick}>
              <Icon name="MessageCircle" className="mr-1 flex-shrink-0" size={14} />
              <span className="whitespace-nowrap">Связаться</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
          
          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-6">
            {isHomePage ? (
              <>
                <a href="#services" className="text-trust-600 hover:text-professional-600 transition-colors">Услуги</a>
                <a href="#cases" className="text-trust-600 hover:text-professional-600 transition-colors">Кейсы</a>
                <Link to="/blog" className="text-trust-600 hover:text-professional-600 transition-colors">Блог</Link>
                <a href="#faq" className="text-trust-600 hover:text-professional-600 transition-colors">Вопросы</a>
              </>
            ) : (
              <>
                <Link to="/" className="text-trust-600 hover:text-professional-600 transition-colors">
                  Главная
                </Link>
                <Link 
                  to="/blog" 
                  className={`transition-colors ${
                    location.pathname.startsWith('/blog') 
                      ? 'text-professional-600 font-medium' 
                      : 'text-trust-600 hover:text-professional-600'
                  }`}
                >
                  Блог
                </Link>
              </>
            )}
            <Button size="sm" className="bg-professional-600 hover:bg-professional-700" onClick={onContactClick}>
              <Icon name="MessageCircle" className="mr-1" size={14} />
              Связаться
            </Button>
          </div>
        </nav>
        
        {/* Мобильное выпадающее меню */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-4">
              {isHomePage ? (
                <>
                  <a 
                    href="#services" 
                    className="text-trust-600 hover:text-professional-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Услуги
                  </a>
                  <a 
                    href="#cases" 
                    className="text-trust-600 hover:text-professional-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Кейсы
                  </a>
                  <Link 
                    to="/blog" 
                    className="text-trust-600 hover:text-professional-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Блог
                  </Link>
                  <a 
                    href="#faq" 
                    className="text-trust-600 hover:text-professional-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Вопросы
                  </a>
                </>
              ) : (
                <>
                  <Link 
                    to="/" 
                    className="text-trust-600 hover:text-professional-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Главная
                  </Link>
                  <Link 
                    to="/blog" 
                    className={`transition-colors py-2 ${
                      location.pathname.startsWith('/blog') 
                        ? 'text-professional-600 font-medium' 
                        : 'text-trust-600 hover:text-professional-600'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Блог
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}