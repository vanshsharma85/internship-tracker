import React, { useState } from 'react';
import { fetchCompanies, fetchJobs, addJobToTracker } from '../services/jobApi.js';
import { useInternships } from '../context/InternshipContext.jsx';

const JobSearch = () => {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  
  // Loading States
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(false);
  
  // Error States
  const [companiesError, setCompaniesError] = useState(null);
  const [jobsError, setJobsError] = useState(null);
  
  const { addInternship } = useInternships();

  // GET 1: Fetch Companies
  const fetchCompanyJobs = async () => {
    setCompaniesLoading(true);
    setCompaniesError(null);

    try {
      const result = await fetchCompanies();
      
      if (result.success) {
        setCompanies(result.data);
      } else {
        setCompaniesError(result.message);
      }
    } catch (err) {
      setCompaniesError(err.message);
    } finally {
      setCompaniesLoading(false);
    }
  };

  // GET 2: Fetch Jobs ← THIS IS THE FUNCTION YOU ASKED ABOUT
  const fetchPlaceholderJobs = async () => {
    setJobsLoading(true);  // ← Loading State
    setJobsError(null);

    try {
      const result = await fetchJobs();  // ← GET Request
      
      if (result.success) {
        setJobs(result.data);  // ← Display data
      } else {
        setJobsError(result.message);
      }
    } catch (err) {
      setJobsError(err.message);
    } finally {
      setJobsLoading(false);  // ← End Loading
    }
  };

  // POST: Add to Tracker
  const addToTracker = async (job) => {
    try {
      const result = await addJobToTracker(job);
      
      if (result.success) {
        await addInternship(result.data);
        alert(`✅ ${job.jobTitle} added to your tracker!`);
      }
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '32px', color: '#333', marginBottom: '10px' }}>
        🔍 Find Internships
      </h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Search real job listings from public APIs
      </p>

      {/* Section 1: Companies from DummyJSON */}
      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        padding: '24px', 
        marginBottom: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#333' }}>🏢 Companies (DummyJSON)</h2>
          <button 
            onClick={fetchCompanyJobs}
            disabled={companiesLoading}
            style={{
              padding: '12px 24px',
              background: companiesLoading ? '#ccc' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600'
            }}
          >
            {companiesLoading ? '⏳ Loading...' : '📥 Fetch Companies'}
          </button>
        </div>

        {companiesLoading && (
          <div style={{ padding: '15px', background: '#e3f2fd', color: '#1976d2', borderRadius: '8px', textAlign: 'center' }}>
            ⏳ Loading company jobs...
          </div>
        )}

        {companiesError && (
          <div style={{ padding: '15px', background: '#ffebee', color: '#c00', borderRadius: '8px' }}>
            ❌ {companiesError}
          </div>
        )}

        {companies.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {companies.map((company) => (
              <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
                <h3 style={{ color: '#333' }}>{company.name}</h3>
                <p style={{ color: '#667eea', fontWeight: '600' }}>{company.jobTitle}</p>
                <p style={{ color: '#666' }}>💰 ${company.salary}/month</p>
                <button 
                  onClick={() => addToTracker(company)}
                  style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600'
                  }}
                >
                  ➕ Add to Tracker
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: Jobs from JSONPlaceholder */}
      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        padding: '24px', 
        marginBottom: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#333' }}>📋 Jobs (JSONPlaceholder)</h2>
          <button 
            onClick={fetchPlaceholderJobs}
            disabled={jobsLoading}
            style={{
              padding: '12px 24px',
              background: jobsLoading ? '#ccc' : '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600'
            }}
          >
            {jobsLoading ? '⏳ Loading...' : '📥 Fetch Jobs'}
          </button>
        </div>

        {jobsLoading && (
          <div style={{ padding: '15px', background: '#e3f2fd', color: '#1976d2', borderRadius: '8px', textAlign: 'center' }}>
            ⏳ Loading job listings...
          </div>
        )}

        {jobsError && (
          <div style={{ padding: '15px', background: '#ffebee', color: '#c00', borderRadius: '8px' }}>
            ❌ {jobsError}
          </div>
        )}

        {jobs.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {jobs.map((job) => (
              <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
                <h3 style={{ color: '#333' }}>{job.jobTitle}</h3>
                <p style={{ color: '#8b5cf6', fontWeight: '600' }}>{job.company}</p>
                <p style={{ color: '#666' }}>📍 {job.location}</p>
                <button 
                  onClick={() => addToTracker(job)}
                  style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    background: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600'
                  }}
                >
                  ➕ Add to Tracker
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearch;