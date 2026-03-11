import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Award, Users, Target } from "lucide-react";
import profileImage from "@assets/profile_1760085017224.jpeg";
import { useEffect, useState } from "react";

export default function About() {
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

    const element = document.getElementById("about");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const credentials = [
    "Certified NLP Coach",
    "Corporate Trainer",
    "Certified Career Counsellor",
    "Entrepreneur",
  ];

  const highlights = [
    { icon: Award, label: "Certified Expert", color: "text-purple-500" },
    { icon: Users, label: "500+ Clients", color: "text-blue-500" },
    { icon: Target, label: "Result-Driven", color: "text-green-500" },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className={`order-2 lg:order-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent" />
              <span className="text-sm font-bold text-primary uppercase tracking-widest">About Me</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-[1.15]" data-testid="text-about-title">
              Meet Your Guide to
              <span className="block bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent mt-2">
                Transformation
              </span>
            </h2>

            {/* Highlight Stats */}
            <div className="flex flex-wrap gap-4 mb-8">
              {highlights.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-card to-card/50 border border-border/50 hover-elevate transition-all"
                >
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-foreground/80 leading-relaxed">
              <p className="relative pl-4 border-l-4 border-primary/30">
                I'm <strong className="text-foreground font-bold">Sindhu Varma</strong>, founder of Lanista Training Consultancy and the driving force behind Lanista Virtus. With over a decade of experience in personal development and corporate training, I've dedicated my career to helping individuals unlock their full potential.
              </p>
              <p>
                As a Certified NLP Practitioner and Master Coach, I specialize in transforming limiting beliefs into empowering mindsets. My approach combines proven NLP techniques with compassionate guidance to help you overcome anxiety, fears, and relationship challenges.
              </p>
              <p>
                Whether you're a student seeking clarity, a professional navigating career transitions, or someone ready to break free from self-imposed limitations, I'm here to guide you on your journey to lasting transformation.
              </p>
            </div>

            <div className="mt-8 sm:mt-10">
              <h3 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-6 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                My Credentials
              </h3>
              <div className="flex flex-wrap gap-3">
                {credentials.map((credential, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-5 py-2.5 text-sm sm:text-base hover-elevate transition-all cursor-default"
                    data-testid={`badge-credential-${index}`}
                  >
                    {credential}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`order-1 lg:order-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition duration-700" />
              
              {/* Image Card */}
              <Card className="overflow-hidden relative transform group-hover:scale-[1.02] transition-all duration-700 border-2 border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img
                  src={profileImage}
                  alt="Sindhu Varma"
                  className="w-full h-auto object-cover"
                  data-testid="img-profile"
                />
              </Card>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse-slow" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
