import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

interface CommentSystemProps {
  postSlug: string;
  postTitle: string;
}

export default function CommentSystem({ postSlug, postTitle }: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Алексей Иванов',
      email: 'alexey@example.com',
      content: 'Очень полезная статья! У меня как раз похожая ситуация была. Благодаря вашим советам смог снизить сумму компенсации в 3 раза.',
      timestamp: '2024-12-15T10:30:00Z',
      replies: [
        {
          id: '1-1',
          author: 'Юрист ПравоПомощь',
          email: 'lawyer@pravopomosh.ru',
          content: 'Рады помочь! Если возникнут новые вопросы, обращайтесь за консультацией.',
          timestamp: '2024-12-15T14:20:00Z'
        }
      ]
    },
    {
      id: '2', 
      author: 'Мария Петрова',
      email: 'maria@example.com',
      content: 'А сколько времени обычно занимает переговорный процесс с правообладателем?',
      timestamp: '2024-12-14T16:45:00Z'
    }
  ]);

  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: ''
  });

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.author || !newComment.email || !newComment.content) {
      toast({
        title: "Заполните все поля",
        description: "Для публикации комментария необходимо указать имя, email и текст.",
        variant: "destructive"
      });
      return;
    }

    // Здесь будет отправка на сервер
    const comment: Comment = {
      id: Date.now().toString(),
      author: newComment.author,
      email: newComment.email,
      content: newComment.content,
      timestamp: new Date().toISOString()
    };

    setComments(prev => [comment, ...prev]);
    setNewComment({ author: '', email: '', content: '' });
    
    toast({
      title: "Комментарий добавлен",
      description: "Ваш комментарий успешно опубликован!",
    });
  };

  const handleReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: `${commentId}-${Date.now()}`,
      author: 'Анонимный пользователь',
      email: 'user@example.com',
      content: replyContent,
      timestamp: new Date().toISOString()
    };

    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, replies: [...(comment.replies || []), reply] }
          : comment
      )
    );

    setReplyContent('');
    setReplyingTo(null);
    
    toast({
      title: "Ответ добавлен",
      description: "Ваш ответ успешно опубликован!",
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div className="bg-white rounded-2xl border border-trust-200 shadow-sm p-8">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-montserrat font-bold text-trust-900">
            Комментарии ({comments.length})
          </h3>
          <Badge variant="secondary" className="bg-professional-50 text-professional-700">
            <Icon name="MessageSquare" className="mr-1" size={14} />
            Обсуждение
          </Badge>
        </div>

        {/* Форма добавления комментария */}
        <form onSubmit={handleSubmitComment} className="mb-8 p-6 bg-slate-50 rounded-xl">
          <h4 className="text-lg font-semibold text-trust-800 mb-4">Добавить комментарий</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="author">Ваше имя *</Label>
              <Input
                id="author"
                value={newComment.author}
                onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Введите ваше имя"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={newComment.email}
                onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                className="mt-1"
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="content">Комментарий *</Label>
            <Textarea
              id="content"
              value={newComment.content}
              onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Поделитесь своим мнением или задайте вопрос..."
              rows={4}
              className="mt-1"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-trust-500">
              Email не будет опубликован. Обязательные поля помечены *
            </p>
            <Button type="submit" className="bg-professional-600 hover:bg-professional-700">
              <Icon name="Send" className="mr-2" size={16} />
              Отправить
            </Button>
          </div>
        </form>

        {/* Список комментариев */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="MessageSquare" className="mx-auto mb-4 text-trust-300" size={48} />
              <h4 className="text-xl font-semibold text-trust-600 mb-2">
                Пока нет комментариев
              </h4>
              <p className="text-trust-500">
                Будьте первым, кто оставит комментарий к этой статье!
              </p>
            </div>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="border border-trust-100 rounded-xl p-6">
                {/* Основной комментарий */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-professional-100 rounded-full flex items-center justify-center">
                      <Icon name="User" className="text-professional-600" size={20} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h5 className="font-semibold text-trust-900">{comment.author}</h5>
                      {comment.author.includes('Юрист') && (
                        <Badge variant="secondary" className="bg-professional-100 text-professional-700 text-xs">
                          <Icon name="Shield" className="mr-1" size={12} />
                          Эксперт
                        </Badge>
                      )}
                      <span className="text-sm text-trust-500">{formatDate(comment.timestamp)}</span>
                    </div>
                    
                    <p className="text-trust-700 mb-3 leading-relaxed">{comment.content}</p>
                    
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="text-professional-600 hover:text-professional-700"
                      >
                        <Icon name="Reply" className="mr-1" size={14} />
                        Ответить
                      </Button>
                    </div>

                    {/* Форма ответа */}
                    {replyingTo === comment.id && (
                      <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                        <Textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Ваш ответ..."
                          rows={3}
                          className="mb-3"
                        />
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleReply(comment.id)}
                            className="bg-professional-600 hover:bg-professional-700"
                          >
                            Отправить
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyContent('');
                            }}
                          >
                            Отмена
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Ответы на комментарий */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 space-y-4">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="border-l-2 border-professional-200 pl-4">
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-professional-50 rounded-full flex items-center justify-center">
                                  <Icon name="User" className="text-professional-500" size={16} />
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-1">
                                  <h6 className="font-medium text-trust-800 text-sm">{reply.author}</h6>
                                  {reply.author.includes('Юрист') && (
                                    <Badge variant="secondary" className="bg-professional-100 text-professional-700 text-xs">
                                      <Icon name="Shield" className="mr-1" size={10} />
                                      Эксперт
                                    </Badge>
                                  )}
                                  <span className="text-xs text-trust-500">{formatDate(reply.timestamp)}</span>
                                </div>
                                <p className="text-trust-600 text-sm leading-relaxed">{reply.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* CTA для консультации */}
        <div className="mt-8 p-6 bg-gradient-to-r from-professional-50 to-trust-50 rounded-xl border border-professional-100">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-trust-900 mb-2">
              Нужна персональная консультация?
            </h4>
            <p className="text-trust-600 text-sm mb-4">
              Обсудите вашу ситуацию с экспертом по авторским правам
            </p>
            <Button className="bg-professional-600 hover:bg-professional-700">
              <Icon name="MessageCircle" className="mr-2" size={16} />
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}