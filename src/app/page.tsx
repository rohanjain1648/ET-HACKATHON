import Link from 'next/link';

const MODULES = [
  {
    href: '/my-et',
    icon: '🧠',
    title: 'My ET — Personalized Newsroom',
    description: 'Not just a filtered feed — a fundamentally different news experience for every user. Portfolio-aware, role-adapted, time-intelligent.',
    tags: ['Adaptive', 'Portfolio-Aware', 'AI-Ranked'],
  },
  {
    href: '/navigator',
    icon: '🧭',
    title: 'News Navigator — Intelligence Briefings',
    description: 'Instead of reading 8 separate articles, interact with a single AI-powered deep briefing. Ask questions, adjust depth, explore.',
    tags: ['Synthesis', 'Conversational', 'Real-time'],
  },
  {
    href: '/video-studio',
    icon: '🎬',
    title: 'AI News Video Studio',
    description: 'Transform any article into a broadcast-quality 60–120 second video with AI narration, animated data visuals, and contextual overlays.',
    tags: ['Auto-Generate', 'Broadcast', 'Multi-Format'],
  },
  {
    href: '/story-arc',
    icon: '📡',
    title: 'Story Arc Tracker',
    description: 'Pick any ongoing story and AI builds the complete visual narrative: timeline, key players, sentiment shifts, and predictions.',
    tags: ['Timeline', 'Entity Graph', 'Predictions'],
  },
  {
    href: '/vernacular',
    icon: '🗣️',
    title: 'Vernacular Business News Engine',
    description: 'Not literal translation — culturally adapted business news in Hindi, Tamil, Telugu, Bengali with local context and smart code-mixing.',
    tags: ['Cultural', 'Multi-lingual', 'Audio'],
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-grid" />
        <div className="hero-glow" />

        <div className="hero-badge">⚡ AI-Native Experience</div>

        <h1 className="hero-title">
          News That <span className="highlight">Thinks</span> With You
        </h1>

        <p className="hero-subtitle">
          ET Neuron reimagines business news for 2026. Every story is personalized,
          every briefing is interactive, every article becomes a video.
          <strong> You can&apos;t go back to reading news the old way.</strong>
        </p>

        <div className="hero-cta-row">
          <Link href="/my-et" className="btn-primary">
            ⚡ Enter My Newsroom
          </Link>
          <Link href="/pitch" className="btn-secondary">
            📊 View Pitch Deck
          </Link>
        </div>
      </section>

      {/* Modules Section */}
      <section className="modules-section">
        <div className="section-label">Five Pillars</div>
        <h2 className="section-title">
          One Platform. Five
          Revolutions.
        </h2>

        <div className="modules-grid">
          {MODULES.map((mod) => (
            <Link key={mod.href} href={mod.href} className="module-card">
              <span className="module-icon">{mod.icon}</span>
              <h3>{mod.title}</h3>
              <p>{mod.description}</p>
              <div>
                {mod.tags.map((tag) => (
                  <span key={tag} className="module-tag">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
