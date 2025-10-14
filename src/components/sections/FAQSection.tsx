import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AnimatedSection from '@/components/ui/animated-section';

export default function FAQSection() {
  const faqs = [
    {
      question: '❓ Что делать, если получил претензию на email?',
      answer: '✅ Ни в коем случае не отвечать самостоятельно. Сначала — анализ юристом.'
    },
    {
      question: '❓ Можно ли избежать суда?',
      answer: '✅ В 83% случаев — да. Мы решаем на досудебной стадии.'
    },
    {
      question: '❓ Что будет, если проигнорировать?',
      answer: '✅ Иск, штраф, блокировка контента.'
    }
  ];

  return (
    <section id="faq" className="relative py-12 md:py-20 bg-slate-50/50">
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-trust-900 mb-4 px-2">
              Часто задаваемые вопросы
            </h2>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={200 + index * 100}>
                <AccordionItem value={`item-${index}`} className="border-2 border-professional-200 rounded-lg px-4 sm:px-6 bg-white">
                  <AccordionTrigger className="text-left text-trust-900 hover:text-professional-600 text-base sm:text-lg font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-trust-700 pt-4 text-base sm:text-lg">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </AnimatedSection>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
