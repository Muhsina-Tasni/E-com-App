


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7000/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // adjust key if different
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Create cart
export const createCart = async ({ user_id }) => {
  try {
    const res = await API.post("/carts", { user_id });
    return res.data;
  } catch (error) {
    console.error("Create cart error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Create cart failed" };
  }
};
