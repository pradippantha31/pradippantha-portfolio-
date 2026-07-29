import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { ExternalLink, Github, Sparkles, FolderGit2 } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  role: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "expense-tracker",
    title: "Expense Tracking App",
    category: "Full Stack / SaaS",
    role: "Project Manager & Developer",
    description:
      "Broke down feature requirements into weekly sprints on Trello, led team check-ins to unblock hurdles, built budget calculation components, and authored the user guide.",
    image: "/images/expense-app.png",
    tags: ["React 19", "Tailwind CSS", "SQL", "Trello Workflow", "TypeScript"],
    githubUrl: "https://github.com/pradippantha31/expense-tracking-app",
    demoUrl: "/projects/expense-tracker",
  },
  {
    id: "task-workspace",
    title: "Task & Sprint Coordination Workspace",
    category: "Productivity Engine",
    role: "Lead Engineer",
    description:
      "A modern web workspace with dynamic kanban columns, milestone timelines, real-time status trackers, and structured task management workflows.",
    image: "/images/task-board.png",
    tags: ["TanStack Start", "Vite", "React 19", "Framer Motion", "Tailwind CSS"],
    githubUrl: "https://github.com/pradippantha31/task-sprint-workspace",
    demoUrl: "/projects/task-workspace",
  },
  {
    id: "ai-devtool",
    title: "AI Developer Workspace & Workflow Suite",
    category: "Developer Tools",
    role: "Creator",
    description:
      "Developer environment designed to assist code analysis, automate repetitive workflows, and streamline documentation utilizing modern AI integrations.",
    image: "/images/ai-devtool.png",
    tags: ["TypeScript", "Node.js", "AI Tooling", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/pradippantha31/ai-developer-suite",
    demoUrl: "/projects/ai-devtool",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-5 sm:px-8 max-w-6xl mx-auto scroll-mt-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-start mb-14"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-400">
          <FolderGit2 className="h-3.5 w-3.5" />
          Featured Work
        </div>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Selected Projects & Software
        </h2>
        <p className="mt-3 text-muted-foreground text-base max-w-2xl">
          Crafting practical software solutions with clean code architecture, intuitive UX, and
          structured project coordination.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="group relative h-full rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl p-5 flex flex-col justify-between shadow-lg transition-shadow hover:shadow-2xl hover:shadow-sky-500/10 hover:border-sky-500/40"
      >
        {/* Card Header & Image */}
        <div>
          <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-muted">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 rounded-full border border-sky-400/30 bg-background/80 px-3 py-1 text-[11px] font-semibold text-sky-300 backdrop-blur-md">
                <Sparkles className="h-3 w-3 text-sky-400" />
                {project.category}
              </span>
            </div>
          </div>

          {/* Project Details */}
          <div className="mt-5">
            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-sky-300 transition-colors">
              {project.title}
            </h3>
            <p className="mt-1 text-xs font-semibold text-teal-400">{project.role}</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Technology Badges & Action Buttons */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-muted/60 border border-border/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors group-hover:border-sky-500/30 group-hover:text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <MagneticButton href={project.githubUrl} target="_blank" rel="noreferrer">
              <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted hover:border-sky-400 transition-colors">
                <Github className="h-3.5 w-3.5" />
                <span>Code</span>
              </div>
            </MagneticButton>

            <MagneticButton href={project.demoUrl}>
              <div className="inline-flex items-center gap-2 rounded-xl bg-sky-500/15 border border-sky-500/30 px-4 py-2 text-xs font-semibold text-sky-300 hover:bg-sky-500/25 hover:border-sky-400 transition-colors">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live Demo</span>
              </div>
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
