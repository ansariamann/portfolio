import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Background } from "@/components/ui/Background";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={cn("min-h-screen flex flex-col relative", className)}>
      <Background />
      {children}
    </div>
  );
}
