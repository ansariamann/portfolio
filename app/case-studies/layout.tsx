import type { ReactNode } from "react";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export default function CaseStudiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
