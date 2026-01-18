
import axios from "axios";

const API_URL = "http://localhost:7000/api/users"; 

// Login
export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/login`, credentials);
    return res.data; // should return { token, user }
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// Register
export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData);
    return res.data; // could be { message, user } or { token }
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};
