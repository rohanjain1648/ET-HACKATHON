'use client';
import { useState } from 'react';
import { ARTICLES } from '@/data/articles';

const LANGUAGES = [
  { id: 'hindi', label: '🇮🇳 हिन्दी (Hindi)', region: 'North India' },
  { id: 'tamil', label: '🇮🇳 தமிழ் (Tamil)', region: 'Tamil Nadu' },
  { id: 'telugu', label: '🇮🇳 తెలుగు (Telugu)', region: 'Andhra Pradesh / Telangana' },
  { id: 'bengali', label: '🇮🇳 বাংলা (Bengali)', region: 'West Bengal' },
];

interface VernacularResult {
  title: string;
  summary: string;
  content: string;
  localImpact: string;
  glossary: { term: string; translation: string; explanation: string }[];
}

export default function VernacularPage() {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [selectedArticle, setSelectedArticle] = useState(ARTICLES[0]);
  const [result, setResult] = useState<VernacularResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  async function translate() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/vernacular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId: selectedArticle.id,
          language: selectedLang.id.charAt(0).toUpperCase() + selectedLang.id.slice(1),
          region: selectedLang.region,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult(null);
    }
    setLoading(false);
  }

  function speakText(text: string) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    const langCodes: Record<string, string> = { hindi: 'hi-IN', tamil: 'ta-IN', telugu: 'te-IN', bengali: 'bn-IN' };
    utterance.lang = langCodes[selectedLang.id] || 'hi-IN';
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }

  return (
    <div className="vernacular-page">
      <div className="page-header">
        <h1>🗣️ Vernacular Business News Engine</h1>
        <p>Not literal translation — culturally adapted business news with local context and smart code-mixing.</p>
      </div>

      {/* Language Tabs */}
      <div className="language-tabs">
        {LANGUAGES.map(lang => (
          <button
            key={lang.id}
            className={`lang-tab ${selectedLang.id === lang.id ? 'active' : ''}`}
            onClick={() => { setSelectedLang(lang); setResult(null); }}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Article Picker */}
      <div className="vern-picker">
        <h4>Select Article to Adapt</h4>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ARTICLES.slice(0, 8).map(a => (
            <button
              key={a.id}
              className={`style-chip ${selectedArticle.id === a.id ? 'active' : ''}`}
              onClick={() => { setSelectedArticle(a); setResult(null); }}
              style={{ textAlign: 'left', maxWidth: 240 }}
            >
              {a.title.slice(0, 50)}...
            </button>
          ))}
        </div>
      </div>

      {/* Generate */}
      <div style={{ marginBottom: 24 }}>
        <button className="generate-btn" onClick={translate} disabled={loading}>
          {loading ? '⏳ Adapting with Gemini...' : `🗣️ Adapt to ${selectedLang.label.split('(')[1]?.replace(')', '') || selectedLang.id}`}
        </button>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <span>Culturally adapting with Gemini AI... This is not just translation!</span>
        </div>
      )}

      {/* Side by Side */}
      {result && (
        <>
          <div className="vernacular-layout">
            {/* Original */}
            <div className="vern-column">
              <div className="vern-column-header">🇬🇧 Original English</div>
              <div className="vern-article-block">
                <h3>{selectedArticle.title}</h3>
                <div className="vern-content">{selectedArticle.content}</div>
              </div>
            </div>

            {/* Adapted */}
            <div className="vern-column">
              <div className="vern-column-header">🇮🇳 Adapted — {selectedLang.label}</div>
              <div className="vern-article-block" style={{ borderColor: 'rgba(0, 212, 170, 0.2)' }}>
                <h3>{result.title}</h3>
                {result.summary && (
                  <p style={{ fontSize: 14, color: 'var(--accent-primary)', marginBottom: 12, fontWeight: 600 }}>
                    {result.summary}
                  </p>
                )}
                <div className="vern-content">{result.content}</div>

                {/* Local Impact */}
                {result.localImpact && (
                  <div className="local-impact-box">
                    <h5>📍 What This Means For {selectedLang.region}</h5>
                    <p>{result.localImpact}</p>
                  </div>
                )}

                {/* Audio Button */}
                <button
                  className="audio-btn"
                  onClick={() => speaking ? stopSpeaking() : speakText(result.content)}
                >
                  {speaking ? '⏹️ Stop Audio' : '🔊 Listen in ' + selectedLang.id.charAt(0).toUpperCase() + selectedLang.id.slice(1)}
                </button>
              </div>
            </div>
          </div>

          {/* Glossary */}
          {result.glossary && result.glossary.length > 0 && (
            <div className="glossary-section" style={{ marginTop: 24 }}>
              <h4>📖 Business Glossary</h4>
              {result.glossary.map((item, i) => (
                <div key={i} className="glossary-item">
                  <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                    <span className="glossary-term">{item.term}</span>
                    <span style={{ color: 'var(--text-muted)' }}>→</span>
                    <span className="glossary-translation">{item.translation}</span>
                  </div>
                  {item.explanation && <div className="glossary-explanation">{item.explanation}</div>}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
