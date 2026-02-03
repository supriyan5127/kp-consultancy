import React, { useState } from 'react';
import { db } from '../firebase'; // Ensure this file exists in src/
import { collection, addDoc } from "firebase/firestore";

const ApplyModal = ({ isOpen, onClose, courseTitle }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric
    if (value.length <= 10) {
      setFormData({ ...formData, phone: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      // 1. Save to Firebase Firestore
      await addDoc(collection(db, "applications"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        appliedFor: courseTitle,
        date: new Date().toISOString()
      });

      alert(`Success! Application for ${courseTitle} submitted. We will contact you at ${formData.phone}.`);
      onClose(); // This closes the modal after success
    } catch (error) {
      console.error("Error submitting application: ", error);
      alert("Submission failed. Check your Firebase connection.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2 className="glow-text">Apply for <span>{courseTitle}</span></h2>
        <form onSubmit={handleSubmit} className="cyber-form">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone Number (10 digits)"
            required
            value={formData.phone}
            onChange={handlePhoneChange}
          />
          <button type="submit" className="form-submit-glow">SUBMIT APPLICATION</button>
        </form>
      </div>
    </div>
  );
};

// This line fixes the "module has no exports" error
export default ApplyModal;