
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