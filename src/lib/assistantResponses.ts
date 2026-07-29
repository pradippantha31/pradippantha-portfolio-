export function getAssistantReply(
  query: string,
  context = "",
  mode: "portfolio" | "project" | "developer" = "portfolio",
) {
  const normalized = query.toLowerCase();
  const developerContext =
    context.toLowerCase().includes("developer workspace") || mode === "developer";

  if (
    normalized.includes("hire") ||
    normalized.includes("available") ||
    normalized.includes("role") ||
    normalized.includes("job")
  ) {
    return "Yes — Pradip is open to engineering, AI workflow, and collaborative development opportunities. He is especially strong in full-stack web development, AI prompt design, and product-focused implementation.";
  }

  if (
    normalized.includes("contact") ||
    normalized.includes("email") ||
    normalized.includes("reach")
  ) {
    return "You can contact Pradip directly through the contact form on this site or by emailing panthapradip31@gmail.com.";
  }

  if (
    normalized.includes("saas") ||
    normalized.includes("project") ||
    normalized.includes("built")
  ) {
    return "Pradip has built product-style demos such as an AI developer suite, an expense-tracking app, and a task-sprint workspace, with a focus on React, TypeScript, and polished user experience.";
  }

  if (
    normalized.includes("skill") ||
    normalized.includes("background") ||
    normalized.includes("cs") ||
    normalized.includes("computer")
  ) {
    return "Pradip is a Computer Science scholar with experience in full-stack engineering, AI prompt design, modern web development, and agile collaboration.";
  }

  if (normalized.includes("secure") || normalized.includes("security")) {
    return developerContext
      ? "This project is secure because it keeps AI interactions behind a protected server-side flow, avoids exposing keys in the browser, and uses input sanitization plus structured prompts to reduce unsafe behavior."
      : "This project is secure because it uses a protected server-side assistant flow, keeps secrets out of client code, and applies careful prompt and input handling to reduce misuse.";
  }

  if (normalized.includes("launch") || normalized.includes("strategy")) {
    return developerContext
      ? "A stronger launch strategy would focus on a sharp problem statement, a demo-first narrative, clear ROI for developers, and a measured rollout with feedback loops from early adopters."
      : "A stronger launch strategy would combine a demo-first story, one clear use case, a risk-free onboarding path, and visible proof of value for early users.";
  }

  if (
    normalized.includes("improve") ||
    normalized.includes("better") ||
    normalized.includes("growth")
  ) {
    return "A practical next step would be to focus on one flagship workflow, simplify the onboarding experience, and add measurable outcomes so visitors quickly understand the product's value.";
  }

  if (developerContext) {
    return "For this developer workspace, I would recommend focusing on one high-value workflow, clear safe defaults, and strong explanations so the experience feels practical and trustworthy.";
  }

  return "I can help you understand Pradip's background, technical skills, and project work. You can also use the contact form if you'd like to reach out directly.";
}
