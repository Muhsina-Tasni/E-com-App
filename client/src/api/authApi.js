

import API from "./axiosInstance";

// Login
export const loginUser = async (credentials) => {
  try {
    const res = await API.post("/users/login", credentials);
    return res.data; // should return { token, user }
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// Register
export const registerUser = async (userData) => {
  try {
    const res = await API.post("/users/register", userData);
    return res.data; // could be { message, user } or { token }
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};



// import API from "./axiosInstance";

// export const loginUser = async (credentials) => {
//   const res = await API.post("/users/login", credentials);
//   return res.data;
// };

// export const registerUser = async (data) => {
//   const res = await API.post("/users/register", data);
//   return res.data;
// };