
import axios from "axios";

const useLocalProxy =
  import.meta.env.DEV && import.meta.env.VITE_USE_LOCAL_API === "true";

const remoteBase = (
  import.meta.env.VITE_API_BASE || "https://e-com-app-hjey.onrender.com"
).replace(/\/$/, "");

const instance = axios.create({
  baseURL: useLocalProxy ? "/api" : `${remoteBase}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});


console.log("API BASE:", import.meta.env.VITE_API_BASE);
console.log("BASE URL:", instance.defaults.baseURL);


instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    const detail =
      data == null
        ? error.message
        : typeof data === "object"
          ? JSON.stringify(data)
          : String(data);
    console.error(
      "API ERROR:",
      detail,
      error.response?.status ? `HTTP ${error.response.status}` : ""
    );

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default instance;