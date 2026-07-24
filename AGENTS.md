# Agent configuration

This repository is a personal portfolio built with TanStack Start, React 19, Vite, and Tailwind CSS.

## Key points for AI agents

- Use the repo's npm scripts for development and verification:
  - `npm install`
  - `npm run dev`
  - `npm run build`
  - `npm run lint`
  - `npm run format`
- The Vite config is in `vite.config.ts` and uses `@tanstack/react-start/plugin/vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, and `vite-tsconfig-paths`.
- The main page is implemented in `src/routes/index.tsx`.
- The app shell, error handling, and route root are in `src/routes/__root.tsx`.
- Keep the project as a plain Vite + TanStack Start portfolio app without extra wrappers or build plugins.

## Notes

- `bun.lock` is tracked in this repository; do not add or restore `package-lock.json` unless explicitly required.
