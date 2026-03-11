import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import heroImage from "@assets/stock_images/abstract_purple_grad_6d4379e3.jpg";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "slowZoom 20s ease-in-out infinite alternate",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/75 to-purple-600/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <Star 
              className="text-white/20" 
              size={Math.random() * 20 + 10}
              style={{
                filter: 'blur(1px)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in shadow-lg">
          <Sparkles className="h-5 w-5 text-white animate-pulse" />
          <span className="text-sm sm:text-base text-white/95 font-semibold tracking-wide">Certified NLP Coach & Corporate Trainer</span>
        </div>

        {/* Main Heading */}
        <h1 
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 leading-[1.1] animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
          data-testid="text-hero-title"
        >
          Empowering Your
          <br />
          <span className="relative inline-block mt-2">
            <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-white via-purple-200 to-white opacity-50" />
            <span className="relative bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent animate-shimmer">
              Personal & Professional Evolution
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-10 sm:mb-14 max-w-4xl mx-auto leading-relaxed animate-fade-in-up px-4"
          style={{ animationDelay: "0.4s" }}
          data-testid="text-hero-subtitle"
        >
          Certified NLP Coaching and Corporate Training to help you overcome barriers and achieve your goals. Founded by <span className="font-semibold">Sindhu Varma</span>.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/95 text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-7 h-auto shadow-2xl shadow-black/30 group relative overflow-hidden"
            onClick={() => scrollToSection("packages")}
            data-testid="button-begin-transformation"
          >
            <span className="relative z-10 flex items-center gap-2">
              Begin Your Transformation
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-7 h-auto shadow-xl"
            onClick={() => scrollToSection("about")}
            data-testid="button-learn-more"
          >
            Learn More
          </Button>
        </div>

        {/* Stats Section */}
        <div className="mt-16 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">10+</div>
            <div className="text-xs sm:text-sm text-white/80">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">500+</div>
            <div className="text-xs sm:text-sm text-white/80">Clients Transformed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">100%</div>
            <div className="text-xs sm:text-sm text-white/80">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />

      <style>{`
        @keyframes slowZoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0.3; 
          }
          50% { 
            transform: translateY(-30px) translateX(15px) rotate(180deg); 
            opacity: 0.7; 
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
