import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { sanityClient, urlFor } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag, Loader2, Clock, User } from "lucide-react";

// Custom Simple Portable Text Renderer
function SimplePortableText({ value }: { value: any[] }) {
  if (!value) return null;
  return (
    <>
      {value.map((block: any, idx: number) => {
        if (block._type === 'block') {
          return (
            <p key={idx} className="mb-6 leading-relaxed text-foreground/80">
              {block.children?.map((child: any, cidx: number) => {
                let content: any = child.text;
                if (child.marks?.includes('strong')) content = <strong key={cidx}>{content}</strong>;
                if (child.marks?.includes('em')) content = <em key={cidx}>{content}</em>;
                return content;
              })}
            </p>
          );
        }
        return null;
      })}
    </>
  );
}

interface BlogPost {
  title: string;
  mainImage: any;
  body: any[];
  publishedAt: string;
  category: string;
  author?: { name: string };
  readingTime?: number;
}

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      try {
        const data = await sanityClient.fetch(`
          *[_type == "blogPost" && slug.current == $slug][0] {
            title,
            mainImage,
            body,
            publishedAt,
            category,
            "author": author->{name},
            readingTime
          }
        `, { slug });
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4 px-4 text-center">
        <h1 className="text-4xl font-serif font-bold">Post Not Found</h1>
        <p className="text-muted-foreground">The article you're looking for doesn't exist or has been removed.</p>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={post.mainImage ? urlFor(post.mainImage).url() : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-1.5 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                {post.category || "Mentorship"}
              </span>
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/70">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-wider">{post.author.name}</span>
                </div>
              )}
              {post.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{post.readingTime} min read</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="prose prose-lg prose-primary max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-foreground/80 prose-p:leading-relaxed">
          <SimplePortableText value={post.body} />
        </div>
        
        <div className="mt-20 pt-12 border-t border-border">
          <Link href="/">
            <Button variant="ghost" className="group text-primary hover:bg-primary/5 text-lg font-bold h-auto py-4 px-8 gap-4">
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-2" />
              Back to Insights
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
