import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ContactModal from '@/components/ContactModal';
import CommentSystem from '@/components/CommentSystem';
import { useState, useEffect } from 'react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [modalState, setModalState] = useState({
    isOpen: false,
    service: '',
    title: 'Быстрая связь'
  });

  const post = blogPosts.find(p => p.slug === slug);

  const openModal = (service: string, title: string) => {
    setModalState({
      isOpen: true,
      service,
      title
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      service: '',
      title: 'Быстрая связь'
    });
  };

  // SEO для страницы статьи
  useEffect(() => {
    if (post) {
      document.title = post.seoTitle || post.title + ' | ПравоПомощь 24/7';
      
      // Обновляем meta description
      let descriptionMeta = document.querySelector('meta[name="description"]');
      if (descriptionMeta) {
        descriptionMeta.setAttribute('content', post.seoDescription || post.excerpt);
      }

      // Обновляем keywords
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta && post.seoKeywords) {
        keywordsMeta.setAttribute('content', post.seoKeywords.join(', '));
      }

      // Обновляем canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', `https://yourdomain.com/blog/${post.slug}`);
      }
    }

    return () => {
      // Возвращаем исходные мета-теги при уходе со страницы
      document.title = 'ПравоПомощь 24/7 — Защита авторских прав | Анализ претензий от 5000₽';
      let descriptionMeta = document.querySelector('meta[name="description"]');
      if (descriptionMeta) {
        descriptionMeta.setAttribute('content', 'Профессиональная защита авторских прав в России. Анализ претензий за 24-48 часов от 5000₽. Консультации, представительство в суде. Работаем 24/7. Результат гарантирован.');
      }
    };
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Рекомендуемые статьи (исключаем текущую)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header onContactClick={() => openModal('consultation', 'Связаться с юристом')} />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Хлебные крошки */}
          <nav className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center space-x-2 text-sm text-trust-500">
              <Link to="/" className="hover:text-professional-600">
                Главная
              </Link>
              <Icon name="ChevronRight" size={14} />
              <Link to="/blog" className="hover:text-professional-600">
                Блог
              </Link>
              <Icon name="ChevronRight" size={14} />
              <span className="text-trust-700">{post.title}</span>
            </div>
          </nav>

          {/* Изображение статьи */}
          {post.image && (
            <div className="max-w-5xl mx-auto mb-12">
              <div className="aspect-video overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          )}

          {/* Заголовок статьи */}
          <header className="max-w-4xl mx-auto mb-12 text-center">
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-montserrat font-bold text-trust-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center space-x-6 text-trust-500">
              <div className="flex items-center">
                <Icon name="User" className="mr-2" size={16} />
                {post.author}
              </div>
              <div className="flex items-center">
                <Icon name="Calendar" className="mr-2" size={16} />
                <time dateTime={post.publishDate}>
                  {new Date(post.publishDate).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center">
                <Icon name="Clock" className="mr-2" size={16} />
                {post.readTime} мин чтения
              </div>
            </div>
          </header>

          {/* Содержание статьи */}
          <article className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg prose-trust max-w-none mb-12
                prose-headings:font-montserrat prose-headings:font-semibold prose-headings:text-trust-900
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-trust-700 prose-p:leading-relaxed prose-p:mb-6
                prose-ul:text-trust-700 prose-ol:text-trust-700
                prose-li:mb-2 prose-li:leading-relaxed
                prose-strong:text-trust-900 prose-strong:font-semibold
                prose-blockquote:border-l-4 prose-blockquote:border-professional-400 
                prose-blockquote:bg-professional-50 prose-blockquote:pl-6 prose-blockquote:py-4
                prose-blockquote:italic prose-blockquote:text-trust-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA в конце статьи */}
            <div className="bg-gradient-to-r from-professional-50 to-trust-50 rounded-2xl p-8 border border-professional-100">
              <div className="text-center">
                <h3 className="text-2xl font-montserrat font-bold text-trust-900 mb-4">
                  Нужна помощь с вашей ситуацией?
                </h3>
                <p className="text-trust-600 mb-6">
                  Получите персональную консультацию по вашему делу от специалиста по авторским правам
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-professional-600 hover:bg-professional-700"
                    onClick={() => openModal('consultation', 'Консультация по статье: ' + post.title)}
                  >
                    <Icon name="MessageCircle" className="mr-2" size={20} />
                    Бесплатная консультация
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => openModal('analysis', 'Анализ по теме: ' + post.title)}
                  >
                    <Icon name="FileCheck" className="mr-2" size={20} />
                    Анализ претензии — 5000 ₽
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Рекомендуемые статьи */}
          {relatedPosts.length > 0 && (
            <section className="max-w-6xl mx-auto mt-20">
              <h2 className="text-2xl font-montserrat font-bold text-trust-900 mb-8 text-center">
                Читайте также
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <article className="bg-white rounded-xl border border-trust-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
                      <div className="flex items-center text-sm text-trust-500 mb-3">
                        <time dateTime={relatedPost.publishDate}>
                          {new Date(relatedPost.publishDate).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </time>
                        <span className="mx-2">•</span>
                        <span>{relatedPost.readTime} мин</span>
                      </div>
                      
                      <h3 className="text-lg font-montserrat font-semibold text-trust-900 mb-3 group-hover:text-professional-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-trust-600 text-sm line-clamp-3 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      
                      <div className="flex items-center text-professional-600 font-medium text-sm">
                        Читать статью
                        <Icon name="ArrowRight" className="ml-1 group-hover:translate-x-1 transition-transform" size={14} />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Система комментариев */}
          <CommentSystem postSlug={post.slug} postTitle={post.title} />
        </div>
      </main>

      <Footer onContactClick={() => openModal('consultation', 'Связаться в Telegram')} />
      
      <ContactModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        service={modalState.service}
        title={modalState.title}
      />
    </div>
  );
}