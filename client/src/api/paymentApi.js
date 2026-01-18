import API from "./axiosInstance";

export const makePayment = async (data) => {
  try {
    const res = await API.post("/payments", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Payment failed" };
  }
};
