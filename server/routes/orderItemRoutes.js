const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddlware");
const { addOrderItem, getOrderItems, getOrderItemById, updateOrderItem, deleteOrderItem } = require("../controllers/orderItemController");

router.post("/", auth, addOrderItem);
router.get("/", auth, getOrderItems);
router.get("/:id", auth, getOrderItemById);
router.put("/:id", auth, updateOrderItem);
router.delete("/:id", auth, deleteOrderItem);

module.exports = router;
