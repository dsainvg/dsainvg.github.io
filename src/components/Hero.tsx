'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────
   Particle / Constellation Canvas Background
   ───────────────────────────────────────────── */

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }[] = [];

    const PARTICLE_COUNT = 80;
    const CONNECTION_DISTANCE = 150;
    const MOUSE_RADIUS = 200;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.8 + 0.8,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
        ctx.fill();

        // Mouse interaction — gentle push
        const dx0 = p.x - mouse.x;
        const dy0 = p.y - mouse.y;
        const distMouse = Math.sqrt(dx0 * dx0 + dy0 * dy0);
        if (distMouse < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - distMouse) / MOUSE_RADIUS * 0.02;
          p.vx += dx0 * force;
          p.vy += dy0 * force;
        }

        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

/* ─────────────────────────────────────────────
   Typing Animation Hook
   ───────────────────────────────────────────── */

const useTypingEffect = (
  phrases: string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
) => {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
          if (charIdx + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
          if (charIdx - 1 === 0) {
            setIsDeleting(false);
            setPhraseIdx((p) => (p + 1) % phrases.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return displayed;
};

/* ─────────────────────────────────────────────
   Hero Component
   ───────────────────────────────────────────── */

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const typedText = useTypingEffect([
    'AI & Web3.0 Enthusiast',
    'Machine Learning Developer',
    'Full Stack Web Developer',
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  /* --- animation helpers --- */
  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  /* ---- inline keyframes (injected once) ---- */
  const keyframes = `
    @keyframes heroBlinkCaret {
      0%, 100% { border-color: transparent; }
      50% { border-color: #6366f1; }
    }
    @keyframes heroBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(10px); }
    }
    @keyframes heroGradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      {/* Injected keyframes */}
      <style>{keyframes}</style>

      {/* Canvas constellation */}
      <ParticleBackground />

      {/* Subtle radial glow behind content */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 900,
          padding: '0 clamp(1.5rem, 5vw, 6rem)',
          marginLeft: 'clamp(1rem, 8vw, 10rem)',
        }}
      >
        {/* Greeting */}
        <p
          style={{
            ...fadeUp(0.1),
            fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
            color: '#a5b4fc',
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 12,
            fontWeight: 500,
          }}
        >
          Hello, I&apos;m
        </p>

        {/* Name */}
        <h1
          style={{
            ...fadeUp(0.25),
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 16,
            backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #a78bfa 70%, #6366f1 100%)',
            backgroundSize: '200% 200%',
            animation: 'heroGradientShift 6s ease infinite',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          Durga Sai
        </h1>

        {/* Subtitle / Title */}
        <p
          style={{
            ...fadeUp(0.35),
            fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
            color: '#cbd5e1',
            marginBottom: 10,
            fontWeight: 500,
          }}
        >
          B.Tech Computer Science Student at IIT Kharagpur
        </p>

        {/* Typing tagline */}
        <div
          style={{
            ...fadeUp(0.45),
            minHeight: '2rem',
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              color: '#8b5cf6',
              fontWeight: 600,
              borderRight: '2px solid #6366f1',
              paddingRight: 4,
              animation: 'heroBlinkCaret 0.8s step-end infinite',
            }}
          >
            {typedText}
          </span>
        </div>

        {/* Intro paragraph */}
        <p
          style={{
            ...fadeUp(0.55),
            fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
            color: '#94a3b8',
            lineHeight: 1.7,
            maxWidth: 560,
            marginBottom: 36,
          }}
        >
          Sophomore at IIT Kharagpur, passionate about building impactful solutions with
          cutting-edge technologies.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            ...fadeUp(0.65),
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 40,
          }}
        >
          {/* View Projects */}
          <button
            onClick={() => handleScrollTo('projects')}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 8px 30px rgba(99,102,241,0.45)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 4px 20px rgba(99,102,241,0.3)';
            }}
            style={{
              padding: '14px 32px',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#f8fafc',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              letterSpacing: 0.3,
            }}
          >
            View Projects
          </button>

          {/* Download Resume */}
          <a
            href="/Resume_Durga_Sai.pdf"
            download
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                'rgba(99,102,241,0.12)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                '0 4px 20px rgba(99,102,241,0.2)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
            }}
            style={{
              padding: '14px 32px',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#a5b4fc',
              background: 'transparent',
              border: '2px solid rgba(99,102,241,0.5)',
              borderRadius: 12,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              letterSpacing: 0.3,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </div>

        {/* Social Icons */}
        <div
          style={{
            ...fadeUp(0.75),
            display: 'flex',
            gap: 20,
            alignItems: 'center',
          }}
        >
          {/* GitHub */}
          <a
            href="https://github.com/dsainvg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#a5b4fc';
              (e.currentTarget as HTMLAnchorElement).style.filter =
                'drop-shadow(0 0 8px rgba(99,102,241,0.6))';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8';
              (e.currentTarget as HTMLAnchorElement).style.filter = 'none';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
            style={{
              color: '#94a3b8',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/durga-sai-gundubogula/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#a5b4fc';
              (e.currentTarget as HTMLAnchorElement).style.filter =
                'drop-shadow(0 0 8px rgba(99,102,241,0.6))';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8';
              (e.currentTarget as HTMLAnchorElement).style.filter = 'none';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
            style={{
              color: '#94a3b8',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 1,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1s ease 1.2s',
          cursor: 'pointer',
        }}
        onClick={() => handleScrollTo('about')}
      >
        <span
          style={{
            fontSize: '0.7rem',
            color: '#64748b',
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#64748b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            animation: 'heroBounce 2s ease-in-out infinite',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
