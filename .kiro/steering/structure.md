# Project Structure

## Root Directory Organization

```
/
├── app/                    # Next.js 14 App Router directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage component
│   └── components/        # Page-specific components
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components (buttons, inputs, etc.)
│   ├── sections/         # Main page sections (Hero, About, Skills, etc.)
│   └── layout/           # Layout components (Header, Footer, Navigation)
├── lib/                  # Utility functions and configurations
├── types/                # TypeScript type definitions
├── data/                 # Static data files (projects, skills)
├── public/               # Static assets (images, icons, fonts)
└── styles/               # Additional CSS files if needed
```

## Component Architecture

### Section Components

- **Hero**: Animated introduction with typewriter effects
- **About**: Personal introduction with timeline animations
- **Skills**: Interactive skill visualization with animated cards
- **Projects**: Project showcase with modal details
- **Contact**: Form with validation and animated feedback

### Layout Components

- **Header**: Fixed navigation with smooth scroll
- **Footer**: Contact form and additional information
- **Navigation**: Mobile-responsive menu system

### UI Components

- **Button**: Reusable button with hover animations
- **Card**: Project and skill card components
- **Modal**: Project detail overlays
- **Form**: Input components with validation states

## Data Organization

### Project Data Structure

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: "web" | "mobile" | "desktop" | "other";
  images: string[];
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
}
```

### Skills Data Structure

```typescript
interface Skill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "tools" | "languages";
  proficiency: 1 | 2 | 3 | 4 | 5;
  icon: string;
  description?: string;
}
```

## Naming Conventions

- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Files**: kebab-case for non-components (e.g., `project-data.ts`)
- **Directories**: lowercase with hyphens
- **CSS Classes**: Tailwind utilities preferred, custom classes in kebab-case
- **Types**: PascalCase interfaces and types

## Import Organization

1. React and Next.js imports
2. Third-party library imports
3. Internal component imports
4. Type imports
5. Relative imports (./)
