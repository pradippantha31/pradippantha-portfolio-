import { useState } from "react";
import {
  Terminal,
  Cpu,
  Sparkles,
  Play,
  Copy,
  Check,
  Zap,
} from "lucide-react";

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

export default function App() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(PRESET_WORKFLOWS[0]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeOutput, setActiveOutput] = useState(PRESET_WORKFLOWS[0].output);
  const [copied, setCopied] = useState(false);

  const handleRunWorkflow = (workflow = selectedWorkflow) => {
    setSelectedWorkflow(workflow);
    setIsProcessing(true);
    setTimeout(() => {
      setActiveOutput(workflow.output);
      setIsProcessing(false);
    }, 800);
  };

  const sanitizeInput = (str: string) => str.replace(/[<>]/g, "");

  const handleRunCustomPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPrompt = sanitizeInput(customPrompt.trim());
    if (!cleanPrompt) return;

    setIsProcessing(true);
    setTimeout(() => {
      setActiveOutput(`// AI Inspection Output for: "${cleanPrompt}"
export function executeCustomWorkflow() {
  console.log("Analyzing code structure...");
  // Clean execution pipeline verified. Zero syntax errors.
  return { status: "SUCCESS", latency: "14ms" };
}`);
      setIsProcessing(false);
      setCustomPrompt("");
    }, 1000);
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
              Automated Code Analysis · Refactoring & Prompt Engineering Tooling (Pradip Pantha)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => alert("AI IaaS Subscription: Pro Developer API ($29/mo) - 500,000 Monthly Tokens Activated!")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
            >
              <span>🔑 Pro AI API Tier ($29/mo)</span>
            </button>
          </div>
        </header>

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
              <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                Custom AI Code Assistant
              </h2>

              <form onSubmit={handleRunCustomPrompt} className="space-y-3">
                <textarea
                  rows={3}
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Type code query or prompt (e.g. Audit security of my API middleware)..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white placeholder:text-slate-600 focus:border-sky-400 focus:outline-none resize-none"
                />

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Execute Analysis</span>
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
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>

            <div className="p-6 font-mono text-xs leading-relaxed text-sky-300 overflow-x-auto min-h-[350px] bg-slate-950/90 flex-1">
              {isProcessing ? (
                <div className="flex items-center gap-3 text-slate-400 animate-pulse py-10">
                  <Cpu className="h-5 w-5 text-sky-400 animate-spin" />
                  <span>Processing neural code transformation pipeline...</span>
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
