'use client';

import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/dsainvg',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/durga-sai-gundubogula/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      style={{
        backgroundColor: '#0a0a0f',
        position: 'relative',
        padding: '48px 24px 36px',
      }}
    >
      {/* Gradient top border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          maxWidth: '600px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)',
        }}
      />

      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* Attribution */}
        <p
          style={{
            fontSize: '15px',
            color: '#94a3b8',
            margin: 0,
            fontWeight: 400,
            letterSpacing: '0.2px',
          }}
        >
          Designed &amp; Built by{' '}
          <span
            style={{
              backgroundImage: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600,
            }}
          >
            Durga Sai
          </span>
        </p>

        {/* Social Icons */}
        <div style={{ display: 'flex', gap: '20px' }}>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor:
                  hoveredLink === link.name ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.03)',
                color: hoveredLink === link.name ? '#6366f1' : '#64748b',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                transform: hoveredLink === link.name ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: '13px',
            color: '#64748b',
            margin: 0,
            letterSpacing: '0.3px',
          }}
        >
          © 2025 Durga Sai. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
