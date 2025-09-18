import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FooterProps {
  onContactClick: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  return (
    <footer className="bg-trust-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="https://cdn.poehali.dev/files/9f862400-252f-44a3-b612-fddd201cb3b6.png" 
              alt="ПравоПомощь 24/7" 
              className="h-16 w-auto filter brightness-0 invert"
            />
          </div>
          <p className="text-trust-300 mb-8 max-w-2xl mx-auto">
            Не знаете, с чего начать? Напишите мне в Telegram — отвечу за 1 час.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="outline" size="lg" className="border-professional-400 text-professional-400 hover:bg-professional-400 hover:text-white" onClick={onContactClick}>
              <Icon name="Send" className="mr-2" size={20} />
              Telegram
            </Button>
            <Button variant="outline" size="lg" className="border-professional-400 text-professional-400 hover:bg-professional-400 hover:text-white" onClick={onContactClick}>
              <Icon name="Phone" className="mr-2" size={20} />
              +7 (XXX) XXX-XX-XX
            </Button>
          </div>
          <div className="mt-8 pt-8 border-t border-trust-700">
            <p className="text-trust-400 text-sm">
              P.S. Если вы читаете это — вы уже на полпути к решению. Осталось сделать один шаг.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}