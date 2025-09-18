import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import AnimatedSection from '@/components/ui/animated-section';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Что делать, если вам пришла претензия по авторским правам',
    excerpt: 'Пошаговая инструкция действий при получении претензии. Как не паниковать и правильно оценить ситуацию.',
    content: `
# Что делать, если вам пришла претензия по авторским правам

Получение претензии по авторским правам может вызвать панику, особенно когда речь идет о крупных суммах. Но в большинстве случаев ситуация не так критична, как кажется.

## Первые шаги

### 1. Не паникуйте и не платите сразу
Самая главная ошибка — немедленная оплата требуемой суммы. В 90% случаев претензии можно оспорить или существенно снизить сумму.

### 2. Внимательно изучите претензию
Обратите внимание на:
- Точное описание нарушения
- Доказательства авторства
- Обоснование суммы ущерба
- Правовые основания требований

### 3. Проверьте основания претензии
- Действительно ли материал защищен авторским правом?
- Есть ли у заявителя права на этот материал?
- Было ли действительно нарушение?

## Типичные ошибки в претензиях

1. **Завышение ущерба** — часто сумма не соответствует реальным убыткам
2. **Неправомерные требования** — требования выходят за рамки закона
3. **Отсутствие доказательств** — нет подтверждения авторства или нарушения

## Когда стоит обратиться к юристу

- Сумма претензии превышает 50 000 рублей
- Есть угрозы судебного разбирательства
- Претензия касается коммерческой деятельности
- Вы не уверены в правомерности требований

**Помните**: большинство претензий можно урегулировать мирно, не доводя до суда, но с существенной экономией средств.
    `,
    category: 'Инструкции',
    date: '15 сентября 2025',
    readTime: '5 мин',
    tags: ['претензии', 'авторские права', 'инструкция']
  },
  {
    id: '2',
    title: 'Как фотостоки и агентства завышают суммы ущерба',
    excerpt: 'Разбираем популярные схемы завышения ущерба и способы их выявления. Реальные примеры из практики.',
    content: `
# Как фотостоки и агентства завышают суммы ущерба

Многие правообладатели и агентства используют различные схемы для завышения сумм ущерба. Знание этих методов поможет вам защитить свои интересы.

## Основные схемы завышения

### 1. Многократное увеличение лицензионной стоимости
Реальная стоимость лицензии на фото может составлять 500-2000 рублей, но в претензии указывают 50 000-100 000 рублей.

### 2. Включение "упущенной выгоды"
Заявители часто добавляют к основной сумме "упущенную выгоду", которая может в разы превышать реальный ущерб.

### 3. Требование компенсации за "моральный вред"
Для юридических лиц моральный вред не предусмотрен, но его часто включают в претензии.

## Как проверить обоснованность суммы

1. **Запросите прайс-лист** — сравните с заявленной суммой
2. **Изучите рыночные цены** — проверьте стоимость аналогичных лицензий
3. **Проанализируйте масштаб использования** — соответствует ли сумма реальному распространению

## Законные способы снижения суммы

- Доказательство добросовестного заблуждения
- Минимальный масштаб использования
- Быстрое удаление спорного материала
- Готовность к мирному урегулированию

## Пример из практики

**Случай**: Претензия на 150 000 рублей за использование фото в соцсетях
**Результат**: Урегулировано за 5 000 рублей
**Экономия**: 145 000 рублей (97%)

Ключевым фактором стало доказательство того, что изображение использовалось в некоммерческих целях и было удалено сразу после получения претензии.
    `,
    category: 'Практика',
    date: '12 сентября 2025',
    readTime: '7 мин',
    tags: ['фотостоки', 'ущерб', 'практика', 'экономия']
  },
  {
    id: '3',
    title: 'Авторские права на изображения: что нужно знать бизнесу',
    excerpt: 'Основы авторского права для предпринимателей. Как избежать нарушений и защитить свой бизнес.',
    content: `
# Авторские права на изображения: что нужно знать бизнесу

Использование изображений в коммерческих целях — один из самых рискованных аспектов ведения бизнеса в интернете. Разберем основные принципы и способы защиты.

## Что защищается авторским правом

### Все изображения по умолчанию защищены
- Фотографии (в том числе любительские)
- Иллюстрации и рисунки
- Графические элементы
- Коллажи и обработанные изображения

### Исключения
- Официальные документы
- Изображения, срок охраны которых истек (70 лет после смерти автора)
- Простые геометрические формы

## Безопасные источники изображений

### 1. Собственное производство
- Фотосъемка своими силами
- Заказ у фотографа с передачей прав
- Создание графики штатным дизайнером

### 2. Легальные фотостоки
- Shutterstock, Getty Images, Adobe Stock
- Обязательно сохраняйте лицензии!
- Проверяйте условия использования

### 3. Бесплатные ресурсы
- Unsplash, Pixabay, Pexels
- Внимательно читайте лицензии
- Не все изображения там действительно свободны

## Типичные ошибки бизнеса

1. **Использование изображений из Google** — самая частая ошибка
2. **Игнорирование водяных знаков** — использование защищенных изображений
3. **Несохранение лицензий** — отсутствие доказательств законного приобретения

## Как минимизировать риски

### Создайте корпоративную политику
- Четкие правила использования изображений
- Обучение сотрудников
- Контроль за соблюдением

### Ведите документооборот
- Сохраняйте все лицензии
- Фиксируйте источники изображений
- Создайте базу проверенных ресурсов

### Регулярные аудиты
- Проверка используемых изображений
- Удаление сомнительного контента
- Обновление устаревших лицензий

## Что делать при нарушении

1. Не паникуйте — большинство случаев решается мирно
2. Немедленно удалите спорное изображение
3. Обратитесь к специалисту для оценки ситуации
4. Ведите переговоры с правообладателем

**Помните**: предотвращение нарушений всегда дешевле их устранения.
    `,
    category: 'Обучение',
    date: '8 сентября 2025',
    readTime: '8 мин',
    tags: ['бизнес', 'изображения', 'авторские права', 'профилактика']
  },
  {
    id: '4',
    title: 'Как отвечать на претензии: шаблоны и примеры',
    excerpt: 'Готовые шаблоны ответов на претензии. Правильная юридическая терминология и тактика ведения переговоров.',
    content: `
# Как отвечать на претензии: шаблоны и примеры

Правильно составленный ответ на претензию может кардинально изменить ход дела. Рассмотрим основные принципы и готовые шаблоны.

## Основные принципы ответа

### 1. Не игнорируйте претензию
- Отсутствие ответа может быть расценено как признание вины
- Соблюдайте указанные сроки ответа
- Лучше дать промежуточный ответ, чем молчать

### 2. Будьте вежливы, но тверды
- Используйте официальный тон
- Не признавайте вину без анализа
- Выражайте готовность к диалогу

### 3. Требуйте доказательства
- Просите подтверждение авторства
- Требуйте обоснование суммы ущерба
- Запрашивайте правоустанавливающие документы

## Шаблон ответа на претензию

\`\`\`
[Дата]

[ФИО или наименование заявителя]
[Адрес]

Уважаемый(ая) [ФИО/наименование]!

В ответ на Вашу претензию от [дата] сообщаю следующее:

1. Ваше обращение рассмотрено. Для объективного разрешения ситуации прошу предоставить:
   - Документы, подтверждающие Ваши исключительные права на спорный объект
   - Детальное обоснование заявленной суммы ущерба
   - Доказательства факта и объема нарушения

2. [Если применимо] Спорное изображение удалено с сайта [дата удаления].

3. Выражаю готовность к конструктивному диалогу и мирному урегулированию спора.

Ответ на данное обращение прошу направить в течение 10 рабочих дней.

С уважением,
[Подпись]
[ФИО, должность]
\`\`\`

## Частые ошибки в ответах

1. **Немедленное признание нарушения** — даже если нарушение было
2. **Согласие с завышенной суммой** — не соглашайтесь на первую цифру
3. **Эмоциональные формулировки** — держите официальный тон
4. **Игнорирование сроков** — отвечайте в установленные сроки

## Тактические приемы

### Запрос дополнительных документов
- Выигрываете время для анализа
- Проверяете серьезность намерений заявителя
- Можете выявить слабые места в претензии

### Предложение альтернативного решения
- Размещение ссылки на правообладателя
- Публичные извинения
- Символическая компенсация

### Указание на смягчающие обстоятельства
- Добросовестное заблуждение
- Некоммерческое использование
- Быстрое устранение нарушения

## Когда стоит привлечь юриста

- Сумма претензии превышает 100 000 рублей
- Заявитель настаивает на судебном разбирательстве
- Претензия касается вашей основной деятельности
- Вы не уверены в правильности формулировок

**Помните**: грамотный ответ на претензию — это 50% успеха в урегулировании спора.
    `,
    category: 'Инструкции',
    date: '5 сентября 2025',
    readTime: '6 мин',
    tags: ['претензии', 'ответы', 'шаблоны', 'переговоры']
  }
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const handleContactClick = () => {
    window.open('https://t.me/your_telegram', '_blank');
  };

  const categories = ['Все', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  
  const filteredPosts = selectedCategory === 'Все' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  if (selectedPost) {
    return (
      <>
        <Header onContactClick={handleContactClick} />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-professional-50/30">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
          <Button 
            variant="outline" 
            onClick={() => setSelectedPost(null)}
            className="mb-6"
          >
            <Icon name="ArrowLeft" className="mr-2" size={16} />
            Назад к статьям
          </Button>
          
          <article className="bg-white border-2 border-professional-200 rounded-xl p-6 md:p-8 shadow-lg">
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-professional-100 text-professional-700">
                  {selectedPost.category}
                </Badge>
                <span className="text-trust-500">•</span>
                <span className="text-trust-500">{selectedPost.date}</span>
                <span className="text-trust-500">•</span>
                <span className="text-trust-500">{selectedPost.readTime}</span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-trust-900 mb-4 leading-tight">
                {selectedPost.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="border-professional-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>
            
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-trust-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: selectedPost.content
                    .split('\n')
                    .map(line => {
                      line = line.trim();
                      if (!line) return '<br>';
                      
                      // Заголовки
                      if (line.startsWith('# ')) {
                        return `<h2 class="text-xl md:text-2xl font-montserrat font-bold text-trust-900 mt-8 mb-4">${line.slice(2)}</h2>`;
                      }
                      if (line.startsWith('## ')) {
                        return `<h3 class="text-lg md:text-xl font-montserrat font-semibold text-trust-800 mt-6 mb-3">${line.slice(3)}</h3>`;
                      }
                      if (line.startsWith('### ')) {
                        return `<h4 class="text-base md:text-lg font-montserrat font-medium text-trust-700 mt-4 mb-2">${line.slice(4)}</h4>`;
                      }
                      
                      // Списки
                      if (line.startsWith('- ')) {
                        return `<div class="ml-4 mb-2">• ${line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-trust-900">$1</strong>')}</div>`;
                      }
                      
                      // Код блоки
                      if (line.startsWith('```')) {
                        return line === '```' ? '' : `<div class="bg-slate-100 p-4 rounded-lg font-mono text-sm mt-4 mb-4">`;
                      }
                      
                      // Обычный текст
                      return `<p class="mb-4">${line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-trust-900">$1</strong>')}</p>`;
                    })
                    .join('')
                    .replace(/<div class="bg-slate-100 p-4 rounded-lg font-mono text-sm mt-4 mb-4">([\s\S]*?)<\/div>/g, (match, content) => {
                      const lines = content.split('<p class="mb-4">').filter(Boolean);
                      return `<div class="bg-slate-100 p-4 rounded-lg font-mono text-sm mt-4 mb-4">${lines.map(l => l.replace('</p>', '')).join('<br>')}</div>`;
                    })
                }}
              />
            </div>
          </article>
        </div>
        <Footer onContactClick={handleContactClick} />
      </>
    );
  }

  return (
    <>
      <Header onContactClick={handleContactClick} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-professional-50/30">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <AnimatedSection animation="fade-up" className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-trust-900 mb-4">
            Блог о защите авторских прав
          </h1>
          <p className="text-lg md:text-xl text-trust-600 max-w-3xl mx-auto leading-relaxed">
            Полезные статьи, практические советы и реальные кейсы 
            по защите от претензий и соблюдению авторских прав
          </p>
        </AnimatedSection>

        {/* Фильтр по категориям */}
        <AnimatedSection animation="fade-up" delay={200} className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-professional-600 hover:bg-professional-700" 
                  : "border-professional-300 hover:bg-professional-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        {/* Список статей */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {filteredPosts.map((post, index) => (
            <AnimatedSection
              key={post.id}
              animation="fade-up"
              delay={300 + index * 100}
            >
              <Card className="bg-white border-2 border-professional-200 hover:border-professional-300 transition-all duration-300 hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-professional-100 text-professional-700">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-trust-500">
                      <Icon name="Clock" size={14} />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-montserrat font-bold text-trust-900 leading-tight hover:text-professional-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-trust-600 leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="border-professional-300 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-trust-500">{post.date}</span>
                    <Button 
                      size="sm"
                      onClick={() => setSelectedPost(post)}
                      className="bg-professional-600 hover:bg-professional-700"
                    >
                      Читать статью
                      <Icon name="ArrowRight" className="ml-2" size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA секция */}
        <AnimatedSection animation="fade-up" delay={600} className="mt-12 md:mt-16">
          <Card className="bg-gradient-to-r from-professional-50 to-professional-100 border-2 border-professional-200 max-w-4xl mx-auto">
            <CardContent className="text-center p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-montserrat font-bold text-trust-900 mb-4">
                Нужна персональная консультация?
              </h3>
              <p className="text-trust-600 mb-6 leading-relaxed">
                Если у вас есть вопросы по вашей конкретной ситуации или вы получили претензию — 
                обращайтесь за профессиональной помощью
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="lg"
                  className="bg-professional-600 hover:bg-professional-700"
                  onClick={handleContactClick}
                >
                  <Icon name="MessageCircle" className="mr-2" size={18} />
                  Получить консультацию
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-professional-600 text-professional-700 hover:bg-professional-600 hover:text-white"
                  onClick={handleContactClick}
                >
                  <Icon name="FileCheck" className="mr-2" size={18} />
                  Анализ претензии
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
      <Footer onContactClick={handleContactClick} />
    </>
  );
}