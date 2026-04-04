import axios from 'axios';

const API = axios.create({
  // Localhost hata kar apna Render wala link daalein (Dhyan se /api zarur lagayein)
  baseURL: 'https://edutrack-api-8t5g.onrender.com/api', 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;