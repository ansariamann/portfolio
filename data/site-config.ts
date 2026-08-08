import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Portfolio",
  title: "Aman - Full Stack Java, ML & AWS Engineer",
  description:
    "Modern portfolio website showcasing expertise as a Full Stack Java Developer, with specializations in Machine Learning and AWS.",
  url: "https://johndeveloper.dev",

  author: {
    name: "Aman Ansari",
    email: "iamamanansari786a@gmail.com",
    title: "Full Stack Java, ML & AWS Developer",
    bio: "Passionate developer with expertise in Full Stack Java, Machine Learning, and AWS cloud infrastructure. I love creating beautiful, functional applications and building scalable, intelligent systems that solve real-world problems. Always eager to learn new technologies and contribute to meaningful projects.",
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
    title: "Aman Ansari - Full Stack Java, ML & AWS Engineer ",
    description:
      "Modern portfolio website showcasing expertise as a Full Stack Java Developer, with specializations in Machine Learning and AWS.",
    keywords: [
      "full stack developer",
      "java developer",
      "machine learning",
      "aws",
      "cloud computing",
      "spring boot",
      "react developer",
      "next.js developer",
      "typescript developer",
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
      jobTitle: "Full Stack Java, ML & AWS Engineer",
      url: "https://johndeveloper.dev",
      email: "iamamanansari786a@gmail.com",
      image: "https://johndeveloper.dev/images/profile.svg",
      sameAs: [
        "https://github.com/ansariamann",
        "https://linkedin.com/in/-aman-ansari",
        "https://twitter.com/thoht_z",
      ],
      knowsAbout: [
        "Java",
        "Spring Boot",
        "Machine Learning",
        "AWS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Python",
        "Full Stack Development",
      ],
    },
  },
};
