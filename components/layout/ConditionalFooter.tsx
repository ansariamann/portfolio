"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isSubPage = pathname === "/case-studies" || pathname === "/projects";

  if (isSubPage) {
    return null;
  }

  return <Footer />;
}
