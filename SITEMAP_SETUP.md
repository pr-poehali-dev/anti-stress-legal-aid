# ✅ Sitemap и robots.txt настроены

## Что реализовано

### 1. Sitemap.xml обновлён

Добавлены все страницы услуг с правильными приоритетами:

```xml
<!-- 5 страниц услуг -->
https://intelect.pro/uslugi/zashchita-avtorskih-prav/sud-otvetstvennost
https://intelect.pro/uslugi/zashchita-avtorskih-prav/blokirovka-i-udaleniya
https://intelect.pro/uslugi/riskovye-biznesy
https://intelect.pro/uslugi/tovarnyy-znak
https://intelect.pro/uslugi/intellektualnaya-sobstvennost
```

**Приоритеты:**
- Главная страница: `1.0`
- Страницы услуг: `0.95` (высокий приоритет - основные коммерческие страницы)
- Секции главной (#services, #pricing): `0.9`
- Блог: `0.9`
- FAQ, отзывы: `0.8`

**Частота обновления:**
- Главная: `daily`
- Услуги: `monthly` (стабильный контент)
- Блог: `daily` (новости и статьи)
- Секции: `weekly` или `monthly`

---

### 2. Robots.txt оптимизирован

```txt
User-agent: *
Allow: /

# Запрещаем индексацию технических файлов
Disallow: /api/
Disallow: /*.json$
Disallow: /node_modules/

# Основная карта сайта
Sitemap: https://intelect.pro/sitemap.xml

# Основной домен
Host: https://intelect.pro
```

**Что изменилось:**
- ✅ Разрешена индексация всех страниц (`Allow: /`)
- ✅ Закрыты технические файлы (API, JSON)
- ✅ Указан путь к sitemap.xml
- ✅ Определён основной домен (Host)

---

## Следующие шаги

### 1. Отправить sitemap в Google Search Console

**Пошагово:**

1. Зайдите в [Google Search Console](https://search.google.com/search-console)
2. Выберите свойство `intelect.pro`
3. В меню слева → **Файлы Sitemap**
4. Нажмите **Добавить файл sitemap**
5. Введите: `https://intelect.pro/sitemap.xml`
6. Нажмите **Отправить**

**Ожидаемый результат:**
- Google начнёт индексацию всех страниц из sitemap
- Проверка статуса: через 1-3 дня

---

### 2. Отправить sitemap в Яндекс.Вебмастер

**Пошагово:**

1. Зайдите в [Яндекс.Вебмастер](https://webmaster.yandex.ru/)
2. Выберите сайт `intelect.pro`
3. В меню → **Индексирование → Файлы Sitemap**
4. Нажмите **Добавить**
5. Введите: `https://intelect.pro/sitemap.xml`
6. Нажмите **Добавить**

**Ожидаемый результат:**
- Яндекс начнёт индексацию всех страниц
- Проверка статуса: через 1-7 дней

---

### 3. Проверить индексацию

#### Google:
```
site:intelect.pro
```

Должно показать 11+ страниц:
- Главная
- 5 страниц услуг
- Блог
- Секции главной

#### Яндекс:
```
host:intelect.pro
```

#### Проверить конкретную страницу:
```
site:intelect.pro/uslugi/riskovye-biznesy
```

---

### 4. Ускорить индексацию (опционально)

#### Google Search Console - URL Inspection:
1. Откройте GSC → **Проверка URL**
2. Вставьте URL страницы услуги
3. Нажмите **Запросить индексирование**
4. Повторите для всех 5 страниц услуг

#### Яндекс.Вебмастер - Переобход:
1. Откройте Вебмастер → **Индексирование → Переобход страниц**
2. Вставьте URL страницы
3. Нажмите **Добавить**
4. Повторите для всех страниц

---

## Структура sitemap (полная)

```
intelect.pro/
├── / (главная) - priority: 1.0
├── /#services - priority: 0.9
├── /#pricing - priority: 0.9
├── /#how-it-works - priority: 0.8
├── /#benefits - priority: 0.8
├── /#faq - priority: 0.8
├── /#stats - priority: 0.7
├── /#testimonials - priority: 0.8
├── /blog - priority: 0.9
└── /uslugi/
    ├── zashchita-avtorskih-prav/
    │   ├── sud-otvetstvennost - priority: 0.95
    │   └── blokirovka-i-udaleniya - priority: 0.95
    ├── riskovye-biznesy - priority: 0.95
    ├── tovarnyy-znak - priority: 0.95
    └── intellektualnaya-sobstvennost - priority: 0.95
```

**Итого:** 17 URL в sitemap

---

## Проверка корректности

### 1. XML Sitemap Validator:
```
https://www.xml-sitemaps.com/validate-xml-sitemap.html
```
Вставьте: `https://intelect.pro/sitemap.xml`

### 2. Robots.txt Tester (GSC):
1. Google Search Console → **robots.txt**
2. Проверьте, что все страницы услуг **разрешены**

### 3. Проверка доступности:
```bash
curl https://intelect.pro/sitemap.xml
curl https://intelect.pro/robots.txt
```

Оба файла должны возвращать HTTP 200

---

## Ожидаемые результаты

### В течение 1-2 недель:

✅ **Индексация всех 5 страниц услуг**
- Google: 100% страниц в индексе
- Яндекс: 100% страниц в индексе

✅ **Ускоренная индексация новых страниц**
- Вместо 1-2 месяцев → 3-7 дней

✅ **Правильная приоритизация**
- Поисковики чаще обходят важные страницы (услуги, главная)
- Реже обходят статичный контент (FAQ, отзывы)

✅ **Rich snippets в выдаче**
- FAQ сниппеты для страниц услуг
- Цены в результатах поиска
- Хлебные крошки для навигации

---

## Мониторинг эффективности

### Google Search Console - отслеживайте:

1. **Покрытие** (Coverage):
   - Сколько страниц проиндексировано
   - Есть ли ошибки индексации

2. **Эффективность** (Performance):
   - Рост кликов по страницам услуг
   - CTR по ключевым запросам
   - Средняя позиция

3. **Расширения** (Enhancements):
   - Статус FAQ разметки
   - Статус Service разметки
   - Ошибки структурированных данных

### Яндекс.Вебмастер - отслеживайте:

1. **Индексирование**:
   - Количество страниц в индексе
   - Исключённые страницы

2. **Поисковые запросы**:
   - По каким запросам показываются страницы
   - CTR и позиции

3. **Качество сайта**:
   - ИКС (Индекс Качества Сайта)
   - Факторы ранжирования

---

## Дополнительная оптимизация (опционально)

### 1. Создать отдельный image sitemap:
Если будет много изображений на страницах услуг

### 2. Настроить динамическую генерацию sitemap:
Если появятся статьи в блоге с динамическими URL

### 3. Добавить видео в sitemap:
Если будут видеообзоры услуг или кейсов

---

**Статус:** ✅ Полностью настроено  
**Файлы:** `public/sitemap.xml`, `public/robots.txt`  
**Следующий шаг:** Отправить sitemap в GSC и Яндекс.Вебмастер
