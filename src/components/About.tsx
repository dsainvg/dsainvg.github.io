'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ─── animated counter hook ─── */
function useCounter(end: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const id = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(id);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(id);
  }, [trigger, end, duration]);

  return count;
}

/* ─── intersection-observer hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─── constants ─── */
const ACCENT = '#6366f1';
const ACCENT_ALT = '#a78bfa';
const TEXT_PRIMARY = '#f8fafc';
const TEXT_SECONDARY = '#94a3b8';
const CARD_BG = 'rgba(17,17,24,0.7)';
const CARD_BORDER = 'rgba(255,255,255,0.08)';
const SECTION_BG = '#0a0a0f';

const INFO_CARDS: { icon: string; label: string; value: string }[] = [
  { icon: '🎓', label: 'Education', value: 'B.Tech CS, IIT Kharagpur (2024–2028)' },
  { icon: '📍', label: 'Location', value: 'Kharagpur, India' },
  { icon: '🧠', label: 'Interests', value: 'AI/ML, Web3.0, Space Tech' },
  { icon: '🏛️', label: 'Clubs', value: 'KodeinKGP, spAts' },
];

const STATS: { end: number; suffix: string; label: string }[] = [
  { end: 46, suffix: '+', label: 'Projects' },
  { end: 500, suffix: '+', label: 'Connections' },
  { end: 777, suffix: '+', label: 'Followers' },
  { end: 1, suffix: '', label: 'Certification' },
];

const BIO =
  'A passionate contributor at KodeinKGP, IIT Kharagpur, focusing on AI and Web3.0 initiatives within the Metaverse Team. Actively pursuing a Bachelor of Technology in Computer Science, with a strong foundation in machine learning, web development, and Python programming. Also an associate member of the Space Technology Students\' Society, contributing to tech-driven projects. Known for collaborative problem-solving and a keen interest in leveraging cutting-edge technologies to create impactful solutions.';

/* ─── sub-components ─── */
function StatCard({
  end,
  suffix,
  label,
  trigger,
  delay,
}: {
  end: number;
  suffix: string;
  label: string;
  trigger: boolean;
  delay: number;
}) {
  const count = useCounter(end, 1600, trigger);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [trigger, delay]);

  return (
    <div
      style={{
        flex: '1 1 200px',
        background: CARD_BG,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 16,
        padding: '28px 20px',
        textAlign: 'center',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <span
        style={{
          fontSize: 40,
          fontWeight: 800,
          backgroundImage: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_ALT})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'block',
          lineHeight: 1.2,
        }}
      >
        {count}
        {suffix}
      </span>
      <span style={{ fontSize: 14, color: TEXT_SECONDARY, marginTop: 6, display: 'block', letterSpacing: 1 }}>
        {label}
      </span>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
  visible,
  delay,
}: {
  icon: string;
  label: string;
  value: string;
  visible: boolean;
  delay: number;
}) {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [visible, delay]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: CARD_BG,
        border: `1px solid ${hovered ? ACCENT : CARD_BORDER}`,
        borderRadius: 14,
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        opacity: show ? 1 : 0,
        transform: show ? 'translateX(0)' : 'translateX(30px)',
        transition: 'opacity 0.55s ease, transform 0.55s ease, border 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? `0 0 20px ${ACCENT}22` : 'none',
        cursor: 'default',
      }}
    >
      <span
        style={{
          fontSize: 28,
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          background: `${ACCENT}15`,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div>
        <div style={{ fontSize: 12, color: TEXT_SECONDARY, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 2 }}>
          {label}
        </div>
        <div style={{ fontSize: 15, color: TEXT_PRIMARY, fontWeight: 500 }}>{value}</div>
      </div>
    </div>
  );
}

/* ─── main component ─── */
export default function About() {
  const { ref: sectionRef, visible } = useInView(0.1);
  const { ref: statsRef, visible: statsVisible } = useInView(0.2);

  /* inject keyframes once */
  useEffect(() => {
    const id = '__about-keyframes';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes aboutGradientShift {
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes aboutPulseGlow {
        0%, 100% { opacity: 0.45; }
        50%      { opacity: 0.75; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: SECTION_BG,
        padding: '100px 24px',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      {/* ── ambient glow ── */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ACCENT}18, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          animation: 'aboutPulseGlow 6s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-8%',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ACCENT_ALT}14, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          animation: 'aboutPulseGlow 8s ease-in-out infinite',
        }}
      />

      <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* ── section title ── */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              color: TEXT_PRIMARY,
              margin: 0,
              letterSpacing: -0.5,
            }}
          >
            About Me
          </h2>
          {/* gradient underline */}
          <div
            style={{
              width: 80,
              height: 4,
              borderRadius: 4,
              margin: '16px auto 0',
              background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_ALT}, ${ACCENT})`,
              backgroundSize: '200% 100%',
              animation: 'aboutGradientShift 3s ease infinite',
            }}
          />
        </div>

        {/* ── two-column layout ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 48,
            alignItems: 'flex-start',
          }}
        >
          {/* left – bio */}
          <div
            style={{
              flex: '1 1 480px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.85,
                color: TEXT_SECONDARY,
                margin: 0,
                maxWidth: 560,
              }}
            >
              {BIO}
            </p>

            {/* decorative quote line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 32 }}>
              <div
                style={{
                  width: 4,
                  height: 48,
                  borderRadius: 4,
                  background: `linear-gradient(to bottom, ${ACCENT}, ${ACCENT_ALT})`,
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  fontStyle: 'italic',
                  color: `${TEXT_SECONDARY}cc`,
                  lineHeight: 1.7,
                }}
              >
                Sophomore at IIT Kharagpur · B.Tech Computer Science · Class of 2028
              </p>
            </div>
          </div>

          {/* right – info cards */}
          <div
            style={{
              flex: '1 1 380px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {INFO_CARDS.map((card, i) => (
              <InfoCard key={card.label} {...card} visible={visible} delay={300 + i * 120} />
            ))}
          </div>
        </div>

        {/* ── stats counters ── */}
        <div
          ref={statsRef}
          style={{
            marginTop: 80,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            justifyContent: 'center',
          }}
        >
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} trigger={statsVisible} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
