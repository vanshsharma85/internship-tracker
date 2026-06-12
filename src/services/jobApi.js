import axios from 'axios';

const DUMMY_JSON = 'https://dummyjson.com';
const JSON_PLACEHOLDER = 'https://jsonplaceholder.typicode.com';

const jobApi = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// GET 1: Fetch Companies from DummyJSON
export const fetchCompanies = async () => {
  try {
    const response = await jobApi.get(`${DUMMY_JSON}/products?limit=10`);
    
    const companies = response.data.products.map(product => ({
      id: product.id,
      name: product.brand,
      jobTitle: product.title,
      location: 'Remote',
      salary: product.price,
      description: product.description
    }));
    
    return {
      success: true,
      data: companies,
      message: 'Companies fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Failed to fetch companies'
    };
  }
};

// GET 2: Fetch Jobs from JSONPlaceholder
export const fetchJobs = async () => {
  try {
    const response = await jobApi.get(`${JSON_PLACEHOLDER}/posts?limit=10`);
    
    const jobs = response.data.map(post => ({
      id: post.id,
      company: `Company ${post.userId}`,
      jobTitle: post.title,
      location: 'Remote',
      description: post.body,
      type: 'Full-time'
    }));
    
    return {
      success: true,
      data: jobs,
      message: 'Jobs fetched successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Failed to fetch jobs'
    };
  }
};

// POST: Add Job to Tracker
export const addJobToTracker = async (jobData) => {
  try {
    const newInternship = {
      id: Date.now(),
      companyName: jobData.company || jobData.name,
      jobTitle: jobData.jobTitle,
      location: jobData.location || 'Remote',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied',
      notes: jobData.description || 'Added from job search'
    };
    
    // POST to your MongoDB backend
    const response = await axios.post('http://localhost:5000/api/internships', newInternship);
    
    return {
      success: true,
      data: response.data,
      message: 'Job added to tracker successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Failed to add job to tracker'
    };
  }
};

export default jobApi;