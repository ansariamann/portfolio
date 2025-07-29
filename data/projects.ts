import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Hospital Management System",
    description:
      "A comprehensive full-stack healthcare application with multi-role interfaces for patients, doctors, and administrators.",
    longDescription:
      "Developed a complete hospital management system featuring patient registration, appointment scheduling, doctor profiles, and administrative dashboards. The system includes multi-role authentication, real-time appointment management, and optimized database architecture for efficient healthcare operations.",
    technologies: ["PHP", "SQL", "XAMPP", "HTML", "CSS", "JavaScript", "MySQL"],
    category: "web",
    images: [
      "/images/projects/hospital-management-1.jpg",
      "/images/projects/hospital-management-2.jpg",
    ],
    githubUrl: "https://github.com/username/hospital-management-system",
    featured: true,
    completedDate: new Date("2023-01-15"),
    status: "completed",
    highlights: [
      "Multi-role interfaces for patients, doctors, and administrators",
      "Patient registration and appointment scheduling system",
      "Doctor profile management with availability tracking",
      "Optimized backend architecture reducing query time by 25%",
      "Real-time appointment management and notifications",
    ],
    challenges: [
      "Implementing secure multi-role authentication system",
      "Optimizing database queries for large healthcare datasets",
      "Designing intuitive interfaces for different user types",
      "Ensuring HIPAA compliance for patient data protection",
    ],
    learnings: [
      "Full-stack web development with PHP and MySQL",
      "Database optimization and query performance tuning",
      "Healthcare industry requirements and compliance",
      "Multi-role system architecture design",
    ],
  },
  {
    id: "2",
    title: "DDoS Attack Detection & Mitigation",
    description:
      "Advanced machine learning system for detecting and analyzing DDoS attacks using multiple ML algorithms and ensemble methods.",
    longDescription:
      "Designed and implemented a comprehensive DDoS attack detection system using machine learning techniques. The project involved training multiple models including SVM, Decision Trees, and LSTM on the CICDDoS2019 dataset, achieving 96% accuracy with Decision Trees. Applied advanced feature selection techniques to optimize model performance while maintaining high accuracy.",
    technologies: [
      "Python",
      "Scikit-learn",
      "Matplotlib",
      "Pandas",
      "NumPy",
      "HTML",
      "CSS",
      "LSTM",
    ],
    category: "other",
    images: [
      "/images/projects/ddos-detection-1.jpg",
      "/images/projects/ddos-detection-2.jpg",
    ],
    githubUrl: "#",
    featured: true,
    completedDate: new Date("2024-09-15"),
    status: "completed",
    highlights: [
      "Achieved 96% accuracy with Decision Tree model on CICDDoS2019 dataset",
      "Applied ExtraTrees feature selection reducing features from 87 to 20",
      "Developed MV-4 ensemble model for improved robustness",
      "Comprehensive comparison of ML algorithms (SVM, Decision Trees, LSTM)",
      "Real-time attack detection and visualization dashboard",
    ],
    challenges: [
      "Handling large-scale network traffic datasets efficiently",
      "Balancing model accuracy with computational performance",
      "Feature selection optimization without losing critical information",
      "Implementing real-time detection capabilities",
    ],
    learnings: [
      "Advanced machine learning techniques for cybersecurity",
      "Feature engineering and selection methodologies",
      "Ensemble learning and model optimization",
      "Network security and DDoS attack patterns",
    ],
  },
  {
    id: "3",
    title: "SmartShield - Malware Detection Solution",
    description:
      "Intelligent malware detection system using machine learning to classify executable files and detect phishing URLs.",
    longDescription:
      "Developed a comprehensive cybersecurity solution that combines malware detection and phishing URL identification. The system uses Random Forest algorithms trained on malware datasets to classify .exe files as malicious or legitimate. Additionally, it includes phishing URL detection capabilities to provide complete web security protection.",
    technologies: [
      "Python",
      "Scikit-learn",
      "Random Forest",
      "JavaScript",
      "HTML",
      "CSS",
      "Pickle",
      "Flask",
    ],
    category: "other",
    images: [
      "/images/projects/smartshield-1.jpg",
      "/images/projects/smartshield-2.jpg",
    ],
    githubUrl: "https://github.com/ansariamann/MALWARE",
    featured: true,
    completedDate: new Date("2025-04-15"),
    status: "completed",
    highlights: [
      "Random Forest algorithm for accurate malware classification",
      "Real-time .exe file analysis and threat assessment",
      "Phishing URL detection and prevention system",
      "Scalable pickle file implementation for model deployment",
      "User-friendly web interface for security analysis",
    ],
    challenges: [
      "Training models on large and diverse malware datasets",
      "Optimizing model performance for real-time file scanning",
      "Reducing false positives in malware detection",
      "Integrating multiple security features into one solution",
    ],
    learnings: [
      "Machine learning applications in cybersecurity",
      "Random Forest algorithm implementation and optimization",
      "Malware analysis and classification techniques",
      "Web application development for security tools",
    ],
  },
];
