import { useState } from "react";
import { Menu, X } from "lucide-react";
import headerLogo from "@/assets/header-logo.jpeg";

const navLinks = [
  { href: "#method", label: "The Method" },
  { href: "#conditions", label: "Conditions" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#consultation", label: "Consultation" },
  { href: "#contact", label: "Contact" },
  { href: "#clinic", label: "Calgary Clinic" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3">
            <img src={headerLogo} alt="Naaz Homeo Wellness" className="h-10 lg:h-12" />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-body tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <span className="font-mono-ui text-xs text-muted-foreground">587-938-0600</span>
            <a
              href="#contact"
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-body font-medium tracking-wide hover:bg-foreground transition-all duration-200"
            >
              Book Online
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground" aria-label="Toggle menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block font-body text-base text-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border">
              <a href="tel:5879380600" className="block font-mono-ui text-sm text-muted-foreground mb-3">587-938-0600</a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-block px-6 py-3 bg-primary text-primary-foreground text-sm font-body font-medium tracking-wide"
              >
                Book Online
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
