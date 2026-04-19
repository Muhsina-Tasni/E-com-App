

// export const makePayment = async (data) => {
//   try {
//     const res = await API.post("/payments", data);
//     return res.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Payment failed" };
//   }
// };
// export const makePayment = async (data) => {
//   try {
//     const res = await API.post("/payments/payment", data);
//     return res.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Payment failed" };
//   }
// };


import API from "./axiosInstance";

export const createCheckoutSession = async (data) => {
  try {
    const res = await API.post(
      "/payments/create-checkout-session", // ✅ correct path
      data
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Payment failed" };
  }
};