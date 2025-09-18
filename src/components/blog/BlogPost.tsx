import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
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

interface BlogPostProps {
  post: BlogPost;
  onBack: () => void;
  onContactClick: () => void;
}

export default function BlogPost({ post, onBack, onContactClick }: BlogPostProps) {
  return (
    <>
      <Header onContactClick={onContactClick} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-professional-50/30">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="mb-6"
          >
            <Icon name="ArrowLeft" className="mr-2" size={16} />
            Назад к статьям
          </Button>
          
          <article className="bg-white border-2 border-professional-200 rounded-xl p-6 md:p-8 shadow-lg">
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-professional-100 text-professional-700">
                  {post.category}
                </Badge>
                <span className="text-trust-500">•</span>
                <span className="text-trust-500">{post.date}</span>
                <span className="text-trust-500">•</span>
                <span className="text-trust-500">{post.readTime}</span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-trust-900 mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
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
                  __html: post.content
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
        <Footer onContactClick={onContactClick} />
      </div>
    </>
  );
}