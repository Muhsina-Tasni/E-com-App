

// client/src/api/productApi.js
import axios from "axios";

const API_URL = "http://localhost:7000/api/product";

// Create product
export const createProduct = async (productData, token) => {
  try {
    const res = await axios.post(API_URL, productData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Product creation failed" };
  }
};

// Fetch all products
export const getProducts = async (token) => {
  try {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch products" };
  }
};
