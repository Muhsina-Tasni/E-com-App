import API from "./axiosInstance";

export const getAdminStats = async () => {
  const res = await API.get("/admin/stats");
  return res.data;
};
// Admin - get all orders 
export const getAllOrders = async () => { 
  const res = await API.get("/admin/orders");
   return res.data; };