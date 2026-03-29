'use client';
import { useState } from 'react';

const SLIDES = [
  {
    id: 1,
    title: 'ET Neuron',
    subtitle: 'AI-Native News Experience for Economic Times',
    content: (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🧠</div>
        <h1 style={{ fontSize: 48, marginBottom: 16, background: 'linear-gradient(135deg, #00D4AA, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ET NEURON
        </h1>
        <p style={{ fontSize: 22, color: '#6B7A99', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          News that <strong style={{ color: '#00D4AA' }}>thinks</strong> with you. A living, adaptive, conversational news experience.
        </p>
        <div style={{ marginTop: 32, fontSize: 14, color: '#4A5568' }}>
          Hackathon Submission · Economic Times Innovation Lab · 2026
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'The Problem',
    subtitle: 'Business news in 2026 is still delivered like it\'s 2005',
    content: (
      <div>
        <h2 style={{ fontSize: 32, marginBottom: 24 }}>The Problem</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ padding: 24, borderRadius: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📰</div>
            <h3 style={{ color: '#FF4757', marginBottom: 8 }}>Static & One-Size-Fits-All</h3>
            <p style={{ color: '#6B7A99', fontSize: 14, lineHeight: 1.6 }}>A mutual fund investor and a student see the exact same homepage. No personalization beyond basic categories.</p>
          </div>
          <div style={{ padding: 24, borderRadius: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🔄</div>
            <h3 style={{ color: '#FF4757', marginBottom: 8 }}>Information Overload</h3>
            <p style={{ color: '#6B7A99', fontSize: 14, lineHeight: 1.6 }}>Budget day = 47 articles. Readers open 2, miss 90% of coverage. No synthesis, no navigation.</p>
          </div>
          <div style={{ padding: 24, borderRadius: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🌍</div>
            <h3 style={{ color: '#FF4757', marginBottom: 8 }}>Language Barrier</h3>
            <p style={{ color: '#6B7A99', fontSize: 14, lineHeight: 1.6 }}>800M+ non-English speakers get Google Translate quality. No cultural context, no local relevance.</p>
          </div>
          <div style={{ padding: 24, borderRadius: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📺</div>
            <h3 style={{ color: '#FF4757', marginBottom: 8 }}>No Video At Scale</h3>
            <p style={{ color: '#6B7A99', fontSize: 14, lineHeight: 1.6 }}>500+ articles/day, only 5-10 get video. Short-form video dominates attention, news misses out.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'The Vision',
    subtitle: 'Not AI features bolted on — AI as the medium itself',
    content: (
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, marginBottom: 24 }}>Our Vision</h2>
        <p style={{ fontSize: 20, color: '#6B7A99', maxWidth: 700, margin: '0 auto 32px', lineHeight: 1.6 }}>
          ET Neuron treats AI not as a feature — but as the <strong style={{ color: '#00D4AA' }}>medium itself</strong>.
          Every story is <strong style={{ color: '#00D4AA' }}>re-synthesized, re-structured, and re-presented</strong> for each user&apos;s context.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {['Personalized', 'Interactive', 'Visual', 'Multilingual', 'Predictive'].map(w => (
            <span key={w} style={{ padding: '10px 24px', borderRadius: 24, background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.2)', color: '#00D4AA', fontWeight: 700, fontSize: 15 }}>
              {w}
            </span>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: 24, borderRadius: 16, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', maxWidth: 500, margin: '40px auto 0' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#8B5CF6' }}>&ldquo;I can&apos;t go back to reading news the old way.&rdquo;</div>
          <div style={{ fontSize: 14, color: '#6B7A99', marginTop: 8 }}>— The reaction we&apos;re designing for</div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Five Pillars',
    subtitle: 'One platform, five revolutions',
    content: (
      <div>
        <h2 style={{ fontSize: 28, marginBottom: 24 }}>Five Integrated Modules</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: '🧠', title: 'My ET — Personalized Newsroom', desc: 'Adaptive homepage per user: portfolio-aware, role-based, time-intelligent', color: '#00D4AA' },
            { icon: '🧭', title: 'News Navigator — Intelligence Briefings', desc: 'N articles → 1 interactive briefing with conversational Q&A', color: '#3B82F6' },
            { icon: '🎬', title: 'AI News Video Studio', desc: 'Any article → broadcast-quality 60-120s video in under 3 minutes', color: '#FF4757' },
            { icon: '📡', title: 'Story Arc Tracker', desc: 'Living timelines, entity maps, sentiment rivers, predictions', color: '#8B5CF6' },
            { icon: '🗣️', title: 'Vernacular Business News Engine', desc: 'Culturally adapted news in Hindi, Tamil, Telugu, Bengali', color: '#FFA502' },
          ].map(m => (
            <div key={m.title} style={{ display: 'flex', gap: 16, padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
              <div style={{ fontSize: 32 }}>{m.icon}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 16, color: m.color, marginBottom: 4 }}>{m.title}</h3>
                <p style={{ fontSize: 13, color: '#6B7A99', lineHeight: 1.5 }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Tech Stack',
    subtitle: 'Production-grade architecture built on Gemini 2.0',
    content: (
      <div>
        <h2 style={{ fontSize: 28, marginBottom: 24 }}>Technology Architecture</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { layer: 'Frontend', techs: ['Next.js 15 (App Router)', 'React 19', 'Framer Motion', 'Vanilla CSS Design System'], color: '#00D4AA' },
            { layer: 'AI Core', techs: ['Google Gemini 2.0 Flash', 'RAG Pipeline', 'NER + Entity Extraction', 'Multi-lingual Adaptation'], color: '#3B82F6' },
            { layer: 'Backend', techs: ['Next.js API Routes', 'Server-side Gemini calls', 'Edge Functions (Vercel)', 'Streaming Responses'], color: '#8B5CF6' },
            { layer: 'Infrastructure', techs: ['Vercel (Deployment)', 'Web Speech API (TTS)', 'CSS Canvas (Video)', 'Real ET Article Data'], color: '#FFA502' },
          ].map(s => (
            <div key={s.layer} style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: 15, color: s.color, marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{s.layer}</h3>
              {s.techs.map(t => (
                <div key={t} style={{ fontSize: 13, color: '#6B7A99', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  {t}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: 'rgba(0,212,170,0.06)', border: '1px solid rgba(0,212,170,0.15)', fontSize: 14, color: '#6B7A99', textAlign: 'center' }}>
          ⚡ All AI features powered by <strong style={{ color: '#00D4AA' }}>Google Gemini 2.0 Flash</strong> — fast, cost-effective, multilingual
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Implementation',
    subtitle: 'How each module works under the hood',
    content: (
      <div>
        <h2 style={{ fontSize: 28, marginBottom: 24 }}>Implementation Deep-Dive</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: 15, color: '#00D4AA', marginBottom: 8 }}>🧠 Personalization Engine</h3>
            <p style={{ fontSize: 13, color: '#6B7A99', lineHeight: 1.6 }}>User Intelligence Profiles (UIP) built from: role selection, portfolio watchlist, reading patterns, time-of-day. Content scored by Gemini for persona relevance. Serendipity Engine ensures 15% out-of-bubble content.</p>
          </div>
          <div style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: 15, color: '#3B82F6', marginBottom: 8 }}>🧭 Briefing Generation Pipeline</h3>
            <p style={{ fontSize: 13, color: '#6B7A99', lineHeight: 1.6 }}>Articles clustered by topic → Gemini synthesizes into structured briefing (summary, key decisions, data points, expert opinions, predictions) → RAG-powered conversational Q&A over article corpus.</p>
          </div>
          <div style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: 15, color: '#FF4757', marginBottom: 8 }}>🎬 Video Generation Pipeline</h3>
            <p style={{ fontSize: 13, color: '#6B7A99', lineHeight: 1.6 }}>Article → Gemini screenplay (scenes, narration, data overlays) → Browser-based broadcast renderer (CSS + Canvas) → Web Speech API for AI narration → Auto-play with scene navigation.</p>
          </div>
          <div style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: 15, color: '#FFA502', marginBottom: 8 }}>🗣️ Cultural Adaptation (not translation)</h3>
            <p style={{ fontSize: 13, color: '#6B7A99', lineHeight: 1.6 }}>Gemini performs 4-layer adaptation: Translation → Simplification → Localization → Cultural Framing. Smart code-mixing preserves natural language patterns. Regional business context added automatically.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: 'Challenges vs Solutions',
    subtitle: 'How we overcame key technical hurdles',
    content: (
      <div>
        <h2 style={{ fontSize: 28, marginBottom: 24 }}>Challenges & Solutions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { challenge: 'Real-time personalization at scale', solution: 'Client-side UIP scoring + server-side Gemini ranking with caching. O(1) persona matching.' },
            { challenge: 'Briefing coherence from multiple articles', solution: 'Structured JSON output from Gemini with explicit section prompts. Multi-pass synthesis with fact-checking step.' },
            { challenge: 'Video generation without paid APIs', solution: 'Browser-native rendering with CSS animations + Web Speech API. Zero external video API dependencies.' },
            { challenge: 'Cultural adaptation vs literal translation', solution: '4-layer prompt engineering: translate → simplify → localize → culturally frame. Code-mixing heuristics tuned per language.' },
            { challenge: 'Cost efficiency on Gemini API', solution: 'Gemini 2.0 Flash for all operations. Article content pre-chunked. Response caching for repeated queries.' },
            { challenge: 'Hallucination in news contexts', solution: 'RAG-grounded responses only. All answers cite specific ET articles. Confidence scoring filters uncertain outputs.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ padding: 16, background: 'rgba(255,71,87,0.06)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#FF4757', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 4 }}>Challenge</div>
                <div style={{ fontSize: 13, color: '#E8ECF1' }}>{item.challenge}</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(0,212,170,0.06)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#00D4AA', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 4 }}>Solution</div>
                <div style={{ fontSize: 13, color: '#E8ECF1' }}>{item.solution}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 8,
    title: 'Feasibility',
    subtitle: 'Why this can scale to production',
    content: (
      <div>
        <h2 style={{ fontSize: 28, marginBottom: 24 }}>Feasibility & Scalability</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ padding: 24, borderRadius: 12, background: 'rgba(0,212,170,0.06)', border: '1px solid rgba(0,212,170,0.15)' }}>
            <h3 style={{ fontSize: 16, color: '#00D4AA', marginBottom: 12 }}>✅ Why It Works</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Gemini 2.0 Flash: 1M token context, sub-second latency, $0.10/M tokens',
                'Next.js on Vercel: auto-scaling, edge functions, zero DevOps',
                'ET\'s 20+ year content corpus: unmatched training data',
                'Web Speech API: free TTS in 50+ languages, no external cost',
                'Browser-native video rendering: no server-side compute needed',
              ].map(item => (
                <li key={item} style={{ fontSize: 13, color: '#6B7A99', lineHeight: 1.5, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00D4AA' }}>•</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ padding: 24, borderRadius: 12, background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
            <h3 style={{ fontSize: 16, color: '#3B82F6', marginBottom: 12 }}>📊 Scale Projections</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { metric: 'Daily Active Users', value: '2M → 8M', note: 'Personalization drives engagement' },
                { metric: 'Time on Site', value: '3.2min → 8.5min', note: 'Interactive briefings keep users' },
                { metric: 'Video Views', value: '50K → 2M/day', note: 'Auto-generated at zero marginal cost' },
                { metric: 'Vernacular Users', value: '0 → 5M', note: 'Untapped market of 800M speakers' },
              ].map(m => (
                <div key={m.metric} style={{ padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#3B82F6' }}>{m.metric}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#E8ECF1', fontFamily: 'var(--font-mono)' }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: '#4A5568' }}>{m.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 9,
    title: 'Competitive Moat',
    subtitle: 'Why this can\'t be easily replicated',
    content: (
      <div>
        <h2 style={{ fontSize: 28, marginBottom: 24 }}>Competitive Moat</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { icon: '📚', title: 'Content Corpus', desc: '20+ years of premium business journalism as training data. No competitor has this depth.', strength: 95 },
            { icon: '📈', title: 'Financial Context', desc: 'Integration with market data, portfolio tracking, corporate filings — news + data fusion.', strength: 90 },
            { icon: '🗣️', title: 'Vernacular Depth', desc: 'Business-specific cultural adaptation, not generic translation. Expertise in financial terminology.', strength: 85 },
            { icon: '🌐', title: 'Network Effects', desc: 'More users → better personalization → better content ranking → more users.', strength: 80 },
            { icon: '⚡', title: 'First Mover', desc: 'No Indian business news platform has this level of AI integration. 18-month head start.', strength: 88 },
            { icon: '🤝', title: 'Trust Brand', desc: 'Economic Times brand = trust in financial news. Critical for AI-generated content adoption.', strength: 92 },
          ].map(m => (
            <div key={m.title} style={{ padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: 32 }}>{m.icon}</div>
              <h3 style={{ fontSize: 14, marginTop: 8, marginBottom: 6 }}>{m.title}</h3>
              <p style={{ fontSize: 12, color: '#6B7A99', lineHeight: 1.5, marginBottom: 12 }}>{m.desc}</p>
              <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${m.strength}%`, background: 'linear-gradient(90deg, #00D4AA, #3B82F6)', borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 11, color: '#00D4AA', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{m.strength}% moat strength</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 10,
    title: 'Conclusion',
    subtitle: 'The future of business news starts here',
    content: (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>🚀</div>
        <h2 style={{ fontSize: 36, marginBottom: 16, background: 'linear-gradient(135deg, #00D4AA, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          The Future of Business News Starts Here
        </h2>
        <p style={{ fontSize: 18, color: '#6B7A99', maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.7 }}>
          ET Neuron isn&apos;t a feature upgrade — it&apos;s a <strong style={{ color: '#E8ECF1' }}>paradigm shift</strong>.
          From passive reading to active exploration. From one-size-fits-all to built-for-you. From English-only to truly multilingual.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, maxWidth: 700, margin: '0 auto 32px' }}>
          {[
            { icon: '🧠', label: 'Personalized' },
            { icon: '🧭', label: 'Interactive' },
            { icon: '🎬', label: 'Visual' },
            { icon: '📡', label: 'Predictive' },
            { icon: '🗣️', label: 'Multilingual' },
          ].map(m => (
            <div key={m.label} style={{ padding: 16, borderRadius: 12, background: 'rgba(0,212,170,0.06)', border: '1px solid rgba(0,212,170,0.15)' }}>
              <div style={{ fontSize: 28 }}>{m.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#00D4AA', marginTop: 6 }}>{m.label}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: 20, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'inline-block' }}>
          <div style={{ fontSize: 14, color: '#6B7A99' }}>Built with</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#E8ECF1', marginTop: 4 }}>
            Next.js · Gemini 2.0 · ❤️
          </div>
        </div>
      </div>
    ),
  },
];

export default function PitchPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = SLIDES[currentSlide];

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      {/* Slide Navigation */}
      <div style={{ display: 'flex', gap: 4, padding: '16px 32px', borderBottom: '1px solid var(--border-subtle)', overflowX: 'auto' }}>
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(i)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              background: currentSlide === i ? 'rgba(0,212,170,0.1)' : 'transparent',
              border: `1px solid ${currentSlide === i ? 'rgba(0,212,170,0.3)' : 'transparent'}`,
              color: currentSlide === i ? '#00D4AA' : '#6B7A99',
              cursor: 'pointer',
              whiteSpace: 'nowrap' as const,
              flexShrink: 0,
            }}
          >
            {i + 1}. {s.title}
          </button>
        ))}
      </div>

      {/* Slide Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ maxWidth: 900, width: '100%' }}>
          {slide.content}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderTop: '1px solid var(--border-subtle)' }}>
        <button
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          disabled={currentSlide === 0}
          style={{ padding: '10px 20px', borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: currentSlide === 0 ? '#4A5568' : '#E8ECF1', fontSize: 14, fontWeight: 600, cursor: currentSlide === 0 ? 'not-allowed' : 'pointer' }}
        >
          ← Previous
        </button>
        <span style={{ fontSize: 13, color: '#6B7A99', fontFamily: 'var(--font-mono)' }}>
          {currentSlide + 1} / {SLIDES.length}
        </span>
        <button
          onClick={() => setCurrentSlide(Math.min(SLIDES.length - 1, currentSlide + 1))}
          disabled={currentSlide === SLIDES.length - 1}
          style={{ padding: '10px 20px', borderRadius: 8, background: currentSlide === SLIDES.length - 1 ? 'var(--bg-surface)' : 'linear-gradient(135deg, #00D4AA, #00A68A)', border: 'none', color: currentSlide === SLIDES.length - 1 ? '#4A5568' : '#0A0E17', fontSize: 14, fontWeight: 700, cursor: currentSlide === SLIDES.length - 1 ? 'not-allowed' : 'pointer' }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
