import headerLogo from "@/assets/header-logo.jpeg";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3">
            <img src={headerLogo} alt="Naaz Homeo Wellness" className="h-12" />
          </a>

          <div className="hidden md:flex items-center gap-10">
            <a href="#method" className="text-sm font-body tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200">
              The Method
            </a>
            <a href="#consultation" className="text-sm font-body tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200">
              Consultation
            </a>
            <a href="#clinic" className="text-sm font-body tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200">
              Calgary Clinic
            </a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <span className="font-mono-ui text-xs text-muted-foreground">587-938-0600</span>
            <a
              href="#consultation"
              className="px-5 py-2.5 bg-foreground text-background text-sm font-body font-medium tracking-wide border border-foreground hover:bg-primary hover:border-primary transition-all duration-200"
            >
              Book Online
            </a>
          </div>

          <a href="tel:5879380600" className="md:hidden font-mono-ui text-xs text-foreground">
            587-938-0600
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
