import { useState } from 'react';
import { Helmet } from 'react-helmet';
import StructuredData from '@/components/StructuredData';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ContactModal from '@/components/ContactModal';
import Icon from '@/components/ui/icon';

export default function RiskovyeBiznesyPage() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    service: 'risky-business',
    title: 'Консультация по рисковому бизнесу'
  });

  const openModal = (service: string, title: string) => {
    setModalState({ isOpen: true, service, title });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, service: '', title: '' });
  };

  const riskySpheres = [
    { icon: 'ShoppingBag', name: 'Маркетплейсы', desc: 'WB, Ozon, Яндекс.Маркет' },
    { icon: 'Users', name: 'Соцсети', desc: 'VK, Telegram, Instagram' },
    { icon: 'FileText', name: 'Контент', desc: 'Блоги, YouTube, СМИ' },
    { icon: 'Briefcase', name: 'Инфобизнес', desc: 'Курсы, коучинг, консалтинг' },
    { icon: 'TrendingUp', name: 'Трейдинг', desc: 'Крипта, инвестиции, форекс' },
    { icon: 'Zap', name: 'IT-продукты', desc: 'SaaS, приложения, сервисы' }
  ];

  const packages = [
    {
      name: 'Экспресс-аудит',
      price: '30 000 ₽',
      desc: 'Быстрая проверка рисков',
      features: [
        'Анализ 5 документов/материалов',
        'Чек-лист рисков на 1 страницу',
        'Устная консультация 30 мин',
        'Ответ в течение 3 дней'
      ]
    },
    {
      name: 'Полный аудит',
      price: '80 000 ₽',
      desc: 'Комплексная проверка',
      popular: true,
      features: [
        'Анализ всех документов и каналов',
        'Юридическое заключение 10+ страниц',
        'Дорожная карта снижения рисков',
        'Консультация 2 часа + поддержка 14 дней',
        'Срок: 7 рабочих дней'
      ]
    },
    {
      name: 'Под ключ',
      price: 'от 150 000 ₽',
      desc: 'Аудит + исполнение',
      features: [
        'Полный аудит',
        'Подготовка/переработка документов',
        'Регистрация ТЗ/патентов при необходимости',
        'Настройка процессов',
        'Сопровождение 30 дней',
        'Срок: от 14 дней'
      ]
    }
  ];

  const process = [
    { step: '1', title: 'Первичный контакт', desc: 'Звонок/переписка для понимания вашей ситуации' },
    { step: '2', title: 'Сбор информации', desc: 'Вы передаёте документы, ссылки на каналы/магазины, описание деятельности' },
    { step: '3', title: 'Анализ', desc: 'Проверка на нарушения авторских прав, товарных знаков, рекламного законодательства' },
    { step: '4', title: 'Отчёт', desc: 'Юридическое заключение с рисками и рекомендациями' },
    { step: '5', title: 'Консультация', desc: 'Разбираем отчёт, отвечаю на вопросы, даю план действий' },
    { step: '6', title: 'Исполнение (опционально)', desc: 'Помогаю внедрить изменения: переписать договоры, зарегистрировать права и т.д.' }
  ];

  const faq = [
    {
      q: 'Зачем проверять бизнес, если я ничего не нарушаю?',
      a: 'Многие нарушения неочевидны: использование чужих фото товаров, копирование описаний, нелегальное использование логотипов брендов. Часто предприниматели не знают о нарушениях до блокировки.'
    },
    {
      q: 'Что такое рисковый бизнес?',
      a: 'Это деятельность с повышенными юридическими рисками: инфобизнес, трейдинг, маркетплейсы, блогинг. Такие сферы часто сталкиваются с претензиями из-за авторских прав, рекламы, защиты прав потребителей.'
    },
    {
      q: 'Могу ли я получить гарантию, что меня не заблокируют?',
      a: 'Абсолютной гарантии нет — решения принимают площадки и суды. Но я минимизирую риски: устраню явные нарушения, подготовлю документы, научу правильно работать с контентом.'
    },
    {
      q: 'Сколько стоит аудит маркетплейса на 1000 товаров?',
      a: 'Полный аудит 1000 товаров — от 150 000 ₽. Можно начать с выборки (100-200 товаров) за 50 000 ₽, чтобы понять масштаб проблем.'
    },
    {
      q: 'Вы работаете с блокировками счетов и разморозкой?',
      a: 'Да, если блокировка связана с нарушениями авторских прав или жалобами правообладателей. Готовлю возражения, обжалую решения площадок, веду переговоры.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Юридическое сопровождение рисковых бизнесов | Проверка на нарушения</title>
        <meta name="description" content="Проверка бизнеса на авторские права, товарные знаки, рекламное законодательство. Аудит маркетплейсов, соцсетей, инфобизнеса. Защита от блокировок." />
        <meta name="keywords" content="юрист для маркетплейса, юрист для вайлдберриз, юрист для озон, юрист для инфобизнеса, проверка бизнеса на нарушения, аудит маркетплейса, разблокировка магазина, защита селлера, юридическая проверка бизнеса, авторские права маркетплейс" />
      </Helmet>
      <StructuredData type="Service" data={{ name: 'Юридическое сопровождение рисковых бизнесов', description: 'Аудит маркетплейсов, инфобизнеса', priceRange: '30000-300000', url: 'https://yoursite.com/uslugi/riskovye-biznesy' }} />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header onContactClick={() => openModal('risky-business', 'Связаться с юристом')} />

        {/* Hero */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Юридическое сопровождение<br />рисковых бизнесов
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Проверю ваш бизнес на нарушения авторских прав, товарных знаков и рекламного законодательства. 
              Защищу от блокировок на маркетплейсах, в соцсетях и других площадках.
            </p>
            <button
              onClick={() => openModal('risky-business', 'Заказать аудит бизнеса')}
              className="inline-flex items-center gap-2 bg-professional-600 text-white px-8 py-4 rounded-xl hover:bg-professional-700 transition-colors text-lg font-semibold"
            >
              <Icon name="Shield" size={24} />
              Заказать аудит
            </button>
          </div>
        </section>

        {/* Рисковые сферы */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Работаю с рисковыми сферами</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {riskySpheres.map((sphere) => (
                <div key={sphere.name} className="p-6 border border-gray-200 rounded-xl hover:border-professional-600 transition-colors">
                  <Icon name={sphere.icon as any} size={40} className="text-professional-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{sphere.name}</h3>
                  <p className="text-gray-600">{sphere.desc}</p>
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
                    onClick={() => openModal('risky-business', `Заказать: ${pkg.name}`)}
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
            <h2 className="text-3xl font-bold text-center mb-12">Как проходит работа</h2>
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
              Не рискуйте — проверьте бизнес на нарушения
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Блокировка магазина или счёта может стоить вам сотен тысяч рублей. 
              Аудит обходится дешевле, чем одна серьёзная претензия.
            </p>
            <button
              onClick={() => openModal('risky-business', 'Заказать аудит')}
              className="bg-white text-professional-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-lg font-semibold"
            >
              Заказать аудит
            </button>
          </div>
        </section>

        <Footer onContactClick={() => openModal('risky-business', 'Связаться в Telegram')} />

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