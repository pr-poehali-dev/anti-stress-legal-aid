import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '@/components/ui/animated-section';

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: 'Спасибо! Спасли от штрафа в 600 000 ₽. Быстро, по делу, без воды',
      author: 'Ирина',
      role: 'блогер'
    },
    {
      text: 'Претензия от крупного издательства — решил за неделю. В суд не попал',
      author: 'Павел',
      role: 'digital-студия'
    }
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto max-w-5xl">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-trust-900 mb-4 sm:mb-6">
              Отзывы клиентов
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={200 + index * 100}>
              <Card className="bg-white border-2 border-purple-200 hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-4">
                    <span className="text-4xl text-purple-400">«</span>
                  </div>
                  <p className="text-base sm:text-lg text-trust-800 mb-6 leading-relaxed italic">
                    {testimonial.text}
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-trust-900">{testimonial.author}</p>
                    <p className="text-sm text-trust-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
