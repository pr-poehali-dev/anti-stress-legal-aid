import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Scale, AlertTriangle, Shield, FileText, Gavel, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Breadcrumbs from '@/components/Breadcrumbs';
import StructuredData from '@/components/StructuredData';
import OpenGraphTags from '@/components/OpenGraphTags';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

export default function NarushenieAvtorskihPravPage() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    window.open('https://t.me/your_telegram', '_blank');
  };

  const responsibilities = [
    {
      title: 'Гражданско-правовая ответственность',
      description: 'Компенсация от 10 000 до 5 000 000 рублей',
      details: 'Статья 1301 ГК РФ. Правообладатель может требовать компенсацию вместо возмещения убытков. Сумма определяется судом в зависимости от характера нарушения.',
      icon: Scale
    },
    {
      title: 'Административная ответственность',
      description: 'Штраф до 200 000 рублей + конфискация',
      details: 'Статья 7.12 КоАП РФ. Применяется при незаконном использовании объектов авторских прав с целью извлечения дохода.',
      icon: AlertTriangle
    },
    {
      title: 'Уголовная ответственность',
      description: 'До 6 лет лишения свободы',
      details: 'Статья 146 УК РФ. При крупном ущербе (от 100 000 руб.) или организованной группой. Возможен штраф до 500 000 рублей.',
      icon: Gavel
    }
  ];

  const protectionSteps = [
    {
      step: '1',
      title: 'Получили претензию или повестку',
      description: 'Не паникуйте! 80% обвинений можно оспорить или минимизировать'
    },
    {
      step: '2',
      title: 'Юридический анализ за 24 часа',
      description: 'Оценим перспективы дела, риски, возможные последствия'
    },
    {
      step: '3',
      title: 'Стратегия защиты',
      description: 'Досудебное урегулирование, подготовка позиции, доказательства'
    },
    {
      step: '4',
      title: 'Представительство в суде',
      description: 'Защита ваших интересов, снижение компенсации, мировое соглашение'
    }
  ];

  const serviceFaqItems = [
    {
      question: 'Сколько стоит защита от обвинений в нарушении авторских прав?',
      answer: 'Цена от 5 000 ₽. Зависит от стадии (претензия, суд) и сложности дела. Сделаем расчёт за 15 минут.'
    },
    {
      question: 'Сроки выполнения?',
      answer: 'Обычно 3–14 дней для досудебного урегулирования. Точный график — после брифа и анализа дела.'
    },
    {
      question: 'Какие гарантии?',
      answer: 'Снижение претензий в 5-10 раз или полный отказ истца. Есть договор и детальная стратегия защиты.'
    }
  ];

  const faqItems = [
    {
      question: 'Что делать, если пришла претензия о нарушении авторских прав?',
      answer: 'Не игнорируйте и не платите сразу! Обратитесь к юристу для анализа. В 70% случаев претензии содержат завышенные требования или юридические ошибки, которые можно использовать для защиты.'
    },
    {
      question: 'Какая статья за нарушение авторских прав в 2025 году?',
      answer: 'Статья 146 УК РФ (уголовная), ст. 7.12 КоАП РФ (административная), ст. 1301 ГК РФ (гражданская). Применяется в зависимости от характера и масштаба нарушения.'
    },
    {
      question: 'Можно ли избежать суда при нарушении авторских прав?',
      answer: 'Да! Досудебное урегулирование возможно в 90% случаев. Мы помогаем договориться с правообладателем на выгодных условиях — сумма компенсации снижается в 5-10 раз.'
    },
    {
      question: 'Сколько стоит защита в суде по авторским правам?',
      answer: 'Анализ дела — от 5000₽. Досудебная защита — от 15000₽. Представительство в суде — от 50000₽. Точная цена зависит от сложности дела.'
    },
    {
      question: 'Какой размер компенсации за нарушение авторских прав?',
      answer: 'От 10 000 до 5 000 000 рублей по решению суда (ст. 1301 ГК РФ). Сумма зависит от характера нарушения, вины, масштаба использования. Мы помогаем снизить требования.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Нарушение авторских прав: ответственность, суд, защита | Интелект</title>
        <meta name="description" content="Ответственность за нарушение авторских прав: уголовная и гражданская. Помощь при обвинениях, защита в суде. Консультация от 5000₽." />
        <meta name="keywords" content="нарушение авторских прав, ответственность за нарушение авторских прав, защита авторских прав, суд авторские права, статья 146 ук рф, компенсация за нарушение авторских прав" />
        <link rel="canonical" href="https://intelect.pro/uslugi/zashchita-avtorskih-prav/sud-otvetstvennost" />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://intelect.pro/uslugi/zashchita-avtorskih-prav/sud-otvetstvennost" />
        <meta property="og:title" content="Защита от обвинений в нарушении авторских прав — Интелект" />
        <meta property="og:description" content="Получили претензию? Защитим от необоснованных обвинений, снизим компенсацию в 5-10 раз. Консультация от 5000₽." />
        <meta property="og:image" content="https://cdn.poehali.dev/projects/51eac140-1a22-4455-a98d-1a3cfaa64533/files/5435c177-5caa-4b5e-845b-8cf59743dbaf.jpg" />
        <meta property="og:locale" content="ru_RU" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Защита от обвинений в нарушении авторских прав" />
        <meta name="twitter:description" content="Защитим от претензий, снизим компенсацию в 5-10 раз. От 5000₽." />
        <meta name="twitter:image" content="https://cdn.poehali.dev/projects/51eac140-1a22-4455-a98d-1a3cfaa64533/files/5435c177-5caa-4b5e-845b-8cf59743dbaf.jpg" />
      </Helmet>

      <StructuredData 
        type="Service" 
        data={{
          name: 'Защита от обвинений в нарушении авторских прав',
          serviceType: 'Нарушение авторских прав',
          priceRange: '5000'
        }}
      />
      
      <StructuredData 
        type="FAQPage" 
        data={{ items: serviceFaqItems }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <Header onContactClick={handleContactClick} />
        <Breadcrumbs />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-trust-600 hover:text-professional-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            На главную
          </Button>

          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-montserrat font-bold text-trust-900 mb-6">
              Нарушение авторских прав: ответственность и защита в суде
            </h1>
            <p className="text-lg md:text-xl text-trust-600 mb-8">
              Получили обвинение в нарушении авторских прав? Защитим от необоснованных претензий, 
              снизим компенсацию, представим интересы в суде. Консультация за 24 часа.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="border-professional-200">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-professional-600 mb-2">31 000+</div>
                  <div className="text-sm text-trust-600">человек ищут помощь по этой теме ежемесячно</div>
                </CardContent>
              </Card>
              <Card className="border-professional-200">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-professional-600 mb-2">80%</div>
                  <div className="text-sm text-trust-600">дел решается без суда</div>
                </CardContent>
              </Card>
              <Card className="border-professional-200">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-professional-600 mb-2">5-10x</div>
                  <div className="text-sm text-trust-600">снижение компенсации при грамотной защите</div>
                </CardContent>
              </Card>
            </div>

            <Button 
              size="lg" 
              onClick={handleContactClick}
              className="bg-professional-600 hover:bg-professional-700 text-white px-8"
            >
              Получить консультацию — от 5000₽
            </Button>
          </div>
        </div>
      </section>

      {/* Виды ответственности */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-montserrat font-bold text-trust-900 mb-4 text-center">
            Виды ответственности за нарушение авторских прав
          </h2>
          <p className="text-center text-trust-600 mb-12 max-w-2xl mx-auto">
            Какое наказание грозит при нарушении авторских и смежных прав по законодательству РФ
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {responsibilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="border-professional-200 hover:border-professional-400 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-lg bg-professional-100 flex items-center justify-center mr-4">
                        <Icon className="h-6 w-6 text-professional-600" />
                      </div>
                      <div className="text-xl font-semibold text-trust-900">{item.title}</div>
                    </div>
                    <div className="text-professional-600 font-semibold mb-3">{item.description}</div>
                    <div className="text-sm text-trust-600">{item.details}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Как мы защищаем */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-montserrat font-bold text-trust-900 mb-12 text-center">
            Как мы защищаем при обвинении в нарушении авторских прав
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {protectionSteps.map((item, index) => (
              <Card key={index} className="border-professional-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-professional-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-trust-900 mb-2">{item.title}</h3>
                      <p className="text-trust-600">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={handleContactClick}
              className="bg-professional-600 hover:bg-professional-700 text-white"
            >
              Начать защиту сейчас
            </Button>
          </div>
        </div>
      </section>

      {/* Когда нужна срочная помощь */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-montserrat font-bold text-trust-900 mb-8 text-center">
              Когда нужна срочная юридическая помощь
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-red-500 border-professional-200">
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-red-500 mb-4" />
                  <h3 className="font-semibold text-trust-900 mb-3">Получили претензию правообладателя</h3>
                  <p className="text-trust-600 text-sm">
                    Письменное требование о компенсации за незаконное использование материалов. 
                    Срок ответа — 30 дней.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500 border-professional-200">
                <CardContent className="pt-6">
                  <FileText className="h-8 w-8 text-red-500 mb-4" />
                  <h3 className="font-semibold text-trust-900 mb-3">Пришла повестка в суд</h3>
                  <p className="text-trust-600 text-sm">
                    Иск о взыскании компенсации за нарушение авторских прав. 
                    Срок подготовки возражения — от 15 дней.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500 border-professional-200">
                <CardContent className="pt-6">
                  <AlertTriangle className="h-8 w-8 text-orange-500 mb-4" />
                  <h3 className="font-semibold text-trust-900 mb-3">Обвинение в уголовном преступлении</h3>
                  <p className="text-trust-600 text-sm">
                    Возбуждено уголовное дело по ст. 146 УК РФ. 
                    Грозит штраф до 500 000₽ или лишение свободы до 6 лет.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500 border-professional-200">
                <CardContent className="pt-6">
                  <CheckCircle2 className="h-8 w-8 text-orange-500 mb-4" />
                  <h3 className="font-semibold text-trust-900 mb-3">Хотите избежать суда</h3>
                  <p className="text-trust-600 text-sm">
                    Досудебное урегулирование спора, переговоры с правообладателем, 
                    мировое соглашение на выгодных условиях.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-montserrat font-bold text-trust-900 mb-4 text-center">
            Часто задаваемые вопросы
          </h2>
          <p className="text-center text-trust-600 mb-12">
            Ответы на ключевые вопросы о нарушении авторских прав и ответственности
          </p>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border border-professional-200 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left text-trust-900 hover:text-professional-600">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-trust-600 pt-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-professional-600 to-professional-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-montserrat font-bold text-white mb-4">
            Защитим ваши права. Снизим компенсацию. Избежим суда.
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Консультация и анализ дела за 24 часа. Работаем по всей России.
          </p>
          <Button 
            size="lg" 
            onClick={handleContactClick}
            className="bg-white text-professional-600 hover:bg-slate-100"
          >
            Получить консультацию — 5000₽
          </Button>
        </div>
      </section>

        <Footer onContactClick={handleContactClick} />
      </div>
    </>
  );
}