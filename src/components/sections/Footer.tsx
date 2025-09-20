import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface FooterProps {
  onContactClick: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  return (
    <footer className="bg-trust-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="https://cdn.poehali.dev/files/9f862400-252f-44a3-b612-fddd201cb3b6.png" 
              alt="ПравоПомощь 24/7" 
              className="h-12 md:h-16 w-auto filter brightness-0 invert"
            />
          </div>
          <p className="text-trust-300 mb-6 md:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Не знаете, с чего начать? Напишите мне в Telegram — отвечу за 1 час.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-2">
            <a 
              href="https://t.me/pravointelect_bot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-professional-400 text-professional-400 hover:bg-professional-400 hover:text-white w-full sm:w-auto text-sm sm:text-base py-3 px-6 border rounded-lg transition-colors duration-200"
            >
              <Icon name="Send" className="mr-2" size={20} />
              Telegram
            </a>
            <Button variant="outline" size="lg" className="border-professional-400 text-professional-400 hover:bg-professional-400 hover:text-white w-full sm:w-auto text-sm sm:text-base py-3" onClick={onContactClick}>
              <Icon name="Phone" className="mr-2" size={20} />
              +7 (XXX) XXX-XX-XX
            </Button>
          </div>
          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-trust-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2">
              <div className="flex space-x-6">
                <Link to="/" className="text-trust-400 hover:text-professional-400 transition-colors text-sm">
                  Главная
                </Link>
                <Link to="/blog" className="text-trust-400 hover:text-professional-400 transition-colors text-sm">
                  Блог
                </Link>
              </div>
              <p className="text-trust-400 text-xs sm:text-sm text-center">
                P.S. Если вы читаете это — вы уже на полпути к решению. Осталось сделать один шаг.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}