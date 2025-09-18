import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CasesSection from '@/components/sections/CasesSection';
import WhyMeSection from '@/components/sections/WhyMeSection';
import FAQSection from '@/components/sections/FAQSection';
import FormSection from '@/components/sections/FormSection';
import Footer from '@/components/sections/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <HeroSection />
      <ServicesSection />
      <CasesSection />
      <WhyMeSection />
      <FAQSection />
      <FormSection />
      <Footer />
    </div>
  );
}