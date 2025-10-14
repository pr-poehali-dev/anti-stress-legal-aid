import AnimatedSection from '@/components/ui/animated-section';
import { Card } from '@/components/ui/card';

export default function BenefitsSection() {
  const benefits = [
    '✅ Быструю реакцию — в течение 2 часов',
    '✅ Бесплатную первичную оценку рисков',
    '✅ Готовое юридическое решение',
    '✅ Персонального юриста',
    '✅ Досудебную защиту — без лишней суеты',
    '✅ Письма, аргументация, шаблоны',
    '✅ При необходимости — выход в суд',
  ];

  return (
    <section id="benefits" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto max-w-5xl">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-trust-900 mb-4 sm:mb-6">
              Что вы получаете
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={200}>
          <Card className="p-8 sm:p-10 md:p-12 bg-white border-2 border-green-200 shadow-xl">
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <AnimatedSection key={index} animation="fade-in" delay={300 + index * 50}>
                  <div className="flex items-start gap-4 text-left">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">✅</span>
                    <p className="text-base sm:text-lg md:text-xl text-trust-800 font-medium pt-1">
                      {benefit.replace('✅ ', '')}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
}
