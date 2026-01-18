import axios from "axios";

const API_URL = "http://localhost:7000/api/category";

// Create category
export const createCategory = async (categoryData, token) => {
  try {
    const res = await axios.post(API_URL, categoryData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Category creation failed" };
  }
};

// Fetch categories
export const getCategories = async (token) => {
  try {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch categories" };
  }
};

// Update category
export const updateCategory = async (id, categoryData, token) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, categoryData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Category update failed" };
  }
};

// Delete category
export const deleteCategory = async (id, token) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Category delete failed" };
  }
};
