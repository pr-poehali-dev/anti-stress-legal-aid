import Icon from '@/components/ui/icon';

export default function WhyMeSection() {
  return (
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
  );
}