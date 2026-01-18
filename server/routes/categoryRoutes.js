
// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddlware");
const adminOnly = require("../middleware/adminMiddlware");
const { createCategory, getCategories, updateCategory, deleteCategory,getCategoryById } = require("../controllers/categoryController");

router.post("/", auth, adminOnly, createCategory);
router.get("/", getCategories);
router.put("/:id", auth, adminOnly, updateCategory);
router.delete("/:id", auth, adminOnly, deleteCategory);
 router.get("/:id", auth, getCategoryById);

module.exports = router;
