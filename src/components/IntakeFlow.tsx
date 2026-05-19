import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = "64U6o10aTo7ZEkQWd";
const EMAILJS_SERVICE_ID = "service_b68qqai";
const EMAILJS_TEMPLATE_ID = "template_fwhdtlu";
const PRACTITIONER_EMAIL = "naazhomeowellness@gmail.com";

const MODALITY_ROWS = [
  "Temperature", "Weather / Season", "Time of Day", "Motion / Rest", "Position",
  "Eating / Drinking", "Pressure / Touch", "Open Air", "Clothing / Covering",
  "Emotional Factors", "Company / Solitude", "Menstruation (if applicable)", "Other",
];

type Modality = { better: string; worse: string };
type Modalities = Record<string, Modality>;

const initialModalities: Modalities = Object.fromEntries(
  MODALITY_ROWS.map((m) => [m, { better: "", worse: "" }])
);

const schema = z.object({
  fullName: z.string().trim().min(1, "Required").max(120),
  dateOfBirth: z.string().trim().max(20).optional().or(z.literal("")),
  age: z.string().trim().max(3).optional().or(z.literal("")),
  gender: z.string().trim().max(30).optional().or(z.literal("")),
  address: z.string().trim().max(300).optional().or(z.literal("")),
  phone: z.string().trim().min(7, "Valid phone required").max(30),
  email: z.string().trim().email("Valid email required").max(255),
  occupation: z.string().trim().max(100).optional().or(z.literal("")),
  maritalStatus: z.string().trim().max(50).optional().or(z.literal("")),
  emergencyContact: z.string().trim().max(200).optional().or(z.literal("")),
  referredBy: z.string().trim().max(150).optional().or(z.literal("")),

  mainComplaint: z.string().trim().min(5, "Please describe your main complaint").max(2000),
  complaintDuration: z.string().trim().max(100).optional().or(z.literal("")),
  complaintOnset: z.string().trim().max(100).optional().or(z.literal("")),
  complaintLocation: z.string().trim().max(500).optional().or(z.literal("")),
  complaintSensation: z.string().trim().max(500).optional().or(z.literal("")),
  complaintCausation: z.string().trim().max(500).optional().or(z.literal("")),
  complaintIntensity: z.string().trim().max(10).optional().or(z.literal("")),
  complaintFrequency: z.string().trim().max(100).optional().or(z.literal("")),
  complaintAssociated: z.string().trim().max(1000).optional().or(z.literal("")),
  complaintTreatmentTried: z.string().trim().max(1000).optional().or(z.literal("")),

  previousIllnesses: z.string().trim().max(2000).optional().or(z.literal("")),
  childhoodDiseases: z.string().trim().max(500).optional().or(z.literal("")),
  currentMedications: z.string().trim().max(1000).optional().or(z.literal("")),
  knownAllergies: z.string().trim().max(500).optional().or(z.literal("")),
  familyHistory: z.string().trim().max(1000).optional().or(z.literal("")),

  modalityNotes: z.string().trim().max(1000).optional().or(z.literal("")),

  fearsPhobias: z.string().trim().max(500).optional().or(z.literal("")),
  anxietyTriggers: z.string().trim().max(500).optional().or(z.literal("")),
  sleepQuality: z.string().trim().max(500).optional().or(z.literal("")),
  appetite: z.string().trim().max(200).optional().or(z.literal("")),
  thirst: z.string().trim().max(200).optional().or(z.literal("")),
  foodCravings: z.string().trim().max(500).optional().or(z.literal("")),
  perspiration: z.string().trim().max(500).optional().or(z.literal("")),

  consultationType: z.enum(["acute-initial", "acute-followup", "chronic-initial", "chronic-followup"]),
  consentGiven: z.literal(true, { errorMap: () => ({ message: "Consent is required to proceed" }) }),
  researchOptOut: z.boolean(),
  patientSignature: z.string().trim().min(2, "Type your full name as signature").max(120),
});

type FormState = z.input<typeof schema>;

const blank: FormState = {
  fullName: "", dateOfBirth: "", age: "", gender: "", address: "", phone: "", email: "",
  occupation: "", maritalStatus: "", emergencyContact: "", referredBy: "",
  mainComplaint: "", complaintDuration: "", complaintOnset: "", complaintLocation: "",
  complaintSensation: "", complaintCausation: "", complaintIntensity: "", complaintFrequency: "",
  complaintAssociated: "", complaintTreatmentTried: "",
  previousIllnesses: "", childhoodDiseases: "", currentMedications: "", knownAllergies: "", familyHistory: "",
  modalityNotes: "",
  fearsPhobias: "", anxietyTriggers: "", sleepQuality: "", appetite: "", thirst: "", foodCravings: "", perspiration: "",
  consultationType: "acute-initial",
  consentGiven: false as unknown as true,
  researchOptOut: false,
  patientSignature: "",
};

const CALENDLY_URL = "https://calendly.com/naazhomeowellness/30min";

const labelCls = "block font-mono-ui text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2";
const field =
  "w-full bg-background border border-border px-3 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/60 focus:outline-none transition-colors";

const Field = ({ id, lbl, err, children }: { id: string; lbl: string; err?: string; children: React.ReactNode }) => (
  <div>
    <label htmlFor={id} className={labelCls}>{lbl}</label>
    {children}
    {err && <p className="text-destructive text-xs mt-1">{err}</p>}
  </div>
);

interface IntakeFlowProps {
  onCancel?: () => void;
  cancelLabel?: string;
  defaultConsultationType?: FormState["consultationType"];
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

const IntakeFlow = ({ onCancel, cancelLabel = "Cancel", defaultConsultationType, scrollContainerRef }: IntakeFlowProps) => {
  const [form, setForm] = useState<FormState>({
    ...blank,
    consultationType: defaultConsultationType ?? blank.consultationType,
  });
  const [modalities, setModalities] = useState<Modalities>(initialModalities);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const updateModality = (row: string, key: "better" | "worse", value: string) =>
    setModalities((p) => ({ ...p, [row]: { ...p[row], [key]: value.slice(0, 200) } }));

  const scrollTop = () => {
    if (scrollContainerRef?.current) scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      toast.error("Please review the highlighted fields.");
      scrollTop();
      return;
    }
    setErrors({});
    setSubmitting(true);

    const d = result.data;

    try {
      const sharedParams = {
        patient_name: d.fullName,
        patient_email: d.email,
        patient_phone: d.phone,
        consultation_type: d.consultationType,
        main_complaint: d.mainComplaint,
      };
      // Confirmation to patient
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { ...sharedParams, to_email: d.email, to_name: d.fullName, reply_to: PRACTITIONER_EMAIL },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      // Notification to practitioner
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { ...sharedParams, to_email: PRACTITIONER_EMAIL, to_name: "Geeta", reply_to: d.email },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
    } catch (err) {
      console.warn("EmailJS dispatch failed:", err);
    }

    setSubmitting(false);
    setSubmitted(true);
    toast.success("Intake submitted. Please book your consultation slot.");
    scrollTop();
  };

  if (submitted) {
    return (
      <div>
        <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Step 2 of 2
        </p>
        <h2 className="font-display text-3xl lg:text-4xl tracking-[-0.02em] text-foreground mb-4">
          Thank you — now book your meeting
        </h2>
        <p className="font-body text-base text-muted-foreground mb-8">
          Your intake form has been securely submitted. A copy has been sent to your
          email and to Geeta. Please select a time that works for you below.
        </p>

        <div className="border border-border bg-background overflow-hidden" style={{ height: 640 }}>
          <iframe
            src={`${CALENDLY_URL}?hide_gdpr_banner=1`}
            title="Book your consultation"
            width="100%"
            height="100%"
            style={{ border: 0 }}
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 bg-foreground text-primary-foreground text-sm font-body font-medium tracking-wide hover:bg-primary transition-all text-center">
            Open Calendly in a new tab
          </a>
          {onCancel && (
            <button onClick={onCancel} type="button"
              className="px-6 py-3 border border-border text-foreground text-sm font-body font-medium tracking-wide hover:border-foreground/60 transition-all">
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div>
        <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Step 1 of 2 — Patient Intake & Consent
        </p>
        <h2 className="font-display text-3xl lg:text-4xl tracking-[-0.02em] text-foreground mb-3">
          Homeopathic intake & consent
        </h2>
        <p className="font-body text-base text-muted-foreground">
          Confidential — for professional use only. After submitting, you'll be taken
          straight to booking your consultation in this same window.
        </p>
      </div>

      {/* SECTION 1 */}
      <section className="space-y-5">
        <h3 className="font-display text-xl text-foreground border-b border-border pb-3">1. Patient Information</h3>
        <div className="grid md:grid-cols-2 gap-5">
          <Field id="fullName" lbl="Full Name *" err={errors.fullName}>
            <input id="fullName" className={field} maxLength={120} value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)} />
          </Field>
          <Field id="dateOfBirth" lbl="Date of Birth">
            <input id="dateOfBirth" type="date" className={field}
              value={form.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field id="age" lbl="Age">
              <input id="age" className={field} maxLength={3} value={form.age}
                onChange={(e) => set("age", e.target.value)} />
            </Field>
            <Field id="gender" lbl="Gender">
              <input id="gender" className={field} maxLength={30} value={form.gender}
                onChange={(e) => set("gender", e.target.value)} />
            </Field>
          </div>
          <Field id="maritalStatus" lbl="Marital Status">
            <input id="maritalStatus" className={field} maxLength={50} value={form.maritalStatus}
              onChange={(e) => set("maritalStatus", e.target.value)} />
          </Field>
          <div className="md:col-span-2">
            <Field id="address" lbl="Address">
              <input id="address" className={field} maxLength={300} value={form.address}
                onChange={(e) => set("address", e.target.value)} />
            </Field>
          </div>
          <Field id="phone" lbl="Phone *" err={errors.phone}>
            <input id="phone" type="tel" className={field} maxLength={30} value={form.phone}
              onChange={(e) => set("phone", e.target.value)} />
          </Field>
          <Field id="email" lbl="Email *" err={errors.email}>
            <input id="email" type="email" className={field} maxLength={255} value={form.email}
              onChange={(e) => set("email", e.target.value)} />
          </Field>
          <Field id="occupation" lbl="Occupation">
            <input id="occupation" className={field} maxLength={100} value={form.occupation}
              onChange={(e) => set("occupation", e.target.value)} />
          </Field>
          <Field id="referredBy" lbl="Referred By">
            <input id="referredBy" className={field} maxLength={150} value={form.referredBy}
              onChange={(e) => set("referredBy", e.target.value)} />
          </Field>
          <div className="md:col-span-2">
            <Field id="emergencyContact" lbl="Emergency Contact & Relation">
              <input id="emergencyContact" className={field} maxLength={200} value={form.emergencyContact}
                onChange={(e) => set("emergencyContact", e.target.value)} />
            </Field>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="space-y-5">
        <h3 className="font-display text-xl text-foreground border-b border-border pb-3">2. Chief Complaint</h3>
        <Field id="mainComplaint" lbl="Main Complaint(s) *" err={errors.mainComplaint}>
          <textarea id="mainComplaint" rows={3} className={field} maxLength={2000}
            value={form.mainComplaint} onChange={(e) => set("mainComplaint", e.target.value)} />
        </Field>
        <div className="grid md:grid-cols-2 gap-5">
          <Field id="complaintDuration" lbl="Duration">
            <input id="complaintDuration" className={field} maxLength={100} value={form.complaintDuration}
              onChange={(e) => set("complaintDuration", e.target.value)} />
          </Field>
          <Field id="complaintOnset" lbl="Onset (sudden / gradual)">
            <input id="complaintOnset" className={field} maxLength={100} value={form.complaintOnset}
              onChange={(e) => set("complaintOnset", e.target.value)} />
          </Field>
        </div>
        <Field id="complaintLocation" lbl="Location & Radiation">
          <input id="complaintLocation" className={field} maxLength={500} value={form.complaintLocation}
            onChange={(e) => set("complaintLocation", e.target.value)} />
        </Field>
        <Field id="complaintSensation" lbl="Sensation & Character (aching, burning, sharp…)">
          <input id="complaintSensation" className={field} maxLength={500} value={form.complaintSensation}
            onChange={(e) => set("complaintSensation", e.target.value)} />
        </Field>
        <Field id="complaintCausation" lbl="Causation (what started it?)">
          <input id="complaintCausation" className={field} maxLength={500} value={form.complaintCausation}
            onChange={(e) => set("complaintCausation", e.target.value)} />
        </Field>
        <div className="grid md:grid-cols-2 gap-5">
          <Field id="complaintIntensity" lbl="Intensity (0–10)">
            <input id="complaintIntensity" className={field} maxLength={10} value={form.complaintIntensity}
              onChange={(e) => set("complaintIntensity", e.target.value)} />
          </Field>
          <Field id="complaintFrequency" lbl="Frequency">
            <input id="complaintFrequency" className={field} maxLength={100} value={form.complaintFrequency}
              onChange={(e) => set("complaintFrequency", e.target.value)} />
          </Field>
        </div>
        <Field id="complaintAssociated" lbl="Associated Symptoms">
          <textarea id="complaintAssociated" rows={2} className={field} maxLength={1000}
            value={form.complaintAssociated} onChange={(e) => set("complaintAssociated", e.target.value)} />
        </Field>
        <Field id="complaintTreatmentTried" lbl="Treatment Tried So Far">
          <textarea id="complaintTreatmentTried" rows={2} className={field} maxLength={1000}
            value={form.complaintTreatmentTried} onChange={(e) => set("complaintTreatmentTried", e.target.value)} />
        </Field>
      </section>

      {/* SECTION 3 */}
      <section className="space-y-5">
        <h3 className="font-display text-xl text-foreground border-b border-border pb-3">3. Past Complaints & Medical History</h3>
        <Field id="previousIllnesses" lbl="Previous Illnesses / Surgeries / Injuries">
          <textarea id="previousIllnesses" rows={2} className={field} maxLength={2000}
            value={form.previousIllnesses} onChange={(e) => set("previousIllnesses", e.target.value)} />
        </Field>
        <Field id="childhoodDiseases" lbl="Childhood Diseases (measles, chickenpox, etc.)">
          <input id="childhoodDiseases" className={field} maxLength={500} value={form.childhoodDiseases}
            onChange={(e) => set("childhoodDiseases", e.target.value)} />
        </Field>
        <Field id="currentMedications" lbl="Current Medications / Supplements">
          <textarea id="currentMedications" rows={2} className={field} maxLength={1000}
            value={form.currentMedications} onChange={(e) => set("currentMedications", e.target.value)} />
        </Field>
        <Field id="knownAllergies" lbl="Known Allergies">
          <input id="knownAllergies" className={field} maxLength={500} value={form.knownAllergies}
            onChange={(e) => set("knownAllergies", e.target.value)} />
        </Field>
        <Field id="familyHistory" lbl="Family Medical History (parents / siblings)">
          <textarea id="familyHistory" rows={2} className={field} maxLength={1000}
            value={form.familyHistory} onChange={(e) => set("familyHistory", e.target.value)} />
        </Field>
      </section>

      {/* SECTION 4 */}
      <section className="space-y-5">
        <h3 className="font-display text-xl text-foreground border-b border-border pb-3">4. Modalities</h3>
        <p className="font-body text-sm text-muted-foreground">
          Indicate what makes your complaints <span className="text-foreground">better</span> or
          <span className="text-foreground"> worse</span>. Leave blank if not applicable.
        </p>
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left font-mono-ui text-[10px] uppercase tracking-[0.15em] text-muted-foreground p-3">Modality</th>
                <th className="text-left font-mono-ui text-[10px] uppercase tracking-[0.15em] text-muted-foreground p-3">Better</th>
                <th className="text-left font-mono-ui text-[10px] uppercase tracking-[0.15em] text-muted-foreground p-3">Worse</th>
              </tr>
            </thead>
            <tbody>
              {MODALITY_ROWS.map((row) => (
                <tr key={row} className="border-t border-border">
                  <td className="p-3 font-body text-foreground whitespace-nowrap">{row}</td>
                  <td className="p-2">
                    <input className="w-full bg-transparent border border-transparent hover:border-border focus:border-foreground/60 px-2 py-1.5 text-sm focus:outline-none"
                      value={modalities[row].better} maxLength={200}
                      onChange={(e) => updateModality(row, "better", e.target.value)} />
                  </td>
                  <td className="p-2">
                    <input className="w-full bg-transparent border border-transparent hover:border-border focus:border-foreground/60 px-2 py-1.5 text-sm focus:outline-none"
                      value={modalities[row].worse} maxLength={200}
                      onChange={(e) => updateModality(row, "worse", e.target.value)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Field id="modalityNotes" lbl="Additional Modality Notes">
          <textarea id="modalityNotes" rows={2} className={field} maxLength={1000}
            value={form.modalityNotes} onChange={(e) => set("modalityNotes", e.target.value)} />
        </Field>
      </section>

      {/* SECTION 5 */}
      <section className="space-y-5">
        <h3 className="font-display text-xl text-foreground border-b border-border pb-3">5. Mental & Emotional State</h3>
        <Field id="fearsPhobias" lbl="Fears / Phobias">
          <input id="fearsPhobias" className={field} maxLength={500} value={form.fearsPhobias}
            onChange={(e) => set("fearsPhobias", e.target.value)} />
        </Field>
        <Field id="anxietyTriggers" lbl="Anxiety / Stress Triggers">
          <input id="anxietyTriggers" className={field} maxLength={500} value={form.anxietyTriggers}
            onChange={(e) => set("anxietyTriggers", e.target.value)} />
        </Field>
        <Field id="sleepQuality" lbl="Sleep — Quality & Dreams">
          <input id="sleepQuality" className={field} maxLength={500} value={form.sleepQuality}
            onChange={(e) => set("sleepQuality", e.target.value)} />
        </Field>
        <div className="grid md:grid-cols-2 gap-5">
          <Field id="appetite" lbl="Appetite">
            <input id="appetite" className={field} maxLength={200} value={form.appetite}
              onChange={(e) => set("appetite", e.target.value)} />
          </Field>
          <Field id="thirst" lbl="Thirst">
            <input id="thirst" className={field} maxLength={200} value={form.thirst}
              onChange={(e) => set("thirst", e.target.value)} />
          </Field>
        </div>
        <Field id="foodCravings" lbl="Food Cravings / Aversions">
          <input id="foodCravings" className={field} maxLength={500} value={form.foodCravings}
            onChange={(e) => set("foodCravings", e.target.value)} />
        </Field>
        <Field id="perspiration" lbl="Perspiration — Where / When / Odour">
          <input id="perspiration" className={field} maxLength={500} value={form.perspiration}
            onChange={(e) => set("perspiration", e.target.value)} />
        </Field>
      </section>

      {/* Consultation type */}
      <section className="space-y-5">
        <h3 className="font-display text-xl text-foreground border-b border-border pb-3">Consultation Type</h3>
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
                onChange={(e) => set("consultationType", e.target.value as FormState["consultationType"])}
                className="accent-foreground" />
              <span className="font-body text-sm text-foreground">{o.l}</span>
            </label>
          ))}
        </div>
      </section>

      {/* SECTION 6: CONSENT */}
      <section className="space-y-5">
        <h3 className="font-display text-xl text-foreground border-b border-border pb-3">6. Informed Consent</h3>
        <div className="border border-border p-6 bg-muted/30 space-y-3 font-body text-sm text-foreground/85 leading-relaxed">
          <p>By checking the box below, I confirm that:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>I understand that Geeta is a certified homeopath. I acknowledge that it is my responsibility to seek medical diagnosis and advice for my present and future conditions. I am exercising my right to choose an alternative method of treatment to address my total health.</li>
            <li>The information provided on this form is accurate and complete to the best of my knowledge.</li>
            <li>Homeopathic treatment is not a substitute for emergency medical care or conventional diagnosis when required.</li>
            <li>I consent to a holistic case-taking interview which may include questions about physical, mental, and emotional health.</li>
            <li>I understand that an initial aggravation (temporary worsening of symptoms) may occasionally occur as part of the healing response.</li>
            <li>I agree to inform my homeopath of any changes in my condition, medications, or health status.</li>
            <li>I may withdraw from treatment at any time without penalty.</li>
          </ul>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={!!form.consentGiven}
            onChange={(e) => set("consentGiven", e.target.checked as unknown as true)}
            className="mt-1 accent-foreground w-4 h-4" />
          <span className="font-body text-sm text-foreground">
            I have read and agree to the informed consent above. *
          </span>
        </label>
        {errors.consentGiven && <p className="text-destructive text-xs">{errors.consentGiven}</p>}

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={form.researchOptOut}
            onChange={(e) => set("researchOptOut", e.target.checked)}
            className="mt-1 accent-foreground w-4 h-4" />
          <span className="font-body text-sm text-muted-foreground">
            Opt out of use of my anonymised case details for educational or research purposes.
          </span>
        </label>

        <div className="grid md:grid-cols-2 gap-5 pt-2">
          <Field id="patientSignature" lbl="Patient / Guardian Signature (type full name) *" err={errors.patientSignature}>
            <input id="patientSignature" className={field} maxLength={120}
              value={form.patientSignature} onChange={(e) => set("patientSignature", e.target.value)} />
          </Field>
          <div>
            <span className={labelCls}>Date</span>
            <p className="font-body text-foreground py-2.5">{new Date().toLocaleDateString("en-CA")}</p>
          </div>
        </div>
      </section>

      <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3">
        <button type="submit" disabled={submitting}
          className="px-8 py-4 bg-foreground text-primary-foreground text-sm font-body font-medium tracking-wide hover:bg-primary transition-all disabled:opacity-50">
          {submitting ? "Submitting…" : "Submit & continue to booking"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}
            className="px-8 py-4 border border-border text-foreground text-sm font-body font-medium tracking-wide text-center hover:border-foreground/60 transition-all">
            {cancelLabel}
          </button>
        )}
      </div>
    </form>
  );
};

export default IntakeFlow;
