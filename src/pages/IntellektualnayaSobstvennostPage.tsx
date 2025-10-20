import { useState } from 'react';
import { Helmet } from 'react-helmet';
import StructuredData from '@/components/StructuredData';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ContactModal from '@/components/ContactModal';
import Icon from '@/components/ui/icon';

export default function IntellektualnayaSobstvennostPage() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    service: 'ip',
    title: 'Консультация по интеллектуальной собственности'
  });

  const openModal = (service: string, title: string) => {
    setModalState({ isOpen: true, service, title });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, service: '', title: '' });
  };

  const ipTypes = [
    {
      icon: 'Copyright',
      title: 'Авторское право',
      desc: 'Защита текстов, изображений, музыки, видео, программ',
      keywords: 'авторские права, защита авторских прав'
    },
    {
      icon: 'Tag',
      title: 'Товарные знаки',
      desc: 'Регистрация логотипов, названий, слоганов',
      keywords: 'регистрация товарного знака'
    },
    {
      icon: 'Lightbulb',
      title: 'Патенты',
      desc: 'Изобретения, полезные модели, промышленные образцы',
      keywords: 'патент на изобретение'
    },
    {
      icon: 'Globe',
      title: 'Доменные имена',
      desc: 'Споры о доменах, киберсквоттинг',
      keywords: 'домен, киберсквоттинг'
    },
    {
      icon: 'Lock',
      title: 'Коммерческая тайна',
      desc: 'Защита ноу-хау, конфиденциальной информации',
      keywords: 'коммерческая тайна'
    },
    {
      icon: 'Award',
      title: 'Средства индивидуализации',
      desc: 'Фирменные наименования, коммерческие обозначения',
      keywords: 'фирменное наименование'
    }
  ];

  const services = [
    'Регистрация прав на объекты ИС',
    'Защита от нарушений (суд, претензии)',
    'Договоры: лицензии, отчуждение, франшизы',
    'Аудит интеллектуальной собственности',
    'Споры в Роспатенте и ФИПС',
    'Международная регистрация (Мадридская система, PCT)',
    'Сопровождение сделок с ИС',
    'Консультации по защите ноу-хау'
  ];

  const packages = [
    {
      name: 'Консультация',
      price: '10 000 ₽',
      desc: 'Разовый разбор',
      features: [
        'Анализ вашей ситуации',
        'Правовое заключение',
        'План действий',
        'Срок: 1-2 дня'
      ]
    },
    {
      name: 'Регистрация/Защита',
      price: 'от 40 000 ₽',
      desc: 'Конкретная услуга',
      popular: true,
      features: [
        'Регистрация прав (ТЗ, патент и т.д.)',
        'Или защита от нарушений',
        'Полное юридическое сопровождение',
        'Документы, подача, контроль',
        'Срок: от 2 недель до года (зависит от объекта)'
      ]
    },
    {
      name: 'Абонемент',
      price: 'от 100 000 ₽/мес',
      desc: 'Комплексное сопровождение',
      features: [
        'Управление портфелем ИС',
        'Мониторинг нарушений',
        'Договорная работа',
        'Претензии и судебные споры',
        'Стратегия защиты',
        'Срок: 6-12 месяцев'
      ]
    }
  ];

  const process = [
    { step: '1', title: 'Анализ', desc: 'Определяю объекты ИС, которые нужно защитить' },
    { step: '2', title: 'Стратегия', desc: 'Разрабатываю план: что регистрировать, что держать в секрете, что лицензировать' },
    { step: '3', title: 'Регистрация', desc: 'Подготавливаю заявки в Роспатент/ФИПС, контролирую экспертизу' },
    { step: '4', title: 'Договоры', desc: 'Готовлю лицензионные соглашения, договоры отчуждения, NDA' },
    { step: '5', title: 'Мониторинг', desc: 'Отслеживаю нарушения: копирование, использование без разрешения' },
    { step: '6', title: 'Защита', desc: 'При нарушениях: претензии, переговоры, суд, взыскание компенсации' }
  ];

  const serviceFaqItems = [
    {
      question: 'Сколько стоит защита интеллектуальной собственности?',
      answer: 'От 10 000 ₽ за консультацию, от 40 000 ₽ за регистрацию или защиту прав. Зависит от типа объекта ИС, сложности задачи и объёма работ. Сделаем расчёт за 15 минут.'
    },
    {
      question: 'Сроки выполнения?',
      answer: 'Обычно 2 недели—1 год в зависимости от объекта. Точный график — после брифа и анализа вашей ситуации.'
    },
    {
      question: 'Какие гарантии?',
      answer: 'Гарантируем профессиональное сопровождение на всех этапах, комплексный подход к защите всех видов ИС, конфиденциальность. Есть договор и SLA.'
    }
  ];

  const faq = [
    {
      q: 'Что такое интеллектуальная собственность?',
      a: 'Это права на результаты творческой и интеллектуальной деятельности: авторские права, товарные знаки, патенты, ноу-хау, дизайн, программы и т.д.'
    },
    {
      q: 'Зачем регистрировать права, если они возникают автоматически?',
      a: 'Авторское право возникает автоматически, но для защиты в суде нужны доказательства авторства. Товарные знаки и патенты требуют обязательной регистрации.'
    },
    {
      q: 'Сколько стоит зарегистрировать патент?',
      a: 'Патент на изобретение — от 150 000 ₽ (юрист + пошлины), срок 1-2 года. Полезная модель — от 80 000 ₽, срок 8-12 месяцев. Промышленный образец — от 60 000 ₽, 6-10 месяцев.'
    },
    {
      q: 'Можно ли защитить идею?',
      a: 'Нет, идеи не охраняются. Защищается конкретное воплощение идеи: текст, программа, чертёж, дизайн. Или процесс (патент на способ).'
    },
    {
      q: 'Что такое международная регистрация?',
      a: 'Это регистрация прав сразу в нескольких странах через единую систему: Мадридская (ТЗ), PCT (патенты), Гаагская (дизайн). Упрощает процесс и снижает расходы.'
    },
    {
      q: 'Что делать, если конкурент скопировал мой продукт?',
      a: 'Определяем, какие права нарушены (авторские, патент, ТЗ). Направляем претензию. При отказе — подаём в суд с требованием запрета использования и компенсации до 5 млн ₽.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Юрист по интеллектуальной собственности | Регистрация и защита прав</title>
        <meta name="description" content="Защита интеллектуальной собственности: авторские права, товарные знаки, патенты. Регистрация прав, судебная защита, лицензии, аудит ИС." />
        <meta name="keywords" content="интеллектуальная собственность, защита интеллектуальной собственности, юрист по интеллектуальной собственности, авторские права, патент, товарный знак, регистрация прав, нарушение интеллектуальной собственности, лицензионный договор" />
        
        <link rel="canonical" href="https://intelect.pro/uslugi/intellektualnaya-sobstvennost" />
        
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://intelect.pro/uslugi/intellektualnaya-sobstvennost" />
        <meta property="og:title" content="Юрист по интеллектуальной собственности — Интелект" />
        <meta property="og:description" content="Консультация от 10 000₽. Регистрация прав от 40 000₽. Защита авторских прав, ТЗ, патентов." />
        <meta property="og:image" content="https://cdn.poehali.dev/files/9f862400-252f-44a3-b612-fddd201cb3b6.png" />
        <meta property="og:locale" content="ru_RU" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Юрист по интеллектуальной собственности" />
        <meta name="twitter:description" content="Защита авторских прав, ТЗ, патентов. Консультация от 10 000₽, регистрация от 40 000₽. Полное сопровождение ИС." />
        <meta name="twitter:image" content="https://cdn.poehali.dev/files/9f862400-252f-44a3-b612-fddd201cb3b6.png" />
      </Helmet>
      
      <StructuredData 
        type="Service" 
        data={{
          name: 'Юрист по интеллектуальной собственности',
          description: 'Защита ИС: авторские права, товарные знаки, патенты',
          serviceType: 'LegalService',
          priceRange: '10000',
          url: 'https://yoursite.com/uslugi/intellektualnaya-sobstvennost'
        }}
      />
      <StructuredData 
        type="FAQPage" 
        data={{ questions: serviceFaqItems }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header onContactClick={() => openModal('ip', 'Связаться с юристом')} />

        {/* Hero */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Юрист по интеллектуальной<br />собственности
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Защищаю авторские права, регистрирую товарные знаки и патенты, веду судебные споры. 
              Полное сопровождение вашей интеллектуальной собственности.
            </p>
            <button
              onClick={() => openModal('ip', 'Консультация по ИС')}
              className="inline-flex items-center gap-2 bg-professional-600 text-white px-8 py-4 rounded-xl hover:bg-professional-700 transition-colors text-lg font-semibold"
            >
              <Icon name="Shield" size={24} />
              Получить консультацию
            </button>
          </div>
        </section>

        {/* Типы ИС */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Работаю со всеми объектами ИС</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {ipTypes.map((type) => (
                <div key={type.title} className="p-6 border border-gray-200 rounded-xl hover:border-professional-600 transition-colors">
                  <Icon name={type.icon as any} size={40} className="text-professional-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                  <p className="text-gray-600 mb-3">{type.desc}</p>
                  <p className="text-sm text-gray-500 italic">{type.keywords}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Услуги */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Что я делаю</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200">
                  <Icon name="CheckCircle2" size={24} className="text-professional-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Пакеты */}
        <section className="py-16 px-4 bg-white">
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
                    onClick={() => openModal('ip', `Заказать: ${pkg.name}`)}
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
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Как я работаю</h2>
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
        <section className="py-16 px-4 bg-white">
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
              Защитите свою интеллектуальную собственность
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Без правовой защиты конкуренты могут использовать ваши идеи, разработки, бренды. 
              Получите консультацию по защите вашей ИС.
            </p>
            <button
              onClick={() => openModal('ip', 'Консультация по ИС')}
              className="bg-white text-professional-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-lg font-semibold"
            >
              Получить консультацию
            </button>
          </div>
        </section>

        <Footer onContactClick={() => openModal('ip', 'Связаться в Telegram')} />

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