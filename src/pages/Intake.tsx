import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntakeFlow from "@/components/IntakeFlow";

const IntakePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
          <IntakeFlow onCancel={() => navigate("/")} cancelLabel="Back to home" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IntakePage;
