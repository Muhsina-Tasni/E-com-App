
import Product from "../models/Product.js"
import Category from "../models/Category.js";
import Order from "../models/Order.js";
 import OrderItem from "../models/OrderItems.js";

 
export const getAdminStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const inStock = await Product.countDocuments({ stock: { $gt: 0 } });
    const outOfStock = await Product.countDocuments({ stock: 0 });

    res.json({
      totalProducts,
      totalCategories,
      inStock,
      outOfStock
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};

// Get ALL orders for Admin
export const getAllOrders = async (req, res) => {
  try {

    // Get every order
    const orders = await Order.find()
      .populate("user_id", "name email")
      .sort({ createdAt: -1 });


    // Get order items for every order
    const ordersWithItems = await Promise.all(

      orders.map(async (order) => {

        const items = await OrderItem.find({
          order_id: order._id
        }).populate("product_id");


        return {
          ...order.toObject(),
          orderItems: items
        };

      })

    );


    res.status(200).json(ordersWithItems);

  } catch (error) {

    console.error("Failed to fetch all orders:", error);

    res.status(500).json({
      message: "Failed to fetch all orders"
    });

  }
};

