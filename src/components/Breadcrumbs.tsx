import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
  '/': [{ label: 'Главная', path: '/' }],
  '/blog': [
    { label: 'Главная', path: '/' },
    { label: 'Блог', path: '/blog' }
  ],
  '/uslugi/zashchita-avtorskih-prav/sud-otvetstvennost': [
    { label: 'Главная', path: '/' },
    { label: 'Услуги', path: '/#services' },
    { label: 'Нарушение авторских прав', path: '/uslugi/zashchita-avtorskih-prav/sud-otvetstvennost' }
  ],
  '/uslugi/zashchita-avtorskih-prav/blokirovka-i-udaleniya': [
    { label: 'Главная', path: '/' },
    { label: 'Услуги', path: '/#services' },
    { label: 'DMCA и блокировка контента', path: '/uslugi/zashchita-avtorskih-prav/blokirovka-i-udaleniya' }
  ],
  '/uslugi/riskovye-biznesy': [
    { label: 'Главная', path: '/' },
    { label: 'Услуги', path: '/#services' },
    { label: 'Рисковые бизнесы', path: '/uslugi/riskovye-biznesy' }
  ],
  '/uslugi/tovarnyy-znak': [
    { label: 'Главная', path: '/' },
    { label: 'Услуги', path: '/#services' },
    { label: 'Товарный знак', path: '/uslugi/tovarnyy-znak' }
  ],
  '/uslugi/intellektualnaya-sobstvennost': [
    { label: 'Главная', path: '/' },
    { label: 'Услуги', path: '/#services' },
    { label: 'Интеллектуальная собственность', path: '/uslugi/intellektualnaya-sobstvennost' }
  ]
};

export default function Breadcrumbs() {
  const location = useLocation();
  const breadcrumbs = breadcrumbMap[location.pathname] || [{ label: 'Главная', path: '/' }];

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-4">
      <div className="max-w-6xl mx-auto">
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {index > 0 && (
                  <Icon name="ChevronRight" size={16} className="text-gray-400" />
                )}
                {isLast ? (
                  <span className="text-gray-600 font-medium">{crumb.label}</span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="text-professional-600 hover:text-professional-700 hover:underline transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
