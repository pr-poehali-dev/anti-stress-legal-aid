import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from '@/components/ui/animated-section';

export default function CasesSection() {
  const cases = [
    {
      icon: '🟢',
      title: 'Кейс 1',
      client: 'веб-дизайнер, получил претензию от фотобанка',
      was: 'требовали 300 000 ₽',
      action: 'провели анализ, нашли ошибку в док-тах, составили встречную позицию',
      result: 'клиент не платил, дело закрыто',
      saved: '300 000 ₽'
    },
    {
      icon: '🟢',
      title: 'Кейс 2',
      client: 'маркетинговое агентство',
      was: 'претензия от конкурента о плагиате',
      action: 'провели экспертизу, доказали оригинальность',
      result: 'претензия отозвана, конфликт улажен',
      saved: '0 ₽ — без затрат'
    }
  ];

  return (
    <section id="cases" className="relative py-12 md:py-20 bg-gradient-to-r from-professional-50/50 to-white">
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-trust-900 mb-4 px-2">
              Примеры решённых кейсов
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {cases.map((caseItem, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={200 + index * 100}>
              <Card className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-3xl">{caseItem.icon}</span>
                    <div>
                      <Badge className="bg-green-100 text-green-700 mb-2">{caseItem.title}</Badge>
                      <CardTitle className="text-xl text-trust-900">Клиент: {caseItem.client}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-trust-700 mb-1">Было:</p>
                      <p className="text-base text-red-600">{caseItem.was}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-trust-700 mb-1">Что сделали:</p>
                      <p className="text-base text-trust-800">{caseItem.action}</p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold text-trust-700 mb-1">Итог:</p>
                      <p className="text-base font-medium text-green-600">{caseItem.result}</p>
                    </div>
                    {caseItem.saved && (
                      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <p className="text-sm text-trust-600">Экономия:</p>
                        <p className="text-xl font-bold text-green-600">{caseItem.saved}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
