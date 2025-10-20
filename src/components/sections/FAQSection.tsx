import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import StructuredData from '@/components/StructuredData';

export default function FAQSection() {
  const faqItems = [
    {
      question: 'Что делать, если претензию прислали по почте?',
      answer: 'Не игнорируйте. Даже если письмо выглядит как шаблон — ответьте в течение 30 дней. Я помогу составить грамотный ответ — чтобы не усугубить ситуацию.'
    },
    {
      question: 'Могут ли реально подать в суд за картинку / музыку / шрифт?',
      answer: 'Да, могут. Но могут ≠ сделают. 80% претензий — это "пугалки", чтобы вы заплатили без суда. Я помогу понять: стоит ли бояться — или это блеф.'
    },
    {
      question: 'Что, если я действительно нарушил?',
      answer: 'Тогда будем минимизировать ущерб. Я помогу снизить сумму компенсации (иногда в 10 раз), перевести дело в досудебное урегулирование, заключить мировое соглашение на выгодных условиях. Лучше заплатить 15 000 по договору, чем 150 000 по решению суда.'
    },
    {
      question: 'Сколько времени займёт защита?',
      answer: 'Анализ претензии — 1–2 дня. Досудебное урегулирование — от 3 дней до 2 недель. Судебный процесс — от 1 до 3 месяцев (в зависимости от загруженности суда). Я работаю быстро — потому что знаю, как важно для вас закрыть вопрос.'
    },
    {
      question: 'Почему у вас такие цены?',
      answer: 'Потому что я специализируюсь только на этом. Я вижу сотни претензий в год — и знаю, где можно сэкономить время и деньги. Мои цены — это не "сколько я хочу", а "сколько реально нужно, чтобы решить вашу проблему".'
    }
  ];
  
  return (
    <section id="faq" className="relative py-12 md:py-20 bg-slate-50/50">
      <StructuredData type="FAQPage" data={{ items: faqItems }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-trust-900 mb-4 px-2">
            Ответы на важные вопросы
          </h2>
          <p className="text-base sm:text-lg text-trust-600 px-2">
            Самая важная информация о защите от претензий по авторским правам
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index + 1}`} 
                className="border border-professional-200 rounded-lg px-4 sm:px-6"
              >
                <AccordionTrigger className="text-left text-trust-900 hover:text-professional-600 text-sm sm:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-trust-600 pt-4 text-sm sm:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}