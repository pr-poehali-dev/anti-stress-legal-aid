import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import AnimatedSection from '@/components/ui/animated-section';

interface BlogCTAProps {
  onContactClick: () => void;
}

export default function BlogCTA({ onContactClick }: BlogCTAProps) {
  return (
    <AnimatedSection animation="fade-up" delay={600} className="mt-12 md:mt-16">
      <Card className="bg-gradient-to-r from-professional-50 to-professional-100 border-2 border-professional-200 max-w-4xl mx-auto">
        <CardContent className="text-center p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-montserrat font-bold text-trust-900 mb-4">
            Нужна персональная консультация?
          </h3>
          <p className="text-trust-600 mb-6 leading-relaxed">
            Если у вас есть вопросы по вашей конкретной ситуации или вы получили претензию — 
            обращайтесь за профессиональной помощью
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              size="lg"
              className="bg-professional-600 hover:bg-professional-700"
              onClick={onContactClick}
            >
              <Icon name="MessageCircle" className="mr-2" size={18} />
              Получить консультацию
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-professional-600 text-professional-700 hover:bg-professional-600 hover:text-white"
              onClick={onContactClick}
            >
              <Icon name="FileCheck" className="mr-2" size={18} />
              Анализ претензии
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}