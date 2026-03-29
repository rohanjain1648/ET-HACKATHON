'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/my-et', label: 'My ET' },
  { href: '/navigator', label: 'Navigator' },
  { href: '/video-studio', label: 'Studio' },
  { href: '/story-arc', label: 'Story Arc' },
  { href: '/vernacular', label: 'Vernacular' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="top-nav">
      <Link href="/" className="logo">
        ET <span>NEURON</span>
      </Link>
      <div className="nav-links">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="user-controls">
        <Link href="/pitch" className="lang-toggle">📊 Pitch</Link>
        <div className="profile-pic" />
      </div>
    </nav>
  );
}
