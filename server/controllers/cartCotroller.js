
import Cart from "../models/Cart.js";
import httpStatus from "../constants/httpStatus.js";
import messages from "../constants/messages.js";

// Create cart for a user (if not exists)
export const createCart = async (req, res) => {
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
export const getCartByUser = async (req, res) => {
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



export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.deleteMany({
      user_id: userId,
    });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });

  } catch (error) {
    console.error("Clear cart error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
    });
  }
};
