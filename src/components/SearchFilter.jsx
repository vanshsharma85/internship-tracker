import React from 'react';
import { getUniqueCompanies } from '../utils/filters.js';
import { STATUS_OPTIONS } from '../utils/constants.js';

const SearchFilter = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus, filterCompany, setFilterCompany, internships }) => {
  const companies = getUniqueCompanies(internships);

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Search by company, job title, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '14px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600', fontSize: '14px' }}>Status</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', background: 'white' }}>
            <option value="All">All Status</option>
            {STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600', fontSize: '14px' }}>Company</label>
          <select value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', background: 'white' }}>
            <option value="All">All Companies</option>
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;