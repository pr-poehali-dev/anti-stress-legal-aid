import { useState } from 'react';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CasesSection from '@/components/sections/CasesSection';
import WhyMeSection from '@/components/sections/WhyMeSection';
import FAQSection from '@/components/sections/FAQSection';
import FormSection from '@/components/sections/FormSection';
import Footer from '@/components/sections/Footer';
import ContactModal from '@/components/ContactModal';

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-professional-50">
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
    </div>
  );
}