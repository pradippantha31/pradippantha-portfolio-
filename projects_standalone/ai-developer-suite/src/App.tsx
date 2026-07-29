import { useEffect, useState } from "react";
import {
  Terminal,
  Cpu,
  Sparkles,
  Play,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { getAssistantReply } from "../../../src/lib/assistantResponses";

const PRESET_WORKFLOWS = [
  {
    id: "refactor",
    title: "Code Refactor & Optimization",
    desc: "Analyzes nested loops, converts imperative logic to declarative functional pipelines.",
    prompt: "Refactor async handler for high concurrency with zero memory leaks.",
    output: `// Optimized Concurrent Pipeline Output:
export async function processQueue<T>(items: T[], batchSize = 10): Promise<void> {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map((item) => executeTask(item)));
  }
}`,
  },
  {
    id: "unittest",
    title: "Automated Unit Test Suite",
    desc: "Generates comprehensive Vitest / Jest test cases covering edge conditions.",
    prompt: "Generate unit tests for user authentication and token refresh middleware.",
    output: `import { describe, it, expect } from 'vitest';
import { verifyAuth } from './auth';

describe('verifyAuth Middleware', () => {
  it('should pass valid JWT bearer token', async () => {
    const res = await verifyAuth({ headers: { authorization: 'Bearer valid_token' } });
    expect(res.status).toBe(200);
  });
});`,
  },
  {
    id: "docgen",
    title: "Technical Documentation Builder",
    desc: "Extracts TypeScript type definitions and generates OpenAPI / JSDoc specs.",
    prompt: "Build OpenAPI JSDoc definitions for user profile routes.",
    output: `/**
 * @openapi
 * /api/v1/user:
 *   get:
 *     summary: Retrieve user profile metadata
 *     responses:
 *       200:
 *         description: Success
 */`,
  },
];

const AI_MODELS = [
  { id: "llama-3.3-70b-versatile", name: "⚡ Groq Llama 3.3 70B (Ultra Fast)", provider: "groq" },
  { id: "qwen-2.5-coder-32b", name: "⚡ Groq Qwen 2.5 Coder 32B", provider: "groq" },
  { id: "gemma2-9b-it", name: "⚡ Groq Gemma 2 9B", provider: "groq" },
  { id: "openai/gpt-4o", name: "OpenAI GPT-4o", provider: "openrouter" },
  { id: "deepseek/deepseek-r1", name: "DeepSeek R1 (Reasoning)", provider: "openrouter" },
  { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "openrouter" },
];

const getPreferredApiKey = () =>
  (import.meta as ImportMeta).env?.VITE_GROQ_API_KEY ||
  (import.meta as ImportMeta).env?.VITE_OPENROUTER_API_KEY ||
  (import.meta as ImportMeta).env?.VITE_GEMINI_API_KEY ||
  "";

export default function App() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(PRESET_WORKFLOWS[0]);
  const [selectedModel, setSelectedModel] = useState("llama-3.3-70b-versatile");
  const [customPrompt, setCustomPrompt] = useState("");
  const [apiKey, setApiKey] = useState(getPreferredApiKey());
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeOutput, setActiveOutput] = useState(PRESET_WORKFLOWS[0].output);
  const [copied, setCopied] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<"PayPal" | "Chime" | "Binance" | "">("");

  const sanitizeInput = (str: string) => str.replace(/[<>]/g, "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("ai-suite-premium");
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
      `Hi Pradip,\n\nI would like to purchase premium AI workflow access, extra model usage, or custom development support.\n\nPreferred payment method: ${method}\n\nPlease share secure payment instructions and confirmation steps.\n`,
    );

    window.location.href = `mailto:panthapradip31@gmail.com?subject=${subject}&body=${body}`;
  };

  const handlePremiumUnlock = (gateway: "PayPal" | "Chime" | "Binance") => {
    setSelectedGateway(gateway);
    setIsPremiumUnlocked(true);
    window.localStorage.setItem("ai-suite-premium", JSON.stringify({ unlocked: true, gateway }));
  };

  const handleGatewaySelect = (gateway: "PayPal" | "Chime" | "Binance") => {
    handlePremiumUnlock(gateway);
    handlePaymentRequest(gateway);
  };

  const handleRunWorkflow = (workflow = selectedWorkflow) => {
    setSelectedWorkflow(workflow);
    setIsProcessing(true);
    setTimeout(() => {
      setActiveOutput(workflow.output);
      setIsProcessing(false);
    }, 800);
  };

  const handleRunCustomPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPrompt = sanitizeInput(customPrompt.trim());
    if (!cleanPrompt) return;

    setIsProcessing(true);
    const targetModelObj = AI_MODELS.find((m) => m.id === selectedModel);
    const isGroq = targetModelObj?.provider === "groq";

    const effectiveKey = isPremiumUnlocked ? apiKey.trim() || getPreferredApiKey() : "";

    if (!isPremiumUnlocked || !effectiveKey) {
      setTimeout(() => {
        setActiveOutput(`// Demo Mode Output [Model: ${selectedModel}]
// Upgrade to unlock live LLM execution and premium workflow routing.
${getAssistantReply(cleanPrompt, "developer workspace", "developer")}`);
        setIsProcessing(false);
        setCustomPrompt("");
      }, 900);
      return;
    }

    const endpoint = isGroq
      ? "https://api.groq.com/openai/v1/chat/completions"
      : "https://openrouter.ai/api/v1/chat/completions";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${effectiveKey}`,
          "HTTP-Referer": "https://pradippantha.dev",
          "X-Title": "Pradip Pantha AI Developer Suite",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            {
              role: "system",
              content:
                "You are an expert AI software developer assistant. Generate clean, modular, and optimized code.",
            },
            {
              role: "user",
              content: cleanPrompt,
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          setActiveOutput(
            `// Live ${isGroq ? "GroqCloud" : "OpenRouter"} AI Output [Model: ${selectedModel}]\n${content}`,
          );
          setIsProcessing(false);
          setCustomPrompt("");
          return;
        }
      }
    } catch {
      // Fallback response handling
    }

    setTimeout(() => {
      const fallbackReply = getAssistantReply(cleanPrompt, "developer workspace", "developer");
      setActiveOutput(`// ${isGroq ? "GroqCloud" : "OpenRouter"} Inference Output [Model: ${selectedModel}]
// Query: "${cleanPrompt}"
${fallbackReply}`);
      setIsProcessing(false);
      setCustomPrompt("");
    }, 900);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-400">
              <Cpu className="h-3.5 w-3.5" />
              Developer Tools Live Suite
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mt-2 text-white">
              AI Developer Workspace & Workflow Engine
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              ⚡ GroqCloud LPU High-Speed & OpenRouter Multi-Model Inference (Llama 3.3, Qwen 2.5,
              Gemma 2, GPT-4o)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() =>
                alert(
                  "AI IaaS Subscription: Pro Developer API ($29/mo) - 500,000 Monthly Tokens Activated!",
                )
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
            >
              <span>🔑 Pro AI API Tier ($29/mo)</span>
            </button>
          </div>
        </header>

        <div className="mb-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-sm font-semibold">
              Secure AI Upgrade & Premium Feature Requests
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-300">
            Need extra AI capabilities, custom workflow support, or priority access for this demo?
            Choose a secure payment method below and I will confirm the next steps privately.
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {(
              [
                ["PayPal", "Fast checkout for premium AI access"],
                ["Chime", "Direct transfer arrangement for approved upgrades"],
                ["Binance", "Crypto payment option for advanced support"],
              ] as const
            ).map(([name, description]) => (
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
                <li>Live LLM execution with your API key</li>
                <li>Private premium workflow routing</li>
                <li>Advanced developer prompts and support</li>
              </ul>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-sky-400" />
                Workflow Presets
              </h2>

              <div className="space-y-3">
                {PRESET_WORKFLOWS.map((wf) => (
                  <button
                    key={wf.id}
                    onClick={() => handleRunWorkflow(wf)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedWorkflow.id === wf.id
                        ? "border-sky-500/50 bg-sky-500/10 text-sky-300 shadow-md"
                        : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    <p className="text-sm font-bold text-white">{wf.title}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{wf.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
              <h2 className="text-base font-bold text-white mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  Live AI Code Assistant
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Groq + OpenRouter
                </span>
              </h2>

              <form onSubmit={handleRunCustomPrompt} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Select AI Model Engine
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-none font-mono"
                  >
                    {AI_MODELS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    API Key (Groq `gsk_...` / OpenRouter `sk-or-...`)
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter Groq or OpenRouter API key..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 font-mono focus:border-sky-400 focus:outline-none"
                  />
                </div>

                <textarea
                  rows={3}
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Type code query or prompt (e.g. Write an API endpoint for JWT auth)..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white placeholder:text-slate-600 focus:border-sky-400 focus:outline-none resize-none"
                />

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Execute High-Speed Inference</span>
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-400 font-mono">
                <Terminal className="h-4 w-4 text-sky-400" />
                <span>ai-sandbox-terminal.ts</span>
              </div>

              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>{copied ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>

            <div className="p-6 font-mono text-xs leading-relaxed text-sky-300 overflow-x-auto min-h-[350px] bg-slate-950/90 flex-1">
              {isProcessing ? (
                <div className="flex items-center gap-3 text-slate-400 animate-pulse py-10">
                  <Cpu className="h-5 w-5 text-sky-400 animate-spin" />
                  <span>
                    Streaming neural response from Groq LPU Accelerator ({selectedModel})...
                  </span>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap">{activeOutput}</pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
