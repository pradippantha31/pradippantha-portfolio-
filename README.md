# Pradip Pantha Portfolio

A clean, modern portfolio website built with TanStack Start, React, Vite, and Tailwind CSS.

## Features

- Responsive single-page portfolio layout
- Clean content sections for intro, projects, and contact
- SSR-ready setup for deployment platforms such as Netlify

## Development

Requires Node.js 20+ and npm.

```sh
git clone <this-repository-url>
cd <repository-name>
npm install
npm run dev
```

## Available scripts

- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run lint` — run lint checks

## Deployment

This project is configured for Netlify with the Vite Netlify adapter and a Netlify config file. If you deploy from a private repository, make sure your Netlify account has access to the GitHub contributor.

## LLM usage guide

This project now includes a secure AI assistant pattern that keeps API keys on the server side. That is the safest approach for real applications.

### How to use LLMs in your projects

1. Choose a provider
   - OpenAI: strong general-purpose models
   - Anthropic: excellent reasoning and writing quality
   - Google Gemini: strong multimodal support
   - Groq: fast inference with open models
   - Meta Llama / Mistral / Qwen: open-weight options for self-hosting or experimentation

2. Keep secrets private
   - Never put API keys in frontend code
   - Use a server route or backend proxy
   - Store keys in environment variables

3. Start with simple prompts
   - Ask for summaries, code explanations, product ideas, or support replies
   - Add context and constraints to improve results

4. Use structured outputs when possible
   - Ask for JSON, bullet points, or code snippets
   - This makes it easier to integrate LLMs into apps

### Free or low-cost LLM resources

- Hugging Face: https://huggingface.co/
  - Great for open models, datasets, and demos
- Ollama: https://ollama.com/
  - Run open models locally on your machine
- LM Studio: https://lmstudio.ai/
  - Easy local LLM desktop experience
- OpenRouter: https://openrouter.ai/
  - Access many providers through one API
- Groq: https://groq.com/
  - Fast inference for open models
- Google AI Studio: https://aistudio.google.com/
  - Useful for Gemini experiments

### Free training data and pretrained resources

If you want to learn from or fine-tune models, these are strong starting points:

- Hugging Face Datasets: https://huggingface.co/datasets
- Common Crawl: https://commoncrawl.org/
- The Pile: https://pile.eleuther.ai/
- C4 (Colossal Clean Crawled Corpus): https://www.tensorflow.org/datasets/catalog/c4
- OpenWebText: https://skylion.ai/openwebtext/
- Wikipedia dumps: https://dumps.wikimedia.org/
- SQuAD / GLUE / MMLU benchmark sets for evaluation

### Good beginner projects with LLMs

- Chat assistant for a portfolio or support site
- Document summarizer for PDFs or notes
- AI coding assistant for code generation or refactoring
- Product idea generator or feature brainstormer
- RAG chatbot using your own documents

### Recommended learning path

- Start with prompt engineering and safe usage
- Learn to build a simple RAG workflow
- Learn the difference between prompting, fine-tuning, and retrieval
- Test open-source models locally with Ollama or LM Studio
- Move to hosted APIs once you need scale or better quality

### Important security and ethics notes

- Do not send private user data to public models without consent
- Use content filters and moderation where needed
- Be careful with copyrighted material and licensing
- Keep human review in the loop for sensitive workflows

## Tech stack

- TanStack Start
- React
- TypeScript
- Vite
- Tailwind CSS
