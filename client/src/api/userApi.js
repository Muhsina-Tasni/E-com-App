import API from "./axiosInstance";

export const loginUser = async (credentials) => {
  try {
    const res = await API.post("/users/login", credentials);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const registerUser = async (data) => {
  try {
    const res = await API.post("/users/register", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

export const getUserDetails = async () => {
  try {
    const res = await API.get("/users/me");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Cannot fetch user" };
  }
};
