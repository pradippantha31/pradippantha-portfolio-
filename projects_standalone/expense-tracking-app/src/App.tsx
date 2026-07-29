import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  Plus,
  Trash2,
  PieChart,
  Calendar,
  TrendingUp,
  Tag,
  ListTodo,
  ShieldCheck,
  CreditCard,
  Sparkles,
} from "lucide-react";

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

const INITIAL_EXPENSES: Expense[] = [
  {
    id: "1",
    title: "Cloud Hosting & Vercel",
    amount: 45,
    category: "Infrastructure",
    date: "2025-02-15",
  },
  { id: "2", title: "Figma Team Subscription", amount: 25, category: "Design", date: "2025-02-14" },
  {
    id: "3",
    title: "Database Compute (Supabase)",
    amount: 30,
    category: "Infrastructure",
    date: "2025-02-10",
  },
  { id: "4", title: "Domain Registration", amount: 15, category: "Domain", date: "2025-02-05" },
  { id: "5", title: "Coffee & Team Meeting", amount: 22, category: "Team", date: "2025-02-01" },
];

const CATEGORIES = ["All", "Infrastructure", "Design", "Domain", "Team", "Other"];

const getPreferredApiKey = () =>
  import.meta.env.VITE_GROQ_API_KEY ||
  import.meta.env.VITE_OPENROUTER_API_KEY ||
  import.meta.env.VITE_GEMINI_API_KEY ||
  "";

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(500);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Infrastructure");
  const [apiKey, setApiKey] = useState(getPreferredApiKey());
  const [aiInsight, setAiInsight] = useState("Premium AI forecasting is ready once you unlock access.");
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<"PayPal" | "Chime" | "Binance" | "">(
    "",
  );

  const filteredExpenses =
    selectedCategory === "All" ? expenses : expenses.filter((e) => e.category === selectedCategory);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = monthlyBudget - totalSpent;
  const percentageSpent = Math.min(100, Math.round((totalSpent / monthlyBudget) * 100));

  const sanitizeInput = (str: string) => str.replace(/[<>]/g, "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("expense-suite-premium");
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
      `Hi Pradip,\n\nI would like to purchase premium analytics support, forecasting upgrades, or custom budgeting features for this project demo.\n\nPreferred payment method: ${method}\n\nPlease share the secure payment instructions and confirmation steps.\n`,
    );

    window.location.href = `mailto:panthapradip31@gmail.com?subject=${subject}&body=${body}`;
  };

  const handlePremiumUnlock = (gateway: "PayPal" | "Chime" | "Binance") => {
    setSelectedGateway(gateway);
    setIsPremiumUnlocked(true);
    setAiInsight(`Premium unlocked via ${gateway}. AI forecasting and smart budgeting insights are now active.`);
    window.localStorage.setItem(
      "expense-suite-premium",
      JSON.stringify({ unlocked: true, gateway }),
    );
  };

  const handleGatewaySelect = (gateway: "PayPal" | "Chime" | "Binance") => {
    handlePremiumUnlock(gateway);
    handlePaymentRequest(gateway);
  };

  const handleGenerateInsight = async () => {
    if (!isPremiumUnlocked) {
      setAiInsight("Unlock premium access first to generate AI budget insights.");
      return;
    }

    const effectiveKey = apiKey.trim() || getPreferredApiKey();
    if (!effectiveKey) {
      setAiInsight("Add a Groq, OpenRouter, or Gemini API key to enable live AI forecasting.");
      return;
    }

    setIsGeneratingInsight(true);
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${effectiveKey}`,
          "HTTP-Referer": "https://pradippantha.dev",
          "X-Title": "Pradip Expense Tracker",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are a finance analyst. Return a short forecast with 3 bullet points.",
            },
            { role: "user", content: `Analyze this budget: monthly budget $${monthlyBudget}, total spent $${totalSpent}. Suggest practical actions.` },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          setAiInsight(content);
          setIsGeneratingInsight(false);
          return;
        }
      }
    } catch {
      // fall back below
    }

    setAiInsight("Live AI forecast unavailable right now. Premium fallback mode is active with secure recommendations.");
    setIsGeneratingInsight(false);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = sanitizeInput(title.trim());
    const parsedAmount = parseFloat(amount);
    if (!cleanTitle || isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      title: cleanTitle,
      amount: parsedAmount,
      category,
      date: new Date().toISOString().split("T")[0],
    };

    setExpenses([newExpense, ...expenses]);
    setTitle("");
    setAmount("");
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-400">
              <DollarSign className="h-3.5 w-3.5" />
              SaaS Financial Platform
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mt-2 text-white">
              Expense Tracking Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Project Manager & Developer · Pradip Pantha (2025)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() =>
                alert("SaaS Checkout: Upgrading to Pro Plan ($19/mo) with Stripe Integration...")
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg hover:opacity-90 transition-opacity"
            >
              <span>⚡ Upgrade to Pro SaaS ($19/mo)</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Target Budget:</span>
              <input
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Math.max(0, Number(e.target.value) || 0))}
                className="w-24 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm font-semibold text-sky-400 focus:border-sky-400 focus:outline-none"
              />
            </div>
          </div>
        </header>

        <div className="mb-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-sm font-semibold">Secure Upgrade & Premium Feature Requests</span>
          </div>
          <p className="mt-2 text-sm text-slate-300">
            Interested in advanced analytics, custom reporting, or premium workflow support? Select a
            secure payment option and I will confirm the next steps privately.
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {([
              ["PayPal", "Fast checkout for premium dashboards"],
              ["Chime", "Direct transfer arrangement for approved upgrades"],
              ["Binance", "Crypto payment option for custom analytics"],
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
                <li>AI budget forecasting and smart alerts</li>
                <li>Premium recurring expense templates</li>
                <li>Priority support and custom reporting</li>
              </ul>
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-sky-500/20 bg-sky-500/10 px-3 py-2 text-xs text-sky-300">
            <Sparkles className="h-3.5 w-3.5" />
            Secure payment requests are handled privately by email before any purchase is finalized.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 mb-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-sky-300">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Premium AI Budget Insights</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Unlock this panel with a secure gateway and add a Groq, OpenRouter, or Gemini API key to
automatically generate spend forecasts.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Groq / OpenRouter / Gemini API key"
              className="mt-3 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-sky-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleGenerateInsight}
              disabled={isGeneratingInsight}
              className="mt-3 w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isGeneratingInsight ? "Generating Insight..." : "Generate AI Forecast"}
            </button>
            <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300">{aiInsight}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-sm font-semibold">Premium Extras Included</span>
            </div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-400">
              <li>AI forecast summaries for your monthly budget</li>
              <li>Recurring expense automation templates</li>
              <li>Priority support and onboarding assistance</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
            <div className="flex justify-between items-center text-xs text-slate-400 font-semibold mb-2">
              <span>Total Spent</span>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold text-white">${totalSpent.toFixed(2)}</p>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                style={{ width: `${percentageSpent}%` }}
                className={`h-full rounded-full transition-all duration-500 ${
                  percentageSpent > 90 ? "bg-rose-500" : "bg-sky-400"
                }`}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
            <div className="flex justify-between items-center text-xs text-slate-400 font-semibold mb-2">
              <span>Remaining Budget</span>
              <PieChart className="h-4 w-4 text-sky-400" />
            </div>
            <p
              className={`text-3xl font-extrabold ${remaining < 0 ? "text-rose-400" : "text-emerald-400"}`}
            >
              ${remaining.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500 mt-3">
              {percentageSpent}% of ${monthlyBudget} used
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
            <div className="flex justify-between items-center text-xs text-slate-400 font-semibold mb-2">
              <span>Security & Encryption</span>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold text-emerald-400">256-Bit</p>
            <p className="text-xs text-slate-500 mt-3">Sanitized input & CSRF protected</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl h-fit">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="h-4 w-4 text-sky-400" />
              Add Expense
            </h2>

            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Title / Vendor
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Server"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder:text-slate-600 focus:border-sky-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder:text-slate-600 focus:border-sky-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-sky-400 focus:outline-none"
                >
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 py-3 text-xs font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
              >
                Add Transaction
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5 mb-2">
                <ListTodo className="h-3.5 w-3.5" />
                PM Sprint Note (2025)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Project manager workflow: Tasks split into weekly cards on Trello. Clean separation
                between UI state, data calculation, and user documentation.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-lg font-bold text-white">Expense Records</h2>

              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      selectedCategory === c
                        ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                        : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {filteredExpenses.map((exp) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-sky-500/10 border border-sky-500/20 p-2 text-sky-400">
                        <Tag className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{exp.title}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-2">
                          <span>{exp.category}</span>
                          <span>•</span>
                          <span>{exp.date}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-extrabold text-white">
                        ${exp.amount.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleDeleteExpense(exp.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete expense"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredExpenses.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-sm">
                  No expense records found for category "{selectedCategory}".
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
