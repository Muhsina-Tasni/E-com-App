import OrderItem from"../models/OrderItems.js";
import httpStatus from "../constants/httpStatus.js";
import messages from "../constants/messages.js";

// Add order item
export const addOrderItem = async (req, res) => {
  try {
    const { order_id, product_id, quantity, price } = req.body;
    const item = new OrderItem({ order_id, product_id, quantity, price });
    await item.save();
    res.status(httpStatus.CREATED).json({ message: messages.ORDER_ITEM_CREATED, item });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Get all order items
export const getOrderItems = async (req, res) => {
  try {
    const items = await OrderItem.find();
    res.status(httpStatus.OK).json(items);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Get order item by ID
export const getOrderItemById = async (req, res) => {
  try {
    const item = await OrderItem.findById(req.params.id);
    if (!item) return res.status(httpStatus.NOT_FOUND).json({ message: messages.ORDER_ITEM_NOT_FOUND });
    res.status(httpStatus.OK).json(item);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Update order item
export const updateOrderItem = async (req, res) => {
  try {
    const item = await OrderItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(httpStatus.NOT_FOUND).json({ message: messages.ORDER_ITEM_NOT_FOUND });
    res.status(httpStatus.OK).json(item);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Delete order item
export const deleteOrderItem = async (req, res) => {
  try {
    const item = await OrderItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(httpStatus.NOT_FOUND).json({ message: messages.ORDER_ITEM_NOT_FOUND });
    res.status(httpStatus.OK).json({ message: messages.ORDER_ITEM_DELETED });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// export default { addOrderItem, getOrderItems, getOrderItemById, updateOrderItem, deleteOrderItem };
