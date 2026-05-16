import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CALENDLY_URL = "https://calendly.com/naazhomeowellness/30min";

const intakeSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(7, "Valid phone number required").max(20),
  age: z.string().trim().max(3).optional(),
  gender: z.string().max(30).optional(),
  consultationType: z.enum(["acute-initial", "acute-followup", "chronic-initial", "chronic-followup"]),
  mainConcern: z.string().trim().min(10, "Please describe your main concern").max(1000),
  duration: z.string().trim().max(200).optional(),
  medicalHistory: z.string().trim().max(2000).optional(),
  currentMedications: z.string().trim().max(1000).optional(),
  allergies: z.string().trim().max(500).optional(),
  lifestyle: z.string().trim().max(1000).optional(),
  emotionalState: z.string().trim().max(1000).optional(),
  previousHomeopathy: z.string().trim().max(500).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
});

type IntakeForm = z.infer<typeof intakeSchema>;

const initial = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  consultationType: "acute-initial",
  mainConcern: "",
  duration: "",
  medicalHistory: "",
  currentMedications: "",
  allergies: "",
  lifestyle: "",
  emotionalState: "",
  previousHomeopathy: "",
  consent: false,
} as unknown as IntakeForm;

const fieldLabel = "block font-mono-ui text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2";
const fieldInput =
  "w-full bg-background border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/60 focus:outline-none transition-colors";

const IntakePage = () => {
  const [form, setForm] = useState<IntakeForm>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof IntakeForm, value: string | boolean) => {
    setForm((p) => ({ ...p, [key]: value as never }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = intakeSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      toast.error("Please review the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitting(true);

    const subject = `New Intake — ${result.data.fullName}`;
    const body = Object.entries(result.data)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    const mailto = `mailto:naazhomeowellness@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.location.href = mailto;
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Intake submitted. Please book your consultation slot next.");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
          <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Patient Intake Form
          </p>
          <h1 className="font-display text-4xl lg:text-5xl tracking-[-0.02em] text-foreground mb-6">
            Tell us about you
          </h1>
          <p className="font-body text-lg text-muted-foreground mb-12 max-w-2xl">
            Please complete this confidential intake form before your consultation. The more
            we know, the more precisely we can tailor your homeopathic care.
          </p>

          {submitted ? (
            <div className="border border-border p-10 text-center">
              <h2 className="font-display text-3xl text-foreground mb-4">Thank you</h2>
              <p className="font-body text-muted-foreground mb-8">
                Your intake has been prepared. Next, please book your consultation slot on Calendly.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-foreground text-primary-foreground text-sm font-body font-medium tracking-wide hover:bg-primary transition-all"
              >
                Book on Calendly
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <section className="space-y-5">
                <h2 className="font-display text-2xl text-foreground border-b border-border pb-3">
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className={fieldLabel}>Full Name *</label>
                    <input className={fieldInput} value={form.fullName} maxLength={100}
                      onChange={(e) => update("fullName", e.target.value)} />
                    {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className={fieldLabel}>Email *</label>
                    <input type="email" className={fieldInput} value={form.email} maxLength={255}
                      onChange={(e) => update("email", e.target.value)} />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className={fieldLabel}>Phone *</label>
                    <input type="tel" className={fieldInput} value={form.phone} maxLength={20}
                      onChange={(e) => update("phone", e.target.value)} />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={fieldLabel}>Age</label>
                      <input className={fieldInput} value={form.age} maxLength={3}
                        onChange={(e) => update("age", e.target.value)} />
                    </div>
                    <div>
                      <label className={fieldLabel}>Gender</label>
                      <input className={fieldInput} value={form.gender} maxLength={30}
                        onChange={(e) => update("gender", e.target.value)} />
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-5">
                <h2 className="font-display text-2xl text-foreground border-b border-border pb-3">
                  Consultation Type
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { v: "acute-initial", l: "Acute — Initial ($60 · 30 min)" },
                    { v: "acute-followup", l: "Acute — Follow-up ($45 · 15–20 min)" },
                    { v: "chronic-initial", l: "Chronic — Initial ($120 · 60 min)" },
                    { v: "chronic-followup", l: "Chronic — Follow-up ($90 · 30 min)" },
                  ].map((o) => (
                    <label key={o.v}
                      className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${form.consultationType === o.v ? "border-foreground bg-muted" : "border-border hover:border-foreground/40"}`}>
                      <input type="radio" name="consultationType" value={o.v}
                        checked={form.consultationType === o.v}
                        onChange={(e) => update("consultationType", e.target.value)}
                        className="accent-foreground" />
                      <span className="font-body text-sm text-foreground">{o.l}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="space-y-5">
                <h2 className="font-display text-2xl text-foreground border-b border-border pb-3">
                  Health Concern
                </h2>
                <div>
                  <label className={fieldLabel}>Main concern or reason for visit *</label>
                  <textarea rows={4} className={fieldInput} value={form.mainConcern} maxLength={1000}
                    onChange={(e) => update("mainConcern", e.target.value)} />
                  {errors.mainConcern && <p className="text-destructive text-xs mt-1">{errors.mainConcern}</p>}
                </div>
                <div>
                  <label className={fieldLabel}>How long have you had this concern?</label>
                  <input className={fieldInput} value={form.duration} maxLength={200}
                    onChange={(e) => update("duration", e.target.value)} />
                </div>
                <div>
                  <label className={fieldLabel}>Relevant medical history</label>
                  <textarea rows={3} className={fieldInput} value={form.medicalHistory} maxLength={2000}
                    onChange={(e) => update("medicalHistory", e.target.value)} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className={fieldLabel}>Current medications / supplements</label>
                    <textarea rows={3} className={fieldInput} value={form.currentMedications} maxLength={1000}
                      onChange={(e) => update("currentMedications", e.target.value)} />
                  </div>
                  <div>
                    <label className={fieldLabel}>Allergies</label>
                    <textarea rows={3} className={fieldInput} value={form.allergies} maxLength={500}
                      onChange={(e) => update("allergies", e.target.value)} />
                  </div>
                </div>
              </section>

              <section className="space-y-5">
                <h2 className="font-display text-2xl text-foreground border-b border-border pb-3">
                  Lifestyle & Emotional Wellbeing
                </h2>
                <div>
                  <label className={fieldLabel}>Lifestyle (sleep, diet, exercise, work)</label>
                  <textarea rows={3} className={fieldInput} value={form.lifestyle} maxLength={1000}
                    onChange={(e) => update("lifestyle", e.target.value)} />
                </div>
                <div>
                  <label className={fieldLabel}>Current emotional state or stressors</label>
                  <textarea rows={3} className={fieldInput} value={form.emotionalState} maxLength={1000}
                    onChange={(e) => update("emotionalState", e.target.value)} />
                </div>
                <div>
                  <label className={fieldLabel}>Previous homeopathic treatment (if any)</label>
                  <textarea rows={2} className={fieldInput} value={form.previousHomeopathy} maxLength={500}
                    onChange={(e) => update("previousHomeopathy", e.target.value)} />
                </div>
              </section>

              <div className="border-t border-border pt-6 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    className="mt-1 accent-foreground" />
                  <span className="font-body text-sm text-muted-foreground">
                    I consent to the collection of this information for the purpose of homeopathic
                    consultation and understand it will be kept confidential.
                  </span>
                </label>
                {errors.consent && <p className="text-destructive text-xs">{errors.consent}</p>}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button type="submit" disabled={submitting}
                    className="px-8 py-4 bg-foreground text-primary-foreground text-sm font-body font-medium tracking-wide hover:bg-primary transition-all disabled:opacity-50">
                    {submitting ? "Submitting…" : "Submit Intake Form"}
                  </button>
                  <Link to="/"
                    className="px-8 py-4 border border-border text-foreground text-sm font-body font-medium tracking-wide text-center hover:border-foreground/60 transition-all">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IntakePage;
