'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

// ── Constants ──────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;

const COLORS = {
  bg: 'rgba(10,10,15,0.8)',
  bgScrolled: 'rgba(10,10,15,0.92)',
  accent: '#6366f1',
  accentHover: '#818cf8',
  text: '#f8fafc',
  muted: '#94a3b8',
} as const;

// ── Component ──────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ── Scroll shadow / darker bg ────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── IntersectionObserver for active section ──────────────────────────────
  useEffect(() => {
    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the greatest intersection ratio that is visible
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Among visible entries, prefer the one closest to the top of the viewport
          const sorted = [...visible].sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
          const id = sorted[0].target.getAttribute('id');
          if (id) setActiveSection(id);
        }
      },
      { rootMargin: '-80px 0px -40% 0px', threshold: [0, 0.25, 0.5] },
    );

    observerRef.current = observer;

    // Observe all section elements referenced by NAV_LINKS
    NAV_LINKS.forEach(({ href }) => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Lock body scroll when mobile menu is open ────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // ── Smooth scroll handler ────────────────────────────────────────────────
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(id);
      }
      setMobileOpen(false);
    },
    [],
  );

  // ── Styles ───────────────────────────────────────────────────────────────
  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 clamp(1rem, 4vw, 3rem)',
    height: 64,
    background: scrolled ? COLORS.bgScrolled : COLORS.bg,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: scrolled
      ? '1px solid rgba(99,102,241,0.15)'
      : '1px solid rgba(255,255,255,0.05)',
    boxShadow: scrolled
      ? '0 4px 30px rgba(0,0,0,0.45)'
      : 'none',
    transition: 'background 0.35s ease, box-shadow 0.35s ease, border-bottom 0.35s ease',
  };

  const logoStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    backgroundImage: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentHover}, #c084fc)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
  };

  const desktopLinksStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const getLinkStyle = (id: string): React.CSSProperties => {
    const isActive = activeSection === id;
    const isHovered = hoveredLink === id;
    return {
      position: 'relative',
      padding: '0.45rem 0.85rem',
      fontSize: '0.875rem',
      fontWeight: isActive ? 600 : 500,
      color: isActive ? COLORS.text : isHovered ? COLORS.text : COLORS.muted,
      textDecoration: 'none',
      borderRadius: 8,
      background: isActive
        ? 'rgba(99,102,241,0.12)'
        : isHovered
          ? 'rgba(99,102,241,0.07)'
          : 'transparent',
      transition: 'color 0.25s ease, background 0.25s ease',
      cursor: 'pointer',
      letterSpacing: '0.01em',
    };
  };

  const activeIndicatorStyle = (id: string): React.CSSProperties => ({
    position: 'absolute',
    bottom: 2,
    left: '50%',
    transform: 'translateX(-50%)',
    width: activeSection === id ? 18 : 0,
    height: 2,
    borderRadius: 1,
    background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentHover})`,
    transition: 'width 0.3s ease',
  });

  // ── Hamburger styles ─────────────────────────────────────────────────────
  const hamburgerStyle: React.CSSProperties = {
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    borderRadius: 6,
    transition: 'background 0.2s ease',
    zIndex: 1001,
  };

  const barBase: React.CSSProperties = {
    width: 22,
    height: 2,
    borderRadius: 2,
    background: COLORS.text,
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  };

  const bar1: React.CSSProperties = {
    ...barBase,
    transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none',
  };
  const bar2: React.CSSProperties = {
    ...barBase,
    marginTop: 5,
    opacity: mobileOpen ? 0 : 1,
  };
  const bar3: React.CSSProperties = {
    ...barBase,
    marginTop: 5,
    transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
  };

  // ── Mobile overlay & panel ───────────────────────────────────────────────
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 999,
    background: 'rgba(0,0,0,0.55)',
    opacity: mobileOpen ? 1 : 0,
    pointerEvents: mobileOpen ? 'auto' : 'none',
    transition: 'opacity 0.35s ease',
  };

  const mobileMenuStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 1000,
    width: 280,
    maxWidth: '80vw',
    height: '100dvh',
    background: 'rgba(10,10,15,0.97)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderLeft: '1px solid rgba(99,102,241,0.15)',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 80,
    paddingLeft: 32,
    paddingRight: 32,
    gap: 4,
    transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
    boxShadow: mobileOpen ? '-8px 0 40px rgba(0,0,0,0.5)' : 'none',
  };

  const getMobileLinkStyle = (id: string): React.CSSProperties => {
    const isActive = activeSection === id;
    return {
      padding: '0.75rem 1rem',
      fontSize: '1.05rem',
      fontWeight: isActive ? 600 : 400,
      color: isActive ? COLORS.text : COLORS.muted,
      textDecoration: 'none',
      borderRadius: 8,
      background: isActive ? 'rgba(99,102,241,0.1)' : 'transparent',
      borderLeft: isActive
        ? `3px solid ${COLORS.accent}`
        : '3px solid transparent',
      transition: 'all 0.25s ease',
      letterSpacing: '0.01em',
    };
  };

  // ── Responsive media via inline style tag ────────────────────────────────
  const responsiveCSS = `
    @media (max-width: 768px) {
      .navbar-desktop-links { display: none !important; }
      .navbar-hamburger { display: flex !important; }
    }
  `;

  return (
    <>
      <style>{responsiveCSS}</style>

      <nav style={navStyle} role="navigation" aria-label="Main navigation">
        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, '#home')}
          style={logoStyle}
          aria-label="Go to top"
        >
          DS
        </a>

        {/* ── Desktop links ─────────────────────────────────────────────── */}
        <ul className="navbar-desktop-links" style={desktopLinksStyle}>
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '');
            return (
              <li key={id}>
                <a
                  href={href}
                  onClick={(e) => handleClick(e, href)}
                  onMouseEnter={() => setHoveredLink(id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={getLinkStyle(id)}
                  aria-current={activeSection === id ? 'page' : undefined}
                >
                  {label}
                  <span style={activeIndicatorStyle(id)} />
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Hamburger toggle ──────────────────────────────────────────── */}
        <button
          className="navbar-hamburger"
          style={hamburgerStyle}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span style={bar1} />
          <span style={bar2} />
          <span style={bar3} />
        </button>
      </nav>

      {/* ── Mobile overlay ─────────────────────────────────────────────── */}
      <div
        style={overlayStyle}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile slide-in menu ───────────────────────────────────────── */}
      <div style={mobileMenuStyle} role="dialog" aria-modal={mobileOpen}>
        {NAV_LINKS.map(({ label, href }) => {
          const id = href.replace('#', '');
          return (
            <a
              key={id}
              href={href}
              onClick={(e) => handleClick(e, href)}
              style={getMobileLinkStyle(id)}
              aria-current={activeSection === id ? 'page' : undefined}
            >
              {label}
            </a>
          );
        })}

        {/* Decorative accent line at bottom of mobile menu */}
        <div
          style={{
            marginTop: 'auto',
            marginBottom: 32,
            height: 2,
            width: '60%',
            borderRadius: 1,
            background: `linear-gradient(90deg, ${COLORS.accent}, transparent)`,
          }}
        />
      </div>
    </>
  );
}
