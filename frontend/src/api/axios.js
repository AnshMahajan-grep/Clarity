import axios from "axios";

// Use Vite env var VITE_API_BASE (exposed as import.meta.env) if provided, otherwise default to localhost.
const base = import.meta.env?.VITE_API_BASE || "http://localhost:5000/api";

const API = axios.create({
  baseURL: base,
  timeout: 15000,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
