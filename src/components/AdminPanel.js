import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import '../styles/AdminPanel.css';

function AdminPanel({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    category: '',
    image: ''
  });

  // Fetch data from Firestore
  useEffect(() => {
    fetchCourses();
    fetchInternships();
  }, []);

  const fetchCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchInternships = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'internships'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInternships(data);
    } catch (error) {
      console.error('Error fetching internships:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      duration: '',
      price: '',
      category: '',
      image: ''
    });
    setEditingId(null);
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId && activeTab === 'courses') {
        const courseDoc = doc(db, 'courses', editingId);
        await updateDoc(courseDoc, formData);
        alert('Course updated successfully!');
      } else if (editingId && activeTab === 'internships') {
        const internshipDoc = doc(db, 'internships', editingId);
        await updateDoc(internshipDoc, formData);
        alert('Internship updated successfully!');
      } else {
        const collectionName = activeTab === 'courses' ? 'courses' : 'internships';
        await addDoc(collection(db, collectionName), {
          ...formData,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        alert(`${activeTab} added successfully!`);
      }

      resetForm();
      if (activeTab === 'courses') fetchCourses();
      else fetchInternships();
    } catch (error) {
      alert('Error saving data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Delete this ${activeTab.slice(0, -1)}?`)) {
      try {
        await deleteDoc(doc(db, activeTab, id));
        alert('Deleted successfully!');
        if (activeTab === 'courses') fetchCourses();
        else fetchInternships();
      } catch (error) {
        alert('Error deleting: ' + error.message);
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      duration: item.duration || '',
      price: item.price || '',
      category: item.category || '',
      image: item.image || ''
    });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const items = activeTab === 'courses' ? courses : internships;

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>🎯 Admin Dashboard</h1>
          <div className="admin-user-info">
            <a href="/" className="home-link" style={{
              color: 'white',
              textDecoration: 'none',
              marginRight: '20px',
              fontSize: '1rem',
              fontWeight: '500'
            }}>🏠 Back to Home</a>
            <span>Welcome, {user.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <div className="admin-container">
        <nav className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => { setActiveTab('courses'); resetForm(); }}
          >
            📚 Courses ({courses.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'internships' ? 'active' : ''}`}
            onClick={() => { setActiveTab('internships'); resetForm(); }}
          >
            💼 Internships ({internships.length})
          </button>
        </nav>

        <div className="admin-content">
          {/* Form Section */}
          <section className="form-section">
            <h2>{editingId ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}</h2>
            <form onSubmit={handleAddCourse} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter title"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g., Web Development"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 8 weeks"
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., $299"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  placeholder="Enter detailed description"
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* Items List Section */}
          <section className="items-section">
            <h2>All {activeTab}</h2>
            <div className="items-grid">
              {items.length === 0 ? (
                <p className="no-items">No {activeTab} found. Add one to get started!</p>
              ) : (
                items.map(item => (
                  <div key={item.id} className="admin-item-card">
                    {item.image && (
                      <div className="item-image">
                        <img src={item.image} alt={item.title} />
                      </div>
                    )}
                    <div className="item-content">
                      <h3>{item.title}</h3>
                      {item.category && <p className="category">{item.category}</p>}
                      <p className="description">{item.description.substring(0, 100)}...</p>
                      <div className="item-meta">
                        {item.duration && <span>⏱️ {item.duration}</span>}
                        {item.price && <span>💰 {item.price}</span>}
                      </div>
                    </div>
                    <div className="item-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
