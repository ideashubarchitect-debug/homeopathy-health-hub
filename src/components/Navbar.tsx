import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import headerLogo from "@/assets/header-logo.jpeg";

const navLinks = [
  { href: "#method", label: "The Method", isAnchor: true },
  { href: "#conditions", label: "Conditions", isAnchor: true },
  { href: "#testimonials", label: "Testimonials", isAnchor: true },
  { href: "/about", label: "Dr. Geeta", isAnchor: false },
  { href: "#clinic", label: "Calgary Clinic", isAnchor: true },
];

const CALENDLY_URL = "https://calendly.com/naazhomeowellness/30min";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={headerLogo} alt="Naaz Homeo Wellness" className="h-10 lg:h-12" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) =>
              l.isAnchor ? (
                <a key={l.href} href={l.href} className="text-sm font-body tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200">
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} to={l.href} className="text-sm font-body tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200">
                  {l.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <span className="font-mono-ui text-xs text-muted-foreground">587-938-0600</span>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-body font-medium tracking-wide hover:bg-accent transition-all duration-200"
            >
              Book Online
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground" aria-label="Toggle menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((l) =>
              l.isAnchor ? (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block font-body text-base text-foreground hover:text-primary transition-colors">
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="block font-body text-base text-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              )
            )}
            <div className="pt-4 border-t border-border">
              <a href="tel:5879380600" className="block font-mono-ui text-sm text-muted-foreground mb-3">587-938-0600</a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
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
