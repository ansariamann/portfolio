import { TimelineItem, Achievement } from "@/types";

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  current?: boolean;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "1",
    role: "Full Stack Java & ML Developer",
    company: "Coneio",
    period: "2025",
  },
  {
    id: "2",
    role: "Computer Science Student",
    company: "SGGSIET",
    period: "2021 — 2025",
    current: false,
  },
  {
    id: "3",
    role: "Open Source Contributor",
    company: "GitHub",
    period: "2024 — Present",
    current: true,
  },
];

export const profileStats = [
  {
    label: "Years in development",
    value: "1+",
  },
  {
    label: "Roles considered",
    value: "Full-time · contract · internship · junior IC",
  },
  {
    label: "Latest role",
    value: "Full Stack Java Developer, Coneio",
  },
  {
    label: "How I work",
    value: "Pune-based, remote-friendly, async or sync.",
  },
];

export const timelineData: TimelineItem[] = [
  {
    id: "1",
    title: "Started Programming Journey",
    period: "2022",
    description:
      "Began learning web development through online courses and tutorials, focusing on HTML, CSS, and JavaScript fundamentals.",
    technologies: ["HTML", "CSS", "JavaScript"],
    type: "education",
  },
  {
    id: "2",
    title: "Computer Science Student",
    company: "Tech University",
    period: "2022 - Present",
    description:
      "Pursuing Bachelor's degree in Computer Science with focus on software engineering and web technologies.",
    technologies: ["Java", "Python", "Data Structures", "Algorithms"],
    type: "education",
  },
  {
    id: "3",
    title: "First React Project",
    period: "2023",
    description:
      "Built my first React application - a task management app with local storage and responsive design.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    type: "project",
  },
  {
    id: "4",
    title: "Full Stack Java & AWS Developer",
    company: "StartupCo",
    period: "Summer 2023",
    description:
      "Contributed to the company's main product by implementing backend services in Java Spring Boot, machine learning models, and deploying on AWS.",
    technologies: ["Java", "Spring Boot", "AWS", "Machine Learning"],
    type: "work",
  },
  {
    id: "5",
    title: "Java & Machine Learning Certification",
    company: "FreeCodeCamp",
    period: "2023",
    description:
      "Completed comprehensive certification covering Java development, Machine Learning algorithms, and AWS cloud architecture.",
    technologies: ["Java", "Python", "AWS", "Machine Learning"],
    type: "achievement",
  },
  {
    id: "6",
    title: "Open Source Contributor",
    period: "2024",
    description:
      "Started contributing to open source projects, focusing on React components and documentation improvements.",
    technologies: ["React", "TypeScript", "Git", "GitHub"],
    type: "achievement",
  },
];

export const achievementsData: Achievement[] = [
  {
    id: "1",
    title: "Projects Completed",
    description: "Personal and professional projects built",
    value: "12+",
    icon: "🚀",
    color: "#3B82F6",
    date: new Date("2024-01-01"),
    category: "milestone",
  },
  {
    id: "2",
    title: "Technologies Learned",
    description: "Programming languages and frameworks mastered",
    value: "15+",
    icon: "💻",
    color: "#8B5CF6",
    date: new Date("2024-01-01"),
    category: "milestone",
  },
  {
    id: "3",
    title: "GitHub Contributions",
    description: "Commits made to various repositories",
    value: "500+",
    icon: "📊",
    color: "#10B981",
    date: new Date("2024-01-01"),
    category: "milestone",
  },
  {
    id: "4",
    title: "AI Agents Shipped",
    description:
      "Autonomous agents built to research, plan, and execute real-world tasks",
    value: "10+",
    icon: "🤖",
    color: "#F59E0B",
    date: new Date("2024-01-01"),
    category: "milestone",
  },
];
