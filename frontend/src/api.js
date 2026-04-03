import axios from 'axios';


const API = axios.create({
  baseURL: "https://edutrack-api-8t5g.onrender.com" 
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;