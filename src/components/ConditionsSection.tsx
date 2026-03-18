import {
  Stethoscope, Flower2, Brain, Baby, HeartPulse, Pill,
  Droplets, Eye, Bone, ShieldCheck, Salad, Wind
} from "lucide-react";

const conditions = [
  { icon: Flower2, name: "Skin Disorders", desc: "Eczema, psoriasis, acne, and chronic dermatitis" },
  { icon: Wind, name: "Allergies & Asthma", desc: "Seasonal allergies, hay fever, and respiratory conditions" },
  { icon: Salad, name: "Digestive Issues", desc: "IBS, acid reflux, bloating, and food sensitivities" },
  { icon: Brain, name: "Anxiety & Stress", desc: "Anxiety, insomnia, depression, and emotional imbalances" },
  { icon: Baby, name: "Pediatric Care", desc: "Teething, colic, ear infections, and childhood ailments" },
  { icon: HeartPulse, name: "Chronic Fatigue", desc: "Low energy, thyroid imbalance, and hormonal issues" },
  { icon: Bone, name: "Joint & Muscle Pain", desc: "Arthritis, back pain, sciatica, and inflammation" },
  { icon: ShieldCheck, name: "Immunity Support", desc: "Recurrent infections, autoimmune conditions, and prevention" },
  { icon: Droplets, name: "Hormonal Balance", desc: "PCOS, menstrual irregularities, and menopausal symptoms" },
  { icon: Eye, name: "Eye Conditions", desc: "Conjunctivitis, dry eyes, and recurrent styes" },
  { icon: Pill, name: "Migraines & Headaches", desc: "Chronic headaches, cluster migraines, and tension pain" },
  { icon: Stethoscope, name: "Respiratory Health", desc: "Sinusitis, bronchitis, tonsillitis, and nasal polyps" },
];

const ConditionsSection = () => {
  return (
    <section id="conditions" className="py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="mb-16 text-center">
          <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            What We Treat
          </p>
          <h2 className="font-display text-4xl lg:text-5xl tracking-[-0.02em] text-foreground max-w-2xl mx-auto">
            Conditions we commonly address
          </h2>
          <p className="font-body text-lg text-muted-foreground mt-4 max-w-xl mx-auto">
            Homeopathy treats the whole person, not just isolated symptoms. Here are some of the conditions our patients seek help for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {conditions.map((c) => (
            <div
              key={c.name}
              className="group p-6 bg-card border border-border hover:border-primary hover:-translate-y-1 transition-all duration-500"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <c.icon className="w-5 h-5 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="font-display text-lg mb-1 text-foreground">{c.name}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConditionsSection;
