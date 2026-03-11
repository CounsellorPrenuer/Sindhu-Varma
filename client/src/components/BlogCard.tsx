import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Link } from "wouter";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  slug: string;
  index: number;
}

export function BlogCard({ title, excerpt, image, date, category, slug, index }: BlogCardProps) {
  return (
    <Card 
      className="group bg-card border-0 shadow-lg hover:shadow-2xl transition-all duration-700 h-full flex flex-col overflow-hidden opacity-0 translate-y-8 animate-fade-in-up"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" title={title} />
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
            {category}
          </span>
        </div>
      </div>
      <CardHeader className="flex-grow p-6 sm:p-8">
        <div className="flex items-center gap-4 text-foreground/40 text-xs font-semibold mb-3 uppercase tracking-widest">
          <span className="flex items-center gap-1.5 hover:text-primary transition-colors duration-300">
            <Tag className="h-3.5 w-3.5" />
            {category}
          </span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {date}
          </span>
        </div>
        <CardTitle className="text-xl sm:text-2xl font-serif mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
        <p className="text-foreground/60 leading-relaxed line-clamp-3 text-sm sm:text-base">
          {excerpt}
        </p>
      </CardHeader>
      <CardContent className="p-6 sm:p-8 pt-0 mt-auto">
        <Link href={`/blog/${slug}`}>
          <Button variant="link" className="p-0 text-primary font-bold group/btn text-base hover:no-underline">
            Read Full Article
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
