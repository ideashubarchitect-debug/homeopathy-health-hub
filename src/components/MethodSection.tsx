import { Beaker, User, Leaf } from "lucide-react";

const methods = [
  {
    icon: Beaker,
    title: "The Similarity Principle",
    description:
      "A substance that produces symptoms in a healthy person can treat those same symptoms in a diseased person. This foundational law guides every prescription we write.",
  },
  {
    icon: User,
    title: "Individualized Treatment",
    description:
      "No two patients receive the same remedy. We analyze your complete symptom picture — physical, mental, and emotional — to find your precise constitutional match.",
  },
  {
    icon: Leaf,
    title: "Minimal Dose, Maximum Effect",
    description:
      "Homeopathic remedies are prepared through serial dilution and succussion, activating the substance's healing properties while eliminating toxicity.",
  },
];

const MethodSection = () => {
  return (
    <section id="method" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="mb-16">
          <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            The Method
          </p>
          <h2 className="font-display text-4xl lg:text-5xl tracking-[-0.02em] text-foreground max-w-2xl">
            A science of the individual, refined over two centuries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {methods.map((method) => (
            <div
              key={method.title}
              className="group p-8 border border-border bg-background hover:border-primary transition-all duration-[600ms] hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <method.icon className="w-6 h-6 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="font-display text-2xl mb-4 text-foreground">{method.title}</h3>
              <p className="font-body text-base leading-relaxed text-muted-foreground">
                {method.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
