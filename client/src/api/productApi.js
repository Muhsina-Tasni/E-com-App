
import API from "./axiosInstance";

export const createProduct = async (productData) => {
  const res = await API.post("/product", productData);
  return res.data;
};

export const getProducts = async () => {
  const res = await API.get("/product");
  return res.data;
};