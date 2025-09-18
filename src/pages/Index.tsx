import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    description: '',
    file: null as File | null
  });

  const [counters, setCounters] = useState({
    savedMoney: 0,
    closedCases: 0,
    avgSavings: 0
  });

  const animateCounter = (start: number, end: number, duration: number, setter: (value: number) => void) => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      setter(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      animateCounter(0, 28500000, 2500, (value) => 
        setCounters(prev => ({ ...prev, savedMoney: value }))
      );
      animateCounter(0, 247, 2000, (value) => 
        setCounters(prev => ({ ...prev, closedCases: value }))
      );
      animateCounter(0, 387000, 2300, (value) => 
        setCounters(prev => ({ ...prev, avgSavings: value }))
      );
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Анализ претензии отправлен:', formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Scale" className="text-professional-600" size={32} />
              <span className="text-xl font-montserrat font-bold text-trust-800">ЮрЗащита</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#services" className="text-trust-600 hover:text-professional-600 transition-colors">Услуги</a>
              <a href="#cases" className="text-trust-600 hover:text-professional-600 transition-colors">Кейсы</a>
              <a href="#faq" className="text-trust-600 hover:text-professional-600 transition-colors">Вопросы</a>
              <Button size="sm" className="bg-professional-600 hover:bg-professional-700">
                Связаться
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-professional-100 text-professional-700 border-professional-200">
            Не паникуйте — есть решение
          </Badge>
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-trust-900 mb-6 leading-tight">
            Получили претензию об авторских правах?
          </h1>
          <p className="text-xl md:text-2xl text-professional-600 mb-4 font-medium">
            Не платите. Не паникуйте. Скорее всего — её можно оспорить.
          </p>
          <p className="text-lg text-trust-600 mb-10 max-w-3xl mx-auto">
            Я помогаю бизнесу, блогерам и маркетологам отбиваться от необоснованных претензий по авторским правам.
            9 из 10 таких писем — это шантаж, ошибка или раздутая сумма.
          </p>
          
          {/* Animated Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm border border-professional-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl md:text-4xl font-montserrat font-bold text-professional-600 mb-2">
                {counters.savedMoney.toLocaleString('ru-RU')} ₽
              </div>
              <div className="text-trust-600 font-medium">Сэкономлено клиентам</div>
              <div className="text-sm text-trust-500 mt-1">за все время работы</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-professional-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl md:text-4xl font-montserrat font-bold text-professional-600 mb-2">
                {counters.closedCases}+
              </div>
              <div className="text-trust-600 font-medium">Закрытых дел</div>
              <div className="text-sm text-trust-500 mt-1">успешно завершены</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-professional-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl md:text-4xl font-montserrat font-bold text-professional-600 mb-2">
                {counters.avgSavings.toLocaleString('ru-RU')} ₽
              </div>
              <div className="text-trust-600 font-medium">Средняя экономия</div>
              <div className="text-sm text-trust-500 mt-1">на одно дело</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-professional-600 hover:bg-professional-700 text-lg px-8 py-6">
              <Icon name="FileCheck" className="mr-2" size={20} />
              Анализ претензии — 5000 ₽
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-professional-300">
              <Icon name="Phone" className="mr-2" size={20} />
              Экспресс-консультация — 3000 ₽
            </Button>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section id="services" className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-trust-900 mb-4">
              3 шага — и претензия больше не ваша проблема
            </h2>
            <p className="text-lg text-trust-600 max-w-2xl mx-auto">
              Четкий алгоритм без сюрпризов и скрытых платежей
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-professional-100 hover:border-professional-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-professional-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" className="text-professional-600" size={24} />
                </div>
                <CardTitle className="text-xl text-trust-900">Анализ за 5000 ₽</CardTitle>
                <CardDescription>24-48 часов</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-trust-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                    <span>Проверка оснований претензии</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                    <span>Оценка реальных рисков</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                    <span>Письменное заключение + звонок</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-professional-50 rounded-lg">
                  <p className="text-sm text-professional-700 font-medium">
                    5000 ₽ засчитываются при дальнейшем сотрудничестве
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-professional-100 hover:border-professional-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-professional-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MessageSquare" className="text-professional-600" size={24} />
                </div>
                <CardTitle className="text-xl text-trust-900">Досудебное решение</CardTitle>
                <CardDescription>Без суда</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-trust-50 rounded-lg">
                    <span className="text-trust-700">До 100 000 ₽</span>
                    <Badge variant="secondary">15 000 ₽</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-trust-50 rounded-lg">
                    <span className="text-trust-700">100-300 тыс. ₽</span>
                    <Badge variant="secondary">25 000 ₽</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-trust-50 rounded-lg">
                    <span className="text-trust-700">Свыше 300 тыс. ₽</span>
                    <Badge variant="secondary">Индивидуально</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-professional-100 hover:border-professional-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-professional-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Gavel" className="text-professional-600" size={24} />
                </div>
                <CardTitle className="text-xl text-trust-900">Судебная защита</CardTitle>
                <CardDescription>Полное сопровождение</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-montserrat font-bold text-professional-600 mb-2">
                    От 50 000 ₽
                  </div>
                  <p className="text-trust-600 mb-4">Всё включено</p>
                  <ul className="space-y-2 text-trust-700 text-left">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                      <span>Подготовка документов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                      <span>Участие в заседаниях</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-professional-600 mt-1 flex-shrink-0" size={16} />
                      <span>Апелляции при необходимости</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cases Section */}
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

      {/* Why Me Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-trust-900 mb-6">
              Почему клиенты выбирают меня?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-professional-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Target" className="text-professional-600" size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-montserrat font-semibold text-trust-900 mb-2">Только защита</h3>
                  <p className="text-trust-600">
                    Я не помогаю "оформить авторские права". Я только защищаю от претензий — и делаю это каждый день.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-professional-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="DollarSign" className="text-professional-600" size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-montserrat font-semibold text-trust-900 mb-2">Фиксированные цены</h3>
                  <p className="text-trust-600">
                    Никаких "потом посмотрим". Вы знаете стоимость до начала работы.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-professional-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="MessageCircle" className="text-professional-600" size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-montserrat font-semibold text-trust-900 mb-2">Без паники</h3>
                  <p className="text-trust-600">
                    Я объясню всё на пальцах — без сложных терминов и юридического жаргона.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-professional-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="TrendingDown" className="text-professional-600" size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-montserrat font-semibold text-trust-900 mb-2">Экономлю ваши деньги</h3>
                  <p className="text-trust-600">
                    Чаще всего удаётся снизить сумму в 5–10 раз — или вообще закрыть дело.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-trust-900 mb-4">
              Частые вопросы
            </h2>
            <p className="text-lg text-trust-600">
              Отвечаю на самые популярные вопросы о защите от претензий
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-professional-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-trust-900 hover:text-professional-600">
                  Что делать, если претензию прислали по почте?
                </AccordionTrigger>
                <AccordionContent className="text-trust-600 pt-4">
                  Не игнорируйте. Даже если письмо выглядит как шаблон — ответьте в течение 30 дней.
                  Я помогу составить грамотный ответ — чтобы не усугубить ситуацию.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-professional-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-trust-900 hover:text-professional-600">
                  Могут ли реально подать в суд за картинку / музыку / шрифт?
                </AccordionTrigger>
                <AccordionContent className="text-trust-600 pt-4">
                  Да, могут. Но могут ≠ сделают. 80% претензий — это "пугалки", чтобы вы заплатили без суда.
                  Я помогу понять: стоит ли бояться — или это блеф.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-professional-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-trust-900 hover:text-professional-600">
                  Что, если я действительно нарушил?
                </AccordionTrigger>
                <AccordionContent className="text-trust-600 pt-4">
                  Тогда будем минимизировать ущерб. Я помогу снизить сумму компенсации (иногда в 10 раз), 
                  перевести дело в досудебное урегулирование, заключить мировое соглашение на выгодных условиях.
                  Лучше заплатить 15 000 по договору, чем 150 000 по решению суда.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-professional-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-trust-900 hover:text-professional-600">
                  Сколько времени займёт защита?
                </AccordionTrigger>
                <AccordionContent className="text-trust-600 pt-4">
                  <ul className="space-y-2">
                    <li>• Анализ претензии — 1–2 дня</li>
                    <li>• Досудебное урегулирование — от 3 дней до 2 недель</li>
                    <li>• Судебный процесс — от 1 до 3 месяцев (в зависимости от загруженности суда)</li>
                  </ul>
                  <p className="mt-4">Я работаю быстро — потому что знаю, как важно для вас закрыть вопрос.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-professional-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-trust-900 hover:text-professional-600">
                  Почему у вас такие цены?
                </AccordionTrigger>
                <AccordionContent className="text-trust-600 pt-4">
                  Потому что я специализируюсь только на этом. Я вижу сотни претензий в год — и знаю, 
                  где можно сэкономить время и деньги. Мои цены — это не "сколько я хочу", 
                  а "сколько реально нужно, чтобы решить вашу проблему".
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Form Section */}
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

      {/* Footer */}
      <footer className="bg-trust-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Icon name="Scale" className="text-professional-400" size={32} />
              <span className="text-2xl font-montserrat font-bold">ЮрЗащита</span>
            </div>
            <p className="text-trust-300 mb-8 max-w-2xl mx-auto">
              Не знаете, с чего начать? Напишите мне в Telegram — отвечу за 1 час.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="outline" size="lg" className="border-professional-400 text-professional-400 hover:bg-professional-400 hover:text-white">
                <Icon name="Send" className="mr-2" size={20} />
                Telegram
              </Button>
              <Button variant="outline" size="lg" className="border-professional-400 text-professional-400 hover:bg-professional-400 hover:text-white">
                <Icon name="Phone" className="mr-2" size={20} />
                +7 (XXX) XXX-XX-XX
              </Button>
            </div>
            <div className="mt-8 pt-8 border-t border-trust-700">
              <p className="text-trust-400 text-sm">
                P.S. Если вы читаете это — вы уже на полпути к решению. Осталось сделать один шаг.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}