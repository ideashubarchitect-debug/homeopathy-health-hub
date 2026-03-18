import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MethodSection from "@/components/MethodSection";
import ConsultationSection from "@/components/ConsultationSection";
import ClinicSection from "@/components/ClinicSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MethodSection />
      <ConsultationSection />
      <ClinicSection />
      <Footer />
    </div>
  );
};

export default Index;
