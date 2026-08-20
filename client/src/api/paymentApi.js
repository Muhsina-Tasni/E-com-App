
import API from "./axiosInstance";

export const createCheckoutSession = async (data) => {
  try {
    const res = await API.post(
      "/payment/create-checkout-session", // ✅ correct path
      data
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Payment failed" };
  }
};



// Verify Stripe payment
export const verifyPayment = async (sessionId) => {
  const response = await axiosInstance.get(
    `/payment/verify/${sessionId}`
  );

  return response.data;
};