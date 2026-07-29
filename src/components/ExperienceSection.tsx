import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, CheckCircle2 } from "lucide-react";

interface TimelineEntry {
  period: string;
  title: string;
  subtitle: string;
  type: "project" | "education";
  highlights: string[];
}

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    period: "2025",
    title: "Expense Tracking App — Group Project",
    subtitle: "Project Manager & Full Stack Contributor",
    type: "project",
    highlights: [
      "Organized sprint tasks into weekly milestones using Trello board tracking.",
      "Held short check-ins with team members to resolve blockers and maintain schedule alignment.",
      "Performed comprehensive feature validation and wrote user-facing documentation.",
    ],
  },
  {
    period: "2023 — 2026",
    title: "BSc (Hons) Computer Science",
    subtitle: "Herald College Kathmandu",
    type: "education",
    highlights: [
      "Mastered Data Structures & Algorithms, Database Design, and Web Systems.",
      "Built side projects practicing modern React, Vite, and Git collaboration workflows.",
      "Leveraged advanced AI tools to accelerate development efficiency and code quality.",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-5 sm:px-8 max-w-5xl mx-auto scroll-mt-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-start mb-16"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-indigo-300">
          <Briefcase className="h-3.5 w-3.5" />
          Journey & Background
        </div>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Experience & Education
        </h2>
        <p className="mt-3 text-muted-foreground text-base max-w-2xl">
          Key milestones from academic studies and collaborative software projects.
        </p>
      </motion.div>

      {/* Timeline Wrapper */}
      <div className="relative">
        {/* Growing Vertical Progress Line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 via-teal-300 to-indigo-500 origin-top -translate-x-1/2"
        />

        {/* Timeline Items */}
        <div className="space-y-12">
          {TIMELINE_ENTRIES.map((entry, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={entry.title} className="relative flex flex-col sm:flex-row items-center">
                {/* Node Center Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.2 }}
                  className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-sky-400 bg-background text-sky-400 shadow-md shadow-sky-500/30"
                >
                  {entry.type === "project" ? (
                    <Briefcase className="h-4 w-4" />
                  ) : (
                    <GraduationCap className="h-4 w-4" />
                  )}
                </motion.div>

                {/* Card Container */}
                <div
                  className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                    isEven ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:ml-auto"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className="group rounded-3xl border border-border/80 bg-card/80 p-6 backdrop-blur-xl shadow-lg transition-all hover:border-sky-500/40 hover:shadow-sky-500/10"
                  >
                    <div
                      className={`flex items-center gap-2 mb-2 ${isEven ? "sm:justify-end" : ""}`}
                    >
                      <Calendar className="h-3.5 w-3.5 text-sky-400" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                        {entry.period}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-sky-300 transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-sm font-semibold text-teal-400 mt-1">{entry.subtitle}</p>

                    <ul
                      className={`mt-4 space-y-2 text-sm text-muted-foreground ${isEven ? "sm:items-end" : ""}`}
                    >
                      {entry.highlights.map((point) => (
                        <li
                          key={point}
                          className={`flex items-start gap-2 ${isEven ? "sm:flex-row-reverse" : ""}`}
                        >
                          <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
