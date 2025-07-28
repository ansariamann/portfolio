"use client";

import { motion } from "framer-motion";

interface SkeletonLoaderProps {
  variant?: "text" | "image" | "card" | "avatar" | "button";
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
  animate?: boolean;
}

export default function SkeletonLoader({
  variant = "text",
  width,
  height,
  className = "",
  count = 1,
  animate = true,
}: SkeletonLoaderProps) {
  const getSkeletonClasses = () => {
    const baseClasses =
      "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded";

    switch (variant) {
      case "text":
        return `${baseClasses} h-4 w-full`;
      case "image":
        return `${baseClasses} w-full h-48`;
      case "card":
        return `${baseClasses} w-full h-64`;
      case "avatar":
        return `${baseClasses} w-12 h-12 rounded-full`;
      case "button":
        return `${baseClasses} h-10 w-24`;
      default:
        return baseClasses;
    }
  };

  const skeletonStyle = {
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height && {
      height: typeof height === "number" ? `${height}px` : height,
    }),
  };

  const SkeletonElement = ({ index }: { index: number }) => (
    <motion.div
      key={index}
      className={`${getSkeletonClasses()} ${className}`}
      style={skeletonStyle}
      initial={{ opacity: 0.6 }}
      animate={
        animate
          ? {
              opacity: [0.6, 1, 0.6],
            }
          : {}
      }
      transition={
        animate
          ? {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1,
            }
          : {}
      }
    />
  );

  if (count === 1) {
    return <SkeletonElement index={0} />;
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, index) => (
        <SkeletonElement key={index} index={index} />
      ))}
    </div>
  );
}

// Predefined skeleton layouts for common use cases
export const ProjectCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
    <SkeletonLoader variant="image" height="192px" />
    <SkeletonLoader variant="text" width="80%" />
    <SkeletonLoader variant="text" width="60%" />
    <div className="flex gap-2">
      <SkeletonLoader variant="button" width="60px" height="24px" />
      <SkeletonLoader variant="button" width="80px" height="24px" />
      <SkeletonLoader variant="button" width="70px" height="24px" />
    </div>
  </div>
);

export const SkillCardSkeleton = () => (
  <div className="bg-white rounded-lg p-4 space-y-3">
    <div className="flex items-center gap-3">
      <SkeletonLoader variant="avatar" width="40px" height="40px" />
      <SkeletonLoader variant="text" width="120px" />
    </div>
    <SkeletonLoader variant="text" width="100%" height="8px" />
  </div>
);

export const HeroSkeleton = () => (
  <div className="text-center space-y-6">
    <SkeletonLoader
      variant="avatar"
      width="120px"
      height="120px"
      className="mx-auto"
    />
    <SkeletonLoader
      variant="text"
      width="300px"
      height="32px"
      className="mx-auto"
    />
    <SkeletonLoader
      variant="text"
      width="400px"
      height="20px"
      className="mx-auto"
    />
    <div className="flex justify-center gap-4">
      <SkeletonLoader variant="button" width="120px" height="44px" />
      <SkeletonLoader variant="button" width="120px" height="44px" />
    </div>
  </div>
);
