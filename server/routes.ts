import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Razorpay from "razorpay";
import crypto from "crypto";
import nodemailer from "nodemailer";
import OpenAI from "openai";
import { 
  contactFormSchema, 
  razorpayOrderSchema, 
  razorpayVerificationSchema,
  blogGenerationSchema,
  insertBlogPostSchema
} from "@shared/schema";
import { getPrice } from "./pricing-catalog";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function registerRoutes(app: Express): Promise<Server> {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  app.post("/api/payment/create-order", async (req, res) => {
    try {
      const validatedData = razorpayOrderSchema.parse(req.body);
      
      const price = getPrice(validatedData.category, validatedData.planName);
      
      if (!price) {
        return res.status(400).json({ error: "Invalid plan or category" });
      }
      
      // Create booking first
      const booking = await storage.createBooking({
        name: validatedData.customerName,
        email: validatedData.customerEmail,
        phone: validatedData.customerPhone,
        packageName: validatedData.planName,
        category: validatedData.category,
        amount: price,
        status: "pending",
      });
      
      const options = {
        amount: price * 100,
        currency: "INR",
        receipt: `order_${Date.now()}`,
        notes: {
          planName: validatedData.planName,
          category: validatedData.category,
          bookingId: booking.id,
        },
      };

      const order = await razorpay.orders.create(options);
      
      // Create payment record
      await storage.createPayment({
        bookingId: booking.id,
        razorpayOrderId: order.id,
        amount: price,
        status: "created",
      });
      
      res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
        bookingId: booking.id,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.post("/api/payment/verify", async (req, res) => {
    try {
      const validatedData = razorpayVerificationSchema.parse(req.body);
      
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = validatedData;

      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature === razorpay_signature) {
        // Update booking and payment status
        await storage.updateBookingStatus(bookingId, "completed");
        
        const payments = await storage.getAllPayments();
        const payment = payments.find(p => p.razorpayOrderId === razorpay_order_id);
        if (payment) {
          await storage.updatePaymentStatus(payment.id, "success", razorpay_payment_id, razorpay_signature);
        }
        
        res.json({ success: true, message: "Payment verified successfully" });
      } else {
        res.status(400).json({ success: false, error: "Invalid signature" });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ error: "Payment verification failed" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      // Save contact to database
      await storage.createContact({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        status: "pending",
      });
      
      if (!process.env.EMAIL_APP_PASSWORD) {
        console.log("Contact form submission (email not configured):", validatedData);
        return res.json({ 
          success: true, 
          message: "Message received successfully",
          note: "Email notifications not configured" 
        });
      }
      
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "lanistatrainingconsultancy@gmail.com",
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: validatedData.email,
        to: "lanistatrainingconsultancy@gmail.com",
        subject: `New Contact Form Submission from ${validatedData.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Phone:</strong> ${validatedData.phone}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      
      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // Admin dashboard routes
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      const contacts = await storage.getAllContacts();
      const payments = await storage.getAllPayments();
      const blogPosts = await storage.getAllBlogPosts();
      
      const stats = {
        bookings: bookings.length,
        contacts: contacts.length,
        payments: payments.filter(p => p.status === "success").length,
        downloads: 0, // Not implemented yet
        blogPosts: blogPosts.filter(p => p.status === "published").length,
        pending: payments.filter(p => p.status === "created").length,
        contacted: contacts.filter(c => c.status === "contacted").length,
        completed: bookings.filter(b => b.status === "completed").length,
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/admin/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.get("/api/admin/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  app.get("/api/admin/payments", async (req, res) => {
    try {
      const payments = await storage.getAllPayments();
      res.json(payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ error: "Failed to fetch payments" });
    }
  });

  app.get("/api/admin/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/admin/blog-posts", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ error: "Failed to create blog post" });
    }
  });

  app.patch("/api/admin/blog-posts/:id", async (req, res) => {
    try {
      const post = await storage.updateBlogPost(req.params.id, req.body);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/admin/blog-posts/:id", async (req, res) => {
    try {
      const success = await storage.deleteBlogPost(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  app.post("/api/admin/generate-blog", async (req, res) => {
    try {
      const validatedData = blogGenerationSchema.parse(req.body);
      
      const prompt = `Write a professional blog post about "${validatedData.topic}". 
      The blog should include the following keywords: ${validatedData.keywords}.
      Write ${validatedData.wordCount} words.
      ${validatedData.professional ? "Use a professional and formal tone." : "Use a conversational tone."}
      
      Format the output as JSON with these fields:
      {
        "title": "An engaging title for the blog post",
        "content": "The full blog post content in markdown format",
        "excerpt": "A compelling 150-200 character summary"
      }`;

      const response = await openai.chat.completions.create({
        model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an expert content writer specializing in NLP, leadership, and professional development topics. Generate well-structured, engaging blog posts in JSON format."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 8192,
      });

      const blogData = JSON.parse(response.choices[0].message.content || "{}");
      
      res.json({
        title: validatedData.title || blogData.title,
        content: blogData.content,
        excerpt: validatedData.excerpt || blogData.excerpt,
        category: validatedData.category,
        imageUrl: validatedData.imageUrl || null,
      });
    } catch (error) {
      console.error("Error generating blog:", error);
      res.status(500).json({ error: "Failed to generate blog content" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
