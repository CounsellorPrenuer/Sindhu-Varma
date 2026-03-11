import { Linkedin, Instagram, Facebook, Heart } from "lucide-react";
import logoImage from "@assets/logo_1760085017223.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-card to-card/50 border-t border-card-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-400/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <img src={logoImage} alt="Lanista Virtus" className="h-10 sm:h-12 w-auto" />
              <span className="font-serif text-xl sm:text-2xl font-semibold">Lanista Virtus</span>
            </div>
            <p className="text-sm sm:text-base text-foreground/70 mb-6 leading-relaxed max-w-md">
              Empowering personal and professional evolution through certified NLP coaching and corporate training. Transform your life with expert guidance.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.linkedin.com/in/sindhuvarma-unstuckcoach/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary hover-elevate transition-all transform hover:scale-110"
                data-testid="footer-link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/sindhu_lifecoach21"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary hover-elevate transition-all transform hover:scale-110"
                data-testid="footer-link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100065272189422"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary hover-elevate transition-all transform hover:scale-110"
                data-testid="footer-link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {["About", "Expertise", "Testimonials", "Packages", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="text-sm sm:text-base text-foreground/70 hover:text-primary transition-colors hover:translate-x-1 inline-block"
                    data-testid={`footer-link-${link.toLowerCase()}`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">Contact</h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-foreground/70">
              <li>
                <a 
                  href="mailto:lanistatrainingconsultancy@gmail.com" 
                  className="hover:text-primary transition-colors break-all"
                >
                  lanistatrainingconsultancy@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+919746084925" 
                  className="hover:text-primary transition-colors"
                >
                  +91 97460 84925
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 text-center space-y-3">
          <p className="text-xs sm:text-sm text-foreground/70 flex items-center justify-center gap-2 flex-wrap">
            <span>&copy; {currentYear} Lanista Virtus. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-primary fill-primary" /> by Mentoria
            </span>
          </p>
          <p className="text-xs sm:text-sm text-foreground/60" data-testid="footer-mentoria-partnership">
            In partnership with Mentoria for enhanced career guidance services.
          </p>
        </div>
      </div>
    </footer>
  );
}
