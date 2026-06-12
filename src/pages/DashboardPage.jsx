import React from 'react';
import { Link } from 'react-router-dom';
import { useInternships } from '../context/InternshipContext.jsx';
import DashboardCards from '../components/DashboardCards.jsx';
import DashboardCharts from '../components/DashboardCharts.jsx';

const DashboardPage = () => {
  const { internships, loading } = useInternships();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', color: '#333' }}>📊 Dashboard</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link 
            to="/job-search" 
            style={{ 
              background: '#667eea', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              textDecoration: 'none', 
              fontWeight: '600' 
            }}
          >
            🔍 Find Internships
          </Link>
          <Link 
            to="/internships/add" 
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              textDecoration: 'none', 
              fontWeight: '600' 
            }}
          >
            + Add Internship
          </Link>
        </div>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>Loading...</div>
      ) : (
        <>
          <DashboardCards internships={internships} />
          <DashboardCharts internships={internships} />
        </>
      )}
    </div>
  );
};

export default DashboardPage;