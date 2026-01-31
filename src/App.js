import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';
import Courses from './components/Courses';
import Internships from './components/Internships';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';

function App() {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if admin is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdminUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAdminLoginSuccess = (user) => {
    setAdminUser(user);
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#050505',
        color: 'white'
      }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={
          adminUser ? (
            <AdminPanel user={adminUser} onLogout={handleAdminLogout} />
          ) : (
            <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />
          )
        } />

        {/* Main Website */}
        <Route path="/*" element={
          <div className="app-wrapper">
            <nav className="navbar">
              <h2 className="glow-title">KP-<span>CONSULTANCY</span></h2>
              <div className="nav-links">
                <a href="#home">Home</a>
                <a href="#courses">Courses</a>
                <a href="#internships">Internships</a>
                <a href="#contact">Contact</a>
                <Link to="/admin" className="admin-link">Admin</Link>
              </div>
            </nav>

            <header id="home" className="hero-section">
              <h1 className="hero-title">Elevate Your Career <br/> With <span>Industry Expertise</span></h1>
              <p className="hero-subtitle">Join over 10,000 students mastering the future of technology through our certified paths.</p>
              
              <div className="stats-container">
                <div className="stat-card"><h2>10K+</h2><p>Students</p></div>
                <div className="stat-card"><h2>50+</h2><p>Courses</p></div>
                <div className="stat-card"><h2>500+</h2><p>Certificates</p></div>
                <div className="stat-card"><h2>100+</h2><p>Partners</p></div>
              </div>
            </header>

            <Courses />
            <Internships />
            <Contact />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;