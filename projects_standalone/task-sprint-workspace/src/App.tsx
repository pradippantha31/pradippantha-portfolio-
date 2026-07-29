import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Kanban, Plus, MoveRight, ShieldCheck, CreditCard, Sparkles } from "lucide-react";

interface TaskItem {
  id: string;
  title: string;
  assignee: string;
  priority: "Low" | "Medium" | "High";
  status: "todo" | "in-progress" | "review" | "done";
}

const INITIAL_TASKS: TaskItem[] = [
  {
    id: "proj-1",
    title: "Expense Tracking App — SaaS Budgeting Engine",
    assignee: "Pradip Pantha",
    priority: "High",
    status: "done",
  },
  {
    id: "proj-2",
    title: "Task & Sprint Coordination Workspace — Productivity Engine",
    assignee: "Pradip Pantha",
    priority: "High",
    status: "done",
  },
  {
    id: "proj-3",
    title: "AI Developer Workspace & Workflow Suite — AI Tooling",
    assignee: "Pradip Pantha",
    priority: "High",
    status: "in-progress",
  },
  {
    id: "proj-4",
    title: "Sprint Check-In & Trello Backlog Alignment",
    assignee: "Pradip Pantha",
    priority: "Medium",
    status: "review",
  },
  {
    id: "proj-5",
    title: "Final Deployment & GitHub Repository Verification",
    assignee: "Pradip Pantha",
    priority: "High",
    status: "done",
  },
];

const COLUMNS = [
  { id: "todo", label: "To Do", color: "border-slate-700 bg-slate-900/60" },
  { id: "in-progress", label: "In Progress", color: "border-sky-500/40 bg-sky-950/20" },
  { id: "review", label: "In Review", color: "border-purple-500/40 bg-purple-950/20" },
  { id: "done", label: "Completed", color: "border-teal-500/40 bg-teal-950/20" },
];

const getPreferredApiKey = () =>
  import.meta.env.VITE_GROQ_API_KEY ||
  import.meta.env.VITE_OPENROUTER_API_KEY ||
  import.meta.env.VITE_GEMINI_API_KEY ||
  "";

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [taskTitle, setTaskTitle] = useState("");
  const [assignee, setAssignee] = useState("Pradip Pantha");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("High");
  const [apiKey, setApiKey] = useState(getPreferredApiKey());
  const [aiPlan, setAiPlan] = useState("Premium AI sprint planning is ready after unlock.");
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<"PayPal" | "Chime" | "Binance" | "">(
    "",
  );

  const completedCount = tasks.filter((t) => t.status === "done").length;
  const progressPercentage = Math.round((completedCount / tasks.length) * 100);

  const sanitizeInput = (str: string) => str.replace(/[<>]/g, "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("task-suite-premium");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as {
        unlocked?: boolean;
        gateway?: "PayPal" | "Chime" | "Binance";
      };
      if (parsed.unlocked) {
        setIsPremiumUnlocked(true);
        setSelectedGateway(parsed.gateway || "");
      }
    } catch {
      // ignore malformed data
    }
  }, []);

  const handlePaymentRequest = (method: string) => {
    const subject = encodeURIComponent(`AI Upgrade Payment Request - ${method}`);
    const body = encodeURIComponent(
      `Hi Pradip,\n\nI would like to purchase premium productivity support, AI sprint automation, or custom workspace upgrades for this project demo.\n\nPreferred payment method: ${method}\n\nPlease share the secure payment instructions and confirmation steps.\n`,
    );

    window.location.href = `mailto:panthapradip31@gmail.com?subject=${subject}&body=${body}`;
  };

  const handlePremiumUnlock = (gateway: "PayPal" | "Chime" | "Binance") => {
    setSelectedGateway(gateway);
    setIsPremiumUnlocked(true);
    setAiPlan(`Premium unlocked via ${gateway}. AI sprint planning and automation templates are now live.`);
    window.localStorage.setItem(
      "task-suite-premium",
      JSON.stringify({ unlocked: true, gateway }),
    );
  };

  const handleGatewaySelect = (gateway: "PayPal" | "Chime" | "Binance") => {
    handlePremiumUnlock(gateway);
    handlePaymentRequest(gateway);
  };

  const handleGenerateSprintPlan = async () => {
    if (!isPremiumUnlocked) {
      setAiPlan("Unlock premium access first to generate an AI sprint plan.");
      return;
    }

    const effectiveKey = apiKey.trim() || getPreferredApiKey();
    if (!effectiveKey) {
      setAiPlan("Add a Groq, OpenRouter, or Gemini API key to enable live sprint planning.");
      return;
    }

    setIsGeneratingPlan(true);
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${effectiveKey}`,
          "HTTP-Referer": "https://pradippantha.dev",
          "X-Title": "Pradip Sprint Workspace",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are an agile project manager. Return a concise actionable sprint plan.",
            },
            {
              role: "user",
              content: `Create a sprint plan for ${tasks.length} tasks with ${completedCount} completed and ${progressPercentage}% progress.`,
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          setAiPlan(content);
          setIsGeneratingPlan(false);
          return;
        }
      }
    } catch {
      // fall back below
    }

    setAiPlan("Live sprint-planning model unavailable right now. Premium fallback mode is active.");
    setIsGeneratingPlan(false);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = sanitizeInput(taskTitle.trim());
    if (!cleanTitle) return;

    const newTask: TaskItem = {
      id: Date.now().toString(),
      title: cleanTitle,
      assignee: sanitizeInput(assignee.trim()) || "Pradip Pantha",
      priority,
      status: "todo",
    };

    setTasks([...tasks, newTask]);
    setTaskTitle("");
  };

  const moveTaskNext = (id: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id !== id) return t;
        if (t.status === "todo") return { ...t, status: "in-progress" };
        if (t.status === "in-progress") return { ...t, status: "review" };
        if (t.status === "review") return { ...t, status: "done" };
        return t;
      }),
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-400">
              <Kanban className="h-3.5 w-3.5" />
              Productivity Engine Live Demo
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mt-2 text-white">
              Sprint & Task Workspace
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Agile Task Board · Lead Engineer & Project Manager (Pradip Pantha)
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <button
              onClick={() =>
                alert("Productivity SaaS Billing: Team Seats ($9/seat/mo) - Active Workspace Plan")
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-md hover:opacity-90 transition-opacity"
            >
              <span>🚀 Team Seats ($9/seat/mo)</span>
            </button>
            <div className="w-full sm:w-64 rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 backdrop-blur-xl">
              <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                <span className="text-slate-400">Sprint Velocity</span>
                <span className="text-teal-400">{progressPercentage}% Done</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  style={{ width: `${progressPercentage}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="mb-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-sm font-semibold">Secure Upgrade & Premium Feature Requests</span>
          </div>
          <p className="mt-2 text-sm text-slate-300">
            Need premium workflow support, team automation, or custom sprint upgrades? Choose a secure
            payment method below and I will confirm the next steps privately.
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {([
              ["PayPal", "Fast checkout for premium workspace access"],
              ["Chime", "Direct transfer arrangement for approved upgrades"],
              ["Binance", "Crypto payment option for advanced automation"],
            ] as const).map(([name, description]) => (
              <button
                key={name}
                type="button"
                onClick={() => handleGatewaySelect(name)}
                className={`rounded-xl border p-3 text-left transition-all ${
                  selectedGateway === name
                    ? "border-sky-400/60 bg-sky-500/10"
                    : "border-slate-700 bg-slate-950/60 hover:border-sky-400/50"
                }`}
              >
                <div className="flex items-center gap-2 text-white">
                  <CreditCard className="h-4 w-4 text-sky-400" />
                  <span className="text-sm font-semibold">{name}</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">{description}</p>
              </button>
            ))}
          </div>

          {isPremiumUnlocked && (
            <div className="mt-4 rounded-xl border border-sky-500/20 bg-slate-950/70 p-3 text-sm text-slate-300">
              <p className="font-semibold text-sky-300">Unlocked features:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-400">
                <li>AI sprint planning and task prioritization</li>
                <li>Automation playbooks for repeated work</li>
                <li>Priority support for team workflows</li>
              </ul>
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-sky-500/20 bg-sky-500/10 px-3 py-2 text-xs text-sky-300">
            <Sparkles className="h-3.5 w-3.5" />
            Secure payment requests are handled privately by email before any purchase is finalized.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 mb-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-purple-300">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Premium AI Sprint Planner</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Unlock this panel and connect a Groq, OpenRouter, or Gemini API key for AI-assisted sprint planning.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Groq / OpenRouter / Gemini API key"
              className="mt-3 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-purple-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleGenerateSprintPlan}
              disabled={isGeneratingPlan}
              className="mt-3 w-full rounded-xl bg-gradient-to-r from-purple-600 to-sky-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isGeneratingPlan ? "Generating Plan..." : "Generate AI Sprint Plan"}
            </button>
            <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300">{aiPlan}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-sm font-semibold">Premium Extras Included</span>
            </div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-400">
              <li>AI generated sprint objectives and risks</li>
              <li>Automation playbooks for recurring review rituals</li>
              <li>Priority support and setup guidance</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 mb-8 backdrop-blur-xl">
          <form onSubmit={handleAddTask} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                New Task Description
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Implement user authentication pipeline"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder:text-slate-600 focus:border-purple-400 focus:outline-none"
              />
            </div>

            <div className="w-full md:w-44">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Assignee</label>
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-purple-400 focus:outline-none"
              />
            </div>

            <div className="w-full md:w-36">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High")}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-purple-400 focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-sky-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              Add Task Card
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLUMNS.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className={`rounded-2xl border ${col.color} p-4 backdrop-blur-xl flex flex-col`}
              >
                <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-800">
                  <h2 className="text-sm font-bold text-white">{col.label}</h2>
                  <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-400">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  <AnimatePresence>
                    {colTasks.map((t) => (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-md space-y-3"
                      >
                        <p className="text-sm font-semibold text-white leading-snug">{t.title}</p>

                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-medium">{t.assignee}</span>
                          <span
                            className={`rounded-md px-2 py-0.5 font-bold ${
                              t.priority === "High"
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                                : t.priority === "Medium"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                  : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {t.priority}
                          </span>
                        </div>

                        {t.status !== "done" && (
                          <button
                            onClick={() => moveTaskNext(t.id)}
                            className="w-full mt-2 inline-flex items-center justify-center gap-1 rounded-lg border border-slate-800 bg-slate-900/80 py-1.5 text-xs font-semibold text-sky-400 hover:bg-slate-800 transition-colors"
                          >
                            <span>Move Phase</span>
                            <MoveRight className="h-3 w-3" />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {colTasks.length === 0 && (
                    <div className="text-center py-8 text-xs text-slate-600 border border-dashed border-slate-800/80 rounded-xl">
                      Empty phase
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
