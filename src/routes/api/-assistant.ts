export const POST = async ({ request }: { request: Request }) => {
  const createJsonResponse = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const body = await request.json();
    const prompt = String(body?.prompt || "").slice(0, 900);
    const context = String(body?.context || "");
    const mode = String(body?.mode || "project");

    if (!prompt) {
      return createJsonResponse({ answer: "Please provide a question or prompt to continue." }, 400);
    }

    const provider = process.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;
    if (!provider) {
      return createJsonResponse({
        answer: `Secure ${mode} assistant is ready with a fallback explanation. ${context ? "Context is being used for guidance." : ""}`,
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${provider}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://pradippantha.dev",
        "X-Title": "Pradip Pantha Portfolio Assistant",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
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

    if (!response.ok) {
      return createJsonResponse({ answer: "The assistant is currently unavailable. Please try again shortly." }, 502);
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();

    return createJsonResponse({ answer: answer || "No response was generated." });
  } catch (error) {
    console.error("Assistant route error", error);
    return createJsonResponse(
      { answer: "The assistant encountered an error while generating a response." },
      500,
    );
  }
};
