import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const footerNav = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Portfolio", href: "/#work" },
  { label: "Contact", href: "/#contact" },
  { label: "Projects", href: "/projects" },
  { label: "Case Studies", href: "/case-studies" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/ansariamann", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/-aman-ansari",
    label: "LinkedIn",
  },
  { icon: Twitter, href: "https://twitter.com/thoht_z", label: "Twitter" },
  {
    icon: Mail,
    href: `mailto:${siteConfig.contact?.email ?? ""}`,
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-background">
      <div className="container-main py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          <div>
            <p className="text-base font-bold text-foreground">
              © {new Date().getFullYear()} {siteConfig.author?.name ?? "Aman Ansari"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full-stack development. Systems thinking. Delivery you can ship and
              measure.
            </p>
          </div>

          <div>
            <p className="section-label mb-4">Sitemap</p>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label mb-4">Elsewhere</p>
            <ul className="space-y-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                  >
                    <social.icon size={14} aria-hidden />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
