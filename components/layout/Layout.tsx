"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Header from "./Header";
import { Background } from "@/components/ui/Background";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div
      className={cn("min-h-screen flex flex-col relative", "scroll-smooth", className)}
    >
      <Background />
      <Header />
      <main className="flex-1 relative z-10">{children}</main>
    </div>
  );
}
