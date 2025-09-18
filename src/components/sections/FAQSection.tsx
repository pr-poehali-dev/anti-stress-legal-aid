import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQSection() {
  return (
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
  );
}