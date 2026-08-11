
import API from "./axiosInstance";

export const createCart = async (data) => {
  const res = await API.post("/carts", data);
  return res.data;
};