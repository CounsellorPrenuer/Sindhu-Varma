import Hero from "@/components/Hero";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Packages from "@/components/Packages";
import CustomPackages from "@/components/CustomPackages";
import Partnership from "@/components/Partnership";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <About />
        <Expertise />
        <Packages />
        <CustomPackages />
        <Partnership />
        <Blog />
        <Testimonials />
        <ContactForm />
      </main>
    </div>
  );
}
