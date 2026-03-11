# Lanista Virtus - NLP Coaching & Corporate Training Website

## Overview

This is a single-page marketing website for Lanista Virtus, a professional NLP (Neuro-Linguistic Programming) coaching and corporate training business founded by Sindhu Varma. The site showcases coaching services, packages, testimonials, and provides contact/booking functionality. It's designed as an elegant, minimalist landing page with smooth scrolling sections and a sophisticated purple color scheme inspired by modern design trends.

The application serves as a professional web presence for personal coaching services, career counseling, and corporate training programs, with integrated payment processing for session bookings.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server, configured for fast HMR and optimized production builds
- Wouter for lightweight client-side routing (single-page application structure)
- Single-page scrolling design with smooth navigation between sections

**UI Component System**
- Shadcn UI component library (New York style variant) providing pre-built, accessible components
- Radix UI primitives for headless, accessible UI components (dialogs, dropdowns, forms, etc.)
- Tailwind CSS for utility-first styling with custom design tokens
- Custom color palette based on purple/lavender theme with dark mode support
- Typography: Playfair Display (serif) for headings, Montserrat (sans-serif) for body text

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management and API calls
- React Hook Form with Zod validation for form handling
- Local component state using React hooks for UI interactions

**Design Patterns**
- Component composition with reusable UI primitives
- Form validation using Zod schemas shared between client and server
- Intersection Observer API for scroll-based animations and active section tracking
- Navbar scroll spy: Automatically highlights the current section in the navigation bar as users scroll
- Responsive design with mobile-first approach using Tailwind breakpoints

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Custom middleware for request logging and error handling
- RESTful API endpoints for form submissions and payment processing

**API Structure**
- `/api/payment/create-order`: Creates Razorpay payment orders with server-side pricing validation from `server/pricing-catalog.ts` (prevents client-side price manipulation)
- `/api/payment/verify`: Verifies payment signatures using HMAC SHA256 for security
- `/api/contact`: Handles contact form submissions with Nodemailer email notifications (gracefully handles missing EMAIL_APP_PASSWORD)
- Validation using Zod schemas ensuring type safety across the stack

**Security Features**
- Server-side pricing validation: All package prices are determined from a trusted server catalog, preventing payment manipulation
- HMAC signature verification for Razorpay payments
- Input validation with Zod schemas on all API endpoints

**Session Management**
- In-memory session storage (MemStorage class) for user data
- Extensible storage interface (IStorage) designed for easy migration to persistent storage

**Development Environment**
- Vite middleware integration for HMV in development
- Separate development and production server configurations
- Static file serving for production builds

### External Dependencies

**Payment Processing**
- Razorpay integration for handling payments
  - Order creation with server-side amount validation
  - Payment signature verification for security
  - Environment variables: `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
- Pricing catalog system mapping service categories to plan prices

**Email Service**
- Nodemailer for transactional emails
  - Payment confirmation emails
  - Contact form notifications
  - Configured via environment variables for SMTP credentials

**Database**
- Drizzle ORM configured for PostgreSQL
  - Schema defined in `shared/schema.ts` with user and form models
  - Connection via `DATABASE_URL` environment variable
  - Migration support through drizzle-kit
  - Currently uses Neon Database serverless driver
- Note: Application currently uses in-memory storage; database is provisioned for future use

**Asset Management**
- Google Drive links for brand assets (logo, profile images)
- Local stock images stored in `attached_assets` directory
- Vite asset resolution with custom aliases (@assets)

**Third-Party UI Libraries**
- Radix UI components for accessibility (20+ component primitives)
- Lucide React for consistent iconography
- Class Variance Authority (CVA) for component variant management
- Tailwind Merge and CLSX for dynamic className handling

**Development Tools**
- ESBuild for server-side bundling in production
- TSX for running TypeScript in development
- TypeScript strict mode enabled for type safety
- Path aliases configured for clean imports (@/, @shared/, @assets/)

## Recent Changes

### Admin Dashboard Implementation (October 2025)

**New Features:**
- Complete admin dashboard at `/admin` route with comprehensive business analytics
- Customer Data tab with stats cards, data tables, and Excel export functionality
- Blog Management tab with AI-powered blog generation using OpenAI API
- Customer details modal integrated into payment flow before Razorpay checkout
- Leads tracking system combining contact form submissions and payment modal data

**Admin Dashboard Components:**
- `AdminDashboard.tsx`: Main dashboard page with tab-based interface
- `CustomerDataTab.tsx`: Displays bookings, contacts, payments, downloads with stats and export features
- `BlogManagementTab.tsx`: AI blog generation form, published posts management with CRUD operations
- `CustomerDetailsModal.tsx`: Captures user information before payment processing

**API Endpoints Added:**
- `GET /api/admin/stats`: Returns statistics for all data sections
- `GET /api/admin/bookings`: Returns all bookings
- `GET /api/admin/contacts`: Returns all contact form submissions
- `GET /api/admin/payments`: Returns all payment records
- `GET /api/admin/blog-posts`: Returns all blog posts
- `POST /api/admin/generate-blog`: Generates AI blog content using OpenAI
- `POST /api/admin/blog-posts`: Creates a new blog post
- `PATCH /api/admin/blog-posts/:id`: Updates a blog post
- `DELETE /api/admin/blog-posts/:id`: Deletes a blog post

**Technical Implementation:**
- Excel export functionality using XLSX library for all data sections
- Error handling with useEffect-based toast notifications (React best practices)
- Markdown rendering for blog content using react-markdown
- React Hook Form with Zod validation for all forms
- TanStack Query for data fetching with proper loading and error states
- Comprehensive data-testid attributes for testing coverage

**Data Models Extended:**
- Bookings: Tracks coaching session bookings with user details and status
- Contacts: Stores contact form submissions with status tracking
- Payments: Records Razorpay payment transactions with verification
- BlogPosts: Manages blog content with AI generation metadata

**Security & Best Practices:**
- Server-side pricing validation prevents payment manipulation
- Input validation with Zod schemas on all endpoints
- Error handling following React patterns (no side effects in render)
- Toast notifications fire once per error via useEffect hooks
- All mutations include onError callbacks for user feedback