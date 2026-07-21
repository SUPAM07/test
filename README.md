# 🍋 Lemon AI – AI Social Media Scheduling Platform

> ### Commercial License Required
>
> This project is **Free for Personal Use**. A commercial license is **required** for any use of the code (in part or whole) for SaaS, client work, or production apps.
>
> 👉 **[Get Commercial License (30% OFF)](https://techwithemma.gumroad.com/l/ttxdw)**
> 👉 **[Read License Terms](https://github.com/TechWithEmmaYT/)**

---

## ❤️ Support the Channel

If this project helps you, you can support my work by:

* 🟢 [Try Insforge](https://insforge.dev/?utm_source=techwithemma)
* ☕ [Buy Me a Coffee](https://dub.sh/buy-me-coffee)
* 🎥 [Subscribe on YouTube](https://tinyurl.com/subcribe-to-techwithEmma)
* 🌟 Star this repository

---

## Watch the Full Build on YouTube

> In this video, you’ll build **Lemon AI**, an AI-powered Social Media Scheduling Platform from scratch. Learn how to manage multiple social channels, generate AI-powered content, automate scheduled posts with cron jobs, organize ideas using a Kanban board, and build a modern production-ready SaaS application.

👉 [Watch the Full Tutorial](https://www.youtube.com/)

---

## 🗝️ Key Features 👇

* 🔐 Authentication with **Clerk**
* 🔗 Connect and manage social media accounts
* 📱 Multiple social media channel support
* 📝 Create and manage posts
* 🤖 AI Assistant to generate, shorten, rephrase, and expand posts
* 👀 Custom preview components for each channel
* 📅 Calendar & List View
* ⏰ Automated post scheduling with cron jobs
* 📌 Kanban board for organizing content ideas
* ✨ AI-powered content idea generation
* 🌐 Built with **Next.js, React, Inngest, Clerk & Insforge**
* 🎨 Styled with **Tailwind CSS + Shadcn/UI**
* 🚀 Full-stack and deployment-ready

---

## Getting Started / Running the Code

1. **Sign up on Insforge:**
   👉 [https://insforge.dev/?utm_source=techwithemma](https://insforge.dev/?utm_source=techwithemma)

2. Create a **project** and connect it to your AI code editor.

3. Click Install on the insforge dashboard  **** → copy your `BASE_URL`, `ANON_KEY` & `APIKEY` → paste into your `.env` file.

4. Enable your Gemini AI models inside **Model Gateway**.

5. Watch the full video tutorial to follow the complete build process.

---

## License Information

Commercial use requires a paid license.
👉 [Get a Commercial License](https://techwithemma.gumroad.com/l/ttxdw)

For full license details, see the license file included in this repository.

---

## 📺 Subscribe for More Projects

I build real-world SaaS apps, AI systems, automation platforms, and production-grade applications.

🔔 Subscribe here:
👉 [https://tinyurl.com/subcribe-to-techwithEmma](https://tinyurl.com/subcribe-to-techwithEmma)

---

## Phase 2 Migration (Split Architecture)

The existing Next.js app remains intact while the new split architecture is now functional:

- `apps/server` - Node.js + Express + TypeScript API (`http://localhost:4000`)
- `apps/client` - React + TypeScript (Vite) frontend (`http://localhost:5173`)
- `packages/shared` - shared API/domain contracts used by server and client

Architecture (concise):

`apps/client` → `apps/server/api/v1/*` → service layer  
`apps/client` + `apps/server` → shared contracts from `packages/shared`

### Run both new apps in development

```bash
npm install
npm run dev:apps
```

### Run each app independently

```bash
# Server
npm run dev:server

# Client
npm run dev:client
```

### Build apps

```bash
# Build server + client
npm run build:apps

# Build Next.js + server + client
npm run build:all
```

### New Phase 2 API endpoints

- `GET /health` - base service health check
- `GET /api/v1/status` - versioned config/status payload
- `GET /api/v1/profile?includePreferences=true|false` - demo profile/session-style payload
- `POST /api/v1/assistant/respond` - assistant interaction endpoint
  - body: `{ "prompt": string, "action"?: "generate" | "rephrase" | "shorten" | "expand", "context"?: string }`

### Dev environment notes

- Server default port: `4000` (`PORT` env var can override)
- Client default port: `5173`
- Server CORS origin defaults to `http://localhost:5173` (`CLIENT_ORIGIN` env var can override)
- Client API base URL defaults to `http://localhost:4000` (`VITE_API_BASE_URL` can override)
