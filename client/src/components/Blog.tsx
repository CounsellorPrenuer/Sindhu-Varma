import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { sanityClient, urlFor } from "@/lib/sanity";
import { BlogCard } from "./BlogCard";

interface BlogPost {
  title: string;
  slug: { current: string };
  mainImage: any;
  excerpt: string;
  publishedAt: string;
  category: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await sanityClient.fetch(`
          *[_type == "blogPost"] | order(publishedAt desc) [0...3]
        `);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-16 sm:py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Latest Insights</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
              Empowering Your <span className="text-primary italic">Career Journey</span>
            </h2>
          </div>
          <Link href="/blog">
            <Button variant="ghost" className="group text-primary hover:bg-primary/5 text-lg font-semibold h-auto py-3 px-6">
              View All Posts
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {posts.map((post, index) => (
              <BlogCard
                key={post.slug.current}
                title={post.title}
                excerpt={post.excerpt}
                image={post.mainImage ? urlFor(post.mainImage).url() : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"}
                date={new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                category={post.category || "Mentorship"}
                slug={post.slug.current}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
