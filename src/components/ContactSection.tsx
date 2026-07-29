import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { MagneticButton } from "./MagneticButton";
import {
  Mail,
  Send,
  CheckCircle2,
  Linkedin,
  Instagram,
  Github,
  Loader2,
  MessageSquare,
} from "lucide-react";

const EMAIL_ADDRESS = "panthapradip31@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/panthapradip31";
const INSTAGRAM_URL = "https://www.instagram.com/v1system";
const GITHUB_URL = "https://github.com/pradippantha31/pradippantha-portfolio-";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#2dd4bf", "#818cf8"],
      });
    }, 1000);
  };

  const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${name || "Recruiter"}`,
  )}&body=${encodeURIComponent(`Hi Pradip,\n\n${message}\n\nFrom: ${name} (${email})`)}`;

  return (
    <section id="contact" className="py-24 px-5 sm:px-8 max-w-5xl mx-auto scroll-mt-16 relative">
      {/* Floating Background Ambient Gradient Blurs */}
      <div className="pointer-events-none absolute -top-10 left-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -bottom-10 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-glow" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
          <MessageSquare className="h-3.5 w-3.5" />
          Let's Connect
        </div>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Get In Touch
        </h2>
        <p className="mt-3 text-muted-foreground text-base max-w-xl">
          Interested in discussing a software role, project collaboration, or just saying hello? I'd
          love to hear from you.
        </p>
      </motion.div>

      {/* Main Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl border border-sky-500/30 bg-card/90 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center text-center space-y-4"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/40 shadow-lg animate-bounce">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">Message Ready!</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Thank you for reaching out,{" "}
                <span className="text-sky-300 font-semibold">{name}</span>! Click below to send
                directly via your mail client.
              </p>
              <div className="pt-4">
                <MagneticButton href={mailtoUrl}>
                  <div className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg">
                    <Mail className="h-4 w-4" />
                    Open Email Application
                  </div>
                </MagneticButton>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleFormSubmit}
              className="space-y-6"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Input */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Recruiter"
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a short note about the role, project, or opportunity..."
                  className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 resize-none"
                />
              </div>

              {/* Error Box */}
              {status === "error" && (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs font-semibold text-destructive-foreground">
                  {errorMessage}
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <MagneticButton className="flex-1" type="submit" disabled={status === "loading"}>
                  <div className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50">
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </div>
                </MagneticButton>

                <MagneticButton className="flex-1" href={mailtoUrl}>
                  <div className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                    <Mail className="h-4 w-4 text-sky-400" />
                    <span>Direct Email</span>
                  </div>
                </MagneticButton>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Social Cards Section */}
        <div className="mt-12 pt-8 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SocialCard
            href={LINKEDIN_URL}
            icon={<Linkedin className="h-5 w-5 text-sky-400" />}
            title="LinkedIn"
            subtitle="in/panthapradip31"
          />
          <SocialCard
            href={INSTAGRAM_URL}
            icon={<Instagram className="h-5 w-5 text-pink-400" />}
            title="Instagram"
            subtitle="@v1system"
          />
          <SocialCard
            href={GITHUB_URL}
            icon={<Github className="h-5 w-5 text-teal-400" />}
            title="GitHub"
            subtitle="github.com/pradippantha31"
          />
        </div>
      </motion.div>
    </section>
  );
}

function SocialCard({
  href,
  icon,
  title,
  subtitle,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3.5 rounded-2xl border border-border/60 bg-background/40 p-4 transition-all hover:border-sky-400/50 hover:bg-card hover:scale-[1.02]"
    >
      <div className="rounded-xl border border-border bg-muted/60 p-2.5 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-foreground">{title}</p>
        <p className="text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
    </a>
  );
}
