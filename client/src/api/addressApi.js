import API from "./axiosInstance";

export const getAddresses = async () => {
  try {
    const res = await API.get("/address");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch addresses" };
  }
};

export const addAddress = async (data) => {
  try {
    const res = await API.post("/address", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Adding address failed" };
  }
};

export const updateAddress = async (id, data) => {
  try {
    const res = await API.put(`/address/${id}`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Update failed" };
  }
};

export const deleteAddress = async (id) => {
  try {
    const res = await API.delete(`/address/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Delete failed" };
  }
};
