import { Video, FileText, Clock } from "lucide-react";

const steps = [
  { icon: FileText, label: "Complete Intake Form", desc: "Share your health history and current concerns" },
  { icon: Video, label: "Virtual Consultation", desc: "Meet with our homeopath via secure video call" },
  { icon: Clock, label: "Personalized Remedy", desc: "Receive your individualized treatment plan" },
];

const ConsultationSection = () => {
  return (
    <section id="consultation" className="py-24 lg:py-40 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-primary-foreground/50 mb-4">
              Online Consultation
            </p>
            <h2 className="font-display text-4xl lg:text-5xl tracking-[-0.02em] mb-6">
              Restore balance from anywhere
            </h2>
            <p className="font-body text-lg leading-relaxed text-primary-foreground/70 mb-10">
              Our online homeopathic consultations bring personalized care to your home.
              Whether you're managing a chronic condition or seeking preventive wellness,
              we provide thorough case analysis and precise constitutional prescribing.
            </p>
            <a
              href="tel:5879380600"
              className="inline-block px-8 py-4 bg-primary-foreground text-foreground text-sm font-body font-medium tracking-wide border border-primary-foreground/20 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              Schedule Consultation — 587-938-0600
            </a>
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div
                key={step.label}
                className="flex items-start gap-6 p-6 border border-primary-foreground/10 hover:border-primary-foreground/25 transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-10 h-10 border border-primary-foreground/20 flex-shrink-0">
                  <span className="font-mono-ui text-xs text-primary-foreground/50">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="font-display text-xl mb-1">{step.label}</h3>
                  <p className="font-body text-sm text-primary-foreground/60">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;
