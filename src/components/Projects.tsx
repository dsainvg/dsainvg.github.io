'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
}

const projects: Project[] = [
  {
    title: 'Encryption Algorithm',
    description:
      'A custom encryption algorithm built from scratch, focusing on novel cryptographic approaches for secure data transmission.',
    tech: ['Python', 'Cryptography'],
    github: 'https://github.com/dsainvg/encryptionAlgorithm',
  },
  {
    title: 'Auction Agents',
    description:
      'Multi-agent auction system using AI agents that autonomously bid and negotiate in simulated marketplace environments.',
    tech: ['Python', 'Multi-Agent Systems', 'AI'],
    github: 'https://github.com/dsainvg/auction_agents',
  },
  {
    title: 'TMRM',
    description:
      'An intelligent threat monitoring and risk management platform for real-time security analysis and threat detection.',
    tech: ['Python', 'Machine Learning', 'Security'],
    github: 'https://github.com/dsainvg/TMRM',
  },
  {
    title: 'Circuit Diagram Generator',
    description:
      'Automated circuit diagram generation tool that converts textual descriptions into visual circuit schematics.',
    tech: ['Python', 'Computer Vision', 'Automation'],
    github: 'https://github.com/dsainvg/circuit_diagram_generator',
  },
];

const GitHubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      fill="currentColor"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginLeft: '6px', transition: 'transform 0.3s ease' }}
  >
    <path
      d="M7 17L17 7M17 7H7M17 7V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredGithub, setHoveredGithub] = useState<number | null>(null);
  const [viewAllHovered, setViewAllHovered] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) {
              setTimeout(() => {
                setVisibleCards((prev) => new Set([...prev, index]));
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: '120px 24px',
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '72px',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: '#f8fafc',
            letterSpacing: '-0.03em',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Featured Projects
        </h2>
        <div
          style={{
            width: '64px',
            height: '3px',
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)',
            margin: '20px auto 0',
            borderRadius: '999px',
          }}
        />
        <p
          style={{
            color: '#94a3b8',
            fontSize: '1.05rem',
            marginTop: '16px',
            maxWidth: '520px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.7,
          }}
        >
          A selection of projects I&apos;ve built — exploring cryptography, AI agents,
          security, and automation.
        </p>
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '28px',
        }}
      >
        {projects.map((project, index) => {
          const isVisible = visibleCards.has(index);
          const isHovered = hoveredCard === index;
          const isGithubHovered = hoveredGithub === index;

          return (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: 'rgba(17, 17, 24, 0.7)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${
                  isHovered ? 'rgba(99, 102, 241, 0.35)' : 'rgba(255, 255, 255, 0.08)'
                }`,
                borderRadius: '16px',
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition:
                  'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease, box-shadow 0.4s ease, opacity 0.6s ease',
                transform: isVisible
                  ? isHovered
                    ? 'translateY(-5px)'
                    : 'translateY(0)'
                  : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                boxShadow: isHovered
                  ? '0 8px 32px rgba(99, 102, 241, 0.12), 0 0 0 1px rgba(99, 102, 241, 0.1)'
                  : '0 4px 16px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Subtle corner glow on hover */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '200px',
                  height: '200px',
                  background:
                    'radial-gradient(circle at top right, rgba(99, 102, 241, 0.08), transparent 70%)',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                  pointerEvents: 'none',
                }}
              />

              {/* Project Number */}
              <span
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '24px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'rgba(99, 102, 241, 0.35)',
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                  userSelect: 'none',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Project Title */}
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  margin: '0 0 14px 0',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                  backgroundImage: isHovered
                    ? 'linear-gradient(135deg, #f8fafc, #a78bfa)'
                    : 'linear-gradient(135deg, #f8fafc, #f8fafc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transition: 'background 0.3s ease',
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  color: '#94a3b8',
                  fontSize: '0.935rem',
                  lineHeight: 1.75,
                  margin: '0 0 22px 0',
                }}
              >
                {project.description}
              </p>

              {/* Tech Tags */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '24px',
                }}
              >
                {project.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: '#a78bfa',
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.15)',
                      borderRadius: '999px',
                      padding: '4px 14px',
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* GitHub Link */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredGithub(index)}
                onMouseLeave={() => setHoveredGithub(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: isGithubHovered ? '#a78bfa' : '#94a3b8',
                  textDecoration: 'none',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  background: isGithubHovered
                    ? 'rgba(99, 102, 241, 0.12)'
                    : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${
                    isGithubHovered
                      ? 'rgba(99, 102, 241, 0.3)'
                      : 'rgba(255, 255, 255, 0.08)'
                  }`,
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.01em',
                }}
              >
                <GitHubIcon />
                View Source
                <ArrowIcon />
              </a>
            </div>
          );
        })}
      </div>

      {/* View All on GitHub */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '56px',
        }}
      >
        <a
          href="https://github.com/dsainvg"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setViewAllHovered(true)}
          onMouseLeave={() => setViewAllHovered(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.95rem',
            fontWeight: 500,
            color: viewAllHovered ? '#a78bfa' : '#94a3b8',
            textDecoration: 'none',
            padding: '10px 24px',
            borderRadius: '12px',
            background: viewAllHovered
              ? 'rgba(99, 102, 241, 0.08)'
              : 'transparent',
            border: `1px solid ${
              viewAllHovered
                ? 'rgba(99, 102, 241, 0.25)'
                : 'rgba(255, 255, 255, 0.06)'
            }`,
            transition: 'all 0.35s ease',
            letterSpacing: '0.01em',
          }}
        >
          <GitHubIcon />
          View All on GitHub
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: viewAllHovered ? 'translateX(3px)' : 'translateX(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
