# Lanora Electroplaters - Modern Website

A professional, fully-responsive website for Lanora Electroplaters built with Next.js 16, React 19, and Tailwind CSS v4. Features advanced animations, dark/light theme switching, and an interactive portfolio redirect system.

![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)

## 📋 Table of Contents

- [Design Approach](#-design-approach)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Development Guidelines](#-development-guidelines)

## 🎨 Design Approach

### Design Philosophy

The website follows a **modern, professional aesthetic** tailored for the industrial electroplating sector with the following principles:

1. **Clean & Minimal**: Uncluttered layouts with strategic use of whitespace
2. **High Contrast**: Bold accent colors (red) against neutral backgrounds for visual impact
3. **Motion Design**: Subtle animations to enhance user engagement without distraction
4. **Accessibility First**: Dark/light themes with WCAG-compliant color contrasts
5. **Mobile-First**: Responsive design prioritizing mobile user experience

### Visual Design Elements

- **Color Palette**: 
  - Primary Accent: Red (`#dc2626`) for CTAs and highlights
  - Light Theme: White backgrounds with dark text
  - Dark Theme: Dark backgrounds with light text
  - Smooth transitions between themes (300ms cubic-bezier)

- **Typography**: 
  - System font stack for optimal performance
  - Hierarchical sizing (h1: 3rem/4rem, h2: 2.25rem, body: 1rem)
  - Semi-bold headings, regular body text

- **Interactive Elements**:
  - Tilted accent boxes behind icons for depth
  - 3D flip cards for testimonials (desktop)
  - Hover animations with scale and color transitions
  - Infinite scrolling client strips
  - Animated counter components

- **Geometric Accents**:
  - Circular decorations with varying opacity
  - Rotated squares for visual interest
  - Border highlights on images
  - Sun icon backgrounds with rotation effects

### User Experience (UX)

- **Navigation**: 
  - Fixed navbar with active state highlighting
  - Slide-in mobile menu from right
  - Smooth scroll-to-top on page navigation

- **Animations**:
  - Scroll-triggered reveals with Framer Motion
  - Staggered component appearances
  - Progressive loading animations
  - 60fps smooth transitions

- **Interactivity**:
  - Portfolio redirect modal (3-second countdown)
  - Clickable images and testimonials
  - Hover states with visual feedback
  - Form validation with inline error messages

## 🛠 Tech Stack

### Core Framework

- **[Next.js 16.0.0](https://nextjs.org/)** - React framework with App Router
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - File-based routing
  - API routes support

- **[React 19.2.0](https://react.dev/)** - UI library
  - Latest concurrent features
  - Enhanced performance
  - Improved hydration

### Styling & UI

- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
  - Custom theme configuration
  - Dark mode support via CSS variables
  - Custom utilities for 3D transforms
  - JIT (Just-In-Time) compiler

- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
  - Declarative animations
  - Scroll-triggered animations
  - AnimatePresence for enter/exit transitions
  - useInView hook for viewport detection

### Development Tools

- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Type safety
  - Strict mode enabled
  - Type inference
  - Interface definitions

- **[ESLint](https://eslint.org/)** - Code linting
  - Next.js recommended config
  - Custom rules for Tailwind

- **[PostCSS](https://postcss.org/)** - CSS processing
  - Tailwind CSS integration
  - Custom plugin support

### Icons & Assets

- **[Lucide React](https://lucide.dev/)** - Icon library
  - Tree-shakeable icons
  - Consistent design system
  - 1000+ icons

### Package Management

- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
  - Symbolic linking for dependencies
  - Monorepo support
  - Strict node_modules structure

## 📁 Project Structure

```
lanora/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── globals.css          # Global styles & theme variables
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Home page
│   │   ├── about/
│   │   │   └── page.tsx         # About page
│   │   ├── services/
│   │   │   └── page.tsx         # Services page
│   │   ├── facilities/
│   │   │   └── page.tsx         # Facilities page
│   │   ├── clients/
│   │   │   └── page.tsx         # Clients & testimonials
│   │   └── contact/
│   │       └── page.tsx         # Contact form
│   │
│   ├── components/              # Reusable components
│   │   ├── navbar.tsx           # Navigation with mobile menu
│   │   ├── footer.tsx           # Footer with links
│   │   ├── theme-provider.tsx   # Dark/light theme context
│   │   ├── scroll-to-top.tsx    # Auto-scroll on navigation
│   │   ├── portfolio-redirect-modal.tsx  # Portfolio modal
│   │   ├── abstract-shapes.tsx  # Decorative elements
│   │   ├── hover-card.tsx       # Hover effect wrapper
│   │   ├── stagger-container.tsx # Staggered animations
│   │   └── ui/                  # UI component library
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── ...              # 40+ shadcn/ui components
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-mobile.ts        # Mobile detection
│   │   └── use-toast.ts         # Toast notifications
│   │
│   ├── lib/
│   │   └── utils.ts             # Utility functions (cn, etc.)
│   │
│   └── styles/
│       └── globals.css          # Additional global styles
│
├── public/                      # Static assets
│   ├── certificate (1-3).png    # Certification images
│   ├── about1-3.png            # Feature icons
│   ├── sun.png                 # Decorative sun icon
│   └── *.jpg                   # Hero & section images
│
├── .next/                       # Next.js build output
├── node_modules/                # Dependencies
├── components.json              # shadcn/ui config
├── eslint.config.mjs           # ESLint configuration
├── next.config.mjs             # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## ✨ Features

### 🎯 Core Features

1. **Multi-Page Architecture**
   - Home (Hero, Services Overview, CTA)
   - About (Mission, Certifications, Why Choose Us)
   - Services (Plating Solutions, Quality Standards)
   - Facilities (Infrastructure, Process, Automation)
   - Clients (Stats, Partners, Testimonials)
   - Contact (Form, Contact Info, Validation)

2. **Theme System**
   - Light/Dark mode toggle
   - Persistent theme preference (localStorage)
   - Smooth color transitions (300ms)
   - CSS variable-based theming

3. **Advanced Animations**
   - Scroll-triggered reveals
   - Staggered component animations
   - 3D flip cards (desktop testimonials)
   - Infinite scrolling client strip
   - Animated counters (stats)
   - Hover effects with scale/rotation

4. **Portfolio Integration**
   - Click-to-redirect modal
   - 3-second countdown timer
   - Progress bar animation
   - Manual redirect option
   - Works on all images and testimonials

5. **Mobile Responsiveness**
   - Slide-in mobile navigation
   - Responsive grid layouts
   - Touch-friendly interactions
   - Optimized images for mobile

### 🚀 Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component ready
- **CSS Purging**: Tailwind removes unused styles
- **Tree Shaking**: Dead code elimination
- **Lazy Loading**: Components load on demand

## 🏁 Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **pnpm**: 8.x or higher (or npm/yarn)
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/forcedtomakeanaccounthere/React-Intern-Assignment.git
   cd React-Intern-Assignment/lanora
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install --legacy-peer-deps
   ```

3. **Run development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

```bash
pnpm dev          # Start development server (port 3000)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors
```

## 🚀 Deployment

### Option 1: Netlify (Recommended)

The project is configured for Netlify deployment with `netlify.toml`:

1. **Connect Repository**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Base directory: `lanora`
   - Build command: `npm install --legacy-peer-deps && npm run build`
   - Publish directory: `.next`

3. **Deploy**
   - Netlify auto-detects configuration from `netlify.toml`
   - Click "Deploy site"
   - Site goes live in 2-3 minutes

**Netlify Configuration** (`netlify.toml`):
```toml
[build]
  base = "lanora"
  command = "npm install --legacy-peer-deps && npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Option 2: Vercel (Native Next.js Platform)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd lanora
   vercel
   ```

3. **Follow Prompts**
   - Link to existing project or create new
   - Configure project settings
   - Deploy to production

**Vercel Auto-Configuration**:
- Detects Next.js automatically
- Zero-config deployment
- Automatic HTTPS
- CDN edge network

### Option 3: Custom Server (VPS/Cloud)

1. **Build the project**
   ```bash
   pnpm build
   ```

2. **Start production server**
   ```bash
   pnpm start
   ```

3. **Use PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "lanora" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx reverse proxy**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Environment Variables

Create `.env.local` for environment-specific configuration:

```env
# App Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_PORTFOLIO_URL=https://portfolio-abhishek-anand.vercel.app/

# Contact Form (Optional)
NEXT_PUBLIC_FORM_ENDPOINT=your-form-endpoint
```

## 💻 Development Guidelines

### Code Style

- **TypeScript**: Use strict mode, define interfaces
- **React**: Functional components with hooks
- **CSS**: Tailwind utilities, avoid inline styles
- **Imports**: Absolute imports from `@/` alias

### Component Structure

```tsx
"use client"  // If using client-side features

import { motion } from "framer-motion"
import { ComponentProps } from "./types"

export default function Component({ prop1, prop2 }: ComponentProps) {
  // Hooks at top
  const [state, setState] = useState()

  // Event handlers
  const handleClick = () => {}

  // Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto"
    >
      {/* Content */}
    </motion.div>
  )
}
```

### Animation Patterns

```tsx
// Scroll-triggered reveal
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: false, amount: 0.3 }}
>
  Content
</motion.div>

// Staggered children
<StaggerContainer>
  {items.map((item, i) => (
    <motion.div key={i} {...item} />
  ))}
</StaggerContainer>
```

### Theming

Themes use CSS variables defined in `globals.css`:

```css
@theme inline {
  --color-accent: #dc2626;
  --color-foreground: #0a0a0a;
  --color-background: #ffffff;
}

@custom-variant dark (&:is(.dark *));
```

Access in components:
```tsx
<div className="bg-background text-foreground border-accent" />
```

### Best Practices

1. **Performance**: Use `viewport={{ once: false }}` sparingly
2. **Accessibility**: Include ARIA labels, semantic HTML
3. **SEO**: Add meta tags in page metadata
4. **Images**: Use optimized formats (WebP), proper alt text
5. **Forms**: Validate inputs, show error states
6. **Loading**: Add loading states for async operations

## 📄 License

This project is created for Lanora Electroplaters. All rights reserved.

## 👨‍💻 Developer

**Abhishek Anand**
- Portfolio: [https://portfolio-abhishek-anand.vercel.app/](https://portfolio-abhishek-anand.vercel.app/)
- Email: abhishekanandvii@gmail.com
- Phone: +91 7386811239

---

Built with ❤️ using Next.js, React, and Tailwind CSS
