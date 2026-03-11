import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/logo_1760085017223.png";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past hero section (assuming hero is about 100vh)
      const heroHeight = window.innerHeight;
      setIsScrolledPastHero(window.scrollY > heroHeight - 100);
    };

    handleScroll(); // Check initial position
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = ["about", "expertise", "testimonials", "packages", "blog", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Expertise", id: "expertise" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Packages", id: "packages" },
    { label: "Blog", id: "blog" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b transition-all duration-300 ${
      isScrolledPastHero 
        ? 'bg-background/98 border-border/50 shadow-lg' 
        : 'bg-transparent border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className="relative">
              <div className={`absolute inset-0 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                isScrolledPastHero ? 'bg-primary/20' : 'bg-white/20'
              }`} />
              <img 
                src={logoImage} 
                alt="Lanista Virtus" 
                className="h-10 sm:h-12 w-auto relative transform group-hover:scale-105 transition-transform" 
              />
            </div>
            <span className={`font-serif text-lg sm:text-xl font-bold hidden sm:inline transition-colors duration-300 ${
              isScrolledPastHero 
                ? 'bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'
                : 'text-white'
            }`}>
              Lanista Virtus
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm xl:text-base transition-all relative group font-semibold ${
                  activeSection === link.id
                    ? isScrolledPastHero
                      ? 'text-primary'
                      : 'text-white'
                    : isScrolledPastHero 
                      ? 'text-foreground/70 hover:text-primary' 
                      : 'text-white/90 hover:text-white'
                }`}
                data-testid={`link-${link.id}`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-0 h-1 rounded-full transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                } ${
                  isScrolledPastHero 
                    ? 'bg-gradient-to-r from-primary to-purple-600' 
                    : 'bg-white'
                }`} />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              variant={isScrolledPastHero ? "default" : "outline"}
              onClick={() => scrollToSection("packages")}
              className={`shadow-lg transition-all relative overflow-hidden group ${
                isScrolledPastHero 
                  ? 'shadow-primary/25 hover:shadow-xl hover:shadow-primary/40' 
                  : 'bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60'
              }`}
              data-testid="button-book-session"
            >
              <span className="relative z-10">Book a Session</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 hover-elevate rounded-xl transition-all ${
              isScrolledPastHero ? 'text-foreground' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            <div className="relative w-6 h-6">
              <Menu 
                size={24} 
                className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} 
              />
              <X 
                size={24} 
                className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-2xl border-b border-border/50 shadow-2xl animate-slide-down">
          <div className="px-4 sm:px-6 py-6 space-y-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left py-3 px-5 rounded-xl transition-all font-semibold animate-fade-in ${
                  activeSection === link.id
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                data-testid={`mobile-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="default"
              className="w-full mt-4 shadow-lg animate-fade-in"
              style={{ animationDelay: `${navLinks.length * 50}ms` }}
              onClick={() => scrollToSection("packages")}
              data-testid="mobile-button-book-session"
            >
              Book a Session
            </Button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }
      `}</style>
    </nav>
  );
}
