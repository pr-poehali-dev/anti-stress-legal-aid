import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import AnimatedSection from '@/components/ui/animated-section';

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

interface BlogPostListProps {
  posts: BlogPost[];
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  onPostSelect: (post: BlogPost) => void;
}

export default function BlogPostList({ 
  posts, 
  selectedCategory, 
  categories, 
  onCategoryChange, 
  onPostSelect 
}: BlogPostListProps) {
  const filteredPosts = selectedCategory === 'Все' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
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
              onClick={() => onCategoryChange(category)}
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
                    onClick={() => onPostSelect(post)}
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
    </div>
  );
}