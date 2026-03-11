# Design Guidelines for Lanista Virtus - Sindhu Varma Coaching Website

## Design Approach
**Reference-Based Approach**: Inspired by leadcrestconsulting.com with adaptations for minimalist elegance and the Lanista Virtus brand identity.

## Core Design Principles
- **Elegant Minimalism**: Clean, uncluttered layouts with generous whitespace
- **Sophisticated Purple Palette**: Professional coaching brand with calming, empowering aesthetics
- **Glassmorphism & Refinement**: Modern UI with soft shadows and premium finishes
- **Single-Page Experience**: Smooth-scrolling sections with gentle transitions

## Color Palette

### Primary Colors (Dark Mode)
- **Deep Purple**: #4A148C (headlines, dark sections, key UI elements)
- **Soft Lavender**: #E1BEE7 (backgrounds, highlights, subtle gradients)
- **Pure White**: #FFFFFF (text on dark backgrounds for readability)

### Supporting Colors
- Semi-transparent overlays for glassmorphic effects
- Subtle purple gradients for section backgrounds
- White/off-white for light section backgrounds

## Typography
- **Headings**: Playfair Display (elegant serif for sophistication)
- **Body Text**: Montserrat (clean, modern sans-serif)
- **Hierarchy**: Large, impactful headlines with ample letter spacing; readable body text at 16-18px

## Layout System
**Tailwind Spacing Primitives**: Use units of 4, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 to py-24 (desktop), py-12 (mobile)
- Component spacing: gap-8, gap-12
- Container max-width: max-w-7xl with px-6 to px-8

## Component Library

### Navigation
- **Sticky Navbar**: Semi-transparent with blur effect (backdrop-blur-lg)
- Logo left, navigation links center, "Book a Session" CTA button right
- Smooth scroll to sections

### Hero Section
- **Full-width minimalist design** with centered content
- **Headline**: "Empowering Your Personal & Professional Evolution"
- **Sub-headline**: Brief introduction to Sindhu Varma and NLP coaching
- **CTA**: "Begin Your Transformation" button
- **Background**: Subtle purple gradient or abstract pattern

### About Me Section
- **Two-column layout**: Professional profile photo (right/left), bio text (opposite)
- **Highlights subsection**: Key credentials in distinct cards or badge-style elements
- Clean typography with adequate line height for readability

### Expertise Section
- **Card Grid**: 2-3 columns (desktop), stacked (mobile)
- **Premium cards** for each coaching area (Anxiety, Phobias, Relationships, etc.)
- Glassmorphic card style with soft shadows
- Subtle hover effects (lift + glow)

### Testimonials Section
- **Elegant carousel/slider** with smooth transitions
- Each slide: Client quote + Event name
- Navigation dots or arrows with purple accent
- Auto-play optional with manual controls

### Packages & Payments
- **Two-card pricing table** (side-by-side on desktop)
- Each card: Package name, description, "Book Now" button
- Razorpay integration on CTA buttons
- Purple gradient or glassmorphic card backgrounds

### Blog Section
- **3-column card layout** for placeholder posts
- Image placeholder, title, brief excerpt, "Read More" link
- Consistent card styling with hover states

### Contact Section
- **Split layout**: Contact form (left), contact details + social links (right)
- Form validation with success message
- Email: lanistatrainingconsultancy@gmail.com
- Phone: +91 97460 84925

### Footer
- **Comprehensive design**: Multi-column layout with site links, social media, copyright
- Social icons: LinkedIn, Instagram, Facebook (provided URLs)
- Purple accent for link hovers

## Visual Effects & Interactions
- **Animations**: Gentle fade-in on scroll (slow, subtle)
- **Glassmorphism**: Semi-transparent backgrounds with backdrop-blur
- **Shadows**: Soft, elevated shadows for depth
- **Hover States**: Smooth transitions, subtle lift/glow effects
- **Scroll Behavior**: Smooth, natural scrolling between sections

## Responsive Design
- **Mobile-First**: Stack all multi-column layouts
- **Breakpoints**: Tailwind defaults (sm, md, lg, xl)
- **Touch Optimization**: Larger tap targets, simplified navigation on mobile
- **Image Optimization**: Responsive images with proper sizing

## Branding Assets
- **Logo**: From Google Drive (https://drive.google.com/open?id=1Fn7nCvCQYqBdnfbEveAwGdin8cPD4LyS)
- **Profile Photo**: From Google Drive (About Me section)
- **Brand Name**: Lanista Virtus
- **Tagline**: Focus on empowerment and transformation

## Images
- **Hero Section**: Abstract purple gradient background or inspirational coaching imagery
- **About Me**: Professional headshot of Sindhu Varma
- **Blog Placeholders**: Stock images related to coaching, personal growth, mindfulness
- **Expertise Cards**: Subtle icons or imagery for each coaching area (optional)

## SEO & Metadata
- **Title**: "Lanista Virtus - NLP Coaching & Corporate Training by Sindhu Varma"
- **Meta Description**: "Sindhu Varma, Certified NLP Coach and Corporate Trainer, offers expert life coaching, career guidance, and therapy through Lanista Virtus"
- **Keywords**: NLP coach, Sindhu Varma, Lanista Virtus, corporate trainer, life coach, anxiety coaching, phobia therapy

## Accessibility
- High contrast between text and backgrounds (white on deep purple)
- Readable font sizes (minimum 16px for body)
- Keyboard navigation support
- ARIA labels for interactive elements
- Focus states visible and styled