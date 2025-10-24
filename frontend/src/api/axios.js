import axios from "axios";

const isProd = import.meta.env.VITE_NODE_ENV === 'production';
const base = import.meta.env.VITE_API_BASE || (isProd ? '/api' : 'http://localhost:5000/api');

const API = axios.create({
  baseURL: base,
  timeout: isProd ? 30000 : 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
