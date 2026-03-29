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
  An AI-native news experience for the <strong>Economic Times</strong> that reimagines how business news is consumed — personalized, interactive, visual, predictive, and multilingual. Built for the ET Hackathon 2026.
</p>

<p align="center">
  <a href="#-problem-statement">Problem</a> •
  <a href="#-what-et-neuron-does">Solution</a> •
  <a href="#-system-overview">System Overview</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-core-logic--algorithms">Logic</a> •
  <a href="#-reproducing-the-project">Reproduce</a>
</p>

---

## 📋 Table of Contents

1. [Problem Statement](#-problem-statement)
2. [What ET Neuron Does](#-what-et-neuron-does)
   - [High-Level Overview](#high-level-overview)
   - [Module-Level Breakdown](#module-level-breakdown)
3. [System Overview](#-system-overview)
4. [System Architecture](#-system-architecture)
   - [Architecture Diagram](#architecture-diagram)
   - [Data Flow Diagrams](#data-flow-diagrams)
   - [AI Pipeline Architecture](#ai-pipeline-architecture)
   - [Request Lifecycle](#request-lifecycle)
5. [Core Logic & Algorithms](#-core-logic--algorithms)
   - [Personalization Scoring](#1-personalization-scoring-algorithm)
   - [Briefing Synthesis Pipeline](#2-briefing-synthesis-pipeline)
   - [Video Screenplay Engine](#3-video-screenplay-engine)
   - [Story Arc Entity Extraction](#4-story-arc-entity-extraction)
   - [Cultural Adaptation Layer](#5-cultural-adaptation-layer)
   - [JSON Safety Parsing](#6-json-safety-layer)
6. [Tech Stack & Rationale](#-tech-stack--rationale)
7. [Code Structure & Organization](#-code-structure--organization)
8. [API Reference](#-api-reference)
9. [Design System](#-design-system)
10. [Reproducing the Project](#-reproducing-the-project)
11. [Data Model](#-data-model)
12. [Contributing](#-contributing)
13. [License](#-license)

---

## 🔴 Problem Statement

> **"Business news in 2026 is still delivered like it's 2005 — static text articles, one-size-fits-all homepage, same format for everyone."**

The news industry faces five fundamental failures:

| # | Problem | Quantified Impact |
|---|---|---|
| 1 | **One-size-fits-all** | A ₹5 crore portfolio investor and a first-year MBA student see the **identical** homepage. Zero personalization beyond basic categories. |
| 2 | **Information overload** | A single event like the Union Budget generates **50+ articles**. Readers open 2, miss 90% of coverage. No synthesis layer exists. |
| 3 | **No video at scale** | ET publishes **500+ articles/day** but only 5-10 get video treatment. Short-form video dominates attention; news misses out completely. |
| 4 | **Language barrier** | **800M+ Indians** don't read English fluently. Existing "translations" are Google Translate quality — no cultural context, no financial nuance, no local relevance. |
| 5 | **No narrative tracking** | Complex stories (RBI rate cycles, startup wars, policy shifts) span **weeks or months**, but readers have no way to see the full timeline, the key players, or what might happen next. |

### The Core Insight

The problem isn't that we lack content — **the problem is that the same content is served to everyone in the same static format**. The article is the wrong atomic unit. The **reader's context** should determine what they see, how they see it, and in what format.

---

## 💡 What ET Neuron Does

### High-Level Overview

ET Neuron is a **complete reimagination** of business news delivery. It takes raw ET articles as input and **re-synthesizes, re-structures, and re-presents** every story differently depending on:

- **Who** is reading (investor, founder, student)
- **What** they care about (portfolio, competitors, learning)
- **How** they want to consume (text briefing, video, vernacular audio)
- **When** they're reading (morning briefing vs. deep analysis vs. evening catch-up)

```
                            ┌──────────────────────────┐
                            │  ONE RAW ARTICLE          │
                            │  "RBI Cuts Rate by 25bps" │
                            └────────────┬─────────────┘
                                         │
              ┌──────────────────────────┼──────────────────────────┐
              │                          │                          │
              ▼                          ▼                          ▼
   ┌─────────────────┐      ┌──────────────────┐      ┌──────────────────┐
   │  FOR INVESTOR    │      │  FOR FOUNDER      │      │  FOR STUDENT     │
   │                  │      │                   │      │                  │
   │  "Your HDFC &    │      │  "Lower borrowing │      │  "What is repo   │
   │   SBI holdings   │      │   costs = cheaper │      │   rate? Think    │
   │   are up 2.5%.   │      │   startup runway. │      │   of it as the   │
   │   Consider       │      │   Review your     │      │   'wholesale    │
   │   rebalancing."  │      │   debt strategy." │      │   price' of     │
   │                  │      │                   │      │   money."        │
   └─────────────────┘      └──────────────────┘      └──────────────────┘
              │                          │                          │
              ▼                          ▼                          ▼
    📊 Portfolio Pulse          🧭 Strategic Brief          🎓 Explainer Mode
    🎬 Market Wrap Video        🎬 Earnings Flash           🎬 Deep Explainer
    🗣️ Hindi Adaptation         🗣️ Telugu Adaptation        🗣️ Bengali Adaptation
```

### Module-Level Breakdown

| Module | What It Does | AI Capability Used |
|---|---|---|
| **🧠 My ET** | Adaptive newsroom that re-ranks, re-scores, and re-presents articles based on user persona, watchlist, and time-of-day | Persona-based content scoring with tag-vector matching |
| **🧭 News Navigator** | Synthesizes 4-8 related articles into one structured intelligence briefing with interactive Q&A | Multi-article synthesis + RAG-powered conversational chat |
| **🎬 Video Studio** | Converts any article into a 60-120s broadcast-quality video with AI narration and data overlays | Screenplay generation + browser-native rendering + Web Speech API |
| **📡 Story Arc** | Builds living timelines of complex stories with entity maps, sentiment rivers, and AI predictions | Named Entity Recognition + relationship extraction + predictive analysis |
| **🗣️ Vernacular** | Culturally adapts (not translates) news into Hindi, Tamil, Telugu, Bengali with local context | 4-layer cultural adaptation pipeline with smart code-mixing |

---

## 🔭 System Overview

ET Neuron is a **three-tier application** with a clear separation between presentation, business logic, and AI inference:

```
┌────────────────────────────────────────────────────────────────────┐
│                     TIER 1: PRESENTATION                           │
│                     (Next.js React Client)                         │
│                                                                    │
│  ┌────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐ ┌──────────┐     │
│  │ My ET  │ │Navigator │ │ Video  │ │Story Arc │ │Vernacular│     │
│  │ Page   │ │ Page     │ │ Studio │ │ Page     │ │ Page     │     │
│  │        │ │          │ │        │ │          │ │          │     │
│  │Persona │ │Briefing  │ │Screen  │ │Timeline  │ │Side-by-  │     │
│  │Select  │ │Viewer    │ │play    │ │Entity    │ │Side View │     │
│  │Feed    │ │Chat      │ │Player  │ │Graph     │ │Glossary  │     │
│  │Sidebar │ │Sources   │ │Controls│ │Sentiment │ │Audio     │     │
│  └───┬────┘ └────┬─────┘ └───┬────┘ └────┬─────┘ └────┬─────┘     │
│      │           │           │            │            │           │
│      └───────────┴───────────┴────────────┴────────────┘           │
│                              │ fetch()                             │
├──────────────────────────────┼─────────────────────────────────────┤
│                     TIER 2: BUSINESS LOGIC                         │
│                     (Next.js API Routes)                           │
│                                                                    │
│  /api/adapt        → adaptArticleForPersona()                      │
│  /api/briefing     → generateBriefing() | chatWithNavigator()      │
│  /api/video        → generateScreenplay()                          │
│  /api/story-arc    → extractStoryArcEntities()                     │
│  /api/vernacular   → adaptToVernacular()                           │
│                                                                    │
│  Each route: validate request → load articles → call AI → parse    │
│                              │                                     │
├──────────────────────────────┼─────────────────────────────────────┤
│                     TIER 3: AI INFERENCE                           │
│                     (Google Gemini 2.0 Flash)                      │
│                                                                    │
│  ┌──────────────────────────────────────────────────────┐          │
│  │  src/lib/gemini.ts — Centralized AI Service Layer    │          │
│  │                                                      │          │
│  │  callGemini(prompt, systemInstruction)                │          │
│  │    → GoogleGenerativeAI('gemini-2.0-flash')          │          │
│  │    → model.generateContent(prompt)                   │          │
│  │    → response.text() → JSON.parse()                  │          │
│  └──────────────────────────────────────────────────────┘          │
│                              │                                     │
│                    ┌─────────▼──────────┐                          │
│                    │  articles.ts       │                          │
│                    │  15 curated ET     │                          │
│                    │  articles + 3 arcs │                          │
│                    │  + 3 user personas │                          │
│                    └────────────────────┘                          │
└────────────────────────────────────────────────────────────────────┘
```

---

## 🏗 System Architecture

### Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          USER'S BROWSER                                  │
│                                                                          │
│  ┌─ Landing Page (/)──────────────────────────────────────────────────┐  │
│  │  Hero → "News That Thinks With You"                                │  │
│  │  Module Cards → Links to all 5 modules                             │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌─ My ET (/my-et)──────────┐  ┌─ Navigator (/navigator)────────────┐  │
│  │  [Persona Selector]       │  │  [Topic Cluster Selector]          │  │
│  │  [Time Mode Toggle]       │  │  [Depth Slider: 1-3]              │  │
│  │  [Adaptive Feed]          │  │  [Generate Briefing → API call]   │  │
│  │  [Portfolio Pulse Sidebar] │  │  [Structured Briefing Viewer]     │  │
│  │  [Serendipity Engine]     │  │  [RAG Chat Interface]             │  │
│  │  [Market Snapshot]        │  │  [Source Attribution Panel]       │  │
│  └───────────────────────────┘  └────────────────────────────────────┘  │
│                                                                          │
│  ┌─ Video Studio (/video-studio)─┐  ┌─ Story Arc (/story-arc)───────┐  │
│  │  [Article Picker]              │  │  [Arc Selector]               │  │
│  │  [Style Selector: 4 modes]     │  │  [Interactive Timeline]       │  │
│  │  [Generate → API call]         │  │  [Extract Insights → API]     │  │
│  │  [Broadcast Viewport (CSS)]    │  │  [Key Players Panel]         │  │
│  │  [Scene Navigator]             │  │  [Sentiment Bar]             │  │
│  │  [Web Speech API Narration]    │  │  [Relationships Graph]       │  │
│  │  [Lower Third Ticker]          │  │  [Predictions + Contrarian]  │  │
│  └────────────────────────────────┘  └───────────────────────────────┘  │
│                                                                          │
│  ┌─ Vernacular (/vernacular)──────────────────────────────────────────┐  │
│  │  [Language Tabs: Hindi | Tamil | Telugu | Bengali]                  │  │
│  │  [Article Selector]     [Generate → API call]                       │  │
│  │  [Side-by-Side: Original English | Adapted Regional]                │  │
│  │  [Local Impact Box]     [Business Glossary]     [Audio TTS Button]  │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└───────────────────┬──────────────────────────────────────────────────────┘
                    │  HTTP POST (JSON)
                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER (API ROUTES)                            │
│                                                                           │
│   Request → Validate body → Find articles from ARTICLES[] → Build prompt │
│                                                                           │
│   ┌─ /api/briefing ──────────────────────────────────────────────────┐   │
│   │  action:"generate" → filter ARTICLES by IDs → generateBriefing() │   │
│   │  action:"chat"     → take context + question → chatWithNavigator()│   │
│   └──────────────────────────────────────────────────────────────────┘   │
│   ┌─ /api/video ─────────────────────────────────────────────────────┐   │
│   │  Find article by ID → generateScreenplay(article, style)         │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│   ┌─ /api/vernacular ───────────────────────────────────────────────┐    │
│   │  Find article by ID → adaptToVernacular(article, language, region)│   │
│   └──────────────────────────────────────────────────────────────────┘   │
│   ┌─ /api/story-arc ────────────────────────────────────────────────┐    │
│   │  Filter articles by IDs → extractStoryArcEntities(articles)      │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│   ┌─ /api/adapt ─────────────────────────────────────────────────────┐   │
│   │  Find article + persona → adaptArticleForPersona(article, pers.) │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│                                                                           │
│   All routes return: NextResponse.json(parsedResult)                      │
│                                                                           │
└───────────────────┬───────────────────────────────────────────────────────┘
                    │  HTTPS (Google AI SDK)
                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                    GOOGLE GEMINI 2.0 FLASH                                │
│                                                                           │
│   Model: gemini-2.0-flash                                                 │
│   Context Window: 1,000,000 tokens                                        │
│   Latency: ~1-3 seconds per request                                       │
│   Output: Structured JSON (enforced via prompt engineering)                │
│   Languages: English, Hindi, Tamil, Telugu, Bengali + 95 more              │
│   Cost: ~$0.10 per 1M input tokens                                        │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

### Data Flow Diagrams

#### Flow 1: My ET Personalization (Client-Side — No API call)

```
User clicks "Startup Founder"
         │
         ▼
setState(persona = "founder")
         │
         ▼
getArticlesForPersona("founder")
         │
         ▼
┌────────────────────────────────────────────┐
│  For each article in ARTICLES[]:           │
│                                            │
│  score = (matching tags × 2) + impactScore │
│                                            │
│  Founder priority tags:                    │
│  [Startups, Funding, VC, Technology,       │
│   AI, Quick Commerce]                      │
│                                            │
│  Article "Zomato Q3" has tags:             │
│  [Zomato, Quick Commerce, Blinkit,         │
│   Earnings, Tech]                          │
│                                            │
│  Matches: "Quick Commerce", "Tech" = 2     │
│  Score: (2 × 2) + 8 = 12                  │
│                                            │
│  Article "RBI Rate Cut" has tags:          │
│  [RBI, Monetary Policy, Interest Rates,    │
│   Banking, Economy]                        │
│                                            │
│  Matches: 0                                │
│  Score: (0 × 2) + 9 = 9                   │
│                                            │
│  → Zomato Q3 ranks above RBI Rate Cut      │
│    for a Founder (reversed for Investor)   │
└────────────────────────────────────────────┘
         │
         ▼
Sorted articles rendered in <Feed>
Serendipity Engine: articles with 0 tag overlap
Time Mode: caps article count (6 / 10 / 5)
```

#### Flow 2: News Navigator Briefing (Client → Server → Gemini)

```
User selects "RBI Rate Cut Cycle" → clicks "Generate"
         │
         ▼
fetch("/api/briefing", {
  method: "POST",
  body: { action: "generate", articleIds: ["a1","a2","a5","a10"], topic: "RBI Rate Cut Cycle" }
})
         │
         ▼
┌─ /api/briefing/route.ts ──────────────────────────────────────────────┐
│                                                                        │
│  1. Filter ARTICLES where id ∈ ["a1","a2","a5","a10"]                 │
│  2. Extract { title, content } from each                               │
│  3. Build prompt:                                                      │
│     "You are an AI news analyst for ET. Synthesize these 4 articles    │
│      about 'RBI Rate Cut Cycle' into a comprehensive briefing..."      │
│  4. Call generateBriefing(articles, topic)                              │
│     → callGemini(prompt) → model.generateContent(prompt)               │
│  5. Parse response: JSON.parse(result.replace(/```json/g, ''))         │
│  6. Return structured { executiveSummary, keyDecisions[], dataPoints[],│
│     expertOpinions[], whatToWatchNext[], marketReaction }               │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
         │
         ▼
Client renders briefing in structured sections
User can then type a follow-up question → action: "chat"
Chat uses full article text as RAG context for grounded answers
```

#### Flow 3: Video Screenplay Generation & Playback

```
User selects article + "Breaking News" → clicks "Generate Video"
         │
         ▼
fetch("/api/video", { body: { articleId: "a1", style: "breaking news" } })
         │
         ▼
┌─ /api/video/route.ts ─────────────────┐
│  1. Find article by ID                │
│  2. generateScreenplay(article, style) │
│  3. Returns { scenes[], tone, title }  │
└────────────────────┬──────────────────┘
                     │
                     ▼
┌─ CLIENT-SIDE RENDERER ────────────────────────────────────────────────┐
│                                                                        │
│  scenes.forEach((scene, i) => {                                        │
│    // Display scene content in broadcast viewport                      │
│    // CSS transitions between scenes                                   │
│    // Web Speech API speaks scene.narration                            │
│    // Auto-advance after 6 seconds                                     │
│    // Data overlays rendered as floating widgets                       │
│  })                                                                    │
│                                                                        │
│  Broadcast Viewport Structure:                                         │
│  ┌──────────────────────────────────────────────────────┐              │
│  │  SCENE_TYPE · ET NEURON                              │              │
│  │  ─────────────────────────────────                    │              │
│  │                                                       │              │
│  │  [Headline / Visual Description]                      │              │
│  │                                                       │              │
│  │  "narration text displayed here..."                   │              │
│  │                                                       │              │
│  │  ┌─── Data Overlay ───┐                               │              │
│  │  │  6.25%  Repo Rate  │                               │              │
│  │  └────────────────────┘                               │              │
│  │                                                       │              │
│  │  ┌──────────┬───────────────────────────────────────┐ │              │
│  │  │ET NEURON │ Sensex 78,450 · Nifty 23,820 · ...   │ │              │
│  │  └──────────┴───────────────────────────────────────┘ │              │
│  └──────────────────────────────────────────────────────┘              │
│                                                                        │
│  Web Speech API:                                                       │
│    utterance = new SpeechSynthesisUtterance(scene.narration)           │
│    utterance.rate = 0.95, pitch = 1.0                                  │
│    speechSynthesis.speak(utterance)                                    │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### AI Pipeline Architecture

Every Gemini interaction follows this exact pattern:

```
┌────────────────────────────────────────────────────────────────┐
│                    GEMINI INTERACTION PATTERN                   │
│                                                                │
│  1. SYSTEM INSTRUCTION                                         │
│     "You are an AI [role] for Economic Times."                 │
│                                                                │
│  2. STRUCTURED PROMPT                                          │
│     - Role context (editor, producer, translator, analyst)     │
│     - Task-specific rules (5-8 numbered instructions)          │
│     - OUTPUT FORMAT block (exact JSON schema with examples)    │
│     - Input data (article content, user context)               │
│                                                                │
│  3. RESPONSE PARSING                                           │
│     const cleaned = result                                     │
│       .replace(/```json\n?/g, '')  // Strip markdown fences    │
│       .replace(/```\n?/g, '')      // Strip closing fences     │
│       .trim();                     // Remove whitespace        │
│     return JSON.parse(cleaned);    // Parse to object          │
│                                                                │
│  4. GRACEFUL FALLBACK                                          │
│     catch → return { field: rawText, arrays: [] }              │
│     (App never crashes on malformed AI output)                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Request Lifecycle

```
User Action
    │
    ▼
React Component (useState, useMemo)
    │
    ├── CLIENT-SIDE LOGIC (no API call)
    │   • Persona switching → getArticlesForPersona()
    │   • Time mode toggle → article count filter
    │   • Serendipity Engine → zero-overlap filter
    │   • Scene navigation → currentScene index
    │
    ├── SERVER-SIDE AI (API call)
    │   │
    │   ▼
    │   fetch('/api/[module]', { method: 'POST', body: JSON })
    │   │
    │   ▼
    │   API Route: validate → load articles → build prompt
    │   │
    │   ▼
    │   gemini.ts: callGemini(prompt, systemInstruction)
    │   │
    │   ▼
    │   GoogleGenerativeAI SDK → Gemini 2.0 Flash
    │   │
    │   ▼
    │   Response: text → strip markdown → JSON.parse → return
    │
    ▼
React renders structured AI output in UI components
```

---

## 🧮 Core Logic & Algorithms

### 1. Personalization Scoring Algorithm

**File:** `src/data/articles.ts` → `getArticlesForPersona()`

```typescript
// Each persona has a priority tag vector:
// investor: ['Markets','Stocks','RBI','Earnings','FII','Nifty']
// founder:  ['Startups','Funding','VC','Technology','AI','Quick Commerce']
// student:  ['Economy','GDP','RBI','Government','Technology']

function getArticlesForPersona(personaId: string): Article[] {
  const persona = PERSONAS[personaId];
  if (!persona) return ARTICLES;  // fallback: return all

  return [...ARTICLES].sort((a, b) => {
    // Score = (matched tags × 2) + impactScore
    const aScore = a.tags.filter(t => persona.priorityTags.includes(t)).length * 2 + a.impactScore;
    const bScore = b.tags.filter(t => persona.priorityTags.includes(t)).length * 2 + b.impactScore;
    return bScore - aScore;  // descending
  });
}
```

**Scoring breakdown example:**

| Article | Investor Score | Founder Score | Student Score |
|---|---|---|---|
| RBI Rate Cut (tags: RBI, Banking, Economy) | (2×2)+9 = **13** | (0×2)+9 = **9** | (2×2)+9 = **13** |
| Zomato Q3 (tags: Quick Commerce, Tech) | (0×2)+8 = **8** | (2×2)+8 = **12** | (1×2)+8 = **10** |
| Startup Funding (tags: Startups, AI, VC) | (0×2)+8 = **8** | (3×2)+8 = **14** | (0×2)+8 = **8** |

**Serendipity Engine logic:**

```typescript
// Articles with ZERO tag overlap with persona = "outside your bubble"
const serendipityArticles = ARTICLES
  .filter(a => a.tags.filter(t => persona.priorityTags.includes(t)).length === 0)
  .slice(0, 3);  // cap at 3 items
```

### 2. Briefing Synthesis Pipeline

**File:** `src/lib/gemini.ts` → `generateBriefing()`

```
Input: N articles (2-8) + topic string
                │
                ▼
    Concatenate: "ARTICLE 1: {title}\n{content}\n---\nARTICLE 2: ..."
                │
                ▼
    Build prompt with explicit JSON schema:
    {
      "executiveSummary": "2-3 sentence synthesis",
      "keyDecisions": [{ title, summary, impact, details }],
      "marketReaction": "market impact",
      "expertOpinions": [{ name, role, view, quote }],
      "whatToWatchNext": ["prediction 1", ...],
      "dataPoints": [{ label, value, change }]
    }
                │
                ▼
    Gemini processes all articles in single context window (1M tokens)
                │
                ▼
    Response: structured JSON → rendered in 6 UI sections
```

**RAG Chat logic** (`chatWithNavigator`):
- Uses the full text of clustered articles as grounding context
- Prompt: "Answer ONLY based on briefing context. Cite specific facts. Be concise."
- Prevents hallucination by constraining to source material

### 3. Video Screenplay Engine

**File:** `src/lib/gemini.ts` → `generateScreenplay()`

```
Input: article { title, content } + style ("breaking news" | "market wrap" | etc.)
                │
                ▼
    Prompt: "Convert this article into a {style} video screenplay (60-120s)"
                │
                ▼
    Output schema:
    {
      scenes: [{
        id, type ("intro"|"data"|"quote"|"analysis"|"outro"),
        duration, narration, visual,
        dataOverlay: { label, value, trend }
      }],
      tone, lowerThird
    }
                │
                ▼
    Client-side rendering:
    • Each scene displayed for ~6 seconds
    • CSS gradient backgrounds change with tone color
    • Web Speech API reads narration aloud
    • Data overlays animate in with trend-colored values
    • Lower third ticker scrolls market data
    • Scene progress bar tracks playback
```

### 4. Story Arc Entity Extraction

**File:** `src/lib/gemini.ts` → `extractStoryArcEntities()`

```
Input: articles[] (first 500 chars of each for efficiency)
                │
                ▼
    Prompt: "Analyze these articles and extract story arc information"
                │
                ▼
    Output:
    {
      entities: [{ name, type (person|company|regulator), role, sentiment }],
      relationships: [{ from, to, type (owns|competes|regulates|invests) }],
      predictions: ["What to watch next..."],
      contrarian: [{ perspective, source }]
    }
                │
                ▼
    Client renders:
    • Entity avatars with type-based colors
    • Relationship arrows: "Zomato ←competitor→ Zepto"
    • Prediction cards with 🔮 icons
    • Contrarian views in red-tinted blocks
```

### 5. Cultural Adaptation Layer

**File:** `src/lib/gemini.ts` → `adaptToVernacular()`

The adaptation is **NOT translation**. It's a 4-layer pipeline:

```
Input: English article + target language + region
                │
     ┌──────────┼──────────────────────────────────────────────┐
     │  LAYER 1: SEMANTIC TRANSLATION                          │
     │  Translate meaning, not words                           │
     │  "basis points" → context-appropriate term              │
     │                                                         │
     │  LAYER 2: SIMPLIFICATION                                │
     │  Reduce complexity for general audience                  │
     │  Financial jargon → relatable analogies                  │
     │                                                         │
     │  LAYER 3: LOCALIZATION                                   │
     │  Add regional terminology                                │
     │  "repo rate" stays as "repo rate" (code-mixing)          │
     │                                                         │
     │  LAYER 4: CULTURAL FRAMING                               │
     │  Add local context, regional business impact              │
     │  "What this means for Tamil Nadu's SME sector"            │
     └─────────────────────────────────────────────────────────┘
                │
                ▼
    Output:
    {
      title: "Adapted title in target language",
      summary: "Adapted summary",
      content: "Full adapted article with code-mixing",
      localImpact: "Regional impact analysis",
      glossary: [{ term, translation, explanation }]
    }
                │
                ▼
    Audio: Web Speech API with language-specific voices
           hindi → "hi-IN", tamil → "ta-IN", etc.
```

### 6. JSON Safety Layer

Every Gemini response goes through a standardized safety parser:

```typescript
// Pattern used in ALL AI functions:
try {
  const cleaned = result
    .replace(/```json\n?/g, '')   // Gemini often wraps in markdown
    .replace(/```\n?/g, '')       // Remove closing fence
    .trim();
  return JSON.parse(cleaned);
} catch {
  // NEVER crash — return safe fallback with raw text
  return { executiveSummary: result, keyDecisions: [], ... };
}
```

**Why this matters:** LLMs occasionally return malformed JSON, extra text, or markdown wrappers. This pattern ensures the application **never crashes** on AI output — it gracefully degrades to showing raw text.

---

## 🛠 Tech Stack & Rationale

| Layer | Technology | Why This Over Alternatives |
|---|---|---|
| **AI Core** | Gemini 2.0 Flash | **10x cheaper** than GPT-4, 1M token context (fits 8+ full articles), native multilingual, reliable JSON output |
| **Frontend** | Next.js 16 (App Router) | Co-located API routes = single codebase for client + server. File-based routing. React Server Components. |
| **UI** | React 19 | Hooks-based state (`useState`, `useMemo`). Instant client-side persona switching without re-renders. |
| **Language** | TypeScript 5 | Type-safe `Article`, `Persona`, `Screenplay` interfaces prevent runtime errors across the full stack |
| **Styling** | Vanilla CSS (Custom Properties) | Full control over the premium design system. No utility-class bloat. Theme changes via 3 CSS variable updates. |
| **Animation** | Framer Motion | Smooth page transitions and micro-interactions without manual keyframe management |
| **Icons** | Lucide React | Tree-shakeable. Only imports used icons. 0 runtime overhead. |
| **Audio/TTS** | Web Speech API | **Zero cost**. Browser-native. Supports Hindi, Tamil, Telugu, Bengali. No API key needed. |
| **Video** | CSS + Canvas (native) | **Zero per-video cost**. No ffmpeg, no cloud rendering. Broadcast-quality output via CSS gradients + transitions. |
| **Deployment** | Vercel | Zero-config for Next.js. Edge functions. Auto-scaling. Preview deployments on every PR. |

---

## 📂 Code Structure & Organization

```
et/
│
├── public/                           # Static assets (favicons, SVGs)
│
├── src/
│   │
│   ├── app/                          # ─── NEXT.JS APP ROUTER ────────────
│   │   │
│   │   ├── layout.tsx                # Root layout: fonts (Outfit, Inter,
│   │   │                             #   JetBrains Mono), Navbar, <main>
│   │   │
│   │   ├── page.tsx                  # Landing page: hero section,
│   │   │                             #   5 module cards, CTAs
│   │   │
│   │   ├── globals.css               # ─── DESIGN SYSTEM (800+ lines) ────
│   │   │                             #   CSS custom properties, glassmorphism,
│   │   │                             #   component styles, responsive breakpoints,
│   │   │                             #   animation keyframes, all module-specific CSS
│   │   │
│   │   ├── my-et/
│   │   │   └── page.tsx              # 🧠 PERSONALIZED NEWSROOM (200 lines)
│   │   │                             #   PersonaSelector, TimeMode, ArticleCard,
│   │   │                             #   PortfolioPulse, SerendipityEngine,
│   │   │                             #   MarketSnapshot, WatchlistData
│   │   │
│   │   ├── navigator/
│   │   │   └── page.tsx              # 🧭 INTELLIGENCE BRIEFINGS (230 lines)
│   │   │                             #   TopicSelector, DepthSlider, BriefingViewer,
│   │   │                             #   SectionOutline, KeyDecisions (expandable),
│   │   │                             #   DataPointsGrid, ExpertCards, ChatInterface
│   │   │
│   │   ├── video-studio/
│   │   │   └── page.tsx              # 🎬 AI VIDEO STUDIO (180 lines)
│   │   │                             #   ArticlePicker, StyleSelector, BroadcastScreen,
│   │   │                             #   SceneNavigator, PlaybackControls,
│   │   │                             #   SpeechSynthesis integration, ScreenplayPanel
│   │   │
│   │   ├── story-arc/
│   │   │   └── page.tsx              # 📡 STORY ARC TRACKER (200 lines)
│   │   │                             #   ArcSelector, InteractiveTimeline,
│   │   │                             #   KeyPlayersPanel, SentimentBar,
│   │   │                             #   RelationshipsGraph, PredictionsPanel,
│   │   │                             #   ContrarianViews
│   │   │
│   │   ├── vernacular/
│   │   │   └── page.tsx              # 🗣️ VERNACULAR ENGINE (180 lines)
│   │   │                             #   LanguageTabs, ArticlePicker,
│   │   │                             #   SideBySideView, LocalImpactBox,
│   │   │                             #   BusinessGlossary, AudioPlayback
│   │   │
│   │   ├── pitch/
│   │   │   └── page.tsx              # 📊 10-SLIDE PITCH DECK (370 lines)
│   │   │                             #   Inline slide data, navigation,
│   │   │                             #   all deck content rendered in-app
│   │   │
│   │   └── api/                      # ─── SERVER-SIDE API ROUTES ─────────
│   │       ├── briefing/route.ts     #   POST: generate briefing | chat Q&A
│   │       ├── video/route.ts        #   POST: generate screenplay
│   │       ├── vernacular/route.ts   #   POST: cultural adaptation
│   │       ├── story-arc/route.ts    #   POST: entity extraction
│   │       └── adapt/route.ts        #   POST: persona adaptation
│   │
│   ├── components/
│   │   └── Navbar.tsx                # Global navigation bar with active
│   │                                 #   link highlighting, persona avatar
│   │
│   ├── data/
│   │   └── articles.ts              # ─── DATA LAYER (347 lines) ──────────
│   │                                #   Article interface definition
│   │                                #   15 curated ET articles (full text)
│   │                                #   3 Story Arcs with timeline events
│   │                                #   3 User Personas with tag vectors
│   │                                #   getArticlesForPersona() scoring fn
│   │
│   └── lib/
│       └── gemini.ts                # ─── AI SERVICE LAYER (200 lines) ────
│                                    #   callGemini() — core LLM interface
│                                    #   generateBriefing() — multi-article synthesis
│                                    #   generateScreenplay() — video script gen
│                                    #   adaptToVernacular() — cultural adaptation
│                                    #   adaptArticleForPersona() — persona rewrite
│                                    #   chatWithNavigator() — RAG Q&A
│                                    #   extractStoryArcEntities() — NER + relations
│
├── .env.example                     # Template: GEMINI_API_KEY=your_key
├── .env.local                       # Local secrets (git-ignored)
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── next.config.ts                   # Next.js configuration
```

### Key Design Decisions

| Decision | Rationale |
|---|---|
| **No external state management** | React `useState` + `useMemo` is sufficient. No Redux/Zustand complexity for a prototype. |
| **All AI in one file** (`gemini.ts`) | Centralizes all prompt engineering. Easy to audit, tune, and replace the model. |
| **All data in one file** (`articles.ts`) | Acts as a mock database. Can be swapped for a real CMS/API without changing any UI code. |
| **CSS over Tailwind** | Premium design systems need pixel-level control. Custom properties enable theme changes with 3 variable updates. |
| **No client-side AI calls** | All Gemini calls go through server-side API routes. API key is never exposed to the browser. |
| **Graceful JSON fallback** | Every AI response parser has a `catch` block returning safe defaults. The app never crashes on malformed AI output. |

---

## 📡 API Reference

All API routes accept `POST` requests with JSON bodies and return JSON responses.

### `POST /api/briefing`

**Purpose:** Generate intelligence briefings or answer follow-up questions.

| Action | Purpose | Required Fields |
|---|---|---|
| `generate` | Synthesize articles into a briefing | `articleIds[]`, `topic` |
| `chat` | Answer a follow-up question | `question`, `briefingContext` |

**Request (Generate):**
```json
{
  "action": "generate",
  "articleIds": ["a1", "a2", "a5"],
  "topic": "RBI Rate Cut Cycle"
}
```

**Response:**
```json
{
  "executiveSummary": "The RBI has initiated a sustained easing cycle...",
  "keyDecisions": [
    { "title": "Repo Rate Cut by 25 bps", "summary": "...", "impact": "bullish", "details": "..." }
  ],
  "dataPoints": [
    { "label": "Repo Rate", "value": "6.25%", "change": "-25 bps" }
  ],
  "expertOpinions": [
    { "name": "Raghuram Rajan", "role": "Former RBI Governor", "view": "bullish", "quote": "..." }
  ],
  "whatToWatchNext": ["April MPC meeting outcome", "Fed rate decision impact"],
  "marketReaction": "Sensex rallied 1.2%, banking stocks led gains"
}
```

---

### `POST /api/video`

**Purpose:** Generate a broadcast screenplay from an article.

**Request:**
```json
{ "articleId": "a1", "style": "breaking news" }
```

**Response:**
```json
{
  "title": "RBI Cuts Repo Rate to 6.25%",
  "duration": "90s",
  "tone": "urgent",
  "scenes": [
    {
      "id": 1, "type": "intro", "duration": "8s",
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

**Purpose:** Culturally adapt an article to a regional language.

**Request:**
```json
{ "articleId": "a1", "language": "Hindi", "region": "North India" }
```

**Response:**
```json
{
  "title": "RBI ने repo rate में 25 बेसिस पॉइंट्स की कटौती की",
  "summary": "...",
  "content": "Full adapted article with smart code-mixing...",
  "localImpact": "उत्तर भारत के किसानों और छोटे कारोबारियों को...",
  "glossary": [
    { "term": "Repo Rate", "translation": "रेपो दर", "explanation": "वह दर जिस पर RBI बैंकों को..." }
  ]
}
```

---

### `POST /api/story-arc`

**Purpose:** Extract entities, relationships, and predictions from story articles.

**Request:**
```json
{ "articleIds": ["a3", "a6"] }
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

**Purpose:** Rewrite an article for a specific user persona and depth level.

**Request:**
```json
{ "articleId": "a1", "persona": "investor", "depth": "expert" }
```

---

## 🎨 Design System

ET Neuron uses a custom **"Bloomberg-meets-Apple News"** design language:

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0A0E17` | Page background (deep navy) |
| `--bg-surface` | `#111827` | Card/container surfaces |
| `--bg-elevated` | `#1F2937` | Elevated elements, modals |
| `--accent-primary` | `#00D4AA` | Primary CTAs, highlights, links |
| `--accent-blue` | `#3B82F6` | Navigator, secondary accents |
| `--accent-danger` | `#FF4757` | Breaking news, bearish, alerts |
| `--accent-warm` | `#FFA502` | Warnings, earnings, caution |
| `--accent-purple` | `#8B5CF6` | Story Arc, premium features |
| `--text-primary` | `#E8ECF1` | Main body text |
| `--text-secondary` | `#6B7A99` | Muted text, descriptions |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Card borders, dividers |

### Typography

| Font | Variable | Usage |
|---|---|---|
| **Outfit** | `--font-outfit` | Headlines, page titles, hero text |
| **Inter** | `--font-inter` | Body text, UI labels, nav items |
| **JetBrains Mono** | `--font-mono` | Data points, metrics, code |

### Component Patterns

- **Glassmorphism** — `backdrop-filter: blur(20px)` + subtle rgba borders
- **Gradient CTAs** — Linear gradients with hover lift (`translateY(-2px)`)
- **Impact badges** — Color-coded by sentiment (green/red/amber)
- **Bento grid** — CSS Grid with `auto-fill` for dashboard layouts

---

## 📦 Data Model

### Article Schema

```typescript
interface Article {
  id: string;              // "a1", "a2", etc.
  title: string;           // Full headline
  summary: string;         // 1-2 sentence summary
  content: string;         // Full article body (200-400 words)
  category: string;        // "Markets" | "Economy" | "Technology" | etc.
  tags: string[];          // ["RBI", "Banking", "Interest Rates", ...]
  author: string;          // ET journalist name
  publishedAt: string;     // ISO 8601 timestamp
  readTimeMin: number;     // Estimated read time
  sentiment: 'bullish' | 'bearish' | 'neutral';
  impactScore: number;     // 1-10 editorial impact rating
  source: string;          // Always "Economic Times"
  relatedIds?: string[];   // Cross-references to other articles
}
```

### Story Arc Schema

```typescript
interface StoryArc {
  id: string;              // "arc-1"
  title: string;           // "India's Semiconductor Mission"
  description: string;     // Brief narrative description
  articleIds: string[];    // References to Article.id
  totalArticles: number;   // Total coverage count
  duration: string;        // "18 months"
  keyPlayers: string[];    // Named individuals/entities
  sentiment: { bullish: number; neutral: number; bearish: number };
  status: string;
  events: {
    date: string;          // "2026-03-28"
    title: string;         // Event headline
    type: string;          // "policy" | "milestone" | "funding" | etc.
  }[];
}
```

### Persona Schema

```typescript
interface Persona {
  id: string;              // "investor" | "founder" | "student"
  name: string;            // Display name
  icon: string;            // Emoji
  description: string;     // Role description
  watchlist: string[];     // Companies/stocks to track
  priorityTags: string[];  // Tags that boost article ranking
  contentStyle: string;    // Tone preference description
}
```

---

## 🔁 Reproducing the Project

### Prerequisites

| Tool | Minimum Version | Check Command |
|---|---|---|
| Node.js | 18.17+ | `node --version` |
| npm | 9.0+ | `npm --version` |
| Git | 2.0+ | `git --version` |
| Gemini API Key | — | [Get free key](https://aistudio.google.com/apikey) |

### Step-by-Step Setup

```bash
# 1. Clone the repository
git clone https://github.com/rohanjain1648/ET-HACKATHON.git
cd ET-HACKATHON

# 2. Install all dependencies
npm install

# 3. Create your environment file
cp .env.example .env.local

# 4. Add your Gemini API key
#    Edit .env.local and set: GEMINI_API_KEY=your_actual_key_here

# 5. Start the development server
npm run dev

# 6. Open in browser
#    → http://localhost:3000
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

### Verify the Build

```bash
# Run linter
npm run lint

# Build and check for errors (zero-error build guaranteed)
npm run build
# Expected output: ✓ Compiled successfully
#                  ✓ Generating static pages (15/15)
```

### Running Without the API Key

The app is designed to **work without the Gemini API key** for UI exploration:

| Feature | Without API Key | With API Key |
|---|---|---|
| My ET (persona, feed, sidebar) | ✅ Fully functional | ✅ Fully functional |
| Navigator (topic selection, UI) | ✅ UI works | ✅ + Live briefing generation |
| Video Studio (article picker, UI) | ✅ UI works | ✅ + AI screenplay + narration |
| Story Arc (timeline, sentiment) | ✅ Fully functional | ✅ + AI entity extraction |
| Vernacular (language tabs, UI) | ✅ UI works | ✅ + Live cultural adaptation |

### Environment Variables

| Variable | Required | Description | Where to Get |
|---|---|---|---|
| `GEMINI_API_KEY` | Yes (for AI) | Google Gemini API key | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |

### Deployment (Vercel)

```bash
# Option 1: CLI deployment
npm i -g vercel
vercel
vercel env add GEMINI_API_KEY

# Option 2: Git-based deployment
# Connect github.com/rohanjain1648/ET-HACKATHON to vercel.com/new
# Set GEMINI_API_KEY in Vercel Dashboard → Settings → Environment Variables
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is built for the **Economic Times Hackathon 2026**.

---

<p align="center">
  Built with Next.js · Gemini 2.0 Flash · ❤️<br/>
  <strong>ET Neuron — News That Thinks With You</strong>
</p>
