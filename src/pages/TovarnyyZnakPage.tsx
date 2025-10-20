import { useState } from 'react';
import { Helmet } from 'react-helmet';
import StructuredData from '@/components/StructuredData';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ContactModal from '@/components/ContactModal';
import Icon from '@/components/ui/icon';

export default function TovarnyyZnakPage() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    service: 'trademark',
    title: 'Консультация по товарному знаку'
  });

  const openModal = (service: string, title: string) => {
    setModalState({ isOpen: true, service, title });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, service: '', title: '' });
  };

  const services = [
    {
      icon: 'Search',
      title: 'Проверка товарного знака',
      desc: 'Анализ на схожесть с существующими ТЗ перед подачей заявки',
      keywords: 'как проверить товарный знак бесплатно, проверка товарного знака онлайн'
    },
    {
      icon: 'FileText',
      title: 'Регистрация товарного знака',
      desc: 'Полное сопровождение от подачи заявки до получения свидетельства',
      keywords: 'как зарегистрировать товарный знак, регистрация товарного знака стоимость'
    },
    {
      icon: 'Shield',
      title: 'Защита товарного знака',
      desc: 'Мониторинг нарушений, досудебные претензии, судебные споры',
      keywords: 'нарушение товарного знака, защита товарного знака'
    },
    {
      icon: 'Scale',
      title: 'Споры о товарных знаках',
      desc: 'Возражения на отказы Роспатента, оспаривание чужих ТЗ',
      keywords: 'оспаривание товарного знака, возражение роспатент'
    }
  ];

  const packages = [
    {
      name: 'Экспресс-проверка',
      price: '15 000 ₽',
      desc: 'Быстрый анализ',
      features: [
        'Проверка по базе Роспатента',
        'Краткое заключение на 1-2 страницы',
        'Оценка рисков регистрации',
        'Срок: 2 рабочих дня'
      ]
    },
    {
      name: 'Регистрация',
      price: '60 000 ₽',
      desc: 'Под ключ',
      popular: true,
      features: [
        'Предварительная проверка',
        'Подготовка заявки (3 класса МКТУ)',
        'Подача в Роспатент',
        'Ответы на запросы ведомства',
        'Получение свидетельства',
        'Срок: 10-14 месяцев (зависит от Роспатента)'
      ]
    },
    {
      name: 'Защита и мониторинг',
      price: 'от 40 000 ₽',
      desc: 'Охрана прав',
      features: [
        'Мониторинг нарушений',
        'Досудебные претензии',
        'Судебная защита (при необходимости)',
        'Срок: по ситуации'
      ]
    }
  ];

  const process = [
    { step: '1', title: 'Консультация', desc: 'Обсуждаем ваше обозначение, цели регистрации, классы товаров/услуг' },
    { step: '2', title: 'Проверка', desc: 'Проверяю базы Роспатента на схожие знаки, оцениваю риски отказа' },
    { step: '3', title: 'Подготовка заявки', desc: 'Формирую заявку с описанием, классификацией, изображением' },
    { step: '4', title: 'Подача', desc: 'Подаю документы в Роспатент, получаю номер заявки' },
    { step: '5', title: 'Экспертиза', desc: 'Отслеживаю ход рассмотрения, отвечаю на запросы экспертов (если будут)' },
    { step: '6', title: 'Получение свидетельства', desc: 'После положительного решения — оплата пошлины и получение охранного документа' }
  ];

  const faq = [
    {
      q: 'Сколько стоит зарегистрировать товарный знак?',
      a: 'Полная регистрация (юрист + госпошлины) — от 60 000 ₽ за 3 класса МКТУ. Дополнительные классы — по 5 000 ₽/класс. Сроки: 10-14 месяцев.'
    },
    {
      q: 'Можно ли зарегистрировать товарный знак самостоятельно?',
      a: 'Да, но риск отказа выше. Роспатент отказывает 40-60% самостоятельных заявок из-за схожести, неправильного оформления или неверного выбора классов.'
    },
    {
      q: 'Как проверить товарный знак бесплатно?',
      a: 'Базовую проверку можно провести через ФИПС (fips.ru), но полноценный анализ требует юридической экспертизы: учёта графического сходства, фонетики, смысла.'
    },
    {
      q: 'Что делать, если получил отказ Роспатента?',
      a: 'Можно подать возражение в течение 6 месяцев. Я готовлю аргументированное возражение с экспертизой и доказательствами. Шансы на успех зависят от причины отказа.'
    },
    {
      q: 'Сколько действует товарный знак?',
      a: '10 лет с даты подачи заявки. Продление — каждые 10 лет за госпошлину. Права на ТЗ можно продавать, передавать по лицензии.'
    },
    {
      q: 'Кто-то использует мой товарный знак — что делать?',
      a: 'Отправляю претензию нарушителю с требованием прекратить использование. Если не помогает — обращение в суд + требование компенсации до 5 млн ₽ или изъятия прибыли.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Регистрация и защита товарного знака | Проверка ТЗ | Роспатент</title>
        <meta name="description" content="Регистрация товарного знака под ключ от 60 000 ₽. Проверка ТЗ, подача заявки в Роспатент, защита от нарушений. Срок регистрации 10-14 месяцев." />
        <meta name="keywords" content="регистрация товарного знака, проверка товарного знака, как зарегистрировать товарный знак, товарный знак стоимость, регистрация товарного знака роспатент, товарный знак под ключ, защита товарного знака, нарушение товарного знака, споры о товарных знаках" />
      </Helmet>
      
      <StructuredData 
        type="Service" 
        data={{
          name: 'Регистрация и защита товарного знака',
          description: 'Регистрация ТЗ в Роспатенте, проверка, защита прав',
          priceRange: '15000-150000',
          url: 'https://yoursite.com/uslugi/tovarnyy-znak'
        }}
      />
      <StructuredData 
        type="BreadcrumbList" 
        data={{
          items: [
            { name: 'Главная', url: 'https://yoursite.com/' },
            { name: 'Услуги', url: 'https://yoursite.com/#services' },
            { name: 'Товарный знак', url: 'https://yoursite.com/uslugi/tovarnyy-znak' }
          ]
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header onContactClick={() => openModal('trademark', 'Связаться с юристом')} />

        {/* Hero */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Регистрация и защита<br />товарного знака
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Зарегистрирую ваш товарный знак в Роспатенте под ключ. 
              Защищу от нарушений и оспорю отказы. Полное юридическое сопровождение.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => openModal('trademark', 'Заказать регистрацию ТЗ')}
                className="inline-flex items-center gap-2 bg-professional-600 text-white px-8 py-4 rounded-xl hover:bg-professional-700 transition-colors text-lg font-semibold"
              >
                <Icon name="FileCheck" size={24} />
                Зарегистрировать ТЗ
              </button>
              <button
                onClick={() => openModal('trademark', 'Проверить товарный знак')}
                className="inline-flex items-center gap-2 bg-white text-professional-600 border-2 border-professional-600 px-8 py-4 rounded-xl hover:bg-professional-50 transition-colors text-lg font-semibold"
              >
                <Icon name="Search" size={24} />
                Проверить ТЗ
              </button>
            </div>
          </div>
        </section>

        {/* Услуги */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Что я делаю</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div key={service.title} className="p-6 border border-gray-200 rounded-xl hover:border-professional-600 transition-colors">
                  <Icon name={service.icon as any} size={40} className="text-professional-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-3">{service.desc}</p>
                  <p className="text-sm text-gray-500 italic">{service.keywords}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Пакеты */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Пакеты услуг</h2>
            <p className="text-center text-gray-600 mb-12">Выберите подходящий вариант</p>
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`p-8 rounded-xl ${
                    pkg.popular
                      ? 'bg-professional-600 text-white shadow-2xl scale-105'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {pkg.popular && (
                    <div className="text-sm font-bold mb-2 text-white">ПОПУЛЯРНЫЙ</div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold mb-2">{pkg.price}</div>
                  <p className={`mb-6 ${pkg.popular ? 'text-white/90' : 'text-gray-600'}`}>
                    {pkg.desc}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon
                          name="Check"
                          size={20}
                          className={pkg.popular ? 'text-white mt-0.5' : 'text-professional-600 mt-0.5'}
                        />
                        <span className={pkg.popular ? 'text-white' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openModal('trademark', `Заказать: ${pkg.name}`)}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      pkg.popular
                        ? 'bg-white text-professional-600 hover:bg-gray-100'
                        : 'bg-professional-600 text-white hover:bg-professional-700'
                    }`}
                  >
                    Выбрать
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Процесс */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Как проходит регистрация</h2>
            <div className="space-y-6">
              {process.map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-professional-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Частые вопросы</h2>
            <div className="space-y-6">
              {faq.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold mb-3">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-professional-600 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Защитите свой бренд — зарегистрируйте товарный знак
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Без регистрации конкуренты могут использовать ваше название, логотип, дизайн. 
              Товарный знак — это монопольное право на 10 лет.
            </p>
            <button
              onClick={() => openModal('trademark', 'Консультация по ТЗ')}
              className="bg-white text-professional-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-lg font-semibold"
            >
              Получить консультацию
            </button>
          </div>
        </section>

        <Footer onContactClick={() => openModal('trademark', 'Связаться в Telegram')} />

        <ContactModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          service={modalState.service}
          title={modalState.title}
        />
      </div>
    </>
  );
}