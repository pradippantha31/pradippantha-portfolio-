import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  Plus,
  Trash2,
  PieChart,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  ListTodo,
  TrendingUp,
  Tag,
} from "lucide-react";

export const Route = createFileRoute("/projects/expense-tracker")({
  component: ExpenseTrackerApp,
  head: () => ({
    meta: [
      { title: "Expense Tracking App — SaaS Live Demo | Pradip Pantha" },
      {
        name: "description",
        content: "Interactive Expense Tracking App SaaS built by Pradip Pantha.",
      },
    ],
  }),
});

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

function ExpenseTrackerApp() {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(500);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Form state
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Infrastructure");

  const filteredExpenses =
    selectedCategory === "All" ? expenses : expenses.filter((e) => e.category === selectedCategory);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = monthlyBudget - totalSpent;
  const percentageSpent = Math.min(100, Math.round((totalSpent / monthlyBudget) * 100));

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount || parseFloat(amount) <= 0) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parseFloat(amount),
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
        {/* Navigation Back */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-sky-400 hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>

        {/* App Title Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-400">
              <DollarSign className="h-3.5 w-3.5" />
              SaaS Live App
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mt-2 text-white font-display">
              Expense Tracking Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Group Project 2025 · Managed via Trello & Agile Sprints
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Monthly Target:</span>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(Number(e.target.value) || 0)}
              className="w-24 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm font-semibold text-sky-400 focus:border-sky-400 focus:outline-none"
            />
          </div>
        </header>

        {/* Overview Stat Cards */}
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
              <span>Total Transactions</span>
              <Calendar className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="text-3xl font-extrabold text-white">{expenses.length}</p>
            <p className="text-xs text-slate-500 mt-3">Active tracking session</p>
          </div>
        </div>

        {/* Main Grid: Form + Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Add Expense Form */}
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

            {/* PM Trello Sprint Note */}
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

          {/* Expense History List */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-lg font-bold text-white">Expense Records</h2>

              {/* Category Filter Pills */}
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

            {/* List */}
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
