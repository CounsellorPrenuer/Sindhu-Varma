import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
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

    const element = document.getElementById("testimonials");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      quote: "The NLP coaching session with Sindhu completely transformed my approach to challenges. I learned practical techniques that I still use daily to manage stress and stay focused on my goals.",
      event: "Empower Self and Others – NLP 2 Day Program",
      rating: 5,
    },
    {
      quote: "Sindhu's corporate training program gave our team the tools to communicate more effectively and work together seamlessly. The improvement in our productivity has been remarkable.",
      event: "Corporate Leadership Training",
      rating: 5,
    },
    {
      quote: "I was struggling with career indecision until I worked with Sindhu. Her guidance helped me identify my true passions and create a clear path forward. I'm now thriving in my dream role.",
      event: "Career Guidance Coaching Session",
      rating: 5,
    },
    {
      quote: "The anxiety management techniques I learned from Sindhu have been life-changing. I feel more in control, confident, and capable of handling whatever comes my way.",
      event: "Personal Transformation Coaching",
      rating: 5,
    },
    {
      quote: "Sindhu's compassionate approach and deep expertise in NLP helped me overcome fears that had held me back for years. I'm finally living the life I've always wanted.",
      event: "Fear and Phobia Breakthrough Session",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6" data-testid="text-testimonials-title">
            What My Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70">
            Real transformations from real people
          </p>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card to-primary/5 border-primary/10 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <CardContent className="p-6 sm:p-10 lg:p-16 relative">
              <Quote className="h-12 w-12 sm:h-16 sm:w-16 text-primary/20 mb-6" />
              
              <div className="flex mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 sm:h-6 sm:w-6 fill-primary text-primary" />
                ))}
              </div>

              <blockquote 
                className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-serif leading-relaxed mb-8 sm:mb-10 min-h-[120px] sm:min-h-[150px]" 
                data-testid={`text-testimonial-${currentIndex}`}
                key={currentIndex}
              >
                "{testimonials[currentIndex].quote}"
              </blockquote>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-sm sm:text-base font-semibold text-primary" data-testid={`text-event-${currentIndex}`}>
                  {testimonials[currentIndex].event}
                </p>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="hover-elevate"
                    data-testid="button-prev-testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="hover-elevate"
                    data-testid="button-next-testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                data-testid={`button-testimonial-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
