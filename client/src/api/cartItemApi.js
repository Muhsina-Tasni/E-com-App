
// import API from "./axiosInstance";
// // import axios from "axios";

// // const API = axios.create({ baseURL: "https://e-com-app-hjey.onrender.com/api" });

// // attach token if auth
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// // Add to cart
// export const addToCart = async ({ user_id, product_id, quantity }) => {
//   const res = await API.post("/cartitems", { user_id, product_id, quantity });
//   return res.data;
// };

// // Get cart items for a user
// export const getCartItemsByUser = async (userId) => {
//   const res = await API.get(`/cartitems/user/${userId}`);
//   return res.data;
// };

// // Update cart item
// export const updateCartItem = async (itemId, quantity) => {
//   const res = await API.put(`/cartitems/${itemId}`, { quantity });
//   return res.data;
// };

// // Delete cart item
// export const removeCartItem = async (itemId) => {
//   const res = await API.delete(`/cartitems/${itemId}`);
//   return res.data;
// };
import API from "./axiosInstance";

export const addToCart = async (data) => {
  const res = await API.post("/cartitems", data);
  return res.data;
};

export const getCartItemsByUser = async (userId) => {
  const res = await API.get(`/cartitems/user/${userId}`);
  return res.data;
};

export const updateCartItem = async (id, quantity) => {
  const res = await API.put(`/cartitems/${id}`, { quantity });
  return res.data;
};

export const removeCartItem = async (id) => {
  const res = await API.delete(`/cartitems/${id}`);
  return res.data;
};