import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Legal
          </p>
          <h1 className="font-display text-4xl lg:text-5xl tracking-[-0.02em] text-foreground mb-12">
            Terms of Service
          </h1>

          <div className="space-y-10 font-body text-base leading-relaxed text-muted-foreground">
            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Services</h2>
              <p>Naaz Homeo Wellness provides homeopathic consultation services both online and in-person at our Calgary clinic. Our services are intended for informational and therapeutic purposes based on homeopathic principles and should not replace conventional medical advice when needed.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Appointments</h2>
              <p>Consultations are booked through our Calendly scheduling system. Cancellations or rescheduling should be made at least 24 hours in advance. Repeated no-shows may result in a requirement to prepay for future appointments.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Patient Responsibilities</h2>
              <p>Patients are responsible for providing accurate health information during consultations. You should inform your homeopath of any conventional medications or treatments you are currently receiving.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Limitation of Liability</h2>
              <p>Naaz Homeo Wellness and its practitioners shall not be held liable for any adverse effects resulting from the use of homeopathic remedies. Homeopathy is a complementary approach and patients should consult conventional medical practitioners for emergency or serious conditions.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Contact</h2>
              <p>For questions about these terms, contact us at 587-938-0600 or visit us at 602 Redstone Crescent NE, Calgary, AB T3N 1M3.</p>
            </div>

            <p className="text-sm text-muted-foreground/60 pt-6 border-t border-border">
              Last updated: March 2026
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TermsOfService;
