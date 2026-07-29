import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function resolveAssistantProvider(provider: string, requestedModel: string) {
  const normalized = String(provider || "openrouter").toLowerCase();
  if (normalized === "groq") {
    return {
      key: process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY,
      endpoint: "https://api.groq.com/openai/v1/chat/completions",
      model: requestedModel || "llama-3.3-70b-versatile",
      title: "Groq",
    };
  }

  if (normalized === "gemini") {
    return {
      key: process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY,
      endpoint: "https://openrouter.ai/api/v1/chat/completions",
      model: requestedModel || "google/gemini-1.5-pro",
      title: "Gemini",
    };
  }

  return {
    key: process.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY,
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    model: requestedModel || "openai/gpt-4o-mini",
    title: "OpenRouter",
  };
}

function isSupportedGateway(gateway: string) {
  return ["PayPal", "Chime", "Binance"].includes(gateway);
}

async function handlePremiumRequest(request: Request): Promise<Response> {
  const body = await request.json().catch(() => ({}));
  const gateway = String(body?.gateway || "").trim();
  const project = String(body?.project || "portfolio upgrade").trim();
  const email = String(body?.email || "").trim();

  if (!isSupportedGateway(gateway)) {
    return new Response(
      JSON.stringify({ error: "Valid gateway required: PayPal, Chime, or Binance." }),
      {
        status: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
      },
    );
  }

  console.info("Premium upgrade request received", { gateway, project, email });

  return new Response(
    JSON.stringify({
      status: "ok",
      message: `Premium access request received for ${project}. Selected gateway: ${gateway}.`,
      instructions: `Please send payment details or proof of payment via email to ${
        email || "panthapradip31@gmail.com"
      }, and the request will be confirmed privately.`,
      gateway,
      project,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
    },
  );
}

async function handleAssistant(request: Request): Promise<Response> {
  try {
    const body = await request.json().catch(() => ({}));
    const prompt = String(body?.prompt || "").slice(0, 900);
    const context = String(body?.context || "");
    const mode = String(body?.mode || "project");
    const provider = String(body?.provider || "openrouter");
    const model = String(body?.model || "");

    if (!prompt) {
      return new Response(JSON.stringify({ answer: "Please provide a question or prompt to continue." }), {
        status: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    const providerConfig = resolveAssistantProvider(provider, model);
    if (!providerConfig.key) {
      return new Response(
        JSON.stringify({
          answer: `Secure ${mode} assistant is ready with a fallback explanation. ${
            context ? "Context is being used for guidance." : ""
          }`,
        }),
        {
          headers: { "content-type": "application/json; charset=utf-8" },
        },
      );
    }

    const response = await fetch(providerConfig.endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${providerConfig.key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://pradippantha.dev",
        "X-Title": "Pradip Pantha Portfolio Assistant",
      },
      body: JSON.stringify({
        model: providerConfig.model,
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content: `You are a secure, advanced AI assistant for a portfolio site. Follow these rules: 1) stay factual and concise, 2) mention security and privacy best practices, 3) recommend actionable improvements, 4) avoid exposing secrets, 5) be helpful for product, engineering, and growth discussions. Context: ${context}`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const payload = await response.json().catch(() => ({}));
    const answer = payload?.choices?.[0]?.message?.content?.trim();

    return new Response(JSON.stringify({ answer: answer || "No response was generated." }), {
      status: response.ok ? 200 : 502,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  } catch (error) {
    console.error("Assistant route error", error);
    return new Response(JSON.stringify({ answer: "The assistant encountered an error while generating a response." }), {
      status: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const pathname = new URL(request.url).pathname;
    if (request.method === "POST" && pathname === "/api/premium-request") {
      return handlePremiumRequest(request);
    }
    if (request.method === "POST" && pathname === "/api/assistant") {
      return handleAssistant(request);
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
