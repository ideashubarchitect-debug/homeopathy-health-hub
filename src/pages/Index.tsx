import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MethodSection from "@/components/MethodSection";
import ConditionsSection from "@/components/ConditionsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ConsultationSection from "@/components/ConsultationSection";
import ClinicSection from "@/components/ClinicSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MethodSection />
      <ConditionsSection />
      <TestimonialsSection />
      <ConsultationSection />
      <ClinicSection />
      <Footer />
    </div>
  );
};

export default Index;
