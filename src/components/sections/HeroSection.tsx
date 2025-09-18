import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CountersState {
  savedMoney: number;
  closedCases: number;
  avgSavings: number;
}

interface HeroSectionProps {
  onModalOpen: (service: string, title: string) => void;
}

export default function HeroSection({ onModalOpen }: HeroSectionProps) {
  const [counters, setCounters] = useState<CountersState>({
    savedMoney: 0,
    closedCases: 0,
    avgSavings: 0
  });

  const animateCounter = (start: number, end: number, duration: number, setter: (value: number) => void) => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      setter(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      animateCounter(0, 28500000, 2500, (value) => 
        setCounters(prev => ({ ...prev, savedMoney: value }))
      );
      animateCounter(0, 247, 2000, (value) => 
        setCounters(prev => ({ ...prev, closedCases: value }))
      );
      animateCounter(0, 387000, 2300, (value) => 
        setCounters(prev => ({ ...prev, avgSavings: value }))
      );
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-12 md:py-20 px-4 overflow-hidden">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/img/ddb7af76-0d7c-45f8-96b8-1e7c200c6fab.jpg"
          alt="Профессиональная юридическая помощь"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 to-white/95"></div>
      </div>
      
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <Badge className="mb-6 bg-professional-100 text-professional-700 border-professional-200">
          Не паникуйте — есть решение
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-montserrat font-bold text-trust-900 mb-6 leading-tight">
          Получили претензию по авторским правам?
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-4 font-medium text-[#d70e0e] px-2">
          Во первых !!!Не платите!!! Не паникуйте!!! Скорее всего её в 99% можно оспорить.
        </p>
        <p className="text-base sm:text-lg text-trust-600 mb-8 md:mb-10 max-w-3xl mx-auto px-2">
          Я помогаю бизнесу, блогерам и маркетологам отбиваться от необоснованных претензий по авторским правам.
          9 из 10 таких писем — это шантаж, ошибка или раздутая сумма.
        </p>
        
        {/* Animated Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-professional-200 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-professional-600 mb-2">
              {counters.savedMoney.toLocaleString('ru-RU')} ₽
            </div>
            <div className="text-trust-600 font-medium">Сэкономлено клиентам</div>
            <div className="text-sm text-trust-500 mt-1">за все время работы</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-professional-200 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-professional-600 mb-2">
              {counters.closedCases}+
            </div>
            <div className="text-trust-600 font-medium">Закрытых дел</div>
            <div className="text-sm text-trust-500 mt-1">успешно завершены</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-professional-200 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-professional-600 mb-2">
              {counters.avgSavings.toLocaleString('ru-RU')} ₽
            </div>
            <div className="text-trust-600 font-medium">Средняя экономия</div>
            <div className="text-sm text-trust-500 mt-1">на одно дело</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-2">
          <Button size="lg" className="bg-professional-600 hover:bg-professional-700 text-base md:text-lg px-4 md:px-8 py-4 md:py-6 w-full sm:w-auto" onClick={() => onModalOpen('analysis', 'Заказать анализ претензии')}>
            <Icon name="FileCheck" className="mr-2" size={20} />
            Анализ претензии — 5000 ₽
          </Button>
          <Button variant="outline" size="lg" className="text-base md:text-lg px-4 md:px-8 py-4 md:py-6 border-professional-300 w-full sm:w-auto" onClick={() => onModalOpen('consultation', 'Экспресс-консультация')}>
            <Icon name="Phone" className="mr-2" size={20} />
            Экспресс-консультация — 3000 ₽
          </Button>
        </div>
      </div>
    </section>
  );
}