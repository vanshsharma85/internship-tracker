import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInternships } from '../context/InternshipContext.jsx';
import { STATUS_OPTIONS } from '../utils/constants.js';

const AddInternshipPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addInternship, editInternship, internships } = useInternships();
  
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    location: '',
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Applied',
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      const internship = internships.find(item => item.id === parseInt(id));
      if (internship) {
        setFormData(internship);
        setIsEditing(true);
      }
    }
  }, [id, internships]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await editInternship(parseInt(id), formData);
      } else {
        await addInternship(formData);
      }
      navigate('/internships');
    } catch (err) {
      console.error('Error saving internship:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', color: '#333' }}>{isEditing ? '✏️ Edit Internship' : '➕ Add Internship'}</h1>
        <button onClick={() => navigate('/internships')} style={{ padding: '10px 20px', background: '#f5f5f5', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Company Name *</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }} placeholder="Enter company name" required />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Job Title *</label>
          <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }} placeholder="Enter job title" required />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Location *</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }} placeholder="e.g., San Francisco, CA" required />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Applied Date *</label>
          <input type="date" name="appliedDate" value={formData.appliedDate} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }} required />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Status *</label>
          <select name="status" value={formData.status} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', background: 'white' }}>
            {STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', resize: 'vertical' }} placeholder="Add any notes..." rows="4" />
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button type="button" onClick={() => navigate('/internships')} style={{ padding: '12px 24px', background: '#f5f5f5', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
            Cancel
          </button>
          <button type="submit" style={{ padding: '12px 24px', background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '600' }} disabled={loading}>
            {loading ? 'Saving...' : isEditing ? 'Update' : 'Add'} Internship
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInternshipPage;