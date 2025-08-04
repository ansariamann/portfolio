"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <ThemeProvider>
      <div
        className={cn("min-h-screen flex flex-col", "scroll-smooth", className)}
      >
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </ThemeProvider>
  );
}
