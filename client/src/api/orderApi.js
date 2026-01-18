import API from "./axiosInstance";

export const createOrder = async (data) => {
  try {
    const res = await API.post("/orders", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Order creation failed" };
  }
};

export const getUserOrders = async () => {
  try {
    const res = await API.get("/orders/user");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Cannot load orders" };
  }
};
