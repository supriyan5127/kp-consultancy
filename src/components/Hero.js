import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef();
  const particlesRef = useRef([]);

  useEffect(() => {
    // Create floating particles
    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: linear-gradient(45deg, #00d2ff, #8a2be2);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.3 + 0.1};
        animation: float ${Math.random() * 20 + 10}s infinite linear;
        animation-delay: ${Math.random() * 5}s;
      `;
      heroRef.current.appendChild(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">🚀 ELITE CAREER ACCELERATOR</span>
            <div className="badge-glow"></div>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">Transform Your</span>
            <span className="title-gradient">Professional Journey</span>
            <span className="title-line">with Expert Guidance</span>
          </h1>
          
          <p className="hero-description">
            Join thousands of professionals who have accelerated their careers with our 
            industry-leading courses and internship programs. Get hands-on experience 
            with cutting-edge technologies and real-world projects.
          </p>
          
          <div className="hero-actions">
            <button className="hero-button primary">
              <span>Start Learning Free</span>
              <svg className="button-icon" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" strokeWidth="2"/>
              </svg>
            </button>
            <button className="hero-button secondary">
              <span>Book Consultation</span>
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number" data-count="10000">10,000+</div>
              <div className="stat-label">Successful Students</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number" data-count="98">98%</div>
              <div className="stat-label">Placement Rate</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number" data-count="500">500+</div>
              <div className="stat-label">Industry Partners</div>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="visual-container">
            <div className="floating-card card-1">
              <div className="card-content">
                <div className="card-icon">💼</div>
                <h4>Industry Ready</h4>
                <p>Real-world projects</p>
              </div>
            </div>
            <div className="floating-card card-2">
              <div className="card-content">
                <div className="card-icon">🎯</div>
                <h4>Mentorship</h4>
                <p>Expert guidance</p>
              </div>
            </div>
            <div className="floating-card card-3">
              <div className="card-content">
                <div className="card-icon">📈</div>
                <h4>Career Growth</h4>
                <p>95% success rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;