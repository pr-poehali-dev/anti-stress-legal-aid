import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onContactClick: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/img/e5f9700a-75ec-4466-bda3-16ca3ade27d7.jpg" alt="ПравоПомощь 24/7" className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="text-xl font-montserrat font-bold text-professional-600">ПравоПомощь</span>
              <span className="text-sm font-semibold text-warning-600">24/7</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-trust-600 hover:text-professional-600 transition-colors">Услуги</a>
            <a href="#cases" className="text-trust-600 hover:text-professional-600 transition-colors">Кейсы</a>
            <a href="#faq" className="text-trust-600 hover:text-professional-600 transition-colors">Вопросы</a>
            <Button size="sm" className="bg-professional-600 hover:bg-professional-700" onClick={onContactClick}>
              Связаться
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}