import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface FormData {
  name: string;
  contact: string;
  description: string;
  file: File | null;
}

export default function FormSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    description: '',
    file: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Анализ претензии отправлен:', formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-professional-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-trust-900 mb-4">
              Прислать претензию на анализ
            </h2>
            <p className="text-lg text-trust-600 mb-6">
              Получите честный анализ за 5000 ₽ в течение 24-48 часов
            </p>
            <div className="flex items-center justify-center gap-2 text-professional-600">
              <Icon name="Shield" size={20} />
              <span className="font-medium">5000 ₽ засчитываются при дальнейшем сотрудничестве</span>
            </div>
          </div>

          <Card className="border-2 border-professional-200">
            <CardHeader>
              <CardTitle className="text-center text-trust-900">Форма анализа претензии</CardTitle>
              <CardDescription className="text-center">
                Заполните форму — и получите письменное заключение + 30-минутный звонок
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-trust-800">Ваше имя *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-2"
                    placeholder="Как к вам обращаться?"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contact" className="text-trust-800">Телефон или email *</Label>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                    className="mt-2"
                    placeholder="+7 (xxx) xxx-xx-xx или email@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="file" className="text-trust-800">Прикрепите претензию *</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    className="mt-2"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    required
                  />
                  <p className="text-sm text-trust-500 mt-1">
                    Форматы: PDF, DOC, DOCX, JPG, PNG (до 10 МБ)
                  </p>
                </div>

                <div>
                  <Label htmlFor="description" className="text-trust-800">Кратко опишите ситуацию</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-2"
                    placeholder="За что требуют деньги? Когда пришла претензия? (необязательно)"
                    rows={4}
                  />
                </div>

                <div className="bg-professional-50 rounded-lg p-6 space-y-3">
                  <h4 className="font-montserrat font-semibold text-trust-900">Гарантии:</h4>
                  <ul className="space-y-2 text-trust-700">
                    <li className="flex items-start gap-2">
                      <Icon name="Clock" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                      <span>Анализ за 24–48 часов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="FileText" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                      <span>Письменное заключение + 30-минутный звонок</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="RefreshCw" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                      <span>5000 ₽ засчитываются в счёт дальнейшей работы</span>
                    </li>
                  </ul>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-professional-600 hover:bg-professional-700 text-lg py-6"
                >
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить претензию на анализ — 5000 ₽
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}