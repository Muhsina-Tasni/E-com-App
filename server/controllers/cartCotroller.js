

 const Cart = require("../models/Cart");
const httpStatus = require("../constants/httpStatus");
const messages = require("../constants/messages");

// Create cart for a user (if not exists)
const createCart = async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id)
      return res.status(httpStatus.BAD_REQUEST).json({ message: "User ID is required" });

    let cart = await Cart.findOne({ user_id });
    if (!cart) {
      cart = await Cart.create({ user_id });
    }

    res.status(httpStatus.CREATED).json({ message: messages.CART_CREATED, cart });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Get cart by user id
const getCartByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart)
      return res.status(httpStatus.NOT_FOUND).json({ message: messages.CART_NOT_FOUND });

    res.status(httpStatus.OK).json(cart);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

module.exports = { createCart, getCartByUser };
