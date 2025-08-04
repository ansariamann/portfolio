import React from "react";
import {
  // Technology icons from react-icons
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiVuedotjs,
  SiHtml5,
  SiCss3,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiDjango,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiGit,
  SiDocker,
  SiWebpack,
  SiVite,
  SiJest,
  SiCypress,
  SiAmazonwebservices,
  SiVercel,
  SiNetlify,
  SiFirebase,
} from "react-icons/si";

// Icon mapping for skills
export const skillIconMap: Record<
  string,
  React.ComponentType<{ size?: number; color?: string; className?: string }>
> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwind: SiTailwindcss,
  vue: SiVuedotjs,
  html: SiHtml5,
  css: SiCss3,
  sass: SiSass,
  nodejs: SiNodedotjs,
  express: SiExpress,
  python: SiPython,
  django: SiDjango,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,
  git: SiGit,
  docker: SiDocker,
  webpack: SiWebpack,
  vite: SiVite,
  jest: SiJest,
  cypress: SiCypress,
  aws: SiAmazonwebservices,
  vercel: SiVercel,
  netlify: SiNetlify,
  firebase: SiFirebase,
};

// Component to render skill icon
export const SkillIcon: React.FC<{
  skillId: string;
  className?: string;
  size?: number;
  color?: string;
}> = ({ skillId, className = "", size = 24, color }) => {
  const IconComponent = skillIconMap[skillId];

  if (!IconComponent) {
    // Fallback to first letter if icon not found
    return (
      <div
        className={`flex items-center justify-center rounded-md font-bold text-white ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: color || "#3B82F6",
          fontSize: size * 0.5,
        }}
      >
        {skillId.charAt(0).toUpperCase()}
      </div>
    );
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export default SkillIcon;
