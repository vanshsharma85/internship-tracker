import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import InternshipsPage from './pages/InternshipsPage.jsx';
import AddInternshipPage from './pages/AddInternshipPage.jsx';
import JobSearch from './components/JobSearch.jsx';
import { useAuth } from './context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/job-search" element={
          <ProtectedRoute><JobSearch /></ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardPage /></ProtectedRoute>
        } />
        <Route path="/internships" element={
          <ProtectedRoute><InternshipsPage /></ProtectedRoute>
        } />
        <Route path="/internships/add" element={
          <ProtectedRoute><AddInternshipPage /></ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;