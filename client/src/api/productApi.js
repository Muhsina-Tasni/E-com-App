

// // client/src/api/productApi.js

// import API from "./axiosInstance";


// // const API_URL = "https://e-com-app-hjey.onrender.com/api/product";

// // Create product
// export const createProduct = async (productData, token) => {
//   try {
//     const res = await API.post("/products", productData, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Product creation failed" };
//   }
// };

// // Fetch all products
// export const getProducts = async (token) => {
//   try {
//     const res = await API.get("/products", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Failed to fetch products" };
//   }
// };
import API from "./axiosInstance";

export const createProduct = async (productData) => {
  const res = await API.post("/product", productData);
  return res.data;
};

export const getProducts = async () => {
  const res = await API.get("/product");
  return res.data;
};