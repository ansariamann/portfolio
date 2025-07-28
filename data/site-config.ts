import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Portfolio",
  title: "Aman - Software Engineer",
  description:
    "Modern portfolio website showcasing full-stack development skills, projects, and technical expertise. Built with Next.js, TypeScript, and Framer Motion.",
  url: "https://johndeveloper.dev",

  author: {
    name: "Aman Ansari",
    email: "iamamanansari786a@gmail.com",
    title: "Junior Software Developer",
    bio: "Passionate junior developer with expertise in modern web technologies. I love creating beautiful, functional applications that solve real-world problems. Always eager to learn new technologies and contribute to meaningful projects.",
    image: "/images/profile.svg",
  },

  contact: {
    email: "iamamanansari786a@gmail.com",
    phone: "+91 8149404438",
    location: "Pune ,IN",
    availability: "Open to new opportunities",
    socialLinks: [
      {
        name: "GitHub",
        url: "https://github.com/ansariamann",
        icon: "github",
        color: "#333",
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/-aman-ansari",
        icon: "linkedin",
        color: "#0077B5",
      },
      {
        name: "Twitter",
        url: "https://twitter.com/thoht_z",
        icon: "twitter",
        color: "#1DA1F2",
      },
      {
        name: "Email",
        url: "mailto:iamamanansari786a@gmail.com",
        icon: "mail",
        color: "#EA4335",
      },
    ],
  },

  seo: {
    title: "Aman Ansari - Full Stack Developer ",
    description:
      "Modern portfolio website showcasing full-stack development skills, projects, and technical expertise. Built with Next.js, TypeScript, and Framer Motion.",
    keywords: [
      "full stack developer",
      "web developer",
      "react developer",
      "next.js developer",
      "typescript developer",
      "frontend developer",
      "backend developer",
      "portfolio",
      "javascript",
      "node.js",
    ],
    author: "Aman Ansari",
    ogImage: "/images/og-image.jpg",
    canonicalUrl: "https://johndeveloper.dev",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Aman Ansari",
      jobTitle: "Junior Full Stack Developer",
      url: "https://johndeveloper.dev",
      email: "iamamanansari786a@gmail.com",
      image: "https://johndeveloper.dev/images/profile.svg",
      sameAs: [
        "https://github.com/ansariamann",
        "https://linkedin.com/in/-aman-ansari",
        "https://twitter.com/thoht_z",
      ],
      knowsAbout: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Python",
        "Web Development",
        "Full Stack Development",
      ],
    },
  },
};
