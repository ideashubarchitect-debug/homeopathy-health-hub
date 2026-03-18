import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Legal
          </p>
          <h1 className="font-display text-4xl lg:text-5xl tracking-[-0.02em] text-foreground mb-12">
            Privacy Policy
          </h1>

          <div className="space-y-10 font-body text-base leading-relaxed text-muted-foreground">
            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Information We Collect</h2>
              <p>When you book a consultation or contact us, we may collect personal information including your name, email address, phone number, and health-related details you share. We collect this information to provide homeopathic care and schedule appointments.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">How We Use Your Information</h2>
              <p>Your information is used solely to provide homeopathic consultation services, schedule appointments, communicate with you about your care, and improve our services. We do not sell, trade, or share your personal information with third parties except as required by law.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Third-Party Services</h2>
              <p>We use Calendly for appointment scheduling. When you book through Calendly, their privacy policy applies to the information you provide on their platform. We encourage you to review Calendly's privacy policy.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at 587-938-0600 or visit our clinic at 602 Redstone Crescent NE, Calgary, AB T3N 1M3.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated effective date.</p>
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

export default PrivacyPolicy;
