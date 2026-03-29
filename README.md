<p align="center">
  <img src="https://img.shields.io/badge/AI-Gemini_2.0_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini 2.0" />
  <img src="https://img.shields.io/badge/Framework-Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<h1 align="center">🧠 ET Neuron</h1>
<h3 align="center"><em>News That Thinks With You</em></h3>

<p align="center">
  An AI-native news experience for the <strong>Economic Times</strong> that reimagines how business news is consumed — personalized, interactive, visual, predictive, and multilingual.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## 📋 Table of Contents

- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Features](#-features)
  - [My ET — Personalized Newsroom](#1--my-et--personalized-newsroom)
  - [News Navigator — Intelligence Briefings](#2--news-navigator--intelligence-briefings)
  - [AI News Video Studio](#3--ai-news-video-studio)
  - [Story Arc Tracker](#4--story-arc-tracker)
  - [Vernacular Engine](#5-️-vernacular-business-news-engine)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Design System](#-design-system)
- [How It Works — Deep Dive](#-how-it-works--deep-dive)
- [Deployment](#-deployment)
- [Pitch Deck](#-pitch-deck)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔴 The Problem

Business news in 2026 is still delivered like it's 2005:

| Pain Point | Impact |
|---|---|
| **One-size-fits-all** | A mutual fund investor and a college student see the identical homepage |
| **Information overload** | A Union Budget generates 50+ articles — readers open 2, miss 90% |
| **No video at scale** | 500+ articles/day but only 5-10 get video treatment |
| **Language barrier** | 800M+ non-English speakers get Google Translate quality with zero cultural context |
| **No narrative tracking** | Complex stories (RBI rate cycles, startup wars) lack continuity across weeks |

---

## 💡 The Solution

**ET Neuron** treats AI not as a bolt-on feature, but as **the medium itself**. Every story is re-synthesized, re-structured, and re-presented for each individual reader's context.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   📰 Raw ET Articles                                        │
│        │                                                    │
│        ▼                                                    │
│   ┌─────────────────────────────────┐                       │
│   │     🧠 Gemini 2.0 Flash        │                       │
│   │     (AI Processing Core)        │                       │
│   └──┬──────┬──────┬──────┬──────┬──┘                       │
│      │      │      │      │      │                          │
│      ▼      ▼      ▼      ▼      ▼                          │
│   🧠MyET 🧭Nav  🎬Video 📡Arc  🗣️Lang                      │
│                                                             │
│   Every module = same article, different intelligence       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 1. 🧠 My ET — Personalized Newsroom

> *"Not just a filtered feed — a fundamentally different news experience for every user."*

| Feature | Description |
|---|---|
| **Persona Engine** | Three adaptive modes: Mutual Fund Investor, Startup Founder, Business Student |
| **Portfolio Pulse** | Real-time watchlist tracking with AI-powered investment insights |
| **Time Intelligence** | Morning Briefing → Deep Analysis → Evening Catch-Up modes |
| **Serendipity Engine** | 15% of your feed comes from *outside* your bubble to prevent echo chambers |
| **Smart Ranking** | Articles scored using persona priority tags, impact scores, and recency |

```
User Profile + Watchlist + Time of Day
            │
            ▼
  ┌───────────────────┐
  │  Content Scoring   │
  │  Engine (UIP)      │
  │                    │
  │  priority_tags × 3 │
  │  impact_score × 2  │
  │  recency × 1       │
  └────────┬──────────┘
           │
           ▼
  Personalized Feed + Portfolio Pulse + Serendipity Sidebar
```

**Key Implementation Details:**
- Client-side persona state with `useState` for instant switching
- `getArticlesForPersona()` performs O(1) tag-matching against user priority vectors
- Watchlist data is persona-specific (investor sees stocks, founder sees startup valuations)
- Contextual AI insights adapt language to the selected role

---

### 2. 🧭 News Navigator — Intelligence Briefings

> *"Instead of reading 8 separate articles about RBI, interact with one synthesized briefing."*

| Feature | Description |
|---|---|
| **Multi-Article Synthesis** | Clusters 4-8 articles on a topic into a single structured document |
| **Depth Slider** | Adjust from Beginner → Standard → Expert level explanations |
| **Structured Sections** | Executive Summary → Key Decisions → Data Points → Expert Opinions → Predictions |
| **Conversational Q&A** | RAG-powered chat grounded in the source article corpus |
| **Source Attribution** | Every insight traces back to specific ET articles |

```
Articles [A1, A2, A3, A4]          User Question
        │                               │
        ▼                               ▼
┌──────────────────┐          ┌──────────────────┐
│ Briefing Prompt  │          │  RAG Chat Prompt │
│ (system + data)  │          │ (context + query)│
└────────┬─────────┘          └────────┬─────────┘
         │                             │
         ▼                             ▼
   Gemini 2.0 Flash             Gemini 2.0 Flash
         │                             │
         ▼                             ▼
 Structured JSON Briefing       Grounded Answer
 {                              "Based on the ET
   executiveSummary,             article by Tanal
   keyDecisions[],               Bhat, your EMI
   dataPoints[],                 could decrease
   expertOpinions[],             by ₹1,200/month"
   whatToWatchNext[]
 }
```

---

### 3. 🎬 AI News Video Studio

> *"Transform any article into a broadcast-quality 60-120 second video."*

| Feature | Description |
|---|---|
| **Screenplay Generation** | Gemini creates scene-by-scene broadcast scripts with narration and data overlays |
| **4 Broadcast Styles** | 🔴 Breaking News · 📊 Market Wrap · 🎓 Explainer · 💰 Earnings Flash |
| **Browser-Native Renderer** | CSS + Canvas based broadcast viewport — zero external video APIs |
| **AI Narration** | Web Speech API provides real-time text-to-speech in broadcast tone |
| **Scene Navigation** | Click any scene to jump; auto-play with progress tracking |

```
Article ──► Gemini Screenplay ──► Browser Renderer ──► Web Speech API
                │                        │                    │
                ▼                        ▼                    ▼
           {scenes: [              CSS Broadcast         AI Voice
             {type: "intro",       Viewport with          Narration
              narration: "...",    Lower Third,           (60-120s)
              visual: "...",       Tickers, and
              dataOverlay: {...}   Data Overlays
             }, ...
           ]}
```

**Why this approach?**
- **Zero marginal cost per video** — no paid video generation APIs
- **Instant generation** — screenplay in ~3 seconds, rendering is real-time
- **Fully customizable** — style, tone, and branding controlled via CSS

---

### 4. 📡 Story Arc Tracker

> *"Pick any ongoing story and AI builds the complete visual narrative."*

| Feature | Description |
|---|---|
| **Interactive Timeline** | Visual event chronology with date markers and event classification |
| **Entity Extraction** | Gemini-powered NER identifies key players, organizations, and their roles |
| **Relationship Mapping** | Visualizes connections (competitor, regulator, partner) between entities |
| **Sentiment Analysis** | Bullish/Neutral/Bearish breakdown across coverage over time |
| **Predictions** | "What to Watch Next" — AI-generated forward-looking analysis |
| **Contrarian Views** | Surfaces disagreements and minority perspectives |

```
Story Arc: "Quick Commerce War"
│
├── Timeline ──────────────────────────────────
│   Jan 2025        Mar 2025        Jun 2025
│   ●───────────────●───────────────●──────►
│   Blinkit         Zepto $1B       Flipkart
│   Launch          Funding         Minutes
│
├── Key Players ───────────────────────────────
│   [Zomato] ←competitor→ [Zepto]
│   [Flipkart] ←entrant→ [Quick Commerce]
│   [DPIIT] ←regulator→ [All Players]
│
├── Sentiment ─────────────────────────────────
│   🟢 Bullish: 55%  🟡 Neutral: 30%  🔴 Bearish: 15%
│
└── Predictions ───────────────────────────────
    🔮 "Consolidation expected by Q3 2026"
    🔮 "Regulatory intervention likely on dark stores"
```

---

### 5. 🗣️ Vernacular Business News Engine

> *"Not literal translation — culturally adapted business news."*

| Feature | Description |
|---|---|
| **4 Languages** | Hindi (हिन्दी), Tamil (தமிழ்), Telugu (తెలుగు), Bengali (বাংলা) |
| **4-Layer Adaptation** | Translate → Simplify → Localize → Culturally Frame |
| **Smart Code-Mixing** | Preserves natural bilingual patterns (e.g., "RBI ने repo rate..." ) |
| **Regional Impact** | Auto-generated local context ("What this means for Tamil Nadu") |
| **Business Glossary** | Technical terms explained with translations and definitions |
| **Audio Mode** | Web Speech API TTS in the target language |
| **Side-by-Side View** | Original English alongside adapted version for comparison |

```
English Article
      │
      ▼
┌─────────────────────────────────────────┐
│         Gemini Cultural Adaptation       │
│                                          │
│  Layer 1: Translation (Semantic)         │
│  Layer 2: Simplification (Readability)   │
│  Layer 3: Localization (Regional Terms)  │
│  Layer 4: Cultural Framing (Context)     │
│                                          │
│  + Smart Code-Mixing Heuristics          │
│  + Business Glossary Generation          │
│  + Regional Impact Analysis              │
└─────────────────────────────────────────┘
      │
      ▼
Adapted Article + Local Impact + Glossary + Audio
```

---

## 🏗 Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐  │
│  │  My ET   │ │Navigator │ │  Video   │ │Story Arc │ │Verna-│  │
│  │  Page    │ │  Page    │ │  Studio  │ │  Page    │ │cular │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └──┬───┘  │
│       │             │            │             │          │      │
│  ┌────┴─────────────┴────────────┴─────────────┴──────────┴───┐  │
│  │                    Shared Components                        │  │
│  │              (Navbar, ArticleCard, Widgets)                  │  │
│  └─────────────────────────┬───────────────────────────────────┘  │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │ HTTP (fetch)
┌────────────────────────────┼─────────────────────────────────────┐
│                    SERVER  │  (Next.js API Routes)               │
│                            ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                    API Layer                              │    │
│  │  /api/adapt  /api/briefing  /api/video  /api/story-arc   │    │
│  │                               /api/vernacular             │    │
│  └──────────────────────┬───────────────────────────────────┘    │
│                         │                                        │
│  ┌──────────────────────▼───────────────────────────────────┐    │
│  │              src/lib/gemini.ts                             │    │
│  │         (Centralized AI Service Layer)                     │    │
│  │                                                           │    │
│  │  • callGemini()       — Core LLM interface                │    │
│  │  • generateBriefing() — Multi-article synthesis           │    │
│  │  • generateScreenplay() — Video script generation         │    │
│  │  • adaptToVernacular() — Cultural translation             │    │
│  │  • extractEntities()  — NER + relationship mapping        │    │
│  │  • adaptForPersona()  — Persona-based rewriting           │    │
│  └──────────────────────┬───────────────────────────────────┘    │
│                         │                                        │
│  ┌──────────────────────▼───────────────────────────────────┐    │
│  │              src/data/articles.ts                          │    │
│  │           (Curated ET Article Corpus)                      │    │
│  │                                                           │    │
│  │  • 15 realistic articles with full metadata               │    │
│  │  • 3 story arcs with timelines and events                 │    │
│  │  • 3 user personas with priority tag vectors              │    │
│  │  • Scoring functions for personalization                  │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                             │
                             ▼
              ┌──────────────────────────┐
              │   Google Gemini 2.0 Flash │
              │   (External AI Service)   │
              │                          │
              │   • 1M token context     │
              │   • Sub-second latency   │
              │   • Multilingual         │
              │   • Structured JSON      │
              └──────────────────────────┘
```

### Data Flow Diagram

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   User      │      │   Client    │      │   Server    │
│   Action    │─────►│   State     │─────►│   API       │
│             │      │   (React)   │      │   Route     │
└─────────────┘      └──────┬──────┘      └──────┬──────┘
                            │                     │
                            │                     ▼
                            │              ┌─────────────┐
                            │              │  Gemini.ts  │
                            │              │  Service    │
                            │              └──────┬──────┘
                            │                     │
                            │                     ▼
                            │              ┌─────────────┐
                            │              │  Gemini API │
                            │              │  (Google)   │
                            │              └──────┬──────┘
                            │                     │
                            │◄────────────────────┘
                            │  Structured JSON Response
                            ▼
                     ┌─────────────┐
                     │   Rendered  │
                     │   UI        │
                     └─────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **AI Core** | Google Gemini 2.0 Flash | All intelligence — synthesis, NER, translation, screenplay |
| **Frontend** | Next.js 16 (App Router) | Server-side rendering, file-based routing, API routes |
| **UI** | React 19 | Component-based reactive UI with hooks |
| **Language** | TypeScript 5 | Type-safe development across frontend and backend |
| **Styling** | Vanilla CSS (Custom Properties) | "Bloomberg-meets-Apple" dark design system |
| **Animation** | Framer Motion | Smooth transitions and micro-interactions |
| **Icons** | Lucide React | Consistent, lightweight icon library |
| **Audio** | Web Speech API | Zero-cost text-to-speech in 50+ languages |
| **Video** | CSS + Canvas (Browser-native) | Broadcast-style rendering with no external dependencies |
| **Deployment** | Vercel | Zero-config, edge-optimized hosting |

### Why These Choices?

- **Gemini 2.0 Flash** over GPT-4 — 10x cheaper, 1M token context, native multilingual, structured JSON output
- **Next.js App Router** — co-located API routes mean the AI service layer is a single `fetch()` away
- **Vanilla CSS over Tailwind** — full control over the premium design system; custom properties enable theme-level changes
- **Web Speech API** — free, browser-native, no API key needed, supports Hindi/Tamil/Telugu/Bengali
- **No external video APIs** — browser-native rendering means zero per-video cost at any scale

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9+ (comes with Node.js)
- **Gemini API Key** — Get one free at [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/rohanjain1648/ET-HACKATHON.git
cd ET-HACKATHON

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Add your Gemini API key to .env.local
# GEMINI_API_KEY=your_key_here

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Your Google Gemini API key for all AI features |

> **Note:** The UI renders fully without the API key using the built-in article dataset. The API key is required for real-time AI features (briefing generation, video screenplays, translations, entity extraction).

---

## 📂 Project Structure

```
et/
├── public/                      # Static assets
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── api/                 # Server-side API routes
│   │   │   ├── adapt/           # POST /api/adapt — persona article adaptation
│   │   │   ├── briefing/        # POST /api/briefing — synthesis + RAG chat
│   │   │   ├── story-arc/       # POST /api/story-arc — entity extraction
│   │   │   ├── vernacular/      # POST /api/vernacular — cultural adaptation
│   │   │   └── video/           # POST /api/video — screenplay generation
│   │   ├── my-et/               # 🧠 Personalized Newsroom page
│   │   ├── navigator/           # 🧭 Intelligence Briefings page
│   │   ├── video-studio/        # 🎬 AI Video Studio page
│   │   ├── story-arc/           # 📡 Story Arc Tracker page
│   │   ├── vernacular/          # 🗣️ Vernacular Engine page
│   │   ├── pitch/               # 📊 10-Slide Pitch Deck page
│   │   ├── globals.css          # Design system (800+ lines)
│   │   ├── layout.tsx           # Root layout with fonts + nav
│   │   └── page.tsx             # Landing page / hero
│   ├── components/
│   │   └── Navbar.tsx           # Global navigation component
│   ├── data/
│   │   └── articles.ts          # Article corpus + personas + arcs
│   └── lib/
│       └── gemini.ts            # Centralized Gemini AI service
├── .env.example                 # Environment variable template
├── .env.local                   # Local environment (git-ignored)
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 📡 API Reference

All API routes accept `POST` requests with JSON bodies and return JSON responses.

### `POST /api/briefing`

Generate an intelligence briefing or ask follow-up questions.

**Generate Briefing:**
```json
{
  "action": "generate",
  "articleIds": ["a1", "a2", "a5"],
  "topic": "RBI Rate Cut Cycle"
}
```

**Chat (RAG Q&A):**
```json
{
  "action": "chat",
  "question": "How does this affect my home loan EMI?",
  "briefingContext": "Full article text..."
}
```

**Response (Generate):**
```json
{
  "executiveSummary": "The RBI has initiated...",
  "keyDecisions": [
    {
      "title": "Repo Rate Cut by 25 bps",
      "summary": "...",
      "impact": "bullish",
      "details": "..."
    }
  ],
  "dataPoints": [
    { "label": "Repo Rate", "value": "6.25%", "change": "-25 bps" }
  ],
  "expertOpinions": [
    { "name": "Raghuram Rajan", "role": "Former RBI Governor", "view": "bullish", "quote": "..." }
  ],
  "whatToWatchNext": ["April MPC meeting...", "..."],
  "marketReaction": "Sensex rallied 1.2%..."
}
```

---

### `POST /api/video`

Generate a broadcast screenplay from an article.

```json
{
  "articleId": "a1",
  "style": "breaking news"
}
```

**Response:**
```json
{
  "title": "RBI Cuts Repo Rate...",
  "duration": "90 seconds",
  "tone": "urgent, authoritative",
  "scenes": [
    {
      "id": 1,
      "type": "intro",
      "duration": "8s",
      "narration": "Breaking news from the Reserve Bank...",
      "visual": "RBI headquarters with rate overlay",
      "dataOverlay": { "label": "Repo Rate", "value": "6.25%", "trend": "down" }
    }
  ],
  "lowerThird": "BREAKING: RBI cuts repo rate to 6.25%"
}
```

---

### `POST /api/vernacular`

Culturally adapt an article to a regional language.

```json
{
  "articleId": "a1",
  "language": "Hindi",
  "region": "North India"
}
```

**Response:**
```json
{
  "title": "RBI ने repo rate में 25 बेसिस पॉइंट्स की कटौती की",
  "summary": "...",
  "content": "...",
  "localImpact": "उत्तर भारत के किसानों और छोटे कारोबारियों को...",
  "glossary": [
    { "term": "Repo Rate", "translation": "रेपो दर", "explanation": "वह दर जिस पर RBI बैंकों को..." }
  ]
}
```

---

### `POST /api/story-arc`

Extract entities and relationships from articles in a story arc.

```json
{
  "articleIds": ["a3", "a6"]
}
```

**Response:**
```json
{
  "entities": [
    { "name": "Zomato", "type": "company", "role": "Market leader", "sentiment": "bullish" }
  ],
  "relationships": [
    { "from": "Zomato", "to": "Zepto", "type": "competitor" }
  ],
  "predictions": ["Consolidation expected by Q3 2026"],
  "contrarian": [
    { "perspective": "Quick commerce margins remain unsustainable", "source": "Morgan Stanley" }
  ]
}
```

---

### `POST /api/adapt`

Adapt an article for a specific user persona.

```json
{
  "articleId": "a1",
  "persona": "investor"
}
```

---

## 🎨 Design System

ET Neuron uses a custom "Bloomberg-meets-Apple News" design language:

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0A0E17` | Page background |
| `--bg-surface` | `#111827` | Card/container background |
| `--accent-primary` | `#00D4AA` | Primary CTA, highlights, links |
| `--accent-blue` | `#3B82F6` | Secondary accent, Navigator |
| `--accent-danger` | `#FF4757` | Breaking news, bearish |
| `--accent-warm` | `#FFA502` | Warnings, earnings |
| `--accent-purple` | `#8B5CF6` | Story Arc, premium features |

### Typography

| Font | Usage |
|---|---|
| **Outfit** | Headlines, page titles |
| **Inter** | Body text, UI labels |
| **JetBrains Mono** | Data points, monospace values |

### Component Patterns

- **Glassmorphism cards** with `backdrop-filter: blur(20px)` and subtle borders
- **Gradient CTAs** with hover lift animations
- **Impact badges** with color-coded sentiment (bullish/bearish/neutral)
- **Bento grid layouts** for dashboard-style content organization

---

## 🔬 How It Works — Deep Dive

### Personalization Pipeline

```
1. User selects persona (Investor/Founder/Student)
2. Client calls getArticlesForPersona(persona)
3. Each article scored: Σ(tag ∈ priorityTags) × 3 + impactScore × 2
4. Articles sorted by composite score (descending)
5. Serendipity Engine: articles with ZERO tag overlap added at 15% ratio
6. Time mode adjusts article count: Morning(6) / Deep(10) / CatchUp(5)
```

### Briefing Synthesis

```
1. User selects topic cluster (e.g., "RBI Rate Cut Cycle")
2. Client sends articleIds to POST /api/briefing
3. Server fetches full article content from data layer
4. Gemini prompt: "You are an ET senior editor. Synthesize these articles..."
5. Response parsed as structured JSON with 6 sections
6. Follow-up Q&A uses article corpus as RAG context
```

### Video Generation

```
1. User selects article + broadcast style
2. POST /api/video sends to Gemini with style-specific prompt
3. Gemini returns screenplay JSON (5-8 scenes)
4. Browser renderer displays scenes with CSS transitions
5. Web Speech API reads narration for each scene
6. Auto-advance with 6-second per scene timing
```

### Cultural Adaptation

```
1. User selects article + target language
2. POST /api/vernacular sends to Gemini with 4-layer prompt:
   Layer 1: Semantic translation (not literal)
   Layer 2: Simplification for general audience
   Layer 3: Regional terminology adaptation
   Layer 4: Cultural framing (local references, analogies)
3. Response includes adapted text + local impact + business glossary
4. Web Speech API provides audio in target language
```

---

## ☁️ Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable
vercel env add GEMINI_API_KEY
```

Or connect your GitHub repository to [Vercel Dashboard](https://vercel.com/new) for automatic deployments on every push.

### Production Build

```bash
npm run build
npm start
```

---

## 📊 Pitch Deck

A complete 10-slide interactive pitch deck is built into the application at `/pitch`:

| Slide | Title | Content |
|---|---|---|
| 1 | ET Neuron | Title + Abstract |
| 2 | The Problem | 4 pain points with data |
| 3 | The Vision | AI as the medium |
| 4 | Five Pillars | All 5 module descriptions |
| 5 | Tech Stack | Architecture diagram |
| 6 | Implementation | Deep-dive into each engine |
| 7 | Challenges vs Solutions | 6 challenge-solution pairs |
| 8 | Feasibility | Scale projections + cost analysis |
| 9 | Competitive Moat | 6 moat dimensions with strength bars |
| 10 | Conclusion | Vision statement + CTA |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is built for the **Economic Times Hackathon 2026**. All rights reserved.

---

<p align="center">
  Built with Next.js · Gemini 2.0 · ❤️<br/>
  <strong>ET Neuron — News That Thinks With You</strong>
</p>
