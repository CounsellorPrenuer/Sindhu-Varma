import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

interface PackageCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  onBookNow: () => void;
  popular?: boolean;
  delay?: number;
}

export default function PackageCard({ title, description, price, features, onBookNow, popular = false, delay = 0 }: PackageCardProps) {
  return (
    <Card 
      className={`hover-elevate transition-all duration-500 group relative overflow-hidden shadow-xl hover:shadow-2xl animate-fade-in-up ${
        popular ? 'border-primary border-2 scale-105' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
      data-testid={`card-package-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-br from-primary to-purple-600 text-white px-4 py-1 text-xs font-semibold flex items-center gap-1 rounded-bl-lg">
          <Sparkles className="h-3 w-3" />
          POPULAR
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="relative pb-4">
        <CardTitle className="text-2xl sm:text-3xl font-serif group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
        <CardDescription className="text-sm sm:text-base mt-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="mb-6 sm:mb-8">
          <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">{price}</span>
          <span className="text-foreground/60 ml-2">/session</span>
        </div>
        
        <ul className="space-y-3 sm:space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 group/item">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/item:bg-primary/20 transition-colors">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm sm:text-base text-foreground/80 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="relative pt-6">
        <Button
          className="w-full group/btn relative overflow-hidden"
          onClick={onBookNow}
          data-testid={`button-book-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <span className="relative z-10">Book Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
        </Button>
      </CardFooter>
    </Card>
  );
}
