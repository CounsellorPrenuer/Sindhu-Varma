import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { CustomerDetailsModal } from "@/components/CustomerDetailsModal";
import { sanityClient } from "@/lib/sanity";

interface CustomPackage {
  planId: string;
  title: string;
  price: number;
  priceDisplay: string;
  description: string;
  order: number;
}

const FALLBACK_CUSTOM = [
  { planId: "career-report", title: "Career Report", price: 1500, priceDisplay: "₹1,500", description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests.", order: 1 },
  { planId: "career-report-counselling", title: "Career Report + Career Counselling", price: 3000, priceDisplay: "₹3,000", description: "Connect with India's top career coaches to analyse your psychometric report and shortlist paths.", order: 2 },
  { planId: "knowledge-gateway", title: "Knowledge Gateway + Career Helpline Access", price: 100, priceDisplay: "₹100", description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts.", order: 3 },
  { planId: "one-to-one-session", title: "One-to-One Session with a Career Expert", price: 3500, priceDisplay: "₹3,500", description: "Resolve your career queries through a one-on-one session with an expert from your chosen field.", order: 4 },
  { planId: "college-admission-planning", title: "College Admission Planning", price: 3000, priceDisplay: "₹3,000", description: "Get unbiased recommendations and details on your future college options in India and abroad.", order: 5 },
  { planId: "exam-stress-management", title: "Exam Stress Management", price: 1000, priceDisplay: "₹1,000", description: "Get expert guidance on tackling exam stress, planning your study schedule, and revision tips.", order: 6 },
  { planId: "cap-100", title: "College Admissions Planner - 100 (CAP-100)", price: 199, priceDisplay: "₹199", description: "₹199 for a ranked list of the top 100 colleges in your course. Help you plan smarter.", order: 7 }
];

export default function CustomPackages() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<CustomPackage[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    planName: string;
    amount: number;
  } | null>(null);

  useEffect(() => {
    async function fetchCustomPackages() {
      try {
        const data = await sanityClient.fetch(`*[_type == "customPackage"] | order(order asc)`);
        if (data && data.length > 0) {
          setPackages(data);
        } else {
          setPackages(FALLBACK_CUSTOM);
        }
      } catch (error) {
        console.error("Error fetching custom packages:", error);
        setPackages(FALLBACK_CUSTOM);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomPackages();
// ... (rest of useEffect observer logic)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("custom-packages");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleBooking = (title: string, amount: number) => {
    setSelectedPackage({ planName: title, amount });
    setModalOpen(true);
  };

  return (
    <section id="custom-packages" className="py-16 sm:py-20 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Individual Services</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            Want To Customise Your Mentorship Plan?
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Choose specific services tailored to your immediate needs and career goals
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {packages.map((pkg, idx) => (
              <Card 
                key={pkg.planId}
                className="hover-elevate transition-all duration-500 group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative">
                  <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors duration-300">
                    {pkg.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-3xl font-bold text-primary mb-4">
                    {pkg.priceDisplay}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Check className="h-4 w-4 text-primary" />
                    Professional Guidance
                  </div>
                </CardContent>
                <CardFooter className="relative">
                  <Button
                    className="w-full group/btn relative overflow-hidden"
                    onClick={() => handleBooking(pkg.title, pkg.price)}
                  >
                    <span className="relative z-10">BUY NOW</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedPackage && (
        <CustomerDetailsModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          planName={selectedPackage.planName}
          category="Individual Service"
          amount={selectedPackage.amount}
        />
      )}
    </section>
  );
}
