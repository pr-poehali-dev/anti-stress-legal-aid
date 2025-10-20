# SEO и JSON-LD разметка

## ✅ Что реализовано

### 1. Meta-теги на всех страницах
- **Главная:** title, description, keywords (90K+ запросов)
- **5 страниц услуг:** полные мета-теги с ключевыми словами

### 2. JSON-LD разметка (Schema.org)

#### Компонент StructuredData
Создан универсальный компонент `/src/components/StructuredData.tsx` с поддержкой:

- **WebSite** - информация о сайте
- **Organization** - данные организации с рейтингом и услугами
- **Person** - информация о специалисте
- **FAQPage** - структурированные FAQ для расширенных сниппетов
- **Service** - описание услуг с ценами
- **BreadcrumbList** - хлебные крошки для навигации

#### Где используется

**Главная страница:**
```tsx
<StructuredData type="Organization" />
<StructuredData type="WebSite" />
<StructuredData type="FAQPage" data={{ items: faqItems }} />
```

**Страницы услуг:**
```tsx
<StructuredData type="Service" data={{ name, description, priceRange, url }} />
<StructuredData type="BreadcrumbList" data={{ items }} />
```

### 3. Хлебные крошки (Breadcrumbs)
- Компонент `/src/components/Breadcrumbs.tsx`
- Автоматическая навигация: Главная → Услуги → Страница
- Добавлен на все страницы услуг

### 4. Семантическое ядро покрыто

| Страница | Запросов/мес | Статус |
|----------|-------------|--------|
| Главная | 90,000+ | ✅ |
| Нарушение авторских прав | 30,000 | ✅ |
| Рисковые бизнесы | 30,000 | ✅ |
| Товарный знак | 18,000 | ✅ |
| Интеллектуальная собственность | 8,000 | ✅ |
| DMCA и блокировки | 4,200 | ✅ |
| **ИТОГО:** | **180,200** | ✅ |

## 🔧 Как использовать

### Добавить JSON-LD на новую страницу

```tsx
import StructuredData from '@/components/StructuredData';

// В компоненте
<StructuredData 
  type="Service" 
  data={{
    name: 'Название услуги',
    description: 'Описание',
    priceRange: '10000-50000',
    url: 'https://yoursite.com/page'
  }}
/>
```

### Обновить FAQ разметку

```tsx
const faqItems = [
  { question: 'Вопрос?', answer: 'Ответ' }
];

<StructuredData type="FAQPage" data={{ items: faqItems }} />
```

### Добавить хлебные крошки

```tsx
import Breadcrumbs from '@/components/Breadcrumbs';

// В компоненте после Header
<Breadcrumbs />
```

Маршруты настраиваются в `/src/components/Breadcrumbs.tsx`.

## 📊 Проверка разметки

1. **Google Rich Results Test:**  
   https://search.google.com/test/rich-results

2. **Schema.org Validator:**  
   https://validator.schema.org/

3. **Yandex Вебмастер:**  
   Проверка микроразметки в панели вебмастера

## 🎯 Следующие шаги

1. ✅ Заменить `https://yoursite.com` на реальный домен
2. ✅ Обновить контактные данные (телефон, email) в StructuredData
3. ✅ Добавить реальные фото юриста для разметки Person
4. ✅ Настроить Google Search Console
5. ✅ Настроить Яндекс.Вебмастер
6. ✅ Отправить sitemap.xml

## 📈 Ожидаемый эффект

- **Расширенные сниппеты** в Google (FAQ, рейтинг, цены)
- **Хлебные крошки** в результатах поиска
- **Рост CTR** на 20-40% за счёт rich snippets
- **Улучшение позиций** по семантическому ядру 180K+ запросов
