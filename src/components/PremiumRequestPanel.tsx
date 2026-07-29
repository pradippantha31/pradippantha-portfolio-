import { useState } from "react";
import { ShieldCheck, CreditCard, Send } from "lucide-react";

type Gateway = "PayPal" | "Chime" | "Binance";

interface PremiumRequestPanelProps {
  projectName: string;
  description: string;
}

const GATEWAY_OPTIONS: Array<{ id: Gateway; label: string; subtitle: string }> = [
  { id: "PayPal", label: "PayPal", subtitle: "Fast checkout for premium access" },
  { id: "Chime", label: "Chime", subtitle: "Direct transfer arrangement" },
  { id: "Binance", label: "Binance", subtitle: "Crypto payment option" },
];

const buildMailto = (gateway: Gateway, projectName: string, email: string) => {
  const to = "panthapradip31@gmail.com";
  const subject = encodeURIComponent(`Premium AI Upgrade Request — ${gateway}`);
  const body = encodeURIComponent(
    `Hi Pradip,%0D%0A%0D%0AI would like to purchase premium access for ${projectName}.%0D%0A%0D%0ASelected gateway: ${gateway}%0D%0A${
      email ? `Reply email: ${email}%0D%0A%0D%0A` : ""
    }Please send me the secure payment instructions and confirmation details.%0D%0A%0D%0AThanks!`,
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
};

export function PremiumRequestPanel({ projectName, description }: PremiumRequestPanelProps) {
  const [selectedGateway, setSelectedGateway] = useState<Gateway | "">("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | { type: "success" | "error" | "info"; text: string }>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePremiumRequest = async (gateway: Gateway) => {
    setSelectedGateway(gateway);
    setStatus({ type: "info", text: `Submitting premium request for ${gateway}...` });
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/premium-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gateway, project: projectName, email: email.trim() }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        const message = error?.error || "Could not submit the premium request. Please try again.";
        setStatus({ type: "error", text: message });
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();
      setStatus({
        type: "success",
        text: data.message || "Premium request submitted successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        text: "Network issue while creating the request. Opening your mail client as fallback.",
      });
      window.location.href = buildMailto(gateway, projectName, email.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-sky-300">
          <ShieldCheck className="h-4 w-4" />
          <div>
            <p className="text-sm font-semibold text-white">Premium Access Request</p>
            <p className="text-xs text-slate-400">{description}</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
          <Send className="h-3.5 w-3.5" />
          Secure backend request
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 mb-4">
        {GATEWAY_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handlePremiumRequest(option.id)}
            disabled={isSubmitting}
            className={`rounded-2xl border p-4 text-left transition-all ${
              selectedGateway === option.id
                ? "border-sky-400/60 bg-sky-500/10"
                : "border-slate-700 bg-slate-950/70 hover:border-sky-400/50"
            } focus:outline-none focus:ring-2 focus:ring-sky-500/30`}
          >
            <div className="flex items-center gap-2 text-white">
              <CreditCard className="h-4 w-4 text-sky-400" />
              <span className="text-sm font-semibold">{option.label}</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{option.subtitle}</p>
          </button>
        ))}
      </div>

      <label className="block text-xs font-semibold text-slate-400 mb-2">
        Confirmation email (optional)
      </label>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="your@email.com"
        className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
      />

      {status ? (
        <div
          className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
            status.type === "success"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
              : status.type === "error"
                ? "border-rose-500/20 bg-rose-500/10 text-rose-200"
                : "border-slate-700 bg-slate-950/70 text-slate-200"
          }`}
        >
          {status.text}
        </div>
      ) : null}
    </div>
  );
}
