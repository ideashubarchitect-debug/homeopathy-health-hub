const ClinicSection = () => {
  return (
    <section id="clinic" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-border pt-12">
          <div>
            <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              The Clinic
            </p>
            <address className="not-italic font-body text-xl mt-4 leading-relaxed text-foreground">
              602, Redstone Crescent NE
              <br />
              Calgary, AB T3N 1M3
            </address>
          </div>
          <div>
            <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Direct Line
            </p>
            <a
              href="tel:5879380600"
              className="font-display text-3xl lg:text-4xl text-foreground hover:text-primary transition-colors duration-200 block mt-4"
            >
              587-938-0600
            </a>
          </div>
        </div>

        <div className="mt-16 border border-border overflow-hidden">
          <iframe
            title="Naaz Homeo Wellness Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.5!2d-113.96!3d51.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDA5JzAwLjAiTiAxMTPCsDU3JzM2LjAiVw!5e0!3m2!1sen!2sca!4v1"
            className="w-full h-[300px] lg:h-[400px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default ClinicSection;
