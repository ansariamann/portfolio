import { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend Technologies
  {
    id: "react",
    name: "React",
    category: "frontend",
    proficiency: 3,
    icon: "react",
    description:
      "Building interactive user interfaces with hooks, context, and modern patterns",
    yearsOfExperience: 0.1,
    color: "#61DAFB",
    relatedSkills: ["javascript", "typescript", "nextjs", "redux"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    proficiency: 3,
    icon: "nextjs",
    description: "Full-stack React framework with SSR, SSG, and API routes",
    yearsOfExperience: 0.5,
    color: "#000000",
    relatedSkills: ["react", "typescript", "vercel", "tailwind"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "languages",
    proficiency: 2,
    icon: "typescript",
    description:
      "Type-safe JavaScript development with advanced type system knowledge",
    yearsOfExperience: 0.5,
    color: "#3178C6",
    relatedSkills: ["javascript", "react", "nodejs", "nextjs"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    proficiency: 3,
    icon: "javascript",
    description:
      "Modern ES6+ JavaScript with deep understanding of core concepts",
    yearsOfExperience: 1,
    color: "#F7DF1E",
    relatedSkills: ["typescript", "react", "nodejs", "vue"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    proficiency: 5,
    icon: "tailwind",
    description: "Utility-first CSS framework for rapid UI development",
    yearsOfExperience: 1,
    color: "#06B6D4",
    relatedSkills: ["css", "html", "react", "nextjs"],
  },
  {
    id: "vue",
    name: "Vue.js",
    category: "frontend",
    proficiency: 3,
    icon: "vue",
    description:
      "Progressive JavaScript framework with composition API experience",
    yearsOfExperience: 0,
    color: "#4FC08D",
    relatedSkills: ["javascript", "typescript", "vuex", "nuxt"],
  },
  {
    id: "html",
    name: "HTML5",
    category: "frontend",
    proficiency: 5,
    icon: "html",
    description: "Semantic HTML with accessibility and SEO best practices",
    yearsOfExperience: 1.5,
    color: "#E34F26",
    relatedSkills: ["css", "javascript", "accessibility"],
  },
  {
    id: "css",
    name: "CSS3",
    category: "frontend",
    proficiency: 4,
    icon: "css",
    description:
      "Modern CSS with Flexbox, Grid, animations, and responsive design",
    yearsOfExperience: 1,
    color: "#1572B6",
    relatedSkills: ["html", "sass", "tailwind", "styled-components"],
  },
  {
    id: "sass",
    name: "Sass/SCSS",
    category: "frontend",
    proficiency: 2,
    icon: "sass",
    description:
      "CSS preprocessor with mixins, variables, and modular architecture",
    yearsOfExperience: 0,
    color: "#CC6699",
    relatedSkills: ["css", "html", "bem"],
  },

  // Backend Technologies
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    proficiency: 3,
    icon: "nodejs",
    description: "Server-side JavaScript with Express, APIs, and microservices",
    yearsOfExperience: 0.5,
    color: "#339933",
    relatedSkills: ["javascript", "typescript", "express", "mongodb"],
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    proficiency: 2,
    icon: "express",
    description: "Fast, minimalist web framework for Node.js applications",
    yearsOfExperience: 0.1,
    color: "#000000",
    relatedSkills: ["nodejs", "javascript", "mongodb", "postgresql"],
  },
  {
    id: "python",
    name: "Python",
    category: "languages",
    proficiency: 3,
    icon: "python",
    description:
      "General-purpose programming with Django, Flask, and data analysis",
    yearsOfExperience: 1.5,
    color: "#3776AB",
    relatedSkills: ["django", "flask", "pandas", "numpy"],
  },
  {
    id: "django",
    name: "Django",
    category: "backend",
    proficiency: 3,
    icon: "django",
    description: "High-level Python web framework with ORM and admin interface",
    yearsOfExperience: 1,
    color: "#092E20",
    relatedSkills: ["python", "postgresql", "rest-api"],
  },

  // Databases
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "databases",
    proficiency: 4,
    icon: "postgresql",
    description:
      "Advanced relational database with complex queries and optimization",
    yearsOfExperience: 0.1,
    color: "#336791",
    relatedSkills: ["sql", "prisma", "nodejs", "django"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "databases",
    proficiency: 3,
    icon: "mongodb",
    description: "NoSQL document database with aggregation and indexing",
    yearsOfExperience: 0.5,
    color: "#47A248",
    relatedSkills: ["nodejs", "express", "mongoose"],
  },

  // Tools & Technologies
  {
    id: "git",
    name: "Git",
    category: "tools",
    proficiency: 4,
    icon: "git",
    description:
      "Version control with branching strategies and collaborative workflows",
    yearsOfExperience: 1,
    color: "#F05032",
    relatedSkills: ["github", "gitlab", "ci-cd"],
  },
  {
    id: "docker",
    name: "Docker",
    category: "tools",
    proficiency: 3,
    icon: "docker",
    description: "Containerization for development and deployment environments",
    yearsOfExperience: 1,
    color: "#2496ED",
    relatedSkills: ["kubernetes", "ci-cd", "devops"],
  },

  // Cloud & DevOps
  {
    id: "aws",
    name: "AWS",
    category: "cloud",
    proficiency: 2,
    icon: "aws",
    description: "Cloud services including EC2, S3, Lambda, and RDS",
    yearsOfExperience: 0.5,
    color: "#FF9900",
    relatedSkills: ["cloud", "serverless", "devops"],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "cloud",
    proficiency: 4,
    icon: "vercel",
    description: "Frontend deployment platform with serverless functions",
    yearsOfExperience: 0.5,
    color: "#000000",
    relatedSkills: ["nextjs", "react", "deployment"],
  },
  {
    id: "netlify",
    name: "Netlify",
    category: "cloud",
    proficiency: 4,
    icon: "netlify",
    description: "JAMstack deployment with continuous integration and forms",
    yearsOfExperience: 0.1,
    color: "#00C7B7",
    relatedSkills: ["jamstack", "ci-cd", "static-sites"],
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "cloud",
    proficiency: 3,
    icon: "firebase",
    description:
      "Backend-as-a-Service with authentication, database, and hosting",
    yearsOfExperience: 1,
    color: "#FFCA28",
    relatedSkills: ["authentication", "realtime-db", "hosting"],
  },
];

// Helper functions for working with skills data
export const getSkillsByCategory = (category: Skill["category"]) => {
  return skills.filter((skill) => skill.category === category);
};

export const getFeaturedSkills = () => {
  return skills.filter((skill) => skill.proficiency >= 4);
};

export const getSkillById = (id: string) => {
  return skills.find((skill) => skill.id === id);
};

export const getRelatedSkills = (skillId: string) => {
  const skill = getSkillById(skillId);
  if (!skill || !skill.relatedSkills) return [];

  return skill.relatedSkills
    .map((id) => getSkillById(id))
    .filter(Boolean) as Skill[];
};
