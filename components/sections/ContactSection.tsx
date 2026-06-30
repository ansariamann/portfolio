import ContactForm from "@/components/ui/ContactForm";
import { siteConfig } from "@/data/site-config";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/-aman-ansari",
    label: "LinkedIn",
    bgColor: "bg-[#0a66c2] hover:bg-[#0077b5]",
  },
  {
    icon: Github,
    href: "https://github.com/ansariamann",
    label: "GitHub",
    bgColor: "bg-[#24292f] hover:bg-[#1f2328]",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/thoht_z",
    label: "Twitter",
    bgColor: "bg-black hover:bg-zinc-900",
  },
  {
    icon: Mail,
    href: `mailto:${siteConfig.contact?.email ?? ""}`,
    label: "Email",
    bgColor: "bg-accent hover:bg-accent-hover",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-shell border-t border-ink/10">
      <div className="container-main">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] items-start max-w-7xl mx-auto">
          {/* Left Column: Heading, Description, and Socials */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full border border-ink/10 bg-secondary px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Contact
              </span>
            </div>

            <h2 className="text-[2.5rem] md:text-[3rem] font-bold tracking-tight text-foreground leading-[1.12] mb-6">
              Say hello — roles, contracts, or consulting.
            </h2>

            <p className="text-lg text-muted-foreground/90 leading-relaxed max-w-lg mb-12">
              Tell me what you&apos;re building, the role or engagement type,
              and your timeline. Short briefs beat polished vagueness.
            </p>

            <div className="mt-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-4">
                Social Grid
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-md lg:max-w-none">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-full min-h-[3.25rem] px-5 py-3 font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md",
                      social.bgColor
                    )}
                  >
                    <social.icon size={16} className="flex-shrink-0" />
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="surface-card p-8 md:p-12 lg:p-14">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
