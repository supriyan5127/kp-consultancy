import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Sending...');

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_kcmkmw8';
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_l45000g';
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '1oT6ZpFoqM4--a5vr';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Admin',
      subject: 'New Contact Message',
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus('Message Sent Successfully! ✅');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send:', error);
      setStatus('Failed to send message. ❌');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <footer id="contact" className="contact-section">
      <div className="contact-container neon-pulse">
        {/* Left Side: Brand & Info */}
        <div className="contact-brand">
          <h2 className="glow-title">KP-<span>CONSULTANCY</span></h2>
          <p className="description">Elite corporate training and career acceleration platform.</p>

          <div className="direct-contact">
            <div className="contact-item blink-blue">
              <span className="icon">✉️</span>
              <p>supriyan5127@gmail.com</p>
            </div>
            <div className="contact-item blink-green">
              <span className="icon">📞</span>
              <p>+91 7396688398</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contact-form-box">
          <h3 className="form-title">Send us a Message</h3>
          <form className="cyber-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="form-submit-glow" disabled={loading}>
              {loading ? 'SENDING...' : 'SEND MESSAGE'}
            </button>

            {status && <p style={{ marginTop: '10px', color: status.includes('Success') ? '#0f0' : '#f00', fontWeight: 'bold' }}>{status}</p>}
          </form>
        </div>
      </div>
      <p className="footer-copyright">© 2026 KP-Consultancy. All rights reserved.</p>
    </footer>
  );
};

export default Contact;