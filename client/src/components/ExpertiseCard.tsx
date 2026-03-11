import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ExpertiseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export default function ExpertiseCard({ icon: Icon, title, description, delay = 0 }: ExpertiseCardProps) {
  return (
    <Card 
      className="hover-elevate transition-all duration-500 group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
      data-testid={`card-expertise-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="relative">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
          <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
        </div>
        <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
