
// // routes/productRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddlware");
const adminOnly = require("../middleware/adminMiddlware");
const { createProduct, getProducts ,getProductById,updateProduct,deleteProduct} = require("../controllers/productController");

router.post("/", auth, adminOnly, createProduct);
router.get("/", getProducts);
router.get("/:id", auth, getProductById);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
