import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAssistantReply } from "../lib/assistantResponses";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Mail,
  CheckCircle2,
  Minimize2,
  RefreshCw,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  action?: "email_form" | "quick_links";
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "Hi there! 👋 I'm Pradip's AI Portfolio Assistant. How can I help you today? Ask me about Pradip's CS background, AI prompt engineering skills, software projects, or leave a direct message for his inbox!",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];

const QUICK_PROMPTS = [
  "Tell me about Pradip's skills 🚀",
  "What SaaS projects has he built? 💻",
  "How can I contact Pradip directly? 📧",
  "Is he available for hire/roles? 💼",
];

const EMAIL_ADDRESS = "panthapradip31@gmail.com";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Email form drawer state inside chat
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorMsg, setVisitorMsg] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: query,
          context:
            "You are Pradip's portfolio assistant. Help visitors understand his skills, projects, and availability while staying concise, factual, and privacy-conscious.",
          mode: "portfolio",
        }),
      });

      const text = await response.text();
      let data: { answer?: string } | null = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }

      const botResponse =
        data?.answer ||
        (response.ok
          ? "I can help you explore Pradip's portfolio in more detail."
          : getAssistantReply(query, "You are Pradip's portfolio assistant.", "portfolio"));

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: (Date.now() + 2).toString(),
        sender: "bot",
        text: "The secure assistant is briefly unavailable, but I can still help you contact Pradip directly through the form below.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendDirectEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorEmail.trim() || !visitorMsg.trim()) return;

    const subject = encodeURIComponent(
      `New Visitor Message via Portfolio Chatbot from ${visitorName.trim()}`,
    );
    const body = encodeURIComponent(
      `Hi Pradip,\n\nYou received a new message via your AI Portfolio Chatbot:\n\nSender: ${visitorName.trim()}\nEmail: ${visitorEmail.trim()}\n\nMessage:\n${visitorMsg.trim()}\n\nBest regards,\nAI Portfolio Assistant`,
    );

    // Trigger user mail client
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;

    setEmailSent(true);
    setTimeout(() => {
      const confirmMsg: Message = {
        id: Date.now().toString(),
        sender: "bot",
        text: `Thank you, ${visitorName.trim()}! I have generated your email message to panthapradip31@gmail.com. Pradip will get back to you shortly!`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, confirmMsg]);
      setVisitorName("");
      setVisitorEmail("");
      setVisitorMsg("");
      setEmailSent(false);
    }, 1000);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 w-[360px] sm:w-[400px] h-[520px] rounded-3xl border border-border/80 bg-slate-950/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-slate-900/90 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-600 p-[1px]">
                  <div className="h-full w-full rounded-[11px] bg-slate-950 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-sky-400" />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                    Pradip's AI Assistant
                    <Sparkles className="h-3 w-3 text-purple-400" />
                  </h3>
                  <p className="text-[11px] text-slate-400">Online · Ready to connect</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Reset conversation"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs leading-relaxed scrollbar-thin">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.sender === "bot" && (
                    <div className="h-7 w-7 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-3.5 ${
                      m.sender === "user"
                        ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-br-none shadow-md"
                        : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                    <span className="block text-[9px] text-slate-400 mt-1.5 text-right opacity-70">
                      {m.time}
                    </span>
                  </div>

                  {m.sender === "user" && (
                    <div className="h-7 w-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 py-2">
                  <Bot className="h-4 w-4 text-sky-400 animate-bounce" />
                  <span className="text-[11px] animate-pulse">AI is typing response...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestion Pills */}
            <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSendMessage(p)}
                  className="rounded-full border border-slate-800 bg-slate-950 px-2.5 py-1 text-[10px] font-medium text-slate-400 hover:border-sky-500/40 hover:text-sky-300 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Direct Email Visitor Form Drawer */}
            <div className="p-3 border-t border-slate-800 bg-slate-900/90">
              <details className="group">
                <summary className="text-[11px] font-bold text-sky-400 cursor-pointer flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    Email Pradip Directly (panthapradip31@gmail.com)
                  </span>
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>

                <form onSubmit={handleSendDirectEmail} className="mt-3 space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:border-sky-400 focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email Address"
                    value={visitorEmail}
                    onChange={(e) => setVisitorEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:border-sky-400 focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    required
                    placeholder="Your message for Pradip..."
                    value={visitorMsg}
                    onChange={(e) => setVisitorMsg(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-xs text-white placeholder:text-slate-600 focus:border-sky-400 focus:outline-none resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 py-1.5 text-xs font-bold text-white shadow-md hover:opacity-90 transition-opacity"
                  >
                    <Send className="h-3 w-3" />
                    <span>Dispatch Email Message</span>
                  </button>
                </form>
              </details>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 p-3 bg-slate-950 border-t border-slate-800"
            >
              <input
                type="text"
                placeholder="Type your question or message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
              />
              <button
                type="submit"
                className="h-8 w-8 rounded-xl bg-sky-500 flex items-center justify-center text-slate-950 font-bold hover:bg-sky-400 transition-colors"
                title="Send Message"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 text-white shadow-xl shadow-sky-500/25 border border-white/20 transition-all"
        aria-label="Toggle AI Chatbot Assistant"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-teal-400" />
        </span>

        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Bot className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
        )}
      </motion.button>
    </div>
  );
}
