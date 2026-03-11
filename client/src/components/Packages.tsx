import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Loader2 } from "lucide-react";
import { CustomerDetailsModal } from "./CustomerDetailsModal";
import { sanityClient } from "@/lib/sanity";

interface Package {
  planId: string;
  title: string;
  subgroup: string;
  price: number;
  priceDisplay: string;
  description: string;
  popular: boolean;
  order: number;
  features: string[];
}

export default function Packages() {
  const [activeTab, setActiveTab] = useState("8-9 Students");
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<Package[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    planName: string;
    category: string;
    amount: number;
  } | null>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const data = await sanityClient.fetch(`*[_type == "package"] | order(order asc)`);
        setPackages(data);
        if (data.length > 0) {
          const subgroups = Array.from(new Set(data.map((p: any) => p.subgroup)));
          setActiveTab(subgroups[0] as string);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);

  const PREFERRED_ORDER = ["8-9 Students", "10-12 Students", "Graduates", "Working Professionals"];
  const subgroups = Array.from(new Set(packages.map((p) => p.subgroup))).sort((a, b) => {
    const indexA = PREFERRED_ORDER.indexOf(a);
    const indexB = PREFERRED_ORDER.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const filteredPackages = packages
    .filter((p) => p.subgroup === activeTab)
    .sort((a, b) => {
      const isAPlus = a.title.toLowerCase().includes("plus") || a.planId.toLowerCase().includes("plus");
      const isBPlus = b.title.toLowerCase().includes("plus") || b.planId.toLowerCase().includes("plus");
      if (isAPlus && !isBPlus) return 1;
      if (!isAPlus && isBPlus) return -1;
      return a.price - b.price;
    });

  const handleBooking = (title: string, category: string, amount: number) => {
    setSelectedPackage({ planName: title, category, amount });
    setModalOpen(true);
  };

  return (
    <section id="packages" className="py-20 sm:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Pricing Plans</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 tracking-tight">
            Investment in Your <span className="text-primary italic">Future</span>
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Choose a mentorship track that matches your goals and current academic stage.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-foreground/40 font-medium italic">Preparing your mentorship journey...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-3 mb-16 sm:mb-24 px-4 overflow-x-auto pb-4 scrollbar-hide">
              {subgroups.map((group) => (
                <button
                  key={group}
                  onClick={() => setActiveTab(group)}
                  className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-500 whitespace-nowrap
                    ${activeTab === group 
                      ? 'bg-primary text-white shadow-xl shadow-primary/25 scale-105' 
                      : 'bg-primary/5 text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20'}`}
                >
                  {group}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
              {filteredPackages.map((pkg, idx) => (
                <PricingCard 
                  key={pkg.planId} 
                  pkg={{
                    ...pkg,
                    popular: pkg.title.toLowerCase().includes("plus") || pkg.planId.toLowerCase().includes("plus")
                  }} 
                  index={idx}
                  onBookNow={() => handleBooking(pkg.title, pkg.subgroup, pkg.price)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {selectedPackage && (
        <CustomerDetailsModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          planName={selectedPackage.planName}
          category={selectedPackage.category}
          amount={selectedPackage.amount}
        />
      )}
    </section>
  );
}

function PricingCard({ pkg, index, onBookNow }: { pkg: Package; index: number; onBookNow: () => void }) {
  return (
    <Card 
      className={`relative h-full transition-all duration-700 hover:shadow-2xl border-0 overflow-hidden group
        ${pkg.popular ? 'bg-primary text-white scale-105 lg:scale-110 z-10' : 'bg-card'}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {pkg.popular && (
        <div className="absolute top-0 right-0 px-6 py-2 bg-white text-primary text-xs font-bold uppercase tracking-widest rounded-bl-3xl shadow-lg z-20">
          Most Popular
        </div>
      )}
      
      <CardHeader className="pt-12 pb-8 px-8 sm:px-10 relative">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6
          ${pkg.popular ? 'bg-white/20' : 'bg-primary/10'}`}>
          <Star className={`h-7 w-7 ${pkg.popular ? 'text-white' : 'text-primary'}`} />
        </div>
        <CardTitle className="text-3xl font-serif mb-3 tracking-tight">{pkg.title}</CardTitle>
        <CardDescription className={`text-base leading-relaxed ${pkg.popular ? 'text-white/80' : 'text-foreground/60'}`}>
          {pkg.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 sm:px-10 pb-8">
        <div className="flex items-baseline gap-2 mb-10">
          <span className="text-5xl font-bold tracking-tighter">{pkg.priceDisplay}</span>
          <span className={`text-sm ${pkg.popular ? 'text-white/60' : 'text-foreground/40'}`}>/ mentorship</span>
        </div>
        
        <ul className="space-y-5">
          {pkg.features.map((feature, i) => {
            const isString = typeof feature === "string";
            const isIncluded = isString || (feature as any).included;
            const text = isString ? feature : (feature as any).text;
            
            return (
              <li key={i} className="flex gap-4 items-start group/li">
                <div className={`mt-1 p-0.5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover/li:scale-110
                  ${pkg.popular ? 'bg-white/20' : 'bg-primary/10'}
                  ${!isIncluded && 'opacity-50'}`}>
                  <Check className={`h-3.5 w-3.5 ${pkg.popular ? 'text-white' : 'text-primary'}`} />
                </div>
                <span className={`text-sm font-medium ${pkg.popular ? 'text-white/90' : 'text-foreground/70'} ${!isIncluded && 'line-through opacity-50'}`}>
                  {text}
                </span>
              </li>
            );
          })}
        </ul>
      </CardContent>

      <CardFooter className="px-8 sm:px-10 pb-12 pt-4">
        <Button 
          className={`w-full h-14 text-base font-bold tracking-wide rounded-2xl transition-all duration-500 relative overflow-hidden group/btn
            ${pkg.popular 
              ? 'bg-white text-primary hover:bg-white/90 shadow-xl shadow-white/10 hover:scale-[1.02]' 
              : 'bg-primary text-white hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02]'}`}
          onClick={onBookNow}
        >
          <span className="relative z-10 transition-transform duration-500 group-hover/btn:scale-110">Buy Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
        </Button>
      </CardFooter>
      
      {/* Subtle patterns */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
    </Card>
  );
}
