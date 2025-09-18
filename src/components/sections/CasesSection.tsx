import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function CasesSection() {
  return (
    <section id="cases" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-trust-900 mb-4">
            Реальные кейсы — реальная экономия
          </h2>
          <p className="text-lg text-trust-600">
            Более 200 успешно закрытых дел с 2020 года
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-professional-50 to-white border-professional-200">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-green-100 text-green-700">Дело закрыто</Badge>
                <Icon name="TrendingDown" className="text-green-600" size={20} />
              </div>
              <CardTitle className="text-xl text-trust-900">Фото с Pinterest</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-trust-600">Требовали:</span>
                  <span className="font-bold text-red-600">450 000 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-trust-600">Потратили:</span>
                  <span className="font-bold text-green-600">25 000 ₽</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-trust-800">Экономия:</span>
                    <span className="text-2xl font-bold text-green-600">425 000 ₽</span>
                  </div>
                </div>
                <p className="text-sm text-trust-600 italic">
                  "Доказали, что правообладатель не имел исключительных прав"
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-professional-50 to-white border-professional-200">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-green-100 text-green-700">Претензия отозвана</Badge>
                <Icon name="Music" className="text-professional-600" size={20} />
              </div>
              <CardTitle className="text-xl text-trust-900">Музыка в Reels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-trust-600">Угрожали иском:</span>
                  <span className="font-bold text-red-600">До 200 000 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-trust-600">Стоимость защиты:</span>
                  <span className="font-bold text-green-600">15 000 ₽</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-trust-800">Срок решения:</span>
                    <span className="text-xl font-bold text-professional-600">2 недели</span>
                  </div>
                </div>
                <p className="text-sm text-trust-600 italic">
                  "Нашли прецеденты отказа судов в подобных исках"
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-professional-50 to-white border-professional-200">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-green-100 text-green-700">Претензия снята</Badge>
                <Icon name="Image" className="text-professional-600" size={20} />
              </div>
              <CardTitle className="text-xl text-trust-900">Похожий логотип</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-trust-600">Требовали:</span>
                  <span className="font-bold text-red-600">300 000 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-trust-600">Итого заплатили:</span>
                  <span className="font-bold text-green-600">0 ₽</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-trust-800">Экономия:</span>
                    <span className="text-2xl font-bold text-green-600">300 000 ₽</span>
                  </div>
                </div>
                <p className="text-sm text-trust-600 italic">
                  "Доказали добросовестное использование и отсутствие смешения"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}