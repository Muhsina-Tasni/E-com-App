

// src/api/axiosInstance.js
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:7000";

const instance = axios.create({
  baseURL: API_BASE + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token automatically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
