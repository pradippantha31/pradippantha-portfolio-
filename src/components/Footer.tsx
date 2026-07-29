import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { ArrowUp, Github, Linkedin, Instagram, Mail, Heart } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/in/panthapradip31";
const INSTAGRAM_URL = "https://www.instagram.com/v1system";
const GITHUB_URL = "https://github.com/pradippantha31/pradippantha-portfolio-";
const EMAIL_ADDRESS = "panthapradip31@gmail.com";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border/60 bg-background/80 py-12 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Copyright & Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <p className="font-display font-bold text-foreground text-base">
            Pradip Pantha <span className="text-sky-400">.</span> Portfolio
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pradip Pantha · All rights reserved.
          </p>
        </motion.div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-3">
          <FooterSocialIcon
            href={LINKEDIN_URL}
            icon={<Linkedin className="h-4 w-4" />}
            label="LinkedIn"
          />
          <FooterSocialIcon
            href={INSTAGRAM_URL}
            icon={<Instagram className="h-4 w-4" />}
            label="Instagram"
          />
          <FooterSocialIcon
            href={GITHUB_URL}
            icon={<Github className="h-4 w-4" />}
            label="GitHub"
          />
          <FooterSocialIcon
            href={`mailto:${EMAIL_ADDRESS}`}
            icon={<Mail className="h-4 w-4" />}
            label="Email"
          />
        </div>

        {/* Right: Back to Top Button */}
        <div>
          <MagneticButton onClick={scrollToTop} ariaLabel="Back to top">
            <div className="group flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-xs font-semibold text-foreground backdrop-blur-md transition-all hover:border-sky-400 hover:text-sky-300 shadow-sm">
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 text-sky-400" />
            </div>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}

function FooterSocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <MagneticButton href={href} target="_blank" rel="noreferrer" ariaLabel={label}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground transition-all hover:border-sky-400 hover:text-sky-300 hover:bg-sky-500/10">
        {icon}
      </div>
    </MagneticButton>
  );
}
