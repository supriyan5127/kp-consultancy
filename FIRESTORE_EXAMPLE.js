// Example: How to Connect Courses.js to Firestore
// Copy this code into your src/components/Courses.js

import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ApplyModal from './ApplyModal';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const coursesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="section">Loading courses...</div>;
  }

  return (
    <section id="courses" className="section">
      <h2 className="section-heading">Our <span>Courses</span></h2>
      <div className="grid-container">
        {courses.length === 0 ? (
          <p>No courses available. Check back soon!</p>
        ) : (
          courses.map(course => (
            <div key={course.id} className="cyber-card">
              {course.image && (
                <div className="card-img-wrapper">
                  <img src={course.image} alt={course.title} className="card-img" />
                </div>
              )}
              <div className="card-content">
                <h3>{course.title}</h3>
                <p className="category">{course.category}</p>
                <p>{course.description}</p>
                <div className="meta-info">
                  {course.duration && <span>⏱️ {course.duration}</span>}
                  {course.price && <span>💰 {course.price}</span>}
                </div>
              </div>
              <button 
                className="apply-btn"
                onClick={() => setSelectedCourse(course)}
              >
                Enroll Now
              </button>
            </div>
          ))
        )}
      </div>
      
      {selectedCourse && (
        <ApplyModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </section>
  );
}

export default Courses;
