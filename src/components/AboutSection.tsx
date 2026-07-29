import { motion } from "framer-motion";
import { User, Sparkles, Target, BookOpen, Compass } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-5 sm:px-8 max-w-5xl mx-auto scroll-mt-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-start mb-12"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-400">
          <User className="h-3.5 w-3.5" />
          Personal Journey
        </div>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          About Me
        </h2>
      </motion.div>

      {/* Main Glassmorphism Bio Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl border border-sky-500/30 bg-card/80 p-8 sm:p-12 backdrop-blur-2xl shadow-xl space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg"
      >
        <p>
          Technology has always interested me because of its ability to turn ideas into practical
          solutions. That curiosity led me to pursue Computer Science at{" "}
          <span className="text-foreground font-semibold">Herald College Kathmandu</span>, where
          I've developed a strong foundation in software development while discovering that I enjoy
          collaborating with people just as much as writing code.
        </p>

        <p>
          I enjoy working on projects from idea to completion—building applications, solving
          technical challenges, organizing tasks, and helping teams stay aligned. Whether I'm
          developing features, learning a new technology, or contributing to a group project, I
          value clear communication, continuous learning, and delivering work that makes a real
          impact.
        </p>

        <p>
          I'm a quick learner who adapts well to new technologies and fast-paced environments. I
          approach challenges with curiosity and persistence, and I'm always looking for
          opportunities to improve both my technical and problem-solving skills.
        </p>

        <p>
          To keep learning and working efficiently, I regularly use official documentation,
          developer communities, and modern AI tools. I see them as resources that help me explore
          new ideas, understand complex concepts, and become a better developer through hands-on
          practice and critical thinking.
        </p>

        <p className="text-foreground font-medium border-l-2 border-sky-400 pl-4 py-1 bg-sky-500/5 rounded-r-xl">
          As I begin my professional career, I'm excited to contribute to meaningful projects,
          collaborate with talented teams, and continue growing as a software engineer who values
          quality, innovation, and lifelong learning.
        </p>

        {/* Highlight Badges */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border/60 text-xs font-semibold text-foreground">
          <div className="flex items-center gap-2.5 rounded-xl bg-background/50 border border-border/60 p-3">
            <Target className="h-4 w-4 text-sky-400 shrink-0" />
            <span>Problem Solver & Builder</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl bg-background/50 border border-border/60 p-3">
            <BookOpen className="h-4 w-4 text-teal-400 shrink-0" />
            <span>Continuous Learner</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl bg-background/50 border border-border/60 p-3">
            <Compass className="h-4 w-4 text-indigo-400 shrink-0" />
            <span>Collaborative Mindset</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
