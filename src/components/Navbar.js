import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Courses', href: '#courses' },
    { label: 'Internships', href: '#internships' },
    { label: 'Features', href: '#features' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <div className="logo-wrapper">
              <span className="logo-k">K</span>
              <span className="logo-p">P</span>
              <div className="logo-glow"></div>
            </div>
            <span className="brand-text">CONSULTANCY</span>
          </div>

          <div className={`nav-links ${mobileMenu ? 'active' : ''}`}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                onClick={() => setMobileMenu(false)}
              >
                <span className="link-text">{item.label}</span>
                <span className="link-underline"></span>
              </a>
            ))}
          </div>

          <button className="cta-button glow-button">
            <span className="button-text">Get Started</span>
            <span className="button-glow"></span>
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <div className={`hamburger ${mobileMenu ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Backdrop */}
      {mobileMenu && (
        <div className="mobile-backdrop" onClick={() => setMobileMenu(false)} />
      )}
    </>
  );
};

export default Navbar;