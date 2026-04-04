import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(console.error('❌ Request Error:', error))
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      console.error('❌ API Error:', status, data);
      switch (status) {
        case 400: console.error('Bad Request:', data.message); break;
        case 401: console.error('Unauthorized - Please log in'); break;
        case 403: console.error('Forbidden - Access denied'); break;
        case 404: console.error('Not Found:', data.message); break;
        case 500: console.error('Server Error - Please try again later'); break;
        default: console.error('API Error:', data.message);
      }
    } else if (error.request) {
      console.error('❌ Network Error: No response received');
    } else {
      console.error('❌ Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ===========================================
// CONTACT API
// ===========================================
export const submitContactForm = async (formData) => {
  try { return (await api.post('/contact', formData)).data; }
  catch (error) { throw error.response?.data || { message: 'Failed to send message' }; }
};

export const getContacts = async (params = {}) => {
  try { return (await api.get('/contact', { params })).data; }
  catch (error) { throw error.response?.data || { message: 'Failed to fetch contacts' }; }
};

// ===========================================
// PROJECTS API
// ===========================================
export const getProjects = async (params = {}) => {
  try { return (await api.get('/projects', { params })).data; }
  catch (error) { throw error.response?.data || { message: 'Failed to fetch projects' }; }
};

export const getFeaturedProjects = async () => {
  try { return (await api.get('/projects/featured')).data; }
  catch (error) { throw error.response?.data || { message: 'Failed to fetch featured projects' }; }
};

export const getProjectById = async (id) => {
  try { return (await api.get(`/projects/${id}`)).data; }
  catch (error) { throw error.response?.data || { message: 'Failed to fetch project' }; }
};

export const getProjectStats = async () => {
  try { return (await api.get('/projects/stats')).data; }
  catch (error) { throw error.response?.data || { message: 'Failed to fetch stats' }; }
};

export const createProject = async (projectData) => {
  try { return (await api.post('/projects', projectData)).data; }
  catch (error) { throw error.response?.data || { message: 'Failed to create project' }; }
};

export const updateProject = async (id, projectData) => {
  try { return (await api.put(`/projects/${id}`, projectData)).data; }
  catch (error) { throw error.response?.data || { message: 'Failed to update project' }; }
};

export const deleteProject = async (id) => {
  try { return (await api.delete(`/projects/${id}`)).data; }
  catch (error) { throw error.response?.data || { message: 'Failed to delete project' }; }
};

// ===========================================
// HEALTH CHECK
// ===========================================
export const checkHealth = async () => {
  try { return (await api.get('/health')).data; }
  catch (error) { throw error.response?.data || { message: 'Server is not responding' }; }
};

export default api;