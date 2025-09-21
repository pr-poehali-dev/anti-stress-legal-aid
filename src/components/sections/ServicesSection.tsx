import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import AnimatedSection from '@/components/ui/animated-section';

interface ServicesSectionProps {
  onModalOpen: (service: string, title: string) => void;
}

export default function ServicesSection({ onModalOpen }: ServicesSectionProps) {
  return (
    <section id="services" className="relative py-8 sm:py-12 md:py-20 bg-white">
      
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <AnimatedSection animation="fade-up" className="text-center mb-6 sm:mb-8 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-trust-900 mb-3 sm:mb-4 px-2">
            Как защитить себя от претензий
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-trust-600 max-w-2xl mx-auto px-2">
            Прозрачный алгоритм работы. Никаких скрытых платежей и неожиданностей
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          <Card className="border-2 border-professional-100 hover:border-professional-200 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-professional-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Search" className="text-professional-600" size={24} />
              </div>
              <CardTitle className="text-lg sm:text-xl text-trust-900">Анализ за 5000 ₽</CardTitle>
              <CardDescription>24-48 часов</CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 md:px-6">
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-trust-700">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                  <span className="leading-tight">Детальный анализ обоснованности претензии</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                  <span className="leading-tight">Оценка реальных рисков и перспектив дела</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                  <span className="leading-tight">Письменное заключение + консультация по телефону</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-professional-50 rounded-lg">
                <p className="text-sm text-professional-700 font-medium">
                  5000 ₽ засчитываются при дальнейшем сотрудничестве
                </p>
              </div>
              
              <div className="mt-4 md:mt-6">
                <Button className="w-full bg-professional-600 hover:bg-professional-700 text-white font-medium text-sm sm:text-base py-3" onClick={() => onModalOpen('analysis', 'Заказать анализ претензии')}>
                  <Icon name="FileCheck" className="mr-2" size={16} />
                  Заказать анализ — 5000 ₽
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-professional-100 hover:border-professional-200 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-professional-50/30 to-white">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-professional-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MessageSquare" className="text-professional-600" size={24} />
              </div>
              <CardTitle className="text-xl text-trust-900">Досудебное решение</CardTitle>
              <CardDescription>Без суда</CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 md:px-6">
              <div className="space-y-4">
                <div className="relative overflow-hidden bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-green-600 font-medium mb-1">Претензии до</div>
                      <div className="text-lg font-semibold text-green-700">100 000 ₽</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-montserrat font-bold text-professional-600">15 000</div>
                      <div className="text-sm text-professional-700 font-medium">₽</div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Icon name="TrendingDown" className="text-green-500" size={20} />
                  </div>
                </div>
                
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-blue-600 font-medium mb-1">Претензии</div>
                      <div className="text-lg font-semibold text-blue-700">100-300 тыс. ₽</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-montserrat font-bold text-professional-600">25 000</div>
                      <div className="text-sm text-professional-700 font-medium">₽</div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Icon name="Shield" className="text-blue-500" size={20} />
                  </div>
                </div>
                
                <div className="relative overflow-hidden bg-gradient-to-r from-professional-50 to-professional-100 border border-professional-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-professional-600 font-medium mb-1">Свыше</div>
                      <div className="text-lg font-semibold text-professional-700">300 тыс. ₽</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-montserrat font-bold text-professional-600">Индивидуально</div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Icon name="Star" className="text-professional-500" size={20} />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Zap" className="text-green-600" size={16} />
                  <span className="text-sm font-semibold text-green-700">Быстро и эффективно</span>
                </div>
                <p className="text-xs text-trust-600">
                  90% дел закрываются без суда за 1-2 недели
                </p>
              </div>
              
              <div className="mt-6 space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium text-sm sm:text-base py-3" onClick={() => onModalOpen('pretrial', 'Досудебное решение')}>
                  <Icon name="MessageSquare" className="mr-2" size={16} />
                  Досудебное решение
                </Button>
                <Button variant="outline" className="w-full border-professional-300 text-professional-600 hover:bg-professional-50 text-sm sm:text-base py-3" onClick={() => onModalOpen('pretrial', 'Узнать стоимость досудебного решения')}>
                  <Icon name="Phone" className="mr-2" size={16} />
                  Узнать стоимость
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-professional-100 hover:border-professional-200 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-professional-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Gavel" className="text-professional-600" size={24} />
              </div>
              <CardTitle className="text-xl text-trust-900">Судебная защита</CardTitle>
              <CardDescription>Полное сопровождение</CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 md:px-6">
              <div className="text-center">
                <div className="text-3xl font-montserrat font-bold text-professional-600 mb-2">
                  От 50 000 ₽
                </div>
                <p className="text-trust-600 mb-4">Всё включено</p>
                <ul className="space-y-2 text-trust-700 text-left">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                    <span>Подготовка документов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                    <span>Участие в заседаниях</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                    <span>Апелляции при необходимости</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="AlertCircle" className="text-red-600" size={16} />
                    <span className="text-sm font-semibold text-red-700">Серьезные дела</span>
                  </div>
                  <p className="text-xs text-trust-600">
                    Полное сопровождение во всех инстанциях
                  </p>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium text-sm sm:text-base py-3" onClick={() => onModalOpen('court', 'Судебная защита')}>
                    <Icon name="Gavel" className="mr-2" size={16} />
                    Судебная защита
                  </Button>
                  <Button variant="outline" className="w-full border-professional-300 text-professional-600 hover:bg-professional-50 text-sm sm:text-base py-3" onClick={() => onModalOpen('court', 'Рассчитать стоимость судебной защиты')}>
                    <Icon name="Calculator" className="mr-2" size={16} />
                    Рассчитать стоимость
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}