
import API from "./axiosInstance";

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    const res = await API.get(`/profile/${userId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Cannot fetch profile" };
  }
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    const res = await API.put(`/profile/${userId}`, profileData);
    return res.data; // should return updated profile
  } catch (error) {
    throw error.response?.data || { message: "Cannot update profile" };
  }
};
