import SectionHeader from "@/components/ui/SectionHeader";
import ContactForm from "@/components/ui/ContactForm";
import { siteConfig } from "@/data/site-config";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

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

export default function ContactSection() {
  return (
    <section id="contact" className="section-shell border-t border-ink/10">
      <div className="container-main">
        <SectionHeader
          label="Contact"
          title="Say hello — roles, contracts, or consulting."
          description="Tell me what you're building, the role or engagement type, and your timeline. Short briefs beat polished vagueness."
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
          <div>
            <div className="mt-4">
              <p className="section-label mb-4">Social</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 rounded-xl border border-ink/10 bg-surface px-4 py-5 text-sm font-semibold text-muted-foreground transition-all hover:border-accent/40 hover:text-foreground hover:shadow-card"
                  >
                    <social.icon size={20} aria-hidden />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="surface-card p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
