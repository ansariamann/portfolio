# Modern Portfolio Website

A modern portfolio website for a junior software developer built with Next.js 14, TypeScript, and Tailwind CSS. Features smooth animations, responsive design, and clean code architecture.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Code Quality**: ESLint, Prettier, TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Testing (To be implemented)

```bash
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests
npm run test:coverage # Generate test coverage report
```

### Performance (To be implemented)

```bash
npm run analyze      # Analyze bundle size
npm run lighthouse   # Run Lighthouse performance audit
```

## Project Structure

```
/
├── app/                    # Next.js 14 App Router directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Homepage component
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components (buttons, inputs, etc.)
│   ├── sections/         # Main page sections (Hero, About, Skills, etc.)
│   └── layout/           # Layout components (Header, Footer, Navigation)
├── lib/                  # Utility functions and configurations
├── types/                # TypeScript type definitions
├── data/                 # Static data files (projects, skills)
└── public/               # Static assets (images, icons, fonts)
```

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript configuration
- ✅ Tailwind CSS with custom design system
- ✅ Framer Motion for animations
- ✅ React Hook Form with Zod validation
- ✅ ESLint and code quality tools
- ✅ Responsive design foundation
- 🚧 Hero section with animations (Next task)
- 🚧 About section with timeline
- 🚧 Skills section with interactive visualizations
- 🚧 Projects showcase with filtering
- 🚧 Contact form with validation
- 🚧 Performance optimization
- 🚧 Testing suite

## Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Implement responsive design (mobile-first)
- Ensure accessibility compliance
- Maintain 90+ Lighthouse performance scores
- Write clean, modular, reusable components

## License

This project is for portfolio demonstration purposes.
