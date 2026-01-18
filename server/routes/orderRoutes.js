const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddlware");
const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } = require("../controllers/orderController");

router.post("/", auth, createOrder);
router.get("/", auth, getOrders);
router.get("/:id", auth, getOrderById);
router.put("/:id", auth, updateOrder);
router.delete("/:id", auth, deleteOrder);

module.exports = router;
