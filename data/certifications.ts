import { Certification } from "@/types";

export const certifications: Certification[] = [
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "2024-01-15",
    expiryDate: "2027-01-15",
    credentialId: "AWS-CCP-2024-001",
    verificationUrl: "https://aws.amazon.com/verification/",
    badgeImage: "/images/certifications/placeholder.svg",
    category: "cloud",
    skills: ["aws", "cloud-computing", "architecture"],
    description:
      "Foundational understanding of AWS Cloud services and architecture",
    featured: true,
  },
  {
    id: "react-developer-certification",
    title: "React Developer Certification",
    issuer: "Meta",
    issueDate: "2023-11-20",
    expiryDate: "2025-11-20",
    credentialId: "META-REACT-2023-456",
    verificationUrl: "https://developers.facebook.com/certification/",
    badgeImage: "/images/certifications/placeholder.svg",
    category: "technical",
    skills: ["react", "javascript", "frontend"],
    description:
      "Advanced React development with hooks, context, and performance optimization",
    featured: true,
  },
  {
    id: "javascript-algorithms-data-structures",
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    issueDate: "2023-08-10",
    credentialId: "FCC-JS-2023-789",
    verificationUrl: "https://freecodecamp.org/certification/",
    badgeImage: "/images/certifications/placeholder.svg",
    category: "technical",
    skills: ["javascript", "algorithms", "data-structures"],
    description:
      "Comprehensive JavaScript programming with algorithms and data structures",
    featured: false,
  },
  {
    id: "responsive-web-design",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    issueDate: "2023-06-15",
    credentialId: "FCC-RWD-2023-123",
    verificationUrl: "https://freecodecamp.org/certification/",
    badgeImage: "/images/certifications/placeholder.svg",
    category: "technical",
    skills: ["html", "css", "responsive-design"],
    description:
      "Modern responsive web design with HTML5, CSS3, and accessibility",
    featured: false,
  },
  {
    id: "google-analytics-certified",
    title: "Google Analytics Certified",
    issuer: "Google",
    issueDate: "2023-09-05",
    expiryDate: "2024-09-05",
    credentialId: "GA-CERT-2023-567",
    verificationUrl: "https://skillshop.exceedlms.com/",
    badgeImage: "/images/certifications/placeholder.svg",
    category: "professional",
    skills: ["analytics", "data-analysis", "marketing"],
    description:
      "Web analytics and data-driven decision making with Google Analytics",
    featured: false,
  },
  {
    id: "scrum-master-certification",
    title: "Certified ScrumMaster (CSM)",
    issuer: "Scrum Alliance",
    issueDate: "2023-10-12",
    expiryDate: "2025-10-12",
    credentialId: "CSM-2023-890",
    verificationUrl: "https://www.scrumalliance.org/",
    badgeImage: "/images/certifications/placeholder.svg",
    category: "professional",
    skills: ["agile", "scrum", "project-management"],
    description: "Agile project management and Scrum framework implementation",
    featured: true,
  },
];

// Helper functions for working with certifications data
export const getCertificationsByCategory = (
  category: Certification["category"]
) => {
  return certifications.filter((cert) => cert.category === category);
};

export const getFeaturedCertifications = () => {
  return certifications.filter((cert) => cert.featured);
};

export const getCertificationById = (id: string) => {
  return certifications.find((cert) => cert.id === id);
};

export const getActiveCertifications = () => {
  const now = new Date();
  return certifications.filter((cert) => {
    if (!cert.expiryDate) return true;
    return new Date(cert.expiryDate) > now;
  });
};

export const getCertificationsBySkill = (skill: string) => {
  return certifications.filter((cert) =>
    cert.skills.includes(skill.toLowerCase())
  );
};

export const sortCertificationsByDate = (
  certs: Certification[],
  ascending = false
) => {
  return [...certs].sort((a, b) => {
    const dateA = new Date(a.issueDate);
    const dateB = new Date(b.issueDate);
    return ascending
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });
};
