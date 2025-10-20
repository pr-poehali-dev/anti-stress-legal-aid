import { useState } from 'react';
import { Helmet } from 'react-helmet';
import StructuredData from '@/components/StructuredData';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CasesSection from '@/components/sections/CasesSection';
import WhyMeSection from '@/components/sections/WhyMeSection';
import FAQSection from '@/components/sections/FAQSection';
import FormSection from '@/components/sections/FormSection';
import Footer from '@/components/sections/Footer';
import ContactModal from '@/components/ContactModal';
import AIAgent from '@/components/AIAgent';


export default function Index() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    service: '',
    title: 'Быстрая связь'
  });

  const openModal = (service: string, title: string) => {
    setModalState({
      isOpen: true,
      service,
      title
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      service: '',
      title: 'Быстрая связь'
    });
  };

  return (
    <>
      <Helmet>
        <title>Юрист по авторским правам и интеллектуальной собственности | Защита прав</title>
        <meta name="description" content="Юрист по защите авторских прав, товарных знаков и интеллектуальной собственности. Регистрация ТЗ, судебная защита, DMCA, аудит бизнеса. Опыт 10+ лет, 200+ выигранных дел." />
        <meta name="keywords" content="юрист по авторским правам, защита авторских прав, товарный знак регистрация, интеллектуальная собственность юрист, нарушение авторских прав, dmca жалоба, юрист для маркетплейса, патент регистрация, защита интеллектуальной собственности" />
        <link rel="canonical" href="https://intelect.pro/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://intelect.pro/" />
        <meta property="og:title" content="Интелект — Юрист по авторским правам и интеллектуальной собственности" />
        <meta property="og:description" content="Защита авторских прав, регистрация товарных знаков, судебная защита. Опыт 10+ лет, 200+ выигранных дел. Консультация за 24 часа." />
        <meta property="og:image" content="https://cdn.poehali.dev/files/9f862400-252f-44a3-b612-fddd201cb3b6.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Интелект" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://intelect.pro/" />
        <meta name="twitter:title" content="Интелект — Юрист по авторским правам и ИС" />
        <meta name="twitter:description" content="Защита авторских прав, регистрация товарных знаков, судебная защита. Опыт 10+ лет." />
        <meta name="twitter:image" content="https://cdn.poehali.dev/files/9f862400-252f-44a3-b612-fddd201cb3b6.png" />
      </Helmet>
      
      <StructuredData type="Organization" />
      <StructuredData type="WebSite" />
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-professional-50 relative overflow-hidden">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Большие круги с анимацией */}
        <div className="absolute top-20 -right-32 w-64 h-64 bg-white/70 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-96 -left-24 w-48 h-48 bg-professional-200/70 rounded-full blur-2xl" style={{
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="absolute bottom-32 right-24 w-56 h-56 bg-blue-200/70 rounded-full blur-3xl" style={{
          animation: 'float-reverse 8s ease-in-out infinite'
        }}></div>
        
        {/* Геометрические фигуры с вращением */}
        <div className="absolute top-64 right-1/4 w-32 h-32 bg-gradient-to-br from-professional-100/70 to-blue-100/70 rotate-45 blur-xl" style={{
          animation: 'rotate-slow 20s linear infinite'
        }}></div>
        <div className="absolute bottom-64 left-1/3 w-24 h-24 bg-gradient-to-tr from-blue-200/70 to-professional-200/70 rotate-12 blur-lg" style={{
          animation: 'rotate-slow-reverse 15s linear infinite'
        }}></div>
        
        {/* Тонкие линии с пульсацией */}
        <div className="absolute top-40 left-0 w-full h-px bg-gradient-to-r from-transparent via-professional-200/70 to-transparent" style={{
          animation: 'fade-pulse 4s ease-in-out infinite'
        }}></div>
        <div className="absolute bottom-40 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/70 to-transparent" style={{
          animation: 'fade-pulse 4s ease-in-out infinite 2s'
        }}></div>
        
        {/* Точечный паттерн с дыханием */}
        <div className="absolute top-0 left-0 w-full h-full opacity-70" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          animation: 'breathe 10s ease-in-out infinite'
        }}></div>
      </div>
      
      {/* Контент страницы */}
      <div className="relative z-10">
        <Header onContactClick={() => openModal('consultation', 'Связаться с юристом')} />
        <HeroSection onModalOpen={openModal} />
        <ServicesSection onModalOpen={openModal} />
        <CasesSection />
        <WhyMeSection />
        <FAQSection />
        <FormSection />
        <Footer onContactClick={() => openModal('consultation', 'Связаться в Telegram')} />
        
        <ContactModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          service={modalState.service}
          title={modalState.title}
        />
        
        {/* ИИ Агент */}
        <AIAgent />
      </div>
      </div>
    </>
  );
}