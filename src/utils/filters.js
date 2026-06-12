import { STATUS_OPTIONS } from './constants.js';

export const filterByStatus = (internships, status) => {
  if (!status || status === 'All') return internships;
  return internships.filter(item => item.status === status);
};

export const filterByCompany = (internships, company) => {
  if (!company || company === 'All') return internships;
  return internships.filter(item => item.companyName.toLowerCase().includes(company.toLowerCase()));
};

export const searchInternships = (internships, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') return internships;
  const term = searchTerm.toLowerCase();
  return internships.filter(item =>
    item.companyName.toLowerCase().includes(term) ||
    item.jobTitle.toLowerCase().includes(term) ||
    item.location.toLowerCase().includes(term)
  );
};

export const getUniqueCompanies = (internships) => {
  const companies = internships.map(item => item.companyName);
  return [...new Set(companies)].sort();
};

export const getStatusCounts = (internships) => {
  const counts = { Applied: 0, Screening: 0, Interview: 0, Offer: 0, Rejected: 0 };
  internships.forEach(item => {
    if (counts[item.status]) counts[item.status]++;
  });
  return counts;
};