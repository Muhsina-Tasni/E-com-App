

import API from "./axiosInstance";

// Create category
export const createCategory = async (categoryData) => {
  try {
    const res = await API.post("/category", categoryData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Category creation failed" };
  }
};

// Fetch categories
export const getCategories = async () => {
  try {
    const res = await API.get("/category");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch categories" };
  }
};

// Update category
export const updateCategory = async (id, categoryData) => {
  try {
    const res = await API.put(`/category/${id}`, categoryData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Category update failed" };
  }
};

// Delete category
export const deleteCategory = async (id) => {
  try {
    const res = await API.delete(`/category/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Category delete failed" };
  }
};
