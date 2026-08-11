
import CartItem  from "../models/CartItems.js"
import Cart from "../models/Cart.js"
import httpStatus from"../constants/httpStatus.js";
import messages from "../constants/messages.js"
import mongoose from "mongoose"

// Add item to cart
export const addCartItem = async (req, res) => {
  try {
    const { user_id, product_id, quantity = 1 } = req.body;
    if (!user_id || !product_id)
      return res.status(400).json({ message: "User ID and Product ID required" });

    // Find or create cart
    let cart = await Cart.findOne({ user_id });
    if (!cart) {
      cart = await Cart.create({ user_id });
    }

    // Check if item exists
    let item = await CartItem.findOne({ cart_id: cart._id, product_id });
    if (item) {
      item.quantity += quantity;
      await item.save();
      return res.status(200).json({ message: messages.CART_ITEM_UPDATED, cartItem: item });
    }

    // Create new cart item
    item = await CartItem.create({ cart_id: cart._id, product_id, quantity });
    res.status(201).json({ message: messages.CART_ITEM_CREATED, cartItem: item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCartItemsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user's cart
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) return res.status(200).json([]); // no cart → empty array

    // Get items in this cart and populate product
    const items = await CartItem.find({ cart_id: cart._id }).populate("product_id");

    // Transform to match frontend expected structure
    const formatted = items.map((i) => ({
      _id: i._id,
      quantity: i.quantity,
      product: i.product_id
        ? {
            _id: i.product_id._id,
            name: i.product_id.name,
            price: i.product_id.price,
            image: i.product_id.image,
            description: i.product_id.description,
          }
        : null,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Update cart item
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await CartItem.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
    if (!item) return res.status(httpStatus.NOT_FOUND).json({ message: messages.CART_ITEM_NOT_FOUND });
    res.status(httpStatus.OK).json(item);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Delete cart item
export const deleteCartItem = async (req, res) => {
  try {
    const item = await CartItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(httpStatus.NOT_FOUND).json({ message: messages.CART_ITEM_NOT_FOUND });
    res.status(httpStatus.OK).json({ message: messages.CART_ITEM_DELETED });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};


