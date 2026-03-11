import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const apiUrl = import.meta.env.VITE_API_URL || "https://sindhu-varma-backend.gary.workers.dev";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-primary/5 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Contact Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold mb-6">
            Let's Start a <span className="text-primary italic">Conversation</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Ready to take the next step in your career? Reach out to us for a personalized consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start">
          <div className="space-y-8 sm:space-y-12 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-8">
              <ContactInfo 
                icon={Mail} 
                title="Email Us" 
                detail="contact@lanistavirtus.com"
                link="mailto:contact@lanistavirtus.com"
              />
              <ContactInfo 
                icon={Phone} 
                title="Call Us" 
                detail="+91 97734 51314"
                link="tel:+919773451314"
              />
              <ContactInfo 
                icon={MapPin} 
                title="Our Location" 
                detail="Mumbai, Maharashtra, India"
              />
            </div>

            <Card className="bg-primary text-white border-0 shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 sm:p-10 relative">
                <h3 className="text-2xl font-serif font-bold mb-4">Office Hours</h3>
                <div className="space-y-3 text-white/80">
                  <p className="flex justify-between"><span>Monday - Friday</span> <span>9:00 AM - 6:00 PM</span></p>
                  <p className="flex justify-between"><span>Saturday</span> <span>10:00 AM - 2:00 PM</span></p>
                  <p className="flex justify-between"><span>Sunday</span> <span>Closed</span></p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-2xl bg-card order-1 lg:order-2">
            <CardContent className="p-8 sm:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-background border-primary/10 h-12 focus:border-primary transition-all rounded-xl" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-background border-primary/10 h-12 focus:border-primary transition-all rounded-xl" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 99999 99999" className="bg-background border-primary/10 h-12 focus:border-primary transition-all rounded-xl" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold uppercase tracking-wider text-foreground/70">How can we help?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your career goals..." 
                            className="bg-background border-primary/10 min-h-[150px] focus:border-primary transition-all resize-none rounded-xl" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-base font-bold tracking-wide rounded-xl shadow-xl shadow-primary/20 group relative overflow-hidden" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        Send Message
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ContactInfo({ icon: Icon, title, detail, link }: { icon: any, title: string, detail: string, link?: string }) {
  const content = (
    <div className="flex items-center gap-6 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <Icon className="h-7 w-7" />
      </div>
      <div>
        <h4 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-1">{title}</h4>
        <p className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors duration-300">{detail}</p>
      </div>
    </div>
  );

  return link ? <a href={link}>{content}</a> : <div>{content}</div>;
}
