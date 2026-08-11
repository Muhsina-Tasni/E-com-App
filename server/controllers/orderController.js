import Order from "../models/Order.js";
import httpStatus from "../constants/httpStatus.js";
import messages from "../constants/messages.js";


// Create Order
export const createOrder = async (req, res) => {
  try {
    const { user_id, shippingAddress, orderDate, status, totalAmount } = req.body;
    const order = new Order({ user_id, shippingAddress, orderDate, status, totalAmount });
    await order.save();
    res.status(httpStatus.CREATED).json({ message: messages.ORDER_CREATED, order });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};


// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(httpStatus.OK).json(orders);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(httpStatus.NOT_FOUND).json({ message: messages.ORDER_NOT_FOUND });
    res.status(httpStatus.OK).json(order);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Update order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(httpStatus.NOT_FOUND).json({ message: messages.ORDER_NOT_FOUND });
    res.status(httpStatus.OK).json(order);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(httpStatus.NOT_FOUND).json({ message: messages.ORDER_NOT_FOUND });
    res.status(httpStatus.OK).json({ message: messages.ORDER_DELETED });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};


