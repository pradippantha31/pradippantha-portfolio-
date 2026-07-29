import { createFileRoute } from "@tanstack/react-router";
import { LenisProvider } from "../components/LenisProvider";
import { ScrollProgressBar } from "../components/ScrollProgressBar";
import { CursorGlow } from "../components/CursorGlow";
import { ParticlesBackground } from "../components/ParticlesBackground";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { AboutSection } from "../components/AboutSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { SkillsSection } from "../components/SkillsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/")({
  component: PortfolioApp,
  head: () => ({
    meta: [
      { title: "Pradip Pantha — Developer Portfolio | Full-Stack & Project Coordinator" },
      {
        name: "description",
        content:
          "Official personal developer portfolio of Pradip Pantha. Computer Science student, project coordinator, and full-stack software builder in Kathmandu, Nepal.",
      },
      { property: "og:title", content: "Pradip Pantha — Developer Portfolio" },
      {
        property: "og:description",
        content:
          "Modern, cinematic developer portfolio featuring Framer Motion micro-interactions, Lenis smooth scrolling, full-stack projects, and project coordination experience.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/avatar.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function PortfolioApp() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pradip Pantha",
    jobTitle: "Software Developer & Project Coordinator",
    alumniOf: "Herald College Kathmandu",
    url: "https://github.com/pradippantha31/pradippantha-portfolio-",
    sameAs: [
      "https://www.linkedin.com/in/panthapradip31",
      "https://www.instagram.com/v1system",
      "https://github.com/pradippantha31/pradippantha-portfolio-",
    ],
    knowsAbout: [
      "Software Engineering",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Project Management",
      "Full-Stack Web Development",
    ],
  };

  return (
    <LenisProvider>
      <div className="relative min-h-screen bg-background text-foreground selection:bg-sky-500/30 selection:text-white font-sans antialiased overflow-x-hidden">
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />

        {/* Global FX */}
        <ScrollProgressBar />
        <CursorGlow />
        <ParticlesBackground />

        {/* Header Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </LenisProvider>
  );
}
