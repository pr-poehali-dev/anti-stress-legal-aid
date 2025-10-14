import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AnimatedSection from '@/components/ui/animated-section';
import { useToast } from '@/hooks/use-toast';

export default function ChecklistSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, введите корректный email',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Успешно!',
        description: 'Чек-лист отправлен на вашу почту',
      });
      setEmail('');
    }, 1500);
  };

  return (
    <section id="checklist" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <div className="container mx-auto max-w-4xl">
        <AnimatedSection animation="fade-up" delay={100}>
          <Card className="p-8 sm:p-10 md:p-12 bg-white border-2 border-yellow-300 shadow-xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📄</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-trust-900 mb-4">
                Бонус: Чек-лист
              </h2>
              <p className="text-lg sm:text-xl text-trust-700 mb-2">
                "7 ошибок, которые совершают при получении претензии — и как их избежать"
              </p>
              <p className="text-sm text-trust-600">
                Бесплатный PDF-гайд на вашу почту
              </p>
            </div>

            <form onSubmit={handleDownload} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 text-base"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold h-12 px-8"
                >
                  {isLoading ? 'Отправка...' : '🔘 Скачать бесплатно'}
                </Button>
              </div>
              <p className="text-xs text-trust-500 mt-3 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
}
