'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [buttonHovered, setButtonHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '14px 18px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: focusedField === field ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    color: '#f8fafc',
    fontSize: '15px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border 0.3s ease, box-shadow 0.3s ease',
    boxShadow: focusedField === field ? '0 0 20px rgba(99,102,241,0.15)' : 'none',
    boxSizing: 'border-box' as const,
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#94a3b8',
    letterSpacing: '0.3px',
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/dsainvg',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/durga-sai-gundubogula/',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: '120px 24px',
        backgroundColor: '#0a0a0f',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section Title */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '72px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 44px)',
              fontWeight: 700,
              color: '#f8fafc',
              margin: '0 0 16px 0',
              letterSpacing: '-0.5px',
            }}
          >
            Get In Touch
          </h2>
          <div
            style={{
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              margin: '0 auto',
              borderRadius: '2px',
            }}
          />
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          {/* Left Column - Text & Socials */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            <h3
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#f8fafc',
                margin: '0 0 20px 0',
                letterSpacing: '-0.3px',
              }}
            >
              Let&apos;s work together
            </h3>
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.75,
                color: '#94a3b8',
                margin: '0 0 40px 0',
                maxWidth: '440px',
              }}
            >
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(link.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    color: hoveredSocial === link.name ? '#6366f1' : '#94a3b8',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 500,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>

            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#94a3b8', fontSize: '15px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Kharagpur, West Bengal, India</span>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
            }}
          >
            <div
              style={{
                background: 'rgba(17,17,24,0.7)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '40px',
              }}
            >
              {submitted ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '48px 0',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px auto',
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: '#f8fafc',
                      margin: '0 0 12px 0',
                    }}
                  >
                    Thank you!
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '15px', margin: 0 }}>
                    Your message has been received. I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label htmlFor="name" style={labelStyle}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your name"
                      style={inputStyle('name')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" style={labelStyle}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="your@email.com"
                      style={inputStyle('email')}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" style={labelStyle}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project..."
                      style={{
                        ...inputStyle('message'),
                        resize: 'vertical',
                        minHeight: '120px',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => setButtonHovered(true)}
                    onMouseLeave={() => setButtonHovered(false)}
                    style={{
                      width: '100%',
                      padding: '16px 32px',
                      background: buttonHovered
                        ? 'linear-gradient(135deg, #818cf8, #a78bfa)'
                        : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, box-shadow 0.3s ease',
                      transform: buttonHovered ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: buttonHovered
                        ? '0 8px 30px rgba(99,102,241,0.4)'
                        : '0 4px 15px rgba(99,102,241,0.25)',
                      letterSpacing: '0.3px',
                      fontFamily: 'inherit',
                    }}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Global placeholder color override */}
      <style>{`
        #contact input::placeholder,
        #contact textarea::placeholder {
          color: rgba(148, 163, 184, 0.4);
        }
      `}</style>
    </section>
  );
};

export default Contact;
