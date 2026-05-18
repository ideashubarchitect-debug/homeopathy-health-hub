import { Check } from "lucide-react";
import BookingDialog from "./BookingDialog";

type ConsultationType = "acute-initial" | "acute-followup" | "chronic-initial" | "chronic-followup";

const tiers: Array<{
  name: string;
  price: number;
  duration: string;
  description: string;
  includes: string[];
  featured: boolean;
  type: ConsultationType;
}> = [
  {
    name: "Initial Acute Case",
    price: 60,
    duration: "30 minutes",
    description: "For recent or short-term complaints needing prompt care.",
    includes: [
      "Patient background",
      "Behavioral assessment",
      "Case profiling",
      "Medical history review",
      "Environmental factor analysis",
      "Remedy prescription",
    ],
    featured: false,
    type: "acute-initial",
  },
  {
    name: "Acute Follow-up",
    price: 45,
    duration: "15–20 minutes",
    description: "Review progress and refine the prescribed remedy.",
    includes: [
      "Symptom review",
      "Response assessment",
      "Remedy adjustment",
    ],
    featured: false,
    type: "acute-followup",
  },
  {
    name: "Chronic Case Initial",
    price: 120,
    duration: "60 minutes",
    description: "In-depth consultation for long-standing or complex conditions.",
    includes: [
      "Patient background",
      "Behavioral assessment",
      "In-depth disease history",
      "Medical records review",
      "Physical, emotional & behavioral profiling",
      "Lifestyle & environmental analysis",
      "Remedy prescription",
    ],
    featured: true,
    type: "chronic-initial",
  },
  {
    name: "Chronic Follow-up",
    price: 90,
    duration: "30 minutes",
    description: "Ongoing support and remedy refinement for chronic care.",
    includes: [
      "Detailed symptom review",
      "Constitutional reassessment",
      "Treatment plan update",
    ],
    featured: false,
    type: "chronic-followup",
  },
];

const hours = [
  { day: "Monday – Friday", time: "10:00 AM – 6:00 PM" },
  { day: "Saturday", time: "10:00 AM – 2:00 PM" },
  { day: "Sunday", time: "Closed" },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 lg:py-40 bg-background">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-3xl mb-16">
          <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Consultations & Pricing
          </p>
          <h2 className="font-display text-4xl lg:text-5xl tracking-[-0.02em] text-foreground mb-6">
            Transparent care, thoughtfully priced
          </h2>
          <p className="font-body text-lg leading-relaxed text-muted-foreground">
            Choose the consultation that matches your needs. All sessions are conducted online
            and include personalized remedy prescription.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col p-8 ${tier.featured ? "bg-foreground text-primary-foreground" : "bg-background text-foreground"}`}
            >
              <div className="mb-6">
                <p className={`font-mono-ui text-xs uppercase tracking-[0.15em] mb-3 ${tier.featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {tier.duration}
                </p>
                <h3 className="font-display text-2xl mb-3 leading-tight">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-display text-5xl">${tier.price}</span>
                  <span className={`font-mono-ui text-xs ${tier.featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    CAD
                  </span>
                </div>
                <p className={`font-body text-sm leading-relaxed ${tier.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-2 mb-8 flex-1">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className={`w-3.5 h-3.5 mt-1 flex-shrink-0 ${tier.featured ? "text-secondary" : "text-primary"}`} />
                    <span className={`font-body text-sm ${tier.featured ? "text-primary-foreground/85" : "text-foreground/80"}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <BookingDialog defaultConsultationType={tier.type}>
                <button
                  type="button"
                  className={`text-center px-5 py-3 text-sm font-body font-medium tracking-wide border transition-all duration-200 ${
                    tier.featured
                      ? "bg-primary-foreground text-foreground border-primary-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                      : "bg-foreground text-primary-foreground border-foreground hover:bg-primary hover:border-primary"
                  }`}
                >
                  Book this consultation
                </button>
              </BookingDialog>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start border-t border-border pt-12">
          <div>
            <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Availability
            </p>
            <h3 className="font-display text-3xl text-foreground mb-6">Clinic hours</h3>
            <p className="font-body text-muted-foreground mb-6">
              All times shown in Mountain Time (Calgary, AB).
            </p>
          </div>
          <dl className="divide-y divide-border border-t border-b border-border">
            {hours.map((h) => (
              <div key={h.day} className="flex items-center justify-between py-4">
                <dt className="font-body text-foreground">{h.day}</dt>
                <dd className="font-mono-ui text-sm text-muted-foreground">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
