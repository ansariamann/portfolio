"use client";

import React, {
  lazy,
  Suspense,
  ComponentType,
  ReactNode,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { motion } from "framer-motion";

// Loading fallback component
const LoadingFallback = ({
  height = "200px",
  className = "",
  message = "",
}: {
  height?: string;
  className?: string;
  message?: string;
}) => (
  <div
    className={`flex items-center justify-center ${className}`}
    style={{ minHeight: height }}
    role="status"
    aria-label="Loading"
  >
    <motion.div
      className="flex flex-col items-center space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </motion.div>
  </div>
);

// Lazy loaded components for hero section
export const LazyValueProposition = lazy(() =>
  import("@/components/ui/ValueProposition").then((module) => ({
    default: module.ValueProposition,
  }))
);

export const LazyCTAButtons = lazy(() =>
  import("@/components/ui/CTAButtons").then((module) => ({
    default: module.CTAButtons,
  }))
);

export const LazyTechStack = lazy(() =>
  import("@/components/ui/TechStack").then((module) => ({
    default: module.TechStack,
  }))
);

export const LazySocialProof = lazy(() =>
  import("@/components/ui/SocialProof").then((module) => ({
    default: module.SocialProof,
  }))
);

export const LazyVisualAnchor = lazy(() =>
  import("@/components/ui/VisualAnchor").then((module) => ({
    default: module.VisualAnchor,
  }))
);

// Generic lazy wrapper with error boundary
interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  height?: string;
  className?: string;
  loadingMessage?: string;
  errorMessage?: string;
}

export const LazyWrapper = ({
  children,
  fallback,
  height = "200px",
  className = "",
  loadingMessage = "",
  errorMessage = "Failed to load component",
}: LazyWrapperProps) => {
  const defaultFallback = (
    <LoadingFallback
      height={height}
      className={className}
      message={loadingMessage}
    />
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <ErrorBoundary
        fallback={
          <div
            className={`flex items-center justify-center ${className}`}
            style={{ minHeight: height }}
          >
            <div className="text-center">
              <div className="text-red-500 mb-2">⚠️</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {errorMessage}
              </p>
            </div>
          </div>
        }
      >
        {children}
      </ErrorBoundary>
    </Suspense>
  );
};

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Lazy component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Higher-order component for lazy loading with intersection observer
export function withLazyLoading<P extends object>(
  Component: ComponentType<P>,
  options: {
    threshold?: number;
    rootMargin?: string;
    fallbackHeight?: string;
    loadingMessage?: string;
  } = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "50px",
    fallbackHeight = "200px",
    loadingMessage = "",
  } = options;

  return function LazyLoadedComponent(props: P) {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold, rootMargin }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, [threshold, rootMargin]);

    React.useEffect(() => {
      if (isVisible) {
        // Simulate component loading
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
      }
    }, [isVisible]);

    return (
      <div ref={ref}>
        {isVisible && isLoaded ? (
          <Component {...props} />
        ) : (
          <LoadingFallback height={fallbackHeight} message={loadingMessage} />
        )}
      </div>
    );
  };
}

// Preload utility for critical components
export const preloadComponent = (componentImport: () => Promise<any>) => {
  if (typeof window !== "undefined") {
    // Preload on idle or after a short delay
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => componentImport());
    } else {
      setTimeout(() => componentImport(), 100);
    }
  }
};

// Preload critical hero components
export const preloadHeroComponents = () => {
  preloadComponent(() => import("@/components/ui/ValueProposition"));
  preloadComponent(() => import("@/components/ui/CTAButtons"));
  preloadComponent(() => import("@/components/ui/VisualAnchor"));
};

// Component registry for dynamic loading
const componentRegistry = {
  ValueProposition: () => import("@/components/ui/ValueProposition"),
  CTAButtons: () => import("@/components/ui/CTAButtons"),
  TechStack: () => import("@/components/ui/TechStack"),
  SocialProof: () => import("@/components/ui/SocialProof"),
  VisualAnchor: () => import("@/components/ui/VisualAnchor"),
} as const;

export type ComponentName = keyof typeof componentRegistry;

// Dynamic component loader
export const loadComponent = async (name: ComponentName) => {
  try {
    const componentModule = await componentRegistry[name]();
    return (componentModule as any).default || (componentModule as any)[name];
  } catch (error) {
    console.error(`Failed to load component ${name}:`, error);
    throw error;
  }
};

// Progressive loading hook
export const useProgressiveLoading = (components: ComponentName[]) => {
  const [loadedComponents, setLoadedComponents] = React.useState<
    Set<ComponentName>
  >(new Set());
  const [isLoading, setIsLoading] = React.useState(false);

  const loadComponents = React.useCallback(async () => {
    setIsLoading(true);

    for (const componentName of components) {
      try {
        await loadComponent(componentName);
        setLoadedComponents(
          (prev) => new Set(Array.from(prev).concat(componentName))
        );
      } catch (error) {
        console.error(`Failed to load ${componentName}:`, error);
      }
    }

    setIsLoading(false);
  }, [components]);

  React.useEffect(() => {
    loadComponents();
  }, [loadComponents]);

  return {
    loadedComponents,
    isLoading,
    isComponentLoaded: (name: ComponentName) => loadedComponents.has(name),
  };
};

export default LazyWrapper;
