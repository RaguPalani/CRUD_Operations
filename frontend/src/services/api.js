import axios from 'axios';

const API_URL = 'https://crud-operations-backend-dkg7.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }).then(res => res.data),
  
  register: (name, email, password) => 
    api.post('/auth/register', { name, email, password }).then(res => res.data),
  
  getProfile: () => 
    api.get('/users/profile').then(res => res.data.user),
  
  updateProfile: (name) => 
    api.put('/users/profile', { name }).then(res => res.data)
};

export const taskService = {
  getAll: (params = {}) => 
    api.get('/tasks', { params }).then(res => res.data),
  
  getById: (id) => 
    api.get(`/tasks/${id}`).then(res => res.data),
  
  create: (task) => 
    api.post('/tasks', task).then(res => res.data),
  
  update: (id, task) => 
    api.put(`/tasks/${id}`, task).then(res => res.data),
  
  delete: (id) => 
    api.delete(`/tasks/${id}`).then(res => res.data)
};


export default api;
