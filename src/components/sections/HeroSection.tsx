import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import AnimatedSection from '@/components/ui/animated-section';

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
    <section className="relative py-12 md:py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-professional-50/30">
      
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <AnimatedSection animation="fade-in" delay={100}>
          <Badge className="mb-6 bg-professional-100 text-professional-700 border-professional-200">
            Не паникуйте — есть решение
          </Badge>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up" delay={200}>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-montserrat font-bold text-trust-900 mb-6 leading-tight tracking-tight">
            Получили претензию<br className="hidden sm:block"/> по авторским правам?
          </h1>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up" delay={300}>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 font-bold text-red-600 px-2 leading-relaxed">
            <strong>НЕ ПЛАТИТЕ!</strong> Не паникуйте!
          </p>
          <p className="text-base sm:text-lg md:text-xl text-trust-700 mb-4 px-2 font-medium">
            В 99% случаев претензии можно успешно оспорить
          </p>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up" delay={400}>
          <p className="text-sm sm:text-base md:text-lg text-trust-600 mb-8 md:mb-10 max-w-3xl mx-auto px-2 leading-relaxed">
            Помогаю бизнесу, блогерам и маркетологам защищаться от необоснованных претензий по авторским правам.
            <br className="hidden sm:block"/>
            <span className="font-medium text-trust-700">9 из 10 таких писем — это попытка шантажа или ошибка с завышенной суммой.</span>
          </p>
        </AnimatedSection>
        
        {/* Animated Stats */}
        <AnimatedSection animation="scale-in" delay={500}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12 max-w-4xl mx-auto">
          <div className="bg-white border-2 border-professional-200 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-smooth hover-lift">
            <div className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-professional-600 mb-2">
              {counters.savedMoney.toLocaleString('ru-RU')} ₽
            </div>
            <div className="text-trust-600 font-medium">Сэкономлено клиентам</div>
            <div className="text-sm text-trust-500 mt-1">за все время работы</div>
          </div>
          
          <div className="bg-white border-2 border-professional-200 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-smooth hover-lift">
            <div className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-professional-600 mb-2">
              {counters.closedCases}+
            </div>
            <div className="text-trust-600 font-medium">Закрытых дел</div>
            <div className="text-sm text-trust-500 mt-1">успешно завершены</div>
          </div>
          
          <div className="bg-white border-2 border-professional-200 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-smooth hover-lift">
            <div className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-professional-600 mb-2">
              {counters.avgSavings.toLocaleString('ru-RU')} ₽
            </div>
            <div className="text-trust-600 font-medium">Средняя экономия</div>
            <div className="text-sm text-trust-500 mt-1">на одно дело</div>
          </div>
          </div>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up" delay={600}>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-2 max-w-2xl mx-auto">
          <Button size="lg" className="bg-professional-600 hover:bg-professional-700 text-white text-sm sm:text-base md:text-lg px-6 md:px-8 py-4 md:py-6 w-full sm:w-auto min-h-[56px] font-semibold tracking-wide transition-smooth shadow-lg hover:shadow-xl" onClick={() => onModalOpen('analysis', 'Заказать анализ претензии')}>
            <Icon name="FileCheck" className="mr-2 flex-shrink-0" size={18} />
            <span className="whitespace-nowrap">Анализ претензии — 5000 ₽</span>
          </Button>
          <Button variant="outline" size="lg" className="text-sm sm:text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-professional-600 text-professional-700 hover:bg-professional-600 hover:text-white w-full sm:w-auto min-h-[56px] font-semibold tracking-wide transition-smooth" onClick={() => onModalOpen('consultation', 'Экспресс-консультация')}>
            <Icon name="Phone" className="mr-2 flex-shrink-0" size={18} />
            <span className="whitespace-nowrap">Экспресс‑консультация — 3000 ₽</span>
          </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}