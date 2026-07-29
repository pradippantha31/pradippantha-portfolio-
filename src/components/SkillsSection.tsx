import { motion } from "framer-motion";
import { Cpu, Layers, Terminal, Users, CheckCircle } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: number }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend & UI Engineering",
    icon: <Layers className="h-5 w-5 text-sky-400" />,
    skills: [
      { name: "React 19 & Next.js / TanStack", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS & Styling", level: 95 },
      { name: "Framer Motion & UX Animations", level: 85 },
      { name: "HTML5 / Modern CSS", level: 95 },
    ],
  },
  {
    title: "Backend & Systems",
    icon: <Terminal className="h-5 w-5 text-teal-400" />,
    skills: [
      { name: "Node.js & JavaScript Fundamentals", level: 85 },
      { name: "SQL & Relational Databases", level: 80 },
      { name: "RESTful API Integration", level: 88 },
      { name: "Git & Version Control Workflows", level: 90 },
      { name: "Vite & Build Tooling", level: 85 },
    ],
  },
  {
    title: "Project Coordination & Operations",
    icon: <Users className="h-5 w-5 text-indigo-400" />,
    skills: [
      { name: "Sprint Management & Trello", level: 92 },
      { name: "Cross-Functional Team Check-ins", level: 90 },
      { name: "Technical Documentation", level: 88 },
      { name: "Scope & Timeline Tracking", level: 88 },
      { name: "User Guide & QA Testing", level: 85 },
    ],
  },
  {
    title: "AI Workflows & Prompt Engineering",
    icon: <Cpu className="h-5 w-5 text-purple-400" />,
    skills: [
      { name: "Expert AI Prompt Engineering", level: 98 },
      { name: "LLM Orchestration & Prompt Tuning", level: 95 },
      { name: "AI Coding Assistant Execution", level: 95 },
      { name: "Rapid AI Prototyping & Architecture", level: 92 },
      { name: "Clean Engineering & Code Verification", level: 90 },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-5 sm:px-8 max-w-6xl mx-auto scroll-mt-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-start mb-14"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-300">
          <Cpu className="h-3.5 w-3.5" />
          Core Capabilities
        </div>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Skills & Technical Expertise
        </h2>
        <p className="mt-3 text-muted-foreground text-base max-w-2xl">
          Combining technical software development skills with structured project management
          methodology.
        </p>
      </motion.div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILL_CATEGORIES.map((category, catIdx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: catIdx * 0.12 }}
            className="group relative rounded-3xl border border-border/80 bg-card/70 p-6 backdrop-blur-xl shadow-lg transition-all hover:border-sky-500/40 hover:shadow-sky-500/10"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl border border-border bg-muted/60 p-3 transition-transform group-hover:scale-110 group-hover:rotate-6">
                {category.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-foreground group-hover:text-sky-300 transition-colors">
                {category.title}
              </h3>
            </div>

            {/* Skill Progress Indicators */}
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                    <span className="text-foreground flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-teal-400" />
                      {skill.name}
                    </span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-muted/60 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-teal-300 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
