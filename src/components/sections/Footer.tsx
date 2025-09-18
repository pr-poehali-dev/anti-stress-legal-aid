import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-trust-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Icon name="Scale" className="text-professional-400" size={32} />
            <span className="text-2xl font-montserrat font-bold">ЮрЗащита</span>
          </div>
          <p className="text-trust-300 mb-8 max-w-2xl mx-auto">
            Не знаете, с чего начать? Напишите мне в Telegram — отвечу за 1 час.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="outline" size="lg" className="border-professional-400 text-professional-400 hover:bg-professional-400 hover:text-white">
              <Icon name="Send" className="mr-2" size={20} />
              Telegram
            </Button>
            <Button variant="outline" size="lg" className="border-professional-400 text-professional-400 hover:bg-professional-400 hover:text-white">
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