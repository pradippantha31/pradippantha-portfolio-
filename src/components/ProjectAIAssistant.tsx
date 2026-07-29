import { useState } from "react";
import { Bot, Loader2, Send, ShieldCheck, Sparkles } from "lucide-react";
import { getAssistantReply } from "../lib/assistantResponses";

interface ProjectAIAssistantProps {
  title?: string;
  context?: string;
  placeholder?: string;
  accent?: string;
}

type AssistantMessage =
  | { id: string; role: "assistant"; content: string }
  | { id: string; role: "user"; content: string };

const QUICK_PROMPTS = [
  "Summarize the project in one sentence",
  "Suggest a stronger launch strategy",
  "What makes this project secure?",
  "How can this be improved for users?",
];

export function ProjectAIAssistant({
  title = "AI Project Companion",
  context = "You are a secure product strategist helping visitors understand this portfolio project and its value.",
  placeholder = "Ask about features, growth, or improvements...",
  accent = "from-sky-500 to-indigo-600",
}: ProjectAIAssistantProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "I can explain this project, propose stronger product ideas, and help you assess its security posture.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const askAssistant = async (promptText?: string) => {
    const cleanPrompt = (promptText ?? input).trim();
    if (!cleanPrompt) return;

    const userMessage = { id: Date.now().toString(), role: "user" as const, content: cleanPrompt };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: cleanPrompt.slice(0, 900),
          context,
          mode: "project",
        }),
      });

      const data = await response.json();
      const answer = data.answer || "I could not produce a response right now.";
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant" as const,
          content: answer,
        },
      ]);
    } catch {
      const fallbackReply = getAssistantReply(cleanPrompt, context, "project");
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant" as const,
          content: fallbackReply,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`rounded-lg bg-gradient-to-r ${accent} p-2 text-white`}>
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="text-[11px] text-slate-400">Secure, context-aware LLM assistance</p>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
          <ShieldCheck className="h-3 w-3" />
          Protected
        </div>
      </div>

      <div className="mb-3 space-y-2 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
        {messages.map((message) => (
          <div key={message.id} className={message.role === "user" ? "text-right" : "text-left"}>
            <div
              className={`inline-block max-w-full rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white"
                  : "border border-slate-800 bg-slate-900 text-slate-200"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-left">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300">
              <Loader2 className="h-4 w-4 animate-spin text-sky-400" />
              Generating a secure response...
            </div>
          </div>
        )}
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => askAssistant(prompt)}
            className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-[10px] font-medium text-slate-400 transition-colors hover:border-sky-500/40 hover:text-sky-300"
          >
            {prompt}
          </button>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          askAssistant();
        }}
        className="flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-sky-400 focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 p-2.5 text-white transition-opacity hover:opacity-90"
          title="Send"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </form>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
        <Sparkles className="h-3.5 w-3.5 text-purple-400" />
        Built with a protected server-side LLM route so your API keys stay private.
      </div>
    </div>
  );
}
