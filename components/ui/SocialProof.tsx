"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMobileOptimizedAnimation } from "@/lib/hooks";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { IconType } from "react-icons";

interface SocialProofMetric {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface SocialProofProps {
  metrics?: SocialProofMetric[];
  socialLinks?: SocialLink[];
  className?: string;
}

const defaultMetrics: SocialProofMetric[] = [
  {
    value: "15+",
    label: "Projects Shipped",
    icon: ExternalLink,
  },
  {
    value: "Open Source",
    label: "Contributor",
    icon: Github,
  },
];

const defaultSocialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/ansariamann",
    icon: Github,
    label: "View GitHub Profile",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/-aman-ansari",
    icon: Linkedin,
    label: "Connect on LinkedIn",
  },
  {
    platform: "Email",
    url: "mailto:iamamanansari786a@gmail.com",
    icon: Mail,
    label: "Send Email",
  },
];

export function SocialProof({
  metrics = defaultMetrics,
  socialLinks = defaultSocialLinks,
  className = "",
}: SocialProofProps) {
  const {
    shouldReduceAnimations,
    isMobile,
    isSmallMobile,
    touchDevice,
    getTouchTargetSize,
  } = useMobileOptimizedAnimation();

  const touchTargetSize = getTouchTargetSize();

  const animationProps = shouldReduceAnimations
    ? {}
    : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: 0.5 },
    };

  return (
    <motion.div
      {...animationProps}
      className={cn(isMobile ? "space-y-4" : "space-y-6", className)}
    >
      {/* Social Proof Metrics - Mobile optimized */}
      <div
        className={cn(
          "flex flex-wrap justify-center lg:justify-start",
          isMobile ? "gap-3" : "gap-6"
        )}
        role="list"
        aria-label="Professional achievements and metrics"
      >
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;

          const itemAnimationProps = shouldReduceAnimations
            ? {}
            : {
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              transition: {
                duration: 0.4,
                delay: 0.6 + index * 0.1,
              },
            };

          return (
            <motion.div
              key={`${metric.value}-${metric.label}`}
              {...itemAnimationProps}
              className={cn(
                "flex items-center gap-2",
                isMobile ? "text-xs" : "text-sm"
              )}
              role="listitem"
              aria-label={`${metric.value} ${metric.label}`}
            >
              {IconComponent && (
                <IconComponent
                  className={cn(
                    "text-blue-400",
                    isMobile ? "w-3 h-3" : "w-4 h-4"
                  )}
                  aria-hidden="true"
                />
              )}
              <span className="font-semibold text-white">{metric.value}</span>
              <span className="text-gray-400">{metric.label}</span>
            </motion.div>
          );
        })}
      </div>


    </motion.div>
  );
}
