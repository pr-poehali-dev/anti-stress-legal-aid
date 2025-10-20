import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import AnimatedSection from '@/components/ui/animated-section';

interface ServicesSectionProps {
  onModalOpen: (service: string, title: string) => void;
}

export default function ServicesSection({ onModalOpen }: ServicesSectionProps) {
  const mainServices = [
    {
      icon: 'Shield',
      title: 'Защита авторских прав',
      desc: 'Суд, претензии, компенсации',
      link: '/uslugi/zashchita-avtorskih-prav/sud-otvetstvennost',
      queries: '30K запросов'
    },
    {
      icon: 'Ban',
      title: 'DMCA и блокировки',
      desc: 'Удаление контента, разблокировка',
      link: '/uslugi/zashchita-avtorskih-prav/blokirovka-i-udaleniya',
      queries: '4.2K запросов'
    },
    {
      icon: 'Briefcase',
      title: 'Рисковые бизнесы',
      desc: 'Аудит маркетплейсов, инфобизнеса',
      link: '/uslugi/riskovye-biznesy',
      queries: '30K запросов'
    },
    {
      icon: 'Tag',
      title: 'Товарные знаки',
      desc: 'Регистрация, проверка, защита ТЗ',
      link: '/uslugi/tovarnyy-znak',
      queries: '18K запросов'
    },
    {
      icon: 'Copyright',
      title: 'Интеллектуальная собственность',
      desc: 'Патенты, лицензии, договоры',
      link: '/uslugi/intellektualnaya-sobstvennost',
      queries: '8K запросов'
    }
  ];

  return (
    <section id="services" className="relative py-8 sm:py-12 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <AnimatedSection animation="fade-up" className="text-center mb-6 sm:mb-8 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-trust-900 mb-3 sm:mb-4 px-2">
            Мои услуги
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-trust-600 max-w-2xl mx-auto px-2">
            Защита интеллектуальной собственности, авторских прав и бизнеса
          </p>
        </AnimatedSection>
        
        {/* Основные услуги - сетка */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mb-12">
          {mainServices.map((service) => (
            <Link key={service.title} to={service.link}>
              <Card className="h-full border-2 border-professional-100 hover:border-professional-600 transition-all duration-300 hover:shadow-xl cursor-pointer group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-professional-100 group-hover:bg-professional-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                    <Icon name={service.icon as any} className="text-professional-600 group-hover:text-white transition-colors" size={28} />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-trust-900 group-hover:text-professional-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {service.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <div className="inline-flex items-center gap-2 text-xs text-professional-600 bg-professional-50 px-3 py-1 rounded-full">
                    <Icon name="TrendingUp" size={14} />
                    <span>{service.queries}</span>
                  </div>
                  <div className="mt-4">
                    <Button variant="ghost" className="w-full text-professional-600 hover:bg-professional-50">
                      Подробнее <Icon name="ArrowRight" className="ml-2" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Экспресс-услуги */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-trust-900">Экспресс-услуги</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Card className="border-2 border-professional-100 hover:border-professional-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-professional-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" className="text-professional-600" size={24} />
                </div>
                <CardTitle className="text-lg sm:text-xl text-trust-900">Анализ за 5000 ₽</CardTitle>
                <CardDescription>24-48 часов</CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-4 md:px-6">
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-trust-700 mb-6">
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
                    <span className="leading-tight">Письменное заключение + консультация</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-professional-600 hover:bg-professional-700 text-white font-medium text-sm sm:text-base py-3" 
                  onClick={() => onModalOpen('analysis', 'Заказать анализ претензии')}
                >
                  <Icon name="FileCheck" className="mr-2" size={16} />
                  Заказать анализ
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-green-50/30 to-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MessageSquare" className="text-green-600" size={24} />
                </div>
                <CardTitle className="text-xl text-trust-900">Досудебное решение</CardTitle>
                <CardDescription>от 15 000 ₽</CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-4 md:px-6">
                <div className="space-y-3 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">До 100К</span>
                      <span className="font-bold text-green-600">15 000 ₽</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">100-300К</span>
                      <span className="font-bold text-blue-600">25 000 ₽</span>
                    </div>
                  </div>
                  <div className="bg-professional-50 border border-professional-200 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-professional-700">300К+</span>
                      <span className="font-bold text-professional-600">Индивидуально</span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium text-sm sm:text-base py-3" 
                  onClick={() => onModalOpen('pretrial', 'Досудебное решение')}
                >
                  <Icon name="MessageSquare" className="mr-2" size={16} />
                  Решить досудебно
                </Button>
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
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-trust-700 mb-6">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                    <span className="leading-tight">Подготовка всех документов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                    <span className="leading-tight">Участие в судебных заседаниях</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                    <span className="leading-tight">Работа до положительного результата</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-professional-600 hover:bg-professional-700 text-white font-medium text-sm sm:text-base py-3" 
                  onClick={() => onModalOpen('lawsuit', 'Судебная защита')}
                >
                  <Icon name="Scale" className="mr-2" size={16} />
                  Защита в суде
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
