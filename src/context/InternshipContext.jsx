import React, { createContext, useState, useContext, useEffect } from 'react';
import { getInternships, createInternship, updateInternship, deleteInternship } from '../services/api.js';

const InternshipContext = createContext();

export const useInternships = () => {
  const context = useContext(InternshipContext);
  if (!context) throw new Error('useInternships must be used within InternshipProvider');
  return context;
};

export const InternshipProvider = ({ children }) => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => { loadInternships(); }, []);

  const loadInternships = async () => {
    setLoading(true);
    try {
      const data = await getInternships();
      setInternships(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const addInternship = async (data) => {
    setLoading(true);
    try {
      const newInternship = await createInternship(data);
      setInternships(prev => [...prev, newInternship]);
      return newInternship;
    } catch (err) { setError(err.message); throw err; }
    finally { setLoading(false); }
  };

  const editInternship = async (id, updatedData) => {
    setLoading(true);
    try {
      const updated = await updateInternship(id, updatedData);
      setInternships(prev => prev.map(item => item.id === id ? updated : item));
      return updated;
    } catch (err) { setError(err.message); throw err; }
    finally { setLoading(false); }
  };

  const removeInternship = async (id) => {
    setLoading(true);
    try {
      await deleteInternship(id);
      setInternships(prev => prev.filter(item => item.id !== id));
    } catch (err) { setError(err.message); throw err; }
    finally { setLoading(false); }
  };

  return (
    <InternshipContext.Provider value={{ internships, loading, error, addInternship, editInternship, removeInternship, loadInternships }}>
      {children}
    </InternshipContext.Provider>
  );
};