import { useEffect, useState } from "react";
import ExpertiseCard from "./ExpertiseCard";
import {
  Heart,
  Compass,
  Shield,
  Users,
  Briefcase,
  Target,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

export default function Expertise() {
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

    const element = document.getElementById("expertise");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const expertiseAreas = [
    {
      icon: Heart,
      title: "Anxiety and Depression",
      description: "Professional support to help you overcome anxiety and depression, building resilience and inner peace.",
    },
    {
      icon: Compass,
      title: "Feeling Stuck",
      description: "Break free from patterns that hold you back and discover new pathways to personal growth and success.",
    },
    {
      icon: Shield,
      title: "Fears and Phobias",
      description: "Transform limiting fears and phobias into confidence using proven NLP techniques.",
    },
    {
      icon: Users,
      title: "Relationship Issues",
      description: "Improve communication, resolve conflicts, and build healthier, more fulfilling relationships.",
    },
    {
      icon: Briefcase,
      title: "Career Guidance",
      description: "Navigate career transitions, discover your calling, and achieve professional fulfillment.",
    },
    {
      icon: Target,
      title: "Goal Achievement",
      description: "Set clear goals, overcome obstacles, and create actionable plans for lasting success.",
    },
    {
      icon: TrendingUp,
      title: "Personal Development",
      description: "Unlock your potential, build confidence, and develop the mindset for continuous growth.",
    },
    {
      icon: MessageCircle,
      title: "Communication Skills",
      description: "Master effective communication techniques to enhance your personal and professional relationships.",
    },
  ];

  return (
    <section id="expertise" className="py-16 sm:py-20 lg:py-32 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">What I Offer</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6" data-testid="text-expertise-title">
            My Expertise as a Life Coach
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Specialized coaching areas to help you transform your life and achieve your full potential
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {expertiseAreas.map((area, index) => (
            <ExpertiseCard
              key={index}
              icon={area.icon}
              title={area.title}
              description={area.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
}
