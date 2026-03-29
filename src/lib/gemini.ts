import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function callGemini(prompt: string, systemInstruction?: string): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: systemInstruction || 'You are an AI assistant for Economic Times news platform.',
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateBriefing(articles: { title: string; content: string }[], topic: string) {
  const articleTexts = articles.map((a, i) => `ARTICLE ${i + 1}: ${a.title}\n${a.content}`).join('\n\n---\n\n');

  const prompt = `You are an AI news analyst for Economic Times. Synthesize the following ${articles.length} articles about "${topic}" into a comprehensive Intelligence Briefing.

OUTPUT FORMAT (respond in valid JSON):
{
  "executiveSummary": "A 2-3 sentence synthesis of all articles",
  "keyDecisions": [
    {"title": "...", "summary": "...", "impact": "bullish|bearish|neutral", "details": "..."}
  ],
  "marketReaction": "Brief market impact summary",
  "expertOpinions": [
    {"name": "Expert Name", "role": "Title", "view": "bullish|cautious|bearish", "quote": "..."}
  ],
  "whatToWatchNext": ["prediction 1", "prediction 2", "prediction 3"],
  "dataPoints": [
    {"label": "...", "value": "...", "change": "+X% or -X%"}
  ]
}

ARTICLES:
${articleTexts}`;

  const result = await callGemini(prompt);
  try {
    const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return { executiveSummary: result, keyDecisions: [], expertOpinions: [], whatToWatchNext: [], dataPoints: [] };
  }
}

export async function generateScreenplay(article: { title: string; content: string }, style: string) {
  const prompt = `You are an AI broadcast producer for Economic Times TV. Convert this article into a ${style} video screenplay (60-120 seconds).

OUTPUT FORMAT (valid JSON):
{
  "title": "Broadcast headline",
  "duration": "90s",
  "scenes": [
    {
      "id": 1,
      "type": "intro|data|quote|analysis|outro",
      "duration": "15s",
      "narration": "What the AI anchor says",
      "visual": "Description of on-screen visual",
      "dataOverlay": {"label": "optional", "value": "optional", "trend": "up|down|neutral"}
    }
  ],
  "tone": "urgent|calm|educational|inspirational",
  "lowerThird": "Ticker text for bottom of screen"
}

ARTICLE:
Title: ${article.title}
${article.content}`;

  const result = await callGemini(prompt);
  try {
    const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return { title: article.title, scenes: [], tone: 'calm', duration: '90s' };
  }
}

export async function adaptToVernacular(
  article: { title: string; content: string },
  language: string,
  region: string
) {
  const prompt = `You are a cultural adaptation specialist for Economic Times. Adapt this English business article into ${language} for readers in ${region}. This is NOT literal translation — it's cultural adaptation.

RULES:
1. Use natural code-mixing (keep common English business terms like "market", "GDP", "startup" in English)
2. Add regional context where relevant
3. Simplify complex financial jargon with relatable analogies
4. Add a "What this means for you" section for local impact
5. Maintain the factual accuracy

OUTPUT FORMAT (valid JSON):
{
  "title": "Adapted title in ${language}",
  "summary": "Adapted summary in ${language}",
  "content": "Full adapted content in ${language} with cultural context",
  "localImpact": "What this means for ${region} readers",
  "glossary": [{"term": "English term", "translation": "Local translation", "explanation": "Simple explanation"}]
}

ORIGINAL ARTICLE:
Title: ${article.title}
${article.content}`;

  const result = await callGemini(prompt);
  try {
    const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return { title: article.title, content: result, summary: '', localImpact: '', glossary: [] };
  }
}

export async function adaptArticleForPersona(
  article: { title: string; content: string },
  persona: string,
  depth: 'beginner' | 'standard' | 'expert'
) {
  const prompt = `You are an AI content adapter for Economic Times. Rewrite this article for a ${persona} at ${depth} level.

PERSONA CONTEXT:
- investor: Focus on portfolio impact, actionable data, risk assessment
- founder: Focus on competitive implications, market opportunity, strategic moves  
- student: Focus on explanations, definitions, career relevance, simplified language

DEPTH:
- beginner: Explain every term, use analogies, add "What is X?" boxes
- standard: Standard business reader level
- expert: Skip basics, focus on nuance, add contrarian takes

OUTPUT FORMAT (valid JSON):
{
  "title": "Adapted title",
  "summary": "2-line summary for this persona",
  "keyTakeaways": ["takeaway 1", "takeaway 2", "takeaway 3"],
  "personalRelevance": "Why this matters specifically to a ${persona}",
  "adaptedContent": "Full rewritten content"
}

ARTICLE:
Title: ${article.title}
${article.content}`;

  const result = await callGemini(prompt);
  try {
    const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return { title: article.title, summary: '', keyTakeaways: [], personalRelevance: '', adaptedContent: article.content };
  }
}

export async function chatWithNavigator(briefingContext: string, userQuestion: string) {
  const prompt = `You are ET Neuron's News Navigator AI. Answer the user's question based ONLY on the briefing context provided. Cite specific facts and data. Be concise but thorough.

BRIEFING CONTEXT:
${briefingContext}

USER QUESTION: ${userQuestion}

Respond in a natural, conversational tone. Use bullet points for data-heavy answers. Always cite which article or data point you're referencing.`;

  return callGemini(prompt);
}

export async function extractStoryArcEntities(articles: { title: string; content: string }[]) {
  const articleTexts = articles.map((a, i) => `${i + 1}. ${a.title}: ${a.content.slice(0, 500)}`).join('\n\n');

  const prompt = `Analyze these articles and extract story arc information.

OUTPUT FORMAT (valid JSON):
{
  "entities": [
    {"name": "Person/Company", "type": "person|company|regulator|institution", "role": "Brief role description", "sentiment": "positive|negative|neutral"}
  ],
  "relationships": [
    {"from": "Entity A", "to": "Entity B", "type": "owns|competes|regulates|invests|partners"}
  ],
  "predictions": ["What to watch next 1", "What to watch next 2"],
  "contrarian": [
    {"perspective": "The contrarian view", "source": "Who holds this view"}
  ]
}

ARTICLES:
${articleTexts}`;

  const result = await callGemini(prompt);
  try {
    const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return { entities: [], relationships: [], predictions: [], contrarian: [] };
  }
}
