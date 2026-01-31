import React, { useState } from 'react';
import SecureSpotModal from './SecureSpotModal';

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      title: "Full Stack Development",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
      price: "$599",
      duration: "12 weeks"
    },
    {
      title: "Data Science & AI",
      img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500",
      price: "$699",
      duration: "14 weeks"
    },
    {
      title: "Cybersecurity",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500",
      price: "$799",
      duration: "16 weeks"
    },
    {
      title: "Cloud Computing",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
      price: "$549",
      duration: "10 weeks"
    },
    {
      title: "Mobile App Development",
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500",
      price: "$649",
      duration: "12 weeks"
    },
    {
      title: "Digital Marketing",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
      price: "$449",
      duration: "8 weeks"
    }
  ];

  const handleSecureSpotClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <section id="courses" className="section">
      <h2 className="section-heading">Expert <span>Courses</span></h2>
      <div className="grid-container">
        {courses.map((course, index) => (
          <div key={index} className="cyber-card">
            <div className="card-img-wrapper">
              <img src={course.img} alt={course.title} className="card-img" />
            </div>
            <div className="card-content">
              <h3>{course.title}</h3>
              <p className="course-meta">💰 {course.price} | ⏱️ {course.duration}</p>
              <p>Master industry-level skills with our 2026 certified paths.</p>

              <button
                className="apply-btn"
                onClick={() => handleSecureSpotClick(course)}
              >
                SECURE MY SPOT
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedCourse && (
        <SecureSpotModal
          course={selectedCourse}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Courses;