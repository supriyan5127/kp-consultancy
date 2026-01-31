import React, { useState } from 'react';
import SecureSpotModal from './SecureSpotModal';

const Internships = () => {
  const [selectedInternship, setSelectedInternship] = useState(null);

  const interns = [
    { title: "Software Development Intern", img: "images/intern1.png" },
    { title: "Data Analyst Intern", img: "images/intern2.png" },
    { title: "UI/UX Design Intern", img: "images/intern3.png" },
    { title: "Marketing Intern", img: "images/intern4.png" },
    { title: "Cloud Engineering Intern", img: "images/intern5.png" },
    { title: "QA Testing Intern", img: "images/intern6.png" }
  ];

  const handleApply = (intern) => {
    setSelectedInternship({
      title: intern.title,
      price: 'Internship Application' // Or some other label since it's an internship
    });
  };

  const handleCloseModal = () => {
    setSelectedInternship(null);
  };

  return (
    <section id="internships" className="section dark-alt">
      <h2 className="section-heading">Professional <span>Internships</span></h2>
      <div className="grid-container">
        {interns.map((intern, index) => (
          <div key={index} className="cyber-card">
            <div className="card-img-wrapper">
              <img
                src={intern.img}
                alt={intern.title}
                className="card-img"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600"; }}
              />
            </div>
            <div className="card-content">
              <h3>{intern.title}</h3>
              <p>Work on real-world projects and gain high-impact employment.</p>
              <button
                className="apply-btn"
                onClick={() => handleApply(intern)}
              >
                APPLY NOW
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedInternship && (
        <SecureSpotModal
          course={selectedInternship}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Internships;