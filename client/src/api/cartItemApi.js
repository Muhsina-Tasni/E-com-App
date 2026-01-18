

import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:7000/api" });

// attach token if auth
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Add to cart
export const addToCart = async ({ user_id, product_id, quantity }) => {
  const res = await API.post("/cartitems", { user_id, product_id, quantity });
  return res.data;
};

// Get cart items for a user
export const getCartItemsByUser = async (userId) => {
  const res = await API.get(`/cartitems/user/${userId}`);
  return res.data;
};

// Update cart item
export const updateCartItem = async (itemId, quantity) => {
  const res = await API.put(`/cartitems/${itemId}`, { quantity });
  return res.data;
};

// Delete cart item
export const removeCartItem = async (itemId) => {
  const res = await API.delete(`/cartitems/${itemId}`);
  return res.data;
};
