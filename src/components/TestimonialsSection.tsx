import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya S.",
    condition: "Chronic Eczema",
    quote: "After years of steroid creams, Dr. Naaz's homeopathic treatment cleared my eczema in three months. My skin hasn't looked this healthy in a decade.",
    rating: 5,
  },
  {
    name: "Ahmed K.",
    condition: "Seasonal Allergies",
    quote: "I used to dread spring. After constitutional treatment, I went through an entire allergy season without antihistamines for the first time in my life.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    condition: "Anxiety & Insomnia",
    quote: "The online consultation was incredibly thorough. The remedy prescribed helped me sleep naturally within two weeks. I feel like myself again.",
    rating: 5,
  },
  {
    name: "Rajesh T.",
    condition: "Digestive Issues",
    quote: "My IBS symptoms had controlled my life for five years. Homeopathic treatment addressed the root cause, and I can finally eat without fear.",
    rating: 5,
  },
  {
    name: "Maria L.",
    condition: "Pediatric Care",
    quote: "My daughter's recurrent ear infections stopped after starting homeopathic treatment. It's gentle, safe, and it truly works.",
    rating: 5,
  },
  {
    name: "David W.",
    condition: "Migraines",
    quote: "From 3-4 migraines a week to maybe one a month. The individualized approach made all the difference. Highly recommend Naaz Homeo Wellness.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="mb-16">
          <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Patient Stories
          </p>
          <h2 className="font-display text-4xl lg:text-5xl tracking-[-0.02em] text-foreground max-w-2xl">
            Real results, measured in restored vitality
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-8 bg-card border border-border hover:border-primary/40 transition-colors duration-300 flex flex-col"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="font-body text-base leading-relaxed text-foreground/80 mb-6 flex-1">
                "{t.quote}"
              </blockquote>
              <div className="border-t border-border pt-4">
                <p className="font-body font-medium text-sm text-foreground">{t.name}</p>
                <p className="font-mono-ui text-xs text-muted-foreground mt-0.5">{t.condition}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
