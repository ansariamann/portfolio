"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
// Removed ThemeProvider import - component doesn't exist

import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div
      className={cn("min-h-screen flex flex-col", "scroll-smooth", className)}
    >
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
