"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CardProps } from "@/types";

export default function Card({
  className,
  children,
  hover = true,
  onClick,
}: CardProps) {
  const baseStyles =
    "bg-white rounded-lg shadow-md transition-shadow duration-300";
  const hoverStyles = hover ? "hover:shadow-lg cursor-pointer" : "";

  const cardClasses = cn(baseStyles, hoverStyles, className);

  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: hover ? 1.02 : 1 },
    tap: { scale: onClick ? 0.98 : 1 },
  };

  return (
    <motion.div
      className={cardClasses}
      onClick={onClick}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
