import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

const EMAIL = "panthapradip31@gmail.com";
const PHONE_PRIMARY = "+977 9803329390";
const PHONE_SECONDARY = "+977 9768446310";
const GITHUB = "https://github.com/pradippantha31";
const LINKEDIN = "https://www.linkedin.com/in/pradippantha";
const WHATSAPP = "https://wa.me/9779803329390";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Pradip Pantha — CS Student & Project Coordinator" },
      {
        name: "description",
        content:
          "Final-year CS student at Herald College Kathmandu. Open to internships and freelance collabs.",
      },
      { property: "og:title", content: "Pradip Pantha — Portfolio" },
      {
        property: "og:description",
        content: "Coordination + building. Open to work and freelance collabs. Kathmandu, Nepal.",
      },
    ],
  }),
});

const experiences = [
  {
    year: "2024",
    status: "shipped",
    title: "Expense Tracking App — Group Project",
    role: "Project Coordinator",
    points: [
      "Broke the project into tasks and tracked progress on a weekly basis using Trello.",
      "Ran short check-ins with teammates to unblock issues and keep the scope realistic for our deadline.",
      "Helped with basic feature testing and wrote a short user guide for the final submission.",
    ],
  },
  {
    year: "2025",
    status: "in-progress",
    title: "Final Year Capstone",
    role: "Student · Herald College Kathmandu",
    points: [
      "Scoping and researching a project topic that combines coordination tools with a small web app.",
      "Prototyping with modern web stacks and AI-assisted workflows to move faster.",
    ],
  },
  {
    year: "2025",
    status: "open",
    title: "Freelance / Internship",
    role: "Available now",
    points: [
      "Open to short freelance gigs — coordination, docs, small web builds.",
      "Actively looking for an internship where I can learn from a real team.",
    ],
  },
];

const skills = [
  "Project Coordination",
  "Trello / Task Tracking",
  "Team Check-ins",
  "Git & GitHub",
  "Web Fundamentals",
  "Databases (SQL basics)",
  "Technical Writing",
  "AI-assisted Workflows",
];

function Portfolio() {
  const active = useScrollSpy(["about", "experience", "skills", "contact"]);
  return (
    <div className="min-h-screen">
      <Nav active={active} />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-8 sm:pt-14">
        <Hero />
        <Section id="about" title="About me">
          <div className="card-glow rounded-2xl p-6 leading-relaxed text-muted-foreground">
            I'm a final-year Computer Science student at{" "}
            <span className="text-foreground font-medium">Herald College Kathmandu</span>. I enjoy
            the coordination side of software as much as the building side — organising work,
            keeping small teams on track, and shipping projects that actually get finished. I lean
            on modern tools (including AI assistants) the same way I lean on Stack Overflow or
            documentation: to move faster and understand things better.
          </div>
        </Section>

        <Section id="experience" title="Experience & Projects">
          <div className="space-y-4">
            {experiences.map((e, i) => (
              <ExperienceCard key={e.title} exp={e} index={i} />
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span
                key={s}
                style={{ animationDelay: `${i * 40}ms` }}
                className="animate-fade-up rounded-full border border-border bg-card/60 px-3 py-1.5 text-sm text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground hover:shadow-glow"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Get in touch">
          <Contact />
        </Section>

        <footer className="mt-16 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Pradip Pantha · Built in Kathmandu
        </footer>
      </main>
    </div>
  );
}

/* ---------- Nav with scrollspy ---------- */

function Nav({ active }: { active: string }) {
  const items: [string, string][] = [
    ["About", "about"],
    ["Work", "experience"],
    ["Skills", "skills"],
    ["Contact", "contact"],
  ];
  return (
    <nav className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
        <a href="#top" className="font-display text-sm font-semibold tracking-tight">
          PP<span className="text-primary">.</span>
        </a>
        <div className="flex gap-0.5 text-sm">
          {items.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative rounded-md px-3 py-1.5 transition-colors ${
                active === id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
              {active === id && (
                <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary" />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <header id="top" className="relative pb-10 pt-6">
      <div className="animate-fade-up">
        <div className="flex flex-wrap gap-2">
          <StatusBadge dot="bg-emerald-400">Open to work / internships</StatusBadge>
          <StatusBadge dot="bg-primary">Available for freelance & collabs</StatusBadge>
        </div>
        <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl">Pradip Pantha</h1>
        <p className="mt-3 text-xl font-medium text-gradient">
          Computer Science Student & Project Coordinator
        </p>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground">
          📍 Kathmandu, Nepal — coordinating small teams and shipping small products.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href="#contact"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            Contact me
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/60"
          >
            View GitHub ↗
          </a>
        </div>
      </div>
    </header>
  );
}

function StatusBadge({ children, dot }: { children: React.ReactNode; dot: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${dot}`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      {children}
    </span>
  );
}

/* ---------- Sections ---------- */

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-20">
      <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 4, y: px * 4 });
  }

  const statusStyle: Record<string, string> = {
    shipped: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    "in-progress": "bg-amber-500/15 text-amber-300 border-amber-500/30",
    open: "bg-primary/15 text-primary border-primary/30",
  };
  const statusLabel: Record<string, string> = {
    shipped: "Shipped",
    "in-progress": "In progress",
    open: "Open now",
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        animationDelay: `${index * 80}ms`,
      }}
      className="card-glow card-glow-hover animate-fade-up rounded-2xl p-6 transition-transform duration-200 will-change-transform"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
          <p className="mt-1 text-sm font-medium text-primary">{exp.role}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground">
            {exp.year}
          </span>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyle[exp.status]}`}
          >
            {statusLabel[exp.status]}
          </span>
        </div>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {exp.points.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  const channels = [
    {
      label: "Email",
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      icon: "✉️",
      cta: "Send email",
    },
    {
      label: "Phone",
      value: PHONE_PRIMARY,
      href: `tel:${PHONE_PRIMARY.replace(/\s/g, "")}`,
      icon: "📞",
      cta: "Call",
    },
    {
      label: "Phone (alt)",
      value: PHONE_SECONDARY,
      href: `tel:${PHONE_SECONDARY.replace(/\s/g, "")}`,
      icon: "📱",
      cta: "Call",
    },
    {
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      href: WHATSAPP,
      icon: "💬",
      cta: "Open chat",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/pradippantha",
      href: LINKEDIN,
      icon: "in",
      cta: "Connect",
    },
    {
      label: "GitHub",
      value: "github.com/pradippantha31",
      href: GITHUB,
      icon: "◆",
      cta: "Follow",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-2.5 sm:grid-cols-2">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="card-glow card-glow-hover group flex items-center gap-3 rounded-xl p-3.5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-lg font-bold text-primary">
              {c.icon}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {c.label}
              </div>
              <div className="truncate text-sm font-medium text-foreground">{c.value}</div>
            </div>
            <span className="shrink-0 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
              {c.cta} →
            </span>
          </a>
        ))}
      </div>

      <QuickMessage />
    </div>
  );
}

function QuickMessage() {
  const [name, setName] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!name.trim() || name.length > 100) return "Please enter your name (1–100 chars).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo) || replyTo.length > 255)
      return "Please enter a valid email.";
    if (!message.trim() || message.length > 2000)
      return "Please enter a message (1–2000 chars).";
    return null;
  };

  const mailto = useMemo(() => {
    const subject = `Portfolio contact from ${name || "someone"}`;
    const body = `${message}\n\n— ${name}${replyTo ? " (" + replyTo + ")" : ""}`;
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [name, replyTo, message]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    setError(null);
    window.location.href = mailto;
  }

  return (
    <form onSubmit={onSubmit} className="card-glow space-y-3 rounded-2xl p-6" noValidate>
      <div>
        <h3 className="text-base font-semibold text-foreground">Send a quick message</h3>
        <p className="text-xs text-muted-foreground">
          This opens your mail app pre-filled — no signup, no login.
        </p>
      </div>

      <Field label="Your name">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          className="input"
          placeholder="Jane Recruiter"
        />
      </Field>
      <Field label="Your email">
        <input
          value={replyTo}
          onChange={(e) => setReplyTo(e.target.value)}
          type="email"
          maxLength={255}
          className="input"
          placeholder="jane@company.com"
        />
      </Field>
      <Field label="Message">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={2000}
          rows={4}
          className="input resize-none"
          placeholder="A short note about the role or project."
        />
        <div className="mt-1 text-right text-[10px] text-muted-foreground">
          {message.length}/2000
        </div>
      </Field>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          Send via email
        </button>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:border-primary/60"
        >
          Or WhatsApp me
        </a>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.625rem;
          border: 1px solid var(--border);
          background: color-mix(in oklab, var(--background) 70%, transparent);
          padding: 0.6rem 0.8rem;
          font-size: 0.875rem;
          color: var(--foreground);
          transition: border-color .2s, box-shadow .2s;
        }
        .input::placeholder { color: var(--muted-foreground); opacity: 0.7; }
        .input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px oklch(0.72 0.17 235 / 0.2);
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
