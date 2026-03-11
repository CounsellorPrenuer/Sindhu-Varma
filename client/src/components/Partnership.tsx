import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, GraduationCap, PlayCircle, ExternalLink } from "lucide-react";

export default function Partnership() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("partnership");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: Users,
      number: "3,50,000+",
      label: "Students and Professionals Mentored",
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Building2,
      number: "240+",
      label: "Corporate Partners",
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      icon: GraduationCap,
      number: "350+",
      label: "Schools and College Partners",
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    {
      icon: PlayCircle,
      number: "1000+",
      label: "Hours of Career Webinars",
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
  ];

  return (
    <section id="partnership" className="py-16 sm:py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Partnership</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6" data-testid="text-partnership-title">
            Powered by Mentoria's
            <br />
            <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              Career Discovery Platform
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            Every Leadcrest Consulting plan includes lifetime access to Mentoria: India's most trusted platform for career discovery, mentorship, and lifelong upskilling.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`hover-elevate transition-all duration-500 group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl animate-fade-in-up ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                transitionDelay: `${index * 100}ms`,
              }}
              data-testid={`card-stat-${index}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-6 sm:p-8 text-center">
                {/* Icon */}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-2xl ${stat.bgColor} border-2 ${stat.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className={`h-8 w-8 sm:h-10 sm:w-10 ${stat.color}`} />
                </div>

                {/* Number */}
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 ${stat.color}`}>
                  {stat.number}
                </div>

                {/* Label */}
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  {stat.label}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Mentoria Platform Link */}
        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card className="inline-block px-8 sm:px-12 py-6 sm:py-8 hover-elevate transition-all duration-500 group border-primary/20">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg sm:text-xl">MENTORIA</div>
                  <div className="text-xs sm:text-sm text-foreground/60">Career Discovery</div>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="hover-elevate group/btn"
                onClick={() => window.open('https://mentoria.com', '_blank')}
                data-testid="button-mentoria-platform"
              >
                Career Discovery Platform
                <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          </Card>
          
          <p className="text-sm text-foreground/60 mt-6">
            Click to explore Mentoria's comprehensive career platform
          </p>
        </div>
      </div>
    </section>
  );
}
