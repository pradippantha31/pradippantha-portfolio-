import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

const EMAIL = "panthapradip31@gmail.com";
const GITHUB = "https://github.com/pradippantha31/pradippantha-portfolio-";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Pradip Pantha — CS Student " },
      {
        name: "description",
        content:
          "Final-year CS student at Herald College Kathmandu. I coordinate small teams and ship projects that actually get finished.",
      },
      { property: "og:title", content: "Pradip Pantha — Portfolio" },
      {
        property: "og:description",
        content: "Coordination + building. Kathmandu, Nepal.",
      },
    ],
  }),
});

const experiences = [
  {
    year: "2024",
    title: "Expense Tracking App — Group Project",
    role: "Project Coordinator",
    points: [
      "Broke the project into tasks and tracked progress on a weekly basis using Trello.",
      "Ran short check-ins with teammates to unblock issues and keep the scope realistic for our deadline.",
      "Helped with basic feature testing and wrote a short user guide for the final submission.",
    ],
  },
  {
    year: "2023-2026",
    title: "Coursework & Self-Study",
    role: "CS Student",
    points: [
      "Data structures, databases, and web fundamentals through Herald College Kathmandu.",
      "Building small side projects to practice modern web stacks and Git workflows.",
      "Learning to use AI assistants effectively — as a tool, not a shortcut.",
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
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:pt-16">
        <Hero />
        <Section id="about" title="About me">
          <div className="card-glow rounded-2xl p-6 leading-relaxed text-muted-foreground">
            I'm a final-year Computer Science student at{" "}
            <span className="text-foreground font-medium">Herald College Kathmandu</span>. I enjoy the
            coordination side of software as much as the building side — organising work, keeping small
            teams on track, and shipping projects that actually get finished. I'm still learning, and I
            lean on modern tools (including AI assistants) the same way I lean on Stack Overflow or
            documentation: to move faster and understand things better.
          </div>
        </Section>

        <Section id="experience" title="Experience & Projects">
          <div className="space-y-4">
            {experiences.map((e) => (
              <article
                key={e.title}
                className="card-glow card-glow-hover animate-fade-up rounded-2xl p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{e.title}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">{e.role}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                    {e.year}
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Get in touch">
          <ContactCard />
        </Section>

        <footer className="mt-16 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Pradip Pantha · SINCE 2003
          <div className="mt-2">
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              View source on GitHub
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-3 font-display text-sm font-semibold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-base font-bold text-primary shadow-sm">
            <span className="sr-only">Pradip Pantha logo</span>
            <svg viewBox="0 0 64 64" className="h-5 w-5" aria-hidden="true">
              <rect x="4" y="4" width="56" height="56" rx="16" fill="currentColor" opacity="0.12" />
              <path
                d="M19 18h11c7.2 0 12 4.3 12 11.2 0 7.2-5.1 11.8-12.4 11.8H25v11H19V18Z"
                fill="currentColor"
              />
              <path
                d="M25 24v12h3.2c3.6 0 5.7-1.9 5.7-5.1 0-3.3-2.1-6.9-5.7-6.9H25Z"
                fill="#38bdf8"
              />
              <circle cx="45" cy="22" r="6" fill="#f59e0b" />
              <path
                d="M45 18.5a3.5 3.5 0 1 1 0 7"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
          <span className="text-foreground">Pradip Pantha</span>
        </a>
        <div className="flex gap-1 text-sm">
          {[
            ["About", "about"],
            ["Work", "experience"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header id="top" className="relative pb-10 pt-6">
      <div className="animate-fade-up">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Open to internships & collabs
        </div>
        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 p-2 shadow-sm">
            <svg viewBox="0 0 64 64" className="h-10 w-10 text-primary" aria-hidden="true">
              <rect x="4" y="4" width="56" height="56" rx="16" fill="currentColor" opacity="0.12" />
              <path
                d="M19 18h11c7.2 0 12 4.3 12 11.2 0 7.2-5.1 11.8-12.4 11.8H25v11H19V18Z"
                fill="currentColor"
              />
              <path
                d="M25 24v12h3.2c3.6 0 5.7-1.9 5.7-5.1 0-3.3-2.1-6.9-5.7-6.9H25Z"
                fill="#38bdf8"
              />
              <circle cx="45" cy="22" r="6" fill="#f59e0b" />
              <path
                d="M45 18.5a3.5 3.5 0 1 1 0 7"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Pradip Pantha</h1>
        </div>
        <p className="mt-3 text-xl font-medium text-gradient">
          Computer Science Student
        </p>
        <div className="mt-6 space-y-2 text-sm text-muted-foreground">
          <InfoRow icon="📍" text="Kathmandu, Nepal" />
          <InfoRow icon="✉️">
            <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">
              {EMAIL}
            </a>
          </InfoRow>
          <InfoRow icon="🔗">
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              github.com/pradippantha31
            </a>
          </InfoRow>
        </div>
      </div>
    </header>
  );
}

function InfoRow({
  icon,
  text,
  children,
}: {
  icon: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span aria-hidden className="text-base">
        {icon}
      </span>
      {children ?? <span>{text}</span>}
    </div>
  );
}

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

/**
 * Contact form with a lightweight human-check + rate-limit.
 *
 * Security posture (client-side portfolio, no backend):
 *  - Honeypot field: bots fill it, humans don't.
 *  - Math CAPTCHA: proves the sender read the page.
 *  - Minimum time-on-page before submit (bots submit instantly).
 *  - After 1 failed verification, we surface a direct mailto: link so a real
 *    recruiter is never blocked by the check.
 */
function ContactCard() {
  const challenge = useMemo(() => {
    const a = 2 + Math.floor(Math.random() * 7);
    const b = 1 + Math.floor(Math.random() * 6);
    return { a, b, answer: a + b };
  }, []);
  const mountedAt = useMemo(() => Date.now(), []);

  const [name, setName] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [failed, setFailed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mailtoFallback = `mailto:${EMAIL}?subject=${encodeURIComponent(
    "Portfolio contact from " + (name || "a recruiter"),
  )}&body=${encodeURIComponent(
    `Hi Pradip,\n\n${message || ""}\n\n— ${name || ""}${replyTo ? " (" + replyTo + ")" : ""}`,
  )}`;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Bot signals: honeypot or instant submit.
    const tooFast = Date.now() - mountedAt < 2500;
    if (honeypot || tooFast) {
      setFailed(true);
      setError("Verification failed. Please email me directly using the button below.");
      return;
    }

    if (parseInt(answer, 10) !== challenge.answer) {
      setFailed(true);
      setError("That answer wasn't right. Rather than retry, just email me directly ↓");
      return;
    }
    if (!name.trim() || !replyTo.trim() || !message.trim()) {
      setError("Please fill in name, email and message.");
      return;
    }

    // Verified — hand off to the user's mail client (no backend needed, no data leaves the browser).
    window.location.href = mailtoFallback;
  }

  return (
    <div className="card-glow rounded-2xl p-6">
      <p className="text-sm text-muted-foreground">
        Recruiter, client, or classmate — the fastest way to reach me is email. Fill in the form or
        skip straight to your mail app.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3" noValidate>
        {/* honeypot — visually hidden from humans */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="sr-only"
          aria-hidden
          placeholder="Leave this empty"
        />
        <Field label="Your name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            className="input"
            placeholder="Jane Recruiter"
          />
        </Field>
        <Field label="Your email">
          <input
            value={replyTo}
            onChange={(e) => setReplyTo(e.target.value)}
            type="email"
            maxLength={120}
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
        </Field>
        <Field label={`Quick check: what is ${challenge.a} + ${challenge.b}?`}>
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            inputMode="numeric"
            maxLength={3}
            className="input"
            placeholder="Answer"
          />
        </Field>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground"
          >
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2 pt-1 sm:flex-row">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Send message
          </button>
          <a
            href={mailtoFallback}
            className={`flex-1 rounded-lg border px-4 py-2.5 text-center text-sm font-medium transition-colors ${
              failed
                ? "border-primary bg-primary/15 text-foreground animate-float"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/60"
            }`}
          >
            {failed ? `📧 Just email me directly` : `Or email me directly`}
          </a>
        </div>

        {failed && (
          <p className="pt-1 text-xs text-muted-foreground">
            The check didn't pass — no worries. Tap the highlighted button to open your mail app
            with the message pre-filled.
          </p>
        )}
      </form>

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
    </div>
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
