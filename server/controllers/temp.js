const Product = require("../models/Product");
const Category = require("../models/Category");

exports.getAdminStats = async (req, res) => {
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
