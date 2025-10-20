import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import StructuredData from '@/components/StructuredData';
import { ArrowLeft, ShieldAlert, FileCheck, Trash2, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Breadcrumbs from '@/components/Breadcrumbs';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

export default function DMCABlokirovkaPage() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    window.open('https://t.me/your_telegram', '_blank');
  };

  const platforms = [
    {
      name: 'YouTube, Google',
      description: 'DMCA-жалоба на видео, статьи, изображения',
      icon: ShieldAlert,
      time: '24-48 часов'
    },
    {
      name: 'Wildberries, Ozon',
      description: 'Жалоба правообладателя на товары-подделки',
      icon: Trash2,
      time: '3-7 дней'
    },
    {
      name: 'Avito, Юла',
      description: 'Удаление объявлений с нарушением авторских прав',
      icon: XCircle,
      time: '1-3 дня'
    },
    {
      name: 'ВКонтакте, Telegram',
      description: 'Блокировка пиратского контента в соцсетях',
      icon: FileCheck,
      time: '5-14 дней'
    }
  ];

  const services = [
    {
      title: 'Подача DMCA-жалобы',
      description: 'Составляем и подаём жалобу на Google, YouTube, хостинги по международному стандарту DMCA',
      price: 'от 7 000₽',
      features: [
        'Сбор доказательств нарушения',
        'Подготовка юридически корректной жалобы',
        'Подача через официальные формы',
        'Отслеживание результата'
      ]
    },
    {
      title: 'Жалоба на маркетплейсы',
      description: 'Удаляем товары-подделки с Wildberries, Ozon, Avito через механизмы защиты правообладателей',
      price: 'от 5 000₽',
      features: [
        'Анализ карточек товаров-нарушителей',
        'Подготовка пакета документов',
        'Подача жалобы правообладателя',
        'Контроль удаления контента'
      ]
    },
    {
      title: 'Массовая зачистка контента',
      description: 'Систематическое удаление пиратских копий с десятков площадок одновременно',
      price: 'от 50 000₽',
      features: [
        'Мониторинг нарушений на 50+ площадках',
        'Автоматизированная подача жалоб',
        'Ежемесячные отчёты',
        'Защита на постоянной основе'
      ]
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Выявляем нарушителей',
      description: 'Находим все площадки, где незаконно используется ваш контент или бренд'
    },
    {
      step: '2',
      title: 'Собираем доказательства',
      description: 'Фиксируем факт нарушения: скриншоты, архивы страниц, метаданные'
    },
    {
      step: '3',
      title: 'Подаём жалобу правообладателя',
      description: 'Используем официальные каналы площадок: DMCA, формы для правообладателей'
    },
    {
      step: '4',
      title: 'Контролируем удаление',
      description: 'Отслеживаем исполнение, при необходимости — повторная подача или эскалация'
    }
  ];

  const serviceFaqItems = [
    {
      question: 'Сколько стоит подача DMCA-жалобы?',
      answer: 'От 5 000₽ за жалобу на маркетплейсы, от 7 000₽ за DMCA-жалобу на Google/YouTube. Зависит от количества площадок и объёма контента для удаления. Сделаем расчёт за 15 минут.'
    },
    {
      question: 'Сроки выполнения?',
      answer: 'Обычно 1–14 дней в зависимости от площадки. Точный график — после брифа и анализа нарушений.'
    },
    {
      question: 'Какие гарантии?',
      answer: 'Гарантируем юридически корректную подачу жалоб, полное сопровождение до удаления контента, защиту ваших прав на всех площадках. Есть договор и SLA.'
    }
  ];

  const faqItems = [
    {
      question: 'Что такое DMCA и как работает DMCA-жалоба?',
      answer: 'DMCA (Digital Millennium Copyright Act) — американский закон об авторских правах. DMCA-жалоба — официальный запрос правообладателя на удаление контента с сайта. Подаётся на Google, YouTube, хостинги. Площадка обязана удалить контент в течение 24-72 часов.'
    },
    {
      question: 'Как подать жалобу правообладателя на Wildberries или Ozon?',
      answer: 'Через специальную форму на сайте маркетплейса. Нужны: документы, подтверждающие права (регистрация товарного знака, патент), описание нарушения, ссылки на товары-подделки. Срок рассмотрения — 3-7 дней. Мы подготовим все документы и подадим жалобу за вас.'
    },
    {
      question: 'Сколько времени занимает удаление контента по DMCA?',
      answer: 'Google/YouTube — 24-48 часов. Маркетплейсы (WB, Ozon) — 3-7 дней. Соцсети (VK, Telegram) — 5-14 дней. Сроки зависят от правильности оформления жалобы и реакции площадки.'
    },
    {
      question: 'Можно ли подать DMCA-жалобу самостоятельно?',
      answer: 'Да, но есть риски: неправильно оформленная жалоба будет отклонена, нарушитель получит ваши контактные данные, возможен встречный иск о злоупотреблении правами. Юридически грамотная жалоба увеличивает шансы на успех в 10 раз.'
    },
    {
      question: 'Что делать, если жалоба правообладателя на Авито не сработала?',
      answer: 'Повторная подача с дополнительными доказательствами, эскалация в техподдержку, направление официального требования в Авито. Если не помогает — судебный иск к площадке или нарушителю. Поможем на каждом этапе.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>DMCA жалоба: блокировка контента, удаление с сайтов и маркетплейсов | Интелект</title>
        <meta name="description" content="Подача DMCA жалоб правообладателя. Удаление контента с Wildberries, Ozon, Avito, YouTube. Блокировка пиратских копий. Консультация от 5000₽." />
        <meta name="keywords" content="dmca жалоба, жалоба правообладателя, подать жалобу правообладателю, dmca, удаление контента, блокировка контента, жалоба правообладателя вайлдберриз, жалоба правообладателя авито, dmca youtube" />
      </Helmet>
      
      <StructuredData 
        type="Service" 
        data={{
          name: 'DMCA-жалобы и блокировка контента',
          description: 'Удаление пиратского контента с площадок',
          serviceType: 'LegalService',
          priceRange: '5000',
          url: 'https://yoursite.com/uslugi/dmca-blokirovka'
        }}
      />
      <StructuredData 
        type="FAQPage" 
        data={{ questions: serviceFaqItems }}
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
              DMCA-жалобы и блокировка контента на площадках
            </h1>
            <p className="text-lg md:text-xl text-trust-600 mb-8">
              Удаляем пиратский контент и товары-подделки с YouTube, Google, Wildberries, Ozon, Avito. 
              Подача DMCA-жалоб, защита правообладателей на маркетплейсах. Результат за 24 часа.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="border-professional-200">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-professional-600 mb-2">4 200+</div>
                  <div className="text-sm text-trust-600">запросов по DMCA ежемесячно</div>
                </CardContent>
              </Card>
              <Card className="border-professional-200">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-professional-600 mb-2">24-48ч</div>
                  <div className="text-sm text-trust-600">удаление с Google/YouTube</div>
                </CardContent>
              </Card>
              <Card className="border-professional-200">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-professional-600 mb-2">95%</div>
                  <div className="text-sm text-trust-600">успешных жалоб на удаление</div>
                </CardContent>
              </Card>
            </div>

            <Button 
              size="lg" 
              onClick={handleContactClick}
              className="bg-professional-600 hover:bg-professional-700 text-white px-8"
            >
              Подать жалобу — от 5000₽
            </Button>
          </div>
        </div>
      </section>

      {/* Площадки для блокировки */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-montserrat font-bold text-trust-900 mb-4 text-center">
            Где мы удаляем контент
          </h2>
          <p className="text-center text-trust-600 mb-12 max-w-2xl mx-auto">
            Подаём жалобы правообладателя на все крупные площадки и сервисы
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <Card key={index} className="border-professional-200 hover:border-professional-400 transition-colors">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 rounded-lg bg-professional-100 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-professional-600" />
                    </div>
                    <h3 className="font-semibold text-trust-900 mb-2">{platform.name}</h3>
                    <p className="text-sm text-trust-600 mb-3">{platform.description}</p>
                    <div className="flex items-center justify-center text-sm text-professional-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {platform.time}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Наши услуги */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-montserrat font-bold text-trust-900 mb-12 text-center">
            Наши услуги по блокировке контента
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-professional-200 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-trust-900 mb-2">{service.title}</h3>
                  <p className="text-trust-600 mb-4 text-sm">{service.description}</p>
                  <div className="text-2xl font-bold text-professional-600 mb-4">{service.price}</div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-trust-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
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
              Заказать удаление контента
            </Button>
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-montserrat font-bold text-trust-900 mb-12 text-center">
            Как мы удаляем пиратский контент
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {howItWorks.map((item, index) => (
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
        </div>
      </section>

      {/* Типы нарушений */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-montserrat font-bold text-trust-900 mb-12 text-center">
            Что можно удалить через DMCA и жалобы
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-professional-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-trust-900 mb-4">Пиратский контент</h3>
                <ul className="space-y-2 text-trust-600 text-sm">
                  <li>• Незаконные копии видео, музыки, фильмов</li>
                  <li>• Скачанные и перезалитые статьи, книги</li>
                  <li>• Украденные фотографии и изображения</li>
                  <li>• Пиратское ПО и программы для ЭВМ</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-professional-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-trust-900 mb-4">Товары-подделки</h3>
                <ul className="space-y-2 text-trust-600 text-sm">
                  <li>• Контрафактные товары на WB, Ozon</li>
                  <li>• Использование чужого бренда на Avito</li>
                  <li>• Копии дизайна и упаковки</li>
                  <li>• Нелегальная продажа лицензионных товаров</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-montserrat font-bold text-trust-900 mb-4 text-center">
            Часто задаваемые вопросы
          </h2>
          <p className="text-center text-trust-600 mb-12">
            Ответы на популярные вопросы о DMCA и блокировке контента
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
            Защитим ваш контент. Удалим пиратские копии.
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            DMCA-жалобы, блокировка на маркетплейсах, массовая зачистка. Работаем быстро и эффективно.
          </p>
          <Button 
            size="lg" 
            onClick={handleContactClick}
            className="bg-white text-professional-600 hover:bg-slate-100"
          >
            Подать жалобу — от 5000₽
          </Button>
        </div>
      </section>

        <Footer onContactClick={handleContactClick} />
      </div>
    </>
  );
}