import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/SecureSpotModal.css';

function SecureSpotModal({ course, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Initialize EmailJS with public key
  useEffect(() => {
    // FALLBACK: Use provided key if env var is missing, but prefer env var
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '1oT6ZpFoqM4--a5vr';
    emailjs.init(publicKey);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate course object
      if (!course || !course.title || !course.price) {
        throw new Error('Course information is missing');
      }

      // Send email to admin
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        course_name: course.title || 'Unknown Course',
        course_price: course.price || 'N/A',
        message: formData.message || 'User wants to secure a spot',
        admin_note: `New enrollment request from ${formData.name}`
      };

      console.log('Sending email with params:', templateParams);

      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_kcmkmw8';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'h0erawt';

      console.log(`Using Service ID: ${serviceId}`);
      console.log(`Using Template ID: ${templateId}`);

      // Send via EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );

      console.log('Email sent successfully:', result);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Full Error Object:', err);
      console.error('Error Message:', err.message);
      console.error('Error Status:', err.status);
      console.error('Error Text:', err.text);
      setError(`Failed to send: ${err.text || err.message || 'Please check console for details'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content secure-spot-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        {success ? (
          <div className="success-message animated-success">
            <div className="success-icon-wrapper">
              <div className="success-icon">✅</div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
            </div>
            <h2 className="glow-text">Request Sent Successfully!</h2>
            <p className="success-subtitle">Thank you, {formData.name}!</p>

            <div className="info-card">
              <p className="admin-contact-label">Admin will contact you via:</p>
              <div className="contact-methods">
                <div className="method">
                  <span className="method-icon">📧</span>
                  <span>{formData.email}</span>
                </div>
                <div className="method">
                  <span className="method-icon">📱</span>
                  <span>{formData.phone}</span>
                </div>
              </div>
            </div>

            <p className="closing-msg">Closing in a moment...</p>
          </div>
        ) : (
          <>
            <h2>🎯 Secure Your Spot</h2>
            <p className="course-name">Course: <strong>{course.title}</strong></p>

            <form onSubmit={handleSubmit} className="secure-spot-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Any questions or special requests?"
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Secure My Spot'}
              </button>
            </form>

            <p className="info-text">
              📧 Admin will contact you via email and phone
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SecureSpotModal;
