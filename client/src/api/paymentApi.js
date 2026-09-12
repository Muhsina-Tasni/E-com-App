
import API from "./axiosInstance";

export const createCheckoutSession = async (data) => {
  try {

    const res = await API.post(
      "/payment/create-checkout-session",
      data
    );

    return res.data;

  } catch (error) {

    throw (
      error.response?.data || {
        message: "Payment failed",
      }
    );
  }
};


export const verifyPayment = async (sessionId) => {
  try {

    const res = await API.post(
      "/payment/verify-payment",
      {
        sessionId,
      }
    );

    return res.data;

  } catch (error) {

    throw (
      error.response?.data || {
        message:
          "Payment verification failed",
      }
    );
  }
};