import React from 'react';
import { Link } from 'react-router-dom';
import { STATUS_OPTIONS } from '../utils/constants.js';

const InternshipList = ({ internships, onDelete }) => {
  const getStatusColor = (status) => {
    const found = STATUS_OPTIONS.find(opt => opt.value === status);
    return found ? found.color : '#666';
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this internship?')) {
      onDelete(id);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      {internships.map((internship) => (
        <div key={internship.id} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '4px' }}>{internship.companyName}</h3>
              <p style={{ fontSize: '16px', color: '#666' }}>{internship.jobTitle}</p>
            </div>
            <span style={{ padding: '8px 16px', borderRadius: '6px', color: 'white', fontWeight: '600', fontSize: '14px', background: getStatusColor(internship.status) }}>
              {internship.status}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '30px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#666', fontWeight: '600' }}>📍 Location:</span>
              <span>{internship.location}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#666', fontWeight: '600' }}>📅 Applied:</span>
              <span>{internship.appliedDate}</span>
            </div>
          </div>

          {internship.notes && (
            <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
              <span style={{ fontWeight: '600', color: '#666', marginBottom: '4px' }}>📝 Notes:</span>
              <p>{internship.notes}</p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to={`/internships/add?id=${internship.id}`} style={{ padding: '10px 20px', background: '#f5f5f5', color: '#333', border: 'none', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
              Edit
            </Link>
            <button onClick={() => handleDelete(internship.id)} style={{ padding: '10px 20px', background: '#fee', color: '#c00', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InternshipList;