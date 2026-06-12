import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// GET: Fetch Internships from MongoDB
export const getInternships = async () => {
  try {
    const response = await api.get('/internships');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch internships');
  }
};

// POST: Create Internship
export const createInternship = async (internshipData) => {
  try {
    // Generate ID if not present
    const data = {
      ...internshipData,
      id: internshipData.id || Date.now()
    };
    const response = await api.post('/internships', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create internship');
  }
};

// PUT: Update Internship
export const updateInternship = async (id, updatedData) => {
  try {
    const response = await api.put(`/internships/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update internship');
  }
};

// DELETE: Remove Internship
export const deleteInternship = async (id) => {
  try {
    await api.delete(`/internships/${id}`);
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete internship');
  }
};

export default api;