import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onContactClick: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img 
                src="https://cdn.poehali.dev/files/9f862400-252f-44a3-b612-fddd201cb3b6.png" 
                alt="ПравоПомощь 24/7" 
                className="h-12 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {isHomePage ? (
              <>
                <a href="#services" className="text-trust-600 hover:text-professional-600 transition-colors">Услуги</a>
                <a href="#cases" className="text-trust-600 hover:text-professional-600 transition-colors">Кейсы</a>
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
      </div>
    </header>
  );
}