import AnimatedSection from '@/components/ui/animated-section';
import { Card } from '@/components/ui/card';

export default function ProcessSection() {
  const steps = [
    { icon: '📩', title: 'Вы присылаете нам претензию', description: 'Скан, письмо или документ' },
    { icon: '🔍', title: 'Мы анализируем документ за 2 часа', description: 'Детальная проверка всех пунктов' },
    { icon: '📞', title: 'Звоним и объясняем риски', description: 'Рассказываем возможные сценарии' },
    { icon: '📑', title: 'Формируем юридическую позицию', description: 'Готовим письмо и аргументацию' },
    { icon: '📬', title: 'Ведём переписку', description: 'Урегулируем вопрос до суда' },
    { icon: '🧑‍⚖️', title: 'При необходимости — представляем в суде', description: 'Полная защита интересов' },
  ];

  return (
    <section id="process" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-gradient-to-br from-blue-50 via-white to-professional-50">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-trust-900 mb-4 sm:mb-6">
              Как мы решаем ваш вопрос
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={200 + index * 100}>
              <Card className="p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-2 border-professional-100 hover:border-professional-200 h-full relative">
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-professional-100 flex items-center justify-center text-professional-700 font-bold text-sm">
                  {index + 1}
                </div>
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-trust-900 mb-3 pr-8">{step.title}</h3>
                <p className="text-sm sm:text-base text-trust-600">{step.description}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
