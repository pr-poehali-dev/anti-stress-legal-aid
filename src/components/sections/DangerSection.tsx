import AnimatedSection from '@/components/ui/animated-section';
import { Card } from '@/components/ui/card';

export default function DangerSection() {
  const dangers = [
    { icon: '💸', title: 'Штраф до 5 миллионов рублей', description: 'Суммы могут быть огромными' },
    { icon: '🚫', title: 'Блокировка сайта, YouTube, контента', description: 'Потеря доступа к площадкам' },
    { icon: '📩', title: 'Повторные претензии и иск', description: 'Проблема не исчезнет сама' },
    { icon: '⚖️', title: 'Судебное разбирательство + издержки', description: 'Время, деньги, нервы' },
    { icon: '❌', title: 'Репутационные потери', description: 'Урон имиджу и доверию' },
  ];

  return (
    <section id="danger" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-trust-900 mb-4 sm:mb-6">
              Почему опасно молчать
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-trust-700 max-w-3xl mx-auto">
              Что будет, если не реагировать на претензию?
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {dangers.map((danger, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={200 + index * 100}>
              <Card className="p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-2 border-red-100 hover:border-red-200 h-full">
                <div className="text-5xl mb-4">{danger.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-trust-900 mb-3">{danger.title}</h3>
                <p className="text-sm sm:text-base text-trust-600">{danger.description}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
