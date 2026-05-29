'use client';

import React, { useEffect, useRef, useState, CSSProperties } from 'react';

/* ───────────────────────────── Data ───────────────────────────── */

interface Role {
  title: string;
  duration: string;
}

interface ExperienceEntry {
  org: string;
  roles: Role[];
  skills: string[];
  location: string;
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
}

const experiences: ExperienceEntry[] = [
  {
    org: "Space Technology Students' Society",
    roles: [
      { title: 'Junior Executive Member', duration: 'Jun 2025 – Oct 2025' },
      { title: 'Associate Member, Tech Team', duration: 'Jan 2025 – Jun 2025' },
    ],
    skills: ['Web Development', 'React.js'],
    location: 'Kharagpur, On-site / Remote',
  },
  {
    org: "National Students' Space Challenge",
    roles: [{ title: 'Subhead', duration: 'May 2025 – Oct 2025' }],
    skills: ['React.js'],
    location: 'On-site',
  },
  {
    org: 'KodeinKGP, IIT Kharagpur',
    roles: [
      { title: 'Senior Executive Member — AI & Metaverse Team', duration: 'May 2025 – Sep 2025' },
      { title: 'Trainee Developer', duration: 'Nov 2024 – May 2025' },
    ],
    skills: ['Machine Learning', 'Web Development', 'React.js'],
    location: 'Remote',
  },
  {
    org: 'Asan Innovators',
    roles: [{ title: 'Intern', duration: 'May 2025 – Sep 2025' }],
    skills: ['Python', 'Machine Learning'],
    location: 'Remote',
  },
];

const certifications: Certification[] = [
  {
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI & Stanford University',
    date: 'Jun 2025',
  },
];

/* ───────────────────── Scroll‑reveal hook ─────────────────────── */

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ───────────────────── Sub‑components ─────────────────────────── */

const TimelineDot = () => (
  <div
    style={{
      position: 'absolute',
      top: 28,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      boxShadow: '0 0 12px 4px rgba(99,102,241,0.45), 0 0 24px 8px rgba(139,92,246,0.2)',
      zIndex: 3,
      border: '3px solid #11111800',
      outline: '3px solid rgba(99,102,241,0.25)',
    }}
  />
);

const SkillTag = ({ label }: { label: string }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '3px 12px',
      borderRadius: 9999,
      fontSize: 12,
      fontWeight: 500,
      color: '#c4b5fd',
      background: 'rgba(99,102,241,0.12)',
      border: '1px solid rgba(139,92,246,0.22)',
      letterSpacing: 0.2,
      lineHeight: '20px',
    }}
  >
    {label}
  </span>
);

/* ─────────────────────── Timeline Card ────────────────────────── */

interface CardProps {
  entry: ExperienceEntry;
  index: number;
}

const TimelineCard: React.FC<CardProps> = ({ entry, index }) => {
  const isLeft = index % 2 === 0;
  const { ref, visible } = useReveal(0.15);

  const cardBase: CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: 460,
    background: 'rgba(17,17,24,0.7)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: '26px 28px 22px',
    color: '#f8fafc',
    transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
    boxShadow: '0 4px 30px rgba(0,0,0,0.25)',
  };

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    justifyContent: isLeft ? 'flex-end' : 'flex-start',
    width: 'calc(50% - 36px)',
    position: 'relative',
    ...(isLeft ? { marginRight: 'auto', paddingRight: 0 } : { marginLeft: 'auto', paddingLeft: 0 }),
    opacity: visible ? 1 : 0,
    transform: visible
      ? 'translateX(0)'
      : isLeft
        ? 'translateX(-60px)'
        : 'translateX(60px)',
    transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 100,
        marginBottom: 48,
      }}
    >
      {/* Dot on timeline */}
      <TimelineDot />

      {/* Card container */}
      <div ref={ref} className="exp-card-wrapper" data-side={isLeft ? 'left' : 'right'} style={wrapperStyle}>
        <div
          className="exp-card"
          style={cardBase}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px) scale(1.015)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 40px rgba(99,102,241,0.18), 0 4px 30px rgba(0,0,0,0.3)';
            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(99,102,241,0.25)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0) scale(1)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 30px rgba(0,0,0,0.25)';
            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
          }}
        >
          {/* Org name */}
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: -0.2 }}>{entry.org}</h3>

          {/* Roles */}
          <div style={{ marginTop: 14 }}>
            {entry.roles.map((role, i) => (
              <div key={i} style={{ marginBottom: i < entry.roles.length - 1 ? 10 : 0 }}>
                <p style={{ margin: 0, fontSize: 14.5, fontWeight: 600, color: '#e2e8f0' }}>{role.title}</p>
                <p style={{ margin: '2px 0 0', fontSize: 13, color: '#94a3b8' }}>{role.duration}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
            {entry.skills.map((s) => (
              <SkillTag key={s} label={s} />
            ))}
          </div>

          {/* Location */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 14,
              fontSize: 13,
              color: '#64748b',
            }}
          >
            {/* map‑pin icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {entry.location}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────── Certification Card ───────────────────────── */

const CertCard: React.FC<{ cert: Certification }> = ({ cert }) => {
  const { ref, visible } = useReveal(0.15);

  return (
    <div
      ref={ref}
      className="exp-card"
      style={{
        background: 'rgba(17,17,24,0.7)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: '24px 28px',
        color: '#f8fafc',
        maxWidth: 520,
        margin: '0 auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition:
          'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease',
        boxShadow: '0 4px 30px rgba(0,0,0,0.25)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 40px rgba(99,102,241,0.18), 0 4px 30px rgba(0,0,0,0.3)';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(99,102,241,0.25)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 30px rgba(0,0,0,0.25)';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        {/* badge icon */}
        <div
          style={{
            flexShrink: 0,
            width: 42,
            height: 42,
            borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.18))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        </div>

        <div>
          <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{cert.title}</h4>
          <p style={{ margin: '4px 0 0', fontSize: 13.5, color: '#94a3b8' }}>{cert.issuer}</p>
          <p style={{ margin: '4px 0 0', fontSize: 12.5, color: '#64748b' }}>{cert.date}</p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════ Main Component ═══════════════════════ */

export default function Experience() {
  return (
    <>
      {/* Responsive overrides injected once */}
      <style>{`
        @media (max-width: 768px) {
          .exp-timeline-line {
            left: 24px !important;
          }
          .exp-card-wrapper {
            width: 100% !important;
            margin-left: 56px !important;
            padding-left: 0 !important;
            justify-content: flex-start !important;
            transform: none !important;
          }
          .exp-card-wrapper[data-side="left"],
          .exp-card-wrapper[data-side="right"] {
            margin-left: 56px !important;
            margin-right: 0 !important;
            justify-content: flex-start !important;
          }
          .exp-timeline-dot {
            left: 24px !important;
          }
        }
      `}</style>

      <section
        id="experience"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 960,
          margin: '0 auto',
          padding: '100px 24px 80px',
        }}
      >
        {/* ──────── Section heading ──────── */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: -1,
              color: '#f8fafc',
              display: 'inline-block',
            }}
          >
            Experience
          </h2>
          <div
            style={{
              marginTop: 12,
              height: 4,
              width: 80,
              borderRadius: 2,
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        </div>

        {/* ──────── Timeline ──────── */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div
            className="exp-timeline-line"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 3,
              background: 'linear-gradient(180deg, #6366f1, #8b5cf6, rgba(139,92,246,0.15))',
              borderRadius: 4,
              zIndex: 1,
            }}
          />

          {/* Entries */}
          {experiences.map((exp, i) => (
            <TimelineCard key={exp.org} entry={exp} index={i} />
          ))}
        </div>

        {/* ──────── Certifications ──────── */}
        <div style={{ marginTop: 72 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h3
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: -0.5,
                color: '#f8fafc',
                display: 'inline-block',
              }}
            >
              Certifications
            </h3>
            <div
              style={{
                marginTop: 10,
                height: 3,
                width: 56,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {certifications.map((cert) => (
              <CertCard key={cert.title} cert={cert} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
