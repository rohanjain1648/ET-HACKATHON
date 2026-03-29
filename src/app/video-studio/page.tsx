'use client';
import { useState, useEffect, useCallback } from 'react';
import { ARTICLES } from '@/data/articles';

interface Scene {
  id: number;
  type: string;
  duration: string;
  narration: string;
  visual: string;
  dataOverlay?: { label: string; value: string; trend: string };
}

interface Screenplay {
  title: string;
  duration: string;
  scenes: Scene[];
  tone: string;
  lowerThird?: string;
}

const STYLES = [
  { id: 'breaking news', label: '🔴 Breaking News', color: '#FF4757' },
  { id: 'market wrap', label: '📊 Market Wrap', color: '#00D4AA' },
  { id: 'deep explainer', label: '🎓 Explainer', color: '#3B82F6' },
  { id: 'earnings flash', label: '💰 Earnings Flash', color: '#FFA502' },
];

export default function VideoStudioPage() {
  const [selectedArticle, setSelectedArticle] = useState(ARTICLES[0]);
  const [style, setStyle] = useState('breaking news');
  const [screenplay, setScreenplay] = useState<Screenplay | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const scenes = screenplay?.scenes || [];

  const speakNarration = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const engVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google'));
      if (engVoice) utterance.voice = engVoice;
      utterance.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  useEffect(() => {
    if (!isPlaying || scenes.length === 0) return;
    speakNarration(scenes[currentScene]?.narration || '');
    const timer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 6000);
    return () => {
      clearTimeout(timer);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [isPlaying, currentScene, scenes, speakNarration]);

  async function generate() {
    setLoading(true);
    setScreenplay(null);
    setCurrentScene(0);
    setIsPlaying(false);
    try {
      const res = await fetch('/api/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId: selectedArticle.id, style }),
      });
      const data = await res.json();
      setScreenplay(data);
    } catch {
      setScreenplay(null);
    }
    setLoading(false);
  }

  function togglePlay() {
    if (isPlaying) {
      setIsPlaying(false);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } else {
      if (currentScene >= scenes.length - 1) setCurrentScene(0);
      setIsPlaying(true);
    }
  }

  const scene = scenes[currentScene];
  const toneColor = style === 'breaking news' ? '#FF4757' : style === 'market wrap' ? '#00D4AA' : style === 'deep explainer' ? '#3B82F6' : '#FFA502';

  return (
    <div className="video-page">
      <div className="page-header">
        <h1>🎬 AI News Video Studio</h1>
        <p>Transform any article into a broadcast-quality video with AI narration.</p>
      </div>

      <div className="video-layout">
        <div>
          {/* Video Viewport */}
          <div className="video-viewport">
            <div className="broadcast-screen">
              <div className="broadcast-bg" style={{ background: `linear-gradient(135deg, ${toneColor}11, #0a1628, ${toneColor}08)` }} />

              {screenplay ? (
                <div className="broadcast-content">
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: toneColor, marginBottom: 8 }}>
                    {scene?.type || 'LIVE'} · ET NEURON
                  </div>
                  <div className="broadcast-headline" style={{ borderBottom: `2px solid ${toneColor}`, paddingBottom: 12 }}>
                    {scene?.type === 'intro' || scene?.type === 'outro' ? screenplay.title : scene?.visual || screenplay.title}
                  </div>
                  <div className="broadcast-narration">{scene?.narration || ''}</div>
                  {scene?.dataOverlay && (
                    <div className="broadcast-data-overlay">
                      <div className="broadcast-stat">
                        <div className="bs-value" style={{ color: scene.dataOverlay.trend === 'up' ? '#00D4AA' : scene.dataOverlay.trend === 'down' ? '#FF4757' : '#FFA502' }}>
                          {scene.dataOverlay.value}
                        </div>
                        <div className="bs-label">{scene.dataOverlay.label}</div>
                      </div>
                    </div>
                  )}
                </div>
              ) : loading ? (
                <div className="broadcast-content">
                  <div className="spinner" />
                  <div style={{ color: 'var(--text-secondary)' }}>Generating broadcast screenplay...</div>
                </div>
              ) : (
                <div className="broadcast-content">
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🎬</div>
                  <div className="broadcast-headline">Select an article and generate</div>
                  <div className="broadcast-narration">Choose an article from the sidebar, pick a style, and let AI create your broadcast.</div>
                </div>
              )}

              {/* Lower Third */}
              <div className="broadcast-lower-third">
                <div className="lt-brand" style={{ background: toneColor }}>ET NEURON</div>
                <div className="lt-ticker">
                  <span>{screenplay?.lowerThird || 'Sensex 78,450 (+1.2%) · Nifty 23,820 (+1.1%) · USD/INR 84.30 · Gold ₹68,200'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          {screenplay && (
            <div className="video-controls">
              <button className="play-btn" onClick={togglePlay}>
                {isPlaying ? '⏸' : '▶'}
              </button>
              <div className="scene-progress">
                <div className="scene-progress-fill" style={{ width: `${scenes.length > 0 ? ((currentScene + 1) / scenes.length) * 100 : 0}%` }} />
              </div>
              <span className="scene-counter">{currentScene + 1}/{scenes.length}</span>
              {isSpeaking && <span style={{ fontSize: 12, color: 'var(--accent-primary)' }}>🔊 Speaking...</span>}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="video-sidebar">
          {/* Article Picker */}
          <div className="article-picker">
            <h4>Select Article</h4>
            {ARTICLES.slice(0, 8).map(a => (
              <div
                key={a.id}
                className={`picker-item ${selectedArticle.id === a.id ? 'active' : ''}`}
                onClick={() => { setSelectedArticle(a); setScreenplay(null); setCurrentScene(0); setIsPlaying(false); }}
              >
                {a.title.slice(0, 60)}...
              </div>
            ))}
          </div>

          {/* Style Selector */}
          <div className="style-selector">
            <h4>Broadcast Style</h4>
            <div className="style-chips">
              {STYLES.map(s => (
                <button
                  key={s.id}
                  className={`style-chip ${style === s.id ? 'active' : ''}`}
                  onClick={() => setStyle(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate */}
          <button className="generate-btn" onClick={generate} disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? '⏳ Generating...' : '⚡ Generate Video'}
          </button>

          {/* Screenplay */}
          {screenplay && scenes.length > 0 && (
            <div className="screenplay-panel">
              <h4>Screenplay ({scenes.length} scenes)</h4>
              {scenes.map((s, i) => (
                <div
                  key={i}
                  className={`scene-item ${currentScene === i ? 'active' : ''}`}
                  onClick={() => { setCurrentScene(i); setIsPlaying(false); }}
                >
                  <div className="si-type">{s.type} · {s.duration}</div>
                  <div className="si-narration">{s.narration?.slice(0, 80)}...</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
