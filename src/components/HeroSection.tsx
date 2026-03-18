import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
        {/* Text */}
        <div className="flex flex-col justify-center px-6 lg:px-16 py-20 lg:py-32">
          <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Naaz Homeo Wellness — Calgary
          </p>
          <h1
            className="font-display text-foreground leading-[1.05] mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.04em" }}
          >
            Healing, distilled.
            <br />
            <span className="text-primary">Personalized homeopathy</span> for the modern patient.
          </h1>
          <p className="font-body text-lg leading-relaxed text-muted-foreground max-w-lg mb-10">
            We combine the 200-year science of homeopathy with modern telehealth to deliver precise, individualized care — whether you visit our Calgary clinic or consult from home.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#consultation"
              className="px-8 py-4 bg-foreground text-background text-sm font-body font-medium tracking-wide border border-foreground hover:bg-primary hover:border-primary transition-all duration-200"
            >
              Online Consultation
            </a>
            <a
              href="#clinic"
              className="px-8 py-4 bg-transparent text-foreground text-sm font-body font-medium tracking-wide border border-foreground/20 hover:border-foreground transition-all duration-200"
            >
              Visit Calgary Clinic
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={heroImage}
            alt="Homeopathic remedies and mortar with herbs"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/20" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
