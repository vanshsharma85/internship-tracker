import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInternships } from '../context/InternshipContext.jsx';
import SearchFilter from '../components/SearchFilter.jsx';
import InternshipList from '../components/InternshipList.jsx';

const InternshipsPage = () => {
  const { internships, loading, removeInternship } = useInternships();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCompany, setFilterCompany] = useState('All');

  const filteredInternships = internships.filter(item => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (!item.companyName.toLowerCase().includes(term) && 
          !item.jobTitle.toLowerCase().includes(term) && 
          !item.location.toLowerCase().includes(term)) return false;
    }
    if (filterStatus !== 'All' && item.status !== filterStatus) return false;
    if (filterCompany !== 'All' && item.companyName !== filterCompany) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', color: '#333' }}>📋 Internship Applications</h1>
        <Link to="/internships/add" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
          + Add New
        </Link>
      </header>

      <SearchFilter 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        filterCompany={filterCompany} setFilterCompany={setFilterCompany}
        internships={internships}
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>Loading...</div>
      ) : filteredInternships.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <p>No internships found</p>
          <Link to="/internships/add" style={{ display: 'inline-block', marginTop: '16px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
            Add your first internship
          </Link>
        </div>
      ) : (
        <InternshipList internships={filteredInternships} onDelete={removeInternship} />
      )}
    </div>
  );
};

export default InternshipsPage;