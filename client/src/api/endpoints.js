export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/users/login",
    REGISTER: "/users/register",
    PROFILE: "/users/me",
  },

  PRODUCT: "/product",

  CATEGORY: "/category",

  CART: {
    ITEMS: "/cartitems",
    USER: (id) => `/cartitems/user/${id}`,
  },

  ORDER: {
    CREATE: "/orders",
    USER: "/orders/user",
  },

  PAYMENT: {
    CREATE_SESSION: "/payment/create-checkout-session",
  },

  ADDRESS: "/address",
};