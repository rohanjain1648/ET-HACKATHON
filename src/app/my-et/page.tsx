'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ARTICLES, PERSONAS, getArticlesForPersona, type Article } from '@/data/articles';

const WATCHLIST_DATA: Record<string, { name: string; price: string; change: string; dir: 'up' | 'down' }[]> = {
  investor: [
    { name: 'Reliance', price: '₹2,890', change: '+1.8%', dir: 'up' },
    { name: 'HDFC Bank', price: '₹1,695', change: '+2.5%', dir: 'up' },
    { name: 'Zomato', price: '₹298', change: '+8.1%', dir: 'up' },
    { name: 'Tata Motors', price: '₹745', change: '-0.6%', dir: 'down' },
    { name: 'SBI', price: '₹780', change: '+3.8%', dir: 'up' },
  ],
  founder: [
    { name: 'Zomato', price: '₹298', change: '+8.1%', dir: 'up' },
    { name: 'PhonePe (Pre-IPO)', price: '$15B val', change: '—', dir: 'up' },
    { name: 'Flipkart (Walmart)', price: '$38B val', change: '—', dir: 'up' },
  ],
  student: [],
};

function ArticleCard({ article, persona }: { article: Article; persona: string }) {
  const p = PERSONAS[persona as keyof typeof PERSONAS];
  const relevance = p ? article.tags.filter(t => p.priorityTags.includes(t)).length : 0;

  return (
    <div className="article-card">
      <div className="article-card-header">
        <span className={`article-category ${article.sentiment}`}>{article.category}</span>
        <span className="article-meta">{article.author} · {article.readTimeMin} min read</span>
        {article.impactScore >= 8 && (
          <span className={`impact-badge ${article.impactScore >= 9 ? 'high' : ''}`}>
            ⚡ Impact: {article.impactScore}/10
          </span>
        )}
      </div>
      <h3>{article.title}</h3>
      <p className="article-summary">{article.summary}</p>
      <div className="article-tags">
        {article.tags.slice(0, 4).map(tag => (
          <span key={tag} className="article-tag">{tag}</span>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
        <Link href={`/video-studio?id=${article.id}`} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '11px' }}>
          🎬 AI Video
        </Link>
        <Link href={`/navigator?id=${article.id}`} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '11px' }}>
          🧭 Briefing
        </Link>
        <Link href={`/story-arc?q=${article.category.toLowerCase().includes('economy') || article.tags.includes('RBI') ? 'rbi' : article.tags.includes('Zomato') || article.category.toLowerCase().includes('tech') ? 'qcomm' : 'budget'}`} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '11px' }}>
          📡 Story Arc
        </Link>
        <Link href={`/vernacular?id=${article.id}`} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '11px' }}>
          🗣️ Adapt
        </Link>
      </div>

      {relevance > 0 && (
        <div className="relevance-bar">
          {'🎯'.repeat(Math.min(relevance, 3))} {relevance >= 3 ? 'Highly' : relevance >= 2 ? 'Very' : ''} Relevant to your {p?.name} profile
        </div>
      )}
    </div>
  );
}

export default function MyETPage() {
  const [persona, setPersona] = useState('investor');
  const [timeMode, setTimeMode] = useState('briefing');

  const articles = useMemo(() => getArticlesForPersona(persona), [persona]);
  const watchlist = WATCHLIST_DATA[persona] || [];
  const currentPersona = PERSONAS[persona as keyof typeof PERSONAS];

  // Serendipity: articles NOT in priority tags
  const serendipityArticles = useMemo(() => {
    const p = PERSONAS[persona as keyof typeof PERSONAS];
    if (!p) return [];
    return ARTICLES.filter(a => a.tags.filter(t => p.priorityTags.includes(t)).length === 0).slice(0, 3);
  }, [persona]);

  return (
    <div className="myet-page">
      <div className="page-header">
        <h1>🧠 My ET — Your Personalized Newsroom</h1>
        <p>News that adapts to who you are, what you own, and how you read.</p>
      </div>

      {/* Persona Selector */}
      <div className="persona-selector">
        {Object.values(PERSONAS).map((p) => (
          <button
            key={p.id}
            className={`persona-btn ${persona === p.id ? 'active' : ''}`}
            onClick={() => setPersona(p.id)}
          >
            <span className="p-icon">{p.icon}</span>
            <div>
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{p.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Time Mode */}
      <div className="time-mode-bar">
        {['briefing', 'deep', 'catchup'].map(m => (
          <button
            key={m}
            className={`time-mode ${timeMode === m ? 'active' : ''}`}
            onClick={() => setTimeMode(m)}
          >
            {m === 'briefing' ? '☀️ Morning Briefing' : m === 'deep' ? '📊 Deep Analysis' : '🌙 Evening Catch-Up'}
          </button>
        ))}
      </div>

      <div className="myet-layout">
        {/* Feed */}
        <div className="feed-column">
          {timeMode === 'catchup' && (
            <div className="article-card" style={{ borderColor: 'rgba(0, 212, 170, 0.2)', background: 'rgba(0, 212, 170, 0.04)' }}>
              <h3>🌙 Here&apos;s What You Missed Today</h3>
              <p className="article-summary">
                {currentPersona?.id === 'investor'
                  ? 'RBI cut repo rate by 25 bps — your banking stocks rallied. Zomato hit record profits. Rupee strengthened. 3 stories directly impact your watchlist.'
                  : currentPersona?.id === 'founder'
                  ? 'Flipkart is coming for quick commerce with 30-city expansion. Startup funding hit $4.2B in Q1 — AI leads. Your competitive landscape shifted today.'
                  : 'The RBI made a big decision today that affects everyone. India\'s GDP is growing faster than any major economy. Plus: a ₹999 AI phone is coming.'}
              </p>
            </div>
          )}

          {articles.slice(0, timeMode === 'briefing' ? 6 : timeMode === 'deep' ? 10 : 5).map(article => (
            <ArticleCard key={article.id} article={article} persona={persona} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="sidebar-column">
          {/* Portfolio Pulse */}
          {watchlist.length > 0 && (
            <div className="pulse-widget">
              <h4>📈 Portfolio Pulse</h4>
              {watchlist.map(item => (
                <div key={item.name} className="pulse-item">
                  <span className="pulse-name">{item.name}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.price}</div>
                    <span className={`pulse-change ${item.dir}`}>{item.change}</span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: 'rgba(0, 212, 170, 0.06)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                💡 <strong style={{ color: 'var(--accent-primary)' }}>AI Insight:</strong>{' '}
                {persona === 'investor'
                  ? 'Your banking stocks (HDFC, SBI) are up on the RBI rate cut. Zomato hit a 52-week high on Q3 results. Consider reviewing your allocation.'
                  : 'The quick commerce war is heating up. Flipkart Minutes expansion could reshape the competitive landscape for food-tech startups.'}
              </div>
            </div>
          )}

          {/* Serendipity Engine */}
          <div className="serendipity-widget">
            <h4>🔮 Serendipity Engine</h4>
            <div className="s-subtitle">Stories outside your bubble that you should see</div>
            {serendipityArticles.map(article => (
              <div key={article.id} className="serendipity-item">
                <strong>{article.title}</strong>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="pulse-widget">
            <h4>📊 Market Snapshot</h4>
            <div className="pulse-item">
              <span className="pulse-name">Sensex</span>
              <span className="pulse-change up">78,450 (+1.2%)</span>
            </div>
            <div className="pulse-item">
              <span className="pulse-name">Nifty 50</span>
              <span className="pulse-change up">23,820 (+1.1%)</span>
            </div>
            <div className="pulse-item">
              <span className="pulse-name">USD/INR</span>
              <span className="pulse-change up">₹84.30 (+0.4%)</span>
            </div>
            <div className="pulse-item">
              <span className="pulse-name">Gold</span>
              <span className="pulse-change down">₹68,200 (-0.2%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
