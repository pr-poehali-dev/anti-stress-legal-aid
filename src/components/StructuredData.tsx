import { Helmet } from 'react-helmet';

interface Person {
  name: string;
  jobTitle: string;
  description: string;
  email: string;
  telephone: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface Service {
  name: string;
  description: string;
  priceRange?: string;
  url: string;
}

interface StructuredDataProps {
  type: 'WebSite' | 'Person' | 'FAQPage' | 'Service' | 'Organization' | 'BreadcrumbList';
  data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: any = {};

  switch (type) {
    case 'WebSite':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Интелект - Юрист по авторским правам',
        url: 'https://yoursite.com',
        description: 'Юрист по защите авторских прав, товарных знаков и интеллектуальной собственности',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://yoursite.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      };
      break;

    case 'Person':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data?.name || 'Юрист по авторским правам',
        jobTitle: data?.jobTitle || 'Юрист по интеллектуальной собственности',
        description: data?.description || 'Специалист по защите авторских прав, товарных знаков, патентов',
        email: data?.email || 'contact@example.com',
        telephone: data?.telephone || '+7 (XXX) XXX-XX-XX',
        url: data?.url || 'https://yoursite.com',
        image: 'https://yoursite.com/lawyer-photo.jpg',
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Юридический факультет'
        },
        knowsAbout: [
          'Авторское право',
          'Товарные знаки',
          'Патенты',
          'Интеллектуальная собственность',
          'Судебная защита',
          'DMCA'
        ]
      };
      break;

    case 'FAQPage':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: (data?.items || []).map((item: FAQItem) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      };
      break;

    case 'Service':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: data?.name || 'Юридические услуги',
        provider: {
          '@type': 'Person',
          name: 'Юрист по авторским правам'
        },
        description: data?.description || '',
        areaServed: {
          '@type': 'Country',
          name: 'Россия'
        },
        ...(data?.priceRange && {
          offers: {
            '@type': 'Offer',
            price: data.priceRange,
            priceCurrency: 'RUB'
          }
        }),
        url: data?.url || 'https://yoursite.com'
      };
      break;

    case 'Organization':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Интелект - Юрист по авторским правам',
        description: 'Защита авторских прав, товарных знаков и интеллектуальной собственности',
        url: 'https://yoursite.com',
        telephone: '+7 (XXX) XXX-XX-XX',
        email: 'contact@example.com',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'RU',
          addressLocality: 'Москва'
        },
        priceRange: '₽₽',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '200',
          bestRating: '5',
          worstRating: '1'
        },
        areaServed: {
          '@type': 'Country',
          name: 'Россия'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Юридические услуги',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Защита авторских прав',
                description: 'Судебная защита, досудебное урегулирование'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Регистрация товарного знака',
                description: 'Регистрация в Роспатенте, проверка, защита'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'DMCA и блокировка контента',
                description: 'Подача жалоб, удаление пиратского контента'
              }
            }
          ]
        }
      };
      break;

    case 'BreadcrumbList':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: (data?.items || []).map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      };
      break;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
