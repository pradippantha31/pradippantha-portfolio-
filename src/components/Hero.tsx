import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ArrowRight,
  Download,
  MapPin,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const ROLES = [
  "CS Student & Full-Stack Developer",
  "Project Coordinator & Manager",
  "React & TypeScript Enthusiast",
  "Problem Solver & Tech Explorer",
];

const LINKEDIN_URL = "https://www.linkedin.com/in/panthapradip31";
const INSTAGRAM_URL = "https://www.instagram.com/v1system";
const GITHUB_URL = "https://github.com/pradippantha31/pradippantha-portfolio-";
const EMAIL_ADDRESS = "panthapradip31@gmail.com";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText.length < currentRole.length) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      }, 70);
    } else if (!isDeleting && displayText.length === currentRole.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      }, 40);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="top"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-5 sm:px-8 overflow-hidden"
    >
      {/* Background Animated Radial Gradient Orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/10 via-teal-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse-glow" />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-300 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-400" />
            </span>
            Available for Engineering & Coordination Roles
          </div>

          {/* Heading */}
          <h1 className="mt-6 font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Hi, I'm <span className="text-gradient">Pradip Pantha</span>
          </h1>

          {/* Typewriter Subtitle */}
          <div className="mt-4 h-9 flex items-center font-mono text-lg sm:text-xl text-sky-400 font-medium">
            <span>{displayText}</span>
            <span className="ml-1 w-2 h-5 bg-sky-400 animate-pulse" />
          </div>

          {/* Bio text */}
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A Computer Science student at{" "}
            <span className="text-foreground font-semibold">Herald College Kathmandu</span> with a
            passion for building user-focused web applications, coordinating software projects, and
            delivering reliable tech solutions.
          </p>

          {/* Meta Info Pills */}
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1.5 bg-card/60 border border-border/60 px-3 py-1.5 rounded-lg">
              <MapPin className="h-3.5 w-3.5 text-sky-400" />
              Kathmandu, Nepal
            </div>
            <div className="flex items-center gap-1.5 bg-card/60 border border-border/60 px-3 py-1.5 rounded-lg">
              <Sparkles className="h-3.5 w-3.5 text-teal-400" />
              Web Development & Coordination
            </div>
          </div>

          {/* CTA Buttons with Magnetic Hover */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href="#projects">
              <div className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02] active:scale-[0.98]">
                <span>Explore Featured Work</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </MagneticButton>

            <MagneticButton href="/cv.pdf" target="_blank" rel="noreferrer">
              <div className="inline-flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-6 py-3.5 text-sm font-semibold text-sky-300 backdrop-blur-md transition-colors hover:bg-sky-500/20 hover:border-sky-400">
                <Download className="h-4 w-4 text-sky-400" />
                <span>Download CV (PDF)</span>
              </div>
            </MagneticButton>

            <MagneticButton href="#contact">
              <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:bg-muted hover:border-sky-500/50">
                <Mail className="h-4 w-4 text-sky-400" />
                <span>Get In Touch</span>
              </div>
            </MagneticButton>
          </div>

          {/* Social Links Bar */}
          <div className="mt-10 flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mr-1">
              Connect:
            </span>
            <SocialIcon
              href={LINKEDIN_URL}
              icon={<Linkedin className="h-4 w-4" />}
              label="LinkedIn"
            />
            <SocialIcon
              href={INSTAGRAM_URL}
              icon={<Instagram className="h-4 w-4" />}
              label="Instagram"
            />
            <SocialIcon href={GITHUB_URL} icon={<Github className="h-4 w-4" />} label="GitHub" />
            <SocialIcon
              href={`mailto:${EMAIL_ADDRESS}`}
              icon={<Mail className="h-4 w-4" />}
              label="Email"
            />
          </div>
        </motion.div>

        {/* Right Column: Profile Image with Floating Card Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group w-72 sm:w-80">
            {/* Outer Glow Ring */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500 via-teal-400 to-indigo-500 opacity-60 blur-xl group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow" />

            {/* Profile Card Container */}
            <div className="relative rounded-3xl border border-sky-500/30 bg-card/90 p-4 shadow-2xl backdrop-blur-xl animate-float-slow">
              <div className="relative overflow-hidden rounded-2xl aspect-square">
                <img
                  src="/images/avatar.png"
                  alt="Pradip Pantha"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                    Pradip Pantha
                  </p>
                  <p className="text-sm font-bold text-white">Full Stack & Coordination</p>
                </div>
              </div>

              {/* Floating Badge Overlay */}
              <div className="absolute -bottom-4 -right-4 rounded-xl border border-teal-500/40 bg-background/90 p-3 shadow-xl backdrop-blur-md flex items-center gap-2.5">
                <div className="rounded-lg bg-teal-500/20 p-2 text-teal-300">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Status</p>
                  <p className="text-xs font-bold text-foreground">Ready to Build & Ship</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <MagneticButton href={href} target="_blank" rel="noreferrer" ariaLabel={label}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/70 text-muted-foreground transition-all hover:border-sky-400 hover:text-sky-300 hover:bg-sky-500/10 shadow-sm">
        {icon}
      </div>
    </MagneticButton>
  );
}
