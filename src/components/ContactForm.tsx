import { useState } from "react";
import { toast } from "sonner";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    setSending(true);
    // Simulate submission
    setTimeout(() => {
      setSending(false);
      toast.success("Thank you! We'll contact you shortly to confirm your consultation.");
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Info */}
          <div className="flex flex-col justify-center">
            <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-primary-foreground/50 mb-4">
              Book a Consultation
            </p>
            <h2 className="font-display text-4xl lg:text-5xl tracking-[-0.02em] mb-6">
              Begin your path to balance
            </h2>
            <p className="font-body text-lg leading-relaxed text-primary-foreground/70 mb-8">
              Fill out the form and our team will reach out to schedule your personalized
              homeopathic consultation — online or in-person at our Calgary clinic.
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-primary-foreground/40 mb-1">Phone</p>
                <a href="tel:5879380600" className="font-display text-2xl text-primary-foreground hover:text-primary transition-colors">
                  587-938-0600
                </a>
              </div>
              <div>
                <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-primary-foreground/40 mb-1">Address</p>
                <address className="not-italic font-body text-primary-foreground/70">
                  602, Redstone Crescent NE<br />Calgary, AB T3N 1M3
                </address>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block font-mono-ui text-xs uppercase tracking-[0.15em] text-primary-foreground/50 mb-2">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={handleChange}
                className="w-full bg-transparent border border-primary-foreground/20 px-4 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/50 focus:outline-none transition-colors"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono-ui text-xs uppercase tracking-[0.15em] text-primary-foreground/50 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                maxLength={255}
                value={form.email}
                onChange={handleChange}
                className="w-full bg-transparent border border-primary-foreground/20 px-4 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/50 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block font-mono-ui text-xs uppercase tracking-[0.15em] text-primary-foreground/50 mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                maxLength={20}
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-transparent border border-primary-foreground/20 px-4 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/50 focus:outline-none transition-colors"
                placeholder="587-XXX-XXXX"
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-mono-ui text-xs uppercase tracking-[0.15em] text-primary-foreground/50 mb-2">
                Briefly Describe Your Concern
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={1000}
                value={form.message}
                onChange={handleChange}
                className="w-full bg-transparent border border-primary-foreground/20 px-4 py-3 font-body text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/50 focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your health concerns..."
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full px-8 py-4 bg-primary-foreground text-foreground text-sm font-body font-medium tracking-wide hover:bg-primary hover:text-primary-foreground border border-primary-foreground/20 transition-all duration-200 disabled:opacity-50"
            >
              {sending ? "Sending..." : "Request Consultation"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
