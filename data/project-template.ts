import { Project } from "@/types";

/**
 * Project Template Helper
 * This file provides templates and utilities for easily adding new projects
 * to the portfolio without needing to understand the entire data structure.
 */

/**
 * Creates a new project with default values
 * Only required fields need to be specified
 */
export function createProject(config: {
  // REQUIRED FIELDS
  title: string;
  description: string;
  technologies: string[];
  category: "web" | "mobile" | "desktop" | "other";
  
  // OPTIONAL FIELDS (with sensible defaults)
  id?: string;
  longDescription?: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  highlights?: string[];
  challenges?: string[];
  learnings?: string[];
  status?: "completed" | "in-progress" | "planned";
  completedDate?: Date;
  startDate?: Date;
  endDate?: Date;
}): Project {
  // Generate ID from title if not provided
  const id = config.id || config.title.toLowerCase().replace(/\s+/g, "-");
  
  // Use description as longDescription if not provided
  const longDescription = config.longDescription || config.description;
  
  // Default images (you should replace these with actual project images)
  const defaultImages = [
    `/images/projects/${id}-placeholder.svg`,
    `/images/projects/${id}-1.jpg`,
    `/images/projects/${id}-2.jpg`,
  ];
  
  return {
    id,
    title: config.title,
    description: config.description,
    longDescription,
    technologies: config.technologies,
    category: config.category,
    images: config.images || defaultImages,
    liveUrl: config.liveUrl,
    githubUrl: config.githubUrl || "#",
    featured: config.featured || false,
    highlights: config.highlights || [],
    challenges: config.challenges || [],
    learnings: config.learnings || [],
    status: config.status || "completed",
    completedDate: config.completedDate || new Date(),
    startDate: config.startDate,
    endDate: config.endDate,
  };
}

/**
 * Example: Web Development Project Template
 */
export const webProjectTemplate = (overrides: Partial<Project> = {}): Partial<Project> => ({
  category: "web",
  technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  status: "completed",
  featured: false,
  ...overrides,
});

/**
 * Example: Mobile App Project Template
 */
export const mobileProjectTemplate = (overrides: Partial<Project> = {}): Partial<Project> => ({
  category: "mobile",
  technologies: ["React Native", "TypeScript", "Firebase"],
  status: "completed",
  featured: false,
  ...overrides,
});

/**
 * Example: Machine Learning Project Template
 */
export const mlProjectTemplate = (overrides: Partial<Project> = {}): Partial<Project> => ({
  category: "other",
  technologies: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "NumPy"],
  status: "completed",
  featured: false,
  ...overrides,
});

/**
 * Example: Full-Stack Project Template
 */
export const fullStackProjectTemplate = (overrides: Partial<Project> = {}): Partial<Project> => ({
  category: "web",
  technologies: ["Node.js", "Express", "MongoDB", "React", "TypeScript"],
  status: "completed",
  featured: false,
  ...overrides,
});

/**
 * EXAMPLES: How to add new projects
 * Copy these examples and modify them for your projects
 */

// Example 1: Simple project with minimal config
export const exampleProject1 = createProject({
  title: "My Awesome Project",
  description: "A brief description of what the project does",
  technologies: ["React", "TypeScript", "Node.js"],
  category: "web",
  githubUrl: "https://github.com/yourusername/your-project",
});

// Example 2: Featured project with all details
export const exampleProject2 = createProject({
  title: "E-Commerce Platform",
  description: "A full-featured e-commerce platform with payment integration",
  longDescription: "Built a comprehensive e-commerce solution featuring user authentication, product management, shopping cart, payment gateway integration, and admin dashboard. The platform handles thousands of products and provides real-time inventory updates.",
  technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
  category: "web",
  githubUrl: "https://github.com/yourusername/ecommerce",
  liveUrl: "https://myecommerce.com",
  featured: true,
  status: "completed",
  completedDate: new Date("2024-03-15"),
  highlights: [
    "Implemented secure payment processing with Stripe",
    "Built real-time inventory management system",
    "Achieved 95+ Lighthouse performance score",
    "Designed responsive UI for mobile and desktop",
  ],
  challenges: [
    "Managing complex state across multiple pages",
    "Implementing secure payment workflows",
    "Optimizing database queries for large product catalogs",
  ],
  learnings: [
    "Payment gateway integration best practices",
    "Advanced TypeScript patterns",
    "Database optimization techniques",
    "Secure authentication implementation",
  ],
});

// Example 3: Using a template
export const exampleProject3 = createProject({
  title: "Portfolio Website",
  description: "Personal portfolio showcasing projects and skills",
  technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  category: "web",
  githubUrl: "https://github.com/yourusername/portfolio",
  featured: true,
});

/**
 * QUICK START GUIDE:
 * 
 * 1. Copy one of the example projects above
 * 2. Replace the values with your project details
 * 3. Add your project to the projects array in data/projects.ts
 * 
 * Example:
 * 
 * import { createProject } from "./project-template";
 * 
 * export const myNewProject = createProject({
 *   title: "Weather App",
 *   description: "A weather forecasting application",
 *   technologies: ["React", "OpenWeather API", "TypeScript"],
 *   category: "web",
 *   githubUrl: "https://github.com/yourusername/weather-app",
 *   liveUrl: "https://myweather.app",
 * });
 * 
 * Then in projects.ts, add it to the array:
 * export const projects: Project[] = [
 *   existingProject1,
 *   existingProject2,
 *   myNewProject,  // Your new project!
 * ];
 */
