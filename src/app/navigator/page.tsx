'use client';
import { useState } from 'react';
import { ARTICLES } from '@/data/articles';

const BRIEFING_TOPICS = [
  { id: 'rbi', title: 'RBI Rate Cut Cycle', articleIds: ['a1', 'a2', 'a5', 'a10'], count: 4 },
  { id: 'budget', title: 'Union Budget 2026', articleIds: ['a7', 'a8'], count: 2 },
  { id: 'qcomm', title: 'Quick Commerce War', articleIds: ['a3', 'a6'], count: 2 },
];

const OUTLINE = [
  { id: 'summary', icon: '📊', label: 'Executive Summary' },
  { id: 'decisions', icon: '🔑', label: 'Key Decisions' },
  { id: 'data', icon: '📈', label: 'Data Points' },
  { id: 'experts', icon: '👥', label: 'Expert Opinions' },
  { id: 'next', icon: '🔮', label: 'What to Watch Next' },
  { id: 'sources', icon: '📰', label: 'Source Articles' },
];

interface Briefing {
  executiveSummary: string;
  keyDecisions: { title: string; summary: string; impact: string; details: string }[];
  marketReaction?: string;
  expertOpinions: { name: string; role: string; view: string; quote: string }[];
  whatToWatchNext: string[];
  dataPoints: { label: string; value: string; change: string }[];
}

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

export default function NavigatorPage() {
  const [selectedTopic, setSelectedTopic] = useState(BRIEFING_TOPICS[0]);
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [loading, setLoading] = useState(false);
  const [depth, setDepth] = useState(2);
  const [activeSection, setActiveSection] = useState('summary');
  const [expandedDecisions, setExpandedDecisions] = useState<Set<number>>(new Set());
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const depthLabels = ['Beginner', 'Standard', 'Expert'];

  async function generateBriefing() {
    setLoading(true);
    try {
      const res = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          articleIds: selectedTopic.articleIds,
          topic: selectedTopic.title,
        }),
      });
      const data = await res.json();
      setBriefing(data);
      setChatMessages([]);
    } catch {
      setBriefing(null);
    }
    setLoading(false);
  }

  async function sendChat() {
    if (!chatInput.trim() || chatLoading) return;
    const question = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: question }]);
    setChatLoading(true);

    try {
      const relevantArticles = ARTICLES.filter(a => selectedTopic.articleIds.includes(a.id));
      const context = relevantArticles.map(a => `${a.title}: ${a.content}`).join('\n\n');

      const res = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          question,
          briefingContext: context,
        }),
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'ai', text: data.answer || 'No response.' }]);
    } catch {
      setChatMessages(prev => [...prev, { role: 'ai', text: 'Error getting response. Please try again.' }]);
    }
    setChatLoading(false);
  }

  const sourceArticles = ARTICLES.filter(a => selectedTopic.articleIds.includes(a.id));

  return (
    <div className="navigator-page">
      <div className="page-header">
        <h1>🧭 News Navigator — Intelligence Briefings</h1>
        <p>Instead of reading multiple articles, explore one AI-synthesized interactive briefing.</p>
      </div>

      {/* Topic Selector */}
      <div className="briefing-selector">
        {BRIEFING_TOPICS.map(topic => (
          <button
            key={topic.id}
            className={`briefing-topic-btn ${selectedTopic.id === topic.id ? 'active' : ''}`}
            onClick={() => { setSelectedTopic(topic); setBriefing(null); }}
          >
            <span className="b-title">{topic.title}</span>
            <span className="b-count">{topic.count} articles synthesized</span>
          </button>
        ))}
      </div>

      {/* Depth Slider */}
      <div className="depth-slider-container">
        <label>🎚️ Depth</label>
        <input
          type="range"
          min={1}
          max={3}
          value={depth}
          onChange={e => setDepth(Number(e.target.value))}
          className="depth-slider"
        />
        <span className="depth-label">{depthLabels[depth - 1]}</span>
      </div>

      {/* Generate Button */}
      {!briefing && !loading && (
        <button className="generate-btn" onClick={generateBriefing}>
          ⚡ Generate Intelligence Briefing
        </button>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <span>Synthesizing {selectedTopic.count} articles with Gemini AI...</span>
        </div>
      )}

      {/* Briefing Content */}
      {briefing && (
        <div className="briefing-layout">
          {/* Outline */}
          <div className="briefing-outline">
            {OUTLINE.map(item => (
              <button
                key={item.id}
                className={`outline-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="briefing-content">
            {/* Executive Summary */}
            <div className="briefing-block" id="summary">
              <h3>📊 Executive Summary</h3>
              <p>{briefing.executiveSummary}</p>
              {briefing.marketReaction && (
                <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: 'rgba(0, 212, 170, 0.06)', fontSize: 14, color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--accent-primary)' }}>Market Reaction:</strong> {briefing.marketReaction}
                </div>
              )}
            </div>

            {/* Key Decisions */}
            {briefing.keyDecisions?.length > 0 && (
              <div className="briefing-block" id="decisions">
                <h3>🔑 Key Decisions</h3>
                {briefing.keyDecisions.map((kd, i) => (
                  <div
                    key={i}
                    className={`key-decision ${expandedDecisions.has(i) ? 'expanded' : ''}`}
                    onClick={() => {
                      setExpandedDecisions(prev => {
                        const next = new Set(prev);
                        next.has(i) ? next.delete(i) : next.add(i);
                        return next;
                      });
                    }}
                  >
                    <div className="key-decision-header">
                      <h4>{kd.title}</h4>
                      <span className={`kd-impact ${kd.impact || 'neutral'}`}>{kd.impact || 'neutral'}</span>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6 }}>{kd.summary}</p>
                    <div className="kd-details">{kd.details}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Data Points */}
            {briefing.dataPoints?.length > 0 && (
              <div className="briefing-block" id="data">
                <h3>📈 Key Data Points</h3>
                <div className="data-points-grid">
                  {briefing.dataPoints.map((dp, i) => (
                    <div key={i} className="data-point">
                      <div className="dp-value">{dp.value}</div>
                      <div className="dp-label">{dp.label}</div>
                      {dp.change && (
                        <div className={`dp-change ${dp.change.startsWith('+') ? 'positive' : dp.change.startsWith('-') ? 'negative' : ''}`}>
                          {dp.change}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expert Opinions */}
            {briefing.expertOpinions?.length > 0 && (
              <div className="briefing-block" id="experts">
                <h3>👥 Expert Opinions</h3>
                {briefing.expertOpinions.map((exp, i) => (
                  <div key={i} className="expert-card">
                    <div className="expert-avatar">{exp.name?.charAt(0) || '?'}</div>
                    <div className="expert-info">
                      <div className="e-name">{exp.name}</div>
                      <div className="e-role">{exp.role}</div>
                      <div className="e-quote">&ldquo;{exp.quote}&rdquo;</div>
                    </div>
                    <span
                      className="expert-sentiment"
                      style={{
                        background: exp.view === 'bullish' ? 'rgba(0,212,170,0.12)' : exp.view === 'bearish' ? 'rgba(255,71,87,0.12)' : 'rgba(255,165,2,0.12)',
                        color: exp.view === 'bullish' ? 'var(--accent-primary)' : exp.view === 'bearish' ? 'var(--accent-danger)' : 'var(--accent-warm)',
                      }}
                    >
                      {exp.view}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* What to Watch */}
            {briefing.whatToWatchNext?.length > 0 && (
              <div className="briefing-block" id="next">
                <h3>🔮 What to Watch Next</h3>
                {briefing.whatToWatchNext.map((pred, i) => (
                  <div key={i} className="prediction-item">
                    <span className="prediction-icon">🔮</span>
                    <span>{pred}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Source Articles */}
            <div className="briefing-block" id="sources">
              <h3>📰 Source Articles ({sourceArticles.length})</h3>
              {sourceArticles.map(a => (
                <div key={a.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{a.author} · {a.category}</div>
                </div>
              ))}
            </div>

            {/* Chat */}
            <div className="nav-chat">
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🤖 Ask Navigator</h4>
              {chatMessages.length > 0 && (
                <div className="chat-messages">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`chat-msg ${msg.role}`}>
                      {msg.text}
                    </div>
                  ))}
                </div>
              )}
              <div className="chat-input-row">
                <input
                  type="text"
                  placeholder="Ask a question about this briefing..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendChat()}
                />
                <button className="chat-send-btn" onClick={sendChat} disabled={chatLoading}>
                  {chatLoading ? '...' : 'Ask'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
