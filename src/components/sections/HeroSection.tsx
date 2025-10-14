import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from '@/components/ui/animated-section';

interface HeroSectionProps {
  onModalOpen: (service: string, title: string) => void;
}

export default function HeroSection({ onModalOpen }: HeroSectionProps) {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-3 sm:px-4 bg-gradient-to-br from-slate-50 via-white to-professional-50/30">
      <div className="container mx-auto text-center max-w-5xl relative z-10 px-2 sm:px-0">
        <AnimatedSection animation="fade-in" delay={100}>
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="text-4xl">⚠️</span>
            <Badge className="bg-red-100 text-red-700 border-red-200 text-sm sm:text-base px-4 py-2">
              Получили претензию об авторском праве?
            </Badge>
          </div>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up" delay={200}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-trust-900 mb-6 leading-tight tracking-tight px-1">
            Не игнорируйте — это может закончиться судом
          </h1>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up" delay={300}>
          <p className="text-base sm:text-lg md:text-xl text-trust-700 mb-8 px-2 leading-relaxed max-w-3xl mx-auto">
            Мы подключимся за 2 часа, бесплатно оценим риски, сформируем позицию и решим ваш вопрос до суда — законно, быстро и с гарантией.
          </p>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up" delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-3 sm:px-2 max-w-2xl mx-auto mb-6">
            <Button 
              size="lg" 
              className="bg-professional-600 hover:bg-professional-700 text-white text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 w-full sm:w-auto min-h-[56px] font-semibold tracking-wide transition-smooth shadow-lg hover:shadow-xl" 
              onClick={() => onModalOpen('protection', 'Получить защиту сейчас')}
            >
              🎯 Получить защиту сейчас
            </Button>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-in" delay={500}>
          <p className="text-sm sm:text-base text-trust-600 flex items-center justify-center gap-2">
            <span>🕒</span>
            <span className="font-medium">Ответ в течение 20 минут</span>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
