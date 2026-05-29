'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SkillCategory {
  icon: string;
  name: string;
  skills: string[];
  accentColor: string;
}

const skillCategories: SkillCategory[] = [
  {
    icon: '⟨/⟩',
    name: 'Languages',
    skills: ['Python', 'C++', 'JavaScript', 'TypeScript'],
    accentColor: '#6366f1',
  },
  {
    icon: '◈',
    name: 'Frontend',
    skills: ['React.js', 'Next.js', 'HTML/CSS'],
    accentColor: '#8b5cf6',
  },
  {
    icon: '◎',
    name: 'AI / ML',
    skills: ['Machine Learning', 'Deep Learning', 'Artificial Neural Networks'],
    accentColor: '#06b6d4',
  },
  {
    icon: '⚙',
    name: 'Tools & Tech',
    skills: ['Git', 'Web3.0', 'Node.js'],
    accentColor: '#6366f1',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredChip, setHoveredChip] = useState<string | null>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          titleObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) {
              setTimeout(() => {
                setVisibleCards((prev) => new Set(prev).add(index));
              }, index * 150);
              cardObserver.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref);
    });

    return () => {
      titleObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  const sectionStyle: React.CSSProperties = {
    minHeight: '100vh',
    padding: '120px 24px 80px',
    background: '#0a0a0f',
    position: 'relative',
    overflow: 'hidden',
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '960px',
    margin: '0 auto',
  };

  const titleWrapperStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '64px',
    opacity: titleVisible ? 1 : 0,
    transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
    fontWeight: 700,
    color: '#f8fafc',
    margin: 0,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  };

  const underlineStyle: React.CSSProperties = {
    width: '80px',
    height: '3px',
    margin: '16px auto 0',
    borderRadius: '4px',
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    const isHovered = hoveredCard === index;
    const isVisible = visibleCards.has(index);
    const cat = skillCategories[index];

    return {
      background: 'rgba(17, 17, 24, 0.7)',
      border: `1px solid ${isHovered ? cat.accentColor + '44' : 'rgba(255, 255, 255, 0.08)'}`,
      borderRadius: '16px',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      padding: '32px 28px',
      cursor: 'default',
      transition:
        'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.35s ease, box-shadow 0.35s ease, opacity 0.6s ease, translate 0.6s ease',
      transform: isHovered ? 'scale(1.03)' : 'scale(1)',
      boxShadow: isHovered
        ? `0 0 30px ${cat.accentColor}18, 0 8px 32px rgba(0,0,0,0.3)`
        : '0 4px 20px rgba(0,0,0,0.2)',
      opacity: isVisible ? 1 : 0,
      translate: isVisible ? '0 0' : '0 40px',
    };
  };

  const iconContainerStyle = (index: number): React.CSSProperties => {
    const cat = skillCategories[index];
    return {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: `linear-gradient(135deg, ${cat.accentColor}22, ${cat.accentColor}08)`,
      border: `1px solid ${cat.accentColor}30`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      marginBottom: '20px',
      color: cat.accentColor,
      fontWeight: 700,
    };
  };

  const categoryNameStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#f8fafc',
    margin: '0 0 18px 0',
    letterSpacing: '-0.01em',
  };

  const chipsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  };

  const getChipStyle = (
    skill: string,
    categoryIndex: number
  ): React.CSSProperties => {
    const cat = skillCategories[categoryIndex];
    const isHovered = hoveredChip === `${categoryIndex}-${skill}`;

    return {
      padding: '6px 16px',
      borderRadius: '9999px',
      fontSize: '0.82rem',
      fontWeight: 500,
      color: isHovered ? '#f8fafc' : '#94a3b8',
      background: isHovered ? `${cat.accentColor}1a` : 'rgba(255, 255, 255, 0.04)',
      border: `1px solid ${isHovered ? cat.accentColor + '55' : 'rgba(255, 255, 255, 0.07)'}`,
      transition: 'all 0.3s ease',
      cursor: 'default',
      boxShadow: isHovered ? `0 0 16px ${cat.accentColor}25` : 'none',
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
    };
  };

  // Inject responsive CSS via a style tag
  const responsiveCSS = `
    @media (max-width: 640px) {
      .skills-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;

  return (
    <section id="skills" ref={sectionRef} style={sectionStyle}>
      <style>{responsiveCSS}</style>
      <div style={containerStyle}>
        <div ref={titleRef} style={titleWrapperStyle}>
          <h2 style={titleStyle}>Skills &amp; Technologies</h2>
          <div style={underlineStyle} />
        </div>

        <div className="skills-grid" style={gridStyle}>
          {skillCategories.map((category, index) => (
            <div
              key={category.name}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={getCardStyle(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={iconContainerStyle(index)}>{category.icon}</div>
              <h3 style={categoryNameStyle}>{category.name}</h3>
              <div style={chipsContainerStyle}>
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    style={getChipStyle(skill, index)}
                    onMouseEnter={() => setHoveredChip(`${index}-${skill}`)}
                    onMouseLeave={() => setHoveredChip(null)}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
