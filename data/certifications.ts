import { Certification } from "@/types";

export const certifications: Certification[] = [
  {
    id: "oracle-data-science-professional",
    title:
      "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
    issuer: "Oracle University",
    issueDate: "2025-10-31",
    expiryDate: "2027-10-31",
    credentialId: "1OZ415192OCI25DSOCP",
    verificationUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=1OZ415192OCI25DSOCP",
    badgeImage: "/images/certifications/datascience.png",
    category: "cloud",
    skills: ["oracle-cloud", "data-science", "machine-learning", "ai"],
    description:
      "Oracle Certified Professional in Cloud Infrastructure Data Science",
    featured: true,
  },
  {
    id: "oracle-developer-professional",
    title: "Oracle Cloud Infrastructure 2025 Certified Developer Professional",
    issuer: "Oracle University",
    issueDate: "2025-10-23",
    expiryDate: "2027-10-23",
    credentialId: "1OZ415192OCID25CP",
    verificationUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=1OZ415192OCID25CP",
    badgeImage: "/images/certifications/developerprofessional.png",
    category: "cloud",
    skills: ["oracle-cloud", "cloud-development", "infrastructure", "devops"],
    description:
      "Oracle Certified Professional in Cloud Infrastructure Development",
    featured: true,
  },
  {
    id: "oracle-generative-ai-professional",
    title:
      "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle University",
    issueDate: "2025-09-01",
    expiryDate: "2027-09-01",
    credentialId: "1OZ415192OCI25GAIOCP",
    verificationUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=1OZ415192OCI25GAIOCP",
    badgeImage: "/images/certifications/aiprofessional.png",
    category: "cloud",
    skills: ["oracle-cloud", "generative-ai", "artificial-intelligence", "llm"],
    description:
      "Oracle Certified Professional in Cloud Infrastructure Generative AI",
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
