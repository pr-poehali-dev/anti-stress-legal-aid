import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ContactModal from '@/components/ContactModal';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    service: '',
    title: 'Быстрая связь'
  });

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

  // Получаем все уникальные теги
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Фильтруем посты
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Сортируем по дате (новые первыми)
  const sortedPosts = filteredPosts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header onContactClick={() => openModal('consultation', 'Связаться с юристом')} />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Заголовок блога */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-trust-900 mb-6">
              Блог о защите авторских прав
            </h1>
            <p className="text-xl text-trust-600 mb-8">
              Экспертные статьи, практические советы и актуальная судебная практика 
              по вопросам авторского права от практикующих юристов.
            </p>
            
            {/* Поиск и фильтры */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative mb-6">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-trust-400" size={20} />
                <Input
                  type="text"
                  placeholder="Поиск по статьям..."
                  className="pl-10 py-3 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Теги */}
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                >
                  Все статьи
                </Button>
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Список статей */}
          <div className="max-w-6xl mx-auto">
            {sortedPosts.length === 0 ? (
              <div className="text-center py-16">
                <Icon name="FileSearch" className="mx-auto mb-4 text-trust-400" size={48} />
                <h3 className="text-xl font-semibold text-trust-700 mb-2">
                  Статьи не найдены
                </h3>
                <p className="text-trust-500">
                  Попробуйте изменить поисковый запрос или выбрать другую категорию
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedPosts.map(post => (
                  <article 
                    key={post.id}
                    className="bg-white rounded-xl border border-trust-200 shadow-sm hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="p-6">
                      {/* Метаинформация */}
                      <div className="flex items-center justify-between text-sm text-trust-500 mb-4">
                        <time dateTime={post.publishDate}>
                          {new Date(post.publishDate).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        <div className="flex items-center">
                          <Icon name="Clock" size={14} className="mr-1" />
                          {post.readTime} мин
                        </div>
                      </div>

                      {/* Заголовок */}
                      <h2 className="text-xl font-montserrat font-semibold text-trust-900 mb-3 group-hover:text-professional-600 transition-colors">
                        <Link to={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h2>

                      {/* Краткое описание */}
                      <p className="text-trust-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Теги */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <Badge 
                            key={tag}
                            variant="secondary"
                            className="text-xs cursor-pointer hover:bg-professional-100"
                            onClick={() => setSelectedTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Автор и кнопка */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-trust-500">
                          {post.author}
                        </div>
                        <Link to={`/blog/${post.slug}`}>
                          <Button variant="outline" size="sm" className="group-hover:bg-professional-50">
                            Читать
                            <Icon name="ArrowRight" className="ml-1" size={14} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* CTA секция */}
          <div className="max-w-4xl mx-auto mt-20 text-center">
            <div className="bg-professional-50 rounded-2xl p-8 border border-professional-100">
              <h3 className="text-2xl font-montserrat font-bold text-trust-900 mb-4">
                Нужна персональная консультация?
              </h3>
              <p className="text-trust-600 mb-6">
                Получите профессиональную помощь по вашей ситуации с авторскими правами
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-professional-600 hover:bg-professional-700"
                  onClick={() => openModal('consultation', 'Консультация по авторским правам')}
                >
                  <Icon name="MessageCircle" className="mr-2" size={20} />
                  Бесплатная консультация
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => openModal('analysis', 'Анализ документов')}
                >
                  <Icon name="FileCheck" className="mr-2" size={20} />
                  Анализ претензии — 5000 ₽
                </Button>
              </div>
            </div>
          </div>
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