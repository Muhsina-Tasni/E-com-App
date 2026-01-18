import API from "./axiosInstance";

export const getOrderItems = async (orderId) => {
  try {
    const res = await API.get(`/order-items/${orderId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Cannot fetch order items" };
  }
};
