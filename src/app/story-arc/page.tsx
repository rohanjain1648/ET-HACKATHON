'use client';
import { useState } from 'react';
import { STORY_ARCS } from '@/data/articles';

export default function StoryArcPage() {
  const [selectedArc, setSelectedArc] = useState(STORY_ARCS[0]);
  const [aiInsights, setAiInsights] = useState<{
    entities: { name: string; type: string; role: string; sentiment: string }[];
    relationships: { from: string; to: string; type: string }[];
    predictions: string[];
    contrarian: { perspective: string; source: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function extractEntities() {
    setLoading(true);
    try {
      const res = await fetch('/api/story-arc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleIds: selectedArc.articleIds }),
      });
      const data = await res.json();
      setAiInsights(data);
    } catch {
      setAiInsights(null);
    }
    setLoading(false);
  }

  return (
    <div className="arc-page">
      <div className="page-header">
        <h1>📡 Story Arc Tracker</h1>
        <p>Pick any ongoing business story and AI builds the complete visual narrative.</p>
      </div>

      {/* Arc Selector */}
      <div className="arc-selector">
        {STORY_ARCS.map(arc => (
          <button
            key={arc.id}
            className={`arc-card-btn ${selectedArc.id === arc.id ? 'active' : ''}`}
            onClick={() => { setSelectedArc(arc); setAiInsights(null); }}
          >
            <span className="ac-title">{arc.title}</span>
            <span className="ac-meta">{arc.totalArticles} articles · {arc.duration}</span>
          </button>
        ))}
      </div>

      {/* Arc Description */}
      <div style={{ marginBottom: 24, fontSize: 15, color: 'var(--text-secondary)', maxWidth: 700 }}>
        {selectedArc.description}
      </div>

      {/* Interactive Timeline */}
      <div className="timeline-container">
        <h3 style={{ fontSize: 16, marginBottom: 16 }}>📅 Timeline</h3>
        <div className="timeline-track">
          <div className="timeline-line" />
          {selectedArc.events.map((event, i) => (
            <div key={i} className="timeline-event">
              <div className="te-date">{event.date}</div>
              <div className={`te-dot ${event.type}`} />
              <div className="te-title">{event.title}</div>
              <span className={`te-type ${event.type}`}>{event.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Extraction Button */}
      <div style={{ marginBottom: 24 }}>
        <button className="generate-btn" onClick={extractEntities} disabled={loading}>
          {loading ? '⏳ Extracting with Gemini...' : '🤖 Extract AI Insights'}
        </button>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <span>Analyzing story arc with Gemini AI...</span>
        </div>
      )}

      {/* Panels */}
      <div className="arc-panels">
        {/* Key Players */}
        <div className="arc-panel">
          <h4>👥 Key Players</h4>
          {aiInsights?.entities ? (
            aiInsights.entities.slice(0, 8).map((entity, i) => (
              <div key={i} className="player-item">
                <div className={`player-avatar ${entity.type}`}>
                  {entity.name.charAt(0)}
                </div>
                <div>
                  <div className="player-name">{entity.name}</div>
                  <div className="player-role">{entity.role}</div>
                </div>
              </div>
            ))
          ) : (
            selectedArc.keyPlayers.map((player, i) => (
              <div key={i} className="player-item">
                <div className="player-avatar person">{player.charAt(0)}</div>
                <div>
                  <div className="player-name">{player}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sentiment */}
        <div className="arc-panel">
          <h4>📊 Sentiment Analysis</h4>
          <div className="sentiment-bar">
            <div className="s-bullish" style={{ width: `${selectedArc.sentiment.bullish}%` }} />
            <div className="s-neutral" style={{ width: `${selectedArc.sentiment.neutral}%` }} />
            <div className="s-bearish" style={{ width: `${selectedArc.sentiment.bearish}%` }} />
          </div>
          <div className="sentiment-labels">
            <span className="sl-bull">🟢 Bullish {selectedArc.sentiment.bullish}%</span>
            <span className="sl-neutral">🟡 Neutral {selectedArc.sentiment.neutral}%</span>
            <span className="sl-bear">🔴 Bearish {selectedArc.sentiment.bearish}%</span>
          </div>

          <div style={{ marginTop: 24 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📰 Related Coverage</h4>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
              {selectedArc.totalArticles}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>articles over {selectedArc.duration}</div>
          </div>
        </div>

        {/* Relationships */}
        {aiInsights?.relationships && aiInsights.relationships.length > 0 && (
          <div className="arc-panel">
            <h4>🔗 Entity Relationships</h4>
            {aiInsights.relationships.slice(0, 6).map((rel, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: 14 }}>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{rel.from}</span>
                <span style={{ color: 'var(--text-muted)', margin: '0 8px' }}>—{rel.type}→</span>
                <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{rel.to}</span>
              </div>
            ))}
          </div>
        )}

        {/* Predictions */}
        <div className="arc-panel">
          <h4>🔮 What to Watch Next</h4>
          {aiInsights?.predictions ? (
            aiInsights.predictions.map((pred, i) => (
              <div key={i} className="prediction-item">
                <span className="prediction-icon">🔮</span>
                <span>{pred}</span>
              </div>
            ))
          ) : (
            <>
              <div className="prediction-item">
                <span className="prediction-icon">🔮</span>
                <span>Click &quot;Extract AI Insights&quot; to get Gemini-powered predictions</span>
              </div>
            </>
          )}

          {/* Contrarian */}
          {aiInsights?.contrarian && aiInsights.contrarian.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-danger)', marginBottom: 10 }}>⚡ Contrarian Views</h4>
              {aiInsights.contrarian.map((c, i) => (
                <div key={i} style={{ padding: 10, borderRadius: 8, background: 'rgba(255, 71, 87, 0.06)', marginBottom: 6, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.perspective}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>— {c.source}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
