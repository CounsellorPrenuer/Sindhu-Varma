import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, CreditCard } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
});

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  category: string;
  amount: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function CustomerDetailsModal({ isOpen, onClose, planName, category, amount }: CustomerDetailsModalProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: any) => {
      const apiUrl = import.meta.env.VITE_API_URL || "https://sindhu-varma-backend.gary.workers.dev"; // Placeholder or env
      const res = await fetch(`${apiUrl}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          customerName: data.name,
          customerEmail: data.email,
          customerPhone: data.phone
        }),
      });
      if (!res.ok) throw new Error("Failed to create order");
      return res.json();
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await createOrderMutation.mutateAsync({
        ...values,
        planName,
        category,
        amount,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: response.amount,
        currency: "INR",
        name: "Mentoria",
        description: `Booking for ${planName}`,
        order_id: response.orderId,
        handler: async function (paymentResponse: any) {
          try {
            const apiUrl = import.meta.env.VITE_API_URL || "https://sindhu-varma-backend.gary.workers.dev";
            const res = await fetch(`${apiUrl}/api/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...paymentResponse,
              }),
            });
            if (res.ok) {
              toast({ title: "Payment Successful!", description: "Your mentorship booking has been confirmed." });
              onClose();
            } else {
              throw new Error("Verification failed");
            }
          } catch (err) {
            toast({ title: "Payment Verification Failed", variant: "destructive" });
          }
        },
        prefill: {
          name: values.name,
          email: values.email,
          contact: values.phone,
        },
        theme: { color: "#6d28d9" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast({ title: "Error", description: "Failed to initiate payment. Please try again.", variant: "destructive" });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-0 shadow-2xl rounded-3xl">
        <div className="bg-primary p-8 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <CreditCard className="w-24 h-24" />
          </div>
          <DialogTitle className="text-2xl font-serif font-bold mb-2">Finalize Your Booking</DialogTitle>
          <DialogDescription className="text-white/80 text-base">
            You are booking the <span className="font-bold text-white">{planName}</span>
          </DialogDescription>
        </div>

        <div className="p-8 bg-card">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-foreground/50">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" className="h-12 bg-background border-primary/10 rounded-xl focus:border-primary transition-all" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-foreground/50">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" className="h-12 bg-background border-primary/10 rounded-xl focus:border-primary transition-all" {...field} />
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
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-foreground/50">Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+91..." className="h-12 bg-background border-primary/10 rounded-xl focus:border-primary transition-all" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <span className="text-foreground/60 font-medium">Amount to Pay</span>
                  <span className="text-2xl font-bold text-primary">₹{amount.toLocaleString()}</span>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 text-base font-bold rounded-2xl shadow-xl shadow-primary/20 group relative overflow-hidden"
                  disabled={createOrderMutation.isPending}
                >
                  {createOrderMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Proceed to Secure Payment
                      <ShieldCheck className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
                
                <p className="text-[10px] text-center text-foreground/40 italic">
                  Payments are securely processed via Razorpay. By proceeding, you agree to our terms of service.
                </p>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
