import { TimelineItem, Achievement } from "@/types";

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
    title: "Frontend Development Intern",
    company: "StartupCo",
    period: "Summer 2023",
    description:
      "Contributed to the company's main product by implementing new features and fixing bugs in the React frontend.",
    technologies: ["React", "Next.js", "TypeScript", "Styled Components"],
    type: "work",
  },
  {
    id: "5",
    title: "Full Stack Certification",
    company: "FreeCodeCamp",
    period: "2023",
    description:
      "Completed comprehensive full-stack web development certification covering both frontend and backend technologies.",
    technologies: ["Node.js", "Express", "MongoDB", "React"],
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
    title: "Learning Hours",
    description: "Hours dedicated to coding and learning",
    value: "1000+",
    icon: "⏰",
    color: "#F59E0B",
    date: new Date("2024-01-01"),
    category: "milestone",
  },
];
