import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mainLogo from "@/assets/main-logo.jpeg";

const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-CA", {
          timeZone: "America/Edmonton",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div>
            <img src={mainLogo} alt="Naaz Homeo Wellness" className="h-20 mb-4" />
          </div>

          <div>
            <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Quick Links
            </p>
            <div className="space-y-2">
              <a href="#method" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">The Method</a>
              <Link to="/about" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Geeta</Link>
              <a href="#clinic" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Calgary Clinic</a>
              <Link to="/privacy" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>

          <div>
            <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Calgary, AB — {time}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-sage" />
              <span className="font-mono-ui text-xs text-muted-foreground">
                Accepting Online Consultations
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="font-mono-ui text-xs text-muted-foreground">
            © {new Date().getFullYear()} Naaz Homeo Wellness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
